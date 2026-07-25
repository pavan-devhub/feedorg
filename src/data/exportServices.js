import { Lightbulb, MapPin, ClipboardList, Wheat, Handshake, CircleDollarSign, FileText, Ship, Landmark, ShoppingCart, Gift, Monitor, ShieldAlert, GraduationCap, TrendingUp } from 'lucide-react';

export const profileData = {
  name: "రామయ్య గారు",
  location: "రాప్తాడు, అనంతపురం",
  farm: "అరటి 2 ఎకరాలు",
  tier: "BASIC",
  ers: 62,
  stage: 4,
  coins: 4500,
  exports: 0
};

export const nextActionData = {
  title: "పంట మాదిరి పరీక్ష చేయించండి",
  subtitle: "మీ తదుపరి అడుగు",
  body: "మీ Pre-Harvest పరీక్ష విజయవంతంగా పూర్తయింది ✓. ఇప్పుడు మీ అరటి మాదిరిని NABL గుర్తింపు పొందిన ప్రయోగశాలకు పంపి pesticide residue నివేదిక తీసుకోండి. ఈ నివేదిక లేకుండా విదేశీ buyer order ఇవ్వడు. పరీక్ష ఫలితం 7-10 రోజులలో వస్తుంది.",
  cta: "ప్రయోగశాల booking ప్రారంభించండి →"
};

export const dashboardSections = [
  {
    id: "sec-01",
    num: "01",
    title: "ప్రారంభం",
    subtitle: "మీ ఎగుమతి ప్రయాణం ఇక్కడ మొదలవుతుంది",
    count: "2 సేవలు",
    theme: "light",
    tiles: [
      {
        id: "01",
        teluguTitle: "ఎందుకు ఎగుమతి?",
        englishTitle: "WHY EXPORTS",
        iconClass: "ic-yellow",
        Icon: Lightbulb,
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "మన పంటను స్థానిక మండీలో అమ్మితే తక్కువ ధర వస్తుంది. అదే పంటను విదేశీ buyer కి అమ్మితే 3 నుండి 6 రెట్లు ఎక్కువ ఆదాయం వస్తుంది. ఎగుమతి వల్ల ప్రభుత్వ ప్రోత్సాహకాలు, పన్ను రాయితీలు, మరియు అంతర్జాతీయ గుర్తింపు లభిస్తాయి. ఈ విభాగంలో మండీ ధర vs ఎగుమతి ధర పోలిక, వాస్తవిక లాభ ఉదాహరణలు, మరియు అనంతపురం రైతుల విజయ గాథలు చూపిస్తాము.",
        facts: [
          { icon: "📈", html: "<b>3-6×</b> ఆదాయం" },
          { icon: "🌾", html: "అరటి + మిర్చి" },
          { icon: "⏱️", html: "5 ని." }
        ]
      },
      {
        id: "02",
        teluguTitle: "ఎలా మొదలు పెట్టాలి?",
        englishTitle: "HOW TO START • కృషి యేవ జయతే",
        iconClass: "ic-green",
        Icon: MapPin,
        pillText: "4/8 దశ",
        pillClass: "pill-progress",
        body: "ఎగుమతి ప్రయాణం 8 దశలలో జరుగుతుంది — దీనినే KYJ (కృషి యేవ జయతే) అంటారు. మొదటి దశలో సభ్యత్వ నమోదు, చివరి దశలో FIRC వచ్చి మీ PACS ఖాతాలో డబ్బు జమ. ప్రతి దశలో ఏమి చేయాలి, ఎంత సమయం పడుతుంది, ఏ documents కావాలి, ఎంత ఖర్చు అవుతుంది — అన్నీ వివరంగా చూపిస్తాము. మీరు ప్రస్తుతం దశ 4 లో ఉన్నారు (PHRT pass).",
        facts: [
          { icon: "🪜", html: "<b>8</b> దశలు" },
          { icon: "📍", html: "ప్రస్తుతం దశ <b>4</b>" },
          { icon: "⏱️", html: "6-9 నెలలు" }
        ]
      }
    ]
  },
  {
    id: "sec-02",
    num: "02",
    title: "సన్నద్ధత",
    subtitle: "పత్రాలు, నాణ్యత, ఉత్పత్తి తయారీ",
    count: "2 సేవలు",
    theme: "light",
    tiles: [
      {
        id: "03",
        teluguTitle: "నమోదు & లైసెన్సులు",
        englishTitle: "REGISTRATIONS • 8 documents + NSWS",
        iconClass: "ic-blue",
        Icon: ClipboardList,
        borderLeft: "#1976D2",
        pillText: "2/8 ✓",
        pillClass: "pill-progress",
        body: "విదేశీ ఎగుమతి కోసం 8 ప్రభుత్వ నమోదులు తప్పనిసరి — IEC కోడ్ (DGFT), APEDA RCMC సభ్యత్వ ధృవీకరణ, FSSAI ఆహార లైసెన్స్, LUT (GST zero-rated), AD కోడ్ (బ్యాంక్-పోర్ట్), ICEGATE నమోదు, DSC డిజిటల్ సంతకం, మిర్చికి స్పైసెస్ బోర్డ్ CRES. FEED ద్వారా IEC + DSC ఇప్పటికే ఇవ్వబడ్డాయి. మిగిలిన 6 documents కోసం step-by-step మార్గదర్శనం, portal links, ఫోన్ నంబర్లు ఇక్కడ ఉన్నాయి.",
        checklist: [
          { status: 'done', label: 'IEC కోడ్' },
          { status: 'done', label: 'DSC టోకెన్' },
          { status: 'pending', label: 'APEDA RCMC' },
          { status: 'pending', label: 'FSSAI లైసెన్స్' },
          { status: 'none', label: 'LUT (GST)' },
          { status: 'none', label: 'AD కోడ్' },
          { status: 'none', label: 'ICEGATE' },
          { status: 'none', label: 'స్పైసెస్ CRES' }
        ],
        facts: [
          { icon: "📂", html: "<b>9</b> screens" },
          { icon: "💰", html: "~₹3,000" },
          { icon: "⏱️", html: "2-3 వారాలు" }
        ]
      },
      {
        id: "04",
        teluguTitle: "ఉత్పత్తి & నాణ్యత",
        englishTitle: "PRODUCT & QUALITY GATES",
        iconClass: "ic-amber",
        Icon: Wheat,
        pillText: "పనిలో",
        pillClass: "pill-progress",
        body: "ఎగుమతికి తగిన పంట ఎంపిక, దాని HS కోడ్ (అరటి 0803, మిర్చి 0904), 90 రోజుల పెస్టిసైడ్ స్ప్రే రికార్డ్ (GAP Log), pre-harvest పరీక్ష (PHRT), NABL ప్రయోగశాలలో pesticide residue పరీక్ష, ETO zero tolerance నిబంధనలు, destination దేశానికి తగిన packing & labelling, మరియు LabSetu booking — ఇవన్నీ ఇక్కడ. మీ ERS (Export Readiness Score) ఈ విభాగంలో లెక్కిస్తారు. Guntur మిర్చికి GI Tag వల్ల 2-5 రెట్లు premium ధర వస్తుంది.",
        facts: [
          { icon: "📊", html: "ERS <b>62/100</b>" },
          { icon: "✅", html: "PHRT pass" },
          { icon: "📂", html: "<b>10</b> screens" }
        ]
      }
    ]
  },
  {
    id: "sec-03",
    num: "03",
    title: "వ్యాపారం",
    subtitle: "కొనుగోలుదారు, ధర, పత్రాలు, రవాణా, చెల్లింపు",
    count: "6 సేవలు",
    theme: "light",
    tiles: [
      {
        id: "05",
        teluguTitle: "కొనుగోలుదారుల సంబంధం",
        englishTitle: "BUYER CONNECTION",
        iconClass: "ic-purple",
        Icon: Handshake,
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "విదేశీ buyer ని ఎలా కనుగొనాలి, వారి credit rating ఎలా check చేయాలి, BSM (Buyer Seller Meet) లో పాల్గొనడం ఎలా, sample ఎలా పంపాలి — ఈ అన్ని విషయాలు ఇక్కడ. VISWARUPAM CRM ద్వారా buyer communication log, trust score, మరియు ECGC credit rating చూడవచ్చు. APEDA MAI పథకం కింద trade fair ఖర్చులో 75% వరకు తిరిగి వస్తుంది. Sample dispatch DHL Express ద్వారా 48 గంటలలో Dubai కి చేరుతుంది.",
        facts: [
          { icon: "✈️", html: "DHL <b>48hr</b>" },
          { icon: "💰", html: "MAI <b>75%</b>" },
          { icon: "📂", html: "<b>5</b> screens" }
        ]
      },
      {
        id: "06",
        teluguTitle: "ధర & Finance",
        englishTitle: "PRICING & FINANCE • 12 tools",
        iconClass: "ic-teal",
        Icon: CircleDollarSign,
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "FOB ధర ఎలా లెక్కించాలి (10 ఖర్చు భాగాలు), break-even minimum ధర, working capital ప్రణాళిక, మరియు 12 finance tools — PCFC ముందస్తు రుణం (FOB లో 85%), eNWR గిడ్డంగి రశీదు pledge, ECGC buyer default insurance, forward contract (USD rate lock), EEFC విదేశీ కరెన్సీ ఖాతా, LC (Letter of Credit) checker, AIF 2% net subsidy NABARD ద్వారా, post-shipment finance. మీరు FOB లో 93% పొందుతారు, FEED 5-7% మాత్రమే తీసుకుంటుంది.",
        facts: [
          { icon: "👨🌾", html: "మీ వాటా <b>93%</b>" },
          { icon: "🏦", html: "PCFC <b>85%</b>" },
          { icon: "📂", html: "<b>12</b> screens" }
        ]
      },
      {
        id: "07",
        teluguTitle: "ఎగుమతి పత్రాలు",
        englishTitle: "EXPORT DOCUMENTATION",
        iconClass: "ic-red",
        Icon: FileText,
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "ప్రతి ఎగుమతికి 9 documents తప్పనిసరి — Commercial Invoice, Packing List, Certificate of Origin (CoO), Phytosanitary Certificate, NABL Test COA, Marine Insurance, RCMC కాపీ, e-Sanchit IRN, Shipping Bill. వీటిని ఎలా తయారు చేయాలి, ఎక్కడ upload చేయాలి, ఏ portal లో file చేయాలి — step-by-step మార్గదర్శనం. అదనంగా BL types (4 రకాలు), Incoterms (FOB/CIF/DDP), e-CoO 2.0 (CEPA India-UAE 5% duty save), 28-point LC discrepancy checker.",
        facts: [
          { icon: "📑", html: "<b>9</b> mandatory" },
          { icon: "📂", html: "<b>15</b> screens" },
          { icon: "🆔", html: "e-Sanchit IRN" }
        ]
      },
      {
        id: "08",
        teluguTitle: "రవాణా & Shipping",
        englishTitle: "LOGISTICS & SHIPPING",
        iconClass: "ic-navy",
        Icon: Ship,
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "అరటి కోసం కృష్ణపట్నం పోర్ట్ (KPCT) → Jebel Ali 18 రోజులు sea route, మిర్చి కోసం విశాఖపట్నం → Jebel Ali 16 రోజులు. Air route కోసం హైదరాబాద్ GMR Perishable Cargo Centre (Dubai కి 48 గంటలు). Reefer container (13°C constant temperature), shipping bill, LEO (Let Export Order) tracker, port gate-in cut-off times, SAGAR SETU ONOP portal, container stuffing, ISPM-15 wooden pallets — అన్ని వివరాలు. Krishi Udan 2.0 పథకం కింద air freight లో 50% subsidy.",
        facts: [
          { icon: "🚢", html: "KPCT <b>18d</b>" },
          { icon: "✈️", html: "HYD <b>48hr</b>" },
          { icon: "📂", html: "<b>12</b> screens" }
        ]
      },
      {
        id: "09",
        teluguTitle: "చెల్లింపు & FIRC",
        englishTitle: "PAYMENT & FIRC",
        iconClass: "ic-gold",
        Icon: Landmark,
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "Buyer మీకు payment పంపిన తర్వాత, విదేశీ bank నుండి SBI అనంతపురం ద్వారా FIRC (Foreign Inward Remittance Certificate) వస్తుంది. ఆ క్షణం నుండి 9 actions 60 సెకన్లలో జరుగుతాయి — CCS క్రెడిట్ స్కోర్ auto-post, FEED CARD GOLD upgrade, S.61 evidence counter, FILR 10:1 verification, RoDTEP + Drawback auto-post, మీ PACS ఖాతాలో 93% డబ్బు జమ, KRISHI COINS +1,500. మీ మొదటి FIRC = మీ ఆర్థిక పరివర్తన ఆరంభం.",
        facts: [
          { icon: "👨🌾", html: "వాటా <b>93%</b>" },
          { icon: "🪙", html: "<b>+1,500</b> KC" },
          { icon: "📂", html: "<b>9</b> screens" }
        ]
      },
      {
        id: "10",
        teluguTitle: "ఆన్లైన్ ఎగుమతి",
        englishTitle: "E-COMMERCE EXPORTS",
        iconClass: "ic-pink",
        Icon: ShoppingCart,
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "Amazon Global Selling (amazon.ae, amazon.co.uk, amazon.de) ద్వారా container కాకుండా direct customer కి విక్రయించవచ్చు. UK VAT నమోదు (£85K threshold, 20% పన్ను), EU VAT OSS (€10K threshold, 27 దేశాలు, త్రైమాసిక filing), Stripe/Wise/Payoneer payment aggregators, EU GDPR + భారత DPDP Act compliance, GI Tag premium (Guntur మిర్చి GI tag వల్ల 2-5× ధర), NSWS (Single Window System ద్వారా 32+ లైసెన్సులు ఒకే చోట) — ఇవన్నీ ఇక్కడ.",
        facts: [
          { icon: "🛒", html: "<b>3</b> platforms" },
          { icon: "🏷️", html: "GI <b>2-5×</b>" },
          { icon: "📂", html: "<b>5</b> screens" }
        ]
      }
    ]
  },
  {
    id: "sec-04",
    num: "04",
    title: "ప్రభుత్వ సేవలు",
    subtitle: "అధికారిక portal లు మరియు ప్రయోజనాలు",
    count: "2 సేవలు",
    theme: "govt",
    tiles: [
      {
        id: "11",
        teluguTitle: "ప్రభుత్వ ప్రయోజనాలు",
        englishTitle: "GOVERNMENT BENEFITS & INCENTIVES",
        iconClass: "ic-darkgreen",
        Icon: Gift,
        pillText: "మొదటి FIRC తర్వాత",
        pillClass: "pill-future",
        body: "ఎగుమతి చేస్తే ప్రభుత్వం నుండి అనేక డబ్బు రాయితీలు వస్తాయి — RoDTEP (అరటి 0.5%, మిర్చి 2-3.5% rebate, ఆంధ్రప్రదేశ్ chapter ఫిబ్రవరి 2026 నుండి restored), Duty Drawback, IGST Refund (3-4 వారాలలో GSTR-1 Table 6A ద్వారా), eBRC (Bank Realization Certificate, EDPMS auto), SAGAR SETU ONOP (₹15-20K savings), AEO T1 green channel (1 సంవత్సరం+ exports తర్వాత), Krishi Udan 2.0 (air freight 50% subsidy). అన్నీ ఇక్కడ calculator తో.",
        facts: [
          { icon: "🍌", html: "RoDTEP <b>0.5%</b>" },
          { icon: "🌶️", html: "<b>2-3.5%</b>" },
          { icon: "📂", html: "<b>7</b> screens" }
        ]
      },
      {
        id: "12",
        teluguTitle: "ప్రభుత్వ Dashboards",
        englishTitle: "OFFICIAL PORTALS • 11 dashboards",
        iconClass: "ic-indigo",
        Icon: Monitor,
        pillText: "మొదటి FIRC తర్వాత",
        pillClass: "pill-future",
        body: "మీ ఎగుమతి status ఏ government portal లో ఎలా చూడాలి — ICEGATE (Shipping Bill, LEO, RoDTEP scrip), DGFT (IEC, LUT), APEDA (RCMC, Phytosanitary, MAI), Spices Board (CRES, మిర్చి export permit), EDPMS (SB → EGM → FIRC chain, 9-month FEMA timer), NABARD (AIF status), EXIM Bank (PCFC), ECGC (insurance), SAGAR SETU (ONOP) — 11 portals direct links ఇక్కడ. Minimum Export Price (MEP) tracker కూడా ఉంది.",
        facts: [
          { icon: "🏛️", html: "<b>11</b> portals" },
          { icon: "📞", html: "24×7" },
          { icon: "📂", html: "<b>11</b> screens" }
        ]
      }
    ]
  },
  {
    id: "sec-05",
    num: "05",
    title: "సహాయం & విద్య",
    subtitle: "తిరస్కరణ, నేర్చుకోండి, స్వంత స్థితి",
    count: "3 సేవలు",
    theme: "support",
    tiles: [
      {
        id: "13",
        teluguTitle: "తిరస్కరణ & వివాదాలు",
        englishTitle: "REJECTION & DISPUTES • Recovery SOPs",
        iconClass: "ic-orange",
        Icon: ShieldAlert,
        borderLeft: "#E53935",
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "మీ shipment తిరస్కరించబడితే ఏం చేయాలి? EU BIP (Border Inspection Post) rejection SOP, RASFF CAPA response 24 గంటలలో, ECGC claim process (4-month window, 80-90% recovery), buyer dispute resolution SGS survey ద్వారా, DGFT quality complaint ANF-8 form, జపాన్ rejection (PLS 0.01ppm strictest MRL), చైనా GACC re-CIFER (Decree 280), UAE V7 Jebel Ali compliance, Jan Sunwai (DGFT video conference త్రైమాసిక), CPGRAMS (pgportal.gov.in 30-day SLA). ప్రతి తిరస్కరణకి step-by-step recovery plan.",
        facts: [
          { icon: "🛡️", html: "ECGC <b>80-90%</b>" },
          { icon: "⏱️", html: "RASFF <b>24hr</b>" },
          { icon: "📂", html: "<b>9</b> screens" }
        ]
      },
      {
        id: "14",
        teluguTitle: "నేర్చుకోండి & మార్గదర్శనం",
        englishTitle: "LEARNING & MENTORS",
        iconClass: "ic-lime",
        Icon: GraduationCap,
        borderLeft: "#00897B",
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "EXIM Paathshaala — 20 భాగాల తెలుగు ఎగుమతి academy, WhatsApp ద్వారా delivery, ప్రతి భాగం తర్వాత CERT-1 నుండి CERT-8 వరకు KRISHI COINS rewards. DGFT Niryat Bandhu — ఉచిత export mentorship + VAHEI AI assistant. APEDA Farmer Connect Training — workshops + Hortinet system training. A-Z Export Complete Guide — 13 categories, 80+ topics, పూర్తి తెలుగులో. ఈ academy పూర్తి చేస్తే మీరు self-export (LINE B) కూడా చేయగలుగుతారు.",
        facts: [
          { icon: "📖", html: "<b>20</b> భాగాలు" },
          { icon: "🎓", html: "<b>8</b> certificates" },
          { icon: "📂", html: "<b>5</b> screens" }
        ]
      },
      {
        id: "15",
        teluguTitle: "నా స్థితి & సహాయం",
        englishTitle: "MY STATUS & HELP",
        iconClass: "ic-maroon",
        Icon: TrendingUp,
        borderLeft: "#880E4F",
        pillText: "తెరవండి",
        pillClass: "pill-active",
        body: "మీ సంపూర్ణ ఎగుమతి చరిత్ర — FIRC timeline, KYJ stage progression, FEED CARD tier evolution, KRISHI COINS accumulation, FILR ratio history, CCS score trend, FEED WORLD stories అన్ని ఇక్కడ. Star Export House tracking (5 ఏళ్ళ cumulative FOB). Help section లో EPC Directory (APEDA + Spices Board + IOPEPC + NCEL), Service Providers (CHA panel, SGS inspection, freight forwarders), Indian Missions 190+ దేశాలలో, Trade Statistics (DGCIS + AgriExchange), Exporters Directory.",
        facts: [
          { icon: "🌍", html: "<b>190+</b> దేశాలు" },
          { icon: "⭐", html: "Star House Y5" },
          { icon: "📂", html: "<b>6</b> screens" }
        ]
      }
    ]
  }
];
