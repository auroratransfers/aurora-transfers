const test = require("node:test");
const assert = require("node:assert/strict");
const { canTransition, haversineMeters, validateBooking } = require("../lib/rides.cjs");

test("ride lifecycle permits only expected driver transitions", () => {
  assert.equal(canTransition("assigned", "en_route"), true);
  assert.equal(canTransition("en_route", "arrived"), true);
  assert.equal(canTransition("arrived", "in_progress"), true);
  assert.equal(canTransition("in_progress", "completed"), true);
  assert.equal(canTransition("assigned", "completed"), false);
  assert.equal(canTransition("completed", "in_progress"), false);
});

test("booking validation creates Zagreb-time schedules and return leg", () => {
  const booking = validateBooking({ pickup:"DBV Airport", destination:"Dubrovnik", tripType:"return", date:"2027-07-12", time:"13:15", returnDate:"2027-07-19", returnTime:"09:30", passengers:"3", name:"Ana Horvat", email:"ANA@example.com", phone:"+385 91 000 000", lang:"hr" });
  assert.equal(booking.email, "ana@example.com");
  assert.equal(booking.passengers, 3);
  assert.equal(booking.scheduledAt, "2027-07-12T11:15:00.000Z");
  assert.equal(booking.returnScheduledAt, "2027-07-19T07:30:00.000Z");
});

test("booking validation rejects invalid contact and schedule", () => {
  assert.throws(() => validateBooking({ pickup:"A", destination:"B", date:"bad", time:"13:00", name:"A", email:"bad", phone:"1" }));
  assert.throws(() => validateBooking({ pickup:"A", destination:"B", date:"2035-02-30", time:"13:00", name:"A", email:"a@example.com", phone:"1" }), /Invalid transfer date/);
  assert.throws(() => validateBooking({ pickup:"A", destination:"B", tripType:"return", date:"2035-07-12", time:"13:00", returnDate:"2035-07-11", returnTime:"13:00", name:"A", email:"a@example.com", phone:"1" }), /Return transfer/);
});

test("haversine distance supports geofence checks", () => {
  assert.ok(haversineMeters(42.561,18.268,42.562,18.269) < 150);
  assert.equal(haversineMeters(null,18,42,18), null);
});
