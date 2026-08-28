const crypto = require("crypto");
const { clean, hashToken, randomToken } = require("./security.cjs");

const TRANSITIONS = {
  requested: ["confirmed", "cancelled"],
  confirmed: ["assigned", "cancelled"],
  assigned: ["en_route", "cancelled"],
  en_route: ["arrived", "cancelled"],
  arrived: ["in_progress", "no_show", "cancelled"],
  in_progress: ["completed", "emergency"],
  emergency: ["in_progress", "completed", "cancelled"],
  completed: [], cancelled: [], no_show: [],
};

function reference() {
  const day = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `AUR-${day}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function parseScheduled(date, time) {
  const cleanDate = clean(date, 10); const cleanTime = clean(time, 5);
  const dateMatch = cleanDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const timeMatch = cleanTime.match(/^(\d{2}):(\d{2})$/);
  if (!dateMatch || !timeMatch) {
    throw Object.assign(new Error("Invalid transfer date or time"), { status: 400 });
  }
  const [, year, month, day] = dateMatch.map(Number);
  const [, hour, minute] = timeMatch.map(Number);
  const calendarDate = new Date(Date.UTC(year, month - 1, day));
  const validDate = calendarDate.getUTCFullYear() === year
    && calendarDate.getUTCMonth() === month - 1
    && calendarDate.getUTCDate() === day;
  if (!validDate || hour > 23 || minute > 59) {
    throw Object.assign(new Error("Invalid transfer date or time"), { status: 400 });
  }
  const noon = new Date(`${cleanDate}T12:00:00Z`);
  const zonePart = new Intl.DateTimeFormat("en", { timeZone: "Europe/Zagreb", timeZoneName: "longOffset" })
    .formatToParts(noon).find((part) => part.type === "timeZoneName")?.value || "GMT+01:00";
  const offset = zonePart.replace("GMT", "");
  const value = `${cleanDate}T${cleanTime}:00${offset}`;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    const error = new Error("Invalid transfer date or time");
    error.status = 400;
    throw error;
  }
  return parsed.toISOString();
}

function validateBooking(body) {
  const booking = {
    service: clean(body.service || "private-transfer", 100),
    pickup: clean(body.pickup, 300),
    destination: clean(body.destination, 300),
    tripType: body.tripType === "return" ? "return" : "one-way",
    date: clean(body.date, 10), time: clean(body.time, 5),
    returnDate: clean(body.returnDate, 10), returnTime: clean(body.returnTime, 5),
    passengers: Number.parseInt(body.passengers, 10) || 1,
    name: clean(body.name, 160), email: clean(body.email, 200).toLowerCase(), phone: clean(body.phone, 80),
    flight: clean(body.flight, 40).toUpperCase(), message: clean(body.message, 3000),
    language: clean(body.lang || body.language || "en", 5).toLowerCase(),
  };
  if (!booking.pickup || !booking.destination || !booking.name || !booking.email || !booking.phone) throw Object.assign(new Error("Missing required fields"), { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) throw Object.assign(new Error("Invalid email address"), { status: 400 });
  if (booking.passengers < 1 || booking.passengers > 60) throw Object.assign(new Error("Invalid passenger count"), { status: 400 });
  booking.scheduledAt = parseScheduled(booking.date, booking.time);
  if (new Date(booking.scheduledAt).getTime() < Date.now() - 5 * 60 * 1000) {
    throw Object.assign(new Error("Transfer date must be in the future"), { status: 400 });
  }
  if (booking.tripType === "return") {
    booking.returnScheduledAt = parseScheduled(booking.returnDate, booking.returnTime);
    if (new Date(booking.returnScheduledAt) <= new Date(booking.scheduledAt)) {
      throw Object.assign(new Error("Return transfer must be after the outbound transfer"), { status: 400 });
    }
  }
  return booking;
}

function canTransition(from, to) {
  return Boolean(TRANSITIONS[from] && TRANSITIONS[from].includes(to));
}

async function appendEvent(sql, rideId, eventType, actorType, actorId, fromStatus, toStatus, metadata = {}) {
  await sql`insert into ride_events (ride_id,event_type,actor_type,actor_id,from_status,to_status,metadata)
    values (${rideId},${eventType},${actorType},${actorId || null},${fromStatus || null},${toStatus || null},${sql.json(metadata)})`;
}

async function transitionRide(sql, { rideId, toStatus, actorType, actorId, metadata = {}, adminOverride = false }) {
  return sql.begin(async (tx) => {
    const [ride] = await tx`select * from rides where id=${rideId} for update`;
    if (!ride) throw Object.assign(new Error("Ride not found"), { status: 404 });
    if (!adminOverride && !canTransition(ride.status, toStatus)) throw Object.assign(new Error(`Cannot move ride from ${ride.status} to ${toStatus}`), { status: 409 });
    const timestamps = {
      arrived: "arrived_at", in_progress: "started_at", completed: "completed_at", cancelled: "cancelled_at",
    };
    const stamp = timestamps[toStatus];
    const rows = stamp
      ? await tx.unsafe(`update rides set status=$1, ${stamp}=now(), updated_at=now(), version=version+1 where id=$2 returning *`, [toStatus, rideId])
      : await tx`update rides set status=${toStatus},updated_at=now(),version=version+1 where id=${rideId} returning *`;
    if (["completed", "cancelled", "no_show"].includes(toStatus)) {
      if (ride.driver_id) await tx`update drivers set status='available',updated_at=now() where id=${ride.driver_id} and status<>'suspended'`;
      if (ride.vehicle_id) await tx`update vehicles set status='available',updated_at=now() where id=${ride.vehicle_id} and status='busy'`;
    }
    await appendEvent(tx, rideId, "status_changed", actorType, actorId, ride.status, toStatus, metadata);
    return rows[0];
  });
}

function haversineMeters(aLat, aLng, bLat, bLng) {
  if ([aLat, aLng, bLat, bLng].some((value) => value == null || !Number.isFinite(Number(value)))) return null;
  const rad = (value) => Number(value) * Math.PI / 180;
  const dLat = rad(bLat - aLat); const dLng = rad(bLng - aLng);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

module.exports = { appendEvent, canTransition, hashToken, haversineMeters, randomToken, reference, transitionRide, validateBooking };
