import { DEFAULT_ICON, hasIcon, iconTone } from './schemeIcons';

// Each scheme names its card icon in schemesData.js (`icon`, a key of schemeIcons.jsx). A scheme
// added without one gets the icon of the first rule its name matches, then its type, so the more
// specific rules come first.
const FALLBACK = [
  [/insurance|bima|aarogyasri|pmjay/i, 'cropInsurance'],
  [/guarantee/i, 'creditShield'],
  [/fisher|matsya/i, 'fish'],
  [/dairy|milk/i, 'milkCan'],
  [/livestock|animal|gokul|veterinar/i, 'livestock'],
  [/irrigat|per drop|water|borewell|farm pond/i, 'dripIrrigation'],
  [/solar|kusum|surya/i, 'solarPump'],
  [/biogas|\bcbg\b|satat/i, 'biogas'],
  [/mechani|tractor/i, 'tractor'],
  [/drone/i, 'drone'],
  [/organic|natural farming/i, 'organic'],
  [/horticult|fruit/i, 'horticulture'],
  [/cold chain|cold storage/i, 'coldChain'],
  [/export|apeda|exim/i, 'globeExport'],
  [/digital|broadband|computeris|online/i, 'digitalFarm'],
  [/certif|licen[cs]e|quality|standard/i, 'qualityBadge'],
  [/\bfpo\b|farmer producer/i, 'farmerGroup'],
  [/startup|start-up|innovation/i, 'startupRocket'],
  [/train|skill|kaushal|apprentice|education/i, 'skillTraining'],
  [/women|mahila|didi|\bshg\b/i, 'womenSHG'],
  [/loan|credit|\bkcc\b|mudra|bank|financ/i, 'moneyBag'],
  [/food|process|agro/i, 'agroFactory'],
  [/market|trade|\bgem\b|\bondc\b/i, 'govMarketplace'],
  [/awaas|housing|\bpmay\b/i, 'ruralHouse'],
  [/property|svamitva|land/i, 'propertyCard'],
  [/\bdbt\b|kisan|income|bharosa/i, 'dbtTransfer'],
];

/** The card artwork for a scheme: { icon, tone }, tone being the card colour that suits the icon. */
export function schemeTheme(scheme) {
  let { icon } = scheme;
  if (!hasIcon(icon)) {
    const rule = FALLBACK.find(([match]) => match.test(scheme.name)) || FALLBACK.find(([match]) => match.test(scheme.type));
    icon = rule ? rule[1] : DEFAULT_ICON;
  }
  return { icon, tone: iconTone(icon) };
}
