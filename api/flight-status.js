const { fail, method } = require("../lib/http.cjs");
const { lookupFlight } = require("../lib/flight-status.cjs");

module.exports = async (req, res) => {
  if (!method(req, res, ["GET"])) return;
  try {
    const url = new URL(req.url || "/api/flight-status", "https://aurora-transfers.vercel.app");
    const result = await lookupFlight(url.searchParams.get("flight"), url.searchParams.get("date"));
    res.setHeader("Cache-Control", "private, max-age=30");
    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    return fail(res, error);
  }
};
