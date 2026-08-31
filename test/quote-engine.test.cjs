const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateQuote } = require("../lib/quote-engine.cjs");
const { lookupFlight } = require("../lib/flight-status.cjs");

test("quote engine returns a labelled demo estimate with selected extras", () => {
  const quote = calculateQuote({
    service: "airport-arrival",
    vehicleClass: "van",
    pickup: "Dubrovnik Airport (DBV)",
    destination: "Dubrovnik Old Town",
    passengers: "4",
    addons: JSON.stringify(["flight-monitoring", "child-seat", "invalid-addon"]),
  });
  assert.equal(quote.mode, "demo");
  assert.equal(quote.currency, "EUR");
  assert.equal(quote.distanceKm, 24);
  assert.ok(quote.total >= 35);
  assert.deepEqual(quote.addons, ["flight-monitoring", "child-seat"]);
});

test("hourly chauffeur estimate uses requested duration", () => {
  const quote = calculateQuote({
    service: "hourly-chauffeur",
    vehicleClass: "business",
    hourlyHours: "5",
    pickup: "Dubrovnik",
    destination: "Dubrovnik Old Town",
  });
  assert.equal(quote.hourlyHours, 5);
  assert.equal(quote.durationMinutes, 300);
  assert.equal(quote.service, "hourly-chauffeur");
});

test("flight lookup uses visibly non-live demo data without a provider key", async () => {
  const previous = process.env.AVIATIONSTACK_API_KEY;
  delete process.env.AVIATIONSTACK_API_KEY;
  try {
    const result = await lookupFlight("LH123", "2026-09-01");
    assert.equal(result.provider, "demo");
    assert.equal(result.isLive, false);
    assert.equal(result.flight.number, "LH123");
  } finally {
    if (previous) process.env.AVIATIONSTACK_API_KEY = previous;
  }
});
