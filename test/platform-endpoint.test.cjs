const test = require("node:test");
const assert = require("node:assert/strict");
const handler = require("../api/platform.js");

function response() {
  return {
    statusCode: 200,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.payload = value; return this; },
  };
}

test("platform endpoint serves a test quote from its consolidated route", async () => {
  const res = response();
  await handler({ method: "POST", url: "/api/platform?action=quote", body: { pickup: "Dubrovnik Airport", destination: "Dubrovnik Old Town", passengers: "2" } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.payload.ok, true);
  assert.equal(res.payload.quote.mode, "demo");
});

test("platform endpoint serves labelled demo flight data without a provider key", async () => {
  const original = process.env.AVIATIONSTACK_API_KEY;
  delete process.env.AVIATIONSTACK_API_KEY;
  try {
    const res = response();
    await handler({ method: "GET", url: "/api/platform?action=flight-status&flight=LH123&date=2026-09-01" }, res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.payload.isLive, false);
    assert.equal(res.payload.flight.number, "LH123");
    assert.equal(res.headers["Cache-Control"], "private, max-age=30");
  } finally {
    if (original === undefined) delete process.env.AVIATIONSTACK_API_KEY; else process.env.AVIATIONSTACK_API_KEY = original;
  }
});
