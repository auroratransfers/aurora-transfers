const { authenticateDevice } = require("../../lib/device-auth.cjs");
const { withDatabase } = require("../../lib/db.cjs");
const { body, fail, method } = require("../../lib/http.cjs");
const { clean } = require("../../lib/security.cjs");
const { haversineMeters, transitionRide } = require("../../lib/rides.cjs");

function targetStatus(action) {
  return { heading_to_pickup:"en_route", arrived:"arrived", start:"in_progress", complete:"completed", emergency:"emergency" }[action];
}

module.exports = async (req,res) => {
  if (!method(req,res,["GET","POST"])) return;
  try {
    const result=await withDatabase(async(sql)=>{
      const device=await authenticateDevice(sql,req);
      if (device.kind !== "driver_app" || !device.driver_id) throw Object.assign(new Error("A driver app credential is required"),{status:403});
      if (req.method === "GET") {
        const [rides,offers,vehicles]=await Promise.all([sql`select r.*,ri.full_name rider_name,ri.phone rider_phone,v.make vehicle_make,v.model vehicle_model,v.color vehicle_color,v.plate_number
          from rides r join riders ri on ri.id=r.rider_id left join vehicles v on v.id=r.vehicle_id
          where r.driver_id=${device.driver_id} and r.status in ('assigned','en_route','arrived','in_progress','emergency') order by r.scheduled_at`,
          sql`select o.id offer_id,o.expires_at,o.distance_to_pickup_m,r.id ride_id,r.reference,r.pickup_address,r.destination_address,r.scheduled_at,r.passenger_count
          from dispatch_offers o join rides r on r.id=o.ride_id where o.driver_id=${device.driver_id} and o.status='offered' and o.expires_at>now() order by o.offered_at desc`,
          sql`select id,make,model,color,plate_number,passenger_capacity,status from vehicles where status='available' or id=${device.vehicle_id} order by make,model`
        ]);
        return {device:{id:device.id,label:device.label,driverId:device.driver_id,vehicleId:device.vehicle_id},rides,offers,vehicles};
      }
      const data=body(req), rideId=clean(data.rideId,40), action=clean(data.action,40), toStatus=targetStatus(action);
      if(action==="select_vehicle"){
        const vehicleId=clean(data.vehicleId,40);
        const [active,vehicle]=await Promise.all([
          sql`select id from rides where driver_id=${device.driver_id} and status in ('assigned','en_route','arrived','in_progress','emergency') limit 1`,
          sql`select id,status from vehicles where id=${vehicleId}`,
        ]);
        if(active.length) throw Object.assign(new Error("Vehicle cannot be changed during an active ride"),{status:409});
        if(!vehicle.length||vehicle[0].status!=="available") throw Object.assign(new Error("Vehicle is not available"),{status:409});
        const [updated]=await sql`update device_credentials set vehicle_id=${vehicleId} where id=${device.id} returning id,driver_id,vehicle_id`;
        return {device:updated};
      }
      if(action==="set_availability"){
        const availability=data.status==="available"?"available":"offline";
        if(availability==="available"&&!device.vehicle_id) throw Object.assign(new Error("Select a vehicle before going online"),{status:409});
        if(availability==="offline"){
          const active=await sql`select id from rides where driver_id=${device.driver_id} and status in ('assigned','en_route','arrived','in_progress','emergency') limit 1`;
          if(active.length) throw Object.assign(new Error("Driver cannot go offline during an active ride"),{status:409});
        }
        const [driver]=await sql`update drivers set status=${availability},updated_at=now() where id=${device.driver_id} and status<>'suspended' returning id,status`;
        if(!driver) throw Object.assign(new Error("Driver account is suspended"),{status:403});
        return {driver};
      }
      if(action==="accept_offer" || action==="reject_offer"){
        const offerId=clean(data.offerId,40);
        return sql.begin(async(tx)=>{
          const [offer]=await tx`select * from dispatch_offers where id=${offerId} and driver_id=${device.driver_id} for update`;
          if(!offer || offer.status!=="offered" || new Date(offer.expires_at)<=new Date()) throw Object.assign(new Error("Dispatch offer is no longer available"),{status:409});
          if(action==="reject_offer"){
            await tx`update dispatch_offers set status='rejected',responded_at=now() where id=${offer.id}`;
            return {offer:{id:offer.id,status:"rejected"}};
          }
          const [offeredRide]=await tx`select * from rides where id=${offer.ride_id} for update`;
          if(!offeredRide || offeredRide.status!=="confirmed" || offeredRide.driver_id) throw Object.assign(new Error("Ride has already been assigned"),{status:409});
          const [assigned]=await tx`update rides set driver_id=${device.driver_id},vehicle_id=${offer.vehicle_id||device.vehicle_id||null},status='assigned',updated_at=now(),version=version+1 where id=${offeredRide.id} returning *`;
          await tx`update drivers set status='busy',updated_at=now() where id=${device.driver_id}`;
          if(assigned.vehicle_id) await tx`update vehicles set status='busy',updated_at=now() where id=${assigned.vehicle_id}`;
          await tx`update dispatch_offers set status=case when id=${offer.id} then 'accepted' else 'withdrawn' end,responded_at=now() where ride_id=${offeredRide.id} and status='offered'`;
          await tx`insert into ride_events(ride_id,event_type,actor_type,actor_id,from_status,to_status,metadata) values(${offeredRide.id},'dispatch_offer_accepted','driver',${String(device.driver_id)},${offeredRide.status},'assigned',${tx.json({offerId:offer.id,deviceId:device.id})})`;
          await tx`insert into notification_outbox(ride_id,recipient_type,recipient_id,channel,template,payload) values(${offeredRide.id},'rider',${String(offeredRide.rider_id)},'push','driver_assigned',${tx.json({rideReference:offeredRide.reference})})`;
          return {ride:assigned,offer:{id:offer.id,status:"accepted"}};
        });
      }
      if (!toStatus) throw Object.assign(new Error("Unknown driver action"),{status:400});
      const [ride]=await sql`select * from rides where id=${rideId} and driver_id=${device.driver_id}`;
      if (!ride) throw Object.assign(new Error("Ride is not assigned to this driver"),{status:403});
      if (["arrived","start","complete"].includes(action)) {
        if (!ride.last_location_at || Date.now()-new Date(ride.last_location_at).getTime()>120000) throw Object.assign(new Error("A recent GPS position is required"),{status:409});
        const target=action === "complete" ? [ride.destination_lat,ride.destination_lng] : [ride.pickup_lat,ride.pickup_lng];
        const distance=haversineMeters(ride.last_lat,ride.last_lng,target[0],target[1]);
        if (distance != null && distance>250) throw Object.assign(new Error(`Vehicle is ${Math.round(distance)} m outside the required zone`),{status:409});
      }
      const updated=await transitionRide(sql,{rideId,toStatus,actorType:"driver",actorId:String(device.driver_id),metadata:{action,deviceId:device.id}});
      return {ride:updated};
    });
    return res.status(200).json({ok:true,...result});
  } catch(error){ return fail(res,error); }
};
