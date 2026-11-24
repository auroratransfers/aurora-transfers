const { clean } = require("./security.cjs");

const cache = new Map();
const CACHE_TTL_MS = 60 * 1000;

function flightNumber(value) {
  const normalized = clean(value, 20).replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z0-9]{2,8}$/.test(normalized)) {
    const error = new Error("Enter a valid flight number");
    error.status = 400;
    throw error;
  }
  return normalized;
}

function flightQuery(number) {
  const carrier = number.match(/^[A-Z]+/)?.[0] || "";
  return {
    parameter: carrier.length === 3 ? "flight_icao" : "flight_iata",
    value: number,
  };
}

function publicTrackingUrl(number) {
  return `https://www.flightradar24.com/data/flights/${encodeURIComponent(number.toLowerCase())}`;
}

function identifier(value) {
  const normalized = String(value || "").replace(/\s+/g, "").toUpperCase();
  return normalized || null;
}

function asIso(value) {
  const date = new Date(value || "");
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function normaliseFlight(item, requestedFlight) {
  const departure = item.departure || {};
  const arrival = item.arrival || {};
  return {
    number: requestedFlight,
    iata: identifier(item.flight?.iata),
    icao: identifier(item.flight?.icao),
    status: String(item.flight_status || "scheduled").replace(/_/g, " "),
    airline: item.airline?.name || null,
    departure: {
      airport: departure.airport || departure.iata || null,
      iata: identifier(departure.iata),
      icao: identifier(departure.icao),
      timezone: departure.timezone || null,
      scheduled: asIso(departure.scheduled),
      estimated: asIso(departure.estimated),
      actual: asIso(departure.actual),
      terminal: departure.terminal || null,
      gate: departure.gate || null,
    },
    arrival: {
      airport: arrival.airport || arrival.iata || null,
      iata: identifier(arrival.iata),
      icao: identifier(arrival.icao),
      timezone: arrival.timezone || null,
      scheduled: asIso(arrival.scheduled),
      estimated: asIso(arrival.estimated),
      actual: asIso(arrival.actual),
      terminal: arrival.terminal || null,
      gate: arrival.gate || null,
      delayMinutes: Number.isFinite(Number(arrival.delay)) ? Number(arrival.delay) : null,
    },
    aircraft: {
      iata: identifier(item.aircraft?.iata),
      icao: identifier(item.aircraft?.icao),
      registration: identifier(item.aircraft?.registration),
    },
    position: item.live?.latitude != null && item.live?.longitude != null ? {
      latitude: Number(item.live.latitude),
      longitude: Number(item.live.longitude),
      altitude: Number.isFinite(Number(item.live.altitude)) ? Number(item.live.altitude) : null,
      speedKph: Number.isFinite(Number(item.live.speed_horizontal)) ? Number(item.live.speed_horizontal) : null,
    } : null,
  };
}

async function requestAviationstack(number, date) {
  const accessKey = process.env.AVIATIONSTACK_API_KEY;
  if (!accessKey) return null;
  const cacheKey = `${number}:${date || ""}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  const query = flightQuery(number);
  const search = new URLSearchParams({ access_key: accessKey, [query.parameter]: query.value, limit: "5" });
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(date || ""))) search.set("flight_date", date);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(`https://api.aviationstack.com/v1/flights?${search.toString()}`, { signal: controller.signal, headers: { Accept: "application/json" } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !Array.isArray(payload.data) || !payload.data.length) return null;
    const match = payload.data.find((item) => [item.flight?.iata, item.flight?.icao]
      .map(identifier)
      .includes(number));
    if (!match) return null;
    const flight = normaliseFlight(match, number);
    cache.set(cacheKey, { value: flight, expiresAt: Date.now() + CACHE_TTL_MS });
    return flight;
  } finally {
    clearTimeout(timeout);
  }
}

async function lookupFlight(rawNumber, date) {
  const number = flightNumber(rawNumber);
  try {
    const live = await requestAviationstack(number, date);
    if (live) return { flight: live, provider: "aviationstack", isLive: true, trackingUrl: publicTrackingUrl(number) };
  } catch (_) {
    // A provider failure must not turn the booking form into a failed booking flow.
  }
  return { flight: null, provider: "unavailable", isLive: false, trackingUrl: publicTrackingUrl(number) };
}

module.exports = { flightNumber, flightQuery, lookupFlight, publicTrackingUrl };
