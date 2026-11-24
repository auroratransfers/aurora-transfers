import type { Lang, Page } from "./site";

export const marketingPages = ["services", "destinations", "fleet", "about"] as const;
export type MarketingPage = (typeof marketingPages)[number];

type PageCard = {
  title: string;
  text: string;
  cta?: string;
  badge?: string;
};

type DestinationGroup = {
  tag: string;
  title: string;
  note?: string;
  cards: readonly PageCard[];
};

type MarketingPageContent = {
  tag: string;
  title: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: MarketingPage;
  cards: readonly PageCard[];
  destinationGroups?: readonly DestinationGroup[];
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
      tag: "Privatne ture",
      title: "Privatne ture iz Dubrovnika i Zagreba",
      intro: "Od obale, starih gradova i vinograda do jezera, Slovenije i Trsta, Aurora organizira privatne dnevne ture prema vašem ritmu. Birate datum, grupu i tempo, a mi pripremamo vožnju od vrata do vrata.",
      primaryCta: "Isplaniraj svoju turu",
      secondaryCta: "Pogledaj usluge",
      secondaryHref: "services",
      cards: [],
      destinationGroups: [
        {
          tag: "Polazak s juga",
          title: "Iz Dubrovnika",
          note: "Sezona 2027. otvorena je za polaske od 1. ožujka 2027.",
          cards: [
            { title: "Kotor", text: "Privatni dan uz Bokokotorski zaljev, stari grad i tempo koji odgovara vašoj grupi. Polazite iz Dubrovnika kada vam odgovara, bez grupnog rasporeda i presjedanja. Prošetajte zidinama, trgovima i uskim ulicama Kotora vlastitim ritmom. U plan možemo uključiti vrijeme za ručak, kavu uz zaljev ili foto-stajanja putem. Prije polaska zajedno potvrđujemo trajanje, granicu, stajanja i vozilo koje odgovara vašoj grupi.", cta: "Isplaniraj turu do Kotora" },
            { title: "Perast", text: "Mirnija tura uz zaljev, baroknu arhitekturu i dovoljno vremena za Perast i pogled na otočiće. Vožnja od Dubrovnika organizira se privatno, bez žurbe i nepotrebnih zaustavljanja. Zaustavite se na obali, istražite kamene palače i uživajte u pogledu na Bokokotorski zaljev. Dan se može prilagoditi ručku, kratkoj plovidbi ili dodatnim mjestima koja želite vidjeti. Prije potvrde rute provjeravamo vrijeme, granični prijelaz i raspored koji najbolje odgovara vašem danu.", cta: "Isplaniraj turu do Perasta" },
            { title: "Mostar", text: "Spojite Jadran i Hercegovinu u privatnom izletu s vremenom za Stari most, ručak i dogovorena stajanja. Polazak iz Dubrovnika planiramo prema vašem tempu i vremenu koje želite provesti u gradu. Imat ćete prostor za Stari most, šetnju starom jezgrom i ručak uz Neretvu. Ako želite, u itinerar možemo uključiti dogovorena panoramska ili kulturna stajanja tijekom puta. Prije vožnje potvrđujemo realno trajanje, granične formalnosti i veličinu vozila za vašu grupu.", cta: "Isplaniraj turu do Mostara" },
            { title: "Vinska tura", text: "Pažljivo osmišljena vinska tura iz Dubrovnika stiže uskoro.", badge: "Uskoro" },
            { title: "Ston: kamenice i vino", text: "Dan na Pelješcu za svježe kamenice, lokalna vina, Ston i lagani ritam obale. Polazak iz Dubrovnika ostavlja dovoljno vremena za mirnu vožnju uz obalu. U Stonu možete kombinirati degustaciju kamenica, lokalna vina i šetnju povijesnim zidinama. Ritam dana prilagođavamo duljini ručka, interesima grupe i mjestima koja želite dodati. Prije potvrde slažemo jasan plan preuzimanja, stajanja i povratka u Dubrovnik.", cta: "Isplaniraj turu u Ston" }
          ]
        },
        {
          tag: "Polazak iz grada",
          title: "Iz Zagreba",
          cards: [
            { title: "Plitvička jezera", text: "Privatni jednodnevni izlet do Plitvičkih jezera s preuzimanjem u Zagrebu i vožnjom bez presjedanja. Polazimo prema vremenu koje odgovara vašem danu i ulaznom terminu u park. Vožnja bez presjedanja ostavlja vam više energije za staze, jezera i pauze uz prirodu. Možete birati mirniji obilazak ili plan s više vremena za šetnju i fotografije. Prije polaska potvrđujemo trajanje, mjesta za preuzimanje i vozilo koje odgovara vašoj grupi.", cta: "Isplaniraj Plitvice" },
            { title: "Bled, Slovenija", text: "Opušten privatni put do Bleda, jezera i alpskih pogleda, uz raspored prilagođen vašem danu. Put do Bleda planiramo iz Zagreba privatnim vozilom, bez dijeljenja i nepotrebnog žurenja. Imat ćete vremena za jezero, šetnju uz obalu, pogled s dvorca ili ručak prema svom planu. Rutu možemo prilagoditi pauzama, prtljazi i nastavku vašeg putovanja. Prije potvrde provjeravamo granicu, raspored i realno vrijeme povratka.", cta: "Isplaniraj turu do Bleda" },
            { title: "Ljubljana", text: "Upoznajte slovensku prijestolnicu privatnom vožnjom s vremenom za šetnju, ručak i vlastiti plan grada. Počinjemo preuzimanjem u Zagrebu i izravnom privatnom vožnjom do centra. Grad možete istraživati pješice, uz kavu kraj Ljubljanice ili posjet mjestima koja ste sami odabrali. U plan uključujemo dovoljno vremena za vaš tempo, sastanak, ručak ili nastavak putovanja. Prije vožnje zajedno dogovaramo granicu, trajanje i praktične detalje dana.", cta: "Isplaniraj turu do Ljubljane" },
            { title: "Maribor", text: "Privatna tura kroz sjevernu Sloveniju, s fleksibilnim tempom za grad, vino i krajolik. Polazak iz Zagreba prilagođavamo vašem rasporedu, bez dijeljenja vozila s drugim gostima. Dan može obuhvatiti šetnju gradom, vrijeme uz Dravu i posjet lokalnim vinorodnim područjima prema vašem interesu. Stajanja i pauze dogovaramo unaprijed kako biste imali dovoljno prostora za spontano istraživanje. Prije potvrde provjeravamo granični prijelaz, trajanje puta i odgovarajuće vozilo.", cta: "Isplaniraj turu do Maribora" },
            { title: "Trst", text: "Dan između Zagreba i Jadrana: Trst, kava, obala i privatni prijevoz od vrata do vrata. Polazak iz Zagreba organiziramo u vrijeme koje vam ostavlja miran i ispunjen dan u gradu. Prošetajte uz more, istražite trgove i odaberite mjesto za kavu ili ručak bez vezanosti uz grupni raspored. Rutu možemo prilagoditi dodatnim stajanjima, prtljazi i nastavku vašeg putovanja. Prije polaska usklađujemo trajanje, granicu i plan povratka koji vam odgovara.", cta: "Isplaniraj turu do Trsta" }
          ]
        },
        {
          tag: "Uskoro",
          title: "Dugolinijski transferi kroz srednju Europu",
          note: "Austrija, Njemačka, Mađarska i dodatne veze otvaraju se postupno. Ture iz Zagreba navedene iznad ostaju zasebno dostupne.",
          cards: [
            { title: "Austrija", text: "Dugolinijske privatne vožnje prema Beču i drugim austrijskim gradovima pripremamo za sljedeće faze.", badge: "Uskoro" },
            { title: "Njemačka", text: "Međunarodni transferi prema Njemačkoj bit će dostupni nakon otvaranja proširene mreže ruta.", badge: "Uskoro" },
            { title: "Mađarska", text: "Privatne veze prema Mađarskoj planiramo otvoriti kao dio sljedeće faze prekogranične usluge.", badge: "Uskoro" },
            { title: "Šira Slovenija", text: "Ture iz Zagreba ostaju dostupne, dok se dodatne dugolinijske veze prema Sloveniji pripremaju za kasnije otvaranje.", badge: "Uskoro" }
          ]
        }
      ],
      detail: {
        tag: "Putujte svojim ritmom",
        title: "Privatna tura daje vam slobodu koju grupni izlet ne može ponuditi.",
        paragraphs: [
          "Ne putuju svi jednako: neki žele miran dan uz more, drugi ručak s pogledom, lokalna vina ili nekoliko sati u novom gradu. Privatna tura ostavlja prostor za plan koji odgovara vašem putovanju, a ne unaprijed zadanom rasporedu.",
          "Za ture prema susjednim zemljama unaprijed usklađujemo vrijeme polaska, granice, stajanja i veličinu vozila. Pošaljite datum i broj putnika, a mi ćemo potvrditi mogućnosti, organizaciju i konačnu cijenu prije rezervacije."
        ],
        points: [
          "Preuzimanje i dolazak na adresi koju vi odaberete",
          "Plan puta prilagođen vremenu leta, prijavi u smještaj ili nastavku putovanja",
          "Mogućnost povratne vožnje i više dogovorenih stajanja",
          "Udobna alternativa javnom prijevozu i dijeljenim shuttle vožnjama"
        ],
        cta: "Pošalji nam plan svoje ture"
      },
      final: {
        title: "Vaša sljedeća destinacija zaslužuje dobar početak.",
        text: "Recite nam kamo idete, kada putujete i s koliko osoba. Pripremit ćemo jasan prijedlog privatnog transfera za vaš plan putovanja.",
        primaryCta: "Zatraži ponudu za rutu",
        secondaryCta: "Rezerviraj privatnu vožnju",
        secondaryHref: "services"
      },
      seoDescription: "Privatne ture iz Dubrovnika i Zagreba do Kotora, Perasta, Mostara, Stona, Plitvičkih jezera, Bleda, Ljubljane, Maribora i Trsta."
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
      seoDescription: "Moderna, klimatizirana vozila Aurora Private Transfers za dolaske iz zračne luke, duže rute, obitelji i privatne izlete kroz Hrvatsku i srednju Europu."
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
      seoDescription: "Upoznajte Aurora Private Transfers, agenciju za privatne transfere za međunarodne goste koji putuju kroz Dubrovnik, Hrvatsku i srednju Europu."
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
      tag: "Private tours",
      title: "Private tours from Dubrovnik and Zagreb",
      intro: "From the coast, old towns and vineyards to lakes, Slovenia and Trieste, Aurora arranges private day tours around your pace. Choose the date, your party and the rhythm; we take care of the door-to-door journey.",
      primaryCta: "Plan your tour",
      secondaryCta: "See transfer services",
      secondaryHref: "services",
      cards: [],
      destinationGroups: [
        {
          tag: "Southern departure",
          title: "From Dubrovnik",
          note: "Dubrovnik departures for the 2027 season are open from 1 March 2027.",
          cards: [
            { title: "Kotor", text: "A private day around the Bay of Kotor, its old town and a pace shaped around your party. Leave Dubrovnik when it suits you, without a group timetable or connections. Explore Kotor's walls, squares and narrow streets at your own rhythm. Your day can include time for lunch, coffee by the bay or scenic photo stops along the way. Before departure, we confirm the duration, border crossing, stops and a vehicle suited to your group.", cta: "Plan a Kotor tour" },
            { title: "Perast", text: "A calmer Bay of Kotor day with baroque architecture, Perast and time for views of the islands. Your private ride from Dubrovnik is arranged without rushing or unnecessary stops. Pause by the water, explore the stone palaces and take in the Bay of Kotor at your own pace. The day can be shaped around lunch, a short boat outing or extra places you would like to see. Before confirming the route, we check timing, the border crossing and the schedule that works best for your day.", cta: "Plan a Perast tour" },
            { title: "Mostar", text: "Link the Adriatic and Herzegovina in a private day with time for the Old Bridge, lunch and agreed stops. We plan your departure from Dubrovnik around your pace and the time you want to spend in the city. There is room for the Old Bridge, the historic centre and lunch beside the Neretva. If you wish, we can include agreed scenic or cultural stops along the way. Before the ride, we confirm realistic timings, border formalities and the right vehicle for your party.", cta: "Plan a Mostar tour" },
            { title: "Wine tour", text: "A carefully designed winery day from Dubrovnik is being prepared for a later release.", badge: "Coming soon" },
            { title: "Ston oysters and wine", text: "A Pelješac day for fresh oysters, local wine, Ston and a slower coastal rhythm. Departing from Dubrovnik leaves time for an unhurried drive along the coast. In Ston, you can combine an oyster tasting, local wines and a walk by the historic walls. We shape the pace around the length of your lunch, your group's interests and places you want to add. Before confirmation, we prepare a clear plan for pickup, stops and your return to Dubrovnik.", cta: "Plan a Ston day" }
          ]
        },
        {
          tag: "City departure",
          title: "From Zagreb",
          cards: [
            { title: "Plitvice Lakes", text: "A private day trip to Plitvice Lakes with Zagreb pickup and direct, unhurried travel. We leave at a time that suits your day and your planned park entry. Travelling without connections leaves more energy for trails, lakes and quiet pauses in nature. Choose a gentler visit or a plan with more time for walking and photographs. Before departure, we confirm duration, pickup details and the vehicle that suits your party.", cta: "Plan Plitvice Lakes" },
            { title: "Bled, Slovenia", text: "An easy private journey to Bled, its lake and alpine views, with a schedule built around your day. The route from Zagreb is planned in a private vehicle, without sharing or unnecessary rushing. You have time for the lake, a walk by the water, castle views or lunch in the style you prefer. We can adapt the journey to breaks, luggage and the next part of your trip. Before confirmation, we check the border, your schedule and a realistic return time.", cta: "Plan a Bled tour" },
            { title: "Ljubljana", text: "Explore Slovenia's capital with a private ride and time for a walk, lunch and your own city plan. We begin with pickup in Zagreb and a direct private drive into the centre. Discover the city on foot, enjoy a coffee beside the Ljubljanica or visit the places you have chosen. The plan leaves room for your pace, a meeting, lunch or onward travel. Before the ride, we agree the border crossing, duration and practical details for the day.", cta: "Plan a Ljubljana tour" },
            { title: "Maribor", text: "A flexible northern Slovenia day for the city, wine country and the landscapes in between. Departure from Zagreb follows your schedule, without sharing the vehicle with other guests. The day can include time in the city, by the Drava and in nearby wine country based on your interests. We agree breaks and stops in advance so there is space for unplanned discoveries. Before confirmation, we check the border crossing, journey time and the right vehicle for your group.", cta: "Plan a Maribor tour" },
            { title: "Trieste", text: "A day between Zagreb and the Adriatic: Trieste, coffee, the waterfront and door-to-door private travel. We arrange departure from Zagreb at a time that leaves you a calm and rewarding day in the city. Walk by the sea, explore the squares and choose your own place for coffee or lunch without a group timetable. The route can be adapted to extra stops, luggage and your onward travel. Before departure, we coordinate duration, the border crossing and a return plan that works for you.", cta: "Plan a Trieste tour" }
          ]
        },
        {
          tag: "Coming soon",
          title: "Long-distance transfers across Central Europe",
          note: "Austria, Germany, Hungary and additional connections will open in stages. The Zagreb day tours above remain separately available.",
          cards: [
            { title: "Austria", text: "Long-distance private rides to Vienna and other Austrian cities are being prepared for the next release.", badge: "Coming soon" },
            { title: "Germany", text: "International transfers to Germany will be available after the expanded route network opens.", badge: "Coming soon" },
            { title: "Hungary", text: "Private connections to Hungary are planned as part of the next cross-border service phase.", badge: "Coming soon" },
            { title: "Wider Slovenia", text: "The Zagreb day tours remain available, while additional long-distance connections into Slovenia are being prepared for a later opening.", badge: "Coming soon" }
          ]
        }
      ],
      detail: {
        tag: "Travel at your pace",
        title: "A private tour gives you freedom a group excursion cannot.",
        paragraphs: [
          "Not every traveller wants the same day: some want an easy coastal escape, while others want lunch with a view, local wine or several hours in a new city. A private tour leaves room for the plan that suits your trip, not a timetable designed for everyone else.",
          "For tours into neighbouring countries, we coordinate departure timing, borders, stops and vehicle size in advance. Send us your date and passenger count, and we will confirm the options, organisation and final price before you book."
        ],
        points: [
          "Pickup and drop-off at the addresses you choose",
          "A plan shaped around flights, hotel check-in or onward travel",
          "Return journeys and agreed multi-stop routes available",
          "A comfortable alternative to public transport and shared shuttles"
        ],
        cta: "Send us your tour plan"
      },
      final: {
        title: "Your next destination deserves a good beginning.",
        text: "Tell us where you are going, when you travel and how many people are in your party. We will prepare a clear private-transfer proposal for your itinerary.",
        primaryCta: "Request a route quote",
        secondaryCta: "Book a private ride",
        secondaryHref: "services"
      },
      seoDescription: "Private tours from Dubrovnik and Zagreb to Kotor, Perast, Mostar, Ston, Plitvice Lakes, Bled, Ljubljana, Maribor and Trieste."
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
      seoDescription: "Meet Aurora Private Transfers, a private transfer agency for international travellers moving through Dubrovnik, Croatia and Central Europe."
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
      tag: "Private Ausflüge",
      title: "Private Ausflüge ab Dubrovnik und Zagreb",
      intro: "Von Küste, Altstädten und Weinbergen bis zu Seen, Slowenien und Triest organisiert Aurora private Tagesausflüge in Ihrem Tempo. Sie wählen Datum, Reisegruppe und Rhythmus; wir kümmern uns um die Fahrt von Tür zu Tür.",
      primaryCta: "Ausflug planen",
      secondaryCta: "Transferleistungen ansehen",
      secondaryHref: "services",
      cards: [],
      destinationGroups: [
        {
          tag: "Start im Süden",
          title: "Ab Dubrovnik",
          note: "Abfahrten ab Dubrovnik für die Saison 2027 sind ab dem 1. März 2027 verfügbar.",
          cards: [
            { title: "Kotor", text: "Ein privater Tag an der Bucht von Kotor, in der Altstadt und in einem Tempo, das zu Ihrer Gruppe passt. Sie starten in Dubrovnik zu einer Zeit, die zu Ihrem Tag passt, ohne Gruppenfahrplan oder Umstiege. Entdecken Sie Stadtmauern, Plätze und schmale Gassen in Ihrem eigenen Rhythmus. Für Mittagessen, einen Kaffee am Wasser oder Fotostopps entlang der Bucht bleibt ausreichend Zeit. Vor der Abfahrt stimmen wir Dauer, Grenzübertritt, Stopps und das passende Fahrzeug gemeinsam ab.", cta: "Ausflug nach Kotor planen" },
            { title: "Perast", text: "Ein ruhigerer Tag an der Bucht von Kotor mit barocker Architektur, Perast und Zeit für den Blick auf die Inseln. Ihre private Fahrt ab Dubrovnik wird ohne Eile und unnötige Stopps organisiert. Halten Sie am Wasser, entdecken Sie die steinernen Paläste und genießen Sie die Bucht von Kotor in Ihrem eigenen Tempo. Der Tag kann auf ein Mittagessen, eine kurze Bootsfahrt oder weitere Orte abgestimmt werden, die Sie sehen möchten. Vor der Routenbestätigung prüfen wir Zeitplan, Grenzübertritt und den Ablauf, der am besten zu Ihrem Tag passt.", cta: "Ausflug nach Perast planen" },
            { title: "Mostar", text: "Verbinden Sie Adria und Herzegowina bei einem Privatausflug mit Zeit für die Alte Brücke, Mittagessen und vereinbarte Stopps. Wir planen die Abfahrt aus Dubrovnik nach Ihrem Tempo und der Zeit, die Sie in der Stadt verbringen möchten. Es bleibt Raum für die Alte Brücke, die historische Altstadt und ein Mittagessen an der Neretva. Auf Wunsch können vereinbarte Panorama- oder Kulturstopps entlang der Strecke eingeplant werden. Vor der Fahrt bestätigen wir realistische Zeiten, Grenzformalitäten und das passende Fahrzeug für Ihre Gruppe.", cta: "Ausflug nach Mostar planen" },
            { title: "Weintour", text: "Ein sorgfältig geplanter Weinausflug ab Dubrovnik wird für einen späteren Start vorbereitet.", badge: "Demnächst" },
            { title: "Ston: Austern und Wein", text: "Ein Tag auf Pelješac mit frischen Austern, lokalen Weinen, Ston und einem entspannten Küstenrhythmus. Die Abfahrt aus Dubrovnik lässt Zeit für eine ruhige Fahrt entlang der Küste. In Ston können Sie eine Austernverkostung, lokale Weine und einen Spaziergang an den historischen Mauern verbinden. Wir richten das Tempo nach der Länge Ihres Mittagessens, den Interessen Ihrer Gruppe und den Orten aus, die Sie hinzufügen möchten. Vor der Bestätigung erstellen wir einen klaren Plan für Abholung, Stopps und die Rückfahrt nach Dubrovnik.", cta: "Tag in Ston planen" }
          ]
        },
        {
          tag: "Start in der Stadt",
          title: "Ab Zagreb",
          cards: [
            { title: "Plitvicer Seen", text: "Privater Tagesausflug zu den Plitvicer Seen mit Abholung in Zagreb und direkter, entspannter Fahrt. Wir starten zu einer Zeit, die zu Ihrem Tag und dem geplanten Parkeintritt passt. Ohne Umstiege bleibt mehr Energie für Wege, Seen und ruhige Pausen in der Natur. Wählen Sie einen entspannten Besuch oder einen Plan mit mehr Zeit zum Spazieren und Fotografieren. Vor der Abfahrt bestätigen wir Dauer, Abholort und das passende Fahrzeug für Ihre Gruppe.", cta: "Plitvicer Seen planen" },
            { title: "Bled, Slowenien", text: "Eine entspannte Privatfahrt nach Bled, zu seinem See und den alpinen Ausblicken, passend zu Ihrem Tag. Die Strecke ab Zagreb wird in einem Privatfahrzeug ohne Teilen und unnötige Eile geplant. Sie haben Zeit für den See, einen Spaziergang am Wasser, den Blick vom Schloss oder ein Mittagessen nach Ihren Wünschen. Wir können die Fahrt an Pausen, Gepäck und Ihre Weiterreise anpassen. Vor der Bestätigung prüfen wir Grenze, Zeitplan und eine realistische Rückkehrzeit.", cta: "Ausflug nach Bled planen" },
            { title: "Ljubljana", text: "Entdecken Sie Sloweniens Hauptstadt mit einer Privatfahrt und Zeit für Spaziergang, Mittagessen und Ihren eigenen Stadtplan. Wir beginnen mit der Abholung in Zagreb und einer direkten Privatfahrt ins Zentrum. Erkunden Sie die Stadt zu Fuß, genießen Sie einen Kaffee an der Ljubljanica oder besuchen Sie die Orte Ihrer Wahl. Der Plan lässt Raum für Ihr Tempo, einen Termin, ein Mittagessen oder die Weiterreise. Vor der Fahrt stimmen wir Grenzübertritt, Dauer und die praktischen Details des Tages ab.", cta: "Ausflug nach Ljubljana planen" },
            { title: "Maribor", text: "Ein flexibler Tag im Norden Sloweniens für Stadt, Weinland und die Landschaft dazwischen. Die Abfahrt aus Zagreb richtet sich nach Ihrem Zeitplan, ohne das Fahrzeug mit anderen Gästen zu teilen. Der Tag kann Zeit in der Stadt, an der Drau und in den nahegelegenen Weinregionen nach Ihren Interessen umfassen. Pausen und Stopps stimmen wir vorher ab, damit Raum für spontane Entdeckungen bleibt. Vor der Bestätigung prüfen wir Grenzübertritt, Fahrzeit und das passende Fahrzeug für Ihre Gruppe.", cta: "Ausflug nach Maribor planen" },
            { title: "Triest", text: "Ein Tag zwischen Zagreb und der Adria: Triest, Kaffee, Uferpromenade und private Fahrt von Tür zu Tür. Wir organisieren die Abfahrt aus Zagreb zu einer Zeit, die Ihnen einen entspannten und erfüllten Tag in der Stadt lässt. Spazieren Sie am Meer, entdecken Sie Plätze und wählen Sie Ihren eigenen Ort für Kaffee oder Mittagessen ohne Gruppenfahrplan. Die Route kann an zusätzliche Stopps, Gepäck und Ihre Weiterreise angepasst werden. Vor der Abfahrt koordinieren wir Dauer, Grenzübertritt und einen Rückkehrplan, der zu Ihnen passt.", cta: "Ausflug nach Triest planen" }
          ]
        },
        {
          tag: "Demnächst",
          title: "Ferntransfers durch Mitteleuropa",
          note: "Österreich, Deutschland, Ungarn und weitere Verbindungen werden schrittweise eröffnet. Die oben genannten Tagesausflüge ab Zagreb bleiben separat verfügbar.",
          cards: [
            { title: "Österreich", text: "Private Fernfahrten nach Wien und in weitere österreichische Städte werden für die nächste Ausbaustufe vorbereitet.", badge: "Demnächst" },
            { title: "Deutschland", text: "Internationale Transfers nach Deutschland werden mit der Eröffnung des erweiterten Routennetzes verfügbar.", badge: "Demnächst" },
            { title: "Ungarn", text: "Private Verbindungen nach Ungarn sind als Teil der nächsten grenzüberschreitenden Servicephase geplant.", badge: "Demnächst" },
            { title: "Weiteres Slowenien", text: "Die Tagesausflüge ab Zagreb bleiben verfügbar; zusätzliche Fernverbindungen nach Slowenien werden für einen späteren Start vorbereitet.", badge: "Demnächst" }
          ]
        }
      ],
      detail: {
        tag: "Reisen in Ihrem Tempo",
        title: "Ein privater Ausflug bietet Freiraum, den eine Gruppenreise nicht geben kann.",
        paragraphs: [
          "Nicht alle Reisenden wünschen denselben Tag: Manche möchten entspannt an die Küste, andere mit Aussicht essen, lokale Weine probieren oder mehrere Stunden in einer neuen Stadt verbringen. Ein Privatausflug lässt Raum für Ihren Plan statt für einen Fahrplan für alle.",
          "Bei Ausflügen in Nachbarländer stimmen wir Abfahrtszeit, Grenzen, Stopps und Fahrzeuggröße vorher ab. Senden Sie uns Datum und Personenzahl; wir bestätigen Möglichkeiten, Organisation und Endpreis vor der Buchung."
        ],
        points: [
          "Abholung und Ankunft an den von Ihnen gewählten Adressen",
          "Ein Plan abgestimmt auf Flug, Hotel-Check-in oder Weiterreise",
          "Rückfahrten und vereinbarte Routen mit mehreren Stopps möglich",
          "Komfortable Alternative zu öffentlichen Verkehrsmitteln und Shuttles"
        ],
        cta: "Ihren Ausflugsplan senden"
      },
      final: {
        title: "Ihr nächstes Ziel verdient einen guten Beginn.",
        text: "Sagen Sie uns, wohin Sie reisen, wann Sie unterwegs sind und wie viele Personen mitfahren. Wir erstellen einen klaren Vorschlag für Ihren Privattransfer.",
        primaryCta: "Routenangebot anfragen",
        secondaryCta: "Private Fahrt buchen",
        secondaryHref: "services"
      },
      seoDescription: "Private Ausflüge ab Dubrovnik und Zagreb nach Kotor, Perast, Mostar, Ston, zu den Plitvicer Seen, nach Bled, Ljubljana, Maribor und Triest."
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
      seoDescription: "Lernen Sie Aurora Private Transfers kennen, Ihre Agentur für private Transfers für internationale Reisende in Dubrovnik, Kroatien und Mitteleuropa."
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
      tag: "Excursions privées",
      title: "Excursions privées au départ de Dubrovnik et Zagreb",
      intro: "De la côte, des vieilles villes et des vignobles aux lacs, à la Slovénie et à Trieste, Aurora organise des excursions privées à votre rythme. Vous choisissez la date, votre groupe et le tempo; nous assurons le trajet porte à porte.",
      primaryCta: "Planifier votre excursion",
      secondaryCta: "Voir les services de transfert",
      secondaryHref: "services",
      cards: [],
      destinationGroups: [
        {
          tag: "Départ du sud",
          title: "Au départ de Dubrovnik",
          note: "Les départs de Dubrovnik pour la saison 2027 sont ouverts à partir du 1er mars 2027.",
          cards: [
            { title: "Kotor", text: "Une journée privée autour des Bouches de Kotor, de la vieille ville et d'un rythme adapté à votre groupe. Partez de Dubrovnik à l'heure qui vous convient, sans horaire de groupe ni correspondance. Explorez les remparts, les places et les ruelles de Kotor à votre propre rythme. Votre journée peut inclure du temps pour déjeuner, prendre un café au bord de la baie ou faire des arrêts photo panoramiques. Avant le départ, nous confirmons la durée, le passage de frontière, les arrêts et le véhicule adapté à votre groupe.", cta: "Planifier une excursion à Kotor" },
            { title: "Perast", text: "Une journée plus calme dans les Bouches de Kotor, avec architecture baroque, Perast et vue sur les îlots. Votre trajet privé depuis Dubrovnik est organisé sans précipitation ni arrêt inutile. Faites une pause au bord de l'eau, découvrez les palais de pierre et admirez la baie à votre rythme. La journée peut être adaptée autour d'un déjeuner, d'une courte sortie en bateau ou d'autres lieux que vous souhaitez voir. Avant de confirmer l'itinéraire, nous vérifions l'horaire, le passage de frontière et le déroulé le plus adapté à votre journée.", cta: "Planifier une excursion à Perast" },
            { title: "Mostar", text: "Reliez l'Adriatique à l'Herzégovine lors d'une journée privée avec temps pour le Vieux Pont, le déjeuner et les arrêts convenus. Nous organisons votre départ de Dubrovnik selon votre rythme et le temps que vous souhaitez passer en ville. Vous aurez du temps pour le Vieux Pont, le centre historique et un déjeuner au bord de la Neretva. Si vous le souhaitez, nous pouvons ajouter des arrêts panoramiques ou culturels convenus en chemin. Avant le trajet, nous confirmons les temps réalistes, les formalités frontalières et le véhicule adapté à votre groupe.", cta: "Planifier une excursion à Mostar" },
            { title: "Circuit des vins", text: "Une journée viticole soigneusement conçue depuis Dubrovnik est en préparation pour une prochaine ouverture.", badge: "Bientôt disponible" },
            { title: "Ston : huîtres et vin", text: "Une journée sur la péninsule de Pelješac pour les huîtres fraîches, les vins locaux, Ston et un rythme côtier plus doux. Le départ depuis Dubrovnik laisse du temps pour une route tranquille le long de la côte. À Ston, vous pouvez combiner dégustation d'huîtres, vins locaux et promenade près des remparts historiques. Nous adaptons le rythme à la durée de votre déjeuner, aux envies du groupe et aux lieux que vous souhaitez ajouter. Avant confirmation, nous préparons un plan clair pour la prise en charge, les arrêts et votre retour à Dubrovnik.", cta: "Planifier une journée à Ston" }
          ]
        },
        {
          tag: "Départ de la ville",
          title: "Au départ de Zagreb",
          cards: [
            { title: "Lacs de Plitvice", text: "Une excursion privée aux lacs de Plitvice avec prise en charge à Zagreb et trajet direct, sans précipitation. Nous partons à une heure adaptée à votre journée et à votre créneau d'entrée dans le parc. Voyager sans correspondance laisse plus d'énergie pour les sentiers, les lacs et les pauses dans la nature. Choisissez une visite plus calme ou un programme avec davantage de temps pour marcher et photographier. Avant le départ, nous confirmons la durée, les détails de prise en charge et le véhicule adapté à votre groupe.", cta: "Planifier les lacs de Plitvice" },
            { title: "Bled, Slovénie", text: "Un trajet privé serein vers Bled, son lac et les vues alpines, avec un horaire conçu pour votre journée. L'itinéraire depuis Zagreb est organisé en véhicule privé, sans partage ni précipitation inutile. Vous avez du temps pour le lac, une promenade au bord de l'eau, la vue depuis le château ou un déjeuner selon vos envies. Nous pouvons adapter le trajet aux pauses, aux bagages et à la suite de votre voyage. Avant confirmation, nous vérifions la frontière, votre programme et une heure de retour réaliste.", cta: "Planifier une excursion à Bled" },
            { title: "Ljubljana", text: "Découvrez la capitale slovène en véhicule privé, avec du temps pour la marche, le déjeuner et votre propre programme. Nous commençons par une prise en charge à Zagreb et un trajet privé direct jusqu'au centre. Découvrez la ville à pied, prenez un café près de la Ljubljanica ou visitez les lieux que vous avez choisis. Le programme laisse de la place à votre rythme, à un rendez-vous, au déjeuner ou à la suite de votre voyage. Avant le trajet, nous convenons du passage de frontière, de la durée et des détails pratiques de la journée.", cta: "Planifier une excursion à Ljubljana" },
            { title: "Maribor", text: "Une journée flexible dans le nord de la Slovénie, entre ville, vignobles et paysages. Le départ de Zagreb suit votre programme, sans partager le véhicule avec d'autres voyageurs. La journée peut inclure du temps en ville, le long de la Drava et dans les régions viticoles voisines selon vos intérêts. Nous convenons des pauses et des arrêts à l'avance afin de laisser de la place aux découvertes spontanées. Avant confirmation, nous vérifions le passage de frontière, la durée du trajet et le véhicule adapté à votre groupe.", cta: "Planifier une excursion à Maribor" },
            { title: "Trieste", text: "Une journée entre Zagreb et l'Adriatique : Trieste, cafés, front de mer et transport privé porte à porte. Nous organisons le départ de Zagreb à une heure qui vous laisse une journée calme et riche dans la ville. Promenez-vous au bord de la mer, découvrez les places et choisissez votre café ou déjeuner sans horaire de groupe. L'itinéraire peut être adapté à des arrêts supplémentaires, aux bagages et à la suite de votre voyage. Avant le départ, nous coordonnons la durée, le passage de frontière et un plan de retour qui vous convient.", cta: "Planifier une excursion à Trieste" }
          ]
        },
        {
          tag: "Bientôt disponible",
          title: "Transferts longue distance en Europe centrale",
          note: "L'Autriche, l'Allemagne, la Hongrie et d'autres liaisons ouvriront progressivement. Les excursions depuis Zagreb ci-dessus restent disponibles séparément.",
          cards: [
            { title: "Autriche", text: "Des trajets privés longue distance vers Vienne et d'autres villes autrichiennes sont en préparation pour la prochaine phase.", badge: "Bientôt disponible" },
            { title: "Allemagne", text: "Les transferts internationaux vers l'Allemagne seront disponibles après l'ouverture du réseau d'itinéraires élargi.", badge: "Bientôt disponible" },
            { title: "Hongrie", text: "Les liaisons privées vers la Hongrie sont prévues dans la prochaine phase du service transfrontalier.", badge: "Bientôt disponible" },
            { title: "Slovénie élargie", text: "Les excursions depuis Zagreb restent disponibles, tandis que d'autres liaisons longue distance vers la Slovénie sont préparées pour une ouverture ultérieure.", badge: "Bientôt disponible" }
          ]
        }
      ],
      detail: {
        tag: "Voyagez à votre rythme",
        title: "Une excursion privée offre une liberté qu'un circuit de groupe ne peut pas donner.",
        paragraphs: [
          "Tous les voyageurs ne souhaitent pas la même journée : certains préfèrent une parenthèse tranquille sur la côte, d'autres un déjeuner avec vue, des vins locaux ou plusieurs heures dans une nouvelle ville. Une excursion privée laisse de la place au programme qui vous ressemble, pas à un horaire conçu pour tous.",
          "Pour les excursions vers les pays voisins, nous coordonnons à l'avance l'heure de départ, les frontières, les arrêts et la taille du véhicule. Envoyez-nous la date et le nombre de passagers; nous confirmerons les possibilités, l'organisation et le prix final avant la réservation."
        ],
        points: [
          "Prise en charge et arrivée aux adresses de votre choix",
          "Un plan adapté au vol, au check-in ou à la suite du voyage",
          "Aller-retour et itinéraires avec plusieurs arrêts possibles",
          "Une alternative confortable aux transports publics et navettes partagées"
        ],
        cta: "Envoyer votre programme d'excursion"
      },
      final: {
        title: "Votre prochaine destination mérite un bon départ.",
        text: "Dites-nous où vous allez, quand vous voyagez et combien de personnes vous accompagnent. Nous préparerons une proposition claire de transfert privé pour votre itinéraire.",
        primaryCta: "Demander un devis d'itinéraire",
        secondaryCta: "Réserver un trajet privé",
        secondaryHref: "services"
      },
      seoDescription: "Excursions privées depuis Dubrovnik et Zagreb vers Kotor, Perast, Mostar, Ston, les lacs de Plitvice, Bled, Ljubljana, Maribor et Trieste."
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
      seoDescription: "Découvrez Aurora Private Transfers, une agence de transferts privés pour voyageurs internationaux à Dubrovnik, en Croatie et en Europe centrale."
    }
  }
} as const satisfies Record<Lang, Record<MarketingPage, MarketingPageContent>>;

export function isMarketingPage(page: Page): page is MarketingPage {
  return (marketingPages as readonly string[]).includes(page);
}

export function getMarketingPageContent(lang: Lang, page: MarketingPage) {
  return pageCopy[lang][page];
}
