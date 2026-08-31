const crypto = require("crypto");

const DEMO_RUN_KEY = "aurora-admin-demo-v1";
const DEMO_LABEL = "Aurora operations preview data";
const DEMO_MARKER = "[AURORA_DEMO]";

function hash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function at(now, minutes) {
  return new Date(now.getTime() + minutes * 60_000).toISOString();
}

function buildDemoFixture(now = new Date()) {
  const time = (minutes) => at(now, minutes);

  return {
    generatedAt: now.toISOString(),
    drivers: [
      { key: "luka", fullName: "Luka Marinovic (Demo)", phone: "+385 91 555 0101", email: "luka.demo@aurora.test", license: "HR-DEMO-101", status: "busy", appVehicle: "vclass", appSeenMinutes: -0.2 },
      { key: "ana", fullName: "Ana Vukovic (Demo)", phone: "+385 91 555 0102", email: "ana.demo@aurora.test", license: "HR-DEMO-102", status: "busy", appVehicle: "eclass", appSeenMinutes: -0.5 },
      { key: "marko", fullName: "Marko Peric (Demo)", phone: "+385 91 555 0103", email: "marko.demo@aurora.test", license: "HR-DEMO-103", status: "busy", appVehicle: "multivan", appSeenMinutes: -0.8 },
      { key: "ivana", fullName: "Ivana Radic (Demo)", phone: "+385 91 555 0104", email: "ivana.demo@aurora.test", license: "HR-DEMO-104", status: "busy", appVehicle: "superb", appSeenMinutes: -1.1 },
      { key: "maja", fullName: "Maja Juric (Demo)", phone: "+385 91 555 0105", email: "maja.demo@aurora.test", license: "HR-DEMO-105", status: "available", appVehicle: "eqv", appSeenMinutes: -0.3 },
      { key: "toni", fullName: "Toni Babic (Demo)", phone: "+385 91 555 0106", email: "toni.demo@aurora.test", license: "HR-DEMO-106", status: "available", appVehicle: "volvo", appSeenMinutes: -8 },
      { key: "nikola", fullName: "Nikola Kovac (Demo)", phone: "+385 91 555 0107", email: "nikola.demo@aurora.test", license: "HR-DEMO-107", status: "offline", appVehicle: "sprinter", appSeenMinutes: -18 },
      { key: "petra", fullName: "Petra Horvat (Demo)", phone: "+385 91 555 0108", email: "petra.demo@aurora.test", license: "HR-DEMO-108", status: "suspended" },
    ],
    vehicles: [
      { key: "vclass", make: "Mercedes-Benz", model: "V-Class", color: "Obsidian Black", plate: "DEMO-DU-101", capacity: 7, status: "busy", tracker: "demo-vclass-tracker", trackerSeenMinutes: -0.15 },
      { key: "eclass", make: "Mercedes-Benz", model: "E-Class", color: "Black", plate: "DEMO-DU-202", capacity: 3, status: "busy", tracker: "demo-eclass-tracker", trackerSeenMinutes: -0.25 },
      { key: "multivan", make: "Volkswagen", model: "Multivan", color: "Deep Black", plate: "DEMO-DU-303", capacity: 7, status: "busy", tracker: "demo-multivan-tracker", trackerSeenMinutes: -0.5 },
      { key: "superb", make: "Skoda", model: "Superb", color: "Graphite", plate: "DEMO-DU-404", capacity: 3, status: "busy", tracker: "demo-superb-tracker", trackerSeenMinutes: -0.8 },
      { key: "eqv", make: "Mercedes-Benz", model: "EQV", color: "Selenite Grey", plate: "DEMO-DU-505", capacity: 7, status: "available", tracker: "demo-eqv-tracker", trackerSeenMinutes: -0.2 },
      { key: "volvo", make: "Volvo", model: "S90", color: "Silver", plate: "DEMO-DU-606", capacity: 3, status: "available", tracker: "demo-volvo-tracker", trackerSeenMinutes: -8 },
      { key: "sprinter", make: "Mercedes-Benz", model: "Sprinter", color: "Graphite", plate: "DEMO-DU-707", capacity: 16, status: "maintenance", tracker: "demo-sprinter-tracker", trackerSeenMinutes: -3 },
      { key: "i7", make: "BMW", model: "i7", color: "Carbon Black", plate: "DEMO-DU-808", capacity: 3, status: "inactive", tracker: "demo-i7-tracker" },
    ],
    riders: [
      { key: "elena", fullName: "Elena Rossi", email: "elena.rossi@demo.aurora.test", phone: "+39 333 555 0101", language: "en" },
      { key: "james", fullName: "James Walker", email: "james.walker@demo.aurora.test", phone: "+44 7700 900102", language: "en" },
      { key: "sophie", fullName: "Sophie Bernard", email: "sophie.bernard@demo.aurora.test", phone: "+33 6 12 34 56 78", language: "fr" },
      { key: "felix", fullName: "Felix Schneider", email: "felix.schneider@demo.aurora.test", phone: "+49 151 555 0104", language: "de" },
      { key: "marija", fullName: "Marija Kovac", email: "marija.kovac@demo.aurora.test", phone: "+385 91 555 0105", language: "hr" },
      { key: "lucas", fullName: "Lucas Martin", email: "lucas.martin@demo.aurora.test", phone: "+33 6 12 34 56 79", language: "fr" },
      { key: "anna", fullName: "Anna Muller", email: "anna.muller@demo.aurora.test", phone: "+49 151 555 0107", language: "de" },
      { key: "hannah", fullName: "Hannah Reed", email: "hannah.reed@demo.aurora.test", phone: "+44 7700 900108", language: "en" },
      { key: "ivan", fullName: "Ivan Markovic", email: "ivan.markovic@demo.aurora.test", phone: "+385 91 555 0109", language: "hr" },
    ],
    rides: [
      {
        key: "live", reference: "DEMO-AUR-1001", rider: "elena", driver: "luka", vehicle: "vclass", status: "in_progress",
        pickup: "Dubrovnik Airport (DBV)", pickupLat: 42.5612, pickupLng: 18.268, destination: "Hotel Excelsior Dubrovnik", destinationLat: 42.6403, destinationLng: 18.1164,
        scheduledAt: time(-28), passengers: 3, flight: "LH1710", service: "airport-arrival", vehicleClass: "van", addons: ["flight-monitoring", "child-seat"], quote: 118, payment: "deposit_paid", token: "aurora-demo-track-live-1001", language: "en",
        note: "Demo airport arrival with a live passenger tracking link.",
        positions: [
          { latitude: 42.5767, longitude: 18.2602, heading: 318, speed: 43, battery: 88, accuracy: 7, recordedAt: time(-8) },
          { latitude: 42.5884, longitude: 18.2434, heading: 319, speed: 48, battery: 87, accuracy: 6, recordedAt: time(-4) },
          { latitude: 42.6007, longitude: 18.2202, heading: 321, speed: 44, battery: 86, accuracy: 6, recordedAt: time(-0.5) },
        ],
      },
      {
        key: "enroute", reference: "DEMO-AUR-1002", rider: "james", driver: "ana", vehicle: "eclass", status: "en_route",
        pickup: "Rixos Premium Dubrovnik", pickupLat: 42.6487, pickupLng: 18.0852, destination: "Dubrovnik Airport (DBV)", destinationLat: 42.5612, destinationLng: 18.268,
        scheduledAt: time(18), passengers: 2, flight: "BA848", service: "airport-departure", vehicleClass: "business", addons: ["meet-and-greet"], quote: 82, payment: "paid", token: "aurora-demo-track-enroute-1002", language: "en",
        note: "Demo airport departure with a delayed flight watch.",
        positions: [
          { latitude: 42.6506, longitude: 18.0824, heading: 111, speed: 26, battery: 71, accuracy: 8, recordedAt: time(-5) },
          { latitude: 42.6464, longitude: 18.0902, heading: 112, speed: 32, battery: 70, accuracy: 7, recordedAt: time(-0.8) },
        ],
      },
      {
        key: "arrived", reference: "DEMO-AUR-1003", rider: "sophie", driver: "marko", vehicle: "multivan", status: "arrived",
        pickup: "Pile Gate, Dubrovnik", pickupLat: 42.6414, pickupLng: 18.1086, destination: "ACI Marina Dubrovnik", destinationLat: 42.6709, destinationLng: 18.1246,
        scheduledAt: time(-4), passengers: 6, flight: "OS745", service: "private-transfer", vehicleClass: "van", addons: ["luggage-assistance"], quote: 64, payment: "cash_due", token: "aurora-demo-track-arrived-1003", language: "fr",
        note: "Demo large-group ride waiting at the pickup point.",
        positions: [
          { latitude: 42.6417, longitude: 18.1079, heading: 15, speed: 0, battery: 64, accuracy: 5, recordedAt: time(-0.4) },
        ],
      },
      {
        key: "assigned", reference: "DEMO-AUR-1004", rider: "felix", driver: "ivana", vehicle: "superb", status: "assigned",
        pickup: "Hilton Imperial Dubrovnik", pickupLat: 42.6429, pickupLng: 18.1058, destination: "Cavtat Old Town", destinationLat: 42.5829, destinationLng: 18.2186,
        scheduledAt: time(42), passengers: 2, flight: null, service: "private-transfer", vehicleClass: "business", addons: [], quote: 79, payment: "unpaid", token: "aurora-demo-track-assigned-1004", language: "de",
        note: "Demo assigned private transfer.",
        positions: [
          { latitude: 42.6531, longitude: 18.0931, heading: 164, speed: 0, battery: 75, accuracy: 9, recordedAt: time(-1.1) },
        ],
      },
      {
        key: "confirmed", reference: "DEMO-AUR-1005", rider: "marija", status: "confirmed",
        pickup: "Dubrovnik Cruise Port, Gruz", pickupLat: 42.6593, pickupLng: 18.081, destination: "Hotel Bellevue Dubrovnik", destinationLat: 42.6478, destinationLng: 18.0942,
        scheduledAt: time(55), passengers: 4, flight: null, service: "cruise-transfer", vehicleClass: "comfort", addons: ["luggage-assistance"], quote: 48, payment: "unpaid", token: "aurora-demo-track-confirmed-1005", language: "hr",
        note: "Demo confirmed ride with nearby driver offers.",
      },
      {
        key: "requested", reference: "DEMO-AUR-1006", rider: "lucas", status: "requested",
        pickup: "Dubrovnik Old Town", pickupLat: 42.6407, pickupLng: 18.1101, destination: "Kotor Old Town, Montenegro", destinationLat: 42.4247, destinationLng: 18.7712,
        scheduledAt: time(130), passengers: 2, flight: null, service: "cross-border", vehicleClass: "business", addons: ["border-assistance"], quote: 205, payment: "unpaid", token: "aurora-demo-track-requested-1006", language: "fr",
        note: "Demo unconfirmed cross-border request.",
      },
      {
        key: "completed", reference: "DEMO-AUR-1007", rider: "anna", driver: "maja", vehicle: "eqv", status: "completed",
        pickup: "Dubrovnik Airport (DBV)", pickupLat: 42.5612, pickupLng: 18.268, destination: "Sun Gardens Dubrovnik", destinationLat: 42.6766, destinationLng: 18.0129,
        scheduledAt: time(-185), passengers: 5, flight: "EW9962", service: "airport-arrival", vehicleClass: "van", addons: ["flight-monitoring"], quote: 106, payment: "paid", token: "aurora-demo-track-completed-1007", language: "de",
        note: "Demo completed airport transfer with ratings.",
      },
      {
        key: "cancelled", reference: "DEMO-AUR-1008", rider: "hannah", status: "cancelled",
        pickup: "Hotel Kompas Dubrovnik", pickupLat: 42.6468, pickupLng: 18.0701, destination: "Dubrovnik Airport (DBV)", destinationLat: 42.5612, destinationLng: 18.268,
        scheduledAt: time(-90), passengers: 1, flight: "U28649", service: "airport-departure", vehicleClass: "comfort", addons: [], quote: 68, payment: "refunded", token: "aurora-demo-track-cancelled-1008", language: "en",
        note: "Demo cancelled ride for the all-rides history.",
      },
      {
        key: "noshow", reference: "DEMO-AUR-1009", rider: "ivan", driver: "toni", vehicle: "volvo", status: "no_show",
        pickup: "Port of Dubrovnik, Gruz", pickupLat: 42.659, pickupLng: 18.0811, destination: "Dubrovnik Old Town", destinationLat: 42.6407, destinationLng: 18.1101,
        scheduledAt: time(-125), passengers: 2, flight: null, service: "cruise-transfer", vehicleClass: "comfort", addons: [], quote: 46, payment: "cash_due", token: "aurora-demo-track-noshow-1009", language: "hr",
        note: "Demo no-show ride for operational history.",
      },
    ],
    fleetPositions: [
      { vehicle: "eqv", driver: "maja", latitude: 42.6556, longitude: 18.0867, heading: 83, speed: 0, battery: 91, accuracy: 6, recordedAt: time(-0.25) },
      { vehicle: "volvo", driver: "toni", latitude: 42.6458, longitude: 18.0864, heading: 97, speed: 0, battery: 42, accuracy: 13, recordedAt: time(-8) },
    ],
    flightWatches: [
      { ride: "live", number: "LH1710", status: "landed", terminal: "B", gate: "3", delayMinutes: 0, checkedAt: time(-3) },
      { ride: "enroute", number: "BA848", status: "delayed", terminal: "B", gate: "7", delayMinutes: 25, checkedAt: time(-2) },
      { ride: "arrived", number: "OS745", status: "scheduled", terminal: "B", gate: "5", delayMinutes: 0, checkedAt: time(-6) },
    ],
    incidents: [
      { ride: "live", type: "route_deviation", severity: "high", status: "open", title: "Route review requested", details: { threshold: "500 m", driver_note: "Diversion near roadworks", source: "demo telemetry" }, createdAt: time(-7) },
      { ride: "enroute", type: "gps_signal_lost", severity: "critical", status: "acknowledged", title: "GPS signal health review", details: { gap: "9 minutes", battery: "70%", source: "demo telemetry" }, createdAt: time(-15) },
      { ride: "completed", type: "late_pickup", severity: "medium", status: "resolved", title: "Pickup delay resolved", details: { delay: "12 minutes", resolution: "Guest notified", source: "demo operations" }, createdAt: time(-170), resolvedAt: time(-150) },
      { ride: "noshow", type: "rider_panic", severity: "critical", status: "resolved", title: "Passenger panic alert (demo history)", details: { latitude: "42.6590", longitude: "18.0811", accuracy_m: "12", location_source: "rider device", resolution: "Guest contacted", source: "demo safety" }, createdAt: time(-118), resolvedAt: time(-112) },
    ],
    offers: [
      { ride: "confirmed", driver: "maja", vehicle: "eqv", distance: 870, expiresAt: time(2) },
      { ride: "confirmed", driver: "toni", vehicle: "volvo", distance: 1520, expiresAt: time(2) },
    ],
    ratings: [
      { ride: "completed", author: "rider", rating: 5, comment: "Excellent airport arrival and very smooth ride." },
      { ride: "completed", author: "driver", rating: 5, comment: "Guest ready at the agreed meeting point." },
    ],
    business: [
      { reference: "DEMO-B2B-2001", language: "en", company: "Adriatic Signature Villas", contact: "Nina Carver", email: "nina@demo.aurora.test", phone: "+44 20 7946 0101", type: "villa-agency", cities: "Dubrovnik, Cavtat and Peljesac", monthly: "20-35 rides", message: "We need reliable airport and intercity transfers for villa guests during the summer season.", status: "received", createdAt: time(-45) },
      { reference: "DEMO-B2B-2002", language: "en", company: "Blue Horizon DMC", contact: "Peter Collins", email: "peter@demo.aurora.test", phone: "+1 212 555 0102", type: "travel-agency", cities: "Croatia, Montenegro and Bosnia and Herzegovina", monthly: "45-70 rides", message: "Looking for a white-label private transfer partner for small groups and premium itineraries.", status: "contacted", createdAt: time(-220) },
      { reference: "DEMO-B2B-2003", language: "hr", company: "Marina Aurelia", contact: "Karla Vukic", email: "karla@demo.aurora.test", phone: "+385 91 555 2203", type: "yacht-marina", cities: "Dubrovnik and Split", monthly: "10-20 rides", message: "We would like a direct operations contact for yacht crews and arriving charter guests.", status: "qualified", createdAt: time(-440) },
      { reference: "DEMO-B2B-2004", language: "de", company: "Nordlicht Events", contact: "Mara Weiss", email: "mara@demo.aurora.test", phone: "+49 30 555 2204", type: "event", cities: "Dubrovnik", monthly: "One event group", message: "Conference transfer request completed for a 40-person executive group.", status: "closed", createdAt: time(-1200) },
    ],
    partners: [
      { status: "received", language: "en", applicantType: "independent-driver", fullName: "Dario Nikolic (Demo)", companyName: null, email: "dario@demo.aurora.test", phone: "+385 91 555 3301", country: "Croatia", baseCity: "Dubrovnik", years: 9, license: "HR-DEMO-P01", permit: "TP-DEMO-101", insuranceUntil: "2030-12-31", languages: ["english", "croatian", "german"], availability: ["daytime", "weekends", "long-distance"], make: "Mercedes-Benz", model: "Vito Tourer", year: 2024, plate: "DEMO-PA-101", color: "Black", type: "van", seats: 7, luggage: 8, amenities: ["air-conditioning", "wifi", "water"], base: "Dubrovnik Airport", coverage: "Croatia, Montenegro and Bosnia and Herzegovina", routes: "Airport transfers, yacht marinas and long-distance routes.", notes: "Available for early morning arrivals.", createdAt: time(-65) },
      { status: "under_review", language: "de", applicantType: "transport-company", fullName: "Klara Stein (Demo)", companyName: "Adria Mobility GmbH", email: "klara@demo.aurora.test", phone: "+49 151 555 3302", country: "Germany", baseCity: "Zagreb", years: 14, license: "DE-DEMO-P02", permit: "EU-DEMO-202", insuranceUntil: "2031-06-30", languages: ["english", "german", "croatian"], availability: ["daytime", "evenings", "long-distance"], make: "Mercedes-Benz", model: "E-Class", year: 2025, plate: "DEMO-PA-202", color: "Grey", type: "premium-sedan", seats: 3, luggage: 3, amenities: ["air-conditioning", "wifi", "phone-charger"], base: "Zagreb", coverage: "Croatia, Slovenia, Austria and Germany", routes: "Executive airport, corporate and cross-border transfers.", notes: "Company fleet details available on request.", createdAt: time(-310) },
      { status: "approved", language: "fr", applicantType: "independent-driver", fullName: "Emile Laurent (Demo)", companyName: null, email: "emile@demo.aurora.test", phone: "+33 6 12 34 3303", country: "France", baseCity: "Split", years: 11, license: "FR-DEMO-P03", permit: "EU-DEMO-303", insuranceUntil: "2030-09-30", languages: ["english", "french", "croatian"], availability: ["weekends", "seasonal", "long-distance"], make: "Volkswagen", model: "Caravelle", year: 2023, plate: "DEMO-PA-303", color: "Blue", type: "minivan", seats: 8, luggage: 8, amenities: ["air-conditioning", "wifi", "child-seat"], base: "Split", coverage: "Dalmatia, Bosnia and Herzegovina, Montenegro", routes: "Coastal private tours and group transfers.", notes: "Approved partner test record.", createdAt: time(-680) },
    ],
  };
}

async function track(tx, runId, entityType, entityId) {
  await tx`insert into demo_data_records(run_id,entity_type,entity_id) values(${runId},${entityType},${String(entityId)})`;
}

async function clearDemoDataInTransaction(tx) {
  const [run] = await tx`select id from demo_data_runs where run_key=${DEMO_RUN_KEY} for update`;
  if (!run) return { removed: false, counts: {} };

  const records = await tx`select entity_type,entity_id from demo_data_records where run_id=${run.id}`;
  const ids = (entityType) => records.filter((record) => record.entity_type === entityType).map((record) => record.entity_id);
  const rideIds = ids("ride");
  const driverIds = ids("driver");
  const vehicleIds = ids("vehicle");
  const riderIds = ids("rider");

  // Do not remove a demo driver, vehicle or rider if someone has attached it to
  // a non-demo ride after seeding. The operator must resolve that association.
  const [externalAssociations] = await tx`
    select count(*)::int count
    from rides r
    where (
      r.driver_id in (select entity_id::uuid from demo_data_records where run_id=${run.id} and entity_type='driver')
      or r.vehicle_id in (select entity_id::uuid from demo_data_records where run_id=${run.id} and entity_type='vehicle')
      or r.rider_id in (select entity_id::uuid from demo_data_records where run_id=${run.id} and entity_type='rider')
    )
    and not exists (
      select 1 from demo_data_records seeded
      where seeded.run_id=${run.id} and seeded.entity_type='ride' and seeded.entity_id=r.id::text
    )`;
  if (Number(externalAssociations?.count || 0)) {
    throw new Error("Demo cleanup stopped because a demo record is linked to a non-demo ride.");
  }

  for (const id of rideIds) await tx`delete from rides where id=${id}`;
  for (const id of vehicleIds) await tx`delete from ride_positions where vehicle_id=${id}`;
  for (const id of driverIds) await tx`delete from ride_positions where driver_id=${id}`;
  for (const id of driverIds) await tx`delete from device_credentials where driver_id=${id}`;
  for (const id of vehicleIds) await tx`delete from device_credentials where vehicle_id=${id}`;
  for (const id of vehicleIds) await tx`delete from vehicles where id=${id}`;
  for (const id of driverIds) await tx`delete from drivers where id=${id}`;
  for (const id of riderIds) await tx`delete from riders where id=${id}`;
  for (const id of ids("business")) await tx`delete from business_inquiries where id=${id}`;
  for (const id of ids("partner")) await tx`delete from partner_applications where id=${id}`;
  await tx`delete from demo_data_runs where id=${run.id}`;

  return {
    removed: true,
    counts: { rides: rideIds.length, drivers: driverIds.length, vehicles: vehicleIds.length, riders: riderIds.length },
  };
}

async function clearDemoData(sql) {
  return sql.begin((tx) => clearDemoDataInTransaction(tx));
}

async function seedDemoData(sql, now = new Date()) {
  const fixture = buildDemoFixture(now);
  return sql.begin(async (tx) => {
    await clearDemoDataInTransaction(tx);
    const [run] = await tx`insert into demo_data_runs(run_key,label) values(${DEMO_RUN_KEY},${DEMO_LABEL}) returning id`;
    const ids = { drivers: {}, vehicles: {}, riders: {}, rides: {}, driverDevices: {}, trackerDevices: {} };

    for (const driver of fixture.drivers) {
      const [created] = await tx`insert into drivers(full_name,phone,email,license_number,status,created_at,updated_at)
        values(${driver.fullName},${driver.phone},${driver.email},${driver.license},${driver.status},${at(now, -1440)},${at(now, -1)}) returning id`;
      ids.drivers[driver.key] = created.id;
      await track(tx, run.id, "driver", created.id);
    }

    for (const vehicle of fixture.vehicles) {
      const [created] = await tx`insert into vehicles(make,model,color,plate_number,passenger_capacity,status,tracker_external_id,created_at,updated_at)
        values(${vehicle.make},${vehicle.model},${vehicle.color},${vehicle.plate},${vehicle.capacity},${vehicle.status},${vehicle.tracker},${at(now, -2880)},${at(now, -1)}) returning id`;
      ids.vehicles[vehicle.key] = created.id;
      await track(tx, run.id, "vehicle", created.id);
    }

    for (const rider of fixture.riders) {
      const [created] = await tx`insert into riders(full_name,email,phone,preferred_language,created_at,updated_at)
        values(${rider.fullName},${rider.email},${rider.phone},${rider.language},${at(now, -720)},${at(now, -1)}) returning id`;
      ids.riders[rider.key] = created.id;
      await track(tx, run.id, "rider", created.id);
    }

    for (const driver of fixture.drivers) {
      if (!driver.appVehicle) continue;
      const [device] = await tx`insert into device_credentials(label,kind,token_hash,driver_id,vehicle_id,active,last_seen_at,created_at)
        values(${`Aurora Driver app - ${driver.fullName}`},'driver_app',${hash(`demo-driver-device-${driver.key}`)},${ids.drivers[driver.key]},${ids.vehicles[driver.appVehicle]},true,${at(now, driver.appSeenMinutes)},${at(now, -720)}) returning id`;
      ids.driverDevices[driver.key] = device.id;
      await track(tx, run.id, "device", device.id);
    }

    for (const vehicle of fixture.vehicles) {
      if (vehicle.trackerSeenMinutes == null) continue;
      const [device] = await tx`insert into device_credentials(label,kind,token_hash,vehicle_id,active,last_seen_at,created_at)
        values(${`Aurora tracker - ${vehicle.plate}`},'vehicle_tracker',${hash(`demo-tracker-device-${vehicle.key}`)},${ids.vehicles[vehicle.key]},true,${at(now, vehicle.trackerSeenMinutes)},${at(now, -720)}) returning id`;
      ids.trackerDevices[vehicle.key] = device.id;
      await track(tx, run.id, "device", device.id);
    }

    for (const ride of fixture.rides) {
      const latest = ride.positions?.at(-1) || null;
      const [created] = await tx`insert into rides(
        reference,booking_group_id,leg,rider_id,driver_id,vehicle_id,service,vehicle_class,addons,quote_id,quote_amount,
        pickup_address,pickup_lat,pickup_lng,destination_address,destination_lat,destination_lng,status,scheduled_at,passenger_count,
        flight_number,flight_status,notes,currency,quoted_price,final_price,payment_status,tracking_token_hash,tracking_expires_at,
        arrived_at,started_at,completed_at,cancelled_at,last_lat,last_lng,last_heading,last_speed_kph,last_location_at,version,created_at,updated_at
      ) values (
        ${ride.reference},${crypto.randomUUID()},1,${ids.riders[ride.rider]},${ride.driver ? ids.drivers[ride.driver] : null},${ride.vehicle ? ids.vehicles[ride.vehicle] : null},${ride.service},${ride.vehicleClass},${tx.json(ride.addons)},${`demo-quote-${ride.key}`},${ride.quote},
        ${ride.pickup},${ride.pickupLat},${ride.pickupLng},${ride.destination},${ride.destinationLat},${ride.destinationLng},${ride.status},${ride.scheduledAt},${ride.passengers},
        ${ride.flight || null},${ride.flight ? tx.json({ number: ride.flight, status: "pending", arrival: {}, departure: {} }) : null},${`${DEMO_MARKER} ${ride.note}`},'EUR',${ride.quote},${ride.status === "completed" ? ride.quote : null},${ride.payment},${hash(ride.token)},${at(now, 90 * 24 * 60)},
        ${["arrived", "in_progress"].includes(ride.status) ? at(now, -5) : null},${ride.status === "in_progress" ? at(now, -22) : null},${ride.status === "completed" ? at(now, -135) : null},${ride.status === "cancelled" ? at(now, -72) : null},${latest?.latitude || null},${latest?.longitude || null},${latest?.heading || null},${latest?.speed || null},${latest?.recordedAt || null},1,${at(now, -360)},${at(now, -1)}
      ) returning id`;
      ids.rides[ride.key] = created.id;
      await track(tx, run.id, "ride", created.id);

      await tx`insert into ride_events(ride_id,event_type,actor_type,actor_id,from_status,to_status,metadata,occurred_at)
        values(${created.id},'booking_created','rider',${ids.riders[ride.rider]},null,'requested',${tx.json({ source: "demo", marker: DEMO_MARKER })},${at(now, -350)})`;
      if (ride.status !== "requested") {
        await tx`insert into ride_events(ride_id,event_type,actor_type,actor_id,from_status,to_status,metadata,occurred_at)
          values(${created.id},'status_changed','admin','demo-admin','requested',${ride.status},${tx.json({ source: "demo preview" })},${at(now, -20)})`;
      }
      for (const [index, position] of (ride.positions || []).entries()) {
        await tx`insert into ride_positions(ride_id,vehicle_id,driver_id,device_id,source,latitude,longitude,accuracy_m,heading,speed_kph,battery_percent,sequence_number,recorded_at,received_at)
          values(${created.id},${ids.vehicles[ride.vehicle]},${ids.drivers[ride.driver]},${ids.driverDevices[ride.driver] || null},'driver_app',${position.latitude},${position.longitude},${position.accuracy},${position.heading},${position.speed},${position.battery},${index + 1},${position.recordedAt},${position.recordedAt})`;
      }
    }

    for (const position of fixture.fleetPositions) {
      await tx`insert into ride_positions(vehicle_id,driver_id,device_id,source,latitude,longitude,accuracy_m,heading,speed_kph,battery_percent,sequence_number,recorded_at,received_at)
        values(${ids.vehicles[position.vehicle]},${ids.drivers[position.driver]},${ids.trackerDevices[position.vehicle] || null},'vehicle_tracker',${position.latitude},${position.longitude},${position.accuracy},${position.heading},${position.speed},${position.battery},1,${position.recordedAt},${position.recordedAt})`;
    }

    for (const watch of fixture.flightWatches) {
      const [created] = await tx`insert into flight_watches(ride_id,flight_number,provider,last_status,last_checked_at,created_at,updated_at)
        values(${ids.rides[watch.ride]},${watch.number},'demo',${tx.json({ number: watch.number, status: watch.status, airline: "Aurora demo airline", arrival: { airport: "Dubrovnik Airport", terminal: watch.terminal, gate: watch.gate, delayMinutes: watch.delayMinutes }, departure: {} })},${watch.checkedAt},${at(now, -180)},${watch.checkedAt}) returning id`;
      await track(tx, run.id, "flight_watch", created.id);
    }

    for (const incident of fixture.incidents) {
      const [created] = await tx`insert into incidents(ride_id,type,severity,status,title,details,created_at,resolved_at)
        values(${ids.rides[incident.ride]},${incident.type},${incident.severity},${incident.status},${incident.title},${tx.json(incident.details)},${incident.createdAt},${incident.resolvedAt || null}) returning id`;
      await track(tx, run.id, "incident", created.id);
    }

    for (const offer of fixture.offers) {
      const [created] = await tx`insert into dispatch_offers(ride_id,driver_id,vehicle_id,status,distance_to_pickup_m,offered_at,expires_at)
        values(${ids.rides[offer.ride]},${ids.drivers[offer.driver]},${ids.vehicles[offer.vehicle]},'offered',${offer.distance},${at(now, -0.4)},${offer.expiresAt}) returning id`;
      await tx`insert into notification_outbox(ride_id,recipient_type,recipient_id,channel,template,payload,status,created_at)
        values(${ids.rides[offer.ride]},'driver',${ids.drivers[offer.driver]},'push','new_dispatch_offer',${tx.json({ offerId: created.id, source: "demo" })},'pending',${at(now, -0.4)})`;
    }

    for (const rating of fixture.ratings) {
      await tx`insert into ride_ratings(ride_id,author_type,rating,comment,created_at)
        values(${ids.rides[rating.ride]},${rating.author},${rating.rating},${rating.comment},${at(now, -120)})`;
    }

    for (const inquiry of fixture.business) {
      const [created] = await tx`insert into business_inquiries(reference,language,company_name,contact_name,email,phone,company_type,operating_cities,monthly_rides,message,status,created_at,updated_at)
        values(${inquiry.reference},${inquiry.language},${inquiry.company},${inquiry.contact},${inquiry.email},${inquiry.phone},${inquiry.type},${inquiry.cities},${inquiry.monthly},${inquiry.message},${inquiry.status},${inquiry.createdAt},${inquiry.createdAt}) returning id`;
      await track(tx, run.id, "business", created.id);
    }

    for (const partner of fixture.partners) {
      const [created] = await tx`insert into partner_applications(
        status,language,applicant_type,full_name,company_name,email,phone,country,base_city,years_experience,license_number,transport_permit,insurance_valid_until,
        languages,availability,vehicle_make,vehicle_model,vehicle_year,plate_number,vehicle_color,vehicle_type,seats,luggage_capacity,amenities,service_base,coverage_countries,usual_routes,notes,photo_manifest,created_at,updated_at
      ) values (
        ${partner.status},${partner.language},${partner.applicantType},${partner.fullName},${partner.companyName},${partner.email},${partner.phone},${partner.country},${partner.baseCity},${partner.years},${partner.license},${partner.permit},${partner.insuranceUntil},
        ${tx.json(partner.languages)},${tx.json(partner.availability)},${partner.make},${partner.model},${partner.year},${partner.plate},${partner.color},${partner.type},${partner.seats},${partner.luggage},${tx.json(partner.amenities)},${partner.base},${partner.coverage},${partner.routes},${partner.notes},${tx.json([{ name: `${partner.plate.toLowerCase()}.jpg`, size: 0, source: "demo" }])},${partner.createdAt},${partner.createdAt}
      ) returning id`;
      await track(tx, run.id, "partner", created.id);
    }

    return {
      fixture,
      counts: { drivers: fixture.drivers.length, vehicles: fixture.vehicles.length, riders: fixture.riders.length, rides: fixture.rides.length, flights: fixture.flightWatches.length, incidents: fixture.incidents.length, business: fixture.business.length, partners: fixture.partners.length },
    };
  });
}

function demoTrackingLinks(origin = "https://aurora-transfers.vercel.app") {
  const base = String(origin).replace(/\/$/, "");
  return buildDemoFixture().rides.map((ride) => ({
    reference: ride.reference,
    url: `${base}/track/?token=${encodeURIComponent(ride.token)}&lang=${encodeURIComponent(ride.language)}`,
  }));
}

module.exports = { DEMO_LABEL, DEMO_MARKER, DEMO_RUN_KEY, buildDemoFixture, clearDemoData, demoTrackingLinks, seedDemoData };
