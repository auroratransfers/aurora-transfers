const test = require("node:test");
const assert = require("node:assert/strict");
const { validatePartnerApplication } = require("../lib/partner-applications.cjs");

function application(overrides = {}) {
  return {
    language: "en",
    applicantType: "independent-driver",
    fullName: "Mia Novak",
    companyName: "",
    email: "MIA@EXAMPLE.COM",
    phone: "+385 91 000 000",
    country: "Croatia",
    baseCity: "Dubrovnik",
    yearsExperience: "8",
    licenseNumber: "HR-123456",
    transportPermit: "TP-123456",
    insuranceValidUntil: "2035-08-31",
    languages: ["english", "croatian", "german", "french"],
    otherLanguages: "Italian",
    availability: ["daytime", "weekends", "long-distance"],
    vehicleMake: "Mercedes-Benz",
    vehicleModel: "V-Class",
    vehicleYear: "2025",
    plateNumber: "DU 123 AB",
    vehicleColor: "Black",
    vehicleType: "van",
    seats: "7",
    luggageCapacity: "8",
    amenities: ["air-conditioning", "wifi", "water"],
    serviceBase: "Dubrovnik Airport",
    coverageCountries: "Croatia, Montenegro, Bosnia and Herzegovina",
    usualRoutes: "Airport transfers and long-distance private rides.",
    notes: "Available for early airport arrivals.",
    agreement: true,
    photos: [{ name: "v-class.jpg", type: "image/jpeg", data: Buffer.from("small-test-image").toString("base64") }],
    ...overrides,
  };
}

test("partner application validation keeps supported driver languages and photo manifest", () => {
  const result = validatePartnerApplication(application());
  assert.equal(result.email, "mia@example.com");
  assert.deepEqual(result.languages, ["english", "croatian", "german", "french"]);
  assert.equal(result.photos.length, 1);
  assert.deepEqual(result.photoManifest, [{ name: "v-class.jpg", type: "image/jpeg", size: 16 }]);
});

test("partner application requires languages, availability, consent and vehicle images", () => {
  assert.throws(() => validatePartnerApplication(application({ languages: [] })), /Missing required fields/);
  assert.throws(() => validatePartnerApplication(application({ availability: [] })), /Missing required fields/);
  assert.throws(() => validatePartnerApplication(application({ agreement: false })), /Missing required fields/);
  assert.throws(() => validatePartnerApplication(application({ photos: [] })), /Please add between one and three vehicle photos/);
});

test("transport company applications require a company name and valid image data", () => {
  assert.throws(() => validatePartnerApplication(application({ applicantType: "transport-company", companyName: "" })), /Company name is required/);
  assert.throws(() => validatePartnerApplication(application({ photos: [{ name: "bad.jpg", type: "image/jpeg", data: "not-base64" }] })), /Invalid vehicle photos/);
});
