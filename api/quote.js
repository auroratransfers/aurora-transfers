const { body, fail, method } = require("../lib/http.cjs");
const { calculateQuote } = require("../lib/quote-engine.cjs");

module.exports = async (req, res) => {
  if (!method(req, res, ["POST"])) return;
  try {
    const payload = body(req);
    if (!String(payload.pickup || "").trim() || !String(payload.destination || "").trim()) {
      throw Object.assign(new Error("Pickup and destination are required"), { status: 400 });
    }
    return res.status(200).json({ ok: true, quote: calculateQuote(payload) });
  } catch (error) {
    return fail(res, error);
  }
};
