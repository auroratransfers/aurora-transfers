const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 4323);
const root = path.resolve(__dirname, "../dist");
const ride = { id:"00000000-0000-4000-a000-000000000001", reference:"AUR-260828-12AB", status:"in_progress", service:"private-transfer", pickup_address:"Dubrovnik Airport", destination_address:"Hotel Excelsior, Dubrovnik", scheduled_at:"2026-08-28T20:30:00.000Z", passenger_count:2, flight_number:"OU 419", rider_name:"Ana Horvat", rider_phone:"+385 91 000 000", driver_name:"Ivan Marin", driver_id:"00000000-0000-4000-a000-000000000002", vehicle_id:"00000000-0000-4000-a000-000000000003", plate_number:"DU 123 AB", vehicle_make:"Mercedes-Benz", vehicle_model:"V-Class", quoted_price:"45.00", currency:"EUR" };
const driver = { id:ride.driver_id, full_name:"Ivan Marin", phone:"+385 98 000 000", email:"ivan@example.com", status:"available", active_rides:1 };
const vehicle = { id:ride.vehicle_id, make:"Mercedes-Benz", model:"V-Class", color:"Black", plate_number:"DU 123 AB", passenger_capacity:7, status:"available" };

function json(res,status,data){res.writeHead(status,{"Content-Type":"application/json"});res.end(JSON.stringify(data));}
function serve(req,res){let pathname=new URL(req.url,"http://localhost").pathname;if(pathname.endsWith("/"))pathname+="index.html";const file=path.join(root,pathname);if(!file.startsWith(root)||!fs.existsSync(file)){res.writeHead(404);return res.end("Not found");}const ext=path.extname(file);res.writeHead(200,{"Content-Type":ext===".css"?"text/css":ext===".js"?"text/javascript":"text/html"});fs.createReadStream(file).pipe(res)}

http.createServer((req,res)=>{
  if(req.url.startsWith("/api/admin-session"))return json(res,200,{ok:true,authenticated:false,configured:true,database:true});
  if(req.url.startsWith("/api/admin-login"))return json(res,200,{ok:true});
  if(req.url.startsWith("/api/admin-data?resource=overview"))return json(res,200,{ok:true,counts:{active:12,live:1,unconfirmed:4,completed_today:8},rides:[ride],incidents:[{id:"i1",ride_id:ride.id,type:"possible_off_platform_ride",severity:"high",status:"open",title:"Possible off-platform movement",reference:ride.reference,created_at:new Date().toISOString()}],drivers:[driver]});
  if(req.url.startsWith("/api/admin-data?resource=vehicles"))return json(res,200,{ok:true,vehicles:[vehicle]});
  if(req.url.startsWith("/api/admin-data?resource=drivers"))return json(res,200,{ok:true,drivers:[driver],devices:[]});
  if(req.url.startsWith("/api/admin-data?resource=rides"))return json(res,200,{ok:true,rides:[ride]});
  if(req.url.startsWith("/api/admin-data?resource=ride"))return json(res,200,{ok:true,ride:{...ride,rider_email:"ana@example.com",vehicle_color:"Black"},events:[{event_type:"status_changed",actor_type:"driver",from_status:"arrived",to_status:"in_progress",occurred_at:new Date().toISOString()}],positions:[]});
  if(req.url.startsWith("/api/v1/tracking"))return json(res,200,{ok:true,ride:{reference:ride.reference,language:"en",status:"in_progress",pickupAddress:ride.pickup_address,destinationAddress:ride.destination_address,scheduledAt:ride.scheduled_at,driver:{name:ride.driver_name},vehicle:{make:ride.vehicle_make,model:ride.vehicle_model,color:"Black",plate:ride.plate_number},lastLocation:{latitude:42.574,longitude:18.236,heading:250,updatedAt:new Date().toISOString()}},positions:[]});
  return serve(req,res);
}).listen(port,"127.0.0.1",()=>console.log(`Aurora mock server: http://127.0.0.1:${port}`));
