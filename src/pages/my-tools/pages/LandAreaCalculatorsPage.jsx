import heroImg from '../assets/land-area/la-hero.webp'
import { LAND_AREA_CALCULATORS } from '../data/landAreaCalculators.js'
import { LAND_AREA_ICONS } from '../components/LandAreaIcons.jsx'
import CalculatorHubPage from './CalculatorHubPage.jsx'

// a folded map with a pin on it
function MapGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 9.5l5.5-2 7 2.5 5.5-2v11.5l-5.5 2-7-2.5-5.5 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 7.5v11.5M15.5 10v11.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 1.8a3.6 3.6 0 0 0-3.6 3.6c0 2.6 3.6 6 3.6 6s3.6-3.4 3.6-6A3.6 3.6 0 0 0 12 1.8z" fill="currentColor" />
      <circle cx="12" cy="5.4" r="1.4" fill="#10543a" />
    </svg>
  )
}

export default function LandAreaCalculatorsPage() {
  return (
    <CalculatorHubPage
      path="/farmer/land-area-calculators"
      documentTitle="Land & Area Calculators · My Tools"
      back={{ to: '/farmer', label: 'Back to Farmer' }}
      tagIcon={<MapGlyph />}
      tagWords={['Measure', 'Convert', 'Estimate']}
      title={['Land & Area', 'Calculators']}
      subtitle="Understand your land measurements and estimate land value with simple, practical tools."
      subtitleWidth={400}
      image={heroImg}
      imageAlt="A survey map of farm plots, a tape measure and a potted plant on a table, with green fields and hills beyond"
      haze="strong"
      cards={LAND_AREA_CALCULATORS}
      icons={LAND_AREA_ICONS}
      // the same panel and card sizes as the Financial Calculators page: cards fill rows of three
      // from the left, and the picture row (186 design px) makes each card 419.5 tall as there
      centerLastRow={false}
      artHeight={186}
      listLabel="Land and area calculators"
    />
  )
}
