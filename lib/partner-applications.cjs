const { clean } = require("./security.cjs");

const APPLICATION_TYPES = new Set(["independent-driver", "transport-company"]);
const VEHICLE_TYPES = new Set(["sedan", "premium-sedan", "suv", "minivan", "van", "minibus"]);
const LANGUAGES = new Set(["english", "croatian", "german", "french", "other"]);
const AVAILABILITY = new Set(["daytime", "evenings", "weekends", "seasonal", "long-distance"]);
const AMENITIES = new Set(["air-conditioning", "wifi", "child-seats", "water", "accessibility"]);
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function invalid(message) {
  const error = new Error(message);
  error.status = 400;
  throw error;
}

function required(value, maximum = 200) {
  const result = clean(value, maximum);
  if (!result) invalid("Missing required fields");
  return result;
}

function integer(value, minimum, maximum) {
  const result = Number.parseInt(String(value), 10);
  if (!Number.isInteger(result) || result < minimum || result > maximum) invalid("Invalid application details");
  return result;
}

function choice(value, allowed) {
  const result = clean(value, 60);
  if (!allowed.has(result)) invalid("Invalid application details");
  return result;
}

function list(value, allowed, maximum = 8) {
  if (!Array.isArray(value)) return [];
  const result = [...new Set(value.map((item) => clean(item, 60)).filter((item) => allowed.has(item)))];
  if (result.length > maximum) invalid("Invalid application details");
  return result;
}

function date(value) {
  const result = clean(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result)) invalid("Invalid application details");
  const parsed = new Date(`${result}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== result) invalid("Invalid application details");
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (parsed < today) invalid("Insurance must be valid");
  return result;
}

function photoName(value, index) {
  const base = clean(value, 120).replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "").replace(/\.+/g, ".");
  return base || `vehicle-photo-${index + 1}.jpg`;
}

function photos(value) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 3) invalid("Please add between one and three vehicle photos");
  let total = 0;
  const result = value.map((entry, index) => {
    if (!entry || typeof entry !== "object") invalid("Invalid vehicle photos");
    const type = clean(entry.type, 40).toLowerCase();
    const data = String(entry.data || "");
    if (!IMAGE_TYPES.has(type) || !/^[A-Za-z0-9+/]+={0,2}$/.test(data) || data.length % 4 !== 0) invalid("Invalid vehicle photos");
    const size = Buffer.byteLength(data, "base64");
    if (!size || size > 1400000) invalid("Vehicle photo is too large");
    total += size;
    return { name: photoName(entry.name, index), type, data, size };
  });
  if (total > 2700000) invalid("Vehicle photos are too large");
  return result;
}

function validatePartnerApplication(input) {
  const application = {
    language: clean(input.language || "en", 5).toLowerCase(),
    applicantType: choice(input.applicantType, APPLICATION_TYPES),
    fullName: required(input.fullName, 160),
    companyName: clean(input.companyName, 160),
    email: required(input.email, 200).toLowerCase(),
    phone: required(input.phone, 80),
    country: required(input.country, 100),
    baseCity: required(input.baseCity, 120),
    yearsExperience: integer(input.yearsExperience, 0, 60),
    licenseNumber: required(input.licenseNumber, 100),
    transportPermit: required(input.transportPermit, 100),
    insuranceValidUntil: date(input.insuranceValidUntil),
    languages: list(input.languages, LANGUAGES, 5),
    otherLanguages: clean(input.otherLanguages, 160),
    availability: list(input.availability, AVAILABILITY, 5),
    vehicleMake: required(input.vehicleMake, 80),
    vehicleModel: required(input.vehicleModel, 100),
    vehicleYear: integer(input.vehicleYear, 1995, new Date().getFullYear() + 1),
    plateNumber: required(input.plateNumber, 30).toUpperCase(),
    vehicleColor: required(input.vehicleColor, 60),
    vehicleType: choice(input.vehicleType, VEHICLE_TYPES),
    seats: integer(input.seats, 1, 60),
    luggageCapacity: integer(input.luggageCapacity, 0, 40),
    amenities: list(input.amenities, AMENITIES, 5),
    serviceBase: required(input.serviceBase, 160),
    coverageCountries: required(input.coverageCountries, 500),
    usualRoutes: required(input.usualRoutes, 3000),
    notes: clean(input.notes, 3000),
    agreement: input.agreement === true,
    photos: photos(input.photos),
  };
  if (!["hr", "en", "de", "fr"].includes(application.language)) invalid("Invalid application language");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) invalid("Invalid email address");
  if (application.phone.length < 4 || !application.languages.length || !application.availability.length || !application.agreement) invalid("Missing required fields");
  if (application.applicantType === "transport-company" && !application.companyName) invalid("Company name is required");
  application.photoManifest = application.photos.map(({ name, type, size }) => ({ name, type, size }));
  return application;
}

module.exports = { validatePartnerApplication };
