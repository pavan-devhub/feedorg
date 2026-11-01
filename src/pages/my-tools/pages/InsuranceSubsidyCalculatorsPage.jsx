import heroImg from '../assets/insurance-subsidy/is-hero.webp'
import { INSURANCE_SUBSIDY_CALCULATORS } from '../data/insuranceSubsidyCalculators.js'
import { INSURANCE_SUBSIDY_ICONS } from '../components/InsuranceSubsidyIcons.jsx'
import CalculatorHubPage from './CalculatorHubPage.jsx'

// a shield with a tick
function ShieldGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.8 19.5 5.6v5.9c0 4.6-3.1 8.1-7.5 9.9-4.4-1.8-7.5-5.3-7.5-9.9V5.6z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="m8.6 11.9 2.4 2.4 4.6-4.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function InsuranceSubsidyCalculatorsPage() {
  return (
    <CalculatorHubPage
      path="/farmer/insurance-subsidy-calculators"
      documentTitle="Insurance & Subsidy Calculators · My Tools"
      back={{ to: '/farmer', label: 'Back to Farmer' }}
      tagIcon={<ShieldGlyph />}
      tagWords={['Protect', 'Save', 'Grow']}
      title={['Insurance &', 'Subsidy', 'Calculators']}
      subtitle="Explore crop insurance and subsidy tools to understand your benefits and plan with confidence."
      subtitleWidth={370}
      image={heroImg}
      imageAlt="Cupped hands holding a young plant in soil inside a glowing glass shield, above a field of seedlings at sunrise"
      haze="strong"
      wave
      cards={INSURANCE_SUBSIDY_CALCULATORS}
      icons={INSURANCE_SUBSIDY_ICONS}
      // the same panel and card sizes as the Financial Calculators page (see LandAreaCalculatorsPage)
      centerLastRow={false}
      artHeight={186}
      listLabel="Insurance and subsidy calculators"
    />
  )
}
