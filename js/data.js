/**
 * VisaNavigator 50+ Countries Tourist Visa Database
 * Comprehensive visa categories, processing fees, timelines, passport validity & document checklists.
 */

const ORIGIN_PASSPORTS = [
  { code: "US", name: "United States (US)", flag: "🇺🇸" },
  { code: "UK", name: "United Kingdom (UK)", flag: "🇬🇧" },
  { code: "IN", name: "India (IN)", flag: "🇮🇳" },
  { code: "CA", name: "Canada (CA)", flag: "🇨🇦" },
  { code: "AU", name: "Australia (AU)", flag: "🇦🇺" },
  { code: "EU", name: "European Union / Schengen (EU)", flag: "🇪🇺" },
  { code: "SG", name: "Singapore (SG)", flag: "🇸🇬" },
  { code: "PH", name: "Philippines (PH)", flag: "🇵🇭" },
  { code: "ZA", name: "South Africa (ZA)", flag: "🇿🇦" },
  { code: "ALL", name: "General / Standard Worldwide", flag: "🌐" }
];

const COMMON_DOCS = {
  passport: {
    id: "doc-passport",
    title: "Valid Passport (Min. 6 Months Validity)",
    desc: "Must be valid for at least 6 months beyond intended exit date with at least 2 blank visa pages intact.",
    icon: "fa-passport",
    category: "Identity",
    required: true
  },
  photos: {
    id: "doc-photos",
    title: "Passport-Sized Color Photos (2 Copies)",
    desc: "Recent photos taken within last 6 months, 35x45mm or 2x2 inch, white neutral background, no eyeglasses.",
    icon: "fa-camera",
    category: "Identity",
    required: true
  },
  returnFlight: {
    id: "doc-flight",
    title: "Confirmed Return / Onward Flight Ticket",
    desc: "Proof of booked roundtrip or onward airline ticket showing entry and exit within legal tourist stay limit.",
    icon: "fa-plane-departure",
    category: "Travel",
    required: true
  },
  accommodation: {
    id: "doc-hotel",
    title: "Proof of Accommodation (Hotel / Host Voucher)",
    desc: "Confirmed hotel bookings covering all stay dates or formal host invitation letter with residence address.",
    icon: "fa-hotel",
    category: "Travel",
    required: true
  },
  bankStatement: {
    id: "doc-bank",
    title: "3-Month Bank Statements (Financial Proof)",
    desc: "Recent original bank statements stamped by bank demonstrating adequate funds (typically $50–$100/day).",
    icon: "fa-file-invoice-dollar",
    category: "Financial",
    required: true
  },
  insurance: {
    id: "doc-insurance",
    title: "Comprehensive Travel & Medical Insurance",
    desc: "Policy covering emergency medical treatment, hospitalisation, and repatriation (minimum €30,000 for Europe).",
    icon: "fa-shield-heart",
    category: "Health & Safety",
    required: true
  },
  visaForm: {
    id: "doc-form",
    title: "Completed Visa Application Form",
    desc: "Accurately filled online or paper application form with traveler signature and declaration.",
    icon: "fa-file-signature",
    category: "Application",
    required: true
  },
  itinerary: {
    id: "doc-itinerary",
    title: "Day-by-Day Travel Itinerary",
    desc: "Detailed travel plan detailing cities, internal transit bookings, sightseeing spots, and contact details.",
    icon: "fa-map-marked-alt",
    category: "Travel",
    required: false
  },
  employmentProof: {
    id: "doc-employment",
    title: "Employment Letter / Leave Approval / NOC",
    desc: "Official letter from employer stating designation, salary, approved leave dates, or student enrollment ID.",
    icon: "fa-briefcase",
    category: "Financial",
    required: false
  }
};

const COUNTRIES_DATA = [
  // ==================== ASIA ====================
  {
    id: "thailand",
    name: "Thailand",
    region: "Asia",
    flag: "🇹🇭",
    capital: "Bangkok",
    currency: "THB (Thai Baht)",
    popularCities: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Koh Samui"],
    description: "Tropical beaches, opulent royal palaces, ancient ruins and ornate Buddhist temples.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (60 Days)",
      stayDuration: "Up to 60 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant at Immigration",
      processingBadge: "Immediate",
      passportRule: "Passport must have at least 6 months validity from arrival date with at least 2 blank pages.",
      officialPortal: "Official Thai E-Visa Portal (thaievisa.go.th)",
      difficulty: "Easy",
      notes: "Thailand recently extended visa exemption to 60 days for 93 nationalities. Must carry proof of funds (20,000 THB per family or 10,000 THB solo) and onward flight."
    },
    overrides: {
      IN: { category: "visa_free", categoryLabel: "Visa-Free Exemption", feeUSD: "$0 (Free)", processingTime: "Instant at Border", notes: "Indian citizens enjoy visa-free entry scheme (extended periodically). VoA backup ($60) available if needed." }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      {
        id: "doc-thai-funds",
        title: "Cash Proof of Sufficient Funds",
        desc: "Must show at least 10,000 THB (~$300) per person or 20,000 THB per family in cash upon random spot check.",
        icon: "fa-money-bill-wave",
        category: "Financial",
        required: true
      }
    ]
  },
  {
    id: "uae",
    name: "United Arab Emirates (Dubai / Abu Dhabi)",
    region: "Asia",
    flag: "🇦🇪",
    capital: "Abu Dhabi",
    currency: "AED (UAE Dirham)",
    popularCities: ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"],
    description: "Futuristic skyscrapers, world-class luxury shopping, desert safaris, and high-energy nightlife.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Instant eVisa / VoA",
      stayDuration: "30 or 60 Days",
      feeUSD: "$95 USD (30-day single entry)",
      feeNumber: 95,
      processingTime: "24 to 72 Hours (Express 6 hrs)",
      processingBadge: "Fast (1–3 Days)",
      passportRule: "Passport must have minimum 6 months validity from date of arrival.",
      officialPortal: "GDRFA Dubai / ICP Smart Services (icp.gov.ae)",
      difficulty: "Easy",
      notes: "US, UK, EU and GCC citizens receive free 30-day Visa on Arrival. Other nationalities apply for seamless online tourist eVisa through airlines or accredited travel agencies."
    },
    overrides: {
      US: { category: "voa", categoryLabel: "Visa on Arrival (30 Days)", feeUSD: "$0 (Free)", processingTime: "Instant upon Arrival" },
      UK: { category: "voa", categoryLabel: "Visa on Arrival (30 Days)", feeUSD: "$0 (Free)", processingTime: "Instant upon Arrival" },
      EU: { category: "visa_free", categoryLabel: "Visa-Free (90 Days in 180)", feeUSD: "$0 (Free)", processingTime: "Instant" },
      IN: { category: "evisa", categoryLabel: "Instant Tourist eVisa (30/60 Days)", feeUSD: "$95 USD", processingTime: "24–48 Hours", notes: "If holding valid US/UK/Schengen visa or Green Card, eligible for 14-day Visa on Arrival at Dubai airport." }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance
    ]
  },
  {
    id: "japan",
    name: "Japan",
    region: "Asia",
    flag: "🇯🇵",
    capital: "Tokyo",
    currency: "JPY (Japanese Yen)",
    popularCities: ["Tokyo", "Kyoto", "Osaka", "Hokkaido", "Hiroshima"],
    description: "Harmonious blend of neon metropolis, ancient Shinto shrines, culinary mastery, and bullet trains.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (90 Days)",
      stayDuration: "Up to 90 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant Entry / Visit Japan Web Pre-registration",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for the entire intended duration of stay.",
      officialPortal: "Visit Japan Web (vjw-lp.digital.go.th)",
      difficulty: "Easy to Moderate",
      notes: "Citizens of 71 countries (US, UK, EU, AU, CA, SG) enter visa-free. All travelers should fill digital customs/immigration QR code on 'Visit Japan Web' before departure."
    },
    overrides: {
      IN: { category: "evisa", categoryLabel: "eVisa / Regular Tourist Visa", feeUSD: "$25 USD", processingTime: "5 Business Days", notes: "Eligible for online tourist eVisa or via VFS Global center. Bank statements & tax returns (ITR) mandatory." },
      PH: { category: "embassy", categoryLabel: "Embassy Visa (Single/Multiple)", feeUSD: "$25 USD (via Agency)", processingTime: "5–7 Business Days" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-vjw",
        title: "Visit Japan Web Fast-Track QR Code",
        desc: "Digital declaration submitted online 48 hours before landing for streamlined customs & immigration clearance.",
        icon: "fa-qrcode",
        category: "Digital Clearance",
        required: true
      },
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "singapore",
    name: "Singapore",
    region: "Asia",
    flag: "🇸🇬",
    capital: "Singapore",
    currency: "SGD (Singapore Dollar)",
    popularCities: ["Marina Bay", "Sentosa", "Chinatown", "Orchard Road", "Jewel Changi"],
    description: "A garden city masterpiece featuring Marina Bay Sands, Gardens by the Bay, and world-renowned street food.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (30 to 90 Days)",
      stayDuration: "30 or 90 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant / SG Arrival Card",
      processingBadge: "Immediate",
      passportRule: "Strictly minimum 6 months validity from departure date; zero exceptions.",
      officialPortal: "Immigration & Checkpoints Authority (ica.gov.sg)",
      difficulty: "Easy",
      notes: "Most Western and ASEAN travelers enter visa-free. Mandatory: All travelers MUST submit SG Arrival Card (SGAC) with electronic health declaration within 3 days prior to arrival."
    },
    overrides: {
      IN: { category: "evisa", categoryLabel: "Pre-Arrival eVisa (via Authorized Agent)", feeUSD: "$30 SGD (~$23 USD)", processingTime: "2–3 Working Days", notes: "Must be applied via Singapore authorized visa agent or Singapore citizen/PR sponsor." }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-sgac",
        title: "SG Arrival Card (SGAC) with Health Declaration",
        desc: "Official digital entry card submitted within 3 days prior to arrival via ICA portal (free of charge).",
        icon: "fa-id-card",
        category: "Digital Clearance",
        required: true
      },
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "vietnam",
    name: "Vietnam",
    region: "Asia",
    flag: "🇻🇳",
    capital: "Hanoi",
    currency: "VND (Vietnamese Dong)",
    popularCities: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hoi An", "Ha Long Bay"],
    description: "Breathtaking limestone islands, historical heritage towns, vibrant river deltas, and legendary pho.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Official 90-Day eVisa",
      stayDuration: "Up to 90 Days (Single/Multiple)",
      feeUSD: "$25 USD (Single) / $50 USD (Multiple)",
      feeNumber: 25,
      processingTime: "3 to 5 Business Days",
      processingBadge: "Fast (3–5 Days)",
      passportRule: "Passport must have at least 6 months validity beyond visa validity period.",
      officialPortal: "Vietnam National E-Visa Web Portal (evisa.xuatnhapcanh.gov.vn)",
      difficulty: "Easy",
      notes: "Vietnam grants 90-day e-Visa to citizens of all countries & territories. Fast online upload of passport scan and photo required."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance
    ]
  },
  {
    id: "indonesia",
    name: "Indonesia (Bali / Jakarta)",
    region: "Asia",
    flag: "🇮🇩",
    capital: "Jakarta / Nusantara",
    currency: "IDR (Indonesian Rupiah)",
    popularCities: ["Bali (Ubud, Canggu)", "Lombok", "Jakarta", "Yogyakarta", "Komodo Island"],
    description: "Enchanting tropical paradise known for volcanic peaks, surfing reefs, spiritual retreats, and Bali culture.",
    baseVisa: {
      category: "voa",
      categoryLabel: "Visa on Arrival (e-VoA 30 Days)",
      stayDuration: "30 Days (Extendable by 30)",
      feeUSD: "500,000 IDR (~$32 USD)",
      feeNumber: 32,
      processingTime: "Instant on Arrival or Instant Online e-VoA",
      processingBadge: "Fast (1 Day)",
      passportRule: "Passport must have minimum 6 months validity from date of entry + blank page.",
      officialPortal: "Molina Indonesia e-VoA (molina.imigrasi.go.id)",
      difficulty: "Easy",
      notes: "Available for 97+ countries. Pay 500,000 IDR online or at airport counter. Bali also requires Bali Tourist Tax levy (150,000 IDR) paid via Love Bali app."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-bali-tax",
        title: "Bali Foreign Tourist Tax (Love Bali Voucher)",
        desc: "Official provincial levy of 150,000 IDR (~$10 USD) payable online via lovebali.baliprov.go.id.",
        icon: "fa-receipt",
        category: "Local Tax",
        required: true
      },
      {
        id: "doc-ecd",
        title: "Electronic Customs Declaration (e-CD)",
        desc: "Mandatory QR code customs declaration filled 2-3 days prior to arrival at ecd.beacukai.go.id.",
        icon: "fa-barcode",
        category: "Digital Clearance",
        required: true
      }
    ]
  },
  {
    id: "malaysia",
    name: "Malaysia",
    region: "Asia",
    flag: "🇲🇾",
    capital: "Kuala Lumpur",
    currency: "MYR (Malaysian Ringgit)",
    popularCities: ["Kuala Lumpur", "Penang", "Langkawi", "Malacca", "Kota Kinabalu"],
    description: "Iconic Petronas Twin Towers, rainforest sanctuaries, rich cultural diversity, and food havens.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (30 to 90 Days)",
      stayDuration: "30 to 90 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant Entry / MDAC Submission",
      processingBadge: "Immediate",
      passportRule: "Minimum 6 months validity remaining on passport upon arrival.",
      officialPortal: "Malaysia Digital Arrival Card (imigrasi-online.imi.gov.my/mdac)",
      difficulty: "Easy",
      notes: "Citizens of US, UK, EU, India, China enter visa-free for 30 days! All visitors must submit the Malaysia Digital Arrival Card (MDAC) within 3 days before arrival."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-mdac",
        title: "Malaysia Digital Arrival Card (MDAC)",
        desc: "Required digital arrival registration completed online within 3 days prior to arrival at port of entry.",
        icon: "fa-passport",
        category: "Digital Clearance",
        required: true
      }
    ]
  },
  {
    id: "south-korea",
    name: "South Korea",
    region: "Asia",
    flag: "🇰🇷",
    capital: "Seoul",
    currency: "KRW (South Korean Won)",
    popularCities: ["Seoul", "Busan", "Jeju Island", "Incheon", "Gyeongju"],
    description: "K-pop pulse, historic Gyeongbokgung palace, mouthwatering BBQ, and advanced tech hubs.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "K-ETA / Visa-Free (90 Days)",
      stayDuration: "Up to 90 Days",
      feeUSD: "10,000 KRW (~$8 USD)",
      feeNumber: 8,
      processingTime: "24 to 72 Hours (K-ETA)",
      processingBadge: "Fast (1–3 Days)",
      passportRule: "Passport must be valid for at least 6 months from intended departure date.",
      officialPortal: "Korea Electronic Travel Authorization (k-eta.go.kr)",
      difficulty: "Easy",
      notes: "K-ETA is temporarily exempted for 22 countries (US, UK, CA, JP, AU, etc.) until end of 2024–2025. Other passport holders submit K-ETA online."
    },
    overrides: {
      IN: { category: "embassy", categoryLabel: "C-3-9 Tourist Visa Required", feeUSD: "$40 USD", processingTime: "7–10 Business Days", notes: "Apply via KVAC (Korea Visa Application Center). Bank statements & Income tax verification strictly required." }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "maldives",
    name: "Maldives",
    region: "Asia",
    flag: "🇲🇻",
    capital: "Malé",
    currency: "MVR (Maldivian Rufiyaa)",
    popularCities: ["Malé", "Maafushi", "Baa Atoll", "Ari Atoll"],
    description: "Luxury overwater bungalows, crystal lagoon waters, manta ray reefs, and pristine white sandbars.",
    baseVisa: {
      category: "voa",
      categoryLabel: "Free Visa on Arrival (30 Days)",
      stayDuration: "30 Days (Free for all nationalities)",
      feeUSD: "$0 (Free 30 Days)",
      feeNumber: 0,
      processingTime: "Instant upon Landing",
      processingBadge: "Immediate",
      passportRule: "Machine-readable passport valid for at least 1 month (6 months recommended).",
      officialPortal: "Maldives Immigration IMUGA (imuga.immigration.gov.mv)",
      difficulty: "Easy",
      notes: "Maldives grants a free 30-day tourist visa to ALL nationalities upon arrival. Must fill IMUGA Traveler Declaration within 96 hours before departure."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-imuga",
        title: "IMUGA Traveler Declaration Form",
        desc: "Mandatory digital self-declaration submitted within 96 hours prior to departure time to Maldives.",
        icon: "fa-file-shield",
        category: "Digital Clearance",
        required: true
      },
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    region: "Asia",
    flag: "🇱🇰",
    capital: "Colombo",
    currency: "LKR (Sri Lankan Rupee)",
    popularCities: ["Colombo", "Kandy", "Galle", "Ella", "Sigiriya"],
    description: "Emerald tea plantations, coastal surf towns, wild elephant safaris, and ancient Buddhist citadels.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Online Tourist ETA / eVisa",
      stayDuration: "30 Days (Double Entry)",
      feeUSD: "$50 USD (Free for select nations)",
      feeNumber: 50,
      processingTime: "24 to 48 Hours",
      processingBadge: "Fast (1–2 Days)",
      passportRule: "Passport must possess a minimum validity of 6 months from the date of arrival.",
      officialPortal: "Department of Immigration and Emigration (eta.gov.lk)",
      difficulty: "Easy",
      notes: "Quick approval online. Select countries (India, China, Russia, UK, Germany) receive free or discounted visa schemes periodically."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "turkey",
    name: "Turkey (Türkiye)",
    region: "Asia",
    flag: "🇹🇷",
    capital: "Ankara",
    currency: "TRY (Turkish Lira)",
    popularCities: ["Istanbul", "Cappadocia", "Antalya", "Bodrum", "Pamukkale"],
    description: "Crossroads of Europe and Asia featuring the Bosphorus, hot air balloons over Cappadocia, and Ottoman palaces.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Instant Electronic eVisa / Visa-Free",
      stayDuration: "30 to 90 Days",
      feeUSD: "$50 USD (~$0 for EU/US citizens)",
      feeNumber: 50,
      processingTime: "Instant to 24 Hours",
      processingBadge: "Fast (Immediate)",
      passportRule: "Passport must be valid for at least 60 days beyond the duration of stay allowed.",
      officialPortal: "Republic of Türkiye Electronic Visa Application System (evisa.gov.tr)",
      difficulty: "Easy",
      notes: "US, UK, and EU citizens now enjoy 90-day visa-free travel. Many other passport holders can secure an instant eVisa online in 3 minutes."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      EU: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      IN: { category: "evisa", categoryLabel: "Conditional eVisa (30 Days)", feeUSD: "$50 USD", processingTime: "Instant Online", notes: "Condition: Must hold valid US, UK, Schengen, or Ireland visa or residence permit." }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance
    ]
  },
  {
    id: "georgia",
    name: "Georgia",
    region: "Europe",
    flag: "🇬🇪",
    capital: "Tbilisi",
    currency: "GEL (Georgian Lari)",
    popularCities: ["Tbilisi", "Batumi", "Kazbegi", "Sighnaghi", "Gudauri"],
    description: "Dramatic Caucasus mountain peaks, ancient wine traditions, cobblestone bathhouses, and warm hospitality.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free 365 Days (1 Full Year!)",
      stayDuration: "Up to 365 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant Entry at Border",
      processingBadge: "Immediate",
      passportRule: "Passport must remain valid throughout the full duration of stay in Georgia.",
      officialPortal: "Ministry of Foreign Affairs Georgia (evisa.gov.ge)",
      difficulty: "Easy",
      notes: "Citizens of over 95 countries (including US, EU, UK, GCC residents) can stay visa-free for up to 1 full year for tourism and remote work!"
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.insurance,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation
    ]
  },
  {
    id: "philippines",
    name: "Philippines",
    region: "Asia",
    flag: "🇵🇭",
    capital: "Manila",
    currency: "PHP (Philippine Peso)",
    popularCities: ["Boracay", "Palawan (El Nido)", "Cebu", "Siargao", "Manila"],
    description: "Over 7,000 tropical islands featuring emerald lagoons, world-renowned diving, and world-class beaches.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (30 Days)",
      stayDuration: "Up to 30 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant / eTravel Registration",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for at least 6 months beyond the period of intended stay.",
      officialPortal: "Philippine eTravel System (etravel.gov.ph)",
      difficulty: "Easy",
      notes: "157 nationalities enter visa-free for 30 days. Mandatory requirement: Complete the free eTravel registration within 72 hours before arrival."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-etravel",
        title: "Philippine eTravel Electronic QR Card",
        desc: "Mandatory digital registration completed at etravel.gov.ph within 72 hours of departure.",
        icon: "fa-qrcode",
        category: "Digital Clearance",
        required: true
      }
    ]
  },
  {
    id: "nepal",
    name: "Nepal",
    region: "Asia",
    flag: "🇳🇵",
    capital: "Kathmandu",
    currency: "NPR (Nepalese Rupee)",
    popularCities: ["Kathmandu", "Pokhara", "Everest Base Camp", "Chitwan National Park"],
    description: "Himalayan kingdom home to Mount Everest, ancient Durbar squares, trekking circuits, and peaceful stupas.",
    baseVisa: {
      category: "voa",
      categoryLabel: "Visa on Arrival (15/30/90 Days)",
      stayDuration: "15, 30, or 90 Days",
      feeUSD: "$30 USD (15d) / $50 USD (30d)",
      feeNumber: 30,
      processingTime: "Instant on Arrival at TIA Kathmandu",
      processingBadge: "Immediate",
      passportRule: "Passport must have at least 6 months validity from date of entry.",
      officialPortal: "Nepal Immigration Online Services (nepaliport.immigration.gov.np)",
      difficulty: "Easy",
      notes: "VoA available at Tribhuvan International Airport (TIA) or land border kiosks. Indian passport holders do not require a visa."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation
    ]
  },
  {
    id: "cambodia",
    name: "Cambodia",
    region: "Asia",
    flag: "🇰🇭",
    capital: "Phnom Penh",
    currency: "USD / KHR (Riel)",
    popularCities: ["Siem Reap (Angkor Wat)", "Phnom Penh", "Koh Rong", "Kampot"],
    description: "Legendary sandstone temples of Angkor Wat, rich Khmer culture, and tranquil tropical islands.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Tourist eVisa / Visa on Arrival",
      stayDuration: "30 Days Single Entry",
      feeUSD: "$36 USD (eVisa) / $30 USD (VoA Cash)",
      feeNumber: 36,
      processingTime: "3 Business Days online / Instant VoA",
      processingBadge: "Fast (1–3 Days)",
      passportRule: "Passport must be valid for at least 6 months after the entry date.",
      officialPortal: "Kingdom of Cambodia Official eVisa (evisa.gov.kh)",
      difficulty: "Easy",
      notes: "Both eVisa online and VoA at Phnom Penh and Siem Reap airports available for almost all nationalities."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation
    ]
  },
  {
    id: "taiwan",
    name: "Taiwan",
    region: "Asia",
    flag: "🇹🇼",
    capital: "Taipei",
    currency: "TWD (New Taiwan Dollar)",
    popularCities: ["Taipei", "Kaohsiung", "Taichung", "Sun Moon Lake", "Jiufen"],
    description: "Bustling night markets, world-class bubble tea, high-speed rail, and dramatic Taroko Gorge marble cliffs.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (90 Days)",
      stayDuration: "Up to 90 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant at Border Check",
      processingBadge: "Immediate",
      passportRule: "Passport must have at least 6 months validity (or length of stay for US passports).",
      officialPortal: "Bureau of Consular Affairs Taiwan (boca.gov.tw)",
      difficulty: "Easy",
      notes: "Visa exemption granted to 60+ countries (US, EU, UK, JP, KR, AU, CA, etc.). Fill online arrival card before border check."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    region: "Asia",
    flag: "🇸🇦",
    capital: "Riyadh",
    currency: "SAR (Saudi Riyal)",
    popularCities: ["Riyadh", "Jeddah", "AlUla", "Red Sea", "Medina"],
    description: "Ancient heritage at AlUla, modern architectural feats in Riyadh, and Red Sea pristine coral reefs.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Instant Tourist eVisa (1 Year Multiple)",
      stayDuration: "90 Days per visit",
      feeUSD: "~$140 USD (incl. Mandatory Medical Insurance)",
      feeNumber: 140,
      processingTime: "Under 30 Minutes to 24 Hours",
      processingBadge: "Instant / Rapid",
      passportRule: "Passport must be valid for at least 6 months from entry date.",
      officialPortal: "Visit Saudi Portal (visa.visitsaudi.com)",
      difficulty: "Easy",
      notes: "Available online for 66+ eligible nationalities and US/UK/Schengen visa holders. Includes comprehensive local health insurance automatically."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation
    ]
  },
  {
    id: "qatar",
    name: "Qatar",
    region: "Asia",
    flag: "🇶🇦",
    capital: "Doha",
    currency: "QAR (Qatari Riyal)",
    popularCities: ["Doha", "The Pearl", "Lusail", "Souq Waqif", "Khor Al Adaid"],
    description: "Sparkling modern skyline, Souq Waqif spice bazaars, Museum of Islamic Art, and sand dunes meeting the sea.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free Waiver (30 to 90 Days)",
      stayDuration: "30 or 90 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant on Arrival",
      processingBadge: "Immediate",
      passportRule: "Passport valid for minimum 6 months from arrival date.",
      officialPortal: "Hayya Portal Qatar (hayya.qa)",
      difficulty: "Easy",
      notes: "Citizens of over 100 countries enter visa-free without prior application. Other nationalities obtain quick Hayya Entry Visa online."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance
    ]
  },
  {
    id: "hong-kong",
    name: "Hong Kong SAR",
    region: "Asia",
    flag: "🇭🇰",
    capital: "Hong Kong",
    currency: "HKD (Hong Kong Dollar)",
    popularCities: ["Hong Kong Island", "Kowloon", "Victoria Peak", "Lantau Island"],
    description: "Glamorous high-density skyline, Victoria Harbour star ferries, Michelin dim sum, and hiking trails.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (14 to 90 Days)",
      stayDuration: "14, 30, or 90 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant Entry Stamp",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for at least 1 month beyond planned stay (6 months standard).",
      officialPortal: "Hong Kong Immigration Department (immd.gov.hk)",
      difficulty: "Easy",
      notes: "US, UK, EU, AU, CA passports receive 90 days visa-free. Indian citizens require simple, free online Pre-Arrival Registration (PAR)."
    },
    overrides: {
      IN: { category: "evisa", categoryLabel: "Pre-Arrival Registration (PAR - 14 Days)", feeUSD: "$0 (Free)", processingTime: "Instant Online" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "india",
    name: "India",
    region: "Asia",
    flag: "🇮🇳",
    capital: "New Delhi",
    currency: "INR (Indian Rupee)",
    popularCities: ["New Delhi", "Agra (Taj Mahal)", "Jaipur", "Goa", "Kerala"],
    description: "Incredible kaleidoscope of historic monuments, Taj Mahal, sacred Ganges ghats, and coastal backwaters.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Official Tourist e-Visa (30D / 1Yr / 5Yr)",
      stayDuration: "30 Days to 90 Days per stay",
      feeUSD: "$25 USD (30-day peak) / $40 USD (1-year)",
      feeNumber: 25,
      processingTime: "72 Hours to 4 Business Days",
      processingBadge: "Fast (3–4 Days)",
      passportRule: "Passport must have at least 6 months validity from arrival date with at least 2 blank pages.",
      officialPortal: "Official Indian e-Visa Portal (indianvisaonline.gov.in)",
      difficulty: "Easy to Moderate",
      notes: "Eligible for 170+ nationalities. Submit application at least 4 days in advance of departure."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },

  // ==================== EUROPE ====================
  {
    id: "france",
    name: "France (Schengen Area)",
    region: "Europe",
    flag: "🇫🇷",
    capital: "Paris",
    currency: "EUR (Euro)",
    popularCities: ["Paris", "Nice", "Lyon", "Marseille", "Bordeaux"],
    description: "The Eiffel tower, world-renowned Louvre museum, French Riviera beaches, and gourmet cuisine.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Visa / ETIAS Required",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 to 20 Calendar Days",
      processingBadge: "Standard (15–20 Days)",
      passportRule: "Passport must be valid for at least 3 months beyond intended departure from Schengen area, issued within last 10 years, and 2 blank pages.",
      officialPortal: "France-Visas Official Portal (france-visas.gouv.fr)",
      difficulty: "Strict",
      notes: "Citizens of US, UK, CA, AU travel visa-free up to 90 days. For visa-required nations, in-person biometrics appointment at TLScontact or VFS Global is strictly required."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free 90 Days (ETIAS in future)", feeUSD: "$0", processingTime: "Instant Border Entry" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free 90 Days in 180", feeUSD: "$0", processingTime: "Instant Border Entry" },
      CA: { category: "visa_free", categoryLabel: "Visa-Free 90 Days", feeUSD: "$0", processingTime: "Instant" },
      AU: { category: "visa_free", categoryLabel: "Visa-Free 90 Days", feeUSD: "$0", processingTime: "Instant" },
      EU: { category: "visa_free", categoryLabel: "Freedom of Movement (EU ID Card)", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-schengen-insurance",
        title: "Schengen Travel Medical Insurance (€30,000 Coverage)",
        desc: "Compulsory insurance covering emergency medical care and medical evacuation valid across ALL Schengen states.",
        icon: "fa-file-shield",
        category: "Health & Safety",
        required: true
      },
      COMMON_DOCS.bankStatement,
      COMMON_DOCS.employmentProof,
      COMMON_DOCS.itinerary
    ]
  },
  {
    id: "uk",
    name: "United Kingdom",
    region: "Europe",
    flag: "🇬🇧",
    capital: "London",
    currency: "GBP (British Pound)",
    popularCities: ["London", "Edinburgh", "Manchester", "Bath", "Oxford"],
    description: "Historic castles, Big Ben, West End theatre, Scottish Highlands, and timeless royal heritage.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Standard Visitor Visa / UK ETA",
      stayDuration: "Up to 6 Months",
      feeUSD: "£115 GBP (~$145 USD)",
      feeNumber: 145,
      processingTime: "3 to 4 Weeks (Priority 5 Days available)",
      processingBadge: "Standard (3–4 Weeks)",
      passportRule: "Passport must be valid for the whole of your stay in the UK with at least 1 blank page.",
      officialPortal: "UK Visas and Immigration (gov.uk/standard-visitor)",
      difficulty: "Strict",
      notes: "US, EU, AU, CA, SG passport holders enter visa-free (UK ETA rolling out for non-visa nationals for £10). Visa-required passport holders must attend VFS appointment."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free 6 Months (ETA soon)", feeUSD: "$0", processingTime: "Instant Border Stamp" },
      EU: { category: "visa_free", categoryLabel: "Visa-Free 6 Months (ETA soon)", feeUSD: "$0", processingTime: "Instant" },
      AU: { category: "visa_free", categoryLabel: "Visa-Free 6 Months", feeUSD: "$0", processingTime: "Instant" },
      CA: { category: "visa_free", categoryLabel: "Visa-Free 6 Months", feeUSD: "$0", processingTime: "Instant" },
      SG: { category: "visa_free", categoryLabel: "Visa-Free 6 Months", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement,
      COMMON_DOCS.employmentProof,
      COMMON_DOCS.itinerary
    ]
  },
  {
    id: "italy",
    name: "Italy (Schengen Area)",
    region: "Europe",
    flag: "🇮🇹",
    capital: "Rome",
    currency: "EUR (Euro)",
    popularCities: ["Rome", "Florence", "Venice", "Milan", "Amalfi Coast"],
    description: "The Colosseum, Renaissance art in Florence, Venetian canals, and the birth of pizza and gelato.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Visa Type C",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 to 20 Working Days",
      processingBadge: "Standard (15–20 Days)",
      passportRule: "Valid for at least 3 months after departure from Schengen, issued within past 10 years.",
      officialPortal: "Visto per l'Italia (vistoperitalia.esteri.it)",
      difficulty: "Strict",
      notes: "Visa-free for US, UK, EU, CA, AU. Visa-required passport holders submit biometric documents through VFS/BLS."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      EU: { category: "visa_free", categoryLabel: "Freedom of Movement", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement,
      COMMON_DOCS.employmentProof
    ]
  },
  {
    id: "spain",
    name: "Spain (Schengen Area)",
    region: "Europe",
    flag: "🇪🇸",
    capital: "Madrid",
    currency: "EUR (Euro)",
    popularCities: ["Barcelona", "Madrid", "Seville", "Valencia", "Ibiza"],
    description: "Gaudí architecture in Barcelona, vibrant tapas culture, flamenco dancing, and Mediterranean beaches.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Tourist Visa",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 to 21 Working Days",
      processingBadge: "Standard (15–21 Days)",
      passportRule: "Must be valid at least 3 months past the intended departure date from Spain.",
      officialPortal: "BLS International Spain Visa Services",
      difficulty: "Strict",
      notes: "Requires BLS appointment for visa-required nationals. Proof of minimum €108/day of stay required."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      EU: { category: "visa_free", categoryLabel: "Freedom of Movement", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "switzerland",
    name: "Switzerland (Schengen Area)",
    region: "Europe",
    flag: "🇨🇭",
    capital: "Bern",
    currency: "CHF (Swiss Franc)",
    popularCities: ["Zurich", "Geneva", "Lucerne", "Zermatt (Matterhorn)", "Interlaken"],
    description: "Towering Swiss Alps, pristine lakes, panoramic glacier train rides, and luxury watchmaking.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Visa Switzerland",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "10 to 15 Working Days",
      processingBadge: "Standard (10–15 Days)",
      passportRule: "Passport valid for at least 3 months beyond departure date from Schengen.",
      officialPortal: "State Secretariat for Migration SEM (sem.admin.ch)",
      difficulty: "Strict",
      notes: "Requires proof of at least 100 CHF (~$110 USD) per day of stay in Switzerland (or 30 CHF if student)."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      EU: { category: "visa_free", categoryLabel: "Freedom of Movement", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "germany",
    name: "Germany (Schengen Area)",
    region: "Europe",
    flag: "🇩🇪",
    capital: "Berlin",
    currency: "EUR (Euro)",
    popularCities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Bavaria"],
    description: "Fairy-tale castles like Neuschwanstein, Oktoberfest in Munich, Berlin Wall history, and the Autobahn.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen C Tourist Visa",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 Calendar Days",
      processingBadge: "Standard (15 Days)",
      passportRule: "Passport issued within last 10 years, valid 3 months beyond departure from Schengen.",
      officialPortal: "Federal Foreign Office Germany (auswaertiges-amt.de)",
      difficulty: "Strict",
      notes: "Biometrics and in-person appointment at VFS Global / German mission required for visa-bound travelers."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      EU: { category: "visa_free", categoryLabel: "Freedom of Movement", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement,
      COMMON_DOCS.employmentProof
    ]
  },
  {
    id: "greece",
    name: "Greece (Schengen Area)",
    region: "Europe",
    flag: "🇬🇷",
    capital: "Athens",
    currency: "EUR (Euro)",
    popularCities: ["Santorini", "Mykonos", "Athens", "Crete", "Rhodes"],
    description: "Whitewashed Cycladic cliffs overlooking turquoise Aegean waters, ancient Acropolis, and Mediterranean dining.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Tourist Visa",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 to 20 Days",
      processingBadge: "Standard (15–20 Days)",
      passportRule: "Passport valid 3 months beyond planned exit from Schengen territory.",
      officialPortal: "Hellenic Republic Ministry of Foreign Affairs (mfa.gr)",
      difficulty: "Strict",
      notes: "Apply via GVCW (Global Visa Center World) or embassy."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      EU: { category: "visa_free", categoryLabel: "Freedom of Movement", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "portugal",
    name: "Portugal (Schengen Area)",
    region: "Europe",
    flag: "🇵🇹",
    capital: "Lisbon",
    currency: "EUR (Euro)",
    popularCities: ["Lisbon", "Porto", "Algarve", "Sintra", "Madeira"],
    description: "Historic yellow trams, ornate azulejo tiles, pastel de nata pastries, and dramatic Atlantic surf cliffs.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Visa Portugal",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 to 20 Working Days",
      processingBadge: "Standard (15–20 Days)",
      passportRule: "Valid 3 months beyond date of departure from Schengen.",
      officialPortal: "Vistos Portugal (vistos.mne.gov.pt)",
      difficulty: "Strict",
      notes: "Visa-free for 90 days for US, UK, Canada, Australia."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "netherlands",
    name: "Netherlands (Schengen Area)",
    region: "Europe",
    flag: "🇳🇱",
    capital: "Amsterdam",
    currency: "EUR (Euro)",
    popularCities: ["Amsterdam", "Rotterdam", "Utrecht", "The Hague", "Giethoorn"],
    description: "Iconic canal rings, world-class Van Gogh museum, tulip fields, windmill villages, and cycling culture.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Short-Stay Visa",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 Calendar Days",
      processingBadge: "Standard (15 Days)",
      passportRule: "Passport valid 3 months beyond planned departure date.",
      officialPortal: "Netherlands Worldwide (netherlandsworldwide.nl)",
      difficulty: "Strict",
      notes: "Managed via VFS Global. Strict accommodation and roundtrip itinerary checks."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "austria",
    name: "Austria (Schengen Area)",
    region: "Europe",
    flag: "🇦🇹",
    capital: "Vienna",
    currency: "EUR (Euro)",
    popularCities: ["Vienna", "Salzburg", "Innsbruck", "Hallstatt"],
    description: "Classical music legacy of Mozart and Beethoven, imperial palaces, and alpine mountain scenery.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Tourist Visa",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 Working Days",
      processingBadge: "Standard (15 Days)",
      passportRule: "Valid 3 months after departure from Schengen zone.",
      officialPortal: "Federal Ministry European & International Affairs Austria",
      difficulty: "Strict",
      notes: "Visa-free for US, UK, Canada, Australia, Japan."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "iceland",
    name: "Iceland (Schengen Area)",
    region: "Europe",
    flag: "🇮🇸",
    capital: "Reykjavik",
    currency: "ISK (Icelandic Króna)",
    popularCities: ["Reykjavik", "Golden Circle", "Vík", "Akureyri", "Blue Lagoon"],
    description: "Land of fire and ice: erupting geysers, luminous northern lights, glaciers, and geothermal lagoons.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Tourist Visa",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 Calendar Days",
      processingBadge: "Standard (15 Days)",
      passportRule: "Passport valid 3 months beyond departure date from Schengen.",
      officialPortal: "Directorate of Immigration Iceland (utl.is)",
      difficulty: "Strict",
      notes: "Visa-free for Western passports. High cost of living requires showing solid financial proof."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "ireland",
    name: "Ireland",
    region: "Europe",
    flag: "🇮🇪",
    capital: "Dublin",
    currency: "EUR (Euro)",
    popularCities: ["Dublin", "Galway", "Cliffs of Moher", "Cork", "Killarney"],
    description: "Rolling emerald hills, ancient Celtic folklore, lively pub music sessions, and dramatic Atlantic coastlines.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Irish Tourist Visa (Non-Schengen)",
      stayDuration: "Up to 90 Days",
      feeUSD: "€60 EUR (~$65 USD)",
      feeNumber: 65,
      processingTime: "15 to 25 Working Days",
      processingBadge: "Standard (3–4 Weeks)",
      passportRule: "Passport must be valid for at least 6 months after intended departure from Ireland.",
      officialPortal: "Irish Immigration Service Delivery (irishimmigration.ie)",
      difficulty: "Strict",
      notes: "Ireland is NOT in the Schengen area. UK/US/EU/CA/AU citizens enter visa-free. Others must apply separately even if having a Schengen visa."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (90 Days)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "visa_free", categoryLabel: "Common Travel Area (Freedom of Movement)", feeUSD: "$0", processingTime: "Instant" },
      EU: { category: "visa_free", categoryLabel: "Freedom of Movement", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement,
      COMMON_DOCS.employmentProof
    ]
  },
  {
    id: "croatia",
    name: "Croatia (Schengen Area)",
    region: "Europe",
    flag: "🇭🇷",
    capital: "Zagreb",
    currency: "EUR (Euro)",
    popularCities: ["Dubrovnik", "Split", "Plitvice Lakes", "Hvar", "Zadar"],
    description: "Dubrovnik's ancient stone city walls, Plitvice turquoise waterfalls, and Dalmatian coastline sailing.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Visa Croatia",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 Calendar Days",
      processingBadge: "Standard (15 Days)",
      passportRule: "Valid 3 months beyond departure from Schengen.",
      officialPortal: "Ministry of Foreign and European Affairs Croatia",
      difficulty: "Strict",
      notes: "Joined Schengen zone in 2023. Western passport holders enter visa-free."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "norway",
    name: "Norway (Schengen Area)",
    region: "Europe",
    flag: "🇳🇴",
    capital: "Oslo",
    currency: "NOK (Norwegian Krone)",
    popularCities: ["Oslo", "Bergen", "Tromsø (Northern Lights)", "Lofoten Islands", "Geirangerfjord"],
    description: "Deep glacial fjords, midnight sun, vibrant Arctic wildlife, and snow-capped peaks.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Visitor Visa",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 Calendar Days",
      processingBadge: "Standard (15 Days)",
      passportRule: "Valid 3 months beyond planned departure from Schengen.",
      officialPortal: "UDI Directorate of Immigration Norway (udi.no)",
      difficulty: "Strict",
      notes: "Visa-free for US, UK, EU, AU, CA travelers for 90 days."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "czech-republic",
    name: "Czech Republic (Czechia)",
    region: "Europe",
    flag: "🇨🇿",
    capital: "Prague",
    currency: "CZK (Czech Koruna)",
    popularCities: ["Prague", "Český Krumlov", "Brno", "Karlovy Vary"],
    description: "The city of a hundred spires, Charles Bridge, Gothic cathedrals, and world-famous bohemian beer culture.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Schengen Short-Stay Visa",
      stayDuration: "90 Days within 180 Days",
      feeUSD: "€90 EUR (~$98 USD)",
      feeNumber: 98,
      processingTime: "15 Calendar Days",
      processingBadge: "Standard (15 Days)",
      passportRule: "Valid 3 months after departure date from Schengen.",
      officialPortal: "Ministry of Foreign Affairs Czech Republic (mzv.gov.cz)",
      difficulty: "Strict",
      notes: "Apply via VFS Global center."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      COMMON_DOCS.bankStatement
    ]
  },

  // ==================== AMERICAS ====================
  {
    id: "usa",
    name: "United States of America",
    region: "Americas",
    flag: "🇺🇸",
    capital: "Washington, D.C.",
    currency: "USD (US Dollar)",
    popularCities: ["New York", "San Francisco", "Las Vegas", "Miami", "Los Angeles"],
    description: "Grand Canyon, Statue of Liberty, Hollywood, Disney theme parks, and vibrant cultural melting pots.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "B1/B2 Tourist Visa / ESTA",
      stayDuration: "Up to 6 Months per entry",
      feeUSD: "$185 USD (B1/B2) / $21 USD (ESTA)",
      feeNumber: 185,
      processingTime: "Interview appointment wait times vary (few days to several weeks)",
      processingBadge: "Appointment Required",
      passportRule: "Must be valid for at least 6 months beyond period of stay (unless country exempt by 6-Month Club).",
      officialPortal: "US Department of State Travel (travel.state.gov) / ESTA (esta.cbp.dhs.gov)",
      difficulty: "Strict",
      notes: "Citizens of 41 Visa Waiver Program countries (UK, EU, JP, AU, SG, etc.) simply apply for ESTA online ($21 USD). All others must book DS-160 consular interview."
    },
    overrides: {
      UK: { category: "evisa", categoryLabel: "ESTA Online Clearance (90 Days)", feeUSD: "$21 USD", processingTime: "Under 72 Hours" },
      EU: { category: "evisa", categoryLabel: "ESTA Online Clearance (90 Days)", feeUSD: "$21 USD", processingTime: "Under 72 Hours" },
      AU: { category: "evisa", categoryLabel: "ESTA Online Clearance (90 Days)", feeUSD: "$21 USD", processingTime: "Under 72 Hours" },
      SG: { category: "evisa", categoryLabel: "ESTA Online Clearance (90 Days)", feeUSD: "$21 USD", processingTime: "Under 72 Hours" },
      CA: { category: "visa_free", categoryLabel: "Visa-Free Entry (Canadian Citizens)", feeUSD: "$0", processingTime: "Instant" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      {
        id: "doc-ds160",
        title: "DS-160 Non-Immigrant Confirmation Page",
        desc: "Online DS-160 visa application barcode confirmation page.",
        icon: "fa-barcode",
        category: "Application",
        required: true
      },
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement,
      COMMON_DOCS.employmentProof
    ]
  },
  {
    id: "canada",
    name: "Canada",
    region: "Americas",
    flag: "🇨🇦",
    capital: "Ottawa",
    currency: "CAD (Canadian Dollar)",
    popularCities: ["Vancouver", "Toronto", "Montreal", "Banff / Rocky Mountains", "Niagara Falls"],
    description: "Rugged Rocky Mountains, turquoise Lake Louise, cosmopolitan cities, and pristine wilderness.",
    baseVisa: {
      category: "embassy",
      categoryLabel: "Visitor Visa (TRV) / eTA",
      stayDuration: "Up to 6 Months",
      feeUSD: "$100 CAD (~$75 USD) + $85 CAD Biometrics",
      feeNumber: 75,
      processingTime: "15 to 30 Business Days",
      processingBadge: "Standard (2–4 Weeks)",
      passportRule: "Passport must be valid for the whole intended duration of stay.",
      officialPortal: "Immigration, Refugees and Citizenship Canada (IRCC) (canada.ca)",
      difficulty: "Strict",
      notes: "US citizens enter visa-free with passport. Visa-exempt nations (UK, EU, AU, JP) apply online for $7 CAD eTA. Others apply online for Visitor Visa + VFS biometrics."
    },
    overrides: {
      US: { category: "visa_free", categoryLabel: "Visa-Free (Passport only)", feeUSD: "$0", processingTime: "Instant" },
      UK: { category: "evisa", categoryLabel: "Electronic Travel Auth (eTA)", feeUSD: "$7 CAD (~$5 USD)", processingTime: "Instant to 24 Hours" },
      EU: { category: "evisa", categoryLabel: "Electronic Travel Auth (eTA)", feeUSD: "$7 CAD (~$5 USD)", processingTime: "Instant to 24 Hours" },
      AU: { category: "evisa", categoryLabel: "Electronic Travel Auth (eTA)", feeUSD: "$7 CAD (~$5 USD)", processingTime: "Instant to 24 Hours" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement,
      COMMON_DOCS.employmentProof
    ]
  },
  {
    id: "mexico",
    name: "Mexico",
    region: "Americas",
    flag: "🇲🇽",
    capital: "Mexico City",
    currency: "MXN (Mexican Peso)",
    popularCities: ["Cancún", "Mexico City", "Oaxaca", "Tulum", "Playa del Carmen"],
    description: "Ancient Mayan and Aztec pyramids, vibrant culinary flavors, Caribbean coral reefs, and colonial plazas.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (180 Days) / Visa Required",
      stayDuration: "Up to 180 Days",
      feeUSD: "$0 (Free for exempt) / $53 USD (Consular)",
      feeNumber: 0,
      processingTime: "Instant at Border / 10 Days Embassy",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for intended period of stay (6 months recommended).",
      officialPortal: "National Migration Institute Mexico (INM)",
      difficulty: "Easy to Moderate",
      notes: "Holders of valid US, UK, Canada, Japan, or Schengen visas enter Mexico VISA-FREE for up to 180 days regardless of nationality!"
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-fmm",
        title: "Multiple Migration Form (FMM)",
        desc: "Digital tourist card registered online or at arrival point.",
        icon: "fa-id-badge",
        category: "Digital Clearance",
        required: true
      },
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "brazil",
    name: "Brazil",
    region: "Americas",
    flag: "🇧🇷",
    capital: "Brasília",
    currency: "BRL (Brazilian Real)",
    popularCities: ["Rio de Janeiro", "São Paulo", "Salvador", "Iguazu Falls", "Amazon Rainforest"],
    description: "Christ the Redeemer, Copacabana and Ipanema beaches, Carnival festivities, and thunderous Iguazu Falls.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (90 Days) / eVisa",
      stayDuration: "Up to 90 Days",
      feeUSD: "$0 / $80.90 USD (for US/CA/AU eVisa)",
      feeNumber: 0,
      processingTime: "Instant at Border / 5 Business Days eVisa",
      processingBadge: "Fast (Immediate–5 Days)",
      passportRule: "Passport must be valid for at least 6 months from entry date.",
      officialPortal: "Brazil Ministry of Foreign Affairs (gov.br/mre)",
      difficulty: "Easy to Moderate",
      notes: "EU and Latin American citizens travel visa-free. US, Canadian, and Australian passport holders require an electronic eVisa."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "argentina",
    name: "Argentina",
    region: "Americas",
    flag: "🇦🇷",
    capital: "Buenos Aires",
    currency: "ARS (Argentine Peso)",
    popularCities: ["Buenos Aires", "Bariloche", "Mendoza", "Ushuaia (Patagonia)", "Iguazú"],
    description: "Passionate tango halls in Buenos Aires, Mendoza wine valleys, and calving blue glaciers of Patagonia.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (90 Days) / AVE eVisa",
      stayDuration: "Up to 90 Days",
      feeUSD: "$0 (Free) / $50 USD (AVE)",
      feeNumber: 0,
      processingTime: "Instant at Border",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for period of stay (at least 6 months validity advised).",
      officialPortal: "Dirección Nacional de Migraciones Argentina (migraciones.gob.ar)",
      difficulty: "Easy",
      notes: "US, UK, EU, CA, AU passports enjoy 90 days visa-free entry without fees. Chinese/Indian holders with US B2 can apply for online AVE."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "peru",
    name: "Peru",
    region: "Americas",
    flag: "🇵🇪",
    capital: "Lima",
    currency: "PEN (Peruvian Sol)",
    popularCities: ["Cusco", "Machu Picchu", "Lima", "Arequipa", "Lake Titicaca"],
    description: "The mystical Inca citadel of Machu Picchu, Rainbow Mountain, and the culinary capital of South America.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (90 to 183 Days)",
      stayDuration: "Up to 90 or 183 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant Entry Stamp",
      processingBadge: "Immediate",
      passportRule: "Passport must have minimum 6 months validity from entry date.",
      officialPortal: "Superintendencia Nacional de Migraciones Perú",
      difficulty: "Easy",
      notes: "Citizens of the Americas, European Union, UK, Japan, Australia enter visa-free for tourism."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation
    ]
  },
  {
    id: "colombia",
    name: "Colombia",
    region: "Americas",
    flag: "🇨🇴",
    capital: "Bogotá",
    currency: "COP (Colombian Peso)",
    popularCities: ["Medellín", "Cartagena", "Bogotá", "Coffee Triangle", "Santa Marta"],
    description: "Colonial walled city of Cartagena, coffee plantations, salsa in Cali, and vibrant Medellín flower culture.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (90 Days)",
      stayDuration: "90 Days (Extendable to 180)",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant / Check-Mig Registration",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for at least 6 months beyond arrival date.",
      officialPortal: "Migración Colombia Check-Mig (migracioncolombia.gov.co)",
      difficulty: "Easy",
      notes: "Over 100 nationalities travel visa-free. Mandatory: Fill online Check-Mig 72 hours before flight."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-checkmig",
        title: "Check-Mig Pre-Registration",
        desc: "Compulsory registration form filled 72 hours before departure via Colombia Migration portal.",
        icon: "fa-clipboard-check",
        category: "Digital Clearance",
        required: true
      }
    ]
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    region: "Americas",
    flag: "🇨🇷",
    capital: "San José",
    currency: "CRC (Costa Rican Colón)",
    popularCities: ["Manuel Antonio", "Arenal Volcano", "Monteverde", "Tamarindo"],
    description: "Pura Vida lifestyle, rainforest cloud reserves, active Arenal volcano, and world-class eco-tourism.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (180 Days)",
      stayDuration: "Up to 180 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant on Arrival",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for at least 1 day beyond stay for Group 1 (US, EU, UK, CA).",
      officialPortal: "Dirección General de Migración y Extranjería Costa Rica",
      difficulty: "Easy",
      notes: "Recently extended stay limit from 90 to 180 days for tourists from Group 1 visa-exempt nations."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "jamaica",
    name: "Jamaica",
    region: "Americas",
    flag: "🇯🇲",
    capital: "Kingston",
    currency: "JMD (Jamaican Dollar)",
    popularCities: ["Montego Bay", "Negril", "Ocho Rios", "Kingston"],
    description: "Reggae roots of Bob Marley, Seven Mile beach, jerk chicken shacks, and cascading Dunn's River falls.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (30 to 90 Days)",
      stayDuration: "30 to 90 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant Entry / C5 Online Card",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for the duration of stay.",
      officialPortal: "EnterJamaica Online Passenger Declaration (enterjamaica.com)",
      difficulty: "Easy",
      notes: "Visa-free for US, UK, Canada, and EU citizens. Complete the C5 Customs & Immigration form online prior to arrival."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-c5",
        title: "Jamaica C5 Electronic Immigration Card",
        desc: "Online passenger arrival card filled prior to landing via enterjamaica.com.",
        icon: "fa-passport",
        category: "Digital Clearance",
        required: true
      }
    ]
  },
  {
    id: "dominican-republic",
    name: "Dominican Republic",
    region: "Americas",
    flag: "🇩🇴",
    capital: "Santo Domingo",
    currency: "DOP (Dominican Peso)",
    popularCities: ["Punta Cana", "Santo Domingo", "Puerto Plata", "Samana"],
    description: "All-inclusive Punta Cana resorts, swaying coconut palm beaches, and historic Zona Colonial.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free Tourist Card (30 Days)",
      stayDuration: "30 Days (Extendable)",
      feeUSD: "$10 USD (Included in airline ticket)",
      feeNumber: 10,
      processingTime: "Instant / E-Ticket Portal",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for the duration of your stay in the Dominican Republic.",
      officialPortal: "Dominican Republic E-Ticket (eticket.migracion.gob.do)",
      difficulty: "Easy",
      notes: "Tourist card fee is automatically included in airfare. Fill out free digital E-Ticket QR code before arrival and departure."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      {
        id: "doc-eticket-dr",
        title: "Dominican Republic Electronic E-Ticket",
        desc: "Free combined customs and health QR pass at eticket.migracion.gob.do.",
        icon: "fa-qrcode",
        category: "Digital Clearance",
        required: true
      }
    ]
  },

  // ==================== AFRICA ====================
  {
    id: "egypt",
    name: "Egypt",
    region: "Africa",
    flag: "🇪🇬",
    capital: "Cairo",
    currency: "EGP (Egyptian Pound)",
    popularCities: ["Cairo (Pyramids of Giza)", "Luxor", "Aswan", "Sharm El Sheikh", "Hurghada"],
    description: "The Great Pyramids of Giza, Sphinx, Nile River cruise, Valley of the Kings, and Red Sea scuba diving.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Official eVisa / Visa on Arrival",
      stayDuration: "30 Days Single Entry",
      feeUSD: "$25 USD (Single) / $60 USD (Multiple)",
      feeNumber: 25,
      processingTime: "3 to 5 Business Days / Instant VoA",
      processingBadge: "Fast (1–3 Days)",
      passportRule: "Passport must have minimum 6 months validity from date of arrival.",
      officialPortal: "Egypt E-Visa Portal (visa2egypt.gov.eg)",
      difficulty: "Easy",
      notes: "Citizens of over 70 countries (US, EU, UK, CA, AU, JP) can obtain eVisa online or purchase Visa on Arrival sticker ($25 cash) at airport bank kiosks."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance
    ]
  },
  {
    id: "morocco",
    name: "Morocco",
    region: "Africa",
    flag: "🇲🇦",
    capital: "Rabat",
    currency: "MAD (Moroccan Dirham)",
    popularCities: ["Marrakech", "Chefchaouen (Blue City)", "Fes", "Casablanca", "Merzouga (Sahara)"],
    description: "Vibrant Marrakech medinas, blue streets of Chefchaouen, Sahara desert camel treks, and mint tea hospitality.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (90 Days) / eVisa",
      stayDuration: "Up to 90 Days",
      feeUSD: "$0 (Free) / ~770 MAD ($75 USD eVisa)",
      feeNumber: 0,
      processingTime: "Instant at Border / 24–72h eVisa",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for at least 3 to 6 months beyond period of intended stay.",
      officialPortal: "Morocco Access E-Visa (acces-maroc.ma)",
      difficulty: "Easy",
      notes: "Visa-free for US, UK, EU, Canada, Australia, Japan. Other nationalities can apply for quick online electronic eVisa."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "south-africa",
    name: "South Africa",
    region: "Africa",
    flag: "🇿🇦",
    capital: "Pretoria / Cape Town",
    currency: "ZAR (South African Rand)",
    popularCities: ["Cape Town", "Kruger National Park", "Johannesburg", "Garden Route", "Durban"],
    description: "Table Mountain, Big Five safari in Kruger, Cape Peninsula penguins, and renowned Stellenbosch vineyards.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free (90 Days) / eVisa",
      stayDuration: "Up to 90 Days",
      feeUSD: "$0 (Free for exempt) / ~$35 USD",
      feeNumber: 0,
      processingTime: "Instant Entry / 5–10 Days eVisa",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for at least 30 days after intended departure AND must have at least 2 entirely blank pages.",
      officialPortal: "Department of Home Affairs South Africa (dha.gov.za)",
      difficulty: "Easy to Moderate",
      notes: "Strict blank page requirement: Airlines will strictly deny boarding if 2 blank pages are missing."
    },
    overrides: {
      IN: { category: "evisa", categoryLabel: "Tourist eVisa / VFS Visa", feeUSD: "$0 (No visa fee, VFS logistics fee ~$35)", processingTime: "5–10 Business Days" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement,
      {
        id: "doc-yellow-fever",
        title: "Yellow Fever Certificate (if arriving from endemic country)",
        desc: "Mandatory only if arriving from or transited through yellow fever zone in Africa or South America.",
        icon: "fa-syringe",
        category: "Health & Safety",
        required: false
      }
    ]
  },
  {
    id: "kenya",
    name: "Kenya",
    region: "Africa",
    flag: "🇰🇪",
    capital: "Nairobi",
    currency: "KES (Kenyan Shilling)",
    popularCities: ["Maasai Mara", "Nairobi", "Diani Beach", "Amboseli", "Mombasa"],
    description: "The Great Wildebeest Migration, Maasai culture, Mount Kilimanjaro views, and Indian ocean beaches.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Electronic Travel Authorisation (eTA)",
      stayDuration: "Up to 90 Days",
      feeUSD: "$34 USD (Government Fee)",
      feeNumber: 34,
      processingTime: "Under 72 Hours (3 Days)",
      processingBadge: "Fast (1–3 Days)",
      passportRule: "Passport must have at least 6 months validity from date of arrival with at least 1 blank page.",
      officialPortal: "Kenya Electronic Travel Authorisation (etakenya.go.ke)",
      difficulty: "Easy",
      notes: "Kenya transitioned to a 100% visa-free electronic travel authorisation (eTA) system. All foreign visitors must apply online before boarding."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      {
        id: "doc-yellow-kenya",
        title: "Yellow Fever Vaccination Certificate",
        desc: "Mandatory if arriving from yellow fever endemic areas.",
        icon: "fa-syringe",
        category: "Health & Safety",
        required: false
      }
    ]
  },
  {
    id: "tanzania",
    name: "Tanzania & Zanzibar",
    region: "Africa",
    flag: "🇹🇿",
    capital: "Dodoma",
    currency: "TZS (Tanzanian Shilling)",
    popularCities: ["Serengeti National Park", "Zanzibar Island", "Mount Kilimanjaro", "Ngorongoro Crater"],
    description: "Endless Serengeti plains, Ngorongoro volcanic caldera, and spice island of Zanzibar with turquoise waters.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "Ordinary Tourist eVisa / VoA",
      stayDuration: "Up to 90 Days",
      feeUSD: "$50 USD ($100 USD for US citizens - Multiple Entry)",
      feeNumber: 50,
      processingTime: "7 to 10 Working Days / VoA Available",
      processingBadge: "Fast (1–2 Weeks)",
      passportRule: "Passport must have minimum 6 months validity from entry date.",
      officialPortal: "Tanzania Immigration E-Services (eservices.immigration.go.tz/visa)",
      difficulty: "Easy",
      notes: "US citizens must pay $100 for 1-year multiple entry visa. Note: Mandatory Zanzibar Inbound Travel Insurance (mandatory $44 USD) required when entering Zanzibar."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance
    ]
  },
  {
    id: "mauritius",
    name: "Mauritius",
    region: "Africa",
    flag: "🇲🇺",
    capital: "Port Louis",
    currency: "MUR (Mauritian Rupee)",
    popularCities: ["Port Louis", "Grand Baie", "Flic en Flac", "Le Morne Brabant"],
    description: "Submerged waterfall optical illusion at Le Morne, volcanic Chamarel seven-colored earth, and coral lagoons.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free / VoA (60 to 90 Days)",
      stayDuration: "Up to 60 or 90 Days",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant Entry / All-in-One Form",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid beyond the period of intended stay.",
      officialPortal: "Mauritius All-in-One Digital Travel Form (safemauritius.govmu.org)",
      difficulty: "Easy",
      notes: "Most travelers enter visa-free for tourism. Fill Mauritius All-in-One digital travel form before boarding."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "seychelles",
    name: "Seychelles",
    region: "Africa",
    flag: "🇸🇨",
    capital: "Victoria",
    currency: "SCR (Seychellois Rupee)",
    popularCities: ["Mahé", "Praslin", "La Digue (Anse Source d'Argent)"],
    description: "Giant granite boulders, endangered Aldabra giant tortoises, rare Coco de Mer palms, and azure waters.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free for All Nations (Travel Auth)",
      stayDuration: "Up to 30 Days (Extendable to 3 Mos)",
      feeUSD: "€10 EUR (~$11 USD Travel Auth fee)",
      feeNumber: 11,
      processingTime: "24 Hours (Express 6 hrs available)",
      processingBadge: "Immediate to 24h",
      passportRule: "Passport must be valid for the duration of intended stay.",
      officialPortal: "Seychelles Electronic Border System (seychelles.govtas.com)",
      difficulty: "Easy",
      notes: "Seychelles is completely visa-free for all nationalities worldwide. All visitors must obtain digital Seychelles Travel Authorisation (TA) prior to travel."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.insurance,
      {
        id: "doc-seychelles-ta",
        title: "Seychelles Travel Authorisation QR Code",
        desc: "Online entry permit generated via seychelles.govtas.com before boarding.",
        icon: "fa-qrcode",
        category: "Digital Clearance",
        required: true
      }
    ]
  },

  // ==================== OCEANIA ====================
  {
    id: "australia",
    name: "Australia",
    region: "Oceania",
    flag: "🇦🇺",
    capital: "Canberra",
    currency: "AUD (Australian Dollar)",
    popularCities: ["Sydney", "Melbourne", "Great Barrier Reef", "Gold Coast", "Perth"],
    description: "Sydney Opera House and Harbour Bridge, Great Barrier Reef marine wonder, Uluru, and native wildlife.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "ETA (Subclass 601) / eVisitor (651) / Visitor (600)",
      stayDuration: "3 Months per visit (12-Month Multiple)",
      feeUSD: "$20 AUD (~$14 USD ETA) / $190 AUD (~$125 USD Subclass 600)",
      feeNumber: 14,
      processingTime: "Instant to 48 Hours (ETA) / 15–30 Days (Subclass 600)",
      processingBadge: "Fast (ETA) / Standard",
      passportRule: "Passport must be valid for intended period of stay (minimum 6 months recommended).",
      officialPortal: "Australian Department of Home Affairs (immi.homeaffairs.gov.au)",
      difficulty: "Moderate to Strict",
      notes: "US, UK, EU, CA, SG passport holders apply via Australian ETA smartphone app in minutes ($20 AUD). Non-eligible nationalities apply for Subclass 600 Visitor visa with biometrics."
    },
    overrides: {
      US: { category: "evisa", categoryLabel: "Australian ETA App (Subclass 601)", feeUSD: "$20 AUD (~$14 USD)", processingTime: "Instant to 24 Hours" },
      UK: { category: "evisa", categoryLabel: "eVisitor Visa (Subclass 651)", feeUSD: "$0 (Free)", processingTime: "Under 24 Hours" },
      EU: { category: "evisa", categoryLabel: "eVisitor Visa (Subclass 651)", feeUSD: "$0 (Free)", processingTime: "Under 24 Hours" },
      CA: { category: "evisa", categoryLabel: "Australian ETA App (Subclass 601)", feeUSD: "$20 AUD (~$14 USD)", processingTime: "Instant to 24 Hours" },
      IN: { category: "embassy", categoryLabel: "Visitor Visa (Subclass 600)", feeUSD: "$190 AUD (~$125 USD)", processingTime: "15 to 25 Working Days", notes: "Apply online via ImmiAccount + biometrics collection at VFS Global." }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.visaForm,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement,
      COMMON_DOCS.employmentProof
    ]
  },
  {
    id: "new-zealand",
    name: "New Zealand (Aotearoa)",
    region: "Oceania",
    flag: "🇳🇿",
    capital: "Wellington",
    currency: "NZD (New Zealand Dollar)",
    popularCities: ["Auckland", "Queenstown", "Rotorua", "Milford Sound", "Christchurch"],
    description: "Lord of the Rings dramatic landscapes, Queenstown adventure sports, fjord cruises, and Maori heritage.",
    baseVisa: {
      category: "evisa",
      categoryLabel: "NZeTA (Electronic Travel Authority)",
      stayDuration: "Up to 3 Months (6 Months for UK)",
      feeUSD: "$17–$23 NZD + $100 NZD IVL Conservation Levy (~$75 USD total)",
      feeNumber: 75,
      processingTime: "Under 72 Hours (often under 10 minutes)",
      processingBadge: "Fast (1–3 Days)",
      passportRule: "Passport must be valid for at least 3 months beyond intended departure date.",
      officialPortal: "Immigration New Zealand NZeTA (immigration.govt.nz/nzeta)",
      difficulty: "Easy to Moderate",
      notes: "Visa-waiver travelers (US, UK, EU, CA, JP) apply via NZeTA mobile app. Includes International Visitor Conservation and Tourism Levy (IVL)."
    },
    overrides: {
      AU: { category: "visa_free", categoryLabel: "Trans-Tasman Travel (Visa-Free)", feeUSD: "$0", processingTime: "Instant" },
      IN: { category: "embassy", categoryLabel: "Visitor Visa (Online)", feeUSD: "$246 NZD (~$150 USD)", processingTime: "20 to 30 Working Days" }
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.photos,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  },
  {
    id: "fiji",
    name: "Fiji",
    region: "Oceania",
    flag: "🇫🇯",
    capital: "Suva",
    currency: "FJD (Fijian Dollar)",
    popularCities: ["Nadi", "Mamanuca Islands", "Yasawa Islands", "Coral Coast"],
    description: "Warm Bula spirit, secluded island resorts, soft coral diving, and tranquil South Pacific lagoons.",
    baseVisa: {
      category: "visa_free",
      categoryLabel: "Visa-Free Entry (Up to 4 Months)",
      stayDuration: "Up to 4 Months",
      feeUSD: "$0 (Free)",
      feeNumber: 0,
      processingTime: "Instant Entry Stamp",
      processingBadge: "Immediate",
      passportRule: "Passport must be valid for at least 6 months beyond the period of intended stay.",
      officialPortal: "Fiji Immigration Department (immigration.gov.fj)",
      difficulty: "Easy",
      notes: "Citizens of over 100 countries (US, UK, EU, AU, NZ, CA, JP, IN, SG) receive free 4-month tourist entry permit upon arrival."
    },
    mandatoryDocs: [
      COMMON_DOCS.passport,
      COMMON_DOCS.returnFlight,
      COMMON_DOCS.accommodation,
      COMMON_DOCS.bankStatement
    ]
  }
];

// Helper to determine roadmap steps dynamically based on visa category
function getRoadmapSteps(country, origin = "ALL") {
  const activeVisa = getEffectiveVisa(country, origin);
  const cat = activeVisa.category;

  if (cat === "visa_free") {
    return [
      {
        step: 1,
        title: "Passport & Validity Check",
        desc: "Ensure passport is valid for minimum 6 months from travel date and has at least 2 blank pages.",
        status: "critical"
      },
      {
        step: 2,
        title: "Mandatory Document Preparation",
        desc: "Prepare confirmed return airline ticket, hotel vouchers, and proof of funds.",
        status: "required"
      },
      {
        step: 3,
        title: "Digital Entry Registration",
        desc: country.mandatoryDocs.some(d => d.category === "Digital Clearance")
          ? "Fill online arrival card / health declaration (e.g. SGAC, MDAC, eTravel) 48–72 hours prior."
          : "Verify any airline boarding declarations and baggage customs limits.",
        status: "important"
      },
      {
        step: 4,
        title: "Boarding & Airline Clearance",
        desc: "Present your valid passport and return ticket at airport check-in counter.",
        status: "standard"
      },
      {
        step: 5,
        title: "Immigration Stamp on Arrival",
        desc: `Receive your ${activeVisa.stayDuration} visa-exempt tourist entry stamp at immigration border control.`,
        status: "complete"
      }
    ];
  } else if (cat === "voa") {
    return [
      {
        step: 1,
        title: "Passport & Currency Readiness",
        desc: "Ensure 6 months passport validity. Carry exact cash fee in USD/local currency or international credit card.",
        status: "critical"
      },
      {
        step: 2,
        title: "Pre-Arrival Documentation",
        desc: "Gather printed return flight booking, confirmed accommodation voucher, and 2 passport photos.",
        status: "required"
      },
      {
        step: 3,
        title: "Optional Online Pre-eVoA",
        desc: "Check if the official immigration portal offers digital e-VoA to skip airport queue lines.",
        status: "tip"
      },
      {
        step: 4,
        title: "Arrival Airport Visa Counter",
        desc: `Proceed to Visa on Arrival desk before passport control, pay ${activeVisa.feeUSD}, and submit your forms.`,
        status: "important"
      },
      {
        step: 5,
        title: "Border Stamping & Entry",
        desc: `Immigration officer inspects VoA receipt and stamps your passport for ${activeVisa.stayDuration}.`,
        status: "complete"
      }
    ];
  } else if (cat === "evisa") {
    return [
      {
        step: 1,
        title: "Check Eligibility & Passport Scan",
        desc: "Verify 6-month passport validity and prepare a clean high-resolution biometric photo and passport biodata scan.",
        status: "critical"
      },
      {
        step: 2,
        title: "Complete Official Online Form",
        desc: `Submit application on the official portal (${activeVisa.officialPortal || 'Official Government Site'}) with travel details.`,
        status: "required"
      },
      {
        step: 3,
        title: "Pay Visa Processing Fee",
        desc: `Pay ${activeVisa.feeUSD} via secure credit/debit card online. Processing time: ${activeVisa.processingTime}.`,
        status: "important"
      },
      {
        step: 4,
        title: "Receive & Print Approved eVisa",
        desc: "Download and print 2 high-contrast physical copies of your approved Electronic Visa document / PDF.",
        status: "critical"
      },
      {
        step: 5,
        title: "Fly & Clear Immigration E-Gates",
        desc: "Present printed eVisa, passport, and return ticket at airport check-in and destination border gates.",
        status: "complete"
      }
    ];
  } else {
    // Regular Embassy Paper Visa
    return [
      {
        step: 1,
        title: "Passport & Document Compilation",
        desc: "Collate 3-month stamped bank statements, employer leave letter (NOC), flight itinerary, hotel vouchers & travel insurance.",
        status: "critical"
      },
      {
        step: 2,
        title: "Fill Application & Book Appointment",
        desc: "Complete the official consular form and schedule an in-person biometrics appointment at VFS / TLS / Consulate.",
        status: "required"
      },
      {
        step: 3,
        title: "Attend In-Person Appointment & Biometrics",
        desc: `Submit physical passport, pay embassy fee (${activeVisa.feeUSD}), and record digital fingerprints & photograph.`,
        status: "important"
      },
      {
        step: 4,
        title: "Consular Processing & Passport Tracking",
        desc: `Embassy processes application (${activeVisa.processingTime}). Track application status online via reference number.`,
        status: "standard"
      },
      {
        step: 5,
        title: "Collect Passport with Visa Sticker & Travel",
        desc: "Collect physical passport with stamped visa vignette. Verify dates, name spelling, and number of entries before travel.",
        status: "complete"
      }
    ];
  }
}

// Function to get effective visa based on selected origin passport
function getEffectiveVisa(country, originCode) {
  if (originCode && country.overrides && country.overrides[originCode]) {
    return {
      ...country.baseVisa,
      ...country.overrides[originCode]
    };
  }
  return country.baseVisa;
}
