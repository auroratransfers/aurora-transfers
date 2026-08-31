const test = require("node:test");
const assert = require("node:assert/strict");
const handler = require("../api/partner-application.js");

function payload() {
  return {
    language: "en", applicantType: "independent-driver", fullName: "Mia Novak", companyName: "", email: "mia@example.com", phone: "+385 91 000 000", country: "Croatia", baseCity: "Dubrovnik", yearsExperience: "8", licenseNumber: "HR-123456", transportPermit: "TP-123456", insuranceValidUntil: "2035-08-31", languages: ["english", "croatian", "german", "french"], otherLanguages: "", availability: ["daytime", "weekends"], vehicleMake: "Mercedes-Benz", vehicleModel: "V-Class", vehicleYear: "2025", plateNumber: "DU 123 AB", vehicleColor: "Black", vehicleType: "van", seats: "7", luggageCapacity: "8", amenities: ["air-conditioning", "wifi"], serviceBase: "Dubrovnik Airport", coverageCountries: "Croatia and Montenegro", usualRoutes: "Airport and long-distance private transfers.", notes: "", agreement: true,
    photos: [{ name: "vehicle.jpg", type: "image/jpeg", data: Buffer.from("small-test-image").toString("base64") }],
  };
}

function response() {
  return {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(value) { this.payload = value; return this; },
    setHeader() {},
  };
}

test("partner application API sends validated photo attachment when database is not configured", async () => {
  const original = { databaseUrl: process.env.DATABASE_URL, postgresUrl: process.env.POSTGRES_URL, resend: process.env.RESEND_API_KEY, partnerTo: process.env.PARTNER_TO_EMAIL };
  const originalFetch = global.fetch;
  const sent = [];
  try {
    delete process.env.DATABASE_URL;
    delete process.env.POSTGRES_URL;
    process.env.RESEND_API_KEY = "test-key";
    process.env.PARTNER_TO_EMAIL = "partners@example.com";
    global.fetch = async (_url, options) => {
      sent.push(JSON.parse(options.body));
      return { ok: true, status: 202 };
    };
    const res = response();
    await handler({ method: "POST", body: payload(), headers: {} }, res);
    assert.equal(res.statusCode, 202);
    assert.equal(res.payload.ok, true);
    assert.match(res.payload.reference, /^PARTNER-[A-F0-9]{8}$/);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].attachments[0].filename, "vehicle.jpg");
    assert.equal(sent[0].attachments[0].content, Buffer.from("small-test-image").toString("base64"));
  } finally {
    global.fetch = originalFetch;
    if (original.databaseUrl === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = original.databaseUrl;
    if (original.postgresUrl === undefined) delete process.env.POSTGRES_URL; else process.env.POSTGRES_URL = original.postgresUrl;
    if (original.resend === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = original.resend;
    if (original.partnerTo === undefined) delete process.env.PARTNER_TO_EMAIL; else process.env.PARTNER_TO_EMAIL = original.partnerTo;
  }
});
