const state = {
  overview: null,
  rides: [],
  drivers: [],
  vehicles: [],
  view: "overview",
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
const status = (value) =>
  `<span class="status ${esc(value)}">${esc(String(value).replaceAll("_", " "))}</span>`;
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
  const el = $("#notice");
  el.textContent = message;
  el.className = `notice${error ? " error" : ""}`;
  el.hidden = false;
  setTimeout(() => (el.hidden = true), 5000);
}
function setLoggedIn(loggedIn) {
  $("#loginView").hidden = loggedIn;
  $("#appView").hidden = !loggedIn;
}
async function session() {
  const data = await api("/api/admin-session");
  if (data.authenticated) {
    setLoggedIn(true);
    await loadOverview();
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
    await loadOverview();
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

function metric(value, label, theme) {
  return `<article class="metric ${theme}"><strong>${Number(value || 0)}</strong><span>${label}</span></article>`;
}
function rideRow(ride) {
  return `<button class="ride-row" data-ride-id="${ride.id}"><div class="ride-main"><strong>${esc(ride.reference)}</strong>${status(ride.status)}</div><p class="route">${esc(ride.pickup_address)} &rarr; ${esc(ride.destination_address)}</p><div class="ride-meta"><span>${dateTime(ride.scheduled_at)}</span><span>${esc(ride.rider_name)}</span></div></button>`;
}
function incidentRow(item) {
  return `<article class="incident-row"><div class="incident-title"><strong>${esc(item.title)}</strong><span class="status severity-${esc(item.severity)}">${esc(item.severity)}</span></div><p>${esc(item.reference || "System")} · ${dateTime(item.created_at)}</p><button class="text-button" data-resolve="${item.id}">Resolve</button></article>`;
}
function driverRow(item) {
  return `<article class="driver-row"><div><div class="driver-main"><span class="availability ${esc(item.status)}"></span><strong>${esc(item.full_name)}</strong></div><p>${esc(item.status)} · ${item.active_rides || 0} active rides</p></div><span class="status">${item.active_rides ? "busy" : "ready"}</span></article>`;
}
function bindRideClicks(root = document) {
  $$("[data-ride-id]", root).forEach((el) =>
    el.addEventListener("click", () => openRide(el.dataset.rideId)),
  );
}

async function loadOverview() {
  const data = await api("/api/admin-data?resource=overview");
  state.overview = data;
  state.drivers = data.drivers;
  $("#metrics").innerHTML =
    metric(data.counts.active, "Active pipeline", "purple") +
    metric(data.counts.live, "Live rides", "pink") +
    metric(data.counts.unconfirmed, "Need confirmation", "kiwi") +
    metric(data.counts.completed_today, "Completed today", "blue");
  $("#liveRides").innerHTML = data.rides.length
    ? data.rides.slice(0, 12).map(rideRow).join("")
    : '<p class="empty">No upcoming rides.</p>';
  $("#incidentList").innerHTML = data.incidents.length
    ? data.incidents.map(incidentRow).join("")
    : '<p class="empty">No open incidents.</p>';
  $("#driverSummary").innerHTML = data.drivers.length
    ? data.drivers.map(driverRow).join("")
    : '<p class="empty">Add the first driver.</p>';
  bindRideClicks();
  bindIncidentActions();
}
async function loadRides() {
  const data = await api("/api/admin-data?resource=rides");
  state.rides = data.rides;
  renderRides();
}
function renderRides() {
  const term = $("#rideSearch").value.toLowerCase(),
    filter = $("#rideFilter").value;
  const rows = state.rides.filter(
    (r) =>
      (!filter || r.status === filter) &&
      [r.reference, r.rider_name, r.pickup_address, r.destination_address]
        .join(" ")
        .toLowerCase()
        .includes(term),
  );
  $("#ridesTable").innerHTML =
    rows
      .map(
        (r) =>
          `<tr data-ride-id="${r.id}"><td><strong>${esc(r.reference)}</strong>${esc(r.service)}</td><td>${dateTime(r.scheduled_at)}</td><td>${esc(r.pickup_address)}<br>&darr;<br>${esc(r.destination_address)}</td><td>${esc(r.rider_name)}<br>${esc(r.rider_phone)}</td><td>${esc(r.driver_name || "Unassigned")}</td><td>${status(r.status)}</td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="6" class="empty">No matching rides.</td></tr>';
  bindRideClicks($("#ridesTable"));
}
async function loadDrivers() {
  const [driverData, vehicleData] = await Promise.all([
    api("/api/admin-data?resource=drivers"),
    api("/api/admin-data?resource=vehicles"),
  ]);
  state.drivers = driverData.drivers;
  state.vehicles = vehicleData.vehicles;
  $("#driversGrid").innerHTML =
    state.drivers
      .map(
        (d) =>
          `<article class="entity-card"><h2>${esc(d.full_name)}</h2><p>${esc(d.phone || "No phone")} · ${esc(d.email || "No email")}</p><p>Status: ${esc(d.status)} · Licence: ${esc(d.license_number || "Not entered")}</p><div class="entity-actions"><button class="secondary-button" data-driver-token="${d.id}">Create app token</button></div></article>`,
      )
      .join("") || '<p class="empty">No drivers yet.</p>';
  $$("[data-driver-token]").forEach((el) =>
    el.addEventListener("click", () =>
      createToken({
        kind: "driver_app",
        driverId: el.dataset.driverToken,
        label: "Aurora Driver app",
      }),
    ),
  );
}
async function loadVehicles() {
  const data = await api("/api/admin-data?resource=vehicles");
  state.vehicles = data.vehicles;
  $("#vehiclesGrid").innerHTML =
    state.vehicles
      .map(
        (v) =>
          `<article class="entity-card"><h2>${esc(v.make)} ${esc(v.model)}</h2><p>${esc(v.color || "Color not entered")} · ${esc(v.plate_number)}</p><p>${v.passenger_capacity} passengers · ${esc(v.status)}</p><div class="entity-actions"><button class="secondary-button" data-tracker-token="${v.id}">Create tracker token</button></div></article>`,
      )
      .join("") || '<p class="empty">No vehicles yet.</p>';
  $$("[data-tracker-token]").forEach((el) =>
    el.addEventListener("click", () =>
      createToken({
        kind: "vehicle_tracker",
        vehicleId: el.dataset.trackerToken,
        label: "Aurora vehicle tracker",
      }),
    ),
  );
}

async function showView(view) {
  state.view = view;
  $$(".view").forEach((el) => (el.hidden = el.id !== `${view}View`));
  $$(".nav-item").forEach((el) =>
    el.classList.toggle("active", el.dataset.view === view),
  );
  $("#viewTitle").textContent = {
    overview: "Operations overview",
    rides: "All rides",
    drivers: "Drivers",
    vehicles: "Fleet",
  }[view];
  closeMenu();
  if (view === "overview") await loadOverview();
  if (view === "rides") await loadRides();
  if (view === "drivers") await loadDrivers();
  if (view === "vehicles") await loadVehicles();
}
$$(".nav-item").forEach((el) =>
  el.addEventListener("click", () => showView(el.dataset.view)),
);
$$("[data-go]").forEach((el) =>
  el.addEventListener("click", () => showView(el.dataset.go)),
);
$("#refreshButton").addEventListener("click", () => showView(state.view));
$("#rideSearch").addEventListener("input", renderRides);
$("#rideFilter").addEventListener("change", renderRides);

async function openRide(id) {
  try {
    const [data, vehicles] = await Promise.all([
      api(`/api/admin-data?resource=ride&id=${encodeURIComponent(id)}`),
      state.vehicles.length
        ? Promise.resolve({ vehicles: state.vehicles })
        : api("/api/admin-data?resource=vehicles"),
    ]);
    state.vehicles = vehicles.vehicles;
    const r = data.ride;
    const driverOptions = state.drivers
      .map(
        (d) =>
          `<option value="${d.id}" ${d.id === r.driver_id ? "selected" : ""}>${esc(d.full_name)}</option>`,
      )
      .join("");
    const vehicleOptions = state.vehicles
      .map(
        (v) =>
          `<option value="${v.id}" ${v.id === r.vehicle_id ? "selected" : ""}>${esc(v.plate_number)} · ${esc(v.make)} ${esc(v.model)}</option>`,
      )
      .join("");
    $("#rideDetail").innerHTML =
      `<div class="dialog-head"><div><span class="eyebrow">${esc(r.reference)}</span><h2>${esc(r.rider_name)}</h2></div><button class="icon-button" data-close aria-label="Close">&times;</button></div><div>${status(r.status)}</div><div class="detail-route"><span>${dateTime(r.scheduled_at)}</span><strong>${esc(r.pickup_address)}</strong><span>to</span><strong>${esc(r.destination_address)}</strong></div><div class="detail-grid"><div class="detail-item"><span>Passenger</span><strong>${r.passenger_count}</strong></div><div class="detail-item"><span>Flight</span><strong>${esc(r.flight_number || "-")}</strong></div><div class="detail-item"><span>Phone</span><strong>${esc(r.rider_phone)}</strong></div><div class="detail-item"><span>Price</span><strong>${r.quoted_price ? `${r.quoted_price} ${r.currency}` : "Not set"}</strong></div></div><div class="ride-controls"><label>Driver<select id="assignDriver"><option value="">Choose driver</option>${driverOptions}</select></label><label>Vehicle<select id="assignVehicle"><option value="">Choose vehicle</option>${vehicleOptions}</select></label><button class="primary-button" id="assignRide">Assign ride</button><label>Quoted price<input id="ridePrice" type="number" min="0" step="0.01" value="${r.quoted_price || ""}"></label><button class="secondary-button" id="setPrice">Save price</button><label>Change status<select id="rideStatus">${["requested", "confirmed", "assigned", "en_route", "arrived", "in_progress", "completed", "cancelled", "no_show", "emergency"].map((s) => `<option ${s === r.status ? "selected" : ""}>${s}</option>`).join("")}</select></label><button class="secondary-button" id="changeStatus">Apply status</button></div><section><h3>Audit timeline</h3><div class="timeline">${data.events.map((e) => `<div class="timeline-item"><strong>${esc(e.event_type.replaceAll("_", " "))}</strong><span>${dateTime(e.occurred_at)} · ${esc(e.actor_type)}${e.to_status ? ` · ${esc(e.from_status || "new")} → ${esc(e.to_status)}` : ""}</span></div>`).join("")}</div></section>`;
    const dispatchButton = document.createElement("button");
    dispatchButton.className = "secondary-button";
    dispatchButton.id = "dispatchRide";
    dispatchButton.type = "button";
    dispatchButton.textContent = "Offer to nearby drivers";
    dispatchButton.disabled = r.status !== "confirmed" || Boolean(r.driver_id);
    $("#assignRide").insertAdjacentElement("afterend", dispatchButton);
    if (!$("#rideDialog").open) $("#rideDialog").showModal();
    $("[data-close]", $("#rideDetail")).onclick = () =>
      $("#rideDialog").close();
    $("#assignRide").onclick = () =>
      rideAction(
        {
          action: "assign_ride",
          rideId: id,
          driverId: $("#assignDriver").value,
          vehicleId: $("#assignVehicle").value,
        },
        id,
      );
    $("#dispatchRide").onclick = () =>
      rideAction({ action: "dispatch_ride", rideId: id }, id);
    $("#setPrice").onclick = () =>
      rideAction(
        {
          action: "set_price",
          rideId: id,
          price: $("#ridePrice").value,
          currency: "EUR",
        },
        id,
      );
    $("#changeStatus").onclick = () =>
      rideAction(
        {
          action: "transition_ride",
          rideId: id,
          toStatus: $("#rideStatus").value,
          reason: "Admin operation",
          override: true,
        },
        id,
      );
  } catch (error) {
    notify(error.message, true);
  }
}
async function rideAction(payload, id) {
  try {
    const result = await api("/api/admin-data", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    notify(
      result.offers
        ? `Ride offered to ${result.offers.length} driver(s).`
        : "Ride updated.",
    );
    await loadOverview();
    await openRide(id);
  } catch (error) {
    notify(error.message, true);
  }
}
function bindIncidentActions() {
  $$("[data-resolve]").forEach((el) =>
    el.addEventListener("click", async () => {
      try {
        await api("/api/admin-data", {
          method: "POST",
          body: JSON.stringify({
            action: "resolve_incident",
            incidentId: el.dataset.resolve,
          }),
        });
        await loadOverview();
      } catch (error) {
        notify(error.message, true);
      }
    }),
  );
}

$$("[data-dialog]").forEach((el) =>
  el.addEventListener("click", () => $("#" + el.dataset.dialog).showModal()),
);
$$("[data-create]").forEach((form) =>
  form.addEventListener("submit", async (event) => {
    if (event.submitter?.value === "cancel") return;
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    const action =
      form.dataset.create === "driver" ? "create_driver" : "create_vehicle";
    try {
      await api("/api/admin-data", {
        method: "POST",
        body: JSON.stringify({ action, ...values }),
      });
      form.closest("dialog").close();
      form.reset();
      notify(`${form.dataset.create} created.`);
      await showView(form.dataset.create === "driver" ? "drivers" : "vehicles");
    } catch (error) {
      notify(error.message, true);
    }
  }),
);
async function createToken(payload) {
  try {
    const data = await api("/api/admin-data", {
      method: "POST",
      body: JSON.stringify({ action: "create_device_token", ...payload }),
    });
    $("#deviceToken").textContent = data.token;
    $("#tokenDialog").showModal();
  } catch (error) {
    notify(error.message, true);
  }
}
$("#copyToken").addEventListener("click", async () => {
  await navigator.clipboard.writeText($("#deviceToken").textContent);
  $("#copyToken").textContent = "Copied";
});
function closeMenu() {
  $("#sidebar").classList.remove("open");
  $("#menuScrim").hidden = true;
}
$("#openMenu").onclick = () => {
  $("#sidebar").classList.add("open");
  $("#menuScrim").hidden = false;
};
$("#closeMenu").onclick = closeMenu;
$("#menuScrim").onclick = closeMenu;
session().catch((error) => {
  $("#loginError").textContent = error.message;
  $("#loginError").hidden = false;
});
