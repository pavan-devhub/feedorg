import heroImg from '../assets/weather/wx-hero.webp'
import { WEATHER_TOOLS } from '../data/weatherTools.js'
import { WEATHER_ICONS } from '../components/WeatherIcons.jsx'
import CalculatorHubPage from './CalculatorHubPage.jsx'

// a rain cloud
function RainCloudGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 15.5a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.6 1.4 3.4 3.4 0 0 1-.2 6.6z" fill="currentColor" />
      <path d="M8.5 18.2l-.8 2M12.2 18.2l-.8 2M15.9 18.2l-.8 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export default function WeatherToolsPage() {
  return (
    <CalculatorHubPage
      path="/farmer/weather-tools"
      documentTitle="Weather-based Tools · My Tools"
      back={{ to: '/farmer', label: 'Back to Farmer' }}
      tagIcon={<RainCloudGlyph />}
      tagWords={['Monitor', 'Plan', 'Protect']}
      title={['Weather-based', 'Tools']}
      subtitle="Track weather patterns, rainfall and climate data to plan better and protect your crops."
      subtitleWidth={410}
      image={heroImg}
      imageAlt="A weather station with a wind gauge and solar panel in a field of young crops, under rain clouds and a rising sun"
      haze="strong"
      wave
      cards={WEATHER_TOOLS}
      icons={WEATHER_ICONS}
      // the same panel and card sizes as the Financial Calculators page (see LandAreaCalculatorsPage)
      centerLastRow={false}
      artHeight={186}
      listLabel="Weather-based tools"
    />
  )
}
