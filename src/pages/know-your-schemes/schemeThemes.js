import {
  BadgeCheck, Cpu, Droplets, Factory, Fish, GraduationCap, HandCoins, House, Landmark, Milk,
  Rocket, ShieldCheck, Ship, Sprout, Store, Sun, Tractor, Truck, Users,
} from 'lucide-react';

// The registry has no artwork per scheme, so each card takes the photo, icon and colour of the
// theme it belongs to. A scheme's name is matched first and its type ("Loan/Subsidy", ...) only
// when no theme matches the name; the first matching theme wins, so the more specific themes come first.
const THEMES = [
  { match: /insurance|bima|credit guarantee|guarantee for|aarogyasri|pmjay/i, Icon: ShieldCheck, tone: 'blue', image: 'journey/02_assess.avif' },
  { match: /fisher|matsya/i, Icon: Fish, tone: 'blue', image: 'tool_farmer_portrait.avif' },
  { match: /dairy|livestock|animal|gokul|veterinar|\bnddb\b/i, Icon: Milk, tone: 'purple', image: 'tool_farmer_portrait.avif' },
  { match: /irrigat|per drop|\bjal\b|water|borewell|farm pond|swachh/i, Icon: Droplets, tone: 'orange', image: 'journey/03_grow.avif' },
  { match: /solar|kusum|surya|biogas|\bcbg\b|satat|\bpower\b|\brdss\b|carbon|green credit/i, Icon: Sun, tone: 'amber', image: 'safe-mission/agri_bg.avif' },
  { match: /mechani|drone|tractor|equipment/i, Icon: Tractor, tone: 'blue', image: 'benefits/asset_leasing.avif' },
  { match: /organic|natural farming|soil|horticult|medicinal|\bnmpb\b|ayurved|sericult|silk|nano urea|good agricultural/i, Icon: Sprout, tone: 'green', image: 'benefits/farming_production.avif' },
  { match: /udan|air freight|kisan rail|cold chain|cold supply|sagarmala|port-led/i, Icon: Truck, tone: 'orange', image: 'benefits/warehouse_finance.avif' },
  { match: /export|apeda|rodtep|\bepcg\b|\bmai\b|\bties\b|exim/i, Icon: Ship, tone: 'blue', image: 'benefits/market_export.avif' },
  { match: /digital|agristack|broadband|fibre|computeris|\bcsc\b|indiaai|survey|sachivalayam|\brbk\b|evidya/i, Icon: Cpu, tone: 'blue', image: 'benefits/technology_traceability.avif' },
  { match: /certif|fssai|\bbis\b|\bisi\b|metrology|quality|\bzed\b|compliance|\bgi\b|single window/i, Icon: BadgeCheck, tone: 'teal', image: 'statutory_registrations.avif' },
  { match: /\bfpo\b|farmer producer/i, Icon: Users, tone: 'pink', image: 'tool_fpo_farmers.avif' },
  { match: /startup|start-up|seed fund|fund of funds|equity|innovation/i, Icon: Rocket, tone: 'pink', image: 'epm/epm-msme.avif' },
  { match: /train|skill|kaushal|apprentice|education|\bsamarth\b|vishwakarma/i, Icon: GraduationCap, tone: 'purple', image: 'benefits/training_governance.avif' },
  { match: /loan|credit|\bkcc\b|mudra|\bbanks?\b|financ|fund|nabard|\bncdc\b|sidbi|svanidhi/i, Icon: Landmark, tone: 'blue', image: 'benefits/finance_credit.avif' },
  { match: /food|process|agro|operation greens|\bpli\b|cluster|industr|msme|\bodop\b|powerloom/i, Icon: Factory, tone: 'orange', image: 'benefits/value_addition.avif' },
  { match: /market|\bgem\b|\bondc\b|trade|nafed|trifed|\bgcc\b|\bnsic\b|offtake|investment/i, Icon: Store, tone: 'green', image: 'journey/05_go_to_market.avif' },
  { match: /awaas|housing|\bpmay\b|property|svamitva|land/i, Icon: House, tone: 'orange', image: 'journey/01_join.avif' },
  { match: /women|mahila|didi|shakti|\bshg\b|\bstree\b|matru|cooperative|sahakar|\bpacs\b|tribal|van dhan/i, Icon: Users, tone: 'pink', image: 'tool_fpo_farmers.avif' },
  { match: /\bdbt\b|kisan|income|employment|nregs|bharosa|sukhibhava|jan dhan|poshan/i, Icon: HandCoins, tone: 'green', image: 'know-your-schemes/dbt-farmer.avif' },
];

const DEFAULT_THEME = { Icon: Sprout, tone: 'green', image: 'journey/04_add_value.avif' };

export function schemeTheme(scheme) {
  const theme = THEMES.find((t) => t.match.test(scheme.name))
    || THEMES.find((t) => t.match.test(scheme.type))
    || DEFAULT_THEME;
  return { ...theme, image: `/images/${theme.image}` };
}
