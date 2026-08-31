const crypto = require("crypto");
const { databaseConfigured, withDatabase } = require("../lib/db.cjs");
const { body, fail, method } = require("../lib/http.cjs");
const { lookupFlight } = require("../lib/flight-status.cjs");
const { calculateQuote, coordinate } = require("../lib/quote-engine.cjs");
const { haversineMeters } = require("../lib/rides.cjs");
const { clean } = require("../lib/security.cjs");

const COMPANY_TYPES = new Set(["hotel", "villa-agency", "travel-agency", "event", "corporate", "yacht-marina", "other"]);

function requestUrl(req) {
  return new URL(req.url || "/api/platform", "https://aurora-transfers.vercel.app");
}

function publicVehicle(row, pickupLat, pickupLng) {
  const distanceMeters = haversineMeters(pickupLat, pickupLng, row.latitude, row.longitude);
  const distanceKm = distanceMeters == null ? null : Math.round(distanceMeters / 100) / 10;
  const etaMinutes = distanceKm == null ? null : Math.max(3, Math.min(30, Math.round(distanceKm * 2.4 + 2)));
  return {
    id: row.id,
    label: row.passenger_capacity >= 6 ? "Premium van" : "Aurora vehicle",
    passengerCapacity: row.passenger_capacity,
    latitude: Math.round(Number(row.latitude) * 1000) / 1000,
    longitude: Math.round(Number(row.longitude) * 1000) / 1000,
    distanceKm,
    etaMinutes,
    updatedAt: row.recorded_at,
  };
}

async function availability(req, res, url) {
  if (!method(req, res, ["GET"])) return;
  const pickupLat = coordinate(url.searchParams.get("lat"), -90, 90);
  const pickupLng = coordinate(url.searchParams.get("lng"), -180, 180);
  if (pickupLat == null || pickupLng == null || !databaseConfigured()) {
    return res.status(200).json({ ok: true, source: "pilot", vehicles: [] });
  }
  const rows = await withDatabase((sql) => sql`
    select v.id,v.passenger_capacity,p.latitude,p.longitude,p.recorded_at
    from vehicles v
    join lateral (
      select latitude,longitude,recorded_at
      from ride_positions
      where vehicle_id=v.id and recorded_at>now()-interval '5 minutes'
      order by recorded_at desc limit 1
    ) p on true
    where v.status='available'
      and not exists(
        select 1 from rides r
        where r.vehicle_id=v.id and r.status in ('assigned','en_route','arrived','in_progress','emergency')
      )
    order by p.recorded_at desc
    limit 20
  `);
  const vehicles = rows
    .map((row) => publicVehicle(row, pickupLat, pickupLng))
    .filter((vehicle) => vehicle.distanceKm != null && vehicle.distanceKm <= 25)
    .sort((left, right) => (left.distanceKm || 999) - (right.distanceKm || 999))
    .slice(0, 8);
  return res.status(200).json({ ok: true, source: vehicles.length ? "live" : "pilot", vehicles });
}

function businessReference() {
  return `BIZ-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateBusiness(raw) {
  const inquiry = {
    language: ["hr", "en", "de", "fr"].includes(clean(raw.language, 5)) ? clean(raw.language, 5) : "en",
    companyName: clean(raw.companyName, 180),
    contactName: clean(raw.contactName, 160),
    email: clean(raw.email, 200).toLowerCase(),
    phone: clean(raw.phone, 80),
    companyType: clean(raw.companyType, 50),
    operatingCities: clean(raw.operatingCities, 300),
    monthlyRides: clean(raw.monthlyRides, 80),
    message: clean(raw.message, 3000),
  };
  if (!inquiry.companyName || !inquiry.contactName || !inquiry.email || !inquiry.companyType || !inquiry.message) {
    throw Object.assign(new Error("Missing required fields"), { status: 400 });
  }
  if (!validEmail(inquiry.email)) throw Object.assign(new Error("Invalid email address"), { status: 400 });
  if (!COMPANY_TYPES.has(inquiry.companyType)) throw Object.assign(new Error("Invalid company type"), { status: 400 });
  return inquiry;
}

async function sendBusinessEmail({ to, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY || !to) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.BUSINESS_FROM_EMAIL || process.env.BOOKING_FROM_EMAIL || "Aurora Transfers <bookings@auroratransfers.com>",
      to: [to], reply_to: replyTo, subject, html,
    }),
  });
  if (!response.ok) throw new Error(`Email delivery failed: ${response.status}`);
  return true;
}

async function businessInquiry(req, res) {
  if (!method(req, res, ["POST"])) return;
  const inquiry = validateBusiness(body(req));
  const id = businessReference();
  const html = `<h2>New Aurora business inquiry ${escapeHtml(id)}</h2><p><strong>${escapeHtml(inquiry.companyName)}</strong><br>${escapeHtml(inquiry.contactName)}<br>${escapeHtml(inquiry.email)}${inquiry.phone ? `<br>${escapeHtml(inquiry.phone)}` : ""}</p><p>Type: ${escapeHtml(inquiry.companyType)}<br>Operating cities: ${escapeHtml(inquiry.operatingCities || "Not provided")}<br>Expected monthly rides: ${escapeHtml(inquiry.monthlyRides || "Not provided")}</p><p>${escapeHtml(inquiry.message)}</p>`;
  if (databaseConfigured()) {
    await withDatabase((sql) => sql`insert into business_inquiries(reference,language,company_name,contact_name,email,phone,company_type,operating_cities,monthly_rides,message)
      values(${id},${inquiry.language},${inquiry.companyName},${inquiry.contactName},${inquiry.email},${inquiry.phone || null},${inquiry.companyType},${inquiry.operatingCities || null},${inquiry.monthlyRides || null},${inquiry.message})`);
  }
  const to = process.env.BUSINESS_TO_EMAIL || process.env.BOOKING_TO_EMAIL || process.env.SITE_EMAIL;
  const sent = await sendBusinessEmail({ to, replyTo: inquiry.email, subject: `Aurora business inquiry: ${id}`, html });
  if (!databaseConfigured() && !sent) throw Object.assign(new Error("Business inquiries are not configured"), { status: 503 });
  return res.status(201).json({ ok: true, reference: id, persisted: databaseConfigured(), emailed: sent });
}

module.exports = async (req, res) => {
  try {
    const url = requestUrl(req);
    const action = url.searchParams.get("action");
    if (action === "quote") {
      if (!method(req, res, ["POST"])) return;
      const payload = body(req);
      if (!String(payload.pickup || "").trim() || !String(payload.destination || "").trim()) {
        throw Object.assign(new Error("Pickup and destination are required"), { status: 400 });
      }
      return res.status(200).json({ ok: true, quote: calculateQuote(payload) });
    }
    if (action === "flight-status") {
      if (!method(req, res, ["GET"])) return;
      const result = await lookupFlight(url.searchParams.get("flight"), url.searchParams.get("date"));
      res.setHeader("Cache-Control", "private, max-age=30");
      return res.status(200).json({ ok: true, ...result });
    }
    if (action === "availability") return availability(req, res, url);
    if (action === "business-inquiry") return businessInquiry(req, res);
    return res.status(404).json({ ok: false, error: "Unknown platform action" });
  } catch (error) {
    return fail(res, error);
  }
};
