import type { Lang } from "./site";

export type AuroraRoute = { slug: string; from: string; to: string; distanceKm: number; duration: string; fromPrice: string };

export const auroraRoutes: readonly AuroraRoute[] = [
  { slug: "dubrovnik-airport-to-old-town", from: "Dubrovnik Airport (DBV)", to: "Dubrovnik Old Town", distanceKm: 24, duration: "35 min", fromPrice: "35 EUR" },
  { slug: "dubrovnik-to-kotor", from: "Dubrovnik", to: "Kotor", distanceKm: 92, duration: "2 hr 20 min", fromPrice: "145 EUR" },
  { slug: "dubrovnik-to-mostar", from: "Dubrovnik", to: "Mostar", distanceKm: 145, duration: "2 hr 40 min", fromPrice: "210 EUR" },
  { slug: "dubrovnik-to-split", from: "Dubrovnik", to: "Split", distanceKm: 235, duration: "3 hr 45 min", fromPrice: "315 EUR" },
  { slug: "zagreb-airport-to-city", from: "Zagreb Airport (ZAG)", to: "Zagreb city centre", distanceKm: 17, duration: "25 min", fromPrice: "35 EUR" },
  { slug: "zagreb-to-vienna", from: "Zagreb", to: "Vienna", distanceKm: 375, duration: "4 hr 30 min", fromPrice: "490 EUR" },
];

const routeCopy = {
  hr: {
    tag: "Privatna ruta Aurora", indexTitle: "Popularne privatne rute kroz Hrvatsku i srednju Europu", indexIntro: "Odaberite polazište i odredište koje odgovara vašem planu. Prikazane udaljenosti i cijene služe kao testni orijentir; prije potvrde provjeravamo stvarnu rutu, granice, prtljagu i klasu vozila.", routeTitle: (route: AuroraRoute) => `Privatni transfer: ${route.from} do ${route.to}`,
    intro: (route: AuroraRoute) => `Putujte od ${route.from} do ${route.to} privatnim vozilom rezerviranim samo za vas i vašu grupu. Planiramo polazište, vrijeme, prtljagu i eventualna stajanja prije nego što potvrdimo vožnju.`,
    facts: ["Testna početna cijena", "Procijenjeno trajanje", "Procijenjena cestovna udaljenost"], includedTitle: "Što planiramo prije potvrde", included: ["Točnu adresu ili točku susreta", "Veličinu grupe i stvarnu količinu prtljage", "Klasi vozila koja odgovara putovanju", "Granice, pauze i posebne zahtjeve ako su potrebni"], cta: "Zatražite ovu rutu", faqTitle: "Pitanja za ovu rutu", faqs: [
      { question: "Je li prikazana cijena konačna?", answer: "Ne. To je testni početni iznos za pregled. Konačnu cijenu potvrđujemo nakon što provjerimo datum, vrijeme, grupu i konkretan plan vožnje." },
      { question: "Mogu li dodati stajanje?", answer: "Da. U napomeni navedite željena stajanja, a mi ćemo potvrditi kako utječu na vrijeme i cijenu." },
      { question: "Što je s prelaskom granice?", answer: "Za prekogranične rute provjeravamo raspored, uvjete prelaska i realno vrijeme putovanja prije potvrde." }
    ]
  },
  en: {
    tag: "Aurora private route", indexTitle: "Popular private routes across Croatia and Central Europe", indexIntro: "Choose the pickup point and destination that suit your plan. Distances and prices shown here are test guidance; before confirmation we check the actual route, borders, luggage and vehicle class.", routeTitle: (route: AuroraRoute) => `Private transfer: ${route.from} to ${route.to}`,
    intro: (route: AuroraRoute) => `Travel from ${route.from} to ${route.to} in a private vehicle reserved only for you and your party. We plan the pickup, timing, luggage and any agreed stops before confirming the ride.`,
    facts: ["Test starting price", "Estimated duration", "Estimated road distance"], includedTitle: "What we plan before confirmation", included: ["Your exact address or meeting point", "Group size and real luggage volume", "A vehicle class that fits the journey", "Borders, breaks and special requirements when needed"], cta: "Request this route", faqTitle: "Questions about this route", faqs: [
      { question: "Is the displayed price final?", answer: "No. It is a test starting amount for orientation. We confirm the final price after checking your date, time, party and actual ride plan." },
      { question: "Can I add a stop?", answer: "Yes. Add the requested stops in your message and we will confirm how they affect time and price." },
      { question: "What about border crossings?", answer: "For cross-border routes, we check timing, crossing conditions and realistic travel time before confirmation." }
    ]
  },
  de: {
    tag: "Aurora Privatrouten", indexTitle: "Beliebte Privatrouten durch Kroatien und Mitteleuropa", indexIntro: "Wählen Sie Abholort und Ziel passend zu Ihrem Plan. Die angezeigten Entfernungen und Preise sind Testwerte; vor der Bestätigung prüfen wir Route, Grenzen, Gepäck und Fahrzeugklasse.", routeTitle: (route: AuroraRoute) => `Privattransfer: ${route.from} nach ${route.to}`,
    intro: (route: AuroraRoute) => `Reisen Sie von ${route.from} nach ${route.to} in einem Privatfahrzeug, das nur für Sie und Ihre Gruppe reserviert ist. Vor der Bestätigung planen wir Abholung, Zeit, Gepäck und vereinbarte Stopps.`,
    facts: ["Test-Einstiegspreis", "Geschätzte Dauer", "Geschätzte Straßenentfernung"], includedTitle: "Was wir vor der Bestätigung planen", included: ["Ihre genaue Adresse oder den Treffpunkt", "Gruppengröße und tatsächliches Gepäckvolumen", "Eine passende Fahrzeugklasse", "Grenzen, Pausen und besondere Anforderungen bei Bedarf"], cta: "Diese Route anfragen", faqTitle: "Fragen zu dieser Route", faqs: [
      { question: "Ist der angezeigte Preis endgültig?", answer: "Nein. Es handelt sich um einen Test-Einstiegsbetrag zur Orientierung. Den Endpreis bestätigen wir nach Prüfung von Datum, Uhrzeit, Gruppe und tatsächlichem Fahrplan." },
      { question: "Kann ich einen Stopp hinzufügen?", answer: "Ja. Nennen Sie gewünschte Stopps in Ihrer Nachricht; wir bestätigen deren Einfluss auf Zeit und Preis." },
      { question: "Was gilt bei Grenzübertritten?", answer: "Bei grenzüberschreitenden Routen prüfen wir Zeitplan, Übergangsbedingungen und realistische Fahrzeit vor der Bestätigung." }
    ]
  },
  fr: {
    tag: "Itinéraire privé Aurora", indexTitle: "Itinéraires privés populaires à travers la Croatie et l'Europe centrale", indexIntro: "Choisissez le départ et la destination qui correspondent à votre programme. Les distances et prix affichés sont des repères de démonstration; avant confirmation, nous vérifions l'itinéraire réel, les frontières, les bagages et la catégorie de véhicule.", routeTitle: (route: AuroraRoute) => `Transfert privé : ${route.from} vers ${route.to}`,
    intro: (route: AuroraRoute) => `Voyagez de ${route.from} à ${route.to} dans un véhicule privé réservé uniquement pour vous et votre groupe. Nous planifions départ, horaire, bagages et arrêts convenus avant de confirmer le trajet.`,
    facts: ["Prix de départ de démonstration", "Durée estimée", "Distance routière estimée"], includedTitle: "Ce que nous préparons avant confirmation", included: ["Votre adresse exacte ou point de rencontre", "La taille du groupe et le volume réel des bagages", "Une catégorie de véhicule adaptée au voyage", "Frontières, pauses et besoins particuliers si nécessaire"], cta: "Demander cet itinéraire", faqTitle: "Questions sur cet itinéraire", faqs: [
      { question: "Le prix affiché est-il définitif ?", answer: "Non. C'est un montant de départ de démonstration. Nous confirmons le prix final après vérification de la date, de l'heure, du groupe et du plan réel." },
      { question: "Puis-je ajouter un arrêt ?", answer: "Oui. Indiquez les arrêts souhaités dans votre message et nous confirmerons leur impact sur le temps et le prix." },
      { question: "Qu'en est-il des passages de frontière ?", answer: "Pour les itinéraires transfrontaliers, nous vérifions horaire, conditions de passage et durée réaliste avant confirmation." }
    ]
  }
} as const;

export function getRouteBySlug(slug: string | undefined) {
  return auroraRoutes.find((route) => route.slug === slug);
}

export function getRouteCopy(lang: Lang) {
  return routeCopy[lang] || routeCopy.en;
}
