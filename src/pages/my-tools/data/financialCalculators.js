// The cards on the Financial Calculators page, in the order they appear (left to right, then the
// next row).
//
// Each card:
//   id          - unique key
//   lines       - the title, one entry per line
//   description - the short text under the title
//   icon        - which illustration to show (see FINANCIAL_CALCULATOR_ICONS in
//                 components/FinancialCalculatorIcons.jsx); or give `image` (an imported picture)
//                 and `imageAlt` instead
//   accent      - colour of the "View Details" button
//   tint        - background colour of the card
//   href        - (optional) the website "View Details" opens, in a new tab,
//                 e.g. href: 'https://example.gov.in/calculator'
//   to          - (optional) or a page of this site to open instead
//
// To add a card, add another entry: cards fill rows of three, all the same size, and a shorter
// last row is centred, so the layout rearranges by itself.
export const FINANCIAL_CALCULATORS = [
  {
    id: 'crop-loan-emi',
    lines: ['Crop Loan EMI', 'Calculator'],
    description: 'Calculate your crop loan EMI and plan your repayment better.',
    icon: 'crop-loan-emi',
    accent: '#175b3e',
    tint: '#f1faf5',
    href: 'https://technicalkisan.com/tools/loan-emi-calculator',
  },
  {
    id: 'kcc-subvention',
    lines: ['KCC Interest', 'Subvention Calculator'],
    description: 'Know your interest subvention benefits under KCC and reduce your loan cost.',
    icon: 'kcc-subvention',
    accent: '#2a7ec3',
    tint: '#ecf7fe',
    href: 'https://www.icici.bank.in/calculators/kisan-credit-card-calculator',
  },
  {
    id: 'crop-profit',
    lines: ['Crop Income/Profit', 'Calculator'],
    description: 'Estimate your crop income and profit with simple calculations.',
    icon: 'crop-profit',
    accent: '#7a60a8',
    tint: '#f2f0fd',
    href: 'https://technicalkisan.com/tools/crop-profit-calculator',
    // also listed in the sheet: https://kisanpe.com/crop-income-calculator/
  },
  {
    id: 'farm-loan',
    lines: ['Farm Loan', 'Calculator'],
    description: 'Plan your farm loan amount, tenure and EMI with ease.',
    icon: 'farm-loan',
    accent: '#c06811',
    tint: '#fdf7ea',
    href: 'https://www.farmersadvisory.com/calculator-crop-cost',
  },
  {
    id: 'break-even-yield',
    lines: ['Break-even Yield', 'Calculator'],
    description: 'Find your break-even yield and plan for better profits.',
    icon: 'break-even-yield',
    accent: '#1990a2',
    tint: '#eaf7f7',
    href: 'https://www.myfarmcalc.com/break-even.html',
  },
]
