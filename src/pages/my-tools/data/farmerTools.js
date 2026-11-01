// The tool cards on the farmer page, in the order they appear (left to right, then the next row).
//
// Each card:
//   id          - unique key
//   lines       - the title, one entry per line
//   description - the short text under the title
//   icon        - which illustration to show (see FARMER_TOOL_ICONS in components/FarmerToolIcons.jsx);
//                 or give `image` (an imported picture) and `imageAlt` instead
//   accent      - colour of the number and arrow
//   tint        - soft colour of the card corner, number and arrow circles
//   to          - (optional) the page the card opens
//
// To add a card, add another entry: rows of three fill and wrap by themselves.
export const FARMER_TOOLS = [
  {
    id: 'financial',
    lines: ['Financial', 'Calculator'],
    description: 'Calculate crop costs, profitability and more.',
    icon: 'financial',
    accent: '#16a34a',
    tint: '#daf5dd',
    to: '/farmer/financial-calculators',
  },
  {
    id: 'crop-yield',
    lines: ['Crop & Yield', 'Calculator'],
    description: 'Estimate crop yield and production.',
    icon: 'crop-yield',
    accent: '#f26b1d',
    tint: '#ffe9da',
    to: '/farmer/crop-yield-calculators',
  },
  {
    id: 'land-area',
    lines: ['Land & Area', 'Calculator'],
    description: 'Measure land, area and plot details.',
    icon: 'land-area',
    accent: '#1c7fd6',
    tint: '#dfeefc',
    to: '/farmer/land-area-calculators',
  },
  {
    id: 'insurance-subsidy',
    lines: ['Insurance & Subsidy', 'Calculator'],
    description: 'Check schemes, subsidies and insurance benefits.',
    icon: 'insurance',
    accent: '#9b30e0',
    tint: '#f2e5fd',
    to: '/farmer/insurance-subsidy-calculators',
  },
  {
    id: 'weather',
    lines: ['Weather Based', 'Calculator'],
    description: 'Get weather updates and plan better.',
    icon: 'weather',
    accent: '#e39b0c',
    tint: '#fff0cf',
    to: '/farmer/weather-tools',
  },
]
