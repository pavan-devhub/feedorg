// The cards on the Weather-based Tools page, in the order they appear (left to right). Each card
// has the same fields as on the Financial Calculators page (see financialCalculators.js); `icon`
// names an illustration in components/WeatherIcons.jsx.
//
// To add a card, add another entry: cards fill rows of three from the left, all the same size.
export const WEATHER_TOOLS = [
  {
    id: 'rainfall-deficit',
    lines: ['Rainfall Deficit', 'Tracker'],
    description: 'Compare normal rainfall with actual rainfall.',
    icon: 'rainfall-deficit',
    accent: '#287cc4',
    tint: '#e7f6fe',
    href: 'https://indiadroughtmonitor.in/data.html',
  },
]
