/**
 * Export Program curriculum — single source of truth for every view.
 * Structure: 4 phases → 12 modules → topics (lessons).
 */

export const program = {
  title: 'Export Program',
}

const RAW_PHASES = [
  {
    id: 1,
    code: 'FND',
    short: 'Foundations',
    title: 'Export Foundations',
    tagline:
      'Understand the basics and build a strong foundation for exports.',
    modules: [
      {
        id: 0,
        title: 'My Exports Overview',
        summary:
          'Explore the complete farmer export platform and navigate the four phase categories from foundations to payments.',
        lessons: ['My Exports Categories'],
      },
      {
        id: 1,
        title: 'Why Exports?',
        summary:
          'See the income gap between local and global markets, and map the complete export journey end to end.',
        lessons: ['Income Gap', 'Export Journey'],
      },
      {
        id: 2,
        title: 'How to Start Exports?',
        summary:
          'Walk through the eight KYJ stages and pinpoint exactly where your business stands today.',
        lessons: ['KYJ 8 Stages', 'Where Am I?'],
      },
      {
        id: 3,
        title: 'Registration & Licences',
        summary:
          'Every code, certificate and portal account to set up before your first shipment — from IEC to Sagar Setu.',
        lessons: ['IEC', 'RCMC', 'FSSAI', 'LUT', 'AD Code', 'CRES', 'ICEGATE', 'DSC', 'SAGAR SETU'],
      },
    ],
  },
  {
    id: 2,
    code: 'MKT',
    short: 'Readiness',
    title: 'Market Readiness',
    tagline:
      'Prepare your product, meet quality standards and understand markets.',
    modules: [
      {
        id: 4,
        title: 'Production & Quality',
        summary:
          'Meet buyer-country standards with residue testing, accredited labs, good farm practices and an unbroken cold chain.',
        lessons: ['ERS', 'PHRI', 'NABL', 'MRL', 'Pesticide', 'GAP', 'Cold Chain', 'Phyto', 'ETQ', 'GAP Log'],
      },
      {
        id: 5,
        title: 'Buyer Connection',
        summary:
          'Find and win buyers — quote FOB prices, keep clean records, attend buyer-seller meets and send the right samples.',
        lessons: ['FOB', 'Record', 'BSM', 'Sample'],
      },
      {
        id: 6,
        title: 'Market Intelligence',
        summary:
          'Build a profitable price, know your breakeven, and fund the cycle with export credit, insurance and safe payment terms.',
        lessons: [
          'Cost-Plus Calculator',
          'Break-even FOB',
          'Volume Discount',
          'Trade Map',
          'EXIM PCFC',
          'ECGC',
          'Forward Contract',
          'AIF Subsidy',
          'LC checker',
          'Payment Terms',
          'FILR Calculator',
          'Post shipment Credit',
        ],
      },
    ],
  },
  {
    id: 3,
    code: 'DOC',
    short: 'Delivery',
    title: 'Documents & Delivery',
    tagline:
      'Learn the export documentation, logistics and delivery process.',
    modules: [
      {
        id: 7,
        title: 'Export Documentation',
        summary:
          'The complete export paper trail — from invoice and packing list through shipping bill, bill of lading and eBRC.',
        lessons: [
          'Commercial Invoice',
          'Packing List',
          'Certificate of Origin',
          'Phytosanitary Certificate',
          'PHRT Certificate',
          'Marine Insurance',
          'e-Sanchit Upload',
          'Shipping Bill',
          'Let Export Order',
          'Bill of Lading',
          'Export General Manifest',
          'RoDTEP',
          'Duty Drawback',
          'eBRC',
        ],
      },
      {
        id: 8,
        title: 'Logistics',
        summary:
          'Plan the cargo logistics journey end-to-end from farm gate to destination port.',
        lessons: [
          'Logistics Journey',
        ],
      },
      {
        id: 9,
        title: 'Transport & Shipping',
        summary:
          'Hands-on port guides for KPCT and Vizag — containers, freight, vessels, cold chain, air cargo and avoiding demurrage.',
        lessons: [
          'KPCT',
          'Vizag',
          'Container',
          'PortGuide',
          'SBLEO',
          'CHA',
          'Freight',
          'Vessel',
          'AirCargo',
          'ColdChain',
          'Demurrage',
          'SagarSetu',
        ],
      },
    ],
  },
  {
    id: 4,
    code: 'PAY',
    short: 'Payments',
    title: 'Payments & Protection',
    tagline:
      'Understand payment methods, export incentives and risk protection.',
    modules: [
      {
        id: 10,
        title: 'Payments & FIRC',
        summary:
          'Receive and document foreign payments with FIRC, manage EEFC funds, and explore credit, cooperative and growth pathways.',
        lessons: [
          'FIRC',
          'NineActions',
          'GOLDUpgrade',
          'CCS',
          'FILR',
          'PACS',
          'EEFC',
          'KrishiCoins',
          'FeedWorld',
        ],
      },
      {
        id: 11,
        title: 'Government Schemes',
        summary:
          'Claim every rupee you are owed — estimate RoDTEP and drawback, and track IGST refunds, eBRCs and EDPMS status.',
        lessons: [
          'RoDTEP Calculator',
          'Duty Drawback',
          'IGST Refund Tracker',
          'eBRC Tracker',
          'EDPMS Monitor',
        ],
      },
      {
        id: 12,
        title: 'Risk Management',
        summary:
          'Respond to rejections, quality and document disputes, customs issues and EU alerts — through to force majeure, arbitration and insurance claims.',
        lessons: [
          'REJECTION',
          'BUYER DISPUTE',
          'QUALITY',
          'DOCS',
          'CUSTOMS',
          'RASFF',
          'FM',
          'ARBITRATION',
          'INSURANCE',
        ],
      },
    ],
  },
]

/**
 * Names shown in the program tree where they differ from the lesson keys above (the keys still
 * drive the glossary and page lookups below). Keyed by lesson id.
 */
const DISPLAY_NAMES = {
  '3.9': 'Sagar Setu',
  '4.2': 'PHRT',
  '4.9': 'ETO',
  '6.9': 'LC Checker',
  '6.12': 'Post-shipment Credit',
  '9.2': 'Vizag Port',
  '9.4': 'Port Guide',
  '9.5': 'Shipping Bill & LEO',
  '9.9': 'Air Cargo',
  '9.10': 'Cold Chain',
  '9.12': 'Sagar Setu',
  '10.2': 'Nine Actions',
  '10.3': 'GOLD Upgrade',
  '10.8': 'Krishi Coins',
  '10.9': 'FEED World',
  '12.1': 'Rejection',
  '12.2': 'Buyer Dispute',
  '12.3': 'Quality',
  '12.4': 'Documents',
  '12.5': 'Customs',
  '12.7': 'Force Majeure',
  '12.8': 'Arbitration',
  '12.9': 'Insurance',
}

/** Hover titles for topics without a glossary entry. Keyed by lesson id. */
const FULL_TITLES = {
  '3.6': 'CRES (Spices Board)',
  '4.1': 'ERS Readiness Score',
  '4.2': 'PHRT Certificate',
  '4.5': 'Pesticide Master Guide',
  '4.9': 'ETO Zero Tolerance',
  '5.2': 'Buyer Communication Log',
  '5.4': 'Sample Dispatch Tracker',
}

/** Short, well-established expansions shown under a topic name. */
const GLOSSARY = {
  'My Exports Categories':
    'Overview of the four export categories: Foundations, Readiness, Documents and Payments',
  IEC: 'Importer Exporter Code issued by DGFT',
  RCMC: 'Registration-cum-Membership Certificate from an export council',
  FSSAI: 'Food safety licence for food exporters',
  LUT: 'Letter of Undertaking to export without paying IGST',
  'AD Code': 'Authorised Dealer bank code registered at the port',
  ICEGATE: 'Indian Customs Electronic Gateway',
  DSC: 'Digital Signature Certificate for online filings',
  'SAGAR SETU': 'Digital platform for port and shipping services',
  'Sagar Setu': 'Digital platform for port and shipping services',
  NABL: 'Accreditation for testing and calibration labs',
  MRL: 'Maximum Residue Limits set by importing countries',
  GAP: 'Good Agricultural Practices',
  'GAP Log': 'Farm records that prove GAP compliance',
  'Cold Chain': 'Temperature control from harvest to port',
  Phyto: 'Phytosanitary certificate for plant products',
  ETO: 'Ethylene oxide residue compliance',
  FOB: 'Free On Board — price up to loading on the vessel',
  BSM: 'Buyer-Seller Meets',
  'Cost Plus': 'Cost-plus export pricing',
  'Cost-Plus Calculator': 'Cost-plus export pricing ensuring profitable margins',
  Breakeven: 'The price and volume that cover your costs',
  'Break-even FOB': 'Minimum export price and volume covering farm and transit costs',
  'Volume Discount': 'Tiered pricing strategy based on order quantities and container loads',
  'Trade Map': 'ITC Trade Map — global import & export data',
  PCFC: 'Packing Credit in Foreign Currency',
  'EXIM PCFC': 'Pre-shipment export credit in foreign currency for input financing',
  ECGC: 'Export Credit Guarantee Corporation of India',
  'Forward Contract': 'Lock in today’s exchange rate for a future payment',
  AIF: 'Agriculture Infrastructure Fund',
  'AIF Subsidy': 'Agriculture Infrastructure Fund interest subvention scheme',
  LC: 'Letter of Credit',
  'LC checker': 'Letter of Credit verification tool for safe international trade',
  'Payment Terms': 'Advance, LC, DP, DA and open account',
  'FILR Calculator': 'Farmer Income & Logistics Realization live calculator',
  'Post Shipment': 'Finance after the goods are shipped',
  'Post shipment Credit': 'Post-shipment export finance against shipping documents',
  Invoice: 'Commercial invoice',
  'Commercial Invoice': 'Commercial invoice detailing shipment values and terms',
  'Packing List': 'Itemised carton and container packing specification',
  CoO: 'Certificate of Origin',
  'Certificate of Origin': 'Official certificate stating the origin of exported goods',
  Marine: 'Marine insurance certificate',
  'Phytosanitary Certificate': 'Plant quarantine and health inspection certificate from DPPQS',
  'PHRT Certificate': 'Pre-Harvest Residue Test lab certificate from accredited NABL lab',
  eSanchit: 'Paperless upload of supporting documents to customs',
  'e-Sanchit Upload': 'Paperless digital document upload portal on ICEGATE',
  'Shipping Bill': 'Customs export declaration',
  LEO: 'Let Export Order from customs',
  'Let Export Order': 'Let Export Order from customs permitting shipment loading',
  BL: 'Bill of Lading',
  EGM: 'Export General Manifest',
  'Export General Manifest': 'Carrier manifest filed with customs confirming vessel departure',
  RoDTEP: 'Remission of Duties & Taxes on Exported Products',
  Drawback: 'Refund of duties paid on inputs',
  eBRC: 'Electronic Bank Realisation Certificate',
  'CHA Directory': 'Find licensed customs brokers',
  'Bill of Lading': 'Carrier’s receipt and title document for cargo',
  'Customs Clearance': 'Examination and release of export cargo',
  'Marine Insurance': 'Cover for cargo loss or damage in transit',
  'ECGC Insurance': 'Cover against buyer non-payment',
  'INCOTERMS 2020': 'ICC delivery terms — EXW, FOB, CIF, DAP and more',
  'Logistics Journey': 'End-to-end cargo logistics journey from farm gate to destination port',
  KPCT: 'Krishnapatnam Port Container Terminal guide & SOP',
  Vizag: 'Visakhapatnam Port operations and container handling',
  Container: 'Reefer container tracking, temperature monitoring & cold chain',
  PortGuide: 'Port selection and comprehensive operations guide for AP exporters',
  'Port Guide': 'Port selection and comprehensive operations guide for AP exporters',
  SBLEO: 'Shipping Bill & Let Export Order clearance protocol',
  'SB/LEO': 'Shipping Bill & Let Export Order clearance protocol',
  CHA: 'Custom House Agent and freight forwarder coordination',
  Freight: 'Ocean and inland freight cost calculation and rate negotiations',
  Vessel: 'Vessel schedule, sailing calendar and shipping line booking',
  AirCargo: 'Air cargo decision matrix and high-value perishable transport',
  'Air Cargo': 'Air cargo decision matrix and high-value perishable transport',
  ColdChain: 'Unbroken cold chain protocol and temperature breach handling',
  'Cold Chain': 'Unbroken cold chain protocol and temperature breach handling',
  Demurrage: 'Charges when containers exceed free time and prevention guidelines',
  SagarSetu: 'National Logistics Portal (Marine) single-window operations',
  'Sagar Setu': 'National Logistics Portal (Marine) single-window operations',

  FIRC: 'Foreign Inward Remittance Certificate receipt and bank verification',
  NineActions: '9 automated compliance and credit actions triggered post-FIRC',
  'Nine Actions': '9 automated compliance and credit actions triggered post-FIRC',
  GOLDUpgrade: 'FEED Card Gold tier unlock and interest-subvented credit access',
  'GOLD Upgrades': 'FEED Card Gold tier unlock and interest-subvented credit access',
  CCS: 'Commodity Credit Score evaluation and export financing eligibility',
  FILR: 'Farmer Income & Logistics Realization breakdown and net margin formula',
  PACS: 'Primary Agricultural Credit Societies 93% distribution settlement',
  EEFC: 'Exchange Earners’ Foreign Currency account and forex hedging strategy',
  KrishiCoins: 'Krishi Coins Stage 7 reward points and redemption pathways',
  'Krishi Coins': 'Krishi Coins Stage 7 reward points and redemption pathways',
  FeedWorld: 'FEED World international farmer showcase and success story publication',
  'Feed World': 'FEED World international farmer showcase and success story publication',

  'RoDTEP Calculator': 'Estimate your RoDTEP benefit',
  'Duty Drawback': 'Claim refunds of input duties',
  'IGST Refund Tracker': 'Follow your IGST refund status',
  'eBRC Tracker': 'Track bank realisation certificates',
  'EDPMS Monitor': 'RBI Export Data Processing & Monitoring System',

  REJECTION: 'Consignment rejection protocol, salvage options and return shipment',
  Rejection: 'Consignment rejection protocol, salvage options and return shipment',
  'BUYER DISPUTE': 'Buyer dispute resolution, inspection agency re-testing and claim settlement',
  'Buyer Dispute': 'Buyer dispute resolution, inspection agency re-testing and claim settlement',
  QUALITY: 'Quality rejection response protocol, lab re-verification and mitigation',
  Quality: 'Quality rejection response protocol, lab re-verification and mitigation',
  DOCS: 'Documentation error correction and customs amendment procedure',
  Documents: 'Documentation error correction and customs amendment procedure',
  CUSTOMS: 'Customs hold resolution, query compliance and cargo release SOP',
  Customs: 'Customs hold resolution, query compliance and cargo release SOP',
  RASFF: 'EU Rapid Alert System for Food and Feed border alert handling',
  FM: 'Force majeure contractual invocation and relief protocol',
  ARBITRATION: 'International trade arbitration process and dispute resolution',
  Arbitration: 'International trade arbitration process and dispute resolution',
  INSURANCE: 'Marine cargo insurance claim filing and loss adjustment procedure',
  Insurance: 'Marine cargo insurance claim filing and loss adjustment procedure',
}

/**
 * Topics that appear in more than one module under slightly different names.
 * Mapping them to a shared key lets the UI show “Also in Module X” links.
 */
const TOPIC_ALIASES = {
  billoflading: 'bl',
  commercialinvoice: 'invoice',
  certificateoforigin: 'coo',
  phytosanitarycertificate: 'phyto',
  phrtcertificate: 'phrt',
  phri: 'phrt',
  marineinsurance: 'marine',
  esanchitupload: 'esanchit',
  letexportorder: 'leo',
  exportgeneralmanifest: 'egm',
  ecgcinsurance: 'ecgc',
  chadirectory: 'cha',
  containerbooking: 'container',
  vesselschedule: 'vessel',
  dutydrawback: 'drawback',
  rodtepcalculator: 'rodtep',
  ebrctracker: 'ebrc',
  sbleo: 'sbleo',
  sagarsetu: 'sagarsetu',
  nineactions: 'nineactions',
  goldupgrade: 'gold',
  goldupgrades: 'gold',
  krishicoins: 'krishicoins',
  feedworld: 'feedworld',
  buyerdispute: 'buyerdispute',
  documents: 'docs',
}

const topicKey = (name) => {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  return TOPIC_ALIASES[key] ?? key
}

export const pad = (n) => String(n).padStart(2, '0')

/**
 * Direct links to standalone HTML screens for Modules 00-12.
 * Stored in public/modules/{module_id}/{clean_name}.html
 */
const LESSON_PATHS = {
  // Module 00
  'My Exports Categories': 'modules/00/my-exports-categories.html',

  // Module 01
  'Income Gap': 'modules/01/income-gap.html',
  'Export Journey': 'modules/01/export-journey.html',

  // Module 02
  'KYJ 8 Stages': 'modules/02/kyj-8-stages.html',
  'Where Am I?': 'modules/02/where-am-i.html',

  // Module 03
  IEC: 'modules/03/iec.html',
  RCMC: 'modules/03/rcmc.html',
  FSSAI: 'modules/03/fssai.html',
  LUT: 'modules/03/lut.html',
  'AD Code': 'modules/03/ad-code.html',
  CRES: 'modules/03/cres.html',
  ICEGATE: 'modules/03/icegate.html',
  DSC: 'modules/03/dsc.html',
  'SAGAR SETU': 'modules/03/sagar-setu.html',

  // Module 04
  ERS: 'modules/04/ers.html',
  PHRI: 'modules/04/phrt.html',
  PHRT: 'modules/04/phrt.html',
  NABL: 'modules/04/nabl.html',
  MRL: 'modules/04/mrl.html',
  Pesticide: 'modules/04/pesticide.html',
  GAP: 'modules/04/gap.html',
  '4:Cold Chain': 'modules/04/cold-chain.html',
  'Cold Chain': 'modules/04/cold-chain.html',
  Phyto: 'modules/04/phyto.html',
  ETQ: 'modules/04/eto.html',
  ETO: 'modules/04/eto.html',
  'GAP Log': 'modules/04/gap-log.html',

  // Module 05
  FOB: 'modules/05/fob.html',
  Record: 'modules/05/record.html',
  BSM: 'modules/05/bsm.html',
  Sample: 'modules/05/sample.html',

  // Module 06
  'Cost-Plus Calculator': 'modules/06/cost-plus-calculator.html',
  'Break-even FOB': 'modules/06/break-even-fob.html',
  'Volume Discount': 'modules/06/volume-discount.html',
  'Trade Map': 'modules/06/trade-map.html',
  'EXIM PCFC': 'modules/06/exim-pcfc.html',
  ECGC: 'modules/06/ecgc.html',
  'Forward Contract': 'modules/06/forward-contract.html',
  'AIF Subsidy': 'modules/06/aif-subsidy.html',
  'LC checker': 'modules/06/lc-checker.html',
  'Payment Terms': 'modules/06/payment-terms.html',
  'FILR Calculator': 'modules/06/filr-calculator.html',
  'Post shipment Credit': 'modules/06/post-shipment-credit.html',

  // Module 07
  'Commercial Invoice': 'modules/07/commercial-invoice.html',
  'Packing List': 'modules/07/packing-list.html',
  'Certificate of Origin': 'modules/07/certificate-of-origin.html',
  'Phytosanitary Certificate': 'modules/07/phytosanitary-certificate.html',
  'PHRT Certificate': 'modules/07/phrt-certificate.html',
  'Marine Insurance': 'modules/07/marine-insurance.html',
  'e-Sanchit Upload': 'modules/07/e-sanchit-upload.html',
  'Shipping Bill': 'modules/07/shipping-bill.html',
  'Let Export Order': 'modules/07/let-export-order.html',
  'Bill of Lading': 'modules/07/bill-of-lading.html',
  'Export General Manifest': 'modules/07/export-general-manifest.html',
  RoDTEP: 'modules/07/rodtep.html',
  '7:Duty Drawback': 'modules/07/duty-drawback.html',
  'Duty Drawback': 'modules/07/duty-drawback.html',
  eBRC: 'modules/07/ebrc.html',

  // Module 08
  'Logistics Journey': 'modules/08/logistics-journey.html',

  // Module 09
  KPCT: 'modules/09/kpct.html',
  Vizag: 'modules/09/vizag.html',
  Container: 'modules/09/container.html',
  PortGuide: 'modules/09/port-guide.html',
  'Port Guide': 'modules/09/port-guide.html',
  SBLEO: 'modules/09/sb-leo.html',
  'SB/LEO': 'modules/09/sb-leo.html',
  CHA: 'modules/09/cha.html',
  Freight: 'modules/09/freight.html',
  Vessel: 'modules/09/vessel.html',
  AirCargo: 'modules/09/air-cargo.html',
  'Air Cargo': 'modules/09/air-cargo.html',
  ColdChain: 'modules/09/cold-chain.html',
  '9:ColdChain': 'modules/09/cold-chain.html',
  Demurrage: 'modules/09/demurrage.html',
  SagarSetu: 'modules/09/sagar-setu.html',
  'Sagar Setu': 'modules/09/sagar-setu.html',

  // Module 10
  FIRC: 'modules/10/firc.html',
  NineActions: 'modules/10/nine-actions.html',
  'Nine Actions': 'modules/10/nine-actions.html',
  GOLDUpgrade: 'modules/10/gold-upgrade.html',
  'GOLD Upgrades': 'modules/10/gold-upgrade.html',
  CCS: 'modules/10/ccs.html',
  FILR: 'modules/10/filr.html',
  PACS: 'modules/10/pacs.html',
  EEFC: 'modules/10/eefc.html',
  KrishiCoins: 'modules/10/krishi-coins.html',
  'Krishi Coins': 'modules/10/krishi-coins.html',
  FeedWorld: 'modules/10/feed-world.html',
  'Feed World': 'modules/10/feed-world.html',

  // Module 11
  'RoDTEP Calculator': 'modules/11/rodtep-calculator.html',
  '11:Duty Drawback': 'modules/11/duty-drawback.html',
  'IGST Refund Tracker': 'modules/11/igst-refund-tracker.html',
  'eBRC Tracker': 'modules/11/ebrc-tracker.html',
  'EDPMS Monitor': 'modules/11/edpms-monitor.html',

  // Module 12
  '12:REJECTION': 'modules/12/rejection.html',
  '12:Rejection': 'modules/12/rejection.html',
  REJECTION: 'modules/12/rejection.html',
  Rejection: 'modules/12/rejection.html',
  '12:BUYER DISPUTE': 'modules/12/buyer-dispute.html',
  '12:Buyer Dispute': 'modules/12/buyer-dispute.html',
  'BUYER DISPUTE': 'modules/12/buyer-dispute.html',
  'Buyer Dispute': 'modules/12/buyer-dispute.html',
  '12:QUALITY': 'modules/12/quality.html',
  '12:Quality': 'modules/12/quality.html',
  QUALITY: 'modules/12/quality.html',
  Quality: 'modules/12/quality.html',
  '12:DOCS': 'modules/12/docs.html',
  '12:Docs': 'modules/12/docs.html',
  '12:Documents': 'modules/12/docs.html',
  DOCS: 'modules/12/docs.html',
  Docs: 'modules/12/docs.html',
  Documents: 'modules/12/docs.html',
  '12:CUSTOMS': 'modules/12/customs.html',
  '12:Customs': 'modules/12/customs.html',
  CUSTOMS: 'modules/12/customs.html',
  Customs: 'modules/12/customs.html',
  '12:RASFF': 'modules/12/rasff.html',
  '12:Rasff': 'modules/12/rasff.html',
  RASFF: 'modules/12/rasff.html',
  Rasff: 'modules/12/rasff.html',
  '12:FM': 'modules/12/force-majeure.html',
  '12:Fm': 'modules/12/force-majeure.html',
  FM: 'modules/12/force-majeure.html',
  Fm: 'modules/12/force-majeure.html',
  '12:ARBITRATION': 'modules/12/arbitration.html',
  '12:Arbitration': 'modules/12/arbitration.html',
  ARBITRATION: 'modules/12/arbitration.html',
  Arbitration: 'modules/12/arbitration.html',
  '12:INSURANCE': 'modules/12/insurance.html',
  '12:Insurance': 'modules/12/insurance.html',
  INSURANCE: 'modules/12/insurance.html',
  Insurance: 'modules/12/insurance.html',
}

export const phases = RAW_PHASES.map((phase) => {
  const baseUrl = import.meta.env?.BASE_URL ?? '/'
  const mods = phase.modules.map((m) => {
    const lessons = m.lessons.map((key, i) => {
      const id = `${m.id}.${i + 1}`
      const name = DISPLAY_NAMES[id] ?? key
      const gloss = GLOSSARY[key] ?? null
      const relPath = LESSON_PATHS[`${m.id}:${key}`] ?? LESSON_PATHS[key] ?? null
      const path = relPath ? `${baseUrl}${relPath.replace(/^\//, '')}` : null
      return {
        id,
        name,
        title: gloss ? `${key}: ${gloss}` : FULL_TITLES[id] ?? name,
        path,
        gloss,
        topic: topicKey(key),
        moduleId: m.id,
        moduleTitle: m.title,
        phaseId: phase.id,
        related: [],
      }
    })
    return { ...m, phaseId: phase.id, lessons, lessonIds: lessons.map((l) => l.id) }
  })
  return { ...phase, modules: mods, lessonIds: mods.flatMap((m) => m.lessonIds) }
})

export const modules = phases.flatMap((p) => p.modules)
export const lessons = modules.flatMap((m) => m.lessons)
export const TOTAL_LESSONS = lessons.length

// Cross-link topics shared between modules.
const byTopic = new Map()
for (const l of lessons) {
  if (!byTopic.has(l.topic)) byTopic.set(l.topic, [])
  byTopic.get(l.topic).push(l)
}
for (const l of lessons) {
  l.related = byTopic.get(l.topic).filter((o) => o.moduleId !== l.moduleId)
}

/** Acronyms scrolled in the hero ticker. */
export const TICKER = [
  'IEC',
  'RCMC',
  'FSSAI',
  'LUT',
  'ICEGATE',
  'NABL',
  'MRL',
  'Phytosanitary',
  'FOB',
  'PCFC',
  'ECGC',
  'Letter of Credit',
  'Shipping Bill',
  'Let Export Order',
  'Bill of Lading',
  'INCOTERMS 2020',
  'RoDTEP',
  'Duty Drawback',
  'eBRC',
  'FIRC',
  'EEFC',
  'EDPMS',
]
