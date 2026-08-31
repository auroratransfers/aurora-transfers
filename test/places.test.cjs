const test = require("node:test");
const assert = require("node:assert/strict");
const { searchCroatiaPlaces } = require("../lib/croatia-places.cjs");
const handler = require("../api/places.js");

function response() {
  return {
    statusCode: 200,
    headers: {},
    status(code) { this.statusCode = code; return this; },
    json(value) { this.payload = value; return this; },
    setHeader(name, value) { this.headers[name] = value; },
  };
}

test("Croatian catalog matches accented places, hotels and airports", () => {
  assert.equal(searchCroatiaPlaces("Sibenik").some((place) => place.name === "Šibenik"), true);
  assert.equal(searchCroatiaPlaces("rixos").some((place) => place.category === "hotel"), true);
  assert.equal(searchCroatiaPlaces("dbv").some((place) => place.id === "airport-dubrovnik"), true);
  assert.equal(searchCroatiaPlaces("stari grad dubrovnik").some((place) => place.category === "old-town"), true);
});

test("places endpoint returns only the Croatian catalog", async () => {
  const res = response();
  await handler({ method: "GET", url: "/api/places?q=Dubrovnik&lang=en", headers: {} }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["Cache-Control"], "private, no-store");
  assert.equal(res.payload.country, "HR");
  assert.equal(res.payload.provider, "catalog");
  assert.equal(res.payload.places.every((place) => place.source === "catalog"), true);
});
