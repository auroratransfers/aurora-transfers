const { databaseConfigured, withDatabase } = require("../lib/db.cjs");
const { fail, method } = require("../lib/http.cjs");
const { coordinate } = require("../lib/quote-engine.cjs");
const { haversineMeters } = require("../lib/rides.cjs");

function publicVehicle(row, pickupLat, pickupLng) {
  const distanceMeters = haversineMeters(pickupLat, pickupLng, row.latitude, row.longitude);
  const distanceKm = distanceMeters == null ? null : Math.round(distanceMeters / 100) / 10;
  const etaMinutes = distanceKm == null ? null : Math.max(3, Math.min(30, Math.round(distanceKm * 2.4 + 2)));
  return {
    id: row.id,
    label: row.passenger_capacity >= 6 ? "Premium van" : "Aurora vehicle",
    passengerCapacity: row.passenger_capacity,
    latitude: Math.round(Number(row.latitude) * 1000) / 1000,
    longitude: Math.round(Number(row.longitude) * 1000) / 1000,
    distanceKm,
    etaMinutes,
    updatedAt: row.recorded_at,
  };
}

module.exports = async (req, res) => {
  if (!method(req, res, ["GET"])) return;
  try {
    const url = new URL(req.url || "/api/availability", "https://aurora-transfers.vercel.app");
    const pickupLat = coordinate(url.searchParams.get("lat"), -90, 90);
    const pickupLng = coordinate(url.searchParams.get("lng"), -180, 180);
    if (pickupLat == null || pickupLng == null) {
      return res.status(200).json({ ok: true, source: "pilot", vehicles: [] });
    }
    if (!databaseConfigured()) return res.status(200).json({ ok: true, source: "pilot", vehicles: [] });
    const rows = await withDatabase((sql) => sql`
      select v.id,v.passenger_capacity,p.latitude,p.longitude,p.recorded_at
      from vehicles v
      join lateral (
        select latitude,longitude,recorded_at
        from ride_positions
        where vehicle_id=v.id and recorded_at>now()-interval '5 minutes'
        order by recorded_at desc limit 1
      ) p on true
      where v.status='available'
        and not exists(
          select 1 from rides r
          where r.vehicle_id=v.id and r.status in ('assigned','en_route','arrived','in_progress','emergency')
        )
      order by p.recorded_at desc
      limit 20
    `);
    const vehicles = rows
      .map((row) => publicVehicle(row, pickupLat, pickupLng))
      .filter((vehicle) => vehicle.distanceKm != null && vehicle.distanceKm <= 25)
      .sort((left, right) => (left.distanceKm || 999) - (right.distanceKm || 999))
      .slice(0, 8);
    return res.status(200).json({ ok: true, source: vehicles.length ? "live" : "pilot", vehicles });
  } catch (error) {
    return fail(res, error);
  }
};
