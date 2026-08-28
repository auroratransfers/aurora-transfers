function body(req) {
  return req.body && typeof req.body === "object" ? req.body : {};
}

function fail(res, error) {
  const status = Number(error.status) || 500;
  const payload = { ok: false, error: status >= 500 ? "Internal server error" : error.message };
  if (process.env.NODE_ENV !== "production" && status >= 500) payload.detail = error.message;
  return res.status(status).json(payload);
}

function method(req, res, allowed) {
  if (allowed.includes(req.method)) return true;
  res.setHeader("Allow", allowed.join(", "));
  res.status(405).json({ ok: false, error: "Method not allowed" });
  return false;
}

module.exports = { body, fail, method };
