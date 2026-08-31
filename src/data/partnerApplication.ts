import type { Lang } from "./site";

const partnerApplicationContent = {
  hr: {
    tag: "Partnerstvo s Aurorom",
    title: "Vozite s Aurorom.",
    intro: "Pridružite se mreži provjerenih vozača i licenciranih prijevozničkih partnera za privatne transfere u Hrvatskoj i srednjoj Europi.",
    statement: "Zajedno stvaramo putovanja bez napora.",
    imageAlt: "Udobno vozilo za privatne transfere uz jadransku obalu",
    benefitsTag: "Za profesionalne partnere",
    benefitsTitle: "Partnerstvo za bolja putovanja",
    benefitsText: "Aurora spaja profesionalne vozače s međunarodnim putnicima koji traže pouzdanu uslugu, jasnu komunikaciju i kvalitetnu vožnju.",
    benefits: ["Dosegnite međunarodne putnike", "Odaberite rute koje odgovaraju vašem poslovanju", "Prije prihvaćanja vidite jasne detalje vožnje", "Radite s platformom napravljenom za profesionalne vozače"],
    formTag: "Prijava partnera",
    formTitle: "Recite nam više o svojem poslovanju",
    formIntro: "Svaku prijavu pregledavamo osobno. Nakon provjere javit ćemo vam se s idućim koracima.",
    applicantType: "Vrsta prijave",
    individualDriver: "Samostalni vozač",
    individualDriverText: "Vozite pod vlastitom licencom.",
    transportCompany: "Prijevoznička tvrtka",
    transportCompanyText: "Prijavljujete vozilo ili flotu tvrtke.",
    sections: { profile: "O vama", qualifications: "Licenca i dostupnost", vehicle: "Vaše vozilo", coverage: "Područje rada i rute", photos: "Fotografije vozila", final: "Završni detalji" },
    fields: {
      fullName: "Ime i prezime", companyName: "Naziv tvrtke", email: "Poslovni email", phone: "Telefon", country: "Država", baseCity: "Grad u kojem ste smješteni", yearsExperience: "Godine iskustva u prijevozu", licenseNumber: "Broj vozačke dozvole", transportPermit: "Broj dozvole za prijevoz", insuranceValidUntil: "Osiguranje vrijedi do", otherLanguages: "Ostali jezici", vehicleMake: "Marka vozila", vehicleModel: "Model vozila", vehicleYear: "Godište vozila", plateNumber: "Registracijska oznaka", vehicleColor: "Boja vozila", seats: "Broj sjedala za putnike", luggageCapacity: "Kapacitet prtljage (komada)", serviceBase: "Polazišna lokacija za vožnje", coverageCountries: "Države i područja koja pokrivate", usualRoutes: "Uobičajene rute ili posebnosti usluge", notes: "Dodatna napomena (opcionalno)"
    },
    languages: [["english", "Engleski"], ["croatian", "Hrvatski"], ["german", "Njemački"], ["french", "Francuski"], ["other", "Drugi"]],
    availability: [["daytime", "Dnevne vožnje"], ["evenings", "Večeri i noći"], ["weekends", "Vikendi"], ["seasonal", "Sezonski angažman"], ["long-distance", "Duge i prekogranične rute"]],
    vehicleTypes: [["sedan", "Limuzina"], ["premium-sedan", "Premium limuzina"], ["suv", "SUV"], ["minivan", "Monovolumen"], ["van", "Kombi"], ["minibus", "Minibus"]],
    amenities: [["air-conditioning", "Klimatizacija"], ["wifi", "Wi-Fi"], ["child-seats", "Dječje sjedalice"], ["water", "Voda za putnike"], ["accessibility", "Prilagođeno osobama s invaliditetom"]],
    languageLabel: "Jezici kojima govorite s putnicima", availabilityLabel: "Kada ste dostupni", vehicleTypeLabel: "Vrsta vozila", amenitiesLabel: "Oprema vozila", photoLabel: "Dodajte do tri fotografije", photoText: "Vanjski izgled, interijer ili prostor za prtljagu", choosePhotos: "Odaberi fotografije", noPhotos: "Nijedna fotografija nije odabrana", agreement: "Potvrđujem da su navedeni podaci točni i dopuštam Aurori da me kontaktira u vezi s ovom prijavom.", submit: "Pošalji prijavu za partnerstvo", preparingPhotos: "Pripremamo fotografije...", sending: "Šaljemo prijavu...", photoLimit: "Dodajte najviše tri fotografije.", photoRequired: "Dodajte barem jednu fotografiju vozila.", photoSize: "Svaka fotografija mora biti manja od 14 MB.", uploadError: "Fotografije se trenutno ne mogu pripremiti. Pokušajte ponovno s manjim datotekama.", genericError: "Prijavu trenutačno nije moguće poslati. Pokušajte ponovno.", successTitle: "Prijava je zaprimljena", successText: "Hvala na interesu za partnerstvo s Aurom. Naš tim pregledat će podatke i javiti vam se na navedeni email.", referenceLabel: "Referenca prijave", applyAgain: "Pošalji novu prijavu"
  },
  en: {
    tag: "Partner with Aurora",
    title: "Drive with Aurora.",
    intro: "Join a network of vetted drivers and licensed transport partners for private transfers across Croatia and Central Europe.",
    statement: "Together, we make every journey effortless.",
    imageAlt: "Comfortable private transfer vehicle by the Adriatic coast",
    benefitsTag: "For professional partners",
    benefitsTitle: "A partnership built for better journeys",
    benefitsText: "Aurora connects professional drivers with international travellers who value reliable service, clear communication and a high-quality ride.",
    benefits: ["Reach international travellers", "Choose routes that fit your operation", "See clear ride details before you accept", "Work with a platform designed for professional drivers"],
    formTag: "Partner application",
    formTitle: "Tell us about your operation",
    formIntro: "Every application is reviewed personally. Once we have checked your details, we will contact you with the next steps.",
    applicantType: "Application type",
    individualDriver: "Independent driver",
    individualDriverText: "You operate under your own licence.",
    transportCompany: "Transport company",
    transportCompanyText: "You are applying with a company vehicle or fleet.",
    sections: { profile: "About you", qualifications: "Licensing and availability", vehicle: "Your vehicle", coverage: "Coverage and routes", photos: "Vehicle photos", final: "Final details" },
    fields: {
      fullName: "Full name", companyName: "Company name", email: "Business email", phone: "Phone", country: "Country", baseCity: "City where you are based", yearsExperience: "Years in passenger transport", licenseNumber: "Driving licence number", transportPermit: "Passenger transport permit number", insuranceValidUntil: "Insurance valid until", otherLanguages: "Other languages", vehicleMake: "Vehicle make", vehicleModel: "Vehicle model", vehicleYear: "Vehicle model year", plateNumber: "Registration plate", vehicleColor: "Vehicle colour", seats: "Passenger seats", luggageCapacity: "Luggage capacity (pieces)", serviceBase: "Ride starting location", coverageCountries: "Countries and areas you cover", usualRoutes: "Usual routes or service specialties", notes: "Additional note (optional)"
    },
    languages: [["english", "English"], ["croatian", "Croatian"], ["german", "German"], ["french", "French"], ["other", "Other"]],
    availability: [["daytime", "Daytime rides"], ["evenings", "Evenings and nights"], ["weekends", "Weekends"], ["seasonal", "Seasonal work"], ["long-distance", "Long-distance and cross-border routes"]],
    vehicleTypes: [["sedan", "Sedan"], ["premium-sedan", "Premium sedan"], ["suv", "SUV"], ["minivan", "Minivan"], ["van", "Van"], ["minibus", "Minibus"]],
    amenities: [["air-conditioning", "Air conditioning"], ["wifi", "Wi-Fi"], ["child-seats", "Child seats"], ["water", "Water for passengers"], ["accessibility", "Accessibility equipment"]],
    languageLabel: "Languages you speak with passengers", availabilityLabel: "When you are available", vehicleTypeLabel: "Vehicle type", amenitiesLabel: "Vehicle amenities", photoLabel: "Add up to three photos", photoText: "Exterior, interior or luggage-space photos", choosePhotos: "Choose photos", noPhotos: "No photos selected", agreement: "I confirm that the information provided is accurate and allow Aurora to contact me about this application.", submit: "Send partnership application", preparingPhotos: "Preparing photos...", sending: "Sending application...", photoLimit: "Please add no more than three photos.", photoRequired: "Please add at least one vehicle photo.", photoSize: "Each photo must be smaller than 14 MB.", uploadError: "The photos could not be prepared. Please try again with smaller files.", genericError: "Your application could not be sent right now. Please try again.", successTitle: "Application received", successText: "Thank you for your interest in partnering with Aurora. Our team will review your details and contact you at the email provided.", referenceLabel: "Application reference", applyAgain: "Send another application"
  },
  de: {
    tag: "Partner von Aurora werden",
    title: "Fahren Sie mit Aurora.",
    intro: "Werden Sie Teil eines Netzwerks geprüfter Fahrer und lizenzierter Beförderungspartner für Privattransfers in Kroatien und Mitteleuropa.",
    statement: "Gemeinsam machen wir jede Reise mühelos.",
    imageAlt: "Komfortables Privattransferfahrzeug an der Adriaküste",
    benefitsTag: "Für professionelle Partner",
    benefitsTitle: "Eine Partnerschaft für bessere Reisen",
    benefitsText: "Aurora verbindet professionelle Fahrer mit internationalen Reisenden, die verlässlichen Service, klare Kommunikation und eine hochwertige Fahrt schätzen.",
    benefits: ["Erreichen Sie internationale Reisende", "Wählen Sie Routen, die zu Ihrem Betrieb passen", "Sehen Sie alle Fahrtdetails vor der Annahme", "Arbeiten Sie mit einer Plattform für professionelle Fahrer"],
    formTag: "Partneranfrage",
    formTitle: "Erzählen Sie uns von Ihrem Betrieb",
    formIntro: "Jede Anfrage wird persönlich geprüft. Nach der Prüfung Ihrer Angaben melden wir uns mit den nächsten Schritten.",
    applicantType: "Art der Anfrage",
    individualDriver: "Selbstständiger Fahrer",
    individualDriverText: "Sie fahren unter Ihrer eigenen Lizenz.",
    transportCompany: "Beförderungsunternehmen",
    transportCompanyText: "Sie bewerben sich mit einem Firmenfahrzeug oder einer Flotte.",
    sections: { profile: "Über Sie", qualifications: "Lizenz und Verfügbarkeit", vehicle: "Ihr Fahrzeug", coverage: "Einsatzgebiet und Routen", photos: "Fahrzeugfotos", final: "Abschließende Angaben" },
    fields: {
      fullName: "Vollständiger Name", companyName: "Firmenname", email: "Geschäftliche E-Mail", phone: "Telefon", country: "Land", baseCity: "Ihr Standort", yearsExperience: "Jahre in der Personenbeförderung", licenseNumber: "Führerscheinnummer", transportPermit: "Nummer der Beförderungsgenehmigung", insuranceValidUntil: "Versicherung gültig bis", otherLanguages: "Weitere Sprachen", vehicleMake: "Fahrzeugmarke", vehicleModel: "Fahrzeugmodell", vehicleYear: "Baujahr", plateNumber: "Kennzeichen", vehicleColor: "Fahrzeugfarbe", seats: "Fahrgastsitze", luggageCapacity: "Gepäckkapazität (Stück)", serviceBase: "Startort für Fahrten", coverageCountries: "Länder und Gebiete, die Sie abdecken", usualRoutes: "Übliche Routen oder besondere Leistungen", notes: "Zusätzliche Nachricht (optional)"
    },
    languages: [["english", "Englisch"], ["croatian", "Kroatisch"], ["german", "Deutsch"], ["french", "Französisch"], ["other", "Andere"]],
    availability: [["daytime", "Fahrten tagsüber"], ["evenings", "Abends und nachts"], ["weekends", "Wochenenden"], ["seasonal", "Saisonale Tätigkeit"], ["long-distance", "Fern- und grenzüberschreitende Fahrten"]],
    vehicleTypes: [["sedan", "Limousine"], ["premium-sedan", "Premium-Limousine"], ["suv", "SUV"], ["minivan", "Van"], ["van", "Kleinbus"], ["minibus", "Minibus"]],
    amenities: [["air-conditioning", "Klimaanlage"], ["wifi", "WLAN"], ["child-seats", "Kindersitze"], ["water", "Wasser für Fahrgäste"], ["accessibility", "Barrierefreie Ausstattung"]],
    languageLabel: "Sprachen für die Kommunikation mit Fahrgästen", availabilityLabel: "Wann Sie verfügbar sind", vehicleTypeLabel: "Fahrzeugtyp", amenitiesLabel: "Fahrzeugausstattung", photoLabel: "Bis zu drei Fotos hinzufügen", photoText: "Fotos vom Außenbereich, Innenraum oder Kofferraum", choosePhotos: "Fotos auswählen", noPhotos: "Keine Fotos ausgewählt", agreement: "Ich bestätige, dass die angegebenen Informationen korrekt sind, und erlaube Aurora, mich zu dieser Anfrage zu kontaktieren.", submit: "Partneranfrage senden", preparingPhotos: "Fotos werden vorbereitet...", sending: "Anfrage wird gesendet...", photoLimit: "Bitte fügen Sie höchstens drei Fotos hinzu.", photoRequired: "Bitte fügen Sie mindestens ein Fahrzeugfoto hinzu.", photoSize: "Jedes Foto muss kleiner als 14 MB sein.", uploadError: "Die Fotos konnten nicht vorbereitet werden. Versuchen Sie es bitte erneut mit kleineren Dateien.", genericError: "Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut.", successTitle: "Anfrage erhalten", successText: "Vielen Dank für Ihr Interesse an einer Partnerschaft mit Aurora. Unser Team prüft Ihre Angaben und meldet sich über die angegebene E-Mail-Adresse.", referenceLabel: "Anfragereferenz", applyAgain: "Weitere Anfrage senden"
  },
  fr: {
    tag: "Devenez partenaire Aurora",
    title: "Conduisez avec Aurora.",
    intro: "Rejoignez un réseau de chauffeurs vérifiés et de partenaires de transport agréés pour des transferts privés en Croatie et en Europe centrale.",
    statement: "Ensemble, nous rendons chaque trajet sans effort.",
    imageAlt: "Véhicule confortable de transfert privé sur la côte adriatique",
    benefitsTag: "Pour les partenaires professionnels",
    benefitsTitle: "Un partenariat pour de meilleurs voyages",
    benefitsText: "Aurora met en relation des chauffeurs professionnels avec des voyageurs internationaux qui recherchent un service fiable, une communication claire et un trajet de qualité.",
    benefits: ["Touchez des voyageurs internationaux", "Choisissez les itinéraires adaptés à votre activité", "Consultez les détails clairs de chaque trajet avant acceptation", "Travaillez avec une plateforme conçue pour les chauffeurs professionnels"],
    formTag: "Candidature partenaire",
    formTitle: "Parlez-nous de votre activité",
    formIntro: "Chaque candidature est examinée personnellement. Après vérification de vos informations, nous vous contacterons pour la suite.",
    applicantType: "Type de candidature",
    individualDriver: "Chauffeur indépendant",
    individualDriverText: "Vous exercez avec votre propre licence.",
    transportCompany: "Société de transport",
    transportCompanyText: "Vous postulez avec un véhicule ou une flotte d'entreprise.",
    sections: { profile: "À votre sujet", qualifications: "Licence et disponibilité", vehicle: "Votre véhicule", coverage: "Zone de service et itinéraires", photos: "Photos du véhicule", final: "Derniers détails" },
    fields: {
      fullName: "Nom complet", companyName: "Nom de l'entreprise", email: "E-mail professionnel", phone: "Téléphone", country: "Pays", baseCity: "Ville où vous êtes basé", yearsExperience: "Années dans le transport de passagers", licenseNumber: "Numéro de permis de conduire", transportPermit: "Numéro d'autorisation de transport", insuranceValidUntil: "Assurance valable jusqu'au", otherLanguages: "Autres langues", vehicleMake: "Marque du véhicule", vehicleModel: "Modèle du véhicule", vehicleYear: "Année du véhicule", plateNumber: "Plaque d'immatriculation", vehicleColor: "Couleur du véhicule", seats: "Places passagers", luggageCapacity: "Capacité bagages (pièces)", serviceBase: "Point de départ des courses", coverageCountries: "Pays et zones couverts", usualRoutes: "Itinéraires habituels ou spécificités du service", notes: "Note complémentaire (facultatif)"
    },
    languages: [["english", "Anglais"], ["croatian", "Croate"], ["german", "Allemand"], ["french", "Français"], ["other", "Autre"]],
    availability: [["daytime", "Courses de jour"], ["evenings", "Soirées et nuits"], ["weekends", "Week-ends"], ["seasonal", "Activité saisonnière"], ["long-distance", "Longues distances et trajets transfrontaliers"]],
    vehicleTypes: [["sedan", "Berline"], ["premium-sedan", "Berline premium"], ["suv", "SUV"], ["minivan", "Monospace"], ["van", "Van"], ["minibus", "Minibus"]],
    amenities: [["air-conditioning", "Climatisation"], ["wifi", "Wi-Fi"], ["child-seats", "Sièges enfant"], ["water", "Eau pour les passagers"], ["accessibility", "Équipement d'accessibilité"]],
    languageLabel: "Langues parlées avec les passagers", availabilityLabel: "Vos disponibilités", vehicleTypeLabel: "Type de véhicule", amenitiesLabel: "Équipements du véhicule", photoLabel: "Ajoutez jusqu'à trois photos", photoText: "Photos de l'extérieur, de l'intérieur ou de l'espace bagages", choosePhotos: "Choisir des photos", noPhotos: "Aucune photo sélectionnée", agreement: "Je confirme que les informations fournies sont exactes et autorise Aurora à me contacter au sujet de cette candidature.", submit: "Envoyer la candidature", preparingPhotos: "Préparation des photos...", sending: "Envoi de la candidature...", photoLimit: "Ajoutez au maximum trois photos.", photoRequired: "Ajoutez au moins une photo du véhicule.", photoSize: "Chaque photo doit faire moins de 14 Mo.", uploadError: "Les photos n'ont pas pu être préparées. Réessayez avec des fichiers plus petits.", genericError: "Votre candidature ne peut pas être envoyée pour le moment. Veuillez réessayer.", successTitle: "Candidature reçue", successText: "Merci de votre intérêt pour un partenariat avec Aurora. Notre équipe examinera vos informations et vous contactera à l'adresse e-mail fournie.", referenceLabel: "Référence de candidature", applyAgain: "Envoyer une autre candidature"
  }
} as const;

export function getPartnerApplicationContent(lang: Lang) {
  return partnerApplicationContent[lang] || partnerApplicationContent.en;
}
