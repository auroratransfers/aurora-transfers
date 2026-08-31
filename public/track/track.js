const params = new URLSearchParams(location.search);
const token = params.get("token");
const requestedLanguage = params.get("lang");
const copy = {
  en: {
    route: "Route",
    pickup: "Pickup",
    destination: "Destination",
    yourDriver: "Your driver",
    progress: "Ride progress",
    manage: "Manage booking",
    manageRide: "Manage your ride",
    manageTitle: "Send a booking request",
    manageType: "Request type",
    change: "Change a ride",
    cancel: "Cancel a ride",
    sendRequest: "Send request",
    requestSent: "Your request was sent to Aurora.",
    requestFailed: "The request could not be sent. Please try again.",
    report: "Report a problem",
    panic: "Panic",
    panicSupport: "Urgent safety support",
    panicTitle: "Your location is being shared with Aurora.",
    panicText: "For immediate danger, call emergency services. Aurora receives a critical safety alert with your location.",
    panicSending: "Sending your panic alert and location...",
    panicSent: "Panic alert sent. Aurora has been notified.",
    panicDuplicate: "Your panic alert is already open. Aurora has been notified.",
    panicFailed: "We could not send your safety alert. Call police or Aurora now.",
    callPolice: "Call police 112",
    callAurora: "Call Aurora",
    call: "Call Aurora",
    support: "Safety support",
    tellUs: "Tell us what happened",
    send: "Send report",
    waiting: "Driver and vehicle will appear after confirmation.",
    mapTitle: "Live tracking will appear here",
    mapText: "Your driver's location is shown after assignment.",
    received: "Request received",
    confirmed: "Ride confirmed",
    assigned: "Driver assigned",
    arriving: "Driver is arriving",
    arrived: "Driver has arrived",
    moving: "Ride in progress",
    completed: "Ride completed",
    cancelled: "Ride cancelled",
    updated: "Updated",
    connecting: "Connecting",
    live: "Live",
    offline: "Offline",
    invalid: "Invalid tracking link",
    unavailable: "Tracking is temporarily unavailable",
    reportSent: "Report sent. Aurora will contact you.",
    reportFailed: "The report could not be sent. Please try again.",
    privateRide: "Private ride",
    finding: "Finding your ride...",
    loading: "Loading",
    close: "Close",
    title: "Track your Aurora ride",
  },
  hr: {
    route: "Ruta",
    pickup: "Polazište",
    destination: "Odredište",
    yourDriver: "Vaš vozač",
    progress: "Tijek vožnje",
    manage: "Upravljaj rezervacijom",
    manageRide: "Upravljajte svojom vožnjom",
    manageTitle: "Pošaljite zahtjev za rezervaciju",
    manageType: "Vrsta zahtjeva",
    change: "Promijeni vožnju",
    cancel: "Otkaži vožnju",
    sendRequest: "Pošalji zahtjev",
    requestSent: "Vaš zahtjev poslan je Aurori.",
    requestFailed: "Zahtjev nije moguće poslati. Pokušajte ponovno.",
    report: "Prijavi problem",
    panic: "Panic",
    panicSupport: "Hitna sigurnosna podrška",
    panicTitle: "Vaša lokacija šalje se Aurori.",
    panicText: "Ako ste u neposrednoj opasnosti, nazovite hitne službe. Aurora prima kritično sigurnosno upozorenje s vašom lokacijom.",
    panicSending: "Šaljemo sigurnosno upozorenje i lokaciju...",
    panicSent: "Panic upozorenje je poslano. Aurora je obaviještena.",
    panicDuplicate: "Vaše Panic upozorenje već je otvoreno. Aurora je obaviještena.",
    panicFailed: "Sigurnosno upozorenje nije poslano. Nazovite policiju ili Auroru odmah.",
    callPolice: "Nazovi policiju 112",
    callAurora: "Nazovi Auroru",
    call: "Nazovi Auroru",
    support: "Sigurnosna podrška",
    tellUs: "Recite nam što se dogodilo",
    send: "Pošalji prijavu",
    waiting: "Vozač i vozilo prikazat će se nakon potvrde.",
    mapTitle: "Praćenje uživo prikazat će se ovdje",
    mapText: "Lokacija vozača prikazuje se nakon dodjele.",
    received: "Zahtjev je zaprimljen",
    confirmed: "Vožnja je potvrđena",
    assigned: "Vozač je dodijeljen",
    arriving: "Vozač dolazi",
    arrived: "Vozač je stigao",
    moving: "Vožnja je u tijeku",
    completed: "Vožnja je završena",
    cancelled: "Vožnja je otkazana",
    updated: "Ažurirano",
    connecting: "Povezivanje",
    live: "Uživo",
    offline: "Izvan mreže",
    invalid: "Poveznica za praćenje nije valjana",
    unavailable: "Praćenje trenutačno nije dostupno",
    reportSent: "Prijava je poslana. Aurora će vas kontaktirati.",
    reportFailed: "Prijava nije poslana. Pokušajte ponovno.",
    privateRide: "Privatna vožnja",
    finding: "Pronalaženje vaše vožnje...",
    loading: "Učitavanje",
    close: "Zatvori",
    title: "Pratite svoju Aurora vožnju",
  },
  de: {
    route: "Route",
    pickup: "Abholung",
    destination: "Ziel",
    yourDriver: "Ihr Fahrer",
    progress: "Fahrtstatus",
    manage: "Buchung verwalten",
    manageRide: "Ihre Fahrt verwalten",
    manageTitle: "Buchungsanfrage senden",
    manageType: "Art der Anfrage",
    change: "Fahrt ändern",
    cancel: "Fahrt stornieren",
    sendRequest: "Anfrage senden",
    requestSent: "Ihre Anfrage wurde an Aurora gesendet.",
    requestFailed: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    report: "Problem melden",
    panic: "Panik",
    panicSupport: "Dringende Sicherheitsunterstützung",
    panicTitle: "Ihr Standort wird an Aurora gesendet.",
    panicText: "Rufen Sie bei unmittelbarer Gefahr den Notruf an. Aurora erhält einen kritischen Sicherheitsalarm mit Ihrem Standort.",
    panicSending: "Sicherheitsalarm und Standort werden gesendet...",
    panicSent: "Panikalarm gesendet. Aurora wurde benachrichtigt.",
    panicDuplicate: "Ihr Panikalarm ist bereits offen. Aurora wurde benachrichtigt.",
    panicFailed: "Der Sicherheitsalarm konnte nicht gesendet werden. Rufen Sie jetzt die Polizei oder Aurora an.",
    callPolice: "Polizei 112 anrufen",
    callAurora: "Aurora anrufen",
    call: "Aurora anrufen",
    support: "Sicherheit",
    tellUs: "Was ist passiert?",
    send: "Meldung senden",
    waiting: "Fahrer und Fahrzeug erscheinen nach der Bestätigung.",
    mapTitle: "Live-Tracking erscheint hier",
    mapText: "Der Fahrerstandort wird nach der Zuweisung angezeigt.",
    received: "Anfrage erhalten",
    confirmed: "Fahrt bestätigt",
    assigned: "Fahrer zugewiesen",
    arriving: "Fahrer ist unterwegs",
    arrived: "Fahrer ist angekommen",
    moving: "Fahrt läuft",
    completed: "Fahrt abgeschlossen",
    cancelled: "Fahrt storniert",
    updated: "Aktualisiert",
    connecting: "Verbindung wird hergestellt",
    live: "Live",
    offline: "Offline",
    invalid: "Ungültiger Tracking-Link",
    unavailable: "Das Tracking ist vorübergehend nicht verfügbar",
    reportSent: "Meldung gesendet. Aurora wird Sie kontaktieren.",
    reportFailed: "Die Meldung konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    privateRide: "Privatfahrt",
    finding: "Ihre Fahrt wird gesucht...",
    loading: "Wird geladen",
    close: "Schließen",
    title: "Aurora-Fahrt verfolgen",
  },
  fr: {
    route: "Itinéraire",
    pickup: "Départ",
    destination: "Destination",
    yourDriver: "Votre chauffeur",
    progress: "Progression",
    manage: "Gérer la réservation",
    manageRide: "Gérez votre trajet",
    manageTitle: "Envoyer une demande de réservation",
    manageType: "Type de demande",
    change: "Modifier un trajet",
    cancel: "Annuler un trajet",
    sendRequest: "Envoyer la demande",
    requestSent: "Votre demande a été envoyée à Aurora.",
    requestFailed: "La demande n'a pas pu être envoyée. Réessayez.",
    report: "Signaler un problème",
    panic: "Alerte",
    panicSupport: "Assistance sécurité urgente",
    panicTitle: "Votre position est envoyée à Aurora.",
    panicText: "En cas de danger immédiat, appelez les services d'urgence. Aurora reçoit une alerte critique avec votre position.",
    panicSending: "Envoi de votre alerte et de votre position...",
    panicSent: "Alerte envoyée. Aurora a été prévenue.",
    panicDuplicate: "Votre alerte est déjà ouverte. Aurora a été prévenue.",
    panicFailed: "Votre alerte n'a pas pu être envoyée. Appelez la police ou Aurora immédiatement.",
    callPolice: "Appeler la police 112",
    callAurora: "Appeler Aurora",
    call: "Appeler Aurora",
    support: "Assistance sécurité",
    tellUs: "Que s'est-il passé ?",
    send: "Envoyer",
    waiting: "Le chauffeur et le véhicule apparaîtront après confirmation.",
    mapTitle: "Le suivi en direct apparaîtra ici",
    mapText: "La position du chauffeur s'affiche après l'affectation.",
    received: "Demande reçue",
    confirmed: "Trajet confirmé",
    assigned: "Chauffeur affecté",
    arriving: "Le chauffeur arrive",
    arrived: "Le chauffeur est arrivé",
    moving: "Trajet en cours",
    completed: "Trajet terminé",
    cancelled: "Trajet annulé",
    updated: "Actualisé",
    connecting: "Connexion",
    live: "En direct",
    offline: "Hors ligne",
    invalid: "Lien de suivi non valide",
    unavailable: "Le suivi est temporairement indisponible",
    reportSent: "Signalement envoyé. Aurora vous contactera.",
    reportFailed: "Le signalement n'a pas pu être envoyé. Veuillez réessayer.",
    privateRide: "Trajet privé",
    finding: "Recherche de votre trajet...",
    loading: "Chargement",
    close: "Fermer",
    title: "Suivre votre trajet Aurora",
  },
};
let lang = copy[requestedLanguage] ? requestedLanguage : "en",
  map,
  marker,
  supportPhone = "+385000000000",
  panicInFlight = false;
const $ = (s) => document.querySelector(s);
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>'"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        c
      ],
  );
function tr(key) {
  return copy[lang]?.[key] || copy.en[key] || key;
}
function setSupportPhone(value) {
  const normalized = String(value || "").replace(/[^+\d]/g, "");
  if (normalized) supportPhone = normalized;
  [$("#callAurora"), $("#panicCallAurora")].forEach((element) => {
    if (element) element.href = `tel:${supportPhone}`;
  });
}
function translate() {
  document.documentElement.lang = lang;
  document.title = tr("title");
  document
    .querySelectorAll("[data-i18n]")
    .forEach((el) => (el.textContent = tr(el.dataset.i18n)));
  document
    .querySelectorAll("[data-i18n-aria]")
    .forEach((el) => el.setAttribute("aria-label", tr(el.dataset.i18nAria)));
  $("#mapTitle").textContent = tr("mapTitle");
  $("#mapText").textContent = tr("mapText");
  setManageType(manageSelect?.dataset.manageSelectValue || "change");
}
const labels = {
  requested: "received",
  confirmed: "confirmed",
  assigned: "assigned",
  en_route: "arriving",
  arrived: "arrived",
  in_progress: "moving",
  completed: "completed",
  cancelled: "cancelled",
  no_show: "cancelled",
  emergency: "moving",
};
const ranks = {
  requested: 0,
  confirmed: 1,
  assigned: 2,
  en_route: 3,
  arrived: 3,
  in_progress: 4,
  emergency: 4,
  completed: 5,
  cancelled: 0,
  no_show: 0,
};
function updateMap(location) {
  if (!location) return;
  $("#mapEmpty").hidden = true;
  if (!map) {
    map = new maplibregl.Map({
      container: "map",
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [location.longitude, location.latitude],
      zoom: 14,
      attributionControl: true,
    });
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );
  }
  if (!marker)
    marker = new maplibregl.Marker({ color: "#6f2dbd" })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);
  else marker.setLngLat([location.longitude, location.latitude]);
  map.easeTo({
    center: [location.longitude, location.latitude],
    duration: 900,
  });
}
function render(data) {
  const r = data.ride;
  if (copy[r.language]) lang = r.language;
  setSupportPhone(data.supportPhone);
  translate();
  $("#reference").textContent = r.reference;
  $("#headline").textContent = tr(labels[r.status] || "received");
  $("#schedule").textContent = new Intl.DateTimeFormat(lang, {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Zagreb",
  }).format(new Date(r.scheduledAt));
  $("#status").textContent = tr(labels[r.status] || "received");
  $("#pickup").textContent = r.pickupAddress;
  $("#destination").textContent = r.destinationAddress;
  $("#progressTitle").textContent = tr(labels[r.status] || "received");
  $("#connection").textContent = tr("live");
  $("#lastUpdate").textContent = r.lastLocation
    ? `${tr("updated")} ${new Intl.DateTimeFormat(lang, { timeStyle: "short" }).format(new Date(r.lastLocation.updatedAt))}`
    : "";
  $("#driverDetails").innerHTML = r.driver
    ? `<div class="driver-card"><div class="driver-avatar">${esc(r.driver.name.charAt(0))}</div><div><strong>${esc(r.driver.name)}</strong><span>${esc([r.vehicle?.color, r.vehicle?.make, r.vehicle?.model].filter(Boolean).join(" "))}</span>${r.vehicle ? `<span class="vehicle-plate">${esc(r.vehicle.plate)}</span>` : ""}</div></div>`
    : `<div class="driver-empty">${tr("waiting")}</div>`;
  const steps = [
    "confirmed",
    "assigned",
    "en_route",
    "in_progress",
    "completed",
  ];
  $("#progressSteps").innerHTML = steps
    .map(
      (s, i) =>
        `<li class="${ranks[r.status] >= i + 1 ? "done" : ""}">${tr(labels[s])}</li>`,
    )
    .join("");
  updateMap(r.lastLocation);
}
async function refresh() {
  if (!token) {
    $("#headline").textContent = tr("invalid");
    $("#connection").textContent = tr("offline");
    return;
  }
  try {
    const response = await fetch(
      `/api/v1/tracking?token=${encodeURIComponent(token)}`,
      { cache: "no-store" },
    );
    const data = await response.json();
    if (!response.ok) throw new Error("Tracking unavailable");
    render(data);
  } catch (_) {
    $("#headline").textContent = tr("unavailable");
    $("#connection").textContent = tr("offline");
  }
}
$("#reportButton").onclick = () => $("#reportDialog").showModal();
$("#closeReport").onclick = () => $("#reportDialog").close();
$("#reportForm").onsubmit = async (event) => {
  event.preventDefault();
  const response = await fetch("/api/v1/tracking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      action: "report_issue",
      message: $("#reportMessage").value,
    }),
  });
  await response.json().catch(() => ({}));
  $("#reportResult").textContent = response.ok
    ? tr("reportSent")
    : tr("reportFailed");
};
const manageSelect = $("[data-manage-select]");
const manageSelectTrigger = $("[data-manage-select-trigger]");
const manageSelectMenu = $("[data-manage-select-menu]");
function closeManageSelect() {
  manageSelect?.classList.remove("open");
  manageSelectMenu?.setAttribute("hidden", "");
  manageSelectTrigger?.setAttribute("aria-expanded", "false");
}
function setManageType(value) {
  const label = $("[data-manage-select-label]");
  const options = document.querySelectorAll("[data-manage-select-option]");
  if (!manageSelect || !label) return;
  const selectedValue = value === "cancel" ? "cancel" : "change";
  manageSelect.dataset.manageSelectValue = selectedValue;
  let selected = null;
  options.forEach((option) => {
    const active = option.dataset.manageSelectOption === selectedValue;
    option.setAttribute("aria-selected", String(active));
    if (active) selected = option;
  });
  label.textContent = selected?.textContent || tr(selectedValue);
}
manageSelectTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = manageSelectMenu?.hasAttribute("hidden") ?? true;
  closeManageSelect();
  if (open) {
    manageSelect?.classList.add("open");
    manageSelectMenu?.removeAttribute("hidden");
    manageSelectTrigger.setAttribute("aria-expanded", "true");
  }
});
document.querySelectorAll("[data-manage-select-option]").forEach((option) => {
  option.addEventListener("click", () => {
    setManageType(option.dataset.manageSelectOption || "change");
    closeManageSelect();
  });
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Node && !manageSelect?.contains(event.target)) closeManageSelect();
});
manageSelectTrigger?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeManageSelect();
  if (["ArrowDown", "ArrowUp"].includes(event.key) && manageSelectMenu?.hasAttribute("hidden")) {
    event.preventDefault();
    manageSelectTrigger.click();
  }
});
$("#manageButton").onclick = () => {
  setManageType(manageSelect?.dataset.manageSelectValue || "change");
  $("#manageDialog").showModal();
};
$("#closeManage").onclick = () => $("#manageDialog").close();
$("#manageForm").onsubmit = async (event) => {
  event.preventDefault();
  const type = manageSelect?.dataset.manageSelectValue || "change";
  const response = await fetch("/api/v1/tracking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      action: type === "cancel" ? "request_cancel" : "request_change",
      message: $("#manageMessage").value,
    }),
  });
  await response.json().catch(() => ({}));
  $("#manageResult").textContent = response.ok
    ? tr("requestSent")
    : tr("requestFailed");
};
function riderLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve({});
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracyM: position.coords.accuracy,
      }),
      () => resolve({}),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 },
    );
  });
}
async function raisePanic() {
  if (panicInFlight) return;
  panicInFlight = true;
  const button = $("#panicButton");
  const result = $("#panicResult");
  button.disabled = true;
  $("#panicDialog").showModal();
  result.textContent = tr("panicSending");
  try {
    const location = await riderLocation();
    const response = await fetch("/api/v1/tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action: "panic", ...location }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.panic) throw new Error("Panic alert failed");
    setSupportPhone(data.supportPhone);
    result.textContent = data.duplicate ? tr("panicDuplicate") : tr("panicSent");
  } catch (_) {
    result.textContent = tr("panicFailed");
  } finally {
    button.disabled = false;
    panicInFlight = false;
  }
}
$("#panicButton").onclick = raisePanic;
$("#closePanic").onclick = () => $("#panicDialog").close();
setSupportPhone(supportPhone);
translate();
refresh();
setInterval(refresh, 10000);
