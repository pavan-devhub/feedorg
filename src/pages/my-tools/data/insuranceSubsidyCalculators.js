// The cards on the Insurance & Subsidy Calculators page, in the order they appear (left to right).
// Each card has the same fields as on the Financial Calculators page (see financialCalculators.js);
// `icon` names an illustration in components/InsuranceSubsidyIcons.jsx.
//
// To add a card, add another entry: cards fill rows of three from the left, all the same size.
export const INSURANCE_SUBSIDY_CALCULATORS = [
  {
    id: 'crop-insurance-premium',
    lines: ['Crop Insurance', 'Premium Calculator'],
    description: 'Estimate your crop insurance premium and explore PMFBY coverage for your crops.',
    icon: 'crop-insurance',
    accent: '#0b5536',
    tint: '#eefbf2',
    href: 'https://pmfby.gov.in/',
    // also listed in the sheet: https://teluguschemes.co.in/tools/pmfby-premium-calculator/
  },
  {
    id: 'subsidy-amount',
    lines: ['Subsidy Amount', 'Calculator'],
    description: 'Estimate the subsidy you may receive under eligible schemes and plan your farm expenses.',
    icon: 'subsidy-amount',
    accent: '#2082cc',
    tint: '#e8f5fe',
    href: 'https://calcwise.finance/pradhan-mantri-fasal-bima-yojana-calculator/',
  },
]
