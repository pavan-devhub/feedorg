// The cards on the Crop & Yield Calculators page, in the order they appear (left to right, then
// the next row). Each card has the same fields as on the Financial Calculators page (see
// financialCalculators.js); `icon` names an illustration in components/CropYieldIcons.jsx.
//
// To add a card, add another entry: cards fill rows of three, all the same size, and a shorter
// last row is centred.
export const CROP_YIELD_CALCULATORS = [
  {
    id: 'fertilizer-dosage',
    lines: ['Fertilizer Dosage', 'Calculator'],
    description: 'Calculate the right fertilizer dosage for better crop growth.',
    icon: 'fertilizer-dosage',
    accent: '#0d6a35',
    tint: '#e7fbec',
    href: 'https://mahadhan.co.in/npk-fertilizer-dose-calculator/',
  },
  {
    id: 'seed-rate',
    lines: ['Seed Rate', 'Calculator'],
    description: 'Find the optimal seed rate for your crops.',
    icon: 'seed-rate',
    accent: '#0f6dca',
    tint: '#e0f4fe',
    href: 'https://www.desikheti.com/pages/seed-rate-calculator-online',
    // also listed in the sheet: https://www.agrifarming.in/seed-rate-calculator, https://www.calcutools.in/seed-rate-calculator.html
  },
  {
    id: 'yield-estimation',
    lines: ['Yield Estimation', 'Calculator'],
    description: 'Estimate your expected yield with accurate data.',
    icon: 'yield-estimation',
    accent: '#bb6a02',
    tint: '#fef6e4',
    href: 'https://www.calcutools.in/crop-yield-calculator.html',
    // also listed in the sheet: https://calculatorhub.co.in/crop-yield-calculator/, https://agriculturecalculators.com/crop-yield-calculator/
  },
  {
    id: 'water-requirement',
    lines: ['Water Requirement', 'Calculator'],
    description: 'Calculate the right amount of water for your crops.',
    icon: 'water-requirement',
    accent: '#0290a6',
    tint: '#e0fafa',
    href: 'https://www.calcutools.in/irrigation-water-calculator.html',
    // also listed in the sheet: https://kisanpe.com/irrigation-calculator/, https://watertankcalculator.com/calculators/agriculture/crop-water-need-calculator
  },
]
