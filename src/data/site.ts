export const languages = ["hr", "en", "de", "fr"] as const;
export type Lang = (typeof languages)[number];

export const pageSlugs = ["services", "fleet", "pricing", "about", "contact", "faq", "booking"] as const;
export type PageSlug = (typeof pageSlugs)[number];

export const labels = {
  hr: {
    nav: { home: "Naslovnica", services: "Usluge", fleet: "Vozila", pricing: "Cijene", about: "O nama", contact: "Kontakt", faq: "FAQ", booking: "Rezerviraj" },
    hero: { badge: "Vaše putovanje počinje mirno", title: "Feniks Dubrovnik Transfers", text: "Siguran, udoban i pouzdan prijevoz od zračne luke, hotela ili marine do Dubrovnika i najljepših destinacija u regiji.", primary: "Rezervirajte transfer", secondary: "Istražite usluge" },
    booking: { eyebrow: "Brza rezervacija", title: "Gdje vas vozimo?", text: "Odaberite rutu i pošaljite zahtjev. Potvrdu dobivate u najkraćem roku.", pickup: "Polazište", dropoff: "Odredište", date: "Datum", passengers: "Putnici", contact: "Telefon ili email", submit: "Provjeri transfer", placeholder: "Odaberite lokaciju", result: "Procijenjena cijena", note: "Konačnu cijenu potvrđujemo prije vožnje." },
    home: { servicesEyebrow: "Što nudimo", servicesTitle: "Od slijetanja do vašeg odredišta", servicesText: "Lokalni vozači, moderna vozila i podrška 24/7 za putovanja bez nepotrebnog čekanja.", whyEyebrow: "Zašto Feniks", whyTitle: "Jednostavno od prve poruke do dolaska", destinationsEyebrow: "Popularne rute", destinationsTitle: "Dubrovnik je tek početak", aboutEyebrow: "Lokalna priča", aboutTitle: "Vaš pouzdani partner u Dubrovniku", aboutText: "Feniks Dubrovnik Transfers specijaliziran je za privatne transfere i prijevoz putnika na području Dubrovnika i cijele regije. Profesionalni vozači, točnost i sigurnost temelj su svakog putovanja.", blogEyebrow: "Lokalni vodiči", blogTitle: "Putujte pametnije", ctaTitle: "Spremni za Dubrovnik?", ctaText: "Putujte sigurno. Putujte udobno. Putujte s Feniksom." },
    common: { learn: "Saznajte više", read: "Čitaj vodič", included: "Uvijek uključeno", footerText: "Privatni transferi iz Dubrovnika, dostupni 24/7.", pages: "Stranice", info: "Informacije", copyright: "Sva prava pridržana." }
  },
  en: {
    nav: { home: "Home", services: "Services", fleet: "Fleet", pricing: "Pricing", about: "About", contact: "Contact", faq: "FAQ", booking: "Book now" },
    hero: { badge: "Your journey starts calmly", title: "Feniks Dubrovnik Transfers", text: "Safe, comfortable and reliable transport from the airport, hotel or marina to Dubrovnik and the region's most beautiful destinations.", primary: "Book your transfer", secondary: "Explore services" },
    booking: { eyebrow: "Quick booking", title: "Where can we take you?", text: "Choose your route and send a request. We will confirm it shortly.", pickup: "Pickup", dropoff: "Destination", date: "Date", passengers: "Passengers", contact: "Phone or email", submit: "Check transfer", placeholder: "Choose location", result: "Estimated price", note: "We confirm the final price before your ride." },
    home: { servicesEyebrow: "What we offer", servicesTitle: "From landing to your destination", servicesText: "Local drivers, modern vehicles and 24/7 support for travel without unnecessary waiting.", whyEyebrow: "Why Feniks", whyTitle: "Simple from the first message to arrival", destinationsEyebrow: "Popular routes", destinationsTitle: "Dubrovnik is only the beginning", aboutEyebrow: "A local story", aboutTitle: "Your trusted partner in Dubrovnik", aboutText: "Feniks Dubrovnik Transfers specialises in private transfers throughout Dubrovnik and the region. Professional drivers, punctuality and safety shape every journey.", blogEyebrow: "Local guides", blogTitle: "Travel smarter", ctaTitle: "Ready for Dubrovnik?", ctaText: "Travel safely. Travel comfortably. Travel with Feniks." },
    common: { learn: "Learn more", read: "Read guide", included: "Always included", footerText: "Private transfers from Dubrovnik, available 24/7.", pages: "Pages", info: "Information", copyright: "All rights reserved." }
  },
  de: {
    nav: { home: "Startseite", services: "Leistungen", fleet: "Fahrzeuge", pricing: "Preise", about: "Über uns", contact: "Kontakt", faq: "FAQ", booking: "Buchen" },
    hero: { badge: "Ihre Reise beginnt entspannt", title: "Feniks Dubrovnik Transfers", text: "Sicherer, komfortabler und zuverlässiger Transport vom Flughafen, Hotel oder Hafen nach Dubrovnik und zu den schönsten Zielen der Region.", primary: "Transfer buchen", secondary: "Leistungen entdecken" },
    booking: { eyebrow: "Schnellbuchung", title: "Wohin dürfen wir Sie fahren?", text: "Wählen Sie Ihre Route und senden Sie eine Anfrage. Wir bestätigen sie in Kürze.", pickup: "Abholung", dropoff: "Ziel", date: "Datum", passengers: "Fahrgäste", contact: "Telefon oder E-Mail", submit: "Transfer prüfen", placeholder: "Ort auswählen", result: "Geschätzter Preis", note: "Den endgültigen Preis bestätigen wir vor der Fahrt." },
    home: { servicesEyebrow: "Unser Angebot", servicesTitle: "Von der Landung bis zum Ziel", servicesText: "Lokale Fahrer, moderne Fahrzeuge und 24/7-Support für Reisen ohne unnötige Wartezeit.", whyEyebrow: "Warum Feniks", whyTitle: "Einfach von der ersten Nachricht bis zur Ankunft", destinationsEyebrow: "Beliebte Routen", destinationsTitle: "Dubrovnik ist erst der Anfang", aboutEyebrow: "Eine lokale Geschichte", aboutTitle: "Ihr zuverlässiger Partner in Dubrovnik", aboutText: "Feniks Dubrovnik Transfers ist auf private Transfers in Dubrovnik und der gesamten Region spezialisiert. Professionelle Fahrer, Pünktlichkeit und Sicherheit prägen jede Fahrt.", blogEyebrow: "Lokale Guides", blogTitle: "Cleverer reisen", ctaTitle: "Bereit für Dubrovnik?", ctaText: "Sicher reisen. Komfortabel reisen. Mit Feniks reisen." },
    common: { learn: "Mehr erfahren", read: "Guide lesen", included: "Immer inklusive", footerText: "Private Transfers ab Dubrovnik, rund um die Uhr.", pages: "Seiten", info: "Informationen", copyright: "Alle Rechte vorbehalten." }
  },
  fr: {
    nav: { home: "Accueil", services: "Services", fleet: "Véhicules", pricing: "Tarifs", about: "À propos", contact: "Contact", faq: "FAQ", booking: "Réserver" },
    hero: { badge: "Votre voyage commence sereinement", title: "Feniks Dubrovnik Transfers", text: "Un transport sûr, confortable et fiable depuis l'aéroport, l'hôtel ou la marina vers Dubrovnik et les plus belles destinations de la région.", primary: "Réserver un transfert", secondary: "Découvrir nos services" },
    booking: { eyebrow: "Réservation rapide", title: "Où souhaitez-vous aller ?", text: "Choisissez votre itinéraire et envoyez une demande. Nous la confirmerons rapidement.", pickup: "Départ", dropoff: "Destination", date: "Date", passengers: "Passagers", contact: "Téléphone ou e-mail", submit: "Vérifier le transfert", placeholder: "Choisir un lieu", result: "Prix estimé", note: "Nous confirmons le prix final avant votre trajet." },
    home: { servicesEyebrow: "Nos services", servicesTitle: "De l'atterrissage à votre destination", servicesText: "Chauffeurs locaux, véhicules modernes et assistance 24h/24 pour voyager sans attente inutile.", whyEyebrow: "Pourquoi Feniks", whyTitle: "Simple, du premier message à l'arrivée", destinationsEyebrow: "Itinéraires populaires", destinationsTitle: "Dubrovnik n'est que le début", aboutEyebrow: "Une histoire locale", aboutTitle: "Votre partenaire de confiance à Dubrovnik", aboutText: "Feniks Dubrovnik Transfers est spécialisé dans les transferts privés à Dubrovnik et dans toute la région. Chauffeurs professionnels, ponctualité et sécurité guident chaque trajet.", blogEyebrow: "Guides locaux", blogTitle: "Voyagez mieux", ctaTitle: "Prêt pour Dubrovnik ?", ctaText: "Voyagez en sécurité. Voyagez confortablement. Voyagez avec Feniks." },
    common: { learn: "En savoir plus", read: "Lire le guide", included: "Toujours inclus", footerText: "Transferts privés depuis Dubrovnik, disponibles 24h/24.", pages: "Pages", info: "Informations", copyright: "Tous droits réservés." }
  }
} as const;

export function getLabels(lang: Lang) {
  return labels[lang] || labels.en;
}

export const locations = [
  ["airport", "Zračna luka Dubrovnik"],
  ["dubrovnik", "Dubrovnik – Stari grad"],
  ["hotel", "Dubrovnik – hotel / vila"],
  ["split", "Split"],
  ["mostar", "Mostar"],
  ["kotor", "Kotor"],
] as const;

export const routePrices: Record<string, number> = {
  "airport-dubrovnik": 35, "airport-hotel": 35, "airport-split": 280,
  "airport-mostar": 150, "airport-kotor": 120, "dubrovnik-airport": 35,
  "dubrovnik-hotel": 15, "dubrovnik-split": 280, "dubrovnik-mostar": 150,
  "dubrovnik-kotor": 120, "hotel-airport": 35, "hotel-dubrovnik": 15,
  "hotel-split": 280, "hotel-mostar": 150, "hotel-kotor": 120,
  "split-dubrovnik": 280, "mostar-dubrovnik": 150, "kotor-dubrovnik": 120
};

export const services = [
  { icon: "plane", title: "Aerodromski transferi", text: "Praćenje leta, doček u terminalu i 60 minuta besplatnog čekanja." },
  { icon: "hotel", title: "Hoteli i vile", text: "Prijevoz od vrata do vrata uz pomoć s prtljagom na cijeloj rivijeri." },
  { icon: "route", title: "Međugradske vožnje", text: "Split, Mostar, Kotor, Budva i druga odredišta u Hrvatskoj i regiji." },
  { icon: "compass", title: "Privatni izleti", text: "Fleksibilan itinerar, lokalne preporuke i dovoljno vremena za uživanje." },
  { icon: "briefcase", title: "Poslovni prijevoz", text: "Diskretna usluga za konferencije, sastanke i korporativne goste." },
  { icon: "sparkles", title: "Posebne prigode", text: "Vjenčanja, proslave, krstarenja i dani koji traže dodatnu pažnju." },
];

export const pages: Record<PageSlug, { eyebrow: string; title: string; intro: string }> = {
  services: { eyebrow: "Naše usluge", title: "Privatni prijevoz po vašoj mjeri", intro: "Od dolaska u zračnu luku do cjelodnevnih izleta kroz Dalmaciju, Hercegovinu i Crnu Goru." },
  fleet: { eyebrow: "Vozni park", title: "Udobnost za svaki broj putnika", intro: "Moderna, klimatizirana i redovito održavana vozila za privatne, obiteljske i grupne transfere." },
  pricing: { eyebrow: "Cjenik", title: "Fiksne cijene bez iznenađenja", intro: "Cijena je po vozilu i uključuje gorivo, cestarine, parking, čekanje i dječje sjedalice na zahtjev." },
  about: { eyebrow: "O nama", title: "Lokalna priča o povjerenju", intro: "Profesionalni vozači, lokalno znanje i pažnja prema svakom gostu od prvog kontakta do odredišta." },
  contact: { eyebrow: "Kontakt", title: "Pišite nam bilo kada", intro: "Za brze upite dostupni smo putem telefona, WhatsAppa i emaila. Odgovaramo u najkraćem roku." },
  faq: { eyebrow: "Česta pitanja", title: "Sve prije vašeg putovanja", intro: "Rezervacije, plaćanje, prtljaga, dječje sjedalice, granice i sve što vas može zanimati prije polaska." },
  booking: { eyebrow: "Rezervacija", title: "Rezervirajte transfer u nekoliko koraka", intro: "Pošaljite detalje putovanja. Provjerit ćemo dostupnost i potvrditi konačnu cijenu prije vožnje." },
};
