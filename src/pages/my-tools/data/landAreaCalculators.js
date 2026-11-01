// The cards on the Land & Area Calculators page, in the order they appear (left to right). Each
// card has the same fields as on the Financial Calculators page (see financialCalculators.js);
// `icon` names an illustration in components/LandAreaIcons.jsx.
//
// To add a card, add another entry: cards fill rows of three from the left, all the same size.
export const LAND_AREA_CALCULATORS = [
  {
    id: 'land-area-converter',
    lines: ['Land Area Unit', 'Converter'],
    description: 'Convert between acres, cents, square feet, square yards and local land units.',
    icon: 'land-area-converter',
    accent: '#145c3e',
    tint: '#f2fbf7',
    href: 'https://www.magicbricks.com/area-converter-pppfa',
    // also listed in the sheet: https://jameencalculator.in/
  },
  {
    id: 'land-value-estimator',
    lines: ['Land Value', 'Estimator'],
    description: 'Estimate land value using survey details and prevailing market rates.',
    icon: 'land-value-estimator',
    accent: '#247ec8',
    tint: '#eaf6fd',
    href: 'https://web.landeed.com/andhra-pradesh/market-value',
  },
]
