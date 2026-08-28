const { withDatabase } = require("../../lib/db.cjs");
const { body, fail, method } = require("../../lib/http.cjs");
const { clean, hashToken } = require("../../lib/security.cjs");
const { appendEvent } = require("../../lib/rides.cjs");

function token(req){ return clean(new URL(req.url,"https://aurora.local").searchParams.get("token")||body(req).token,200); }

module.exports=async(req,res)=>{
  if(!method(req,res,["GET","POST"])) return;
  try{
    const result=await withDatabase(async(sql)=>{
      const raw=token(req); if(!raw) throw Object.assign(new Error("Tracking token is required"),{status:401});
      const [ride]=await sql`select r.*,ri.preferred_language,d.full_name driver_name,d.photo_url driver_photo,v.make vehicle_make,v.model vehicle_model,v.color vehicle_color,v.plate_number
        from rides r join riders ri on ri.id=r.rider_id left join drivers d on d.id=r.driver_id left join vehicles v on v.id=r.vehicle_id
        where r.tracking_token_hash=${hashToken(raw)} and r.tracking_expires_at>now()`;
      if(!ride) throw Object.assign(new Error("Tracking link is invalid or expired"),{status:404});
      if(req.method==="POST"){
        const action=clean(body(req).action,40);
        if(action==="report_issue"){
          const message=clean(body(req).message,1000); if(!message) throw Object.assign(new Error("Message is required"),{status:400});
          const [incident]=await sql`insert into incidents(ride_id,type,severity,title,details) values(${ride.id},'rider_report','high','Rider reported an issue',${sql.json({message})}) returning id`;
          await appendEvent(sql,ride.id,"rider_reported_issue","rider",null,ride.status,ride.status,{incidentId:incident.id}); return {reported:true};
        }
        if(action==="confirm_completed"){
          await appendEvent(sql,ride.id,"rider_confirmed_completion","rider",null,ride.status,ride.status,{}); return {confirmed:true};
        }
        if(action==="rate"){
          const rating=Number(body(req).rating); if(!Number.isInteger(rating)||rating<1||rating>5||ride.status!=="completed") throw Object.assign(new Error("A completed ride and rating from 1 to 5 are required"),{status:400});
          await sql`insert into ride_ratings(ride_id,author_type,rating,comment) values(${ride.id},'rider',${rating},${clean(body(req).comment,1000)||null}) on conflict(ride_id,author_type) do update set rating=excluded.rating,comment=excluded.comment`;
          return {rated:true};
        }
        throw Object.assign(new Error("Unknown action"),{status:400});
      }
      const positions=await sql`select latitude,longitude,heading,speed_kph,recorded_at from ride_positions where ride_id=${ride.id} order by recorded_at desc limit 100`;
      const safeRide={reference:ride.reference,language:ride.preferred_language,status:ride.status,pickupAddress:ride.pickup_address,destinationAddress:ride.destination_address,scheduledAt:ride.scheduled_at,arrivedAt:ride.arrived_at,startedAt:ride.started_at,completedAt:ride.completed_at,driver:ride.driver_name?{name:ride.driver_name,photo:ride.driver_photo}:null,vehicle:ride.plate_number?{make:ride.vehicle_make,model:ride.vehicle_model,color:ride.vehicle_color,plate:ride.plate_number}:null,lastLocation:ride.last_lat==null?null:{latitude:ride.last_lat,longitude:ride.last_lng,heading:ride.last_heading,updatedAt:ride.last_location_at}};
      return {ride:safeRide,positions:positions.reverse()};
    });
    return res.status(200).json({ok:true,...result});
  }catch(error){return fail(res,error);}
};
