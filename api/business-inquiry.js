const crypto = require("crypto");
const { databaseConfigured, withDatabase } = require("../lib/db.cjs");
const { body, fail, method } = require("../lib/http.cjs");
const { clean } = require("../lib/security.cjs");

const COMPANY_TYPES = new Set(["hotel", "villa-agency", "travel-agency", "event", "corporate", "yacht-marina", "other"]);

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function reference() {
  return `BIZ-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

async function sendEmail({ to, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY || !to) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.BUSINESS_FROM_EMAIL || process.env.BOOKING_FROM_EMAIL || "Aurora Transfers <bookings@auroratransfers.com>",
      to: [to], reply_to: replyTo, subject, html,
    }),
  });
  if (!response.ok) throw new Error(`Email delivery failed: ${response.status}`);
  return true;
}

function validate(raw) {
  const inquiry = {
    language: ["hr", "en", "de", "fr"].includes(clean(raw.language, 5)) ? clean(raw.language, 5) : "en",
    companyName: clean(raw.companyName, 180),
    contactName: clean(raw.contactName, 160),
    email: clean(raw.email, 200).toLowerCase(),
    phone: clean(raw.phone, 80),
    companyType: clean(raw.companyType, 50),
    operatingCities: clean(raw.operatingCities, 300),
    monthlyRides: clean(raw.monthlyRides, 80),
    message: clean(raw.message, 3000),
  };
  if (!inquiry.companyName || !inquiry.contactName || !inquiry.email || !inquiry.companyType || !inquiry.message) {
    throw Object.assign(new Error("Missing required fields"), { status: 400 });
  }
  if (!validEmail(inquiry.email)) throw Object.assign(new Error("Invalid email address"), { status: 400 });
  if (!COMPANY_TYPES.has(inquiry.companyType)) throw Object.assign(new Error("Invalid company type"), { status: 400 });
  return inquiry;
}

module.exports = async (req, res) => {
  if (!method(req, res, ["POST"])) return;
  try {
    const inquiry = validate(body(req));
    const id = reference();
    const html = `<h2>New Aurora business inquiry ${escapeHtml(id)}</h2><p><strong>${escapeHtml(inquiry.companyName)}</strong><br>${escapeHtml(inquiry.contactName)}<br>${escapeHtml(inquiry.email)}${inquiry.phone ? `<br>${escapeHtml(inquiry.phone)}` : ""}</p><p>Type: ${escapeHtml(inquiry.companyType)}<br>Operating cities: ${escapeHtml(inquiry.operatingCities || "Not provided")}<br>Expected monthly rides: ${escapeHtml(inquiry.monthlyRides || "Not provided")}</p><p>${escapeHtml(inquiry.message)}</p>`;
    if (databaseConfigured()) {
      await withDatabase((sql) => sql`insert into business_inquiries(reference,language,company_name,contact_name,email,phone,company_type,operating_cities,monthly_rides,message)
        values(${id},${inquiry.language},${inquiry.companyName},${inquiry.contactName},${inquiry.email},${inquiry.phone || null},${inquiry.companyType},${inquiry.operatingCities || null},${inquiry.monthlyRides || null},${inquiry.message})`);
    }
    const to = process.env.BUSINESS_TO_EMAIL || process.env.BOOKING_TO_EMAIL || process.env.SITE_EMAIL;
    const sent = await sendEmail({ to, replyTo: inquiry.email, subject: `Aurora business inquiry: ${id}`, html });
    if (!databaseConfigured() && !sent) throw Object.assign(new Error("Business inquiries are not configured"), { status: 503 });
    return res.status(201).json({ ok: true, reference: id, persisted: databaseConfigured(), emailed: sent });
  } catch (error) {
    return fail(res, error);
  }
};
