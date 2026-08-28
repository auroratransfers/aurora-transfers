const LIVE_POSITION_MS = 2 * 60 * 1000;
const STALE_POSITION_MS = 15 * 60 * 1000;
const LIVE_REFRESH_MS = 8000;
const ACTIVE_RIDE_STATUSES = new Set([
  "assigned",
  "en_route",
  "arrived",
  "in_progress",
  "emergency",
]);

const state = {
  overview: null,
  rides: [],
  drivers: [],
  vehicles: [],
  fleet: [],
  incidents: [],
  view: "overview",
  fleetFilter: "all",
  selectedVehicleId: null,
  map: null,
  markers: new Map(),
  trailLayer: null,
  hasFitMap: false,
  refreshTimer: null,
  refreshing: false,
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>'"]/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        char
      ],
  );

const dateTime = (value) =>
  value
    ? new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Zagreb",
      }).format(new Date(value))
    : "-";

const timeOnly = (value) =>
  value
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Zagreb",
      }).format(new Date(value))
    : "-";

function relativeTime(value) {
  if (!value) return "Never";
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 10) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function status(value) {
  const label = String(value || "unknown").replaceAll("_", " ");
  return `<span class="status ${esc(value)}">${esc(label)}</span>`;
}

function connectionState(item) {
  if (item.connection_status) return item.connection_status;
  if (!item.position_recorded_at) {
    if (item.device_last_seen_at && Date.now() - new Date(item.device_last_seen_at).getTime() < LIVE_POSITION_MS) return "no_gps";
    return "offline";
  }
  const age = Date.now() - new Date(item.position_recorded_at).getTime();
  if (age <= LIVE_POSITION_MS) return "live";
  if (age <= STALE_POSITION_MS) return "stale";
  return "offline";
}

function connectionLabel(value) {
  return { live: "Live GPS", stale: "Stale GPS", no_gps: "Connected, no GPS", offline: "Offline" }[value] || "Unknown";
}

function telemetryBadge(item) {
  const connection = connectionState(item);
  return `<span class="connection ${connection}"><i></i>${connectionLabel(connection)}</span>`;
}

function isActiveRide(item) {
  return Boolean(item.ride_id && ACTIVE_RIDE_STATUSES.has(item.ride_status));
}

function hasCoordinates(item) {
  if (item.latitude == null || item.longitude == null || item.latitude === "" || item.longitude === "") return false;
  return Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude));
}

const api = async (url, options = {}) => {
  const response = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
};

function notify(message, error = false) {
  const element = $("#notice");
  element.textContent = message;
  element.className = `notice${error ? " error" : ""}`;
  element.hidden = false;
  window.clearTimeout(notify.timeout);
  notify.timeout = window.setTimeout(() => (element.hidden = true), 5000);
}

function setLoggedIn(loggedIn) {
  $("#loginView").hidden = loggedIn;
  $("#appView").hidden = !loggedIn;
}

function setLastUpdated(value = new Date(), error = false) {
  $("#lastUpdated").textContent = error ? "Live update failed" : `Updated ${relativeTime(value)}`;
  $("#topbarLive").classList.toggle("error", error);
}

async function session() {
  const data = await api("/api/admin-session");
  if (data.authenticated) {
    setLoggedIn(true);
    await showView("overview");
  } else if (!data.configured) {
    $("#loginError").textContent =
      "Admin backend needs DATABASE_URL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET.";
    $("#loginError").hidden = false;
  }
}

$("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  $("#loginError").hidden = true;
  try {
    await api("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ password: $("#password").value }),
    });
    setLoggedIn(true);
    await showView("overview");
  } catch (error) {
    $("#loginError").textContent = error.message;
    $("#loginError").hidden = false;
  }
});

$("#logoutButton").addEventListener("click", async () => {
  await api("/api/admin-logout", { method: "POST" });
  location.reload();
});

$("#todayLabel").textContent = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "Europe/Zagreb",
}).format(new Date());

function metric(value, label, detail, theme) {
  return `<article class="metric ${theme}"><span>${esc(label)}</span><strong>${Number(value || 0)}</strong><small>${esc(detail)}</small></article>`;
}

function rideRow(ride) {
  const tracking = ride.last_location_at ? relativeTime(ride.last_location_at) : "No GPS yet";
  return `<button class="ride-row" type="button" data-ride-id="${esc(ride.id)}">
    <div class="ride-main"><strong>${esc(ride.reference)}</strong>${status(ride.status)}</div>
    <p class="route"><span>${esc(ride.pickup_address)}</span><b>&rarr;</b><span>${esc(ride.destination_address)}</span></p>
    <div class="ride-meta"><span>${dateTime(ride.scheduled_at)}</span><span>${esc(ride.driver_name || "Unassigned")}</span><span>${esc(tracking)}</span></div>
  </button>`;
}

function incidentRow(item, compact = false) {
  const actions = item.status === "open"
    ? `<button class="text-button" type="button" data-incident-action="acknowledge" data-incident-id="${esc(item.id)}">Acknowledge</button>`
    : "";
  return `<article class="incident-row ${compact ? "compact" : ""}">
    <div class="incident-title"><strong>${esc(item.title)}</strong><span class="status severity-${esc(item.severity)}">${esc(item.severity)}</span></div>
    <p>${esc(item.reference || "System")} · ${dateTime(item.created_at)}</p>
    ${actions}
  </article>`;
}

function bindRideClicks(root = document) {
  $$('[data-ride-id]', root).forEach((element) => {
    element.onclick = () => openRide(element.dataset.rideId);
  });
}

function renderMetrics() {
  const counts = state.overview?.counts || {};
  const liveVehicles = state.fleet.filter((item) => connectionState(item) === "live").length;
  const gpsAttention = state.fleet.filter((item) => ["stale", "no_gps", "offline"].includes(connectionState(item))).length;
  $("#metrics").innerHTML =
    metric(counts.live, "Live rides", "Passengers in transit", "purple") +
    metric(liveVehicles, "Vehicles reporting", `${state.fleet.length} in fleet`, "pink") +
    metric(counts.unassigned, "Unassigned", "Needs dispatch", "kiwi") +
    metric(counts.delayed, "Behind schedule", "Requires review", "blue") +
    metric(counts.open_incidents, "Open alerts", "Safety queue", "red") +
    metric(counts.completed_today, "Completed today", "Finished transfers", "neutral") +
    `<span class="metric-data" data-gps-attention="${gpsAttention}" hidden></span>`;
}

function renderOperations() {
  renderMetrics();
  const rides = state.overview?.rides || [];
  const actionable = rides
    .filter((ride) => ["requested", "confirmed", "assigned", "en_route", "arrived", "in_progress", "emergency"].includes(ride.status))
    .slice(0, 8);
  $("#liveRides").innerHTML = actionable.length
    ? actionable.map(rideRow).join("")
    : '<p class="empty">No rides currently require action.</p>';
  $("#incidentList").innerHTML = state.overview?.incidents?.length
    ? state.overview.incidents.slice(0, 6).map((item) => incidentRow(item, true)).join("")
    : '<p class="empty">No open safety alerts.</p>';
  bindRideClicks($("#overviewView"));
  bindIncidentActions($("#overviewView"));
  renderFleetList();
  renderVehicleInspector();
  renderFleetMap();
  renderDispatch();
}

async function loadOperations({ quiet = false, fit = false } = {}) {
  if (state.refreshing) return;
  state.refreshing = true;
  try {
    const [overview, fleet] = await Promise.all([
      api("/api/admin-data?resource=overview"),
      api("/api/admin-data?resource=fleet"),
    ]);
    state.overview = overview;
    state.drivers = overview.drivers || [];
    state.fleet = fleet.fleet || [];
    state.vehicles = state.fleet;
    if (!state.selectedVehicleId && state.fleet.length) {
      state.selectedVehicleId = state.fleet.find((item) => isActiveRide(item))?.id || state.fleet[0].id;
    }
    renderOperations();
    setLastUpdated(fleet.serverTime || overview.serverTime || new Date());
    if (fit) fitFleetMap();
  } catch (error) {
    setLastUpdated(new Date(), true);
    if (!quiet) notify(error.message, true);
  } finally {
    state.refreshing = false;
  }
}

function fleetMatchesFilter(item) {
  const connection = connectionState(item);
  if (state.fleetFilter === "live") return connection === "live";
  if (state.fleetFilter === "active") return isActiveRide(item);
  if (state.fleetFilter === "attention") {
    return connection !== "live" || (item.battery_percent != null && Number(item.battery_percent) <= 20);
  }
  return true;
}

function fleetRow(item) {
  const active = isActiveRide(item);
  const selected = item.id === state.selectedVehicleId;
  const speed = item.speed_kph == null ? "-" : `${Math.round(Number(item.speed_kph))} km/h`;
  return `<button class="fleet-row${selected ? " selected" : ""}" type="button" data-vehicle-id="${esc(item.id)}">
    <span class="vehicle-state ${esc(connectionState(item))}${active ? " active" : ""}"></span>
    <span class="fleet-row-main"><strong>${esc(item.plate_number)}</strong><small>${esc(item.make)} ${esc(item.model)}</small></span>
    <span class="fleet-row-driver"><strong>${esc(item.driver_name || "No driver")}</strong><small>${active ? esc(item.ride_reference) : connectionLabel(connectionState(item))}</small></span>
    <span class="fleet-row-speed"><strong>${esc(speed)}</strong><small>${relativeTime(item.position_recorded_at)}</small></span>
  </button>`;
}

function renderFleetList() {
  const filtered = state.fleet.filter(fleetMatchesFilter);
  $("#fleetCount").textContent = `${filtered.length} of ${state.fleet.length} vehicles`;
  $("#fleetList").innerHTML = filtered.length
    ? filtered.map(fleetRow).join("")
    : '<p class="empty">No vehicles match this filter.</p>';
  $$('[data-vehicle-id]', $("#fleetList")).forEach((element) => {
    element.onclick = () => selectVehicle(element.dataset.vehicleId, true);
  });
}

function renderVehicleInspector() {
  const item = state.fleet.find((vehicle) => vehicle.id === state.selectedVehicleId);
  if (!item) {
    $("#vehicleInspector").innerHTML = '<p class="empty">Select a vehicle to inspect it.</p>';
    return;
  }
  const connection = connectionState(item);
  const battery = item.battery_percent == null ? "-" : `${Math.round(Number(item.battery_percent))}%`;
  const accuracy = item.accuracy_m == null ? "-" : `${Math.round(Number(item.accuracy_m))} m`;
  const speed = item.speed_kph == null ? "-" : `${Math.round(Number(item.speed_kph))} km/h`;
  $("#vehicleInspector").innerHTML = `
    <div class="inspector-head"><div><span class="section-kicker">Selected vehicle</span><h3>${esc(item.plate_number)}</h3><p>${esc(item.make)} ${esc(item.model)} · ${esc(item.color || "Color not set")}</p></div>${telemetryBadge(item)}</div>
    <div class="telemetry-grid">
      <div><span>Speed</span><strong>${esc(speed)}</strong></div>
      <div><span>Battery</span><strong>${esc(battery)}</strong></div>
      <div><span>GPS accuracy</span><strong>${esc(accuracy)}</strong></div>
      <div><span>Last signal</span><strong>${relativeTime(item.position_recorded_at || item.device_last_seen_at)}</strong></div>
    </div>
    <div class="inspector-assignment">
      <span>Current assignment</span>
      <strong>${esc(item.driver_name || "No driver selected")}</strong>
      <p>${item.ride_reference ? `${esc(item.ride_reference)} · ${esc(String(item.ride_status).replaceAll("_", " "))}` : "No active ride"}</p>
    </div>
    <div class="inspector-actions">
      ${item.ride_id ? `<button class="primary-button compact" type="button" data-ride-id="${esc(item.ride_id)}">Open ride</button>` : ""}
      <button class="secondary-button" type="button" data-go="vehicles">Fleet record</button>
    </div>
  `;
  bindRideClicks($("#vehicleInspector"));
  $("[data-go]", $("#vehicleInspector")).onclick = () => showView("vehicles");
  $("#vehicleInspector").dataset.connection = connection;
}

function vehicleMarkerIcon(item) {
  const connection = connectionState(item);
  const active = isActiveRide(item);
  const selected = item.id === state.selectedVehicleId;
  const heading = Number.isFinite(Number(item.heading)) ? Number(item.heading) : 0;
  const plate = String(item.plate_number || "A").split(/\s+/)[0].slice(0, 3);
  return window.L.divIcon({
    className: "vehicle-marker-shell",
    html: `<div class="vehicle-marker ${esc(connection)}${active ? " active" : ""}${selected ? " selected" : ""}"><span style="transform:rotate(${heading}deg)">&uarr;</span><b>${esc(plate)}</b></div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    tooltipAnchor: [0, -22],
  });
}

function ensureMap() {
  if (state.map || $("#overviewView").hidden) return state.map;
  if (!window.L) {
    $("#mapLoading").textContent = "Map service could not be loaded.";
    return null;
  }
  state.map = window.L.map("fleetMap", { zoomControl: true, attributionControl: true }).setView([42.6507, 18.0944], 10);
  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(state.map);
  window.setTimeout(() => state.map.invalidateSize(), 0);
  return state.map;
}

function renderFleetMap() {
  const map = ensureMap();
  if (!map) return;
  const visibleIds = new Set();
  const positioned = state.fleet.filter(hasCoordinates);
  positioned.forEach((item) => {
    visibleIds.add(item.id);
    const coordinates = [Number(item.latitude), Number(item.longitude)];
    let marker = state.markers.get(item.id);
    if (!marker) {
      marker = window.L.marker(coordinates, { icon: vehicleMarkerIcon(item), keyboard: true }).addTo(map);
      marker.on("click", () => selectVehicle(item.id, false));
      state.markers.set(item.id, marker);
    } else {
      marker.setLatLng(coordinates);
      marker.setIcon(vehicleMarkerIcon(item));
    }
    marker.bindTooltip(`<strong>${esc(item.plate_number)}</strong><br>${esc(item.driver_name || "No driver")} · ${esc(connectionLabel(connectionState(item)))}`, { direction: "top" });
  });
  for (const [id, marker] of state.markers) {
    if (!visibleIds.has(id)) {
      marker.remove();
      state.markers.delete(id);
    }
  }
  const loading = $("#mapLoading");
  if (positioned.length) {
    loading.hidden = true;
    if (!state.hasFitMap) fitFleetMap();
  } else {
    loading.hidden = false;
    loading.textContent = state.fleet.length
      ? "No vehicle has reported a GPS position yet."
      : "Add a vehicle and connect its tracker to start live monitoring.";
  }
}

function fitFleetMap() {
  const map = ensureMap();
  const markers = [...state.markers.values()];
  if (!map || !markers.length) return;
  const group = window.L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.22), { maxZoom: 14 });
  state.hasFitMap = true;
}

async function drawVehicleTrail(item) {
  if (!state.map) return;
  if (state.trailLayer) {
    state.trailLayer.remove();
    state.trailLayer = null;
  }
  if (!item?.ride_id) return;
  const selectedId = item.id;
  try {
    const data = await api(`/api/admin-data?resource=ride&id=${encodeURIComponent(item.ride_id)}`);
    if (state.selectedVehicleId !== selectedId) return;
    const points = (data.positions || [])
      .filter(hasCoordinates)
      .map((position) => [Number(position.latitude), Number(position.longitude)])
      .reverse();
    if (points.length > 1) {
      state.trailLayer = window.L.polyline(points, { color: "#6f2dbd", weight: 4, opacity: 0.72 }).addTo(state.map);
    }
  } catch {
    // The latest marker remains useful if historical points cannot be loaded.
  }
}

function selectVehicle(id, focusMap) {
  state.selectedVehicleId = id;
  renderFleetList();
  renderVehicleInspector();
  renderFleetMap();
  const item = state.fleet.find((vehicle) => vehicle.id === id);
  if (focusMap && item && hasCoordinates(item) && state.map) {
    state.map.flyTo([Number(item.latitude), Number(item.longitude)], Math.max(state.map.getZoom(), 14), { duration: 0.5 });
  }
  drawVehicleTrail(item);
}

function dispatchCard(ride) {
  const overdue = new Date(ride.scheduled_at).getTime() < Date.now() && ["requested", "confirmed", "assigned"].includes(ride.status);
  return `<button class="dispatch-card${overdue ? " overdue" : ""}" type="button" data-ride-id="${esc(ride.id)}">
    <div><strong>${timeOnly(ride.scheduled_at)}</strong>${status(ride.status)}</div>
    <span>${esc(ride.reference)}</span>
    <p><b>${esc(ride.pickup_address)}</b><i>&rarr;</i>${esc(ride.destination_address)}</p>
    <footer><span>${esc(ride.rider_name)}</span><span>${esc(ride.driver_name || "Unassigned")}</span></footer>
  </button>`;
}

function renderDispatch() {
  const rides = state.overview?.rides || [];
  const groups = {
    requested: rides.filter((ride) => ride.status === "requested"),
    confirmed: rides.filter((ride) => ride.status === "confirmed" && !ride.driver_id),
    assigned: rides.filter((ride) => ["assigned", "en_route", "arrived"].includes(ride.status)),
    progress: rides.filter((ride) => ["in_progress", "emergency"].includes(ride.status)),
  };
  const targets = {
    requested: ["requestedRides", "requestedCount"],
    confirmed: ["confirmedRides", "confirmedCount"],
    assigned: ["assignedRides", "assignedCount"],
    progress: ["progressRides", "progressCount"],
  };
  Object.entries(groups).forEach(([key, items]) => {
    const [listId, countId] = targets[key];
    $("#" + listId).innerHTML = items.length ? items.map(dispatchCard).join("") : '<p class="empty">Queue is clear.</p>';
    $("#" + countId).textContent = `${items.length} ${items.length === 1 ? "ride" : "rides"}`;
  });
  const open = groups.requested.length + groups.confirmed.length;
  const live = groups.assigned.length + groups.progress.length;
  $("#dispatchSummary").innerHTML = `
    <div><span>Waiting for action</span><strong>${open}</strong></div>
    <div><span>Drivers committed</span><strong>${groups.assigned.length}</strong></div>
    <div><span>Transfers underway</span><strong>${groups.progress.length}</strong></div>
    <div><span>Fleet engaged</span><strong>${state.fleet.filter(isActiveRide).length}</strong></div>
  `;
  bindRideClicks($("#dispatchView"));
}

async function loadRides() {
  const data = await api("/api/admin-data?resource=rides");
  state.rides = data.rides || [];
  renderRides();
}

function renderRides() {
  const term = $("#rideSearch").value.trim().toLowerCase();
  const filter = $("#rideFilter").dataset.value || "";
  const rows = state.rides.filter(
    (ride) =>
      (!filter || ride.status === filter) &&
      [ride.reference, ride.rider_name, ride.pickup_address, ride.destination_address, ride.driver_name, ride.plate_number]
        .join(" ")
        .toLowerCase()
        .includes(term),
  );
  $("#ridesTable").innerHTML = rows.length
    ? rows.map((ride) => {
        const tracking = ride.last_location_at
          ? `<span class="connection ${Date.now() - new Date(ride.last_location_at).getTime() <= LIVE_POSITION_MS ? "live" : "stale"}"><i></i>${relativeTime(ride.last_location_at)}</span>`
          : '<span class="connection offline"><i></i>No GPS</span>';
        return `<tr data-ride-id="${esc(ride.id)}">
          <td><strong>${esc(ride.reference)}</strong><small>${esc(ride.service)}</small></td>
          <td><strong>${dateTime(ride.scheduled_at)}</strong><small>${esc(ride.flight_number || "No flight")}</small></td>
          <td><span class="table-route">${esc(ride.pickup_address)}<b>&darr;</b>${esc(ride.destination_address)}</span></td>
          <td><strong>${esc(ride.rider_name)}</strong><small>${esc(ride.rider_phone)}</small></td>
          <td><strong>${esc(ride.driver_name || "Unassigned")}</strong><small>${esc(ride.plate_number || "No vehicle")}</small></td>
          <td>${tracking}</td><td>${status(ride.status)}</td>
        </tr>`;
      }).join("")
    : '<tr><td colspan="7" class="empty">No matching rides.</td></tr>';
  bindRideClicks($("#ridesTable"));
}

function deviceConnection(driver) {
  if (!driver.device_last_seen_at) return "offline";
  const age = Date.now() - new Date(driver.device_last_seen_at).getTime();
  return age <= LIVE_POSITION_MS ? "live" : age <= STALE_POSITION_MS ? "stale" : "offline";
}

async function loadDrivers() {
  const data = await api("/api/admin-data?resource=drivers");
  state.drivers = data.drivers || [];
  $("#driversGrid").innerHTML = state.drivers.length
    ? state.drivers.map((driver) => {
        const connection = deviceConnection(driver);
        const canSuspend = driver.status !== "suspended" && !Number(driver.active_rides);
        return `<article class="entity-card">
          <header><div><span class="availability ${esc(driver.status)}"></span><h2>${esc(driver.full_name)}</h2></div>${status(driver.status)}</header>
          <p>${esc(driver.phone || "No phone")} · ${esc(driver.email || "No email")}</p>
          <div class="entity-facts">
            <div><span>Driver app</span><strong>${esc(connectionLabel(connection))}</strong><small>${relativeTime(driver.device_last_seen_at)}</small></div>
            <div><span>Selected vehicle</span><strong>${esc(driver.selected_vehicle_plate || "None")}</strong><small>${esc([driver.selected_vehicle_make, driver.selected_vehicle_model].filter(Boolean).join(" ") || "Not selected")}</small></div>
            <div><span>Active rides</span><strong>${Number(driver.active_rides || 0)}</strong><small>${Number(driver.completed_rides || 0)} completed</small></div>
            <div><span>Licence</span><strong>${esc(driver.license_number || "Not entered")}</strong><small>Verification record</small></div>
          </div>
          <div class="entity-actions">
            <button class="secondary-button" type="button" data-driver-token="${esc(driver.id)}">Create app token</button>
            ${driver.status === "suspended"
              ? `<button class="secondary-button" type="button" data-driver-status="offline" data-driver-id="${esc(driver.id)}">Reactivate</button>`
              : `<button class="danger-button" type="button" data-driver-status="suspended" data-driver-id="${esc(driver.id)}" ${canSuspend ? "" : "disabled"}>Suspend</button>`}
          </div>
        </article>`;
      }).join("")
    : '<p class="empty">No drivers yet.</p>';
  $$('[data-driver-token]', $("#driversGrid")).forEach((element) => {
    element.onclick = () => createToken({ kind: "driver_app", driverId: element.dataset.driverToken, label: "Aurora Driver app" });
  });
  $$('[data-driver-status]', $("#driversGrid")).forEach((element) => {
    element.onclick = () => entityAction({ action: "set_driver_status", driverId: element.dataset.driverId, status: element.dataset.driverStatus }, loadDrivers);
  });
}

async function loadVehicles() {
  const data = await api("/api/admin-data?resource=vehicles");
  state.vehicles = data.vehicles || [];
  state.fleet = state.vehicles;
  $("#vehiclesGrid").innerHTML = state.vehicles.length
    ? `<div class="fleet-table-head"><span>Vehicle</span><span>Tracker</span><span>Driver / ride</span><span>Telemetry</span><span>Service state</span><span>Actions</span></div>` +
      state.vehicles.map((vehicle) => {
        const connection = connectionState(vehicle);
        const speed = vehicle.speed_kph == null ? "-" : `${Math.round(Number(vehicle.speed_kph))} km/h`;
        const canRemove = !isActiveRide(vehicle);
        return `<article class="fleet-record">
          <div data-label="Vehicle"><strong>${esc(vehicle.plate_number)}</strong><small>${esc(vehicle.make)} ${esc(vehicle.model)} · ${vehicle.passenger_capacity} seats</small></div>
          <div data-label="Tracker">${telemetryBadge(vehicle)}<small>${esc(vehicle.device_label || "No linked tracker")}</small></div>
          <div data-label="Driver / ride"><strong>${esc(vehicle.driver_name || "No driver")}</strong><small>${vehicle.ride_reference ? `${esc(vehicle.ride_reference)} · ${esc(vehicle.ride_status)}` : "No active ride"}</small></div>
          <div data-label="Telemetry"><strong>${esc(speed)}</strong><small>${relativeTime(vehicle.position_recorded_at)}</small></div>
          <div data-label="Service state">${status(vehicle.status)}</div>
          <div class="record-actions" data-label="Actions">
            <button class="secondary-button" type="button" data-tracker-token="${esc(vehicle.id)}">Tracker token</button>
            ${isActiveRide(vehicle)
              ? '<button class="secondary-button" type="button" disabled>Active ride</button>'
              : vehicle.status === "available"
              ? `<button class="danger-button" type="button" data-vehicle-status="maintenance" data-status-vehicle-id="${esc(vehicle.id)}" ${canRemove ? "" : "disabled"}>Maintenance</button>`
              : `<button class="secondary-button" type="button" data-vehicle-status="available" data-status-vehicle-id="${esc(vehicle.id)}">Return to service</button>`}
          </div>
        </article>`;
      }).join("")
    : '<p class="empty">No vehicles yet.</p>';
  $$('[data-tracker-token]', $("#vehiclesGrid")).forEach((element) => {
    element.onclick = () => createToken({ kind: "vehicle_tracker", vehicleId: element.dataset.trackerToken, label: "Aurora vehicle tracker" });
  });
  $$('[data-vehicle-status]', $("#vehiclesGrid")).forEach((element) => {
    element.onclick = () => entityAction({ action: "set_vehicle_status", vehicleId: element.dataset.statusVehicleId, status: element.dataset.vehicleStatus }, loadVehicles);
  });
}

async function loadIncidents() {
  const data = await api("/api/admin-data?resource=incidents");
  state.incidents = data.incidents || [];
  const open = state.incidents.filter((item) => item.status === "open").length;
  const acknowledged = state.incidents.filter((item) => item.status === "acknowledged").length;
  const critical = state.incidents.filter((item) => ["critical", "high"].includes(item.severity) && ["open", "acknowledged"].includes(item.status)).length;
  $("#incidentSummary").innerHTML = `
    <div><span>Open</span><strong>${open}</strong></div>
    <div><span>Acknowledged</span><strong>${acknowledged}</strong></div>
    <div><span>High priority</span><strong>${critical}</strong></div>
    <div><span>Total history</span><strong>${state.incidents.length}</strong></div>
  `;
  $("#safetyList").innerHTML = state.incidents.length
    ? state.incidents.map((item) => {
        const details = item.details && typeof item.details === "object"
          ? Object.entries(item.details).slice(0, 4).map(([key, value]) => `<span><b>${esc(key.replaceAll("_", " "))}</b>${esc(value)}</span>`).join("")
          : "";
        return `<article class="safety-record">
          <header><div><span class="status severity-${esc(item.severity)}">${esc(item.severity)}</span>${status(item.status)}</div><time>${dateTime(item.created_at)}</time></header>
          <div class="safety-main"><div><span class="section-kicker">${esc(item.type.replaceAll("_", " "))}</span><h3>${esc(item.title)}</h3><p>${esc(item.reference || "System event")} · ${esc(item.driver_name || "No driver")} · ${esc(item.plate_number || "No vehicle")}</p></div><div class="safety-details">${details}</div></div>
          <footer>
            ${item.ride_id ? `<button class="secondary-button" type="button" data-ride-id="${esc(item.ride_id)}">Open ride</button>` : ""}
            ${item.status === "open" ? `<button class="secondary-button" type="button" data-incident-action="acknowledge" data-incident-id="${esc(item.id)}">Acknowledge</button>` : ""}
            ${["open", "acknowledged"].includes(item.status) ? `<button class="primary-button compact" type="button" data-incident-action="resolve" data-incident-id="${esc(item.id)}">Resolve</button><button class="text-button muted" type="button" data-incident-action="dismiss" data-incident-id="${esc(item.id)}">Dismiss</button>` : ""}
          </footer>
        </article>`;
      }).join("")
    : '<p class="empty">No incidents have been recorded.</p>';
  bindRideClicks($("#safetyList"));
  bindIncidentActions($("#safetyList"));
}

function customSelectMarkup(id, items, currentValue, placeholder) {
  const selected = items.find((item) => String(item.value) === String(currentValue));
  return `<div class="custom-filter" id="${esc(id)}" data-custom-select data-value="${esc(currentValue || "")}">
    <button class="filter-trigger" type="button" aria-haspopup="listbox" aria-expanded="false"><span data-filter-label>${esc(selected?.label || placeholder)}</span></button>
    <div class="filter-menu" role="listbox" hidden>
      ${items.map((item) => {
        const isSelected = String(item.value) === String(currentValue);
        return `<button class="filter-option${isSelected ? " selected" : ""}" type="button" role="option" aria-selected="${isSelected}" data-filter-value="${esc(item.value)}">${esc(item.label)}</button>`;
      }).join("")}
    </div>
  </div>`;
}

function closeCustomSelect(select) {
  const menu = $(".filter-menu", select);
  const trigger = $(".filter-trigger", select);
  if (!menu || !trigger) return;
  menu.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  select.classList.remove("open");
}

function closeAllCustomSelects(except = null) {
  $$('[data-custom-select].open').forEach((select) => {
    if (select !== except) closeCustomSelect(select);
  });
}

function initializeCustomSelect(select) {
  if (select.dataset.bound === "true") return;
  select.dataset.bound = "true";
  const trigger = $(".filter-trigger", select);
  const menu = $(".filter-menu", select);
  const options = $$(".filter-option", select);
  const setOpen = (open, focusOption = false) => {
    closeAllCustomSelects(select);
    menu.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
    select.classList.toggle("open", open);
    if (open && focusOption) (options.find((option) => option.classList.contains("selected")) || options[0])?.focus();
  };
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(menu.hidden);
  });
  trigger.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    setOpen(true, true);
  });
  options.forEach((option, index) => {
    option.addEventListener("click", () => {
      select.dataset.value = option.dataset.filterValue || "";
      $("[data-filter-label]", select).textContent = option.textContent;
      options.forEach((item) => {
        const isSelected = item === option;
        item.classList.toggle("selected", isSelected);
        item.setAttribute("aria-selected", String(isSelected));
      });
      setOpen(false);
      trigger.focus();
      select.dispatchEvent(new CustomEvent("change", { bubbles: true }));
    });
    option.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        trigger.focus();
      } else if (["ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        const step = event.key === "ArrowDown" ? 1 : -1;
        options[(index + step + options.length) % options.length].focus();
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        options[event.key === "Home" ? 0 : options.length - 1].focus();
      }
    });
  });
}

function initializeCustomSelects(root = document) {
  $$('[data-custom-select]', root).forEach(initializeCustomSelect);
}

async function openRide(id) {
  try {
    const requests = [api(`/api/admin-data?resource=ride&id=${encodeURIComponent(id)}`)];
    if (!state.drivers.length) requests.push(api("/api/admin-data?resource=drivers"));
    if (!state.vehicles.length) requests.push(api("/api/admin-data?resource=vehicles"));
    const results = await Promise.all(requests);
    const data = results[0];
    results.slice(1).forEach((result) => {
      if (result.drivers) state.drivers = result.drivers;
      if (result.vehicles) state.vehicles = result.vehicles;
    });
    const ride = data.ride;
    const latest = data.positions?.[0];
    const driverItems = [{ value: "", label: "Choose driver" }, ...state.drivers.map((driver) => ({ value: driver.id, label: `${driver.full_name} · ${driver.status}` }))];
    const vehicleItems = [{ value: "", label: "Choose vehicle" }, ...state.vehicles.map((vehicle) => ({ value: vehicle.id, label: `${vehicle.plate_number} · ${vehicle.make} ${vehicle.model}` }))];
    const statusItems = ["requested", "confirmed", "assigned", "en_route", "arrived", "in_progress", "completed", "cancelled", "no_show", "emergency"].map((value) => ({ value, label: value.replaceAll("_", " ") }));
    const gpsState = ride.last_location_at && Date.now() - new Date(ride.last_location_at).getTime() <= LIVE_POSITION_MS ? "live" : ride.last_location_at ? "stale" : "offline";
    $("#rideDetail").innerHTML = `
      <div class="dialog-head ride-dialog-head"><div><span class="eyebrow">${esc(ride.reference)}</span><h2>${esc(ride.rider_name)}</h2><p>${dateTime(ride.scheduled_at)}</p></div><button class="icon-button" type="button" data-close-dialog aria-label="Close">&times;</button></div>
      <div class="ride-status-line">${status(ride.status)}<span class="connection ${gpsState}"><i></i>${ride.last_location_at ? `GPS ${relativeTime(ride.last_location_at)}` : "No GPS position"}</span></div>
      <div class="detail-route"><span>Pickup</span><strong>${esc(ride.pickup_address)}</strong><i>&darr;</i><span>Destination</span><strong>${esc(ride.destination_address)}</strong></div>
      <div class="detail-grid">
        <div class="detail-item"><span>Passengers</span><strong>${ride.passenger_count}</strong></div>
        <div class="detail-item"><span>Flight</span><strong>${esc(ride.flight_number || "-")}</strong></div>
        <div class="detail-item"><span>Phone</span><strong>${esc(ride.rider_phone)}</strong></div>
        <div class="detail-item"><span>Email</span><strong>${esc(ride.rider_email)}</strong></div>
        <div class="detail-item"><span>Payment</span><strong>${esc(ride.payment_status)}</strong></div>
        <div class="detail-item"><span>Price</span><strong>${ride.quoted_price ? `${esc(ride.quoted_price)} ${esc(ride.currency)}` : "Not set"}</strong></div>
      </div>
      <section class="drawer-section">
        <div class="drawer-section-head"><div><span class="section-kicker">Live telemetry</span><h3>Last vehicle signal</h3></div>${ride.vehicle_id ? '<button class="text-button" type="button" id="viewRideOnMap">Show on map</button>' : ""}</div>
        <div class="telemetry-grid drawer-telemetry">
          <div><span>Speed</span><strong>${latest?.speed_kph == null ? "-" : `${Math.round(Number(latest.speed_kph))} km/h`}</strong></div>
          <div><span>Heading</span><strong>${latest?.heading == null ? "-" : `${Math.round(Number(latest.heading))}°`}</strong></div>
          <div><span>Accuracy</span><strong>${latest?.accuracy_m == null ? "-" : `${Math.round(Number(latest.accuracy_m))} m`}</strong></div>
          <div><span>Battery</span><strong>${latest?.battery_percent == null ? "-" : `${Math.round(Number(latest.battery_percent))}%`}</strong></div>
        </div>
      </section>
      <section class="drawer-section"><span class="section-kicker">Dispatch controls</span><h3>Assignment</h3><div class="ride-controls two-column">
        <label><span>Driver</span>${customSelectMarkup("assignDriver", driverItems, ride.driver_id, "Choose driver")}</label>
        <label><span>Vehicle</span>${customSelectMarkup("assignVehicle", vehicleItems, ride.vehicle_id, "Choose vehicle")}</label>
        <button class="primary-button" type="button" id="assignRide">Assign ride</button>
        <button class="secondary-button" type="button" id="dispatchRide" ${ride.status !== "confirmed" || ride.driver_id ? "disabled" : ""}>Offer to nearby drivers</button>
      </div></section>
      <section class="drawer-section"><span class="section-kicker">Commercial</span><h3>Price and ride state</h3><div class="ride-controls two-column">
        <label><span>Quoted price</span><input id="ridePrice" type="number" min="0" step="0.01" value="${esc(ride.quoted_price || "")}"></label>
        <label><span>Status</span>${customSelectMarkup("rideStatus", statusItems, ride.status, "Choose status")}</label>
        <button class="secondary-button" type="button" id="setPrice">Save price</button>
        <button class="secondary-button" type="button" id="changeStatus">Apply status</button>
      </div></section>
      <section class="drawer-section"><div class="drawer-section-head"><div><span class="section-kicker">Audit trail</span><h3>Ride activity</h3></div><span>${data.events.length} events</span></div><div class="timeline">${data.events.length ? data.events.map((event) => `<div class="timeline-item"><strong>${esc(event.event_type.replaceAll("_", " "))}</strong><span>${dateTime(event.occurred_at)} · ${esc(event.actor_type)}${event.to_status ? ` · ${esc(event.from_status || "new")} → ${esc(event.to_status)}` : ""}</span></div>`).join("") : '<p class="empty">No activity recorded.</p>'}</div></section>
      ${data.incidents?.length ? `<section class="drawer-section"><span class="section-kicker">Safety</span><h3>${data.incidents.length} linked incident(s)</h3>${data.incidents.map((incident) => incidentRow(incident, true)).join("")}</section>` : ""}
    `;
    initializeCustomSelects($("#rideDetail"));
    if (!$("#rideDialog").open) $("#rideDialog").showModal();
    $("#assignRide").onclick = () => rideAction({ action: "assign_ride", rideId: id, driverId: $("#assignDriver").dataset.value, vehicleId: $("#assignVehicle").dataset.value }, id);
    $("#dispatchRide").onclick = () => rideAction({ action: "dispatch_ride", rideId: id }, id);
    $("#setPrice").onclick = () => rideAction({ action: "set_price", rideId: id, price: $("#ridePrice").value, currency: "EUR" }, id);
    $("#changeStatus").onclick = () => rideAction({ action: "transition_ride", rideId: id, toStatus: $("#rideStatus").dataset.value, reason: "Admin operation", override: true }, id);
    if ($("#viewRideOnMap")) {
      $("#viewRideOnMap").onclick = async () => {
        $("#rideDialog").close();
        await showView("overview");
        selectVehicle(ride.vehicle_id, true);
      };
    }
  } catch (error) {
    notify(error.message, true);
  }
}

async function rideAction(payload, id) {
  try {
    const result = await api("/api/admin-data", { method: "POST", body: JSON.stringify(payload) });
    notify(result.offers ? `Ride offered to ${result.offers.length} driver(s).` : "Ride updated.");
    await loadOperations({ quiet: true });
    if (state.view === "rides") await loadRides();
    await openRide(id);
  } catch (error) {
    notify(error.message, true);
  }
}

async function entityAction(payload, reload) {
  try {
    await api("/api/admin-data", { method: "POST", body: JSON.stringify(payload) });
    notify("Operational record updated.");
    await reload();
  } catch (error) {
    notify(error.message, true);
  }
}

function bindIncidentActions(root = document) {
  $$('[data-incident-action]', root).forEach((element) => {
    element.onclick = async () => {
      const mode = element.dataset.incidentAction;
      const payload = mode === "acknowledge"
        ? { action: "acknowledge_incident", incidentId: element.dataset.incidentId }
        : { action: "resolve_incident", incidentId: element.dataset.incidentId, dismiss: mode === "dismiss" };
      try {
        await api("/api/admin-data", { method: "POST", body: JSON.stringify(payload) });
        notify(mode === "acknowledge" ? "Incident acknowledged." : "Incident closed.");
        if (state.view === "incidents") await loadIncidents();
        await loadOperations({ quiet: true });
      } catch (error) {
        notify(error.message, true);
      }
    };
  });
}

async function createToken(payload) {
  try {
    const data = await api("/api/admin-data", { method: "POST", body: JSON.stringify({ action: "create_device_token", ...payload }) });
    $("#deviceToken").textContent = data.token;
    $("#copyToken").textContent = "Copy token";
    $("#tokenDialog").showModal();
  } catch (error) {
    notify(error.message, true);
  }
}

async function showView(view) {
  state.view = view;
  $$(".view").forEach((element) => (element.hidden = element.id !== `${view}View`));
  $$(".nav-item").forEach((element) => element.classList.toggle("active", element.dataset.view === view));
  $("#viewTitle").textContent = {
    overview: "Live operations",
    dispatch: "Dispatch board",
    rides: "All rides",
    drivers: "Driver operations",
    vehicles: "Fleet operations",
    incidents: "Safety center",
  }[view];
  closeMenu();
  if (view === "overview" || view === "dispatch") await loadOperations();
  if (view === "rides") await loadRides();
  if (view === "drivers") await loadDrivers();
  if (view === "vehicles") await loadVehicles();
  if (view === "incidents") await loadIncidents();
  scheduleLiveRefresh();
  if (view === "overview" && state.map) window.setTimeout(() => state.map.invalidateSize(), 0);
}

function scheduleLiveRefresh() {
  window.clearInterval(state.refreshTimer);
  state.refreshTimer = null;
  if (!$("#liveRefresh").checked || !["overview", "dispatch"].includes(state.view)) return;
  state.refreshTimer = window.setInterval(() => {
    if (!document.hidden) loadOperations({ quiet: true });
  }, LIVE_REFRESH_MS);
}

function closeMenu() {
  $("#sidebar").classList.remove("open");
  $("#menuScrim").hidden = true;
}

$$(".nav-item").forEach((element) => {
  element.addEventListener("click", () => showView(element.dataset.view));
});
$$("[data-go]").forEach((element) => {
  element.addEventListener("click", () => showView(element.dataset.go));
});
$$('[data-dialog]').forEach((element) => {
  element.addEventListener("click", () => $("#" + element.dataset.dialog).showModal());
});

$("#refreshButton").addEventListener("click", async () => {
  $("#refreshButton").disabled = true;
  try {
    await showView(state.view);
  } finally {
    $("#refreshButton").disabled = false;
  }
});
$("#rideSearch").addEventListener("input", renderRides);
$("#rideFilter").addEventListener("change", renderRides);
$("#liveRefresh").addEventListener("change", scheduleLiveRefresh);
$("#fitFleet").addEventListener("click", fitFleetMap);

$$('[data-fleet-filter]').forEach((element) => {
  element.addEventListener("click", () => {
    state.fleetFilter = element.dataset.fleetFilter;
    $$('[data-fleet-filter]').forEach((button) => button.classList.toggle("active", button === element));
    renderFleetList();
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-custom-select]")) closeAllCustomSelects();
  const closeButton = event.target.closest("[data-close-dialog]");
  if (closeButton) closeButton.closest("dialog")?.close();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && ["overview", "dispatch"].includes(state.view)) loadOperations({ quiet: true });
});

$$('dialog').forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

$$('[data-create]').forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    const action = form.dataset.create === "driver" ? "create_driver" : "create_vehicle";
    try {
      await api("/api/admin-data", { method: "POST", body: JSON.stringify({ action, ...values }) });
      form.closest("dialog").close();
      form.reset();
      notify(`${form.dataset.create} created.`);
      await showView(form.dataset.create === "driver" ? "drivers" : "vehicles");
    } catch (error) {
      notify(error.message, true);
    }
  });
});

$("#copyToken").addEventListener("click", async () => {
  await navigator.clipboard.writeText($("#deviceToken").textContent);
  $("#copyToken").textContent = "Copied";
});

$("#openMenu").onclick = () => {
  $("#sidebar").classList.add("open");
  $("#menuScrim").hidden = false;
};
$("#closeMenu").onclick = closeMenu;
$("#menuScrim").onclick = closeMenu;

initializeCustomSelects();
session().catch((error) => {
  $("#loginError").textContent = error.message;
  $("#loginError").hidden = false;
});
