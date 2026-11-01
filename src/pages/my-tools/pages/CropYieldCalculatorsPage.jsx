import heroImg from '../assets/crop-yield/cy-hero.webp'
import { CROP_YIELD_CALCULATORS } from '../data/cropYieldCalculators.js'
import { CROP_YIELD_ICONS } from '../components/CropYieldIcons.jsx'
import CalculatorHubPage from './CalculatorHubPage.jsx'

function LeafGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19.5C4.5 11 10 4.5 19.5 4.5 19.8 13.5 13.5 19.5 5 19.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M5.5 19 14.5 10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  )
}

export default function CropYieldCalculatorsPage() {
  return (
    <CalculatorHubPage
      path="/farmer/crop-yield-calculators"
      documentTitle="Crop & Yield Calculators · My Tools"
      back={{ to: '/farmer', label: 'Back to Farmer' }}
      tagIcon={<LeafGlyph />}
      tagWords={['Plan', 'Calculate', 'Harvest']}
      title={['Crop & Yield', 'Calculators']}
      subtitle="Make smarter farming decisions with practical crop and yield calculators."
      subtitleWidth={360}
      image={heroImg}
      imageAlt="A farmer's hands holding ripe rice in a green field, with a water pipe, a sack of fertiliser, a bowl of seeds and a trowel"
      haze="soft"
      cards={CROP_YIELD_CALCULATORS}
      icons={CROP_YIELD_ICONS}
      listLabel="Crop and yield calculators"
    />
  )
}
