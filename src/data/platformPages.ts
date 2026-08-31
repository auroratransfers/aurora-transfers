import type { Lang } from "./site";

type Card = { title: string; text: string; badge?: string };
type Faq = { question: string; answer: string };

type PlatformContent = {
  serviceExpansion: { tag: string; title: string; text: string; cards: readonly Card[]; cta: string };
  business: {
    tag: string; title: string; intro: string; statement: string; benefits: readonly Card[]; packages: readonly Card[];
    form: { title: string; intro: string; companyName: string; contactName: string; email: string; phone: string; companyType: string; cities: string; monthlyRides: string; message: string; submit: string; sending: string; error: string; successTitle: string; successText: string; reference: string; types: readonly [string, string][] };
  };
  concierge: { tag: string; title: string; intro: string; statement: string; packages: readonly Card[]; includedTitle: string; included: readonly string[]; note: string; cta: string };
  help: { tag: string; title: string; intro: string; cards: readonly Card[]; faqTitle: string; faqs: readonly Faq[]; cta: string; support: string };
};

const platformPages = {
  hr: {
    serviceExpansion: {
      tag: "Više načina putovanja", title: "Od prve vožnje do cijelog itinerara", text: "Aurora je zamišljena za putnike koji ne žele prilagođavati svoj dan ograničenom rasporedu. Odaberite izravni transfer, vozača po satu, veću grupu ili koordiniran dolazak, a prije potvrde zajedno provjeravamo pravi plan.", cta: "Isplanirajte svoju vožnju",
      cards: [
        { title: "Vozač po satu", text: "Rezervirajte vozilo i profesionalnog vozača za sastanke, razgledavanje, kupnju, večeru ili dan s promjenjivim planom." },
        { title: "Grupe i događaji", text: "Od obiteljskih dolazaka do vjenčanja, konferencija i jahting programa, koordiniramo kapacitet, prtljagu i redoslijed preuzimanja." },
        { title: "Dolazak iz zračne luke", text: "Dodajte broj leta, odaberite doček i započnite odmor ili poslovni put s jasnim mjestom preuzimanja." },
        { title: "Airport concierge", text: "Za kompleksnije dolaske možemo koordinirati partnera za asistenciju, portira ili prioritetni prolaz. Dostupnost uvijek provjeravamo pojedinačno.", badge: "Pilot" },
        { title: "Aurora Now", text: "Za brzu vožnju provjeravamo stvarnu dostupnost vozačkih uređaja. Dok se flota širi, prikaz ostaje jasno označen kao pilot.", badge: "Pilot" },
        { title: "Poslovni transferi", text: "Jedan kontakt za hotele, vile, agencije, događaje i tvrtke koje žele uredan sustav naručivanja i evidencije vožnji." }
      ]
    },
    business: {
      tag: "Aurora za poslovne partnere", title: "Pouzdani transferi koji izgledaju jednako dobro kao vaša usluga", intro: "Hoteli, vile, charteri, agencije, organizatori događaja i tvrtke mogu Auroru koristiti kao produžetak vlastite gostoprimljivosti. Vi nam šaljete detalje gosta ili raspored, a mi vraćamo jasan plan vožnje i osobu za kontakt.", statement: "Svaki gost dobiva privatnu vožnju. Svaki partner dobiva pregledan operativni tok.",
      benefits: [
        { title: "Jedan operativni kontakt", text: "Za pojedinačne dolaske, veće grupe, promjene leta i posebne zahtjeve." },
        { title: "Rasporedi koji prate vaš program", text: "Dolazak, check-in, marina, restoran, sastanak ili sljedeća destinacija koordiniraju se kao jedna cjelina." },
        { title: "Privatna poveznica za vožnju", text: "Nakon potvrde gost dobiva sigurnu poveznicu za status vožnje i praćenje dodijeljenog vozača." },
        { title: "B2B program u fazama", text: "Računi, pravila odobravanja i agencijski pristup uvode se postupno, uz jasnu testnu fazu prije produkcije.", badge: "Pilot" }
      ],
      packages: [
        { title: "Smještaj i vila", text: "Dolazak iz zračne luke, transferi do restorana, marina i dnevni program za goste koji očekuju diskretan servis." },
        { title: "Agencije i DMC partneri", text: "Jasna potvrda rute, klase vozila i kontakta za međunarodne goste prije njihova dolaska." },
        { title: "Događaji i produkcije", text: "Koordinacija više vozila, vremenskih prozora i preuzimanja za konferencije, vjenčanja i snimanja." }
      ],
      form: { title: "Otvorite poslovni razgovor", intro: "Pošaljite nekoliko osnovnih podataka. Tim će vam se javiti s prijedlogom suradnje.", companyName: "Naziv tvrtke", contactName: "Ime i prezime", email: "Poslovni email", phone: "Telefon (opcionalno)", companyType: "Vrsta poslovanja", cities: "Gradovi i područja u kojima radite", monthlyRides: "Okviran broj vožnji mjesečno", message: "Što želite organizirati?", submit: "Pošalji poslovni upit", sending: "Šaljemo upit...", error: "Upit trenutno nije moguće poslati. Pokušajte ponovno.", successTitle: "Poslovni upit je zaprimljen", successText: "Pregledat ćemo vaš plan i javiti vam se na navedeni email.", reference: "Referenca upita", types: [["hotel", "Hotel / smještaj"], ["villa-agency", "Vile i upravljanje smještajem"], ["travel-agency", "Turistička agencija / DMC"], ["event", "Događaji i produkcija"], ["corporate", "Tvrtka"], ["yacht-marina", "Jahta / marina"], ["other", "Drugo"]] }
    },
    concierge: {
      tag: "Airport concierge", title: "Dolazak koji počinje prije izlaska iz terminala", intro: "Za putnike kojima je potreban dodatni mir pri dolasku, Aurora može koordinirati transfer i uslugu aerodromske asistencije s lokalnim partnerima. Svaka ponuda ovisi o konkretnoj zračnoj luci, terminalu, letu i dostupnosti partnera.", statement: "Jedan plan za let, terminal, prtljagu, doček i odredište.",
      packages: [
        { title: "Arrival coordination", text: "Broj leta, terminal, točka susreta i vozač organizirani su u jednom dolaznom planu." },
        { title: "Assisted arrival", text: "Na zahtjev provjeravamo dostupnost partnera za doček, pomoć s prtljagom ili pratnju do vozila.", badge: "Partner-led" },
        { title: "VIP airport request", text: "Za privatne terminale, salone i prioritetne protokole prvo provjeravamo lokalna pravila, cijenu i potvrdu partnera.", badge: "On request" }
      ],
      includedTitle: "Što nam trebate poslati", included: ["Broj leta i datum dolaska", "Broj putnika, djece i prtljage", "Odredište i željeno vrijeme preuzimanja", "Posebne potrebe, asistenciju ili jezik", "Kontakt osobu koja može potvrditi detalje"], note: "Ne predstavljamo pilotske ili partnerske usluge kao garantirane. Prvo provjeravamo stvarnu dostupnost i tek zatim šaljemo potvrdu.", cta: "Zatražite dolazni plan"
    },
    help: {
      tag: "Sigurnost i pomoć", title: "Jasna podrška prije, tijekom i nakon vožnje", intro: "Privatni transfer treba imati jednostavan plan i osobu kojoj se možete obratiti. Aurora zato bilježi operativne promjene, prati status vožnje preko privatne poveznice i odvaja zahtjev za promjenu od stvarnog otkazivanja.",
      cards: [
        { title: "Provjeren operativni tok", text: "Rezervacija, potvrda, dodjela vozača, dolazak, početak i završetak vožnje bilježe se kao zasebni statusi." },
        { title: "Privatno praćenje", text: "Samo putnik sa sigurnom, vremenski ograničenom poveznicom vidi dodijeljeno vozilo i posljednju prijavljenu lokaciju." },
        { title: "GPS pravila za vozače", text: "Dolazak, početak i završetak vožnje zahtijevaju svježu GPS lokaciju i geografski kontekst kada su koordinate dostupne." },
        { title: "Promjene bez nagađanja", text: "Putnik može poslati zahtjev za promjenu ili otkazivanje, a operativni tim ga potvrđuje prije promjene plana." }
      ],
      faqTitle: "Česta pitanja", faqs: [
        { question: "Kada je cijena konačna?", answer: "Procjena na stranici služi za pregled. Konačnu cijenu, rutu i klasu vozila Aurora potvrđuje prije naplate." },
        { question: "Što ako let kasni?", answer: "Dodajte broj leta. Nakon potvrde pratimo operativne promjene prema dostupnosti povezane usluge i usklađujemo plan preuzimanja." },
        { question: "Mogu li promijeniti ili otkazati vožnju?", answer: "Da. Putem privatne poveznice možete poslati zahtjev, a tim potvrđuje novi termin ili otkazivanje." },
        { question: "Kada se prikazuje vozač?", answer: "Vozač i vozilo pojavljuju se nakon dodjele. Lokacija se prikazuje tek kada uređaj vozača šalje svježu telemetriju." }
      ], cta: "Rezervirajte s jasnim planom", support: "Kontaktirajte podršku"
    }
  },
  en: {
    serviceExpansion: {
      tag: "More ways to travel", title: "From one ride to your entire itinerary", text: "Aurora is designed for travellers who do not want to reshape their day around a limited timetable. Choose a direct transfer, a chauffeur by the hour, a larger group movement or a coordinated arrival, and we verify the right plan together before confirmation.", cta: "Plan your ride",
      cards: [
        { title: "Chauffeur by the hour", text: "Reserve a vehicle and professional driver for meetings, sightseeing, shopping, dinner or a day with plans that change." },
        { title: "Groups and events", text: "From family arrivals to weddings, conferences and yacht programmes, we coordinate capacity, luggage and pickup order." },
        { title: "Airport arrival", text: "Add a flight number, choose a welcome option and start your holiday or business trip with a clear meeting point." },
        { title: "Airport concierge", text: "For more complex arrivals, we can coordinate a partner for assistance, porter support or priority passage. Availability is always checked individually.", badge: "Pilot" },
        { title: "Aurora Now", text: "For a fast ride we check actual driver-device availability. While the fleet expands, the experience remains clearly labelled as a pilot.", badge: "Pilot" },
        { title: "Business transfers", text: "One contact for hotels, villas, agencies, events and companies that want a clear booking and ride-record system." }
      ]
    },
    business: {
      tag: "Aurora for business", title: "Transfers that look as polished as your own service", intro: "Hotels, villas, charter teams, agencies, event organisers and companies can use Aurora as an extension of their hospitality. You send the guest details or schedule; we return a clear ride plan and a person to contact.", statement: "Every guest receives a private ride. Every partner receives a clear operational flow.",
      benefits: [
        { title: "One operational contact", text: "For individual arrivals, larger groups, flight changes and special requirements." },
        { title: "Schedules that follow your programme", text: "Arrival, check-in, marina, restaurant, meeting or onward destination are coordinated as one journey." },
        { title: "A private ride link", text: "After confirmation, the guest receives a secure link for ride status and assigned-driver tracking." },
        { title: "A staged B2B programme", text: "Invoices, approval rules and agency access are introduced in stages, with a clear test phase before production.", badge: "Pilot" }
      ],
      packages: [
        { title: "Accommodation and villas", text: "Airport arrivals, restaurant transfers, marina movements and day plans for guests who expect discreet service." },
        { title: "Agencies and DMC partners", text: "Clear confirmation of route, vehicle class and contact person for international guests before they arrive." },
        { title: "Events and productions", text: "Coordination of multiple vehicles, time windows and pickups for conferences, weddings and filming." }
      ],
      form: { title: "Start a business conversation", intro: "Send a few essentials. Our team will return with a suggested partnership approach.", companyName: "Company name", contactName: "Full name", email: "Business email", phone: "Phone (optional)", companyType: "Business type", cities: "Cities and areas where you operate", monthlyRides: "Approximate monthly ride volume", message: "What would you like to organise?", submit: "Send business enquiry", sending: "Sending enquiry...", error: "The enquiry could not be sent right now. Please try again.", successTitle: "Business enquiry received", successText: "We will review your plan and contact you at the email provided.", reference: "Enquiry reference", types: [["hotel", "Hotel / accommodation"], ["villa-agency", "Villas and property management"], ["travel-agency", "Travel agency / DMC"], ["event", "Events and production"], ["corporate", "Company"], ["yacht-marina", "Yacht / marina"], ["other", "Other"]] }
    },
    concierge: {
      tag: "Airport concierge", title: "An arrival that begins before you leave the terminal", intro: "For travellers who need more calm on arrival, Aurora can coordinate the transfer and airport-assistance service with local partners. Every proposal depends on the specific airport, terminal, flight and partner availability.", statement: "One plan for flight, terminal, luggage, welcome and destination.",
      packages: [
        { title: "Arrival coordination", text: "Flight number, terminal, meeting point and driver are organised in one arrival plan." },
        { title: "Assisted arrival", text: "On request, we check partner availability for a welcome, luggage assistance or escort to the vehicle.", badge: "Partner-led" },
        { title: "VIP airport request", text: "For private terminals, lounges and priority protocols, we first check local rules, pricing and partner confirmation.", badge: "On request" }
      ],
      includedTitle: "What to send us", included: ["Flight number and arrival date", "Passenger count, children and luggage", "Destination and preferred pickup time", "Special needs, assistance or language", "A contact person who can confirm details"], note: "We do not present pilot or partner-led services as guaranteed. We first check actual availability and then send confirmation.", cta: "Request an arrival plan"
    },
    help: {
      tag: "Safety and help", title: "Clear support before, during and after your ride", intro: "A private transfer should have a simple plan and a person you can reach. Aurora therefore records operational changes, shows ride status through a private link and separates a change request from an actual cancellation.",
      cards: [
        { title: "A verified operational flow", text: "Request, confirmation, driver assignment, arrival, ride start and completion are recorded as separate statuses." },
        { title: "Private tracking", text: "Only the rider with a secure, time-limited link sees the assigned vehicle and its last reported location." },
        { title: "GPS rules for drivers", text: "Arrival, start and completion require a fresh GPS position and geographic context when coordinates are available." },
        { title: "Changes without guesswork", text: "A rider can send a change or cancellation request, and the operations team confirms it before the plan changes." }
      ],
      faqTitle: "Frequently asked questions", faqs: [
        { question: "When is the price final?", answer: "The estimate on the website is for orientation. Aurora confirms the final price, route and vehicle class before payment." },
        { question: "What if my flight is delayed?", answer: "Add your flight number. After confirmation, we monitor operational changes according to the connected service and adjust the pickup plan." },
        { question: "Can I change or cancel a ride?", answer: "Yes. Use your private link to send a request; the team confirms a new time or cancellation." },
        { question: "When will I see the driver?", answer: "Driver and vehicle appear after assignment. Location is shown only when the driver's device sends fresh telemetry." }
      ], cta: "Book with a clear plan", support: "Contact support"
    }
  },
  de: {
    serviceExpansion: {
      tag: "Mehr Reisemöglichkeiten", title: "Von einer Fahrt bis zu Ihrem gesamten Reiseplan", text: "Aurora ist für Reisende gedacht, die ihren Tag nicht an einen begrenzten Fahrplan anpassen möchten. Wählen Sie einen Direkttransfer, Fahrer auf Stundenbasis, eine größere Gruppe oder eine koordinierte Ankunft; vor der Bestätigung prüfen wir gemeinsam den passenden Plan.", cta: "Fahrt planen",
      cards: [
        { title: "Fahrer auf Stundenbasis", text: "Reservieren Sie Fahrzeug und professionellen Fahrer für Termine, Besichtigungen, Einkäufe, Abendessen oder einen Tag mit wechselnden Plänen." },
        { title: "Gruppen und Veranstaltungen", text: "Von Familienankünften bis zu Hochzeiten, Konferenzen und Yachtprogrammen koordinieren wir Kapazität, Gepäck und Abholreihenfolge." },
        { title: "Ankunft am Flughafen", text: "Fügen Sie eine Flugnummer hinzu, wählen Sie eine Empfangsoption und beginnen Sie Ihre Reise mit einem klaren Treffpunkt." },
        { title: "Airport Concierge", text: "Für komplexere Ankünfte können wir Partner für Assistenz, Gepäckhilfe oder Priority Passage koordinieren. Die Verfügbarkeit wird immer einzeln geprüft.", badge: "Pilot" },
        { title: "Aurora Now", text: "Für eine schnelle Fahrt prüfen wir die tatsächliche Verfügbarkeit von Fahrergeräten. Während die Flotte wächst, bleibt dies klar als Pilot gekennzeichnet.", badge: "Pilot" },
        { title: "Geschäftstransfers", text: "Ein Ansprechpartner für Hotels, Villen, Agenturen, Events und Unternehmen mit klarer Bestellung und Fahrtdokumentation." }
      ]
    },
    business: {
      tag: "Aurora für Unternehmen", title: "Transfers, die genauso professionell wirken wie Ihr eigener Service", intro: "Hotels, Villen, Charterteams, Agenturen, Veranstalter und Unternehmen können Aurora als Erweiterung ihrer Gastfreundschaft einsetzen. Sie senden uns Gästedaten oder Ablauf, wir liefern einen klaren Fahrplan und einen Ansprechpartner.", statement: "Jeder Gast erhält eine Privatfahrt. Jeder Partner erhält einen klaren operativen Ablauf.",
      benefits: [
        { title: "Ein operativer Kontakt", text: "Für einzelne Ankünfte, größere Gruppen, Flugänderungen und besondere Anforderungen." },
        { title: "Abläufe nach Ihrem Programm", text: "Ankunft, Check-in, Marina, Restaurant, Termin oder Weiterreise werden als eine Reise koordiniert." },
        { title: "Privater Link zur Fahrt", text: "Nach der Bestätigung erhält der Gast einen sicheren Link für Fahrtstatus und Fahrer-Tracking." },
        { title: "B2B-Programm in Stufen", text: "Rechnungen, Freigaberegeln und Agenturzugang werden schrittweise mit klarer Testphase vor der Produktion eingeführt.", badge: "Pilot" }
      ],
      packages: [
        { title: "Unterkünfte und Villen", text: "Flughafenankünfte, Restauranttransfers, Marinafahrten und Tagespläne für Gäste mit Anspruch auf diskreten Service." },
        { title: "Agenturen und DMC-Partner", text: "Klare Bestätigung von Route, Fahrzeugklasse und Kontaktperson für internationale Gäste vor der Ankunft." },
        { title: "Events und Produktionen", text: "Koordination mehrerer Fahrzeuge, Zeitfenster und Abholungen für Konferenzen, Hochzeiten und Drehs." }
      ],
      form: { title: "Geschäftsgespräch starten", intro: "Senden Sie uns einige Eckdaten. Unser Team meldet sich mit einem Partnerschaftsvorschlag.", companyName: "Firmenname", contactName: "Vollständiger Name", email: "Geschäftliche E-Mail", phone: "Telefon (optional)", companyType: "Art des Unternehmens", cities: "Städte und Gebiete Ihres Betriebs", monthlyRides: "Ungefähres monatliches Fahrtvolumen", message: "Was möchten Sie organisieren?", submit: "Geschäftsanfrage senden", sending: "Anfrage wird gesendet...", error: "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut.", successTitle: "Geschäftsanfrage erhalten", successText: "Wir prüfen Ihren Plan und melden uns über die angegebene E-Mail-Adresse.", reference: "Anfragereferenz", types: [["hotel", "Hotel / Unterkunft"], ["villa-agency", "Villen und Objektverwaltung"], ["travel-agency", "Reiseagentur / DMC"], ["event", "Events und Produktion"], ["corporate", "Unternehmen"], ["yacht-marina", "Yacht / Marina"], ["other", "Sonstiges"]] }
    },
    concierge: {
      tag: "Airport Concierge", title: "Eine Ankunft, die beginnt, bevor Sie das Terminal verlassen", intro: "Für Reisende, die bei der Ankunft mehr Ruhe brauchen, kann Aurora Transfer und Flughafenassistenz mit lokalen Partnern koordinieren. Jede Anfrage hängt vom konkreten Flughafen, Terminal, Flug und der Partnerverfügbarkeit ab.", statement: "Ein Plan für Flug, Terminal, Gepäck, Empfang und Ziel.",
      packages: [
        { title: "Ankunftskoordination", text: "Flugnummer, Terminal, Treffpunkt und Fahrer werden in einem Ankunftsplan organisiert." },
        { title: "Begleitete Ankunft", text: "Auf Anfrage prüfen wir Partner für Empfang, Gepäckhilfe oder Begleitung zum Fahrzeug.", badge: "Partnergeführt" },
        { title: "VIP-Flughafenanfrage", text: "Für private Terminals, Lounges und Priority-Protokolle prüfen wir zuerst lokale Regeln, Preis und Partnerbestätigung.", badge: "Auf Anfrage" }
      ],
      includedTitle: "Was Sie uns senden sollten", included: ["Flugnummer und Ankunftsdatum", "Fahrgastzahl, Kinder und Gepäck", "Ziel und gewünschte Abholzeit", "Besondere Bedürfnisse, Assistenz oder Sprache", "Kontaktperson für die Bestätigung"], note: "Pilot- oder Partnerleistungen werden nicht als garantiert dargestellt. Wir prüfen zuerst die tatsächliche Verfügbarkeit und senden dann die Bestätigung.", cta: "Ankunftsplan anfragen"
    },
    help: {
      tag: "Sicherheit und Hilfe", title: "Klare Unterstützung vor, während und nach Ihrer Fahrt", intro: "Ein Privattransfer sollte einen einfachen Plan und einen erreichbaren Ansprechpartner haben. Aurora protokolliert daher operative Änderungen, zeigt den Fahrtstatus über einen privaten Link und trennt Änderungswunsch und tatsächliche Stornierung.",
      cards: [
        { title: "Geprüfter operativer Ablauf", text: "Anfrage, Bestätigung, Fahrerzuweisung, Ankunft, Fahrtbeginn und Abschluss werden als getrennte Status erfasst." },
        { title: "Privates Tracking", text: "Nur der Fahrgast mit einem sicheren, zeitlich begrenzten Link sieht Fahrzeug und zuletzt gemeldeten Standort." },
        { title: "GPS-Regeln für Fahrer", text: "Ankunft, Start und Abschluss erfordern eine aktuelle GPS-Position und geografischen Kontext, wenn Koordinaten vorliegen." },
        { title: "Änderungen ohne Rätselraten", text: "Der Fahrgast kann einen Änderungs- oder Stornierungswunsch senden; das Operationsteam bestätigt ihn vor der Planänderung." }
      ],
      faqTitle: "Häufige Fragen", faqs: [
        { question: "Wann ist der Preis endgültig?", answer: "Die Website-Prognose dient zur Orientierung. Aurora bestätigt Endpreis, Route und Fahrzeugklasse vor der Zahlung." },
        { question: "Was passiert bei Flugverspätung?", answer: "Fügen Sie Ihre Flugnummer hinzu. Nach Bestätigung überwachen wir operative Änderungen entsprechend dem verbundenen Dienst und passen die Abholung an." },
        { question: "Kann ich eine Fahrt ändern oder stornieren?", answer: "Ja. Über Ihren privaten Link können Sie eine Anfrage senden; das Team bestätigt neue Zeit oder Stornierung." },
        { question: "Wann sehe ich den Fahrer?", answer: "Fahrer und Fahrzeug erscheinen nach der Zuweisung. Der Standort wird nur angezeigt, wenn das Fahrergerät aktuelle Telemetrie sendet." }
      ], cta: "Mit klarem Plan buchen", support: "Support kontaktieren"
    }
  },
  fr: {
    serviceExpansion: {
      tag: "Plus de façons de voyager", title: "D'un trajet à l'ensemble de votre itinéraire", text: "Aurora est conçue pour les voyageurs qui ne veulent pas adapter leur journée à un horaire limité. Choisissez un transfert direct, un chauffeur à l'heure, un déplacement de groupe ou une arrivée coordonnée, puis nous vérifions ensemble le bon plan avant confirmation.", cta: "Planifier votre trajet",
      cards: [
        { title: "Chauffeur à l'heure", text: "Réservez un véhicule et un chauffeur professionnel pour des rendez-vous, visites, achats, dîner ou une journée dont le programme évolue." },
        { title: "Groupes et événements", text: "Des arrivées familiales aux mariages, conférences et programmes de yachting, nous coordonnons capacité, bagages et ordre des prises en charge." },
        { title: "Arrivée à l'aéroport", text: "Ajoutez un numéro de vol, choisissez une option d'accueil et commencez votre voyage avec un point de rencontre clair." },
        { title: "Concierge aéroport", text: "Pour les arrivées plus complexes, nous pouvons coordonner un partenaire pour l'assistance, les bagages ou un passage prioritaire. La disponibilité est toujours vérifiée individuellement.", badge: "Pilote" },
        { title: "Aurora Now", text: "Pour une course rapide, nous vérifions la disponibilité réelle des appareils chauffeur. Pendant que la flotte se développe, l'expérience reste clairement signalée comme pilote.", badge: "Pilote" },
        { title: "Transferts professionnels", text: "Un interlocuteur pour hôtels, villas, agences, événements et entreprises qui souhaitent une commande et un historique de trajets clairs." }
      ]
    },
    business: {
      tag: "Aurora pour les entreprises", title: "Des transferts aussi soignés que votre propre service", intro: "Hôtels, villas, équipes de charter, agences, organisateurs d'événements et entreprises peuvent utiliser Aurora comme prolongement de leur hospitalité. Vous envoyez les détails du client ou le planning; nous fournissons un plan de trajet clair et un contact dédié.", statement: "Chaque client reçoit un trajet privé. Chaque partenaire reçoit un flux opérationnel clair.",
      benefits: [
        { title: "Un contact opérationnel", text: "Pour les arrivées individuelles, les groupes, les changements de vol et les demandes spéciales." },
        { title: "Des horaires qui suivent votre programme", text: "Arrivée, check-in, marina, restaurant, rendez-vous ou destination suivante sont coordonnés comme un seul voyage." },
        { title: "Un lien privé de suivi", text: "Après confirmation, le client reçoit un lien sécurisé pour le statut du trajet et le suivi du chauffeur." },
        { title: "Un programme B2B progressif", text: "Facturation, règles d'approbation et accès agence sont introduits progressivement, avec une phase de test claire avant la production.", badge: "Pilote" }
      ],
      packages: [
        { title: "Hébergement et villas", text: "Arrivées aéroport, trajets restaurant, marinas et programmes de journée pour des clients qui attendent un service discret." },
        { title: "Agences et partenaires DMC", text: "Confirmation claire de l'itinéraire, de la catégorie de véhicule et du contact pour les clients internationaux avant l'arrivée." },
        { title: "Événements et productions", text: "Coordination de plusieurs véhicules, créneaux et prises en charge pour conférences, mariages et tournages." }
      ],
      form: { title: "Ouvrir une discussion professionnelle", intro: "Envoyez quelques informations essentielles. Notre équipe vous répondra avec une proposition de partenariat.", companyName: "Nom de l'entreprise", contactName: "Nom complet", email: "E-mail professionnel", phone: "Téléphone (facultatif)", companyType: "Type d'activité", cities: "Villes et zones d'activité", monthlyRides: "Volume mensuel approximatif de trajets", message: "Que souhaitez-vous organiser ?", submit: "Envoyer une demande professionnelle", sending: "Envoi de la demande...", error: "La demande ne peut pas être envoyée pour le moment. Réessayez.", successTitle: "Demande professionnelle reçue", successText: "Nous examinerons votre projet et vous contacterons à l'adresse e-mail indiquée.", reference: "Référence de la demande", types: [["hotel", "Hôtel / hébergement"], ["villa-agency", "Villas et gestion immobilière"], ["travel-agency", "Agence de voyages / DMC"], ["event", "Événements et production"], ["corporate", "Entreprise"], ["yacht-marina", "Yacht / marina"], ["other", "Autre"]] }
    },
    concierge: {
      tag: "Concierge aéroport", title: "Une arrivée qui commence avant de quitter le terminal", intro: "Pour les voyageurs qui souhaitent plus de sérénité à l'arrivée, Aurora peut coordonner le transfert et une assistance aéroport avec des partenaires locaux. Chaque proposition dépend de l'aéroport, du terminal, du vol et de la disponibilité du partenaire.", statement: "Un seul plan pour le vol, le terminal, les bagages, l'accueil et la destination.",
      packages: [
        { title: "Coordination d'arrivée", text: "Numéro de vol, terminal, point de rencontre et chauffeur sont organisés dans un même plan d'arrivée." },
        { title: "Arrivée accompagnée", text: "Sur demande, nous vérifions la disponibilité d'un partenaire pour l'accueil, l'aide aux bagages ou l'accompagnement vers le véhicule.", badge: "Via partenaire" },
        { title: "Demande VIP aéroport", text: "Pour les terminaux privés, salons et protocoles prioritaires, nous vérifions d'abord règles locales, prix et confirmation du partenaire.", badge: "Sur demande" }
      ],
      includedTitle: "Ce qu'il faut nous envoyer", included: ["Numéro de vol et date d'arrivée", "Nombre de passagers, enfants et bagages", "Destination et heure de prise en charge souhaitée", "Besoins particuliers, assistance ou langue", "Une personne de contact pouvant confirmer les détails"], note: "Nous ne présentons pas les services pilotes ou partenaires comme garantis. Nous vérifions d'abord la disponibilité réelle puis envoyons la confirmation.", cta: "Demander un plan d'arrivée"
    },
    help: {
      tag: "Sécurité et aide", title: "Une assistance claire avant, pendant et après votre trajet", intro: "Un transfert privé doit avoir un plan simple et une personne joignable. Aurora enregistre donc les changements opérationnels, affiche le statut via un lien privé et distingue une demande de modification d'une annulation réelle.",
      cards: [
        { title: "Un flux opérationnel vérifié", text: "Demande, confirmation, affectation du chauffeur, arrivée, début et fin du trajet sont enregistrés comme statuts distincts." },
        { title: "Suivi privé", text: "Seul le passager disposant d'un lien sécurisé à durée limitée voit le véhicule affecté et sa dernière position signalée." },
        { title: "Règles GPS pour les chauffeurs", text: "L'arrivée, le départ et la fin nécessitent une position GPS récente et un contexte géographique lorsque des coordonnées sont disponibles." },
        { title: "Des modifications sans incertitude", text: "Le passager peut envoyer une demande de modification ou d'annulation; l'équipe opérationnelle la confirme avant tout changement." }
      ],
      faqTitle: "Questions fréquentes", faqs: [
        { question: "Quand le prix est-il final ?", answer: "L'estimation du site sert de repère. Aurora confirme prix final, itinéraire et catégorie de véhicule avant paiement." },
        { question: "Que se passe-t-il si mon vol est en retard ?", answer: "Ajoutez votre numéro de vol. Après confirmation, nous suivons les changements opérationnels selon le service connecté et ajustons le plan de prise en charge." },
        { question: "Puis-je modifier ou annuler un trajet ?", answer: "Oui. Utilisez votre lien privé pour envoyer une demande; l'équipe confirme un nouvel horaire ou l'annulation." },
        { question: "Quand verrai-je le chauffeur ?", answer: "Le chauffeur et le véhicule apparaissent après affectation. La position n'est affichée que lorsque l'appareil chauffeur envoie une télémétrie récente." }
      ], cta: "Réserver avec un plan clair", support: "Contacter l'assistance"
    }
  }
} as const satisfies Record<Lang, PlatformContent>;

export function getPlatformContent(lang: Lang): PlatformContent {
  return platformPages[lang] || platformPages.en;
}
