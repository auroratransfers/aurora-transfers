const CROATIA_PLACE_CATALOG = [
  { id: "airport-dubrovnik", name: "Dubrovnik Airport (DBV)", detail: "Čilipi · Dubrovnik-Neretva", category: "airport", latitude: 42.5614, longitude: 18.2682, priority: 100, aliases: ["dubrovnik airport", "dbv", "cilipi", "čilipI"] },
  { id: "airport-zagreb", name: "Zagreb Airport (ZAG)", detail: "Franjo Tuđman Airport · Velika Gorica", category: "airport", latitude: 45.7429, longitude: 16.0688, priority: 99, aliases: ["zagreb airport", "zag", "franjo tudman", "velika gorica"] },
  { id: "airport-split", name: "Split Airport (SPU)", detail: "Kaštela · Split-Dalmatia", category: "airport", latitude: 43.5389, longitude: 16.298, priority: 97, aliases: ["split airport", "spu", "kastela", "kaštela"] },
  { id: "airport-zadar", name: "Zadar Airport (ZAD)", detail: "Zadar", category: "airport", latitude: 44.1083, longitude: 15.3467, priority: 94, aliases: ["zadar airport", "zad"] },
  { id: "airport-pula", name: "Pula Airport (PUY)", detail: "Pula · Istria", category: "airport", latitude: 44.8935, longitude: 13.9222, priority: 91, aliases: ["pula airport", "puy"] },
  { id: "airport-rijeka", name: "Rijeka Airport (RJK)", detail: "Omišalj · Krk", category: "airport", latitude: 45.2169, longitude: 14.5703, priority: 84, aliases: ["rijeka airport", "rjk", "omisalj", "omišalj", "krk airport"] },
  { id: "airport-osijek", name: "Osijek Airport (OSI)", detail: "Klisa · Slavonia", category: "airport", latitude: 45.4627, longitude: 18.8102, priority: 70, aliases: ["osijek airport", "osi", "klisa"] },
  { id: "airport-brac", name: "Brač Airport (BWK)", detail: "Bol · Brač", category: "airport", latitude: 43.2857, longitude: 16.6797, priority: 70, aliases: ["brac airport", "brač airport", "bwk", "bol airport"] },
  { id: "city-dubrovnik", name: "Dubrovnik", detail: "Dubrovnik-Neretva", category: "city", latitude: 42.6507, longitude: 18.0944, priority: 100, aliases: ["dubrovnik"] },
  { id: "city-zagreb", name: "Zagreb", detail: "City of Zagreb", category: "city", latitude: 45.815, longitude: 15.9819, priority: 99, aliases: ["zagreb"] },
  { id: "city-split", name: "Split", detail: "Split-Dalmatia", category: "city", latitude: 43.5081, longitude: 16.4402, priority: 97, aliases: ["split"] },
  { id: "city-zadar", name: "Zadar", detail: "Zadar County", category: "city", latitude: 44.1194, longitude: 15.2314, priority: 94, aliases: ["zadar"] },
  { id: "city-sibenik", name: "Šibenik", detail: "Šibenik-Knin", category: "city", latitude: 43.735, longitude: 15.8952, priority: 90, aliases: ["sibenik", "šibenik"] },
  { id: "city-trogir", name: "Trogir", detail: "Split-Dalmatia", category: "city", latitude: 43.5167, longitude: 16.2514, priority: 88, aliases: ["trogir"] },
  { id: "city-pula", name: "Pula", detail: "Istria", category: "city", latitude: 44.8666, longitude: 13.8496, priority: 88, aliases: ["pula"] },
  { id: "city-rovinj", name: "Rovinj", detail: "Istria", category: "city", latitude: 45.0812, longitude: 13.6387, priority: 86, aliases: ["rovinj"] },
  { id: "city-porec", name: "Poreč", detail: "Istria", category: "city", latitude: 45.2257, longitude: 13.5951, priority: 84, aliases: ["porec", "poreč"] },
  { id: "city-rijeka", name: "Rijeka", detail: "Primorje-Gorski Kotar", category: "city", latitude: 45.3271, longitude: 14.4422, priority: 85, aliases: ["rijeka"] },
  { id: "city-opatija", name: "Opatija", detail: "Kvarner", category: "city", latitude: 45.3376, longitude: 14.3052, priority: 82, aliases: ["opatija"] },
  { id: "city-makarska", name: "Makarska", detail: "Makarska Riviera", category: "city", latitude: 43.2969, longitude: 17.0178, priority: 81, aliases: ["makarska"] },
  { id: "city-hvar", name: "Hvar Town", detail: "Island of Hvar", category: "city", latitude: 43.1729, longitude: 16.4424, priority: 84, aliases: ["hvar", "hvar town"] },
  { id: "city-korcula", name: "Korčula", detail: "Island of Korčula", category: "city", latitude: 42.9604, longitude: 17.1353, priority: 80, aliases: ["korcula", "korčula"] },
  { id: "city-bol", name: "Bol", detail: "Island of Brač", category: "city", latitude: 43.2619, longitude: 16.655, priority: 78, aliases: ["bol", "brac", "brač"] },
  { id: "city-novalja", name: "Novalja", detail: "Island of Pag", category: "city", latitude: 44.5473, longitude: 14.8837, priority: 76, aliases: ["novalja"] },
  { id: "city-pag", name: "Pag", detail: "Island of Pag", category: "city", latitude: 44.445, longitude: 15.055, priority: 74, aliases: ["pag"] },
  { id: "city-umag", name: "Umag", detail: "Istria", category: "city", latitude: 45.4371, longitude: 13.5257, priority: 74, aliases: ["umag"] },
  { id: "city-crikvenica", name: "Crikvenica", detail: "Kvarner", category: "city", latitude: 45.1772, longitude: 14.6914, priority: 73, aliases: ["crikvenica"] },
  { id: "city-vodice", name: "Vodice", detail: "Šibenik-Knin", category: "city", latitude: 43.7608, longitude: 15.7822, priority: 73, aliases: ["vodice"] },
  { id: "city-primosten", name: "Primošten", detail: "Šibenik-Knin", category: "city", latitude: 43.5861, longitude: 15.9234, priority: 72, aliases: ["primosten", "primošten"] },
  { id: "city-biograd", name: "Biograd na Moru", detail: "Zadar County", category: "city", latitude: 43.9433, longitude: 15.4519, priority: 71, aliases: ["biograd", "biograd na moru"] },
  { id: "city-nin", name: "Nin", detail: "Zadar County", category: "city", latitude: 44.2406, longitude: 15.1839, priority: 69, aliases: ["nin"] },
  { id: "city-cavtat", name: "Cavtat", detail: "Konavle · Dubrovnik-Neretva", category: "city", latitude: 42.5811, longitude: 18.2183, priority: 88, aliases: ["cavtat"] },
  { id: "city-mlini", name: "Mlini", detail: "Župa Dubrovačka", category: "city", latitude: 42.6244, longitude: 18.2053, priority: 80, aliases: ["mlini"] },
  { id: "city-slano", name: "Slano", detail: "Dubrovnik-Neretva", category: "city", latitude: 42.7872, longitude: 17.8911, priority: 72, aliases: ["slano"] },
  { id: "city-ston", name: "Ston", detail: "Pelješac", category: "city", latitude: 42.8384, longitude: 17.6969, priority: 75, aliases: ["ston"] },
  { id: "city-orebic", name: "Orebić", detail: "Pelješac", category: "city", latitude: 42.9845, longitude: 17.174, priority: 73, aliases: ["orebic", "orebić"] },
  { id: "city-brela", name: "Brela", detail: "Makarska Riviera", category: "city", latitude: 43.3681, longitude: 16.9343, priority: 75, aliases: ["brela"] },
  { id: "city-baska-voda", name: "Baška Voda", detail: "Makarska Riviera", category: "city", latitude: 43.3569, longitude: 16.9503, priority: 74, aliases: ["baska voda", "baška voda"] },
  { id: "city-tucepi", name: "Tučepi", detail: "Makarska Riviera", category: "city", latitude: 43.2729, longitude: 17.054, priority: 72, aliases: ["tucepi", "tučepi"] },
  { id: "city-krk", name: "Krk", detail: "Island of Krk", category: "city", latitude: 45.0276, longitude: 14.5754, priority: 71, aliases: ["krk"] },
  { id: "city-baska", name: "Baška", detail: "Island of Krk", category: "city", latitude: 44.9706, longitude: 14.7535, priority: 70, aliases: ["baska", "baška"] },
  { id: "city-malinska", name: "Malinska", detail: "Island of Krk", category: "city", latitude: 45.1246, longitude: 14.5283, priority: 68, aliases: ["malinska"] },
  { id: "city-rab", name: "Rab", detail: "Island of Rab", category: "city", latitude: 44.7567, longitude: 14.7593, priority: 70, aliases: ["rab"] },
  { id: "city-varazdin", name: "Varaždin", detail: "Varaždin County", category: "city", latitude: 46.3057, longitude: 16.3366, priority: 68, aliases: ["varazdin", "varaždin"] },
  { id: "city-karlovac", name: "Karlovac", detail: "Karlovac County", category: "city", latitude: 45.4893, longitude: 15.5553, priority: 65, aliases: ["karlovac"] },
  { id: "city-osijek", name: "Osijek", detail: "Osijek-Baranja", category: "city", latitude: 45.555, longitude: 18.6955, priority: 68, aliases: ["osijek"] },
  { id: "old-town-dubrovnik", name: "Dubrovnik Old Town", detail: "UNESCO World Heritage Site", category: "old-town", latitude: 42.6409, longitude: 18.1086, priority: 100, aliases: ["old town dubrovnik", "dubrovnik old town", "stari grad dubrovnik", "pile gate", "pila"] },
  { id: "old-town-split", name: "Diocletian's Palace", detail: "Split Old Town · UNESCO", category: "old-town", latitude: 43.5086, longitude: 16.4404, priority: 90, aliases: ["diocletian palace", "split old town", "stari grad split", "dioklecijanova palaca", "dioklecijanova palača"] },
  { id: "old-town-trogir", name: "Trogir Old Town", detail: "UNESCO World Heritage Site", category: "old-town", latitude: 43.5161, longitude: 16.2512, priority: 84, aliases: ["trogir old town", "stari grad trogir"] },
  { id: "old-town-sibenik", name: "Šibenik Old Town", detail: "St. James Cathedral · UNESCO", category: "old-town", latitude: 43.7357, longitude: 15.8917, priority: 80, aliases: ["sibenik old town", "šibenik old town", "stari grad sibenik", "stari grad šibenik"] },
  { id: "old-town-zadar", name: "Zadar Old Town", detail: "Peninsula · Sea Organ", category: "old-town", latitude: 44.1149, longitude: 15.2247, priority: 79, aliases: ["zadar old town", "stari grad zadar", "sea organ", "morske orgulje"] },
  { id: "old-town-rovinj", name: "Rovinj Old Town", detail: "Istria", category: "old-town", latitude: 45.083, longitude: 13.6338, priority: 77, aliases: ["rovinj old town", "stari grad rovinj"] },
  { id: "old-town-porec", name: "Poreč Old Town", detail: "Euphrasian Basilica · UNESCO", category: "old-town", latitude: 45.2275, longitude: 13.5943, priority: 74, aliases: ["porec old town", "poreč old town", "stari grad porec", "stari grad poreč"] },
  { id: "old-town-zagreb", name: "Zagreb Upper Town", detail: "Gornji Grad", category: "old-town", latitude: 45.8148, longitude: 15.9736, priority: 74, aliases: ["zagreb upper town", "gornji grad", "old town zagreb"] },
  { id: "old-town-korcula", name: "Korčula Old Town", detail: "Island of Korčula", category: "old-town", latitude: 42.9608, longitude: 17.1358, priority: 74, aliases: ["korcula old town", "korčula old town", "stari grad korcula", "stari grad korčula"] },
  { id: "port-gruz", name: "Port of Gruž", detail: "Dubrovnik ferry and cruise port", category: "port", latitude: 42.659, longitude: 18.083, priority: 96, aliases: ["gruz", "gruž", "port gruz", "dubrovnik ferry port", "dubrovnik port"] },
  { id: "marina-aci-dubrovnik", name: "ACI Marina Dubrovnik", detail: "Komolac · Dubrovnik", category: "marina", latitude: 42.6675, longitude: 18.1381, priority: 88, aliases: ["aci marina dubrovnik", "komolac marina"] },
  { id: "port-split", name: "Split Ferry Port", detail: "Split", category: "port", latitude: 43.5032, longitude: 16.4433, priority: 90, aliases: ["split ferry port", "split port", "luka split"] },
  { id: "marina-aci-split", name: "ACI Marina Split", detail: "Split", category: "marina", latitude: 43.5108, longitude: 16.4294, priority: 80, aliases: ["aci marina split"] },
  { id: "port-zadar-gazenica", name: "Zadar Gaženica Ferry Port", detail: "Zadar", category: "port", latitude: 44.0923, longitude: 15.2744, priority: 83, aliases: ["gazenica", "gaženica", "zadar ferry port", "zadar port"] },
  { id: "marina-aci-zadar", name: "ACI Marina Zadar", detail: "Zadar Old Town", category: "marina", latitude: 44.1167, longitude: 15.2237, priority: 76, aliases: ["aci marina zadar"] },
  { id: "marina-aci-trogir", name: "ACI Marina Trogir", detail: "Trogir", category: "marina", latitude: 43.514, longitude: 16.2478, priority: 76, aliases: ["aci marina trogir"] },
  { id: "marina-frapa", name: "Marina Frapa", detail: "Rogoznica", category: "marina", latitude: 43.5285, longitude: 15.9688, priority: 78, aliases: ["marina frapa", "rogoznica marina"] },
  { id: "marina-punat", name: "Marina Punat", detail: "Island of Krk", category: "marina", latitude: 45.022, longitude: 14.6278, priority: 72, aliases: ["marina punat"] },
  { id: "marina-aci-pula", name: "ACI Marina Pula", detail: "Pula", category: "marina", latitude: 44.8719, longitude: 13.849, priority: 74, aliases: ["aci marina pula"] },
  { id: "marina-aci-rovinj", name: "ACI Marina Rovinj", detail: "Rovinj", category: "marina", latitude: 45.083, longitude: 13.6378, priority: 72, aliases: ["aci marina rovinj"] },
  { id: "port-rijeka", name: "Port of Rijeka", detail: "Rijeka", category: "port", latitude: 45.3272, longitude: 14.4391, priority: 72, aliases: ["port rijeka", "rijeka port", "luka rijeka"] },
  { id: "hotel-excelsior", name: "Hotel Excelsior Dubrovnik", detail: "Ploče · Dubrovnik", category: "hotel", latitude: 42.6381, longitude: 18.1156, priority: 92, aliases: ["hotel excelsior dubrovnik", "excelsior"] },
  { id: "hotel-dubrovnik-palace", name: "Hotel Dubrovnik Palace", detail: "Lapad · Dubrovnik", category: "hotel", latitude: 42.6465, longitude: 18.0579, priority: 91, aliases: ["hotel dubrovnik palace", "dubrovnik palace"] },
  { id: "hotel-rixos", name: "Rixos Premium Dubrovnik", detail: "Dubrovnik", category: "hotel", latitude: 42.6453, longitude: 18.0903, priority: 90, aliases: ["rixos dubrovnik", "rixos premium"] },
  { id: "hotel-sun-gardens", name: "Sun Gardens Dubrovnik", detail: "Orašac · Dubrovnik", category: "hotel", latitude: 42.6883, longitude: 18.0224, priority: 88, aliases: ["sun gardens", "sun gardens dubrovnik", "orasac", "orašac"] },
  { id: "hotel-hilton-imperial", name: "Hilton Imperial Dubrovnik", detail: "Pile · Dubrovnik", category: "hotel", latitude: 42.6417, longitude: 18.104, priority: 87, aliases: ["hilton imperial", "hilton dubrovnik"] },
  { id: "hotel-bellevue", name: "Hotel Bellevue Dubrovnik", detail: "Dubrovnik", category: "hotel", latitude: 42.6444, longitude: 18.0967, priority: 86, aliases: ["hotel bellevue dubrovnik", "bellevue dubrovnik"] },
  { id: "hotel-kompas", name: "Hotel Kompas Dubrovnik", detail: "Lapad · Dubrovnik", category: "hotel", latitude: 42.6492, longitude: 18.0722, priority: 85, aliases: ["hotel kompas dubrovnik", "kompas dubrovnik"] },
  { id: "hotel-more", name: "Hotel More Dubrovnik", detail: "Lapad · Dubrovnik", category: "hotel", latitude: 42.6533, longitude: 18.0694, priority: 83, aliases: ["hotel more dubrovnik", "more dubrovnik"] },
  { id: "hotel-lacroma", name: "Valamar Lacroma Dubrovnik", detail: "Babin Kuk · Dubrovnik", category: "hotel", latitude: 42.6596, longitude: 18.0717, priority: 83, aliases: ["valamar lacroma", "lacroma dubrovnik"] },
  { id: "hotel-esplanade", name: "Esplanade Zagreb Hotel", detail: "Zagreb", category: "hotel", latitude: 45.8059, longitude: 15.9776, priority: 87, aliases: ["esplanade zagreb", "hotel esplanade"] },
  { id: "hotel-sheraton-zagreb", name: "Sheraton Zagreb Hotel", detail: "Zagreb", category: "hotel", latitude: 45.8066, longitude: 15.9875, priority: 80, aliases: ["sheraton zagreb"] },
  { id: "hotel-ambasador-split", name: "Hotel Ambasador Split", detail: "Split", category: "hotel", latitude: 43.5082, longitude: 16.4334, priority: 79, aliases: ["hotel ambasador split", "ambasador split"] },
  { id: "hotel-radisson-split", name: "Radisson Blu Resort & Spa, Split", detail: "Split", category: "hotel", latitude: 43.5066, longitude: 16.4664, priority: 78, aliases: ["radisson blu split"] },
  { id: "hotel-lone", name: "Hotel Lone Rovinj", detail: "Rovinj", category: "hotel", latitude: 45.0731, longitude: 13.6355, priority: 77, aliases: ["hotel lone", "lone rovinj"] },
  { id: "hotel-brioni", name: "Grand Hotel Brioni Pula", detail: "Verudela · Pula", category: "hotel", latitude: 44.8409, longitude: 13.8322, priority: 75, aliases: ["grand hotel brioni", "brioni pula"] },
  { id: "hotel-kvarner", name: "Hotel Kvarner", detail: "Opatija", category: "hotel", latitude: 45.3385, longitude: 14.3068, priority: 75, aliases: ["hotel kvarner", "kvarner opatija"] },
  { id: "attraction-plitvice", name: "Plitvice Lakes National Park", detail: "Lika-Senj", category: "attraction", latitude: 44.8654, longitude: 15.582, priority: 90, aliases: ["plitvice", "plitvice lakes", "plitvicka jezera", "plitvička jezera"] },
  { id: "attraction-krka", name: "Krka National Park", detail: "Šibenik-Knin", category: "attraction", latitude: 43.8006, longitude: 15.973, priority: 85, aliases: ["krka", "krka national park", "krka waterfalls"] },
  { id: "attraction-mljet", name: "Mljet National Park", detail: "Island of Mljet", category: "attraction", latitude: 42.7758, longitude: 17.3748, priority: 77, aliases: ["mljet", "mljet national park"] },
  { id: "attraction-blue-cave", name: "Blue Cave", detail: "Biševo · Vis", category: "attraction", latitude: 42.9811, longitude: 16.0164, priority: 76, aliases: ["blue cave", "modra spilja", "bisevo", "biševo"] },
  { id: "attraction-zlatni-rat", name: "Zlatni Rat Beach", detail: "Bol · Brač", category: "attraction", latitude: 43.2565, longitude: 16.6303, priority: 78, aliases: ["zlatni rat", "golden horn beach"] },
  { id: "attraction-biokovo", name: "Biokovo Skywalk", detail: "Biokovo Nature Park", category: "attraction", latitude: 43.3407, longitude: 17.0545, priority: 74, aliases: ["biokovo skywalk", "biokovo"] },
  { id: "attraction-paklenica", name: "Paklenica National Park", detail: "Starigrad", category: "attraction", latitude: 44.3612, longitude: 15.4589, priority: 70, aliases: ["paklenica", "paklenica national park"] },
];

function normalize(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function searchCroatiaPlaces(query, limit = 8) {
  const term = normalize(query);
  const words = term.split(/\s+/).filter(Boolean);
  return CROATIA_PLACE_CATALOG
    .map((place) => {
      const terms = [place.name, place.detail, ...(place.aliases || [])].map(normalize);
      const haystack = terms.join(" ");
      let score = place.priority;
      if (words.length) {
        for (const word of words) {
          if (terms.some((item) => item.startsWith(word))) score += 120;
          else if (haystack.includes(word)) score += 45;
          else return null;
        }
      }
      return { ...place, score };
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name))
    .slice(0, Math.max(1, Math.min(12, Number(limit) || 8)))
    .map(({ aliases, priority, score, ...place }) => ({ ...place, source: "catalog" }));
}

module.exports = { CROATIA_PLACE_CATALOG, searchCroatiaPlaces };
