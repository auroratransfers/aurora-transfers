const { withDatabase } = require("../lib/db.cjs");
const { body, fail, method } = require("../lib/http.cjs");
const { clean, hashToken, randomToken, requireAdmin } = require("../lib/security.cjs");
const { appendEvent, transitionRide } = require("../lib/rides.cjs");

function query(req) {
  return new URL(req.url, "https://aurora.local").searchParams;
}

async function getData(sql, req) {
  const params = query(req);
  const resource = params.get("resource") || "overview";
  if (resource === "overview") {
    const [counts, rides, incidents, drivers] = await Promise.all([
      sql`select count(*) filter(where status in ('requested','confirmed','assigned','en_route','arrived','in_progress','emergency'))::int active,
                 count(*) filter(where status='in_progress')::int live,
                 count(*) filter(where status='requested')::int unconfirmed,
                 count(*) filter(where status='completed' and completed_at::date=current_date)::int completed_today from rides`,
      sql`select r.*,ri.full_name rider_name,ri.phone rider_phone,d.full_name driver_name,v.plate_number,v.make vehicle_make,v.model vehicle_model
          from rides r join riders ri on ri.id=r.rider_id left join drivers d on d.id=r.driver_id left join vehicles v on v.id=r.vehicle_id
          where r.scheduled_at >= now()-interval '1 day' order by r.scheduled_at asc limit 100`,
      sql`select i.*,r.reference from incidents i left join rides r on r.id=i.ride_id where i.status in ('open','acknowledged') order by i.created_at desc limit 30`,
      sql`select d.*,count(r.id) filter(where r.status in ('assigned','en_route','arrived','in_progress'))::int active_rides
          from drivers d left join rides r on r.driver_id=d.id group by d.id order by d.full_name`,
    ]);
    return { counts: counts[0], rides, incidents, drivers };
  }
  if (resource === "rides") return { rides: await sql`select r.*,ri.full_name rider_name,ri.email rider_email,ri.phone rider_phone,d.full_name driver_name,v.plate_number from rides r join riders ri on ri.id=r.rider_id left join drivers d on d.id=r.driver_id left join vehicles v on v.id=r.vehicle_id order by r.scheduled_at desc limit 500` };
  if (resource === "drivers") return { drivers: await sql`select * from drivers order by full_name`, devices: await sql`select id,label,kind,driver_id,vehicle_id,active,last_seen_at,created_at from device_credentials order by created_at desc` };
  if (resource === "vehicles") return { vehicles: await sql`select * from vehicles order by plate_number` };
  if (resource === "ride") {
    const id = clean(params.get("id"), 40);
    const [ride] = await sql`select r.*,ri.full_name rider_name,ri.email rider_email,ri.phone rider_phone,d.full_name driver_name,d.phone driver_phone,v.plate_number,v.make vehicle_make,v.model vehicle_model,v.color vehicle_color from rides r join riders ri on ri.id=r.rider_id left join drivers d on d.id=r.driver_id left join vehicles v on v.id=r.vehicle_id where r.id=${id}`;
    if (!ride) throw Object.assign(new Error("Ride not found"), { status: 404 });
    const [events, positions] = await Promise.all([
      sql`select * from ride_events where ride_id=${id} order by occurred_at desc limit 200`,
      sql`select latitude,longitude,accuracy_m,heading,speed_kph,source,recorded_at from ride_positions where ride_id=${id} order by recorded_at desc limit 300`,
    ]);
    return { ride, events, positions };
  }
  throw Object.assign(new Error("Unknown resource"), { status: 400 });
}

async function postAction(sql, req) {
  const data = body(req); const action = clean(data.action, 50);
  if (action === "create_driver") {
    const name = clean(data.fullName, 160); if (!name) throw Object.assign(new Error("Driver name is required"), { status: 400 });
    const [driver] = await sql`insert into drivers(full_name,phone,email,license_number) values(${name},${clean(data.phone,80)||null},${clean(data.email,200)||null},${clean(data.licenseNumber,100)||null}) returning *`;
    return { driver };
  }
  if (action === "create_vehicle") {
    const make=clean(data.make,80), model=clean(data.model,80), plate=clean(data.plateNumber,30).toUpperCase();
    if (!make || !model || !plate) throw Object.assign(new Error("Make, model and plate are required"), { status: 400 });
    const [vehicle] = await sql`insert into vehicles(make,model,color,plate_number,passenger_capacity,tracker_external_id) values(${make},${model},${clean(data.color,50)||null},${plate},${Number(data.capacity)||4},${clean(data.trackerExternalId,100)||null}) returning *`;
    return { vehicle };
  }
  if (action === "assign_ride") {
    const rideId=clean(data.rideId,40), driverId=clean(data.driverId,40), vehicleId=clean(data.vehicleId,40);
    if (!driverId || !vehicleId) throw Object.assign(new Error("Driver and vehicle are required"), { status:400 });
    return sql.begin(async (tx) => {
      const [ride] = await tx`select * from rides where id=${rideId} for update`;
      if (!ride) throw Object.assign(new Error("Ride not found"), { status:404 });
      if (!["confirmed","assigned"].includes(ride.status)) throw Object.assign(new Error("Confirm the ride before assigning it"), { status:409 });
      const [driver,vehicle,conflict] = await Promise.all([
        tx`select id,status from drivers where id=${driverId}`,
        tx`select id,status from vehicles where id=${vehicleId}`,
        tx`select id from rides where id<>${rideId} and status in ('assigned','en_route','arrived','in_progress','emergency') and (driver_id=${driverId} or vehicle_id=${vehicleId}) limit 1`,
      ]);
      if (!driver.length || !vehicle.length) throw Object.assign(new Error("Driver or vehicle not found"), { status:404 });
      if (driver[0].status === "suspended" || ["maintenance","inactive"].includes(vehicle[0].status)) throw Object.assign(new Error("Driver or vehicle is unavailable"), { status:409 });
      if (conflict.length) throw Object.assign(new Error("Driver or vehicle already has an active ride"), { status:409 });
      if (ride.driver_id && String(ride.driver_id) !== driverId) await tx`update drivers set status='available',updated_at=now() where id=${ride.driver_id} and status<>'suspended'`;
      if (ride.vehicle_id && String(ride.vehicle_id) !== vehicleId) await tx`update vehicles set status='available',updated_at=now() where id=${ride.vehicle_id} and status='busy'`;
      const [assigned] = await tx`update rides set driver_id=${driverId},vehicle_id=${vehicleId},status='assigned',updated_at=now(),version=version+1 where id=${rideId} returning *`;
      await tx`update drivers set status='busy',updated_at=now() where id=${driverId}`;
      await tx`update vehicles set status='busy',updated_at=now() where id=${vehicleId}`;
      await appendEvent(tx, rideId, "ride_assigned", "admin", "admin", ride.status, "assigned", { driverId, vehicleId });
      return { ride: assigned };
    });
  }
  if (action === "dispatch_ride") {
    const rideId=clean(data.rideId,40);
    return sql.begin(async(tx)=>{
      const [ride]=await tx`select * from rides where id=${rideId} for update`;
      if(!ride || ride.status!=="confirmed" || ride.driver_id) throw Object.assign(new Error("Only an unassigned confirmed ride can be dispatched"),{status:409});
      await tx`update dispatch_offers set status='expired',responded_at=now() where ride_id=${rideId} and status='offered'`;
      const candidates=await tx`select d.id driver_id,dc.vehicle_id,
        case when ${ride.pickup_lat}::double precision is null or p.latitude is null then null else
        6371000*2*asin(sqrt(power(sin(radians(p.latitude-${ride.pickup_lat})/2),2)+cos(radians(${ride.pickup_lat}))*cos(radians(p.latitude))*power(sin(radians(p.longitude-${ride.pickup_lng})/2),2))) end distance_m
        from drivers d join device_credentials dc on dc.driver_id=d.id and dc.kind='driver_app' and dc.active=true and dc.revoked_at is null and dc.last_seen_at>now()-interval '5 minutes'
        join vehicles v on v.id=dc.vehicle_id and v.status='available'
        left join lateral(select latitude,longitude from ride_positions where driver_id=d.id order by recorded_at desc limit 1)p on true
        where d.status='available' and not exists(select 1 from rides active where active.driver_id=d.id and active.status in ('assigned','en_route','arrived','in_progress','emergency'))
        order by distance_m asc nulls last limit 5`;
      if(!candidates.length) throw Object.assign(new Error("No eligible driver app devices are available"),{status:409});
      const offers=[];
      for(const candidate of candidates){const [offer]=await tx`insert into dispatch_offers(ride_id,driver_id,vehicle_id,distance_to_pickup_m,expires_at) values(${rideId},${candidate.driver_id},${candidate.vehicle_id},${candidate.distance_m},now()+interval '30 seconds') returning *`;offers.push(offer);await tx`insert into notification_outbox(ride_id,recipient_type,recipient_id,channel,template,payload) values(${rideId},'driver',${String(candidate.driver_id)},'push','new_dispatch_offer',${tx.json({offerId:offer.id,expiresAt:offer.expires_at})})`;}
      await appendEvent(tx,rideId,"dispatch_started","admin","admin",ride.status,ride.status,{offerCount:offers.length});
      return {offers};
    });
  }
  if (action === "transition_ride") {
    const reason=clean(data.reason,500); const toStatus=clean(data.toStatus,30);
    const ride=await transitionRide(sql,{rideId:clean(data.rideId,40),toStatus,actorType:"admin",actorId:"admin",metadata:{reason},adminOverride:Boolean(data.override)});
    return { ride };
  }
  if (action === "set_price") {
    const price=Number(data.price); if (!Number.isFinite(price) || price < 0) throw Object.assign(new Error("Invalid price"), { status:400 });
    const [ride]=await sql`update rides set quoted_price=${price},currency=${clean(data.currency||"EUR",3).toUpperCase()},updated_at=now() where id=${clean(data.rideId,40)} returning *`;
    if (!ride) throw Object.assign(new Error("Ride not found"), { status:404 });
    await appendEvent(sql,ride.id,"price_set","admin","admin",ride.status,ride.status,{price,currency:ride.currency}); return {ride};
  }
  if (action === "create_device_token") {
    const token=randomToken(32), kind=data.kind === "vehicle_tracker" ? "vehicle_tracker" : "driver_app";
    const driverId=clean(data.driverId,40)||null, vehicleId=clean(data.vehicleId,40)||null;
    if (kind === "driver_app" && !driverId) throw Object.assign(new Error("A driver is required for an app token"), { status:400 });
    if (kind === "vehicle_tracker" && !vehicleId) throw Object.assign(new Error("A vehicle is required for a tracker token"), { status:400 });
    const [owner]=kind === "driver_app" ? await sql`select id from drivers where id=${driverId}` : await sql`select id from vehicles where id=${vehicleId}`;
    if (!owner) throw Object.assign(new Error("Driver or vehicle not found"), { status:404 });
    const [device]=await sql`insert into device_credentials(label,kind,token_hash,driver_id,vehicle_id) values(${clean(data.label,120)||"Aurora device"},${kind},${hashToken(token)},${driverId},${vehicleId}) returning id,label,kind,driver_id,vehicle_id,active,created_at`;
    return { device, token };
  }
  if (action === "resolve_incident") {
    const [incident]=await sql`update incidents set status=${data.dismiss ? "dismissed":"resolved"},resolved_at=now() where id=${clean(data.incidentId,40)} returning *`;
    return {incident};
  }
  throw Object.assign(new Error("Unknown action"), { status: 400 });
}

module.exports = async (req,res) => {
  if (!method(req,res,["GET","POST"]) || !requireAdmin(req,res)) return;
  try {
    const result=await withDatabase((sql)=>req.method === "GET" ? getData(sql,req) : postAction(sql,req));
    return res.status(200).json({ok:true,...result});
  } catch(error) { return fail(res,error); }
};
