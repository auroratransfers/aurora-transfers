const { withDatabase } = require("../../lib/db.cjs");
const { body, fail, method } = require("../../lib/http.cjs");
const { clean, hashToken } = require("../../lib/security.cjs");
const { appendEvent } = require("../../lib/rides.cjs");

function token(req){ return clean(new URL(req.url,"https://aurora.local").searchParams.get("token")||body(req).token,200); }

function optionalNumber(value,min,max,name){
  if(value==null||value==="") return null;
  const parsed=Number(value);
  if(!Number.isFinite(parsed)||parsed<min||parsed>max) throw Object.assign(new Error(`Invalid ${name}`),{status:400});
  return parsed;
}

function supportPhone(){
  const value=clean(process.env.AURORA_SUPPORT_PHONE||process.env.SITE_PHONE||"+385000000000",40);
  return value.replace(/[^+\d]/g,"")||"+385000000000";
}

function escapeHtml(value){
  return String(value==null?"":value).replace(/[&<>"']/g,(character)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[character]);
}

async function sendPanicEmail({ride,incident,location}){
  const to=process.env.EMERGENCY_TO_EMAIL||process.env.BOOKING_TO_EMAIL||process.env.SITE_EMAIL;
  if(!process.env.RESEND_API_KEY||!to) return false;
  const map=location.latitude==null?"Location unavailable":`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=17/${location.latitude}/${location.longitude}`;
  const response=await fetch("https://api.resend.com/emails",{
    method:"POST",
    headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},
    body:JSON.stringify({
      from:process.env.EMERGENCY_FROM_EMAIL||process.env.BOOKING_FROM_EMAIL||"Aurora Transfers <bookings@auroratransfers.com>",
      to:[to],
      subject:`URGENT: Rider panic alert ${ride.reference}`,
      html:`<h2>Rider panic alert</h2><p><strong>${escapeHtml(ride.reference)}</strong><br>${escapeHtml(ride.rider_name)} · ${escapeHtml(ride.rider_phone || "No phone")}</p><p><a href="${escapeHtml(map)}">Open reported location</a><br>Source: ${escapeHtml(location.source)}</p><p>Incident: ${escapeHtml(incident.id)}</p>`,
    }),
  });
  return response.ok;
}

module.exports=async(req,res)=>{
  if(!method(req,res,["GET","POST"])) return;
  try{
    const result=await withDatabase(async(sql)=>{
      const raw=token(req); if(!raw) throw Object.assign(new Error("Tracking token is required"),{status:401});
      const [ride]=await sql`select r.*,ri.preferred_language,ri.full_name rider_name,ri.phone rider_phone,d.full_name driver_name,d.photo_url driver_photo,v.make vehicle_make,v.model vehicle_model,v.color vehicle_color,v.plate_number
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
        if(action==="panic"){
          const data=body(req);
          const latitude=optionalNumber(data.latitude,-90,90,"latitude");
          const longitude=optionalNumber(data.longitude,-180,180,"longitude");
          if((latitude==null)!==(longitude==null)) throw Object.assign(new Error("Both latitude and longitude are required"),{status:400});
          const accuracyM=optionalNumber(data.accuracyM,0,10000,"accuracy");
          const location=latitude==null
            ? {latitude:ride.last_lat==null?null:Number(ride.last_lat),longitude:ride.last_lng==null?null:Number(ride.last_lng),accuracyM:null,source:ride.last_lat==null?"unavailable":"vehicle_last_known"}
            : {latitude,longitude,accuracyM,source:"rider_device"};
          const message=clean(data.message,500)||"No message provided";
          const alert=await sql.begin(async(tx)=>{
            const [existing]=await tx`select id from incidents where ride_id=${ride.id} and type='rider_panic' and status in ('open','acknowledged') and created_at>now()-interval '2 minutes' order by created_at desc limit 1`;
            if(existing) return {incident:existing,duplicate:true};
            const details={
              rider_name:ride.rider_name,
              rider_phone:ride.rider_phone||null,
              latitude:location.latitude,
              longitude:location.longitude,
              accuracy_m:location.accuracyM,
              location_source:location.source,
              message,
              reported_at:new Date().toISOString(),
            };
            const [incident]=await tx`insert into incidents(ride_id,type,severity,status,title,details)
              values(${ride.id},'rider_panic','critical','open','Rider panic alert',${tx.json(details)}) returning id`;
            await tx`insert into notification_outbox(ride_id,recipient_type,recipient_id,channel,template,payload)
              values(${ride.id},'admin',null,'push','rider_panic',${tx.json({incidentId:incident.id,reference:ride.reference,location,source:"rider_tracking"})})`;
            await appendEvent(tx,ride.id,"rider_panic_activated","rider",null,ride.status,ride.status,{incidentId:incident.id,location});
            return {incident,duplicate:false};
          });
          if(!alert.duplicate) await sendPanicEmail({ride,incident:alert.incident,location}).catch(()=>false);
          return {panic:true,duplicate:alert.duplicate,incidentId:alert.incident.id,location,supportPhone:supportPhone()};
        }
        if(action==="confirm_completed"){
          await appendEvent(sql,ride.id,"rider_confirmed_completion","rider",null,ride.status,ride.status,{}); return {confirmed:true};
        }
        if(action==="rate"){
          const rating=Number(body(req).rating); if(!Number.isInteger(rating)||rating<1||rating>5||ride.status!=="completed") throw Object.assign(new Error("A completed ride and rating from 1 to 5 are required"),{status:400});
          await sql`insert into ride_ratings(ride_id,author_type,rating,comment) values(${ride.id},'rider',${rating},${clean(body(req).comment,1000)||null}) on conflict(ride_id,author_type) do update set rating=excluded.rating,comment=excluded.comment`;
          return {rated:true};
        }
        if(action==="request_change"||action==="request_cancel"){
          if(["completed","cancelled","no_show"].includes(ride.status)) throw Object.assign(new Error("This ride can no longer be changed"),{status:409});
          const message=clean(body(req).message,1000); if(!message) throw Object.assign(new Error("A message is required"),{status:400});
          const requestType=action==="request_cancel"?"cancel":"change";
          const [request]=await sql`insert into booking_change_requests(ride_id,request_type,message) values(${ride.id},${requestType},${message}) returning id,status,created_at`;
          await appendEvent(sql,ride.id,"rider_change_requested","rider",null,ride.status,ride.status,{requestId:request.id,requestType});
          return {requested:true,request};
        }
        throw Object.assign(new Error("Unknown action"),{status:400});
      }
      const positions=await sql`select latitude,longitude,heading,speed_kph,recorded_at from ride_positions where ride_id=${ride.id} order by recorded_at desc limit 100`;
      const safeRide={reference:ride.reference,language:ride.preferred_language,status:ride.status,service:ride.service,vehicleClass:ride.vehicle_class,addons:Array.isArray(ride.addons)?ride.addons:[],flightNumber:ride.flight_number,flightStatus:ride.flight_status,pickupAddress:ride.pickup_address,destinationAddress:ride.destination_address,scheduledAt:ride.scheduled_at,arrivedAt:ride.arrived_at,startedAt:ride.started_at,completedAt:ride.completed_at,driver:ride.driver_name?{name:ride.driver_name,photo:ride.driver_photo}:null,vehicle:ride.plate_number?{make:ride.vehicle_make,model:ride.vehicle_model,color:ride.vehicle_color,plate:ride.plate_number}:null,lastLocation:ride.last_lat==null?null:{latitude:ride.last_lat,longitude:ride.last_lng,heading:ride.last_heading,updatedAt:ride.last_location_at}};
      return {ride:safeRide,positions:positions.reverse(),supportPhone:supportPhone()};
    });
    return res.status(200).json({ok:true,...result});
  }catch(error){return fail(res,error);}
};
