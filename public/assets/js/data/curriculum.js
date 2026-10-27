/**
 * My Exports curriculum: the single source of truth for learning order.
 *
 * Topic pages read this to build the program sidebar, the "topic X of Y"
 * indicators and progress. Each topic's static Previous / Next links follow
 * this order too. Paths are relative to the site root. Keep this list in the
 * same order as the program tree on index.html.
 */
(function (global) {
  'use strict';

  var phases = [
    { id: 1, title: 'Export Foundations', accent: '#d48806', soft: '#fff7e6' },
    { id: 2, title: 'Market Readiness', accent: '#0f9b7a', soft: '#e8f8f3' },
    { id: 3, title: 'Documents & Delivery', accent: '#2563eb', soft: '#eaf1fe' },
    { id: 4, title: 'Payments & Protection', accent: '#7c3aed', soft: '#f3edfe' }
  ];

  function t(id, title, path, fullTitle, titleTe) {
    return { id: id, title: title, path: path, fullTitle: fullTitle || title, titleTe: titleTe || '' };
  }

  var modules = [
    { num: '00', title: 'My Exports Overview', phase: 1, topics: [
      t('0.1', 'My Exports Categories', 'modules/00/my-exports-categories.html', 'My Exports Categories', 'విభాగాల అవలోకనం')
    ] },
    { num: '01', title: 'Why Exports?', phase: 1, topics: [
      t('1.1', 'Income Gap', 'modules/01/income-gap.html', 'Income Gap', 'ఆదాయ అంతరం'),
      t('1.2', 'Export Journey', 'modules/01/export-journey.html', 'Export Journey', 'ఎగుమతి యాత్ర')
    ] },
    { num: '02', title: 'How to Start Exports?', phase: 1, topics: [
      t('2.1', 'KYJ 8 Stages', 'modules/02/kyj-8-stages.html', 'KYJ 8 Stages', 'KYJ 8 దశల యాత్ర'),
      t('2.2', 'Where Am I?', 'modules/02/where-am-i.html', 'Where Am I?', 'మీ ప్రస్తుత స్థితి')
    ] },
    { num: '03', title: 'Registration & Licences', phase: 1, topics: [
      t('3.1', 'IEC', 'modules/03/iec.html', 'IEC Registration', 'ఇంపోర్ట్ ఎక్స్‌పోర్ట్ కోడ్'),
      t('3.2', 'RCMC', 'modules/03/rcmc.html', 'RCMC Certificate', 'రిజిస్ట్రేషన్ కమ్ మెంబర్‌షిప్'),
      t('3.3', 'FSSAI', 'modules/03/fssai.html', 'FSSAI Central Licence', 'ఫుడ్ సేఫ్టీ లైసెన్స్'),
      t('3.4', 'LUT', 'modules/03/lut.html', 'LUT Undertaking', 'లెటర్ ఆఫ్ అండర్‌టేకింగ్'),
      t('3.5', 'AD Code', 'modules/03/ad-code.html', 'AD Code Registration', 'ఆథరైజ్డ్ డీలర్ కోడ్'),
      t('3.6', 'CRES', 'modules/03/cres.html', 'CRES (Spices Board)', 'స్పైసెస్ బోర్డ్ సర్టిఫికేట్'),
      t('3.7', 'ICEGATE', 'modules/03/icegate.html', 'ICEGATE Registration', 'ఐస్‌గేట్ పోర్టల్'),
      t('3.8', 'DSC', 'modules/03/dsc.html', 'DSC Class 3', 'డిజిటల్ సిగ్నేచర్ సర్టిఫికేట్'),
      t('3.9', 'Sagar Setu', 'modules/03/sagar-setu.html', 'Sagar Setu NLP-M', 'సాగర్ సేతు పోర్టల్')
    ] },
    { num: '04', title: 'Production & Quality', phase: 2, topics: [
      t('4.1', 'ERS', 'modules/04/ers.html', 'ERS Readiness Score', 'ఎగుమతి సన్నద్ధత స్కోర్'),
      t('4.2', 'PHRT', 'modules/04/phrt.html', 'PHRT Certificate', 'PHRT సర్టిఫికేట్'),
      t('4.3', 'NABL', 'modules/04/nabl.html', 'NABL Labs', 'NABL ప్రయోగశాలలు'),
      t('4.4', 'MRL', 'modules/04/mrl.html', 'MRL Compliance', 'MRL సమ్మతి'),
      t('4.5', 'Pesticide', 'modules/04/pesticide.html', 'Pesticide Master Guide', 'పెస్టిసైడ్ మాస్టర్ గైడ్'),
      t('4.6', 'GAP', 'modules/04/gap.html', 'GlobalGAP & BharatGAP', 'GlobalGAP + BharatGAP'),
      t('4.7', 'Cold Chain', 'modules/04/cold-chain.html', 'Reefer Cold Chain', 'రీఫర్ కోల్డ్ చైన్'),
      t('4.8', 'Phyto', 'modules/04/phyto.html', 'Phytosanitary Certificate', 'ఫైటోసానిటరీ సర్టిఫికేట్'),
      t('4.9', 'ETO', 'modules/04/eto.html', 'ETO Zero Tolerance', 'ETO శూన్య సహనం'),
      t('4.10', 'GAP Log', 'modules/04/gap-log.html', 'GAP Log & DSMS Zone 2', 'GAP లాగ్ + DSMS Zone 2')
    ] },
    { num: '05', title: 'Buyer Connection', phase: 2, topics: [
      t('5.1', 'FOB', 'modules/05/fob.html', 'FOB Pricing Calculator', 'FOB ధర లెక్కింపు'),
      t('5.2', 'Record', 'modules/05/record.html', 'Buyer Communication Log', 'సంప్రదింపు రికార్డు'),
      t('5.3', 'BSM', 'modules/05/bsm.html', 'BSM Scheduler', 'BSM షెడ్యూలర్'),
      t('5.4', 'Sample', 'modules/05/sample.html', 'Sample Dispatch Tracker', 'నమూనా పంపడం')
    ] },
    { num: '06', title: 'Market Intelligence', phase: 2, topics: [
      t('6.1', 'Cost-Plus Calculator', 'modules/06/cost-plus-calculator.html', 'Cost-Plus Calculator', 'ధర లెక్కింపు'),
      t('6.2', 'Break-even FOB', 'modules/06/break-even-fob.html', 'Break-even FOB', 'నష్టం రాకుండా అమ్మే ధర'),
      t('6.3', 'Volume Discount', 'modules/06/volume-discount.html', 'Volume Discount', 'పరిమాణ తగ్గింపు'),
      t('6.4', 'Trade Map', 'modules/06/trade-map.html', 'Trade Map', 'పోటీ విశ్లేషణ'),
      t('6.5', 'EXIM PCFC', 'modules/06/exim-pcfc.html', 'EXIM PCFC', 'ముందస్తు నిధి'),
      t('6.6', 'ECGC', 'modules/06/ecgc.html', 'ECGC Insurance', 'ఎగుమతి బీమా'),
      t('6.7', 'Forward Contract', 'modules/06/forward-contract.html', 'Forward Contract', 'డాలర్ రేటు లాక్'),
      t('6.8', 'AIF Subsidy', 'modules/06/aif-subsidy.html', 'AIF Subsidy', 'AIF 2% నికర సహాయం'),
      t('6.9', 'LC Checker', 'modules/06/lc-checker.html', 'LC Checker', 'కొనుగోలు పత్రం తనిఖీ'),
      t('6.10', 'Payment Terms', 'modules/06/payment-terms.html', 'Payment Terms & INCOTERMS', 'చెల్లింపు నిబంధనలు'),
      t('6.11', 'FILR Calculator', 'modules/06/filr-calculator.html', 'FILR Calculator', 'రైతు ఆదాయ నిష్పత్తి'),
      t('6.12', 'Post-shipment Credit', 'modules/06/post-shipment-credit.html', 'Post-Shipment Credit', 'సరుకు తర్వాత రుణం')
    ] },
    { num: '07', title: 'Export Documentation', phase: 3, topics: [
      t('7.1', 'Commercial Invoice', 'modules/07/commercial-invoice.html', 'Commercial Invoice', 'వాణిజ్య వినియోగ పత్రం'),
      t('7.2', 'Packing List', 'modules/07/packing-list.html', 'Packing List', 'ప్యాకింగ్ జాబితా'),
      t('7.3', 'Certificate of Origin', 'modules/07/certificate-of-origin.html', 'Certificate of Origin', 'మూల దేశ ధృవీకరణ'),
      t('7.4', 'Phytosanitary Certificate', 'modules/07/phytosanitary-certificate.html', 'Phytosanitary Certificate', 'మొక్కల ఆరోగ్య ధృవీకరణ'),
      t('7.5', 'PHRT Certificate', 'modules/07/phrt-certificate.html', 'PHRT Quality Report', 'PHRT నాణ్యత నివేదిక'),
      t('7.6', 'Marine Insurance', 'modules/07/marine-insurance.html', 'Marine Insurance Certificate', 'సముద్ర బీమా పత్రం'),
      t('7.7', 'e-Sanchit Upload', 'modules/07/e-sanchit-upload.html', 'e-Sanchit Document Upload', 'e-Sanchit అప్‌లోడ్'),
      t('7.8', 'Shipping Bill', 'modules/07/shipping-bill.html', 'Shipping Bill', 'షిప్పింగ్ బిల్'),
      t('7.9', 'Let Export Order', 'modules/07/let-export-order.html', 'Let Export Order Tracker', 'LEO ట్రాకర్'),
      t('7.10', 'Bill of Lading', 'modules/07/bill-of-lading.html', 'Bill of Lading', 'బిల్ ఆఫ్ లేడింగ్'),
      t('7.11', 'Export General Manifest', 'modules/07/export-general-manifest.html', 'Export General Manifest', 'EGM ధృవీకరణ'),
      t('7.12', 'RoDTEP', 'modules/07/rodtep.html', 'RoDTEP Calculation', 'RoDTEP లెక్క'),
      t('7.13', 'Duty Drawback', 'modules/07/duty-drawback.html', 'Duty Drawback'),
      t('7.14', 'eBRC', 'modules/07/ebrc.html', 'eBRC Automation', 'eBRC స్వయంచాలక')
    ] },
    { num: '08', title: 'Logistics', phase: 3, topics: [
      t('8.1', 'Logistics Journey', 'modules/08/logistics-journey.html', 'Logistics Journey', 'లాజిస్టిక్స్ పరిచయం')
    ] },
    { num: '09', title: 'Transport & Shipping', phase: 3, topics: [
      t('9.1', 'KPCT', 'modules/09/kpct.html', 'Sea Route — KPCT', 'సముద్ర మార్గం — KPCT'),
      t('9.2', 'Vizag Port', 'modules/09/vizag.html', 'Sea Route — Visakhapatnam', 'సముద్ర మార్గం — విశాఖపట్నం'),
      t('9.3', 'Container', 'modules/09/container.html', 'Reefer Container Tracker', 'కంటైనర్ ట్రాకర్ — రీఫర్ 13°C'),
      t('9.4', 'Port Guide', 'modules/09/port-guide.html', 'Port Guide — KPCT & Vizag', 'KPCT + విజాగ్ పోర్ట్ గైడ్'),
      t('9.5', 'Shipping Bill & LEO', 'modules/09/sb-leo.html', 'Port Gate to Destination', 'పోర్ట్ గేట్ నుంచి గమ్యస్థానం వరకు'),
      t('9.6', 'CHA', 'modules/09/cha.html', 'CHA & Freight Forwarder', 'ఎంపిక & సమన్వయం'),
      t('9.7', 'Freight', 'modules/09/freight.html', 'Freight Cost Calculator', 'రవాణా ఖర్చుల లెక్క'),
      t('9.8', 'Vessel', 'modules/09/vessel.html', 'Vessel Schedule & Sailing Calendar', 'వెసెల్ షెడ్యూల్'),
      t('9.9', 'Air Cargo', 'modules/09/air-cargo.html', 'Air Cargo', 'విమాన కార్గో — ఎప్పుడు వాడాలి?'),
      t('9.10', 'Cold Chain', 'modules/09/cold-chain.html', 'Cold Chain Break Protocol', 'ఉష్ణోగ్రత విఫలత నిర్వహణ'),
      t('9.11', 'Demurrage', 'modules/09/demurrage.html', 'Demurrage Management', 'Demurrage నిర్వహణ & నివారణ'),
      t('9.12', 'Sagar Setu', 'modules/09/sagar-setu.html', 'Sagar Setu & ONOP', 'పోర్ట్ సింగిల్ విండో')
    ] },
    { num: '10', title: 'Payments & FIRC', phase: 4, topics: [
      t('10.1', 'FIRC', 'modules/10/firc.html', 'FIRC Receipt Tracker', 'FIRC స్వీకృతి ట్రాకర్'),
      t('10.2', 'Nine Actions', 'modules/10/nine-actions.html', 'Nine Actions after FIRC', 'FIRC తర్వాత 9 స్వయంచాలక చర్యలు'),
      t('10.3', 'GOLD Upgrade', 'modules/10/gold-upgrade.html', 'FEED CARD GOLD Upgrade', 'GOLD CARD ఎలా వస్తుంది?'),
      t('10.4', 'CCS', 'modules/10/ccs.html', 'CCS Credit Score', 'CCS స్కోర్ అంటే ఏమిటి?'),
      t('10.5', 'FILR', 'modules/10/filr.html', 'FILR Income Ratio', 'FILR అంటే ఏమిటి?'),
      t('10.6', 'PACS', 'modules/10/pacs.html', 'PACS 93% Distribution Tracker', '93% PACS పంపిణీ ట్రాకర్'),
      t('10.7', 'EEFC', 'modules/10/eefc.html', 'EEFC Account', 'EEFC ఖాతా — విదేశీ మారకం వ్యూహం'),
      t('10.8', 'Krishi Coins', 'modules/10/krishi-coins.html', 'Krishi Coins Reward', 'కృషి కాయిన్స్ +1,500 — Stage 7 బహుమతి'),
      t('10.9', 'FEED World', 'modules/10/feed-world.html', 'FEED World Success Story', 'FEED WORLD — FW-012 విజయ కథ')
    ] },
    { num: '11', title: 'Government Schemes', phase: 4, topics: [
      t('11.1', 'RoDTEP Calculator', 'modules/11/rodtep-calculator.html', 'RoDTEP Calculator', 'RoDTEP కాల్కులేటర్'),
      t('11.2', 'Duty Drawback', 'modules/11/duty-drawback.html', 'Duty Drawback'),
      t('11.3', 'IGST Refund Tracker', 'modules/11/igst-refund-tracker.html', 'IGST Refund Tracker', 'IGST రీఫండ్ ట్రాకర్'),
      t('11.4', 'eBRC Tracker', 'modules/11/ebrc-tracker.html', 'eBRC Tracker', 'eBRC ట్రాకర్'),
      t('11.5', 'EDPMS Monitor', 'modules/11/edpms-monitor.html', 'EDPMS Monitor', 'EDPMS మానిటర్')
    ] },
    { num: '12', title: 'Risk Management', phase: 4, topics: [
      t('12.1', 'Rejection', 'modules/12/rejection.html', 'Destination Rejection Protocol', 'గమ్యస్థాన తిరస్కరణ Protocol'),
      t('12.2', 'Buyer Dispute', 'modules/12/buyer-dispute.html', 'Buyer Dispute Tracker', 'Buyer వివాద ట్రాకర్'),
      t('12.3', 'Quality', 'modules/12/quality.html', 'Quality Rejection Response', 'నాణ్యత తిరస్కరణ Response'),
      t('12.4', 'Documents', 'modules/12/docs.html', 'Document Error Correction', 'పత్రాల తప్పు సరిదిద్దడం'),
      t('12.5', 'Customs', 'modules/12/customs.html', 'Customs Hold Resolution', 'సరుకు ఎందుకు ఆగింది? ఏం చేయాలి?'),
      t('12.6', 'RASFF', 'modules/12/rasff.html', 'RASFF Alert Response Protocol'),
      t('12.7', 'Force Majeure', 'modules/12/force-majeure.html', 'Force Majeure Protocol'),
      t('12.8', 'Arbitration', 'modules/12/arbitration.html', 'International Arbitration Guide', 'అంతర్జాతీయ మధ్యవర్తిత్వం గైడ్'),
      t('12.9', 'Insurance', 'modules/12/insurance.html', 'Insurance Claim Process')
    ] }
  ];

  // Flattened, ordered list used for Previous / Next resolution.
  var topics = [];
  modules.forEach(function (mod) {
    mod.topics.forEach(function (topic, index) {
      topic.module = mod;
      topic.indexInModule = index;
      topic.order = topics.length;
      topics.push(topic);
    });
  });

  function findByPath(path) {
    var clean = String(path || '').replace(/\\/g, '/').replace(/[?#].*$/, '');
    for (var i = 0; i < topics.length; i++) {
      if (clean === topics[i].path || clean.slice(-topics[i].path.length - 1) === '/' + topics[i].path) {
        return topics[i];
      }
    }
    return null;
  }

  global.MyExportsCurriculum = {
    phases: phases,
    modules: modules,
    topics: topics,
    storageKey: 'export-program:progress',
    findByPath: findByPath,
    phaseOf: function (mod) { return phases[mod.phase - 1]; },
    previous: function (topic) { return topic && topics[topic.order - 1] || null; },
    next: function (topic) { return topic && topics[topic.order + 1] || null; }
  };
})(window);
