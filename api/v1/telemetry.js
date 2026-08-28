const { authenticateDevice } = require("../../lib/device-auth.cjs");
const { withDatabase } = require("../../lib/db.cjs");
const { body, fail, method } = require("../../lib/http.cjs");
const { clean } = require("../../lib/security.cjs");
const { haversineMeters } = require("../../lib/rides.cjs");

function number(value,min,max,name,optional=false){
  if(optional && (value==null || value==="")) return null;
  const parsed=Number(value); if(!Number.isFinite(parsed)||parsed<min||parsed>max) throw Object.assign(new Error(`Invalid ${name}`),{status:400}); return parsed;
}

module.exports=async(req,res)=>{
  if(!method(req,res,["POST"])) return;
  try{
    const result=await withDatabase(async(sql)=>{
      const device=await authenticateDevice(sql,req), data=body(req);
      const latitude=number(data.latitude,-90,90,"latitude"), longitude=number(data.longitude,-180,180,"longitude");
      const recordedAt=new Date(data.recordedAt||Date.now()); if(Number.isNaN(recordedAt.getTime())||Math.abs(Date.now()-recordedAt.getTime())>86400000) throw Object.assign(new Error("Invalid recordedAt"),{status:400});
      let ride;
      if(data.rideId){
        [ride]=await sql`select * from rides where id=${clean(data.rideId,40)}`;
        if(!ride) throw Object.assign(new Error("Ride not found"),{status:404});
        const matchesDriver=device.driver_id&&ride.driver_id&&String(device.driver_id)===String(ride.driver_id);
        const matchesVehicle=device.vehicle_id&&ride.vehicle_id&&String(device.vehicle_id)===String(ride.vehicle_id);
        if(!matchesDriver&&!matchesVehicle) throw Object.assign(new Error("Ride is not assigned to this device"),{status:403});
      }
      if(!ride){
        const rows=await sql`select * from rides where status in ('assigned','en_route','arrived','in_progress','emergency')
          and ((${device.vehicle_id}::uuid is not null and vehicle_id=${device.vehicle_id}) or (${device.driver_id}::uuid is not null and driver_id=${device.driver_id}))
          and (status<>'assigned' or scheduled_at between now()-interval '4 hours' and now()+interval '12 hours')
          order by case when status='assigned' then 1 else 0 end,scheduled_at limit 1`; ride=rows[0];
      }
      if(ride && device.driver_id && ride.driver_id && String(ride.driver_id)!==String(device.driver_id)) throw Object.assign(new Error("Ride does not belong to this driver"),{status:403});
      if(ride && device.vehicle_id && ride.vehicle_id && String(ride.vehicle_id)!==String(device.vehicle_id)) throw Object.assign(new Error("Ride does not belong to this vehicle"),{status:403});
      const sequence=data.sequenceNumber==null?null:Number(data.sequenceNumber);
      if(sequence!=null&&(!Number.isSafeInteger(sequence)||sequence<0)) throw Object.assign(new Error("Invalid sequence number"),{status:400});
      const rows=await sql`insert into ride_positions(ride_id,vehicle_id,driver_id,device_id,source,latitude,longitude,accuracy_m,heading,speed_kph,battery_percent,sequence_number,recorded_at)
        values(${ride?.id||null},${device.vehicle_id||ride?.vehicle_id||null},${device.driver_id||ride?.driver_id||null},${device.id},${device.kind},${latitude},${longitude},${number(data.accuracyM,0,10000,"accuracy",true)},${number(data.heading,0,360,"heading",true)},${number(data.speedKph,0,400,"speed",true)},${number(data.batteryPercent,0,100,"battery",true)},${Number.isFinite(sequence)?sequence:null},${recordedAt.toISOString()})
        on conflict(device_id,sequence_number) do nothing returning id`;
      if(ride && rows.length){
        await sql`update rides set last_lat=${latitude},last_lng=${longitude},last_heading=${number(data.heading,0,360,"heading",true)},last_speed_kph=${number(data.speedKph,0,400,"speed",true)},last_location_at=${recordedAt.toISOString()},updated_at=now()
          where id=${ride.id} and (last_location_at is null or last_location_at<=${recordedAt.toISOString()})`;
      }
      if(!ride && (device.vehicle_id||device.driver_id)){
        const cancelled=await sql`select * from rides where status='cancelled' and cancelled_at>now()-interval '8 hours'
          and ((${device.vehicle_id}::uuid is not null and vehicle_id=${device.vehicle_id}) or (${device.driver_id}::uuid is not null and driver_id=${device.driver_id})) order by cancelled_at desc limit 5`;
        for(const candidate of cancelled){
          const pickupDistance=haversineMeters(latitude,longitude,candidate.pickup_lat,candidate.pickup_lng);
          const destinationDistance=haversineMeters(latitude,longitude,candidate.destination_lat,candidate.destination_lng);
          if((pickupDistance!=null&&pickupDistance<300)||(destinationDistance!=null&&destinationDistance<500)){
            await sql`insert into incidents(ride_id,type,severity,title,details) select ${candidate.id},'possible_off_platform_ride','high','Possible off-platform movement',${sql.json({deviceId:device.id,pickupDistance,destinationDistance})} where not exists(select 1 from incidents where ride_id=${candidate.id} and type='possible_off_platform_ride' and created_at>now()-interval '8 hours')`;
          }
        }
      }
      return {accepted:true,rideId:ride?.id||null,duplicate:rows.length===0};
    });
    return res.status(202).json({ok:true,...result});
  }catch(error){return fail(res,error);}
};
