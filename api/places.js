const { method } = require("../lib/http.cjs");
const { searchCroatiaPlaces } = require("../lib/croatia-places.cjs");

module.exports = async (req, res) => {
  if (!method(req, res, ["GET"])) return;
  res.setHeader("Cache-Control", "private, no-store");
  const url = new URL(req.url || "/api/places", "https://aurora-transfers.vercel.app");
  const query = String(url.searchParams.get("q") || "").trim().slice(0, 120);
  return res.status(200).json({
    ok: true,
    country: "HR",
    provider: "catalog",
    places: searchCroatiaPlaces(query, 8),
  });
};
