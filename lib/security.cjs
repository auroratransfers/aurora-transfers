const crypto = require("crypto");

const ADMIN_COOKIE = "aurora_admin_session";
const ADMIN_MAX_AGE = 60 * 60 * 12;

function clean(value, max = 500) {
  return String(value == null ? "" : value).trim().replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, max);
}

function hashToken(token) {
  return crypto.createHash("sha256").update(String(token)).digest("hex");
}

function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function secureEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.BOOKING_ACTION_SECRET || "";
}

function sign(value) {
  if (!sessionSecret()) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return crypto.createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

function createAdminSession() {
  const now = Math.floor(Date.now() / 1000);
  const body = Buffer.from(JSON.stringify({ iat: now, exp: now + ADMIN_MAX_AGE })).toString("base64url");
  return `${body}.${sign(body)}`;
}

function parseCookies(req) {
  return String(req.headers.cookie || "").split(";").reduce((all, item) => {
    const index = item.indexOf("=");
    if (index > 0) all[decodeURIComponent(item.slice(0, index).trim())] = decodeURIComponent(item.slice(index + 1).trim());
    return all;
  }, {});
}

function isAdmin(req) {
  try {
    const [body, signature] = String(parseCookies(req)[ADMIN_COOKIE] || "").split(".");
    if (!body || !signature || !secureEqual(signature, sign(body))) return false;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch (_) {
    return false;
  }
}

function setAdminCookie(res, value, maxAge = ADMIN_MAX_AGE) {
  res.setHeader("Set-Cookie", `${ADMIN_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`);
}

function requireAdmin(req, res) {
  if (isAdmin(req)) return true;
  res.status(401).json({ ok: false, error: "Authentication required" });
  return false;
}

function bearerToken(req) {
  const match = String(req.headers.authorization || "").match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

module.exports = {
  bearerToken,
  clean,
  createAdminSession,
  hashToken,
  isAdmin,
  randomToken,
  requireAdmin,
  secureEqual,
  setAdminCookie,
};
