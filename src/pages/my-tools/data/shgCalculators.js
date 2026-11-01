// The cards on the SHG Calculators page, in the order they appear (left to right, then the next
// row).
//
// Each card:
//   id          - unique key
//   lines       - the title, one entry per line; a long line can be { text: '...', small: true }
//                 to set it a little smaller so it stays on one line
//   description - the short text under the title
//   icon        - which illustration to show (see SHG_ICONS in components/ShgIcons.jsx)
//   color       - colour of the title and the "View Details" link
//   soft        - the card's background tint
//   band        - the deeper tint of the band behind the picture
//   href        - (optional) the website "View Details" opens, in a new tab
//
// To add a card, add another entry: cards fill rows of five, all the same size.
export const SHG_CALCULATORS = [
  {
    id: 'shg-loan',
    lines: ['SHG Loan Calculator'],
    description: 'Equal Principal Method repayment schedule — SHG Mode, VO Mode, CLF Mode.',
    icon: 'shg-loan',
    color: '#0b4d86',
    soft: '#e2f1fa',
    band: '#d3eef5',
    href: 'https://shgloancalculator.com/',
  },
  {
    id: 'compound-interest',
    lines: ['Compound Interest', 'Calculator'],
    description: 'Savings corpus growth (can be used for SHG group savings).',
    icon: 'compound-interest',
    color: '#d7140f',
    soft: '#fef1ea',
    band: '#ffece3',
    href: 'https://groww.in/calculators/compound-interest-calculator',
  },
  {
    id: 'recurring-deposit',
    lines: ['RD (Recurring Deposit)', 'Calculator'],
    description: 'Monthly SHG savings deposit growth.',
    icon: 'recurring-deposit',
    color: '#0b5b3f',
    soft: '#ebf8ee',
    band: '#e4f5e7',
    href: 'https://stablemoney.in/calculators/bank-of-baroda-recurring-deposit-calculator',
  },
  {
    id: 'loan-emi',
    lines: ['Personal/Group', 'Loan EMI Calculator'],
    description: 'Bank linkage loan EMI.',
    icon: 'loan-emi',
    color: '#3d0fb0',
    soft: '#f0edfe',
    band: '#ebe8fd',
    href: 'https://www.unionbankofindia.bank.in/en/calculator/personal-loan-emi-calculator',
  },
  {
    id: 'ujjivan-group-loan',
    lines: ['Ujjivan Small Finance', { text: 'Bank Group Loan Calculator', small: true }],
    description: 'The bank’s official calculator for women taking group loans.',
    icon: 'bank-group-loan',
    color: '#b0600f',
    soft: '#fef5e6',
    band: '#fff0da',
    href: 'https://www.ujjivansfb.bank.in/financial-calculators/group-loan-emi-calculator',
  },
]
