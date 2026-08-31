const crypto = require("crypto");
const { clean } = require("./security.cjs");

const SERVICES = new Set(["private-transfer", "airport-arrival", "hourly-chauffeur", "group-transfer", "airport-concierge", "aurora-now"]);
const VEHICLES = new Set(["comfort", "business", "van", "executive"]);
const ADDONS = new Map([
  ["flight-monitoring", 0],
  ["meet-greet", 15],
  ["child-seat", 8],
  ["extra-luggage", 12],
  ["accessible", 0],
  ["pet-friendly", 10],
]);
const VEHICLE_MULTIPLIER = { comfort: 1, business: 1.35, van: 1.72, executive: 2.2 };
const SERVICE_BASE = {
  "private-transfer": 26,
  "airport-arrival": 32,
  "group-transfer": 48,
  "airport-concierge": 88,
  "aurora-now": 30,
};

function coordinate(value, min, max) {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : null;
}

function haversineKm(aLat, aLng, bLat, bLng) {
  if ([aLat, aLng, bLat, bLng].some((item) => item == null)) return null;
  const radians = (value) => value * Math.PI / 180;
  const dLat = radians(bLat - aLat);
  const dLng = radians(bLng - aLng);
  const value = Math.sin(dLat / 2) ** 2 + Math.cos(radians(aLat)) * Math.cos(radians(bLat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function normalize(value) {
  return clean(value, 300).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function knownRouteDistance(pickup, destination) {
  const source = normalize(pickup);
  const target = normalize(destination);
  const contains = (...values) => values.every((value) => source.includes(value) || target.includes(value));
  const pair = (one, two, distance) => (source.includes(one) && target.includes(two)) || (source.includes(two) && target.includes(one)) ? distance : null;
  return pair("dubrovnik airport", "old town", 24)
    || pair("dubrovnik airport", "dubrovnik", 22)
    || pair("dubrovnik", "kotor", 92)
    || pair("dubrovnik", "mostar", 145)
    || pair("dubrovnik", "split", 235)
    || pair("zagreb airport", "zagreb", 17)
    || pair("split airport", "split", 25)
    || pair("dubrovnik airport", "cavtat", 7)
    || (contains("dubrovnik") ? 34 : 56);
}

function parseAddons(value) {
  let values = value;
  if (typeof values === "string") {
    try { values = JSON.parse(values); } catch (_) { values = []; }
  }
  if (!Array.isArray(values)) return [];
  return [...new Set(values.map((item) => clean(item, 50)).filter((item) => ADDONS.has(item)))];
}

function calculateQuote(body = {}) {
  const service = SERVICES.has(clean(body.service, 50)) ? clean(body.service, 50) : "private-transfer";
  const vehicleClass = VEHICLES.has(clean(body.vehicleClass, 50)) ? clean(body.vehicleClass, 50) : "comfort";
  const passengers = Math.max(1, Math.min(60, Number.parseInt(body.passengers, 10) || 1));
  const tripType = body.tripType === "return" ? "return" : "one-way";
  const hourlyHours = Math.max(2, Math.min(12, Number.parseInt(body.hourlyHours, 10) || 3));
  const addons = parseAddons(body.addons);
  const directDistance = haversineKm(
    coordinate(body.pickupLatitude, -90, 90), coordinate(body.pickupLongitude, -180, 180),
    coordinate(body.destinationLatitude, -90, 90), coordinate(body.destinationLongitude, -180, 180),
  );
  const distanceKm = service === "hourly-chauffeur"
    ? Math.max(18, hourlyHours * 24)
    : Math.max(5, Math.round((directDistance ? directDistance * 1.28 : knownRouteDistance(body.pickup, body.destination)) * 10) / 10);
  const durationMinutes = service === "hourly-chauffeur"
    ? hourlyHours * 60
    : Math.max(20, Math.round(distanceKm / 52 * 60 + 12));
  const passengerSupplement = passengers > 3 && vehicleClass !== "van" ? (passengers - 3) * 4 : 0;
  const extrasTotal = addons.reduce((sum, addon) => sum + (ADDONS.get(addon) || 0), 0);
  const raw = service === "hourly-chauffeur"
    ? hourlyHours * 33 * VEHICLE_MULTIPLIER[vehicleClass]
    : (SERVICE_BASE[service] + distanceKm * 1.18 + passengerSupplement) * VEHICLE_MULTIPLIER[vehicleClass];
  const returnMultiplier = tripType === "return" ? 1.82 : 1;
  const total = Math.max(35, Math.round((raw * returnMultiplier + extrasTotal) / 5) * 5);
  return {
    id: `QTE-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
    mode: "demo",
    currency: "EUR",
    total,
    distanceKm,
    durationMinutes,
    service,
    vehicleClass,
    passengers,
    hourlyHours: service === "hourly-chauffeur" ? hourlyHours : null,
    addons,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  };
}

module.exports = { ADDONS, SERVICES, VEHICLES, calculateQuote, coordinate, parseAddons };
