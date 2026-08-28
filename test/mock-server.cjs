const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 4323);
const root = path.resolve(__dirname, "../dist");
const now = Date.now();

const drivers = [
  { id:"00000000-0000-4000-a000-000000000002", full_name:"Ivan Marin", phone:"+385 98 000 000", email:"ivan@example.com", license_number:"HR-DU-8821", status:"busy", active_rides:1, completed_rides:184, device_last_seen_at:new Date(now-18000).toISOString(), selected_vehicle_id:"00000000-0000-4000-a000-000000000003", selected_vehicle_plate:"DU 123 AB", selected_vehicle_make:"Mercedes-Benz", selected_vehicle_model:"V-Class" },
  { id:"00000000-0000-4000-a000-000000000012", full_name:"Luka Peric", phone:"+385 97 000 000", email:"luka@example.com", license_number:"HR-DU-7742", status:"available", active_rides:0, completed_rides:96, device_last_seen_at:new Date(now-32000).toISOString(), selected_vehicle_id:"00000000-0000-4000-a000-000000000013", selected_vehicle_plate:"DU 456 CD", selected_vehicle_make:"Skoda", selected_vehicle_model:"Superb" },
  { id:"00000000-0000-4000-a000-000000000022", full_name:"Marko Kovac", phone:"+385 99 000 000", email:"marko@example.com", license_number:"HR-DU-3320", status:"offline", active_rides:0, completed_rides:121, device_last_seen_at:new Date(now-27*60000).toISOString(), selected_vehicle_id:"00000000-0000-4000-a000-000000000023", selected_vehicle_plate:"DU 789 EF", selected_vehicle_make:"Mercedes-Benz", selected_vehicle_model:"E-Class" },
];

const rides = [
  { id:"00000000-0000-4000-a000-000000000001", reference:"AUR-260828-12AB", status:"in_progress", service:"private-transfer", pickup_address:"Dubrovnik Airport", destination_address:"Hotel Excelsior, Dubrovnik", scheduled_at:new Date(now-32*60000).toISOString(), passenger_count:2, flight_number:"OU 419", rider_name:"Ana Horvat", rider_phone:"+385 91 000 000", rider_email:"ana@example.com", driver_name:"Ivan Marin", driver_id:drivers[0].id, vehicle_id:"00000000-0000-4000-a000-000000000003", plate_number:"DU 123 AB", vehicle_make:"Mercedes-Benz", vehicle_model:"V-Class", quoted_price:"45.00", currency:"EUR", payment_status:"paid", last_lat:42.615, last_lng:18.187, last_heading:248, last_speed_kph:61, last_location_at:new Date(now-18000).toISOString() },
  { id:"00000000-0000-4000-a000-000000000004", reference:"AUR-260828-98CD", status:"requested", service:"private-transfer", pickup_address:"Dubrovnik Old Town", destination_address:"Kotor, Montenegro", scheduled_at:new Date(now+34*60000).toISOString(), passenger_count:4, flight_number:null, rider_name:"James Walker", rider_phone:"+44 7700 000000", rider_email:"james@example.com", driver_name:null, driver_id:null, vehicle_id:null, plate_number:null, quoted_price:null, currency:"EUR", payment_status:"unpaid", last_location_at:null },
  { id:"00000000-0000-4000-a000-000000000005", reference:"AUR-260828-55EF", status:"confirmed", service:"airport-transfer", pickup_address:"Dubrovnik Airport", destination_address:"Cavtat Marina", scheduled_at:new Date(now+68*60000).toISOString(), passenger_count:2, flight_number:"BA 2678", rider_name:"Emma Stone", rider_phone:"+44 7700 111111", rider_email:"emma@example.com", driver_name:null, driver_id:null, vehicle_id:null, plate_number:null, quoted_price:"36.00", currency:"EUR", payment_status:"deposit_paid", last_location_at:null },
  { id:"00000000-0000-4000-a000-000000000006", reference:"AUR-260828-71GH", status:"assigned", service:"private-transfer", pickup_address:"Hotel Croatia, Cavtat", destination_address:"Dubrovnik Airport", scheduled_at:new Date(now+105*60000).toISOString(), passenger_count:3, flight_number:"LH 1711", rider_name:"Mia Fischer", rider_phone:"+49 170 000000", rider_email:"mia@example.com", driver_name:"Luka Peric", driver_id:drivers[1].id, vehicle_id:"00000000-0000-4000-a000-000000000013", plate_number:"DU 456 CD", quoted_price:"39.00", currency:"EUR", payment_status:"cash_due", last_lat:42.65, last_lng:18.09, last_location_at:new Date(now-32000).toISOString() },
];

const fleet = [
  { id:"00000000-0000-4000-a000-000000000003", make:"Mercedes-Benz", model:"V-Class", color:"Black", plate_number:"DU 123 AB", passenger_capacity:7, status:"busy", tracker_external_id:"AUR-GPS-001", latitude:42.615, longitude:18.187, accuracy_m:7, heading:248, speed_kph:61, battery_percent:78, position_source:"vehicle_tracker", position_recorded_at:new Date(now-18000).toISOString(), device_label:"V-Class tracker", device_last_seen_at:new Date(now-16000).toISOString(), connection_status:"live", ride_id:rides[0].id, ride_reference:rides[0].reference, ride_status:"in_progress", pickup_address:rides[0].pickup_address, destination_address:rides[0].destination_address, rider_name:rides[0].rider_name, driver_id:drivers[0].id, driver_name:drivers[0].full_name, driver_phone:drivers[0].phone, driver_status:"busy" },
  { id:"00000000-0000-4000-a000-000000000013", make:"Skoda", model:"Superb", color:"White", plate_number:"DU 456 CD", passenger_capacity:4, status:"busy", tracker_external_id:"AUR-GPS-002", latitude:42.6507, longitude:18.0944, accuracy_m:5, heading:164, speed_kph:0, battery_percent:92, position_source:"driver_app", position_recorded_at:new Date(now-32000).toISOString(), device_label:"Luka driver app", device_last_seen_at:new Date(now-30000).toISOString(), connection_status:"live", ride_id:rides[3].id, ride_reference:rides[3].reference, ride_status:"assigned", pickup_address:rides[3].pickup_address, destination_address:rides[3].destination_address, rider_name:rides[3].rider_name, driver_id:drivers[1].id, driver_name:drivers[1].full_name, driver_phone:drivers[1].phone, driver_status:"available" },
  { id:"00000000-0000-4000-a000-000000000023", make:"Mercedes-Benz", model:"E-Class", color:"Silver", plate_number:"DU 789 EF", passenger_capacity:4, status:"available", tracker_external_id:"AUR-GPS-003", latitude:42.681, longitude:18.008, accuracy_m:18, heading:85, speed_kph:0, battery_percent:19, position_source:"vehicle_tracker", position_recorded_at:new Date(now-9*60000).toISOString(), device_label:"E-Class tracker", device_last_seen_at:new Date(now-9*60000).toISOString(), connection_status:"stale", ride_id:null, ride_reference:null, ride_status:null, driver_id:drivers[2].id, driver_name:drivers[2].full_name, driver_phone:drivers[2].phone, driver_status:"offline" },
  { id:"00000000-0000-4000-a000-000000000033", make:"Renault", model:"Trafic", color:"Grey", plate_number:"DU 321 GH", passenger_capacity:8, status:"maintenance", tracker_external_id:null, latitude:null, longitude:null, accuracy_m:null, heading:null, speed_kph:null, battery_percent:null, position_source:null, position_recorded_at:null, device_label:null, device_last_seen_at:null, connection_status:"offline", ride_id:null, ride_reference:null, ride_status:null, driver_id:null, driver_name:null, driver_phone:null, driver_status:null },
];

const incidents = [
  { id:"i1", ride_id:rides[0].id, type:"possible_off_platform_ride", severity:"high", status:"open", title:"Possible off-platform movement", reference:rides[0].reference, ride_status:rides[0].status, driver_name:drivers[0].full_name, plate_number:"DU 123 AB", details:{ pickup_distance_m:92, source:"vehicle_tracker" }, created_at:new Date(now-12*60000).toISOString() },
  { id:"i2", ride_id:rides[3].id, type:"stale_gps", severity:"medium", status:"acknowledged", title:"Vehicle signal was delayed", reference:rides[3].reference, ride_status:rides[3].status, driver_name:drivers[1].full_name, plate_number:"DU 456 CD", details:{ delay_seconds:185, source:"driver_app" }, created_at:new Date(now-41*60000).toISOString() },
];

function json(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function serve(req, res) {
  let pathname = new URL(req.url, "http://localhost").pathname;
  if (pathname.endsWith("/")) pathname += "index.html";
  const file = path.join(root, pathname);
  if (!file.startsWith(root) || !fs.existsSync(file)) {
    res.writeHead(404);
    return res.end("Not found");
  }
  const ext = path.extname(file);
  res.writeHead(200, { "Content-Type": ext === ".css" ? "text/css" : ext === ".js" ? "text/javascript" : "text/html" });
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  if (req.url.startsWith("/api/admin-session")) return json(res, 200, { ok:true, authenticated:false, configured:true, database:true });
  if (req.url.startsWith("/api/admin-login")) return json(res, 200, { ok:true });
  if (req.url.startsWith("/api/admin-logout")) return json(res, 200, { ok:true });
  if (req.method === "POST" && req.url === "/api/admin-data") {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      let body = {};
      try { body = JSON.parse(raw); } catch {}
      return json(res, 200, body.action === "create_device_token" ? { ok:true, token:"aurora_mock_device_token" } : { ok:true });
    });
    return;
  }
  if (req.url.startsWith("/api/admin-data?resource=overview")) return json(res, 200, { ok:true, counts:{ active:4, live:1, unconfirmed:1, unassigned:2, delayed:0, completed_today:8, open_incidents:2 }, rides, incidents, drivers, serverTime:new Date().toISOString() });
  if (req.url.startsWith("/api/admin-data?resource=fleet")) return json(res, 200, { ok:true, fleet, serverTime:new Date().toISOString() });
  if (req.url.startsWith("/api/admin-data?resource=vehicles")) return json(res, 200, { ok:true, vehicles:fleet });
  if (req.url.startsWith("/api/admin-data?resource=drivers")) return json(res, 200, { ok:true, drivers, devices:[] });
  if (req.url.startsWith("/api/admin-data?resource=incidents")) return json(res, 200, { ok:true, incidents });
  if (req.url.startsWith("/api/admin-data?resource=rides")) return json(res, 200, { ok:true, rides });
  if (req.url.startsWith("/api/admin-data?resource=ride")) {
    const id = new URL(req.url, "http://localhost").searchParams.get("id");
    const ride = rides.find((item) => item.id === id) || rides[0];
    return json(res, 200, { ok:true, ride:{ ...ride, vehicle_color:"Black" }, events:[{ event_type:"status_changed", actor_type:"driver", from_status:"arrived", to_status:"in_progress", occurred_at:new Date(now-20*60000).toISOString() }, { event_type:"ride_assigned", actor_type:"admin", from_status:"confirmed", to_status:"assigned", occurred_at:new Date(now-65*60000).toISOString() }], positions:[{ latitude:42.615, longitude:18.187, accuracy_m:7, heading:248, speed_kph:61, battery_percent:78, source:"vehicle_tracker", recorded_at:new Date(now-18000).toISOString() }, { latitude:42.605, longitude:18.205, accuracy_m:9, heading:245, speed_kph:58, battery_percent:79, source:"vehicle_tracker", recorded_at:new Date(now-3*60000).toISOString() }, { latitude:42.585, longitude:18.224, accuracy_m:8, heading:242, speed_kph:64, battery_percent:80, source:"vehicle_tracker", recorded_at:new Date(now-7*60000).toISOString() }], incidents:incidents.filter((item) => item.ride_id === ride.id), offers:[] });
  }
  if (req.url.startsWith("/api/v1/tracking")) return json(res, 200, { ok:true, ride:{ reference:rides[0].reference, language:"en", status:"in_progress", pickupAddress:rides[0].pickup_address, destinationAddress:rides[0].destination_address, scheduledAt:rides[0].scheduled_at, driver:{ name:rides[0].driver_name }, vehicle:{ make:rides[0].vehicle_make, model:rides[0].vehicle_model, color:"Black", plate:rides[0].plate_number }, lastLocation:{ latitude:42.615, longitude:18.187, heading:248, updatedAt:new Date().toISOString() } }, positions:[] });
  return serve(req, res);
}).listen(port, "127.0.0.1", () => console.log(`Aurora mock server: http://127.0.0.1:${port}`));
