// The cards on the FPO Calculators page, in the order they appear (left to right, then the next
// row). Cards are numbered by their place in this list.
//
// Each card:
//   id          - unique key
//   lines       - the title, one entry per line; a long line can be { text: '...', small: true }
//                 to set it a little smaller so it stays on one line
//   description - the short text under the title
//   icon        - which illustration to show (see FPO_ICONS in components/FpoIcons.jsx)
//   artSide     - (optional) 'right' puts the picture right of the text; otherwise it is on the left
//   accent      - colour of the "View Details" text and arrow
//   tint        - background colour of the card
//   soft        - background colour of the "View Details" button
//   href        - (optional) the website "View Details" opens, in a new tab
//
// To add a card, add another entry: cards fill rows of three, all the same size.
export const FPO_CALCULATORS = [
  {
    id: 'grading-sorting',
    lines: ['Grading & Sorting', 'Cost Calculator'],
    description: 'actual cost after grading/sorting',
    icon: 'grading-sorting',
    accent: '#2f8a4a',
    tint: '#f6fdf8',
    soft: '#e2f5e3',
    href: 'https://www.farmersadvisory.com/tools',
  },
  {
    id: 'post-harvest-loss',
    lines: ['Post-Harvest', 'Loss Calculator'],
    description: 'quantity lost during storage/handling',
    icon: 'post-harvest-loss',
    accent: '#c8444b',
    tint: '#fef4f3',
    soft: '#fde2e2',
    href: 'https://www.calcutools.in/post-harvest-loss-calculator.html',
  },
  {
    id: 'storage-cost',
    lines: ['Storage Cost', 'Calculator'],
    description: 'warehouse/cold storage cost per kg',
    icon: 'storage-cost',
    accent: '#3a7ed6',
    tint: '#f1fbfe',
    soft: '#d8effc',
    href: 'https://www.farmersadvisory.com/calculator-storage-loss',
  },
  {
    id: 'transportation-cost',
    lines: ['Transportation', 'Cost Calculator'],
    description: 'transport cost based on vehicle + distance + quantity',
    icon: 'transportation-cost',
    accent: '#d0782f',
    tint: '#fffbf3',
    soft: '#fef0d7',
    href: 'https://kisansabha.in/FreightCalculator.aspx',
  },
  {
    id: 'aggregation-market-price',
    lines: ['Aggregation →', { text: 'Market Price Calculator', small: true }],
    description: 'expected revenue through collective sale',
    icon: 'aggregation',
    accent: '#2f8a4a',
    tint: '#f6fdf8',
    soft: '#e2f6e1',
    href: 'https://agmarknet.gov.in/home',
  },
  {
    id: 'fpo-profit',
    lines: ['FPO Profit', 'Calculator'],
    description: 'total business profit',
    icon: 'fpo-profit',
    accent: '#7a4fd6',
    tint: '#f6f4fe',
    soft: '#e7e0fc',
    href: 'https://agrifarming.in/crop-profit-calculator',
  },
  {
    id: 'export-cost',
    lines: ['Export Cost', 'Calculator'],
    description: 'FOB/export-related total cost',
    icon: 'export-cost',
    accent: '#d0782f',
    tint: '#fef9ea',
    soft: '#fde8c4',
    href: 'https://niryatbusiness.com/calculator.php',
    // also listed in the sheet: https://eximigo.com/tools/profit-margin-calculator
  },
  {
    id: 'export-profit-margin',
    lines: ['Export Profit/', 'Margin Calculator'],
    description: 'export selling price vs total landed/FOB cost',
    icon: 'export-profit',
    accent: '#d0454f',
    tint: '#fdeef0',
    soft: '#fbd6da',
    href: 'https://www.icicidirect.com/calculators/margin-calculator',
  },
]
