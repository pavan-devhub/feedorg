// The cards on the MSME Calculators page, in the order they appear (left to right, then the next
// row).
//
// Each card:
//   id          - unique key
//   lines       - the title (joined into one line that wraps to fit the card)
//   description - the short text under the title
//   icon        - which illustration to show (see MSME_ICONS in components/MsmeIcons.jsx)
//   accent      - colour of the title and the "View Details" link
//   soft        - the card's background tint
//   strong      - the deeper tint of the band behind the picture
//   href        - (optional) the website "View Details" opens, in a new tab
//
// To add a card, add another entry: cards fill rows of four, all the same size, and a shorter
// last row is centred.
export const MSME_CALCULATORS = [
  {
    id: 'scheme-eligibility',
    lines: ['MSME Scheme', 'Eligibility Calculator'],
    description: 'Mudra, PMEGP, CGTMSE, Udyam, PM Vishwakarma — 5 schemes one-click eligibility check.',
    icon: 'scheme-eligibility',
    accent: '#0e4a26',
    soft: '#e6f6ea',
    strong: '#d2efd9',
    href: 'https://msmegyan.in/calculator/',
  },
  {
    id: 'pmegp-loan',
    lines: ['PMEGP Loan', 'Calculator'],
    description: 'Calculate loan amount, EMI and check eligibility for PMEGP scheme.',
    icon: 'pmegp-loan',
    accent: '#c24a12',
    soft: '#feeedb',
    strong: '#fde3c2',
    href: 'https://centralportal.in/pmegp-loan-emi-calculator-with-subsidy/',
  },
  {
    id: 'mudra-loan-emi',
    lines: ['Mudra Loan EMI', 'Calculator'],
    description: 'Calculate EMI for Shishu, Kishore and Tarun Mudra loans (Bank of Baroda).',
    icon: 'mudra-loan',
    accent: '#8a5208',
    soft: '#fdf0cf',
    strong: '#fbe2a4',
    href: 'https://bankofbaroda.bank.in/calculators/mudra-loan-emi-calculator',
  },
  {
    id: 'business-loan-emi',
    lines: ['MSME/SME', 'Business Loan EMI', 'Calculator'],
    description: 'Calculate EMI, compare multiple lenders and find the best business loan option (Bajaj Markets).',
    icon: 'business-loan-emi',
    accent: '#0d1f7a',
    soft: '#e6eefc',
    strong: '#d6e3fb',
    href: 'https://www.bajajfinservmarkets.in/calculators/sme-msme-loan-emi-calculator',
  },
  {
    id: 'gst',
    lines: ['GST Calculator', '(CGST/SGST/IGST)'],
    description: 'Calculate GST amount with inclusive or exclusive pricing.',
    icon: 'gst',
    accent: '#2c0f7a',
    soft: '#efe9fd',
    strong: '#ddd1fd',
    href: 'https://www.tatacapital.com/business-loan/gst-calculator.html',
  },
  {
    id: 'udyam-registration',
    lines: ['Udyam Registration'],
    description: 'Free and official registration for MSMEs (Udyam).',
    icon: 'udyam',
    accent: '#0a4245',
    soft: '#e2f6ef',
    strong: '#c9ede2',
    href: 'https://udyamregistration.gov.in/',
  },
]
