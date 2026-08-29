import type { Lang, Page } from "./site";

export const marketingPages = ["services", "destinations", "fleet", "about"] as const;
export type MarketingPage = (typeof marketingPages)[number];

type PageCard = {
  title: string;
  text: string;
  cta: string;
};

type MarketingPageContent = {
  tag: string;
  title: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: MarketingPage;
  cards: readonly PageCard[];
  detail: {
    tag: string;
    title: string;
    paragraphs: readonly string[];
    points: readonly string[];
    cta: string;
  };
  final: {
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryHref: MarketingPage;
  };
  seoDescription: string;
};

const pageCopy = {
  hr: {
    services: {
      tag: "Privatni transferi",
      title: "Svaka vožnja planirana je prema načinu na koji putujete",
      intro: "Aurora međunarodnim gostima omogućuje jednostavan, privatan prijevoz od vrata do vrata u Dubrovniku i cijeloj regiji. Od kasnovečernjeg slijetanja do dana s više zaustavljanja uz obalu, svaki transfer prilagođavamo vašem rasporedu, prtljazi i planu putovanja.",
      primaryCta: "Rezerviraj privatnu vožnju",
      secondaryCta: "Istraži destinacije",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Dolazak iz zračne luke bez stresa",
          text: "Pošaljite broj leta i detalje dolaska, a mi organiziramo preuzimanje na dogovorenom mjestu te izravnu vožnju do hotela, vile, apartmana ili marine. Nakon dugog putovanja ne morate se snalaziti s lokalnim prijevozom, redovima ni dodatnim stajanjima.",
          cta: "Isplaniraj prijevoz iz zračne luke"
        },
        {
          title: "Privatne međugradske vožnje",
          text: "Putujte iz Dubrovnika prema Splitu, Kotoru, Mostaru ili drugoj destinaciji bez dijeljenih kombija i krutog rasporeda. Vi birate polazište, vrijeme i ritam putovanja, a mi koordiniramo ugodnu vožnju od vrata do vrata.",
          cta: "Zatraži privatnu rutu"
        },
        {
          title: "Transferi do hotela, vila i marina",
          text: "Za prijavu u smještaj, polazak s jahte, dolazak kruzerom ili večernju rezervaciju, osiguravamo točnu i diskretnu vožnju prema vašem itineraru. U obzir uzimamo prtljagu, broj putnika i sve detalje koji olakšavaju dolazak.",
          cta: "Rezerviraj vožnju do smještaja"
        },
        {
          title: "Izleti i vožnje s više zaustavljanja",
          text: "Složite vlastiti dan uz more ili preko granice, s vremenom za vidikovce, ručak i mjesta koja zaista želite vidjeti. Recite nam ideju, a mi ćemo vam pomoći oblikovati privatnu rutu koja nije ograničena tuđim planom putovanja.",
          cta: "Kreiraj svoj privatni izlet"
        }
      ],
      detail: {
        tag: "Jednostavno od prve poruke",
        title: "Jedna privatna vožnja. Jedan jasan plan.",
        paragraphs: [
          "Svaki transfer počinje detaljima koji su putniku najvažniji: mjestom preuzimanja, odredištem, vremenom dolaska ili brojem leta, brojem putnika i eventualnim stajanjima. Zato nam se možete javiti iz bilo koje zemlje i prije puta znati kako izgleda sljedeći korak.",
          "Prije vožnje potvrđujemo dostupnost, konačnu cijenu i plan preuzimanja. Kada sletite, iskrcate se ili napustite smještaj, ne čekate da se plan posloži - vaš privatni transfer već ima svoje mjesto u itineraru."
        ],
        points: [
          "Vozilo rezervirano samo za vas i vašu grupu",
          "Klimatizirana udobnost i planiran prostor za prtljagu",
          "Jasan dogovor o ruti, vremenu i potvrđenoj cijeni",
          "Mogućnost jednosmjernog ili povratnog transfera"
        ],
        cta: "Provjeri dostupnost za svoje datume"
      },
      final: {
        title: "Neka prijevoz bude najlakši dio vašeg putovanja.",
        text: "Pošaljite rutu, datum i broj putnika. Aurora će vam potvrditi dostupnost i cijenu prije vožnje, kako biste mogli nastaviti planirati ostatak svog odmora.",
        primaryCta: "Zatraži transfer",
        secondaryCta: "Pogledaj vozila",
        secondaryHref: "fleet"
      },
      seoDescription: "Privatni transferi iz Dubrovnika za međunarodne putnike: zračna luka, hoteli, marine, međugradske vožnje i izleti po mjeri."
    },
    destinations: {
      tag: "Popularne privatne rute",
      title: "Krenite dalje od Dubrovnika, bez prepuštanja plana slučaju",
      intro: "Jadranska regija izgleda blizu na karti, ali putovanje često uključuje granice, prtljagu, promjene smještaja i rasporede koje nije lako uskladiti. Aurora vam daje privatnu, izravnu i osobno organiziranu vožnju do mjesta na kojem vaša sljedeća priča počinje.",
      primaryCta: "Isplaniraj svoju rutu",
      secondaryCta: "Pogledaj usluge",
      secondaryHref: "services",
      cards: [
        {
          title: "Zračna luka Dubrovnik do vašeg smještaja",
          text: "Od slijetanja do vrata hotela, vile, apartmana ili marine, organiziramo privatni dolazak bez presjedanja i zajedničkih stajanja. Idealno je za prvi dan odmora kada želite što prije ostaviti prtljagu i krenuti upoznavati grad.",
          cta: "Rezerviraj dolazak iz zračne luke"
        },
        {
          title: "Dubrovnik i Kotor",
          text: "Provedite dan ili nastavite putovanje prema Crnoj Gori uz privatni prijevoz koji prati vaš tempo. Putem granice i slikovitog Bokokotorskog zaljeva važni su dobar raspored, jasni detalji i dovoljno vremena za dolazak bez žurbe.",
          cta: "Zatraži rutu za Kotor"
        },
        {
          title: "Dubrovnik i Mostar",
          text: "Povežite obalu i Hercegovinu udobnom privatnom vožnjom, bilo da Mostar posjećujete na jednodnevnom izletu ili ga birate kao sljedeću stanicu putovanja. S vama unaprijed usklađujemo vrijeme polaska, stajanja i povratak.",
          cta: "Isplaniraj vožnju do Mostara"
        },
        {
          title: "Dubrovnik i Split",
          text: "Za putnike koji nastavljaju prema Dalmaciji, privatna vožnja znači manje logistike između dva velika odmora. Preuzimamo vas na adresi koja vam odgovara i vozimo izravno do sljedećeg hotela, luke, vile ili centra grada.",
          cta: "Zatraži transfer do Splita"
        }
      ],
      detail: {
        tag: "Putujte svojim ritmom",
        title: "Privatna ruta daje vam slobodu koju zajednički transfer ne može ponuditi.",
        paragraphs: [
          "Ne putuju svi jednako: neki putnici žele samo miran, izravan dolazak, a drugi žele stati na putu, ručati uz pogled ili nastaviti prema drugom gradu istog dana. Privatni transfer ostavlja prostor za plan koji odgovara vašem putovanju, a ne unaprijed zadanom rasporedu.",
          "Kod ruta prema susjednim zemljama važni su jasni podaci prije polaska. Pošaljite nam svoju rutu, datum i broj putnika, a mi ćemo potvrditi mogućnosti, organizaciju i konačnu cijenu prije rezervacije."
        ],
        points: [
          "Preuzimanje i dolazak na adresi koju vi odaberete",
          "Plan puta prilagođen vremenu leta, prijavi u smještaj ili nastavku putovanja",
          "Mogućnost povratne vožnje i više dogovorenih stajanja",
          "Udobna alternativa javnom prijevozu i dijeljenim shuttle vožnjama"
        ],
        cta: "Pošalji nam svoju rutu"
      },
      final: {
        title: "Vaša sljedeća destinacija zaslužuje dobar početak.",
        text: "Recite nam kamo idete, kada putujete i s koliko osoba. Pripremit ćemo jasan prijedlog privatnog transfera za vaš plan putovanja.",
        primaryCta: "Zatraži ponudu za rutu",
        secondaryCta: "Rezerviraj privatnu vožnju",
        secondaryHref: "services"
      },
      seoDescription: "Privatne rute iz Dubrovnika do zračne luke, Kotora, Mostara, Splita i drugih destinacija u Hrvatskoj i regiji."
    },
    fleet: {
      tag: "Vozila Aurora",
      title: "Udobnost koja dobro putuje, odakle god dolazite",
      intro: "Nakon međunarodnog leta, dugog dana obilaska ili promjene nekoliko hotela, najvažnije je imati miran i uredan prostor za put. Naša moderna, klimatizirana vozila biramo prema vašoj grupi, prtljazi i ruti prije nego što potvrdimo transfer.",
      primaryCta: "Rezerviraj svoje vozilo",
      secondaryCta: "Isplaniraj rutu",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Udobnost spremna za zračnu luku",
          text: "Prijevoz nakon leta treba biti jednostavan: dovoljno udoban za predah, klimatiziran i spreman za izravnu vožnju do smještaja. Zato prije potvrde provjeravamo vrijeme dolaska, broj putnika i sve što vam je potrebno za dobar početak boravka.",
          cta: "Rezerviraj prijevoz iz zračne luke"
        },
        {
          title: "Prostor za putnike i prtljagu",
          text: "Parovi, obitelji, prijatelji i poslovni putnici ne putuju s istom količinom prtljage. Kada nam pošaljete broj putnika i detalje prtljage, možemo uskladiti vozilo koje odgovara stvarnom putovanju, a ne samo najkraćoj ruti.",
          cta: "Pošalji detalje svoje grupe"
        },
        {
          title: "Mirna vožnja na dužim rutama",
          text: "Za putovanja prema Kotoru, Mostaru, Splitu ili drugim gradovima, udobnost nije samo dodatak. Ona čini razliku između zamornog premještanja i dijela putovanja u kojem se možete opustiti, pogledati krajolik ili pripremiti za sljedeći dolazak.",
          cta: "Zatraži vozilo za dužu rutu"
        },
        {
          title: "Praktično za privatne izlete",
          text: "Za dan s više zaustavljanja trebate vozilo koje prati vaš plan, a ne plan koji se prilagođava vozilu. Organiziramo privatnu vožnju za razgledavanje, ručak, kupanje, posjet vinariji ili spontanije zaustavljanje uz obalu.",
          cta: "Isplaniraj privatni izlet"
        }
      ],
      detail: {
        tag: "Pravi odabir prije potvrde",
        title: "Vozilo usklađujemo s putovanjem, ne obratno.",
        paragraphs: [
          "Umjesto da vam ponudimo nejasan izbor, najprije želimo razumjeti kako putujete. Broj putnika, veličina prtljage, dječja oprema, duljina rute i eventualni povratak pomažu nam potvrditi odgovarajuće vozilo i ugodniju vožnju.",
          "Tako unaprijed znate da je privatni transfer spreman za stvarni plan: od kratke vožnje do starog grada do regionalne rute koja traje nekoliko sati."
        ],
        points: [
          "Moderna i klimatizirana vozila za privatne transfere",
          "Odabir vozila prema putnicima, prtljazi i duljini rute",
          "Čist, uredan prostor za odmor nakon leta ili tijekom puta",
          "Privatna vožnja bez dijeljenja vozila s drugim gostima"
        ],
        cta: "Recite nam koliko vas putuje"
      },
      final: {
        title: "Dobar transfer počinje vozilom koje vam stvarno odgovara.",
        text: "Pošaljite nam datum, rutu, broj putnika i prtljagu. Potvrdit ćemo odgovarajuću opciju prije nego što rezervirate.",
        primaryCta: "Zatraži preporuku vozila",
        secondaryCta: "Pogledaj usluge",
        secondaryHref: "services"
      },
      seoDescription: "Moderna, klimatizirana vozila Aurora Dubrovnik Transfers za dolaske iz zračne luke, duže rute, obitelji i privatne izlete."
    },
    about: {
      tag: "O Aurora Transfers",
      title: "Bolji doček u Dubrovniku počinje boljim transferom",
      intro: "Aurora je stvorena za goste iz cijelog svijeta koji žele da prvi i posljednji kilometri putovanja budu jednostavni. Kombiniramo profesionalne vozače, jasnu komunikaciju i privatnu vožnju kako biste se nakon dolaska mogli usredotočiti na odmor, posao ili iskustvo koje vas čeka.",
      primaryCta: "Isplaniraj svoj transfer",
      secondaryCta: "Pogledaj destinacije",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Pripremljeni za međunarodne dolaske",
          text: "Znamo da putnici ne dolaze samo iz susjednog grada: dolaze nakon dugih letova, s različitim vremenskim zonama, djecom, prtljagom i planovima koji se mijenjaju. Zato želimo da dogovor prije vožnje bude jednostavan, razumljiv i bez pretpostavki.",
          cta: "Rezerviraj svoj dolazak"
        },
        {
          title: "Jasna komunikacija prije puta",
          text: "Dobar transfer ne počinje kada automobil stigne, nego kada znate što je dogovoreno. Prije potvrde s vama provjeravamo rutu, termin, broj putnika i cijenu, kako biste u svoj itinerar mogli upisati jednu sigurnu stvar manje za brinuti.",
          cta: "Pošalji detalje putovanja"
        },
        {
          title: "Profesionalna vožnja s osobnim pristupom",
          text: "Svaka grupa putuje drugačije, pa se ne odnosimo prema vožnji kao prema standardnom zadatku. Bilo da stižete poslovno, na medeni mjesec, obiteljski odmor ili jedrenje, prilagođavamo organizaciju onome što vam tog dana najviše treba.",
          cta: "Dogovori privatnu vožnju"
        },
        {
          title: "Vrijeme putnika je važno",
          text: "Vaš dolazak, prijava u smještaj, polazak kruzera i nastavak prema drugom gradu dio su većeg plana. Aurora pomaže da prijevoz ne postane nepredvidiv dio dana, već mirna poveznica između točaka na vašem putovanju.",
          cta: "Provjeri dostupnost"
        }
      ],
      detail: {
        tag: "Detalji koje putnici pamte",
        title: "Profesionalno organizirano, a dovoljno osobno da se osjećate zbrinuto.",
        paragraphs: [
          "Vjerujemo da vrhunska usluga prijevoza nije samo vožnja od točke A do točke B. To je osjećaj da vas netko čeka, da postoji jasan plan i da možete zatvoriti jednu logističku stavku čim pošaljete upit.",
          "Od prve poruke do dolaska na odredište, naš je cilj pružiti putnicima iz cijelog svijeta uslugu koja je pouzdana, pristupačna i dovoljno fleksibilna za stvarni život na putu."
        ],
        points: [
          "Profesionalni i ljubazni vozači",
          "Privatni transferi za poslovna i turistička putovanja",
          "Fiksna potvrda cijene prije vožnje",
          "Praćenje detalja dolaska i planiranje prema vašoj ruti"
        ],
        cta: "Upoznajmo vaš plan putovanja"
      },
      final: {
        title: "Kad je plan jasan, putovanje počinje opuštenije.",
        text: "Pošaljite nam osnovne detalje svoje vožnje. Aurora će se pobrinuti za prijevoz, a vi se možete vratiti onome zbog čega ste došli u Dubrovnik.",
        primaryCta: "Zatraži privatni transfer",
        secondaryCta: "Pogledaj vozila",
        secondaryHref: "fleet"
      },
      seoDescription: "Upoznajte Aurora Dubrovnik Transfers, privatnu transfer agenciju za međunarodne goste koji putuju u Dubrovnik, Hrvatsku i regiju."
    }
  },
  en: {
    services: {
      tag: "Private transfer services",
      title: "Every ride, planned around the way you travel",
      intro: "Aurora gives international guests a simple, private way to move through Dubrovnik and the wider region. From a late-evening landing to a day with several coastal stops, each transfer is shaped around your schedule, luggage and travel plans.",
      primaryCta: "Book your private ride",
      secondaryCta: "Explore destinations",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Airport arrivals without the airport rush",
          text: "Share your flight details and arrival plan, and we will arrange pickup at the agreed point with a direct ride to your hotel, villa, apartment or marina. After a long journey, there is no need to work out local transport, wait in lines or add unnecessary stops.",
          cta: "Plan an airport pickup"
        },
        {
          title: "Private city-to-city travel",
          text: "Travel from Dubrovnik to Split, Kotor, Mostar or another destination without shared vans or a rigid timetable. You choose the pickup point, time and pace; we coordinate a comfortable, door-to-door ride around the journey you want to make.",
          cta: "Request a private route"
        },
        {
          title: "Hotel, villa and marina transfers",
          text: "For a check-in, a yacht departure, a cruise arrival or an evening reservation, we provide a punctual and discreet ride that follows your itinerary. We consider luggage, group size and the practical details that make arriving feel effortless.",
          cta: "Book a ride to your stay"
        },
        {
          title: "Custom days and multi-stop rides",
          text: "Build your own day along the coast or across the border, with time for viewpoints, lunch and places you genuinely want to see. Tell us the idea and we will help shape a private route that is not limited by somebody else's travel plan.",
          cta: "Create a private day out"
        }
      ],
      detail: {
        tag: "Simple from the first message",
        title: "One private ride. One clear plan.",
        paragraphs: [
          "Every transfer starts with the details that matter to a traveller: pickup point, destination, arrival time or flight number, passenger count and any planned stops. That means you can contact us from anywhere in the world and know what the next step looks like before you travel.",
          "Before the ride, we confirm availability, the final price and the pickup plan. When you land, disembark or leave your accommodation, you are not waiting for the logistics to come together - your private transfer already has its place in the itinerary."
        ],
        points: [
          "A vehicle reserved only for you and your party",
          "Air-conditioned comfort with luggage space planned in advance",
          "A clear agreement on route, timing and confirmed price",
          "One-way and return transfers available for your trip"
        ],
        cta: "Check availability for your dates"
      },
      final: {
        title: "Make transport the easiest part of your trip.",
        text: "Send us your route, date and passenger count. Aurora will confirm availability and the price before your ride, so you can get on with planning the rest of your stay.",
        primaryCta: "Request a transfer",
        secondaryCta: "View our vehicles",
        secondaryHref: "fleet"
      },
      seoDescription: "Private transfers from Dubrovnik for international travellers: airport arrivals, hotels, marinas, intercity rides and tailor-made tours."
    },
    destinations: {
      tag: "Popular private routes",
      title: "Go beyond Dubrovnik, without leaving your plans to chance",
      intro: "The Adriatic region looks close on a map, but travel can involve borders, luggage, hotel changes and schedules that are not always easy to coordinate. Aurora gives you a private, direct and personally planned ride to the place where your next chapter begins.",
      primaryCta: "Plan your route",
      secondaryCta: "See transfer services",
      secondaryHref: "services",
      cards: [
        {
          title: "Dubrovnik Airport to your stay",
          text: "From landing to the door of your hotel, villa, apartment or marina, we arrange a private arrival with no changes or shared stops. It is ideal for the first day of a holiday, when you want to drop your bags and start enjoying the city sooner.",
          cta: "Book an airport arrival"
        },
        {
          title: "Dubrovnik and Kotor",
          text: "Spend a day in Montenegro or continue your journey to Kotor with private transport that follows your pace. The border and the scenic Bay of Kotor deserve a sensible plan, clear details and enough time to arrive without feeling rushed.",
          cta: "Request a Kotor route"
        },
        {
          title: "Dubrovnik and Mostar",
          text: "Connect the coast with Herzegovina in a comfortable private ride, whether Mostar is a day trip or the next stop on a longer itinerary. We coordinate departure time, planned stops and the return journey around the way you want to travel.",
          cta: "Plan a ride to Mostar"
        },
        {
          title: "Dubrovnik and Split",
          text: "For travellers continuing along the Dalmatian coast, a private ride removes the friction between two major holiday stops. We collect you from the address that works for you and take you directly to your next hotel, port, villa or city centre.",
          cta: "Request a Split transfer"
        }
      ],
      detail: {
        tag: "Travel at your pace",
        title: "A private route gives you freedom that a shared transfer cannot.",
        paragraphs: [
          "Not every traveller moves in the same way: some want a calm, direct arrival, while others want to stop for lunch, take in a view or continue to another city on the same day. A private transfer leaves room for the plan that suits your trip, not a timetable designed for everyone else.",
          "For routes into neighbouring countries, clear information before departure matters. Send us your route, date and passenger count, and we will confirm the options, organisation and final price before you book."
        ],
        points: [
          "Pickup and drop-off at the addresses you choose",
          "A plan shaped around flights, hotel check-in or onward travel",
          "Return journeys and agreed multi-stop routes available",
          "A comfortable alternative to public transport and shared shuttles"
        ],
        cta: "Send us your route"
      },
      final: {
        title: "Your next destination deserves a good beginning.",
        text: "Tell us where you are going, when you travel and how many people are in your party. We will prepare a clear private-transfer proposal for your itinerary.",
        primaryCta: "Request a route quote",
        secondaryCta: "Book a private ride",
        secondaryHref: "services"
      },
      seoDescription: "Private routes from Dubrovnik to the airport, Kotor, Mostar, Split and destinations across Croatia and the Adriatic region."
    },
    fleet: {
      tag: "Aurora vehicles",
      title: "Comfort that travels well, wherever you are coming from",
      intro: "After an international flight, a full day of sightseeing or a change between hotels, what matters most is a calm, clean space to travel in. We match our modern, air-conditioned vehicles to your party, luggage and route before confirming the transfer.",
      primaryCta: "Reserve your vehicle",
      secondaryCta: "Plan your route",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Airport-ready comfort",
          text: "Transport after a flight should feel straightforward: comfortable enough to reset, air-conditioned and ready for a direct ride to your accommodation. Before confirmation, we check arrival time, passenger count and the details that help your stay start well.",
          cta: "Book airport transport"
        },
        {
          title: "Room for people and luggage",
          text: "Couples, families, friends and business travellers do not arrive with the same amount of luggage. When you share your passenger count and baggage details, we can match the vehicle to the real journey, not just the shortest route on a map.",
          cta: "Share your group details"
        },
        {
          title: "A calmer way to cover longer routes",
          text: "For travel to Kotor, Mostar, Split or other cities, comfort is more than an extra. It is the difference between a tiring relocation and part of the trip where you can relax, take in the scenery or prepare for your next arrival.",
          cta: "Request a vehicle for a longer route"
        },
        {
          title: "Practical for private touring",
          text: "A day with several stops needs a vehicle that follows your plan, not a plan that bends around the vehicle. We arrange private rides for sightseeing, lunch, swimming, a winery visit or an unplanned pause along the coast.",
          cta: "Plan a private day out"
        }
      ],
      detail: {
        tag: "The right fit before confirmation",
        title: "We match the vehicle to the journey, not the other way around.",
        paragraphs: [
          "Rather than offer an unclear choice, we first want to understand how you are travelling. Passenger count, luggage size, children's equipment, route length and a possible return journey help us confirm the suitable vehicle and create a more comfortable ride.",
          "That way, you know your private transfer is ready for the real plan: from a short ride to the Old Town to a regional journey that lasts several hours."
        ],
        points: [
          "Modern, air-conditioned vehicles for private transfers",
          "Vehicle selection based on passengers, luggage and route length",
          "A clean, comfortable space after a flight or during a longer ride",
          "A private ride without sharing the vehicle with other guests"
        ],
        cta: "Tell us how many people are travelling"
      },
      final: {
        title: "A good transfer starts with a vehicle that truly fits.",
        text: "Send us the date, route, passenger count and luggage details. We will confirm the suitable option before you book.",
        primaryCta: "Request a vehicle recommendation",
        secondaryCta: "See transfer services",
        secondaryHref: "services"
      },
      seoDescription: "Modern, air-conditioned Aurora Dubrovnik Transfer vehicles for airport arrivals, longer routes, families and private touring."
    },
    about: {
      tag: "About Aurora Transfers",
      title: "A better welcome to Dubrovnik starts with a better transfer",
      intro: "Aurora was created for guests from around the world who want the first and final kilometres of a trip to feel simple. We combine professional drivers, clear communication and private travel so that, once you arrive, you can focus on your holiday, work or the experience ahead.",
      primaryCta: "Plan your transfer",
      secondaryCta: "Explore destinations",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Prepared for international arrivals",
          text: "We know travellers do not always arrive from the next town. They arrive after long flights, across time zones, with children, luggage and plans that sometimes change. That is why we make the conversation before your ride simple, clear and free from assumptions.",
          cta: "Book your arrival"
        },
        {
          title: "Clear communication before you travel",
          text: "A good transfer does not begin when the vehicle pulls up; it begins when you know what has been arranged. Before confirmation, we check the route, timing, passenger count and price, giving you one reliable detail to add to your itinerary.",
          cta: "Send your travel details"
        },
        {
          title: "Professional driving, personal service",
          text: "Every party travels differently, so we do not treat each ride as a standard task. Whether you are arriving for business, a honeymoon, a family holiday or a sailing trip, we shape the arrangement around what matters most to you that day.",
          cta: "Arrange a private ride"
        },
        {
          title: "Your time matters",
          text: "Your arrival, hotel check-in, cruise departure and onward journey are all part of a bigger plan. Aurora helps make transport a calm connection between those moments, instead of an unpredictable part of the day.",
          cta: "Check availability"
        }
      ],
      detail: {
        tag: "The details travellers remember",
        title: "Professionally organised, personal enough to make you feel looked after.",
        paragraphs: [
          "We believe excellent transfer service is more than travel from point A to point B. It is the feeling that someone is expecting you, that there is a clear plan and that you can close one logistical task as soon as you send your request.",
          "From the first message to your destination, our aim is to give travellers from around the world a service that is reliable, approachable and flexible enough for real life on the road."
        ],
        points: [
          "Professional, friendly drivers",
          "Private transfers for business and leisure travel",
          "A fixed price confirmed before the ride",
          "Arrival details considered when planning your route"
        ],
        cta: "Tell us about your travel plans"
      },
      final: {
        title: "When the plan is clear, the journey starts more calmly.",
        text: "Send us the essentials of your ride. Aurora will take care of the transport, leaving you free to return to the reason you came to Dubrovnik.",
        primaryCta: "Request a private transfer",
        secondaryCta: "View our vehicles",
        secondaryHref: "fleet"
      },
      seoDescription: "Meet Aurora Dubrovnik Transfers, a private transfer agency for international travellers visiting Dubrovnik, Croatia and the Adriatic region."
    }
  },
  de: {
    services: {
      tag: "Private Transfers",
      title: "Jede Fahrt wird so geplant, wie Sie reisen möchten",
      intro: "Aurora bietet internationalen Gästen eine einfache, private Möglichkeit, Dubrovnik und die gesamte Region zu entdecken. Von einer späten Landung bis zu einem Tag mit mehreren Stopps an der Küste richten wir jeden Transfer nach Ihrem Zeitplan, Gepäck und Reiseplan aus.",
      primaryCta: "Private Fahrt buchen",
      secondaryCta: "Ziele entdecken",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Entspannt vom Flughafen ankommen",
          text: "Senden Sie uns Flugnummer und Ankunftsdetails, und wir organisieren die Abholung am vereinbarten Treffpunkt sowie die direkte Fahrt zu Hotel, Villa, Apartment oder Marina. Nach einer langen Reise müssen Sie weder den Nahverkehr suchen noch in Warteschlangen stehen oder zusätzliche Stopps einplanen.",
          cta: "Flughafenabholung planen"
        },
        {
          title: "Private Fahrten zwischen Städten",
          text: "Fahren Sie von Dubrovnik nach Split, Kotor, Mostar oder zu einem anderen Ziel ohne geteilte Vans und starre Fahrpläne. Sie bestimmen Abholort, Zeit und Tempo; wir organisieren eine komfortable Tür-zu-Tür-Fahrt passend zu Ihrer Reise.",
          cta: "Private Route anfragen"
        },
        {
          title: "Transfers zu Hotel, Villa und Marina",
          text: "Ob Check-in, Abfahrt von der Yacht, Ankunft mit dem Kreuzfahrtschiff oder eine Abendreservierung: Wir sorgen für eine pünktliche und diskrete Fahrt nach Ihrem Reiseplan. Gepäck, Gruppengröße und die praktischen Details einer entspannten Ankunft werden berücksichtigt.",
          cta: "Fahrt zur Unterkunft buchen"
        },
        {
          title: "Individuelle Tage und Fahrten mit mehreren Stopps",
          text: "Gestalten Sie Ihren eigenen Tag an der Küste oder über die Grenze hinweg, mit Zeit für Aussichtspunkte, Mittagessen und Orte, die Sie wirklich sehen möchten. Nennen Sie uns Ihre Idee, und wir helfen Ihnen bei einer privaten Route ohne fremden Reiseplan.",
          cta: "Privaten Ausflug gestalten"
        }
      ],
      detail: {
        tag: "Einfach ab der ersten Nachricht",
        title: "Eine private Fahrt. Ein klarer Plan.",
        paragraphs: [
          "Jeder Transfer beginnt mit den Informationen, die Reisenden wichtig sind: Abholort, Ziel, Ankunftszeit oder Flugnummer, Personenzahl und geplante Stopps. So können Sie uns von überall auf der Welt kontaktieren und wissen schon vor der Reise, wie der nächste Schritt aussieht.",
          "Vor der Fahrt bestätigen wir Verfügbarkeit, Endpreis und Abholplan. Wenn Sie landen, von Bord gehen oder Ihre Unterkunft verlassen, müssen Sie nicht erst auf die Organisation warten - Ihr Privattransfer hat bereits seinen festen Platz im Reiseplan."
        ],
        points: [
          "Ein Fahrzeug nur für Sie und Ihre Reisegruppe",
          "Klimatisierter Komfort mit vorab geplantem Platz für Gepäck",
          "Klare Abstimmung zu Route, Zeit und bestätigtem Preis",
          "Einfacher Transfer oder Hin- und Rückfahrt möglich"
        ],
        cta: "Verfügbarkeit für Ihre Reisedaten prüfen"
      },
      final: {
        title: "Machen Sie den Transfer zum einfachsten Teil Ihrer Reise.",
        text: "Senden Sie uns Route, Datum und Personenzahl. Aurora bestätigt Verfügbarkeit und Preis vor der Fahrt, damit Sie den Rest Ihres Aufenthalts in Ruhe planen können.",
        primaryCta: "Transfer anfragen",
        secondaryCta: "Fahrzeuge ansehen",
        secondaryHref: "fleet"
      },
      seoDescription: "Private Transfers ab Dubrovnik für internationale Reisende: Flughafen, Hotels, Marinas, Fahrten zwischen Städten und individuelle Ausflüge."
    },
    destinations: {
      tag: "Beliebte Privatrouten",
      title: "Reisen Sie über Dubrovnik hinaus, ohne Ihren Plan dem Zufall zu überlassen",
      intro: "Die Adriaregion wirkt auf der Karte nah, doch Reisen kann Grenzen, Gepäck, Hotelwechsel und schwer koordinierbare Zeiten einschließen. Aurora bietet Ihnen eine private, direkte und persönlich geplante Fahrt zu dem Ort, an dem Ihr nächster Reiseabschnitt beginnt.",
      primaryCta: "Route planen",
      secondaryCta: "Transferleistungen ansehen",
      secondaryHref: "services",
      cards: [
        {
          title: "Vom Flughafen Dubrovnik zu Ihrer Unterkunft",
          text: "Von der Landung bis zur Tür Ihres Hotels, Ihrer Villa, Ihres Apartments oder Ihrer Marina organisieren wir eine private Ankunft ohne Umstiege und geteilte Stopps. Ideal für den ersten Urlaubstag, wenn Sie Ihr Gepäck abstellen und die Stadt schneller genießen möchten.",
          cta: "Flughafenankunft buchen"
        },
        {
          title: "Dubrovnik und Kotor",
          text: "Verbringen Sie einen Tag in Montenegro oder reisen Sie mit einem Privattransfer weiter nach Kotor, ganz in Ihrem Tempo. Die Grenze und die malerische Bucht von Kotor verlangen einen guten Plan, klare Angaben und genug Zeit für eine entspannte Ankunft.",
          cta: "Route nach Kotor anfragen"
        },
        {
          title: "Dubrovnik und Mostar",
          text: "Verbinden Sie die Küste mit der Herzegowina auf einer komfortablen Privatfahrt, ob Mostar als Tagesausflug oder als nächste Station Ihrer Reise geplant ist. Abfahrtszeit, Stopps und Rückfahrt stimmen wir vorab mit Ihnen ab.",
          cta: "Fahrt nach Mostar planen"
        },
        {
          title: "Dubrovnik und Split",
          text: "Für Reisende entlang der dalmatinischen Küste nimmt eine Privatfahrt die Logistik zwischen zwei großen Urlaubsstopps ab. Wir holen Sie an der gewünschten Adresse ab und fahren direkt zu Ihrem nächsten Hotel, Hafen, Ihrer Villa oder ins Stadtzentrum.",
          cta: "Transfer nach Split anfragen"
        }
      ],
      detail: {
        tag: "Reisen in Ihrem Tempo",
        title: "Eine private Route gibt Ihnen Freiraum, den ein Sammeltransfer nicht bieten kann.",
        paragraphs: [
          "Nicht alle Reisenden sind gleich unterwegs: Manche wünschen eine ruhige, direkte Ankunft, andere möchten unterwegs essen, einen Ausblick genießen oder noch am selben Tag in eine andere Stadt weiterfahren. Ein Privattransfer lässt Raum für den Plan, der zu Ihrer Reise passt, statt für einen Fahrplan für alle.",
          "Bei Fahrten in Nachbarländer sind klare Angaben vor der Abfahrt besonders wichtig. Senden Sie uns Route, Datum und Personenzahl; wir bestätigen Möglichkeiten, Organisation und Endpreis vor Ihrer Buchung."
        ],
        points: [
          "Abholung und Ankunft an den von Ihnen gewählten Adressen",
          "Ein Plan abgestimmt auf Flug, Hotel-Check-in oder Weiterreise",
          "Rückfahrten und vereinbarte Routen mit mehreren Stopps möglich",
          "Komfortable Alternative zu öffentlichen Verkehrsmitteln und Shuttles"
        ],
        cta: "Ihre Route senden"
      },
      final: {
        title: "Ihr nächstes Ziel verdient einen guten Beginn.",
        text: "Sagen Sie uns, wohin Sie reisen, wann Sie unterwegs sind und wie viele Personen mitfahren. Wir erstellen einen klaren Vorschlag für Ihren Privattransfer.",
        primaryCta: "Routenangebot anfragen",
        secondaryCta: "Private Fahrt buchen",
        secondaryHref: "services"
      },
      seoDescription: "Private Routen ab Dubrovnik zum Flughafen, nach Kotor, Mostar, Split und zu Zielen in Kroatien und der gesamten Adriaregion."
    },
    fleet: {
      tag: "Aurora Fahrzeuge",
      title: "Komfort, der gut reist - ganz gleich, woher Sie kommen",
      intro: "Nach einem internationalen Flug, einem langen Besichtigungstag oder einem Hotelwechsel zählt vor allem ein ruhiger, sauberer Ort zum Reisen. Wir stimmen unsere modernen, klimatisierten Fahrzeuge vor der Bestätigung auf Ihre Gruppe, Ihr Gepäck und Ihre Route ab.",
      primaryCta: "Fahrzeug reservieren",
      secondaryCta: "Route planen",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Komfort bereit für den Flughafen",
          text: "Der Transfer nach einem Flug soll unkompliziert sein: angenehm zum Durchatmen, klimatisiert und bereit für die direkte Fahrt zur Unterkunft. Vor der Bestätigung prüfen wir Ankunftszeit, Personenzahl und alle Details für einen guten Start Ihres Aufenthalts.",
          cta: "Flughafentransport buchen"
        },
        {
          title: "Platz für Menschen und Gepäck",
          text: "Paare, Familien, Freundesgruppen und Geschäftsreisende kommen nicht mit derselben Menge Gepäck an. Wenn Sie Personenzahl und Gepäckdetails teilen, können wir das Fahrzeug an die tatsächliche Reise anpassen, nicht nur an die kürzeste Strecke auf der Karte.",
          cta: "Gruppendetails senden"
        },
        {
          title: "Entspannter auf langen Strecken",
          text: "Für Fahrten nach Kotor, Mostar, Split oder in andere Städte ist Komfort mehr als ein Extra. Er macht den Unterschied zwischen einem anstrengenden Ortswechsel und einem Teil der Reise, in dem Sie sich entspannen, die Landschaft sehen oder die nächste Ankunft vorbereiten können.",
          cta: "Fahrzeug für längere Strecke anfragen"
        },
        {
          title: "Praktisch für private Ausflüge",
          text: "Ein Tag mit mehreren Stopps braucht ein Fahrzeug, das Ihrem Plan folgt, nicht umgekehrt. Wir organisieren private Fahrten für Besichtigungen, Mittagessen, Baden, einen Weingutbesuch oder eine ungeplante Pause an der Küste.",
          cta: "Privaten Ausflug planen"
        }
      ],
      detail: {
        tag: "Passend ausgewählt vor der Bestätigung",
        title: "Wir wählen das Fahrzeug für die Reise aus, nicht die Reise für das Fahrzeug.",
        paragraphs: [
          "Statt eine unklare Auswahl anzubieten, möchten wir zuerst verstehen, wie Sie reisen. Personenzahl, Gepäckgröße, Kinderausstattung, Routenlänge und eine mögliche Rückfahrt helfen uns, das passende Fahrzeug und eine angenehmere Fahrt zu bestätigen.",
          "So wissen Sie im Voraus, dass Ihr Privattransfer für den echten Plan bereit ist: von der kurzen Fahrt in die Altstadt bis zur regionalen Reise über mehrere Stunden."
        ],
        points: [
          "Moderne, klimatisierte Fahrzeuge für private Transfers",
          "Fahrzeugauswahl nach Personen, Gepäck und Routenlänge",
          "Sauberer, komfortabler Raum nach dem Flug oder auf langer Strecke",
          "Private Fahrt ohne andere Gäste im Fahrzeug"
        ],
        cta: "Sagen Sie uns, wie viele Personen reisen"
      },
      final: {
        title: "Ein guter Transfer beginnt mit einem Fahrzeug, das wirklich passt.",
        text: "Senden Sie uns Datum, Route, Personenzahl und Gepäckdetails. Wir bestätigen die passende Option, bevor Sie buchen.",
        primaryCta: "Fahrzeugempfehlung anfragen",
        secondaryCta: "Transferleistungen ansehen",
        secondaryHref: "services"
      },
      seoDescription: "Moderne, klimatisierte Aurora-Fahrzeuge für Flughafentransfers, längere Routen, Familien und private Ausflüge ab Dubrovnik."
    },
    about: {
      tag: "Über Aurora Transfers",
      title: "Ein besserer Empfang in Dubrovnik beginnt mit einem besseren Transfer",
      intro: "Aurora wurde für Gäste aus aller Welt geschaffen, die die ersten und letzten Kilometer ihrer Reise einfach erleben möchten. Wir verbinden professionelle Fahrer, klare Kommunikation und private Fahrten, damit Sie sich nach der Ankunft auf Urlaub, Arbeit oder das nächste Erlebnis konzentrieren können.",
      primaryCta: "Transfer planen",
      secondaryCta: "Ziele entdecken",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Vorbereitet auf internationale Ankünfte",
          text: "Wir wissen, dass Reisende nicht immer aus der Nachbarstadt ankommen. Sie landen nach langen Flügen, über Zeitzonen hinweg, mit Kindern, Gepäck und Plänen, die sich manchmal ändern. Deshalb halten wir die Abstimmung vor der Fahrt einfach, verständlich und frei von Annahmen.",
          cta: "Ankunft buchen"
        },
        {
          title: "Klare Kommunikation vor der Reise",
          text: "Ein guter Transfer beginnt nicht erst, wenn das Fahrzeug vorfährt, sondern wenn Sie wissen, was vereinbart wurde. Vor der Bestätigung prüfen wir Route, Zeit, Personenzahl und Preis - ein verlässlicher Punkt mehr in Ihrem Reiseplan.",
          cta: "Reisedetails senden"
        },
        {
          title: "Professionell fahren, persönlich betreuen",
          text: "Jede Gruppe reist anders, deshalb behandeln wir keine Fahrt wie eine Standardaufgabe. Ob Geschäftsreise, Hochzeitsreise, Familienurlaub oder Segeltörn: Wir richten die Organisation nach dem aus, was Ihnen an diesem Tag wichtig ist.",
          cta: "Private Fahrt organisieren"
        },
        {
          title: "Ihre Zeit zählt",
          text: "Ankunft, Hotel-Check-in, Abfahrt des Kreuzfahrtschiffs und Weiterreise gehören alle zu einem größeren Plan. Aurora macht den Transfer zu einer ruhigen Verbindung zwischen diesen Momenten, nicht zu einem unvorhersehbaren Teil Ihres Tages.",
          cta: "Verfügbarkeit prüfen"
        }
      ],
      detail: {
        tag: "Details, an die Reisende sich erinnern",
        title: "Professionell organisiert und persönlich genug, damit Sie sich gut betreut fühlen.",
        paragraphs: [
          "Für uns ist ein hervorragender Transferservice mehr als die Fahrt von A nach B. Es ist das Gefühl, dass Sie erwartet werden, dass es einen klaren Plan gibt und dass eine organisatorische Aufgabe erledigt ist, sobald Sie Ihre Anfrage senden.",
          "Von der ersten Nachricht bis zum Ziel möchten wir Reisenden aus aller Welt einen Service bieten, der zuverlässig, zugänglich und flexibel genug für das wirkliche Leben unterwegs ist."
        ],
        points: [
          "Professionelle und freundliche Fahrer",
          "Private Transfers für Geschäfts- und Urlaubsreisen",
          "Festpreis, der vor der Fahrt bestätigt wird",
          "Ankunftsdetails werden bei der Routenplanung berücksichtigt"
        ],
        cta: "Erzählen Sie uns von Ihren Reiseplänen"
      },
      final: {
        title: "Wenn der Plan klar ist, beginnt die Reise entspannter.",
        text: "Senden Sie uns die wichtigsten Details Ihrer Fahrt. Aurora kümmert sich um den Transfer, damit Sie sich wieder dem Grund Ihrer Reise nach Dubrovnik widmen können.",
        primaryCta: "Privattransfer anfragen",
        secondaryCta: "Fahrzeuge ansehen",
        secondaryHref: "fleet"
      },
      seoDescription: "Lernen Sie Aurora Dubrovnik Transfers kennen, Ihre Agentur für private Transfers für internationale Reisende in Dubrovnik, Kroatien und der Adriaregion."
    }
  },
  fr: {
    services: {
      tag: "Transferts privés",
      title: "Chaque trajet est pensé selon votre façon de voyager",
      intro: "Aurora offre aux voyageurs internationaux une façon simple et privée de se déplacer à Dubrovnik et dans toute la région. D'une arrivée tardive à une journée avec plusieurs arrêts sur la côte, chaque transfert s'adapte à votre horaire, à vos bagages et à votre itinéraire.",
      primaryCta: "Réserver un trajet privé",
      secondaryCta: "Voir les destinations",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Arriver de l'aéroport en toute sérénité",
          text: "Envoyez-nous votre numéro de vol et vos détails d'arrivée; nous organisons la prise en charge au point convenu et un trajet direct vers votre hôtel, villa, appartement ou marina. Après un long voyage, inutile de chercher les transports locaux, de faire la queue ou d'ajouter des arrêts superflus.",
          cta: "Planifier une prise en charge à l'aéroport"
        },
        {
          title: "Trajets privés entre villes",
          text: "Voyagez de Dubrovnik vers Split, Kotor, Mostar ou une autre destination sans minibus partagé ni horaire rigide. Vous choisissez le lieu de départ, l'heure et le rythme; nous organisons un trajet confortable de porte à porte selon votre voyage.",
          cta: "Demander un itinéraire privé"
        },
        {
          title: "Transferts vers hôtels, villas et marinas",
          text: "Pour un check-in, un départ de yacht, une arrivée de croisière ou une réservation en soirée, nous assurons un trajet ponctuel et discret selon votre programme. Nous tenons compte des bagages, de la taille du groupe et des détails pratiques qui rendent l'arrivée plus simple.",
          cta: "Réserver un trajet vers votre hébergement"
        },
        {
          title: "Journées sur mesure et trajets avec plusieurs arrêts",
          text: "Composez votre propre journée sur la côte ou au-delà de la frontière, avec du temps pour les panoramas, le déjeuner et les lieux que vous voulez vraiment découvrir. Partagez votre idée et nous vous aiderons à créer un itinéraire privé sans les contraintes du programme de quelqu'un d'autre.",
          cta: "Créer une journée privée"
        }
      ],
      detail: {
        tag: "Simple dès le premier message",
        title: "Un trajet privé. Un plan clair.",
        paragraphs: [
          "Chaque transfert commence par les détails importants pour un voyageur: lieu de prise en charge, destination, heure d'arrivée ou numéro de vol, nombre de passagers et éventuels arrêts. Vous pouvez donc nous contacter depuis n'importe quel pays et savoir comment se déroulera la suite avant de voyager.",
          "Avant le trajet, nous confirmons la disponibilité, le prix final et le plan de prise en charge. Lorsque vous atterrissez, débarquez ou quittez votre hébergement, vous n'attendez pas que la logistique se mette en place: votre transfert privé a déjà sa place dans l'itinéraire."
        ],
        points: [
          "Un véhicule réservé uniquement pour vous et votre groupe",
          "Confort climatisé et espace bagages prévu à l'avance",
          "Accord clair sur l'itinéraire, l'horaire et le prix confirmé",
          "Trajets aller simple et aller-retour selon votre programme"
        ],
        cta: "Vérifier la disponibilité pour vos dates"
      },
      final: {
        title: "Faites du transport la partie la plus simple de votre voyage.",
        text: "Envoyez-nous votre itinéraire, votre date et le nombre de passagers. Aurora confirmera la disponibilité et le prix avant votre trajet, pour que vous puissiez planifier le reste de votre séjour sereinement.",
        primaryCta: "Demander un transfert",
        secondaryCta: "Voir nos véhicules",
        secondaryHref: "fleet"
      },
      seoDescription: "Transferts privés depuis Dubrovnik pour voyageurs internationaux: aéroport, hôtels, marinas, trajets interurbains et excursions sur mesure."
    },
    destinations: {
      tag: "Itinéraires privés populaires",
      title: "Allez au-delà de Dubrovnik sans laisser votre programme au hasard",
      intro: "La région adriatique semble proche sur une carte, mais un trajet peut inclure des frontières, des bagages, des changements d'hôtel et des horaires difficiles à coordonner. Aurora vous propose un déplacement privé, direct et personnel jusqu'au lieu où commence la suite de votre voyage.",
      primaryCta: "Planifier votre itinéraire",
      secondaryCta: "Voir les services de transfert",
      secondaryHref: "services",
      cards: [
        {
          title: "De l'aéroport de Dubrovnik à votre hébergement",
          text: "De l'atterrissage à la porte de votre hôtel, villa, appartement ou marina, nous organisons une arrivée privée sans changement ni arrêt partagé. C'est idéal pour le premier jour de vacances, lorsque vous souhaitez déposer vos bagages et profiter de la ville plus vite.",
          cta: "Réserver une arrivée depuis l'aéroport"
        },
        {
          title: "Dubrovnik et Kotor",
          text: "Passez une journée au Monténégro ou poursuivez vers Kotor en transport privé à votre rythme. La frontière et les magnifiques Bouches de Kotor méritent un plan réaliste, des informations claires et assez de temps pour arriver sans précipitation.",
          cta: "Demander un itinéraire vers Kotor"
        },
        {
          title: "Dubrovnik et Mostar",
          text: "Reliez la côte à l'Herzégovine lors d'un trajet privé confortable, que Mostar soit une excursion d'une journée ou la prochaine étape d'un itinéraire plus long. Nous coordonnons l'heure de départ, les arrêts prévus et le retour selon votre façon de voyager.",
          cta: "Planifier un trajet vers Mostar"
        },
        {
          title: "Dubrovnik et Split",
          text: "Pour les voyageurs qui continuent le long de la côte dalmate, un trajet privé supprime la logistique entre deux grandes étapes de vacances. Nous venons vous chercher à l'adresse qui vous convient et vous conduisons directement à votre prochain hôtel, port, villa ou centre-ville.",
          cta: "Demander un transfert vers Split"
        }
      ],
      detail: {
        tag: "Voyagez à votre rythme",
        title: "Un itinéraire privé vous donne une liberté qu'un transfert partagé ne peut offrir.",
        paragraphs: [
          "Tous les voyageurs ne se déplacent pas de la même manière: certains souhaitent une arrivée calme et directe, d'autres veulent déjeuner en route, profiter d'un panorama ou rejoindre une autre ville le même jour. Un transfert privé laisse de la place au programme qui correspond à votre voyage, pas à un horaire conçu pour tout le monde.",
          "Pour les trajets vers les pays voisins, il est important d'avoir des informations claires avant le départ. Envoyez-nous votre itinéraire, la date et le nombre de passagers; nous confirmerons les options, l'organisation et le prix final avant votre réservation."
        ],
        points: [
          "Prise en charge et arrivée aux adresses de votre choix",
          "Un plan adapté au vol, au check-in ou à la suite du voyage",
          "Aller-retour et itinéraires avec plusieurs arrêts possibles",
          "Une alternative confortable aux transports publics et navettes partagées"
        ],
        cta: "Envoyer votre itinéraire"
      },
      final: {
        title: "Votre prochaine destination mérite un bon départ.",
        text: "Dites-nous où vous allez, quand vous voyagez et combien de personnes vous accompagnent. Nous préparerons une proposition claire de transfert privé pour votre itinéraire.",
        primaryCta: "Demander un devis d'itinéraire",
        secondaryCta: "Réserver un trajet privé",
        secondaryHref: "services"
      },
      seoDescription: "Itinéraires privés depuis Dubrovnik vers l'aéroport, Kotor, Mostar, Split et les destinations de Croatie et de la région adriatique."
    },
    fleet: {
      tag: "Véhicules Aurora",
      title: "Un confort qui voyage bien, où que vous veniez",
      intro: "Après un vol international, une longue journée de visites ou un changement d'hôtel, ce qui compte le plus est de voyager dans un espace calme et propre. Nous adaptons nos véhicules modernes et climatisés à votre groupe, à vos bagages et à votre itinéraire avant de confirmer le transfert.",
      primaryCta: "Réserver votre véhicule",
      secondaryCta: "Planifier votre itinéraire",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Le confort prêt pour l'aéroport",
          text: "Le transport après un vol doit être simple: suffisamment confortable pour souffler, climatisé et prêt pour un trajet direct vers votre hébergement. Avant la confirmation, nous vérifions l'heure d'arrivée, le nombre de passagers et les détails qui aident votre séjour à bien commencer.",
          cta: "Réserver un transport aéroport"
        },
        {
          title: "De la place pour les voyageurs et les bagages",
          text: "Les couples, familles, amis et voyageurs d'affaires n'arrivent pas tous avec le même volume de bagages. Lorsque vous nous communiquez le nombre de passagers et les bagages, nous pouvons adapter le véhicule au vrai voyage, pas seulement au trajet le plus court sur la carte.",
          cta: "Partager les détails de votre groupe"
        },
        {
          title: "Un trajet plus calme sur les longues distances",
          text: "Pour aller à Kotor, Mostar, Split ou dans d'autres villes, le confort est plus qu'un supplément. Il transforme un déplacement fatigant en un moment du voyage où vous pouvez vous détendre, admirer le paysage ou préparer votre prochaine arrivée.",
          cta: "Demander un véhicule pour un long trajet"
        },
        {
          title: "Pratique pour les excursions privées",
          text: "Une journée avec plusieurs arrêts nécessite un véhicule qui suit votre programme, pas un programme qui s'adapte au véhicule. Nous organisons des trajets privés pour les visites, le déjeuner, la baignade, un domaine viticole ou une pause imprévue sur la côte.",
          cta: "Planifier une journée privée"
        }
      ],
      detail: {
        tag: "Le bon choix avant confirmation",
        title: "Nous adaptons le véhicule au voyage, jamais l'inverse.",
        paragraphs: [
          "Plutôt que de vous proposer un choix peu clair, nous voulons d'abord comprendre votre façon de voyager. Le nombre de passagers, le volume des bagages, l'équipement pour enfants, la longueur de l'itinéraire et un éventuel retour nous aident à confirmer le bon véhicule et un trajet plus agréable.",
          "Ainsi, vous savez que votre transfert privé est prêt pour le vrai programme: d'un court trajet vers la vieille ville à un voyage régional de plusieurs heures."
        ],
        points: [
          "Véhicules modernes et climatisés pour les transferts privés",
          "Choix du véhicule selon les passagers, les bagages et la longueur du trajet",
          "Un espace propre et confortable après un vol ou durant une longue route",
          "Un trajet privé sans partager le véhicule avec d'autres voyageurs"
        ],
        cta: "Dites-nous combien de personnes voyagent"
      },
      final: {
        title: "Un bon transfert commence par un véhicule vraiment adapté.",
        text: "Envoyez-nous la date, l'itinéraire, le nombre de passagers et les bagages. Nous confirmerons l'option la plus adaptée avant votre réservation.",
        primaryCta: "Demander une recommandation de véhicule",
        secondaryCta: "Voir les services de transfert",
        secondaryHref: "services"
      },
      seoDescription: "Véhicules Aurora modernes et climatisés pour aéroport, longues distances, familles et excursions privées depuis Dubrovnik."
    },
    about: {
      tag: "À propos d'Aurora Transfers",
      title: "Un meilleur accueil à Dubrovnik commence par un meilleur transfert",
      intro: "Aurora a été créée pour les voyageurs du monde entier qui veulent que les premiers et derniers kilomètres de leur voyage soient simples. Nous associons des chauffeurs professionnels, une communication claire et des trajets privés pour que, dès votre arrivée, vous puissiez vous concentrer sur vos vacances, votre travail ou l'expérience qui vous attend.",
      primaryCta: "Planifier votre transfert",
      secondaryCta: "Voir les destinations",
      secondaryHref: "destinations",
      cards: [
        {
          title: "Prêts pour les arrivées internationales",
          text: "Nous savons que les voyageurs n'arrivent pas toujours de la ville voisine. Ils arrivent après de longs vols, à travers les fuseaux horaires, avec des enfants, des bagages et des plans qui changent parfois. C'est pourquoi l'échange avant le trajet reste simple, clair et sans suppositions.",
          cta: "Réserver votre arrivée"
        },
        {
          title: "Une communication claire avant le voyage",
          text: "Un bon transfert ne commence pas lorsque le véhicule arrive, mais lorsque vous savez ce qui a été organisé. Avant la confirmation, nous vérifions l'itinéraire, l'heure, le nombre de passagers et le prix: un détail fiable de plus dans votre programme.",
          cta: "Envoyer vos détails de voyage"
        },
        {
          title: "Une conduite professionnelle, un service personnel",
          text: "Chaque groupe voyage différemment, nous ne considérons donc pas un trajet comme une tâche standard. Voyage d'affaires, lune de miel, vacances en famille ou séjour en voilier: nous organisons le transfert selon ce qui compte le plus pour vous ce jour-là.",
          cta: "Organiser un trajet privé"
        },
        {
          title: "Votre temps compte",
          text: "Votre arrivée, le check-in, le départ d'une croisière et la suite de votre voyage font partie d'un programme plus vaste. Aurora transforme le transport en lien calme entre ces moments, plutôt qu'en élément imprévisible de votre journée.",
          cta: "Vérifier la disponibilité"
        }
      ],
      detail: {
        tag: "Les détails dont les voyageurs se souviennent",
        title: "Organisé avec professionnalisme, assez personnel pour que vous vous sentiez accompagné.",
        paragraphs: [
          "Nous pensons qu'un excellent service de transfert va au-delà d'un trajet du point A au point B. C'est le sentiment que quelqu'un vous attend, qu'il existe un plan clair et qu'une tâche logistique est réglée dès que vous envoyez votre demande.",
          "Du premier message à votre destination, notre objectif est d'offrir aux voyageurs du monde entier un service fiable, accessible et assez flexible pour la réalité d'un voyage."
        ],
        points: [
          "Chauffeurs professionnels et accueillants",
          "Transferts privés pour voyages d'affaires et de loisirs",
          "Prix fixe confirmé avant le trajet",
          "Détails d'arrivée pris en compte pour organiser votre itinéraire"
        ],
        cta: "Parlez-nous de votre programme"
      },
      final: {
        title: "Lorsque le plan est clair, le voyage commence plus sereinement.",
        text: "Envoyez-nous les éléments essentiels de votre trajet. Aurora s'occupe du transport, pour vous laisser libre de profiter de la raison de votre venue à Dubrovnik.",
        primaryCta: "Demander un transfert privé",
        secondaryCta: "Voir nos véhicules",
        secondaryHref: "fleet"
      },
      seoDescription: "Découvrez Aurora Dubrovnik Transfers, une agence de transferts privés pour voyageurs internationaux à Dubrovnik, en Croatie et dans la région adriatique."
    }
  }
} as const satisfies Record<Lang, Record<MarketingPage, MarketingPageContent>>;

export function isMarketingPage(page: Page): page is MarketingPage {
  return (marketingPages as readonly string[]).includes(page);
}

export function getMarketingPageContent(lang: Lang, page: MarketingPage) {
  return pageCopy[lang][page];
}
