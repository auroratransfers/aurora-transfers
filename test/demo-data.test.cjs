const test = require("node:test");
const assert = require("node:assert/strict");
const { DEMO_RUN_KEY, buildDemoFixture, demoTrackingLinks } = require("../lib/demo-data.cjs");

test("demo fixture covers every operations screen with deterministic tracking links", () => {
  const fixture = buildDemoFixture(new Date("2026-08-31T12:00:00.000Z"));
  assert.equal(DEMO_RUN_KEY, "aurora-admin-demo-v1");
  assert.equal(fixture.drivers.length, 8);
  assert.equal(fixture.vehicles.length, 8);
  assert.equal(fixture.rides.length, 9);
  assert.equal(fixture.flightWatches.length, 3);
  assert.equal(fixture.business.length, 4);
  assert.equal(fixture.partners.length, 3);
  assert.equal(new Set(fixture.rides.map((ride) => ride.reference)).size, fixture.rides.length);
  assert.ok(fixture.rides.some((ride) => ride.status === "in_progress" && ride.positions?.length));
  assert.ok(fixture.incidents.some((incident) => incident.type === "rider_panic"));

  const link = demoTrackingLinks("https://aurora-transfers.vercel.app").find((item) => item.reference === "DEMO-AUR-1001");
  assert.match(link.url, /^https:\/\/aurora-transfers\.vercel\.app\/track\/\?token=aurora-demo-track-live-1001&lang=en$/);
});
