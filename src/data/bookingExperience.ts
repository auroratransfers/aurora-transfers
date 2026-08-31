import type { Lang } from "./site";

export type ServiceKind = "private-transfer" | "airport-arrival" | "hourly-chauffeur" | "group-transfer" | "airport-concierge" | "aurora-now";
export type VehicleClass = "comfort" | "business" | "van" | "executive";

type ServiceOption = { value: ServiceKind; title: string; text: string };
type VehicleOption = { value: VehicleClass; title: string; text: string; passengers: string; luggage: string; from: string };
type AddonOption = { value: string; title: string; text: string; price: string; included?: boolean };

type BookingExperience = {
  serviceLabel: string;
  serviceHint: string;
  serviceScrollPrevious: string;
  serviceScrollNext: string;
  vehicleLabel: string;
  vehicleHint: string;
  addonLabel: string;
  addonHint: string;
  hoursLabel: string;
  hoursHint: string;
  hoursSuffix: string;
  estimateLabel: string;
  estimateEmpty: string;
  estimateAction: string;
  estimateLoading: string;
  estimateFrom: string;
  estimateReady: string;
  estimateNote: string;
  estimateRoute: string;
  estimateTime: string;
  estimateIncludes: string;
  flightLabel: string;
  flightHint: string;
  flightCheck: string;
  flightChecking: string;
  flightLive: string;
  flightDemo: string;
  flightUnavailable: string;
  paymentLabel: string;
  paymentText: string;
  paymentAction: string;
  manageLabel: string;
  manageText: string;
  manageAction: string;
  services: readonly ServiceOption[];
  vehicles: readonly VehicleOption[];
  addons: readonly AddonOption[];
};

const bookingExperience = {
  hr: {
    serviceLabel: "Vrsta usluge",
    serviceHint: "Odaberite način na koji želite putovati.",
    serviceScrollPrevious: "Prikaži prethodne usluge",
    serviceScrollNext: "Prikaži sljedeće usluge",
    vehicleLabel: "Odaberite klasu vozila",
    vehicleHint: "Ovo su testne klase i početne cijene. Potvrđujemo stvarno vozilo prije vožnje.",
    addonLabel: "Detalji za mirniji dolazak",
    addonHint: "Dodajte ono što je važno za vašu grupu.",
    hoursLabel: "Trajanje usluge",
    hoursHint: "Za vožnje po satu odaberite koliko vremena želite rezervirati.",
    hoursSuffix: "sata",
    estimateLabel: "Procijenjena cijena",
    estimateEmpty: "Unesite polazište i odredište za testnu procjenu.",
    estimateAction: "Izračunaj procjenu",
    estimateLoading: "Računamo procjenu...",
    estimateFrom: "od",
    estimateReady: "Testna procjena je spremna",
    estimateNote: "Ovo je testni prikaz cijene. Stvarnu dostupnost, rutu i konačnu cijenu Aurora potvrđuje prije bilo kakve naplate.",
    estimateRoute: "Procijenjena ruta",
    estimateTime: "Procijenjeno trajanje",
    estimateIncludes: "Uključeni odabrani dodaci",
    flightLabel: "Praćenje leta",
    flightHint: "Dodajte broj leta i provjerit ćemo najnoviji status dolaska.",
    flightCheck: "Provjeri let",
    flightChecking: "Provjeravamo let...",
    flightLive: "Status leta uživo",
    flightDemo: "Testni status leta",
    flightUnavailable: "Trenutačno ne možemo dohvatiti status leta. Aurora će ga pratiti nakon potvrde rezervacije.",
    paymentLabel: "Plaćanje nakon potvrde",
    paymentText: "Online polog i plaćanje karticom prikazani su kao pilot tok. Ne naplaćujemo karticu dok ih ne aktiviramo s produkcijskim pružateljem plaćanja.",
    paymentAction: "Plaćanje uskoro",
    manageLabel: "Upravljajte svojom vožnjom",
    manageText: "Nakon slanja dobit ćete privatnu poveznicu za praćenje vozača, kontakt s operativnim timom i zahtjev za promjenu rezervacije.",
    manageAction: "Kako funkcionira",
    services: [
      { value: "private-transfer", title: "Privatni transfer", text: "Unaprijed rezervirana vožnja od vrata do vrata, za svaku rutu i termin." },
      { value: "airport-arrival", title: "Dolazak iz zračne luke", text: "Doček nakon slijetanja, praćenje leta i miran dolazak do smještaja." },
      { value: "hourly-chauffeur", title: "Vozač po satu", text: "Vozač i vozilo ostaju uz vas za plan koji se može mijenjati." },
      { value: "group-transfer", title: "Transfer za grupu", text: "Usklađena vožnja za obitelji, događaje, krstarenja i više prtljage." },
      { value: "airport-concierge", title: "Airport concierge", text: "Koordiniran dolazak, doček i dodatna pomoć preko odabranih partnera." },
      { value: "aurora-now", title: "Aurora Now", text: "Brza gradska vožnja s vozilom koje je dostupno u blizini." }
    ],
    vehicles: [
      { value: "comfort", title: "Comfort", text: "Za parove i laganu prtljagu.", passengers: "do 3 putnika", luggage: "2 kovčega", from: "35 EUR" },
      { value: "business", title: "Business", text: "Diskretan, udoban izbor za poslovne i privatne vožnje.", passengers: "do 3 putnika", luggage: "3 kovčega", from: "52 EUR" },
      { value: "van", title: "Premium van", text: "Više prostora za obitelj, prijatelje i prtljagu.", passengers: "do 7 putnika", luggage: "7 kovčega", from: "78 EUR" },
      { value: "executive", title: "Executive", text: "Povišen komfor za posebne dolaske i duže rute.", passengers: "do 3 putnika", luggage: "3 kovčega", from: "115 EUR" }
    ],
    addons: [
      { value: "flight-monitoring", title: "Praćenje leta", text: "Pratimo izmjene dolaska nakon potvrde.", price: "Uključeno", included: true },
      { value: "meet-greet", title: "Doček s natpisom", text: "Vozač vas čeka na dogovorenom mjestu.", price: "+15 EUR" },
      { value: "child-seat", title: "Dječja sjedalica", text: "Navedite dob djeteta u napomeni.", price: "+8 EUR" },
      { value: "extra-luggage", title: "Dodatna prtljaga", text: "Za sportske torbe, kolica ili veće kofere.", price: "+12 EUR" },
      { value: "accessible", title: "Pristupačno putovanje", text: "Javite nam potrebnu pomoć unaprijed.", price: "Na upit" },
      { value: "pet-friendly", title: "Putovanje s ljubimcem", text: "Provjerit ćemo odgovarajuće vozilo.", price: "+10 EUR" }
    ]
  },
  en: {
    serviceLabel: "Service type",
    serviceHint: "Choose the way you would like to travel.",
    serviceScrollPrevious: "Show previous services",
    serviceScrollNext: "Show more services",
    vehicleLabel: "Choose a vehicle class",
    vehicleHint: "These are test classes and starting prices. We confirm the actual vehicle before your ride.",
    addonLabel: "Details for an easier arrival",
    addonHint: "Add what matters for your party.",
    hoursLabel: "Service duration",
    hoursHint: "For by-the-hour rides, choose how long you would like to reserve your driver and vehicle.",
    hoursSuffix: "hours",
    estimateLabel: "Estimated price",
    estimateEmpty: "Enter a pickup point and destination to see a test estimate.",
    estimateAction: "Get an estimate",
    estimateLoading: "Calculating estimate...",
    estimateFrom: "from",
    estimateReady: "Test estimate ready",
    estimateNote: "This is a test price preview. Aurora confirms real availability, route and final price before any payment is taken.",
    estimateRoute: "Estimated route",
    estimateTime: "Estimated duration",
    estimateIncludes: "Selected extras included",
    flightLabel: "Flight tracking",
    flightHint: "Add your flight number and we will check the latest arrival status.",
    flightCheck: "Check flight",
    flightChecking: "Checking flight...",
    flightLive: "Live flight status",
    flightDemo: "Test flight status",
    flightUnavailable: "We cannot retrieve the flight status right now. Aurora will monitor it once your booking is confirmed.",
    paymentLabel: "Payment after confirmation",
    paymentText: "Online deposits and card payment are shown as a pilot flow. We will not charge a card until a production payment provider is activated.",
    paymentAction: "Payments coming soon",
    manageLabel: "Manage your ride",
    manageText: "After you send the request, you receive a private link for driver tracking, operational support and booking-change requests.",
    manageAction: "How it works",
    services: [
      { value: "private-transfer", title: "Private transfer", text: "Pre-booked, door-to-door travel for any route and departure time." },
      { value: "airport-arrival", title: "Airport arrival", text: "Meet your driver after landing, with flight monitoring and a calm arrival." },
      { value: "hourly-chauffeur", title: "By the hour", text: "Keep a private vehicle and driver close for plans that can change." },
      { value: "group-transfer", title: "Group transfer", text: "Coordinated rides for families, events, cruise guests and larger luggage." },
      { value: "airport-concierge", title: "Airport concierge", text: "Arrival coordination, meet and greet and tailored help through selected partners." },
      { value: "aurora-now", title: "Aurora Now", text: "Quick city travel with a nearby available vehicle when time matters." }
    ],
    vehicles: [
      { value: "comfort", title: "Comfort", text: "For couples and lighter luggage.", passengers: "up to 3 passengers", luggage: "2 suitcases", from: "35 EUR" },
      { value: "business", title: "Business", text: "A discreet, comfortable choice for work and leisure.", passengers: "up to 3 passengers", luggage: "3 suitcases", from: "52 EUR" },
      { value: "van", title: "Premium van", text: "More room for families, friends and luggage.", passengers: "up to 7 passengers", luggage: "7 suitcases", from: "78 EUR" },
      { value: "executive", title: "Executive", text: "Elevated comfort for important arrivals and longer routes.", passengers: "up to 3 passengers", luggage: "3 suitcases", from: "115 EUR" }
    ],
    addons: [
      { value: "flight-monitoring", title: "Flight monitoring", text: "We monitor arrival changes after confirmation.", price: "Included", included: true },
      { value: "meet-greet", title: "Meet and greet sign", text: "Your driver waits at the agreed point.", price: "+15 EUR" },
      { value: "child-seat", title: "Child seat", text: "Add the child's age in your note.", price: "+8 EUR" },
      { value: "extra-luggage", title: "Extra luggage", text: "For sports gear, strollers or larger cases.", price: "+12 EUR" },
      { value: "accessible", title: "Accessible travel", text: "Tell us about any required assistance in advance.", price: "On request" },
      { value: "pet-friendly", title: "Pet-friendly travel", text: "We will confirm a suitable vehicle.", price: "+10 EUR" }
    ]
  },
  de: {
    serviceLabel: "Art der Fahrt",
    serviceHint: "Wählen Sie, wie Sie reisen möchten.",
    serviceScrollPrevious: "Vorherige Services anzeigen",
    serviceScrollNext: "Weitere Services anzeigen",
    vehicleLabel: "Fahrzeugklasse wählen",
    vehicleHint: "Dies sind Testklassen und Einstiegspreise. Das konkrete Fahrzeug bestätigen wir vor der Fahrt.",
    addonLabel: "Details für eine entspannte Ankunft",
    addonHint: "Ergänzen Sie, was für Ihre Gruppe wichtig ist.",
    hoursLabel: "Dauer der Leistung",
    hoursHint: "Für Stundenfahrten wählen Sie, wie lange Fahrer und Fahrzeug für Sie reserviert werden sollen.",
    hoursSuffix: "Stunden",
    estimateLabel: "Preisprognose",
    estimateEmpty: "Geben Sie Abholort und Ziel ein, um eine Testprognose zu sehen.",
    estimateAction: "Prognose berechnen",
    estimateLoading: "Prognose wird berechnet...",
    estimateFrom: "ab",
    estimateReady: "Testprognose bereit",
    estimateNote: "Dies ist eine Testansicht des Preises. Aurora bestätigt tatsächliche Verfügbarkeit, Route und Endpreis vor jeder Zahlung.",
    estimateRoute: "Geschätzte Route",
    estimateTime: "Geschätzte Dauer",
    estimateIncludes: "Gewählte Extras enthalten",
    flightLabel: "Flug verfolgen",
    flightHint: "Fügen Sie Ihre Flugnummer hinzu, damit wir den aktuellen Ankunftsstatus prüfen können.",
    flightCheck: "Flug prüfen",
    flightChecking: "Flug wird geprüft...",
    flightLive: "Live-Flugstatus",
    flightDemo: "Test-Flugstatus",
    flightUnavailable: "Der Flugstatus kann derzeit nicht abgerufen werden. Aurora überwacht ihn nach Bestätigung Ihrer Buchung.",
    paymentLabel: "Zahlung nach Bestätigung",
    paymentText: "Online-Anzahlung und Kartenzahlung werden als Pilotablauf gezeigt. Es wird keine Karte belastet, bevor ein Produktions-Zahlungsanbieter aktiviert ist.",
    paymentAction: "Zahlungen folgen",
    manageLabel: "Ihre Fahrt verwalten",
    manageText: "Nach dem Absenden erhalten Sie einen privaten Link für Fahrer-Tracking, operative Unterstützung und Änderungswünsche.",
    manageAction: "So funktioniert es",
    services: [
      { value: "private-transfer", title: "Privattransfer", text: "Vorab gebuchte Tür-zu-Tür-Fahrt für jede Route und jede Abfahrtszeit." },
      { value: "airport-arrival", title: "Ankunft am Flughafen", text: "Treffen Sie Ihren Fahrer nach der Landung, inklusive Flugüberwachung." },
      { value: "hourly-chauffeur", title: "Fahrer stundenweise", text: "Fahrer und Fahrzeug bleiben für einen flexibel planbaren Tag bei Ihnen." },
      { value: "group-transfer", title: "Gruppentransfer", text: "Koordinierte Fahrten für Familien, Events, Kreuzfahrtgäste und großes Gepäck." },
      { value: "airport-concierge", title: "Airport Concierge", text: "Ankunftskoordination, Empfang und maßgeschneiderte Hilfe über ausgewählte Partner." },
      { value: "aurora-now", title: "Aurora Now", text: "Schnelle Stadtfahrt mit einem verfügbaren Fahrzeug in Ihrer Nähe." }
    ],
    vehicles: [
      { value: "comfort", title: "Comfort", text: "Für Paare und leichteres Gepäck.", passengers: "bis 3 Fahrgäste", luggage: "2 Koffer", from: "35 EUR" },
      { value: "business", title: "Business", text: "Diskreter Komfort für Arbeit und Freizeit.", passengers: "bis 3 Fahrgäste", luggage: "3 Koffer", from: "52 EUR" },
      { value: "van", title: "Premium-Van", text: "Mehr Platz für Familie, Freunde und Gepäck.", passengers: "bis 7 Fahrgäste", luggage: "7 Koffer", from: "78 EUR" },
      { value: "executive", title: "Executive", text: "Erhöhter Komfort für besondere Ankünfte und längere Routen.", passengers: "bis 3 Fahrgäste", luggage: "3 Koffer", from: "115 EUR" }
    ],
    addons: [
      { value: "flight-monitoring", title: "Flugüberwachung", text: "Wir beobachten Ankunftsänderungen nach Bestätigung.", price: "Inklusive", included: true },
      { value: "meet-greet", title: "Empfangsschild", text: "Ihr Fahrer wartet am vereinbarten Treffpunkt.", price: "+15 EUR" },
      { value: "child-seat", title: "Kindersitz", text: "Bitte geben Sie das Alter des Kindes in der Nachricht an.", price: "+8 EUR" },
      { value: "extra-luggage", title: "Zusätzliches Gepäck", text: "Für Sportausrüstung, Kinderwagen oder größere Koffer.", price: "+12 EUR" },
      { value: "accessible", title: "Barrierefreies Reisen", text: "Teilen Sie uns benötigte Hilfe bitte vorher mit.", price: "Auf Anfrage" },
      { value: "pet-friendly", title: "Reise mit Haustier", text: "Wir bestätigen ein passendes Fahrzeug.", price: "+10 EUR" }
    ]
  },
  fr: {
    serviceLabel: "Type de service",
    serviceHint: "Choisissez la façon dont vous souhaitez voyager.",
    serviceScrollPrevious: "Afficher les services précédents",
    serviceScrollNext: "Afficher plus de services",
    vehicleLabel: "Choisissez une catégorie de véhicule",
    vehicleHint: "Il s'agit de catégories et de prix de départ de démonstration. Nous confirmons le véhicule réel avant le trajet.",
    addonLabel: "Les détails d'une arrivée plus simple",
    addonHint: "Ajoutez ce qui compte pour votre groupe.",
    hoursLabel: "Durée du service",
    hoursHint: "Pour un chauffeur à l'heure, choisissez la durée de réservation du véhicule et du chauffeur.",
    hoursSuffix: "heures",
    estimateLabel: "Estimation du prix",
    estimateEmpty: "Saisissez un lieu de départ et une destination pour voir une estimation de démonstration.",
    estimateAction: "Obtenir une estimation",
    estimateLoading: "Calcul de l'estimation...",
    estimateFrom: "à partir de",
    estimateReady: "Estimation de démonstration prête",
    estimateNote: "Il s'agit d'un aperçu tarifaire de démonstration. Aurora confirme la disponibilité réelle, l'itinéraire et le prix final avant tout paiement.",
    estimateRoute: "Itinéraire estimé",
    estimateTime: "Durée estimée",
    estimateIncludes: "Options sélectionnées incluses",
    flightLabel: "Suivi du vol",
    flightHint: "Ajoutez votre numéro de vol et nous vérifierons le dernier statut d'arrivée.",
    flightCheck: "Vérifier le vol",
    flightChecking: "Vérification du vol...",
    flightLive: "Statut du vol en direct",
    flightDemo: "Statut de vol de démonstration",
    flightUnavailable: "Le statut du vol est indisponible pour le moment. Aurora le suivra une fois votre réservation confirmée.",
    paymentLabel: "Paiement après confirmation",
    paymentText: "L'acompte en ligne et le paiement par carte sont présentés comme un flux pilote. Aucune carte ne sera débitée avant l'activation d'un prestataire de paiement en production.",
    paymentAction: "Paiements bientôt disponibles",
    manageLabel: "Gérez votre trajet",
    manageText: "Après l'envoi, vous recevrez un lien privé pour suivre le chauffeur, contacter l'équipe opérationnelle et demander une modification.",
    manageAction: "Comment cela fonctionne",
    services: [
      { value: "private-transfer", title: "Transfert privé", text: "Trajet porte à porte réservé à l'avance, pour tout itinéraire et tout horaire." },
      { value: "airport-arrival", title: "Arrivée à l'aéroport", text: "Accueil après l'atterrissage, suivi du vol et arrivée sereine à votre hébergement." },
      { value: "hourly-chauffeur", title: "Chauffeur à l'heure", text: "Gardez un véhicule privé et un chauffeur disponibles pour un programme flexible." },
      { value: "group-transfer", title: "Transfert de groupe", text: "Trajets coordonnés pour familles, événements, croisiéristes et bagages volumineux." },
      { value: "airport-concierge", title: "Concierge aéroport", text: "Coordination de l'arrivée, accueil et assistance sur mesure via des partenaires sélectionnés." },
      { value: "aurora-now", title: "Aurora Now", text: "Trajet urbain rapide avec un véhicule disponible près de vous." }
    ],
    vehicles: [
      { value: "comfort", title: "Comfort", text: "Pour les couples et les bagages légers.", passengers: "jusqu'à 3 passagers", luggage: "2 valises", from: "35 EUR" },
      { value: "business", title: "Business", text: "Un choix discret et confortable pour le travail comme les loisirs.", passengers: "jusqu'à 3 passagers", luggage: "3 valises", from: "52 EUR" },
      { value: "van", title: "Van premium", text: "Plus d'espace pour les familles, les amis et les bagages.", passengers: "jusqu'à 7 passagers", luggage: "7 valises", from: "78 EUR" },
      { value: "executive", title: "Executive", text: "Un confort supérieur pour les arrivées importantes et les longues routes.", passengers: "jusqu'à 3 passagers", luggage: "3 valises", from: "115 EUR" }
    ],
    addons: [
      { value: "flight-monitoring", title: "Suivi du vol", text: "Nous suivons les changements d'arrivée après confirmation.", price: "Inclus", included: true },
      { value: "meet-greet", title: "Pancarte d'accueil", text: "Votre chauffeur vous attend au point convenu.", price: "+15 EUR" },
      { value: "child-seat", title: "Siège enfant", text: "Indiquez l'âge de l'enfant dans votre message.", price: "+8 EUR" },
      { value: "extra-luggage", title: "Bagages supplémentaires", text: "Pour du matériel de sport, une poussette ou de grandes valises.", price: "+12 EUR" },
      { value: "accessible", title: "Voyage accessible", text: "Indiquez-nous à l'avance toute assistance nécessaire.", price: "Sur demande" },
      { value: "pet-friendly", title: "Voyage avec animal", text: "Nous confirmerons un véhicule adapté.", price: "+10 EUR" }
    ]
  }
} as const satisfies Record<Lang, BookingExperience>;

export function getBookingExperience(lang: Lang): BookingExperience {
  return bookingExperience[lang] || bookingExperience.en;
}
