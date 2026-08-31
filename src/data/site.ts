export const languages = ["hr", "en", "de", "fr"] as const;
export type Lang = (typeof languages)[number];
export const pages = ["services", "destinations", "fleet", "about", "contact", "book", "work-with-us", "business", "concierge", "help"] as const;
export type Page = (typeof pages)[number];

const content = {
  hr: {
    nav: { home: "Naslovnica", services: "Usluge", destinations: "Destinacije", fleet: "Vozila", about: "O nama", contact: "Kontakt", book: "Rezerviraj", "work-with-us": "Radi s nama", business: "Za poslovne partnere", concierge: "Airport concierge", help: "Pomoć i sigurnost", routes: "Rute" },
    hero: { badge: "Aurora privatni transferi", title: "Privatni transferi kroz Hrvatsku i srednju Europu.", statement: "Idite dalje, bez napora.", text: "Vožnje od vrata do vrata iz Dubrovnika i Zagreba prema Austriji, Mađarskoj, Sloveniji, Njemačkoj i šire.", primary: "Rezerviraj transfer", secondary: "Istraži destinacije" },
    stats: ["Putnika", "Destinacija", "Godina iskustva"],
    welcome: { tag: "Dobrodošli", title: "Aurora Private Transfers", p1: "Profesionalna smo agencija za privatne transfere koja putnicima pruža sigurnu, udobnu i pouzdanu uslugu prijevoza.", p2: "Naši iskusni vozači i moderna vozila brinu da svako putovanje bude ugodno, točno i bez stresa - bez obzira dolazite li poslovno ili turistički." },
    pillars: { tag: "Sve za bezbrižan put", title: "Transfer prilagođen vašem dolasku", text: "Od prvog kontakta do dolaska na odredište, svaki detalj organiziramo jasno i osobno.", items: [["Transferi iz zračne luke", "Praćenje leta i doček na dogovorenom mjestu."], ["Privatne međugradske vožnje", "Dubrovnik, Split, Mostar, Kotor i cijela regija."], ["Hoteli i marine", "Točan prijevoz do smještaja, jahte ili kruzera."], ["Izleti po mjeri", "Fleksibilne privatne ture s lokalnim vozačem."]] },
    why: { tag: "Zašto Aurora", title: "Lokalna usluga kojoj možete vjerovati", text: "Razumijemo koliko je važan prvi dojam pri dolasku u novu destinaciju. Zato nudimo točnost, sigurnost i mir od trenutka rezervacije.", points: ["Profesionalni i ljubazni vozači", "Udobna, klimatizirana vozila", "Fiksne cijene bez iznenađenja", "Dostupnost 24/7 i praćenje letova"] },
    route: { tag: "Popularne rute", title: "Od Dubrovnika prema cijeloj regiji", cta: "Pogledaj sve cijene" },
    cta: { title: "Recite nam kamo putujete.", text: "Pošaljite rutu i termin. Potvrdit ćemo dostupnost i konačnu cijenu u najkraćem roku.", button: "Zatraži transfer" },
    booking: { tag: "Rezervacija transfera", title: "Rezervirajte privatni transfer", intro: "Unesite rutu, datum i detalje putovanja. Javit ćemo vam se s konačnom potvrdom.", choose: "1 · Odaberite transfer", details: "Detalji transfera", pickup: "Polazište", destination: "Odredište", tripType: "Vrsta vožnje", oneWay: "Jedan smjer", returnTrip: "Povratni transfer", date: "Datum transfera", time: "Vrijeme polaska", returnDate: "Datum povratka", returnTime: "Vrijeme povratka", selectTime: "Odaberite vrijeme", passengers: "Broj putnika", name: "Ime i prezime", email: "Email", phone: "Telefon", flight: "Broj leta (opcionalno)", message: "Napomena (opcionalno)", submit: "Pošalji zahtjev za rezervaciju", selected: "Odabrani transfer", services: [["airport", "Zračna luka Dubrovnik", "Privatni doček i transfer do hotela ili vile."], ["city", "Međugradski transfer", "Udobna privatna vožnja kroz Hrvatsku i regiju."], ["marina", "Hotel, marina ili luka", "Točan dolazak do smještaja, jahte ili kruzera."], ["tour", "Privatni izlet", "Ruta i zaustavljanja prilagođeni vašem danu."]] },
    footer: "Privatni transferi kroz Hrvatsku i srednju Europu - sigurno, udobno i pouzdano."
  },
  en: {
    nav: { home: "Home", services: "Services", destinations: "Destinations", fleet: "Fleet", about: "About", contact: "Contact", book: "Book", "work-with-us": "Work with us", business: "For business", concierge: "Airport concierge", help: "Help and safety", routes: "Routes" },
    hero: { badge: "Aurora Private Transfers", title: "Private transfers across Croatia and Central Europe.", statement: "Go further, effortlessly.", text: "Door-to-door rides from Dubrovnik and Zagreb to Austria, Hungary, Slovenia, Germany and beyond.", primary: "Book a transfer", secondary: "Explore destinations" },
    stats: ["Passengers", "Destinations", "Years of experience"],
    welcome: { tag: "Welcome", title: "Aurora Private Transfers", p1: "We are a professional private transfer agency providing safe, comfortable and reliable passenger transport.", p2: "Our experienced drivers and modern vehicles make every journey pleasant, punctual and stress-free - whether you travel for business or leisure." },
    pillars: { tag: "Everything for an easy journey", title: "A transfer shaped around your arrival", text: "From first contact to your destination, every detail is handled clearly and personally.", items: [["Airport transfers", "Flight monitoring and a welcome at the agreed meeting point."], ["Private intercity rides", "Dubrovnik, Split, Mostar, Kotor and the entire region."], ["Hotels and marinas", "Punctual transport to your hotel, yacht or cruise ship."], ["Tailor-made tours", "Flexible private tours with a knowledgeable local driver."]] },
    why: { tag: "Why Aurora", title: "Local service you can trust", text: "We know how important the first impression is when arriving somewhere new. That is why we provide punctuality, safety and peace of mind from booking onward.", points: ["Professional and friendly drivers", "Comfortable air-conditioned vehicles", "Fixed prices with no surprises", "24/7 availability and flight monitoring"] },
    route: { tag: "Popular routes", title: "From Dubrovnik across the region", cta: "View all prices" },
    cta: { title: "Tell us where you are going.", text: "Send your route and travel time. We will confirm availability and the final price shortly.", button: "Request a transfer" },
    booking: { tag: "Transfer booking", title: "Book your private transfer", intro: "Enter your route, date and travel details. We will reply with the final confirmation.", choose: "1 · Choose a transfer", details: "Transfer details", pickup: "Pickup location", destination: "Destination", tripType: "Trip type", oneWay: "One way", returnTrip: "Return transfer", date: "Transfer date", time: "Pickup time", returnDate: "Return date", returnTime: "Return time", selectTime: "Select time", passengers: "Passengers", name: "Full name", email: "Email", phone: "Phone", flight: "Flight number (optional)", message: "Message (optional)", submit: "Send booking request", selected: "Selected transfer", services: [["airport", "Dubrovnik Airport", "Private welcome and transfer to your hotel or villa."], ["city", "Intercity transfer", "Comfortable private travel through Croatia and the region."], ["marina", "Hotel, marina or port", "Punctual arrival at your accommodation, yacht or cruise."], ["tour", "Private day tour", "A route and stops tailored to your day."]] },
    footer: "Private transfers across Croatia and Central Europe - safe, comfortable and reliable."
  },
  de: {
    nav: { home: "Start", services: "Leistungen", destinations: "Ziele", fleet: "Fahrzeuge", about: "Über uns", contact: "Kontakt", book: "Buchen", "work-with-us": "Mit uns arbeiten", business: "Für Unternehmen", concierge: "Airport Concierge", help: "Hilfe und Sicherheit", routes: "Routen" },
    hero: { badge: "Aurora Private Transfers", title: "Private Transfers durch Kroatien und Mitteleuropa.", statement: "Weiter reisen, mühelos.", text: "Tür-zu-Tür-Fahrten von Dubrovnik und Zagreb nach Österreich, Ungarn, Slowenien, Deutschland und darüber hinaus.", primary: "Transfer buchen", secondary: "Ziele entdecken" },
    stats: ["Fahrgäste", "Reiseziele", "Jahre Erfahrung"],
    welcome: { tag: "Willkommen", title: "Aurora Private Transfers", p1: "Wir sind eine professionelle Agentur für sichere, komfortable und zuverlässige Privattransfers.", p2: "Erfahrene Fahrer und moderne Fahrzeuge sorgen für eine pünktliche und stressfreie Fahrt - geschäftlich oder privat." },
    pillars: { tag: "Alles für eine entspannte Fahrt", title: "Ein Transfer passend zu Ihrer Ankunft", text: "Vom ersten Kontakt bis zum Ziel organisieren wir jedes Detail klar und persönlich.", items: [["Flughafentransfers", "Flugüberwachung und Empfang am vereinbarten Treffpunkt."], ["Private Fernfahrten", "Dubrovnik, Split, Mostar, Kotor und die gesamte Region."], ["Hotels und Marinas", "Pünktlicher Transfer zu Hotel, Yacht oder Kreuzfahrtschiff."], ["Individuelle Ausflüge", "Flexible Privattouren mit einem lokalen Fahrer."]] },
    why: { tag: "Warum Aurora", title: "Lokaler Service, dem Sie vertrauen können", text: "Der erste Eindruck an einem neuen Ort zählt. Wir bieten Pünktlichkeit, Sicherheit und Ruhe ab der Buchung.", points: ["Professionelle und freundliche Fahrer", "Komfortable klimatisierte Fahrzeuge", "Festpreise ohne Überraschungen", "24/7 erreichbar und Flugüberwachung"] },
    route: { tag: "Beliebte Routen", title: "Von Dubrovnik durch die Region", cta: "Alle Preise ansehen" },
    cta: { title: "Sagen Sie uns, wohin Sie reisen.", text: "Senden Sie Route und Termin. Wir bestätigen Verfügbarkeit und Endpreis schnellstmöglich.", button: "Transfer anfragen" },
    booking: { tag: "Transferbuchung", title: "Privattransfer buchen", intro: "Geben Sie Route, Datum und Reisedaten ein. Sie erhalten unsere endgültige Bestätigung.", choose: "1 · Transfer wählen", details: "Transferdetails", pickup: "Abholort", destination: "Ziel", tripType: "Fahrtart", oneWay: "Einfache Fahrt", returnTrip: "Hin- und Rückfahrt", date: "Transferdatum", time: "Abholzeit", returnDate: "Rückfahrtdatum", returnTime: "Rückfahrzeit", selectTime: "Zeit wählen", passengers: "Fahrgäste", name: "Vor- und Nachname", email: "E-Mail", phone: "Telefon", flight: "Flugnummer (optional)", message: "Nachricht (optional)", submit: "Buchungsanfrage senden", selected: "Gewählter Transfer", services: [["airport", "Flughafen Dubrovnik", "Privater Empfang und Transfer zu Hotel oder Villa."], ["city", "Transfer zwischen Städten", "Komfortable Privatfahrt durch Kroatien und die Region."], ["marina", "Hotel, Marina oder Hafen", "Pünktlich zu Unterkunft, Yacht oder Kreuzfahrtschiff."], ["tour", "Privater Tagesausflug", "Route und Stopps individuell nach Ihren Wünschen."]] },
    footer: "Private Transfers durch Kroatien und Mitteleuropa - sicher, komfortabel und zuverlässig."
  },
  fr: {
    nav: { home: "Accueil", services: "Services", destinations: "Destinations", fleet: "Véhicules", about: "À propos", contact: "Contact", book: "Réserver", "work-with-us": "Travailler avec nous", business: "Professionnels", concierge: "Concierge aéroport", help: "Aide et sécurité", routes: "Itinéraires" },
    hero: { badge: "Aurora Private Transfers", title: "Transferts privés à travers la Croatie et l'Europe centrale.", statement: "Allez plus loin, sans effort.", text: "Des trajets de porte à porte depuis Dubrovnik et Zagreb vers l'Autriche, la Hongrie, la Slovénie, l'Allemagne et au-delà.", primary: "Réserver un transfert", secondary: "Voir les destinations" },
    stats: ["Passagers", "Destinations", "Années d'expérience"],
    welcome: { tag: "Bienvenue", title: "Aurora Private Transfers", p1: "Nous sommes une agence professionnelle spécialisée dans les transferts privés, offrant un transport sûr, confortable et fiable.", p2: "Nos chauffeurs expérimentés et nos véhicules modernes garantissent un trajet agréable, ponctuel et sans stress, que vous voyagiez pour affaires ou pour vos loisirs." },
    pillars: { tag: "Tout pour voyager sereinement", title: "Un transfert adapté à votre arrivée", text: "Du premier contact jusqu'à votre destination, nous organisons chaque détail avec clarté et attention.", items: [["Transferts aéroport", "Suivi du vol et accueil au point de rencontre convenu."], ["Trajets privés interurbains", "Dubrovnik, Split, Mostar, Kotor et toute la région."], ["Hôtels et marinas", "Transport ponctuel vers votre hôtel, votre yacht ou votre bateau de croisière."], ["Excursions sur mesure", "Circuits privés flexibles avec un chauffeur local."]] },
    why: { tag: "Pourquoi Aurora", title: "Un service local de confiance", text: "La première impression compte lorsque l'on arrive ailleurs. Nous garantissons ponctualité, sécurité et tranquillité dès la réservation.", points: ["Chauffeurs professionnels et accueillants", "Véhicules confortables et climatisés", "Prix fixes sans surprise", "Disponibilité 24/7 et suivi des vols"] },
    route: { tag: "Itinéraires populaires", title: "De Dubrovnik vers toute la région", cta: "Voir tous les tarifs" },
    cta: { title: "Dites-nous où vous allez.", text: "Envoyez votre itinéraire et votre horaire. Nous confirmerons rapidement la disponibilité et le prix final.", button: "Demander un transfert" },
    booking: { tag: "Réservation de transfert", title: "Réservez votre transfert privé", intro: "Indiquez votre itinéraire, la date et les détails du trajet. Nous vous répondrons avec la confirmation finale.", choose: "1 · Choisissez un transfert", details: "Détails du transfert", pickup: "Lieu de départ", destination: "Destination", tripType: "Type de trajet", oneWay: "Aller simple", returnTrip: "Aller-retour", date: "Date du transfert", time: "Heure de départ", returnDate: "Date de retour", returnTime: "Heure de retour", selectTime: "Choisir l'heure", passengers: "Passagers", name: "Nom complet", email: "E-mail", phone: "Téléphone", flight: "Numéro de vol (facultatif)", message: "Message (facultatif)", submit: "Envoyer la demande", selected: "Transfert sélectionné", services: [["airport", "Aéroport de Dubrovnik", "Accueil privé et transfert vers votre hôtel ou villa."], ["city", "Transfert interurbain", "Voyage privé confortable en Croatie et dans la région."], ["marina", "Hôtel, marina ou port", "Arrivée ponctuelle à l'hôtel, au yacht ou au navire."], ["tour", "Excursion privée", "Itinéraire et arrêts adaptés à votre journée."]] },
    footer: "Transferts privés à travers la Croatie et l'Europe centrale - sûrs, confortables et fiables."
  }
} as const;

export function getContent(lang: Lang) { return content[lang] || content.en; }

const interfaceContent = {
  hr: {
    licensedDrivers: "Licencirani vozači", available247: "Dostupni 24/7",
    pickupPlaceholder: "Zračna luka Dubrovnik", destinationPlaceholder: "Hotel / grad / marina",
    decreasePassengers: "Smanji broj putnika", increasePassengers: "Povećaj broj putnika",
    previousMonth: "Prethodni mjesec", nextMonth: "Sljedeći mjesec",
    homeLabel: "Početna stranica Aurora Private Transfers", mainNavigation: "Glavna navigacija",
    changeLanguage: "Promijeni jezik", call: "Nazovi Aurora Transfers", openMenu: "Otvori izbornik",
    imageAltHarbor: "Stara luka Dubrovnika i Jadransko more", imageAltTransfer: "Privatni transfer u Dubrovniku",
    imageCaption: "Privatne vožnje diljem jadranske regije", doorToDoor: "Usluga od vrata do vrata",
    serviceTypes: "Zračna luka · Hotel · Marina · Grad", country: "Hrvatska",
    routes: ["30 min · od 35 EUR", "2 h · privatna prekogranična vožnja", "2 h 30 min · slikovita regionalna ruta", "3 h 15 min · udobna vožnja od vrata do vrata"],
    destinationCards: [["Zračna luka Dubrovnik", "Stari grad · Hoteli · Vile"], ["Kotor", "Crna Gora · Bokokotorski zaljev"], ["Mostar", "Bosna i Hercegovina"], ["Split", "Dalmatinska obala · Od vrata do vrata"]],
    pages: {
      destinationsIntro: "Privatne rute od vrata do vrata iz Dubrovnika prema Hrvatskoj, Crnoj Gori i Bosni i Hercegovini.",
      fleetTitle: "Udobnost za svako putovanje", fleetIntro: "Moderna, klimatizirana vozila pripremljena za vožnje iz zračne luke, međugradske transfere i privatne izlete.",
      aboutHeading: "Profesionalni vozači. Osobna usluga.", contactTitle: "Isplanirajte vožnju s nama", contactIntro: "Pošaljite nam rutu, vrijeme dolaska i broj putnika. Naš tim odgovorit će vam s informacijama o dostupnosti i potvrđenom cijenom.", fleetPhotoPlaceholder: "Fotografija vozila uskoro",
      name: "Ime i prezime", email: "Email", route: "Ruta", message: "Poruka"
    },
    successTitle: "Zahtjev je zaprimljen", successText: "Provjerit ćemo vašu rutu i javiti vam se s informacijama o dostupnosti i potvrđenom cijenom.", successAgain: "Pošalji novi zahtjev"
  },
  en: {
    licensedDrivers: "Licensed drivers", available247: "Available 24/7",
    pickupPlaceholder: "Dubrovnik Airport", destinationPlaceholder: "Hotel / city / marina",
    decreasePassengers: "Decrease passengers", increasePassengers: "Increase passengers",
    previousMonth: "Previous month", nextMonth: "Next month",
    homeLabel: "Aurora Private Transfers home", mainNavigation: "Main navigation",
    changeLanguage: "Change language", call: "Call Aurora Transfers", openMenu: "Open menu",
    imageAltHarbor: "Dubrovnik Old Harbour and the Adriatic Sea", imageAltTransfer: "Private transfer service in Dubrovnik",
    imageCaption: "Private rides across the Adriatic region", doorToDoor: "Door-to-door service",
    serviceTypes: "Airport · Hotel · Marina · City", country: "Croatia",
    routes: ["30 min · from 35 EUR", "2 hr · private cross-border ride", "2 hr 30 min · scenic regional route", "3 hr 15 min · comfortable door-to-door ride"],
    destinationCards: [["Dubrovnik Airport", "Old Town · Hotels · Villas"], ["Kotor", "Montenegro · Bay of Kotor"], ["Mostar", "Bosnia and Herzegovina"], ["Split", "Dalmatian coast · Door to door"]],
    pages: {
      destinationsIntro: "Private door-to-door routes from Dubrovnik to Croatia, Montenegro, and Bosnia and Herzegovina.",
      fleetTitle: "Comfort for every journey", fleetIntro: "Modern, air-conditioned vehicles prepared for airport rides, long-distance transfers, and private tours.",
      aboutHeading: "Professional drivers. Personal service.", contactTitle: "Plan your ride with us", contactIntro: "Send your route, arrival time, and passenger details. Our team will reply with availability and a confirmed price.", fleetPhotoPlaceholder: "Vehicle photo coming soon",
      name: "Name", email: "Email", route: "Route", message: "Message"
    },
    successTitle: "Request received", successText: "We will review your route and contact you with availability and the confirmed price.", successAgain: "Make another request"
  },
  de: {
    licensedDrivers: "Lizenzierte Fahrer", available247: "Rund um die Uhr verfügbar",
    pickupPlaceholder: "Flughafen Dubrovnik", destinationPlaceholder: "Hotel / Stadt / Marina",
    decreasePassengers: "Fahrgastzahl verringern", increasePassengers: "Fahrgastzahl erhöhen",
    previousMonth: "Vorheriger Monat", nextMonth: "Nächster Monat",
    homeLabel: "Startseite von Aurora Private Transfers", mainNavigation: "Hauptnavigation",
    changeLanguage: "Sprache ändern", call: "Aurora Transfers anrufen", openMenu: "Menü öffnen",
    imageAltHarbor: "Der alte Hafen von Dubrovnik und die Adria", imageAltTransfer: "Privater Transferservice in Dubrovnik",
    imageCaption: "Private Fahrten in der gesamten Adriaregion", doorToDoor: "Tür-zu-Tür-Service",
    serviceTypes: "Flughafen · Hotel · Marina · Stadt", country: "Kroatien",
    routes: ["30 Min. · ab 35 EUR", "2 Std. · private grenzüberschreitende Fahrt", "2 Std. 30 Min. · malerische Regionalroute", "3 Std. 15 Min. · komfortable Tür-zu-Tür-Fahrt"],
    destinationCards: [["Flughafen Dubrovnik", "Altstadt · Hotels · Villen"], ["Kotor", "Montenegro · Bucht von Kotor"], ["Mostar", "Bosnien und Herzegowina"], ["Split", "Dalmatinische Küste · Tür zu Tür"]],
    pages: {
      destinationsIntro: "Private Tür-zu-Tür-Transfers von Dubrovnik nach Kroatien, Montenegro sowie Bosnien und Herzegowina.",
      fleetTitle: "Komfort für jede Reise", fleetIntro: "Moderne, klimatisierte Fahrzeuge für Flughafentransfers, Fernfahrten und private Ausflüge.",
      aboutHeading: "Professionelle Fahrer. Persönlicher Service.", contactTitle: "Planen Sie Ihre Fahrt mit uns", contactIntro: "Senden Sie uns Route, Ankunftszeit und Fahrgastzahl. Unser Team antwortet Ihnen mit der Verfügbarkeit und dem bestätigten Preis.", fleetPhotoPlaceholder: "Fahrzeugfoto folgt",
      name: "Vor- und Nachname", email: "E-Mail", route: "Route", message: "Nachricht"
    },
    successTitle: "Anfrage erhalten", successText: "Wir prüfen Ihre Route und melden uns mit der Verfügbarkeit und dem bestätigten Preis bei Ihnen.", successAgain: "Weitere Anfrage senden"
  },
  fr: {
    licensedDrivers: "Chauffeurs agréés", available247: "Disponibles 24 h/24 et 7 j/7",
    pickupPlaceholder: "Aéroport de Dubrovnik", destinationPlaceholder: "Hôtel / ville / marina",
    decreasePassengers: "Réduire le nombre de passagers", increasePassengers: "Augmenter le nombre de passagers",
    previousMonth: "Mois précédent", nextMonth: "Mois suivant",
    homeLabel: "Accueil de Aurora Private Transfers", mainNavigation: "Navigation principale",
    changeLanguage: "Changer de langue", call: "Appeler Aurora Transfers", openMenu: "Ouvrir le menu",
    imageAltHarbor: "Le vieux port de Dubrovnik et la mer Adriatique", imageAltTransfer: "Service de transfert privé à Dubrovnik",
    imageCaption: "Trajets privés dans toute la région adriatique", doorToDoor: "Service porte-à-porte",
    serviceTypes: "Aéroport · Hôtel · Marina · Ville", country: "Croatie",
    routes: ["30 min · à partir de 35 EUR", "2 h · trajet privé transfrontalier", "2 h 30 · itinéraire régional panoramique", "3 h 15 · trajet porte-à-porte confortable"],
    destinationCards: [["Aéroport de Dubrovnik", "Vieille ville · Hôtels · Villas"], ["Kotor", "Monténégro · Bouches de Kotor"], ["Mostar", "Bosnie-Herzégovine"], ["Split", "Côte dalmate · Porte à porte"]],
    pages: {
      destinationsIntro: "Trajets privés porte-à-porte de Dubrovnik vers la Croatie, le Monténégro et la Bosnie-Herzégovine.",
      fleetTitle: "Le confort à chaque trajet", fleetIntro: "Des véhicules modernes et climatisés pour les transferts aéroport, les trajets longue distance et les excursions privées.",
      aboutHeading: "Chauffeurs professionnels. Service personnalisé.", contactTitle: "Planifiez votre trajet avec nous", contactIntro: "Envoyez-nous votre itinéraire, votre heure d'arrivée et le nombre de passagers. Notre équipe vous répondra en confirmant la disponibilité et le tarif.", fleetPhotoPlaceholder: "Photo du véhicule à venir",
      name: "Nom complet", email: "E-mail", route: "Itinéraire", message: "Message"
    },
    successTitle: "Demande reçue", successText: "Nous vérifierons votre itinéraire et vous contacterons pour confirmer la disponibilité et le tarif.", successAgain: "Envoyer une nouvelle demande"
  }
} as const;

export function getInterfaceContent(lang: Lang) { return interfaceContent[lang] || interfaceContent.en; }
