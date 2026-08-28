const clean = (value, max = 500) => String(value || "").trim().slice(0, max);
const escapeHtml = (value) => clean(value, 4000).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const booking = {
    service: clean(body.service), pickup: clean(body.pickup), destination: clean(body.destination),
    name: clean(body.name), email: clean(body.email), phone: clean(body.phone), passengers: clean(body.passengers),
    tripType: clean(body.tripType), date: clean(body.date), time: clean(body.time),
    returnDate: clean(body.returnDate), returnTime: clean(body.returnTime),
    flight: clean(body.flight), message: clean(body.message, 4000)
  };
  const missingReturn = booking.tripType === "return" && (!booking.returnDate || !booking.returnTime);
  if (!booking.service || !booking.pickup || !booking.destination || !booking.name || !booking.email || !booking.phone || !booking.date || !booking.time || missingReturn) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }
  if (!process.env.RESEND_API_KEY || !process.env.BOOKING_TO_EMAIL) return res.status(200).json({ ok: true, configured: false });
  const rows = Object.entries(booking).map(([key, value]) => `<tr><td style="padding:7px 12px;color:#6f6875">${escapeHtml(key)}</td><td style="padding:7px 12px;font-weight:600">${escapeHtml(value)}</td></tr>`).join("");
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.BOOKING_FROM_EMAIL || "Aurora Transfers <onboarding@resend.dev>", to: [process.env.BOOKING_TO_EMAIL], reply_to: booking.email, subject: `New Aurora transfer request: ${booking.pickup} - ${booking.destination}`, html: `<h2>New transfer request</h2><table>${rows}</table>` }) });
  if (!response.ok) return res.status(502).json({ ok: false, error: "Email delivery failed" });
  return res.status(200).json({ ok: true, configured: true });
};
