const crypto = require("crypto");
const { databaseConfigured, ensureSchema, withDatabase } = require("../lib/db.cjs");
const { body, fail, method } = require("../lib/http.cjs");
const { validatePartnerApplication } = require("../lib/partner-applications.cjs");

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function reference(id = crypto.randomUUID()) {
  return `PARTNER-${String(id).replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

async function sendEmail({ to, replyTo, subject, html, photos = [] }) {
  if (!process.env.RESEND_API_KEY || !to) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.PARTNER_FROM_EMAIL || process.env.BOOKING_FROM_EMAIL || "Aurora Transfers <bookings@auroratransfers.com>",
      to: [to],
      reply_to: replyTo || undefined,
      subject,
      html,
      ...(photos.length ? { attachments: photos.map((photo) => ({ filename: photo.name, content: photo.data })) } : {}),
    }),
  });
  if (!response.ok) throw new Error(`Email delivery failed: ${response.status}`);
  return true;
}

function item(label, value) {
  return `<tr><th style="padding:7px 12px 7px 0;text-align:left;vertical-align:top;color:#514a57">${escapeHtml(label)}</th><td style="padding:7px 0">${escapeHtml(value || "-")}</td></tr>`;
}

function details(application, applicationReference) {
  return `<h2>Aurora partner application ${escapeHtml(applicationReference)}</h2>
  <h3>Applicant</h3><table>${item("Type", application.applicantType)}${item("Name", application.fullName)}${item("Company", application.companyName)}${item("Email", application.email)}${item("Phone", application.phone)}${item("Country", application.country)}${item("Base city", application.baseCity)}</table>
  <h3>Licensing and availability</h3><table>${item("Experience", `${application.yearsExperience} years`)}${item("Driving licence", application.licenseNumber)}${item("Transport permit", application.transportPermit)}${item("Insurance valid until", application.insuranceValidUntil)}${item("Languages", application.languages.join(", "))}${item("Other languages", application.otherLanguages)}${item("Availability", application.availability.join(", "))}</table>
  <h3>Vehicle</h3><table>${item("Vehicle", `${application.vehicleMake} ${application.vehicleModel} (${application.vehicleYear})`)}${item("Plate", application.plateNumber)}${item("Colour", application.vehicleColor)}${item("Type", application.vehicleType)}${item("Seats", application.seats)}${item("Luggage capacity", application.luggageCapacity)}${item("Amenities", application.amenities.join(", "))}</table>
  <h3>Coverage</h3><table>${item("Ride starting location", application.serviceBase)}${item("Coverage", application.coverageCountries)}${item("Routes", application.usualRoutes)}${item("Notes", application.notes)}</table>
  <p>${application.photos.length} vehicle photo${application.photos.length === 1 ? "" : "s"} attached.</p>`;
}

async function persist(application) {
  await ensureSchema();
  return withDatabase(async (sql) => {
    const [created] = await sql`insert into partner_applications(
      language,applicant_type,full_name,company_name,email,phone,country,base_city,years_experience,license_number,transport_permit,insurance_valid_until,languages,other_languages,availability,vehicle_make,vehicle_model,vehicle_year,plate_number,vehicle_color,vehicle_type,seats,luggage_capacity,amenities,service_base,coverage_countries,usual_routes,notes,photo_manifest
    ) values (
      ${application.language},${application.applicantType},${application.fullName},${application.companyName || null},${application.email},${application.phone},${application.country},${application.baseCity},${application.yearsExperience},${application.licenseNumber},${application.transportPermit},${application.insuranceValidUntil},${sql.json(application.languages)},${application.otherLanguages || null},${sql.json(application.availability)},${application.vehicleMake},${application.vehicleModel},${application.vehicleYear},${application.plateNumber},${application.vehicleColor},${application.vehicleType},${application.seats},${application.luggageCapacity},${sql.json(application.amenities)},${application.serviceBase},${application.coverageCountries},${application.usualRoutes},${application.notes || null},${sql.json(application.photoManifest)}
    ) returning id,status`;
    return created;
  });
}

module.exports = async (req, res) => {
  if (!method(req, res, ["POST"])) return;
  try {
    const application = validatePartnerApplication(body(req));
    const recipient = process.env.PARTNER_TO_EMAIL || process.env.BOOKING_TO_EMAIL || process.env.SITE_EMAIL;
    let created;
    if (databaseConfigured()) created = await persist(application);
    if (!created && !recipient) throw Object.assign(new Error("Partner application service is not configured"), { status: 503 });
    const applicationReference = reference(created?.id);
    const html = details(application, applicationReference);
    if (created) {
      await Promise.allSettled([
        sendEmail({ to: recipient, replyTo: application.email, subject: `Aurora partner application: ${applicationReference}`, html, photos: application.photos }),
        sendEmail({ to: application.email, replyTo: recipient, subject: `Aurora partner application received: ${applicationReference}`, html: `<p>Dear ${escapeHtml(application.fullName)},</p><p>Thank you for applying to partner with Aurora. Our team will review your details and contact you with the next steps.</p>` }),
      ]);
      return res.status(201).json({ ok: true, persisted: true, reference: applicationReference });
    }
    const sent = await sendEmail({ to: recipient, replyTo: application.email, subject: `Aurora partner application: ${applicationReference}`, html, photos: application.photos });
    if (!sent) throw Object.assign(new Error("Partner application service is not configured"), { status: 503 });
    return res.status(202).json({ ok: true, persisted: false, reference: applicationReference });
  } catch (error) {
    return fail(res, error);
  }
};
