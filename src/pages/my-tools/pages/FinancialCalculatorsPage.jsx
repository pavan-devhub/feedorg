import heroImg from '../assets/financial/fc-hero.webp'
import { FINANCIAL_CALCULATORS } from '../data/financialCalculators.js'
import { FINANCIAL_CALCULATOR_ICONS } from '../components/FinancialCalculatorIcons.jsx'
import CalculatorHubPage from './CalculatorHubPage.jsx'

function CalculatorGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="2.5" width="14" height="19" rx="2.6" stroke="currentColor" strokeWidth="1.9" />
      <rect x="8" y="5.5" width="8" height="3.6" rx="0.8" fill="currentColor" />
      {[11.6, 14.6, 17.6].map((y) =>
        [8.2, 11.2, 14.2].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="1.9" height="1.9" rx="0.4" fill="currentColor" />),
      )}
    </svg>
  )
}

export default function FinancialCalculatorsPage() {
  return (
    <CalculatorHubPage
      path="/farmer/financial-calculators"
      documentTitle="Financial Calculators · My Tools"
      back={{ to: '/farmer', label: 'Back to Farmer' }}
      tagIcon={<CalculatorGlyph />}
      tagWords={['Plan', 'Calculate', 'Grow']}
      title={['Financial', 'Calculators']}
      subtitle="Plan better. Grow bigger. Use our financial calculators to make informed decisions and boost your farm’s profitability."
      image={heroImg}
      imageAlt="A calculator, stacks of coins with a growing plant, a notebook and financial charts on a desk"
      haze="strong"
      wave
      cards={FINANCIAL_CALCULATORS}
      icons={FINANCIAL_CALCULATOR_ICONS}
      listLabel="Financial calculators"
    />
  )
}
