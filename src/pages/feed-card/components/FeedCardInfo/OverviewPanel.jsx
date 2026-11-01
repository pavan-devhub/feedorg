import { CoinsIcon, GridIcon, PercentIcon, PinIcon } from './InfoIcons.jsx'

const FEATURES = [
  { title: 'Discounts & Offers', text: 'Special discounts across categories', Icon: PercentIcon, tone: 'blue' },
  { title: 'Earn Krishi Coins', text: 'Earn & redeem loyalty coins', Icon: CoinsIcon, tone: 'orange' },
  { title: 'Wide Categories', text: 'Numerous partner brands & services', Icon: GridIcon, tone: 'purple' },
  { title: 'Pan India Access', text: 'Available across cargo services', Icon: PinIcon, tone: 'red' },
]

export default function OverviewPanel() {
  return (
    <>
      <p className="info__eyebrow">Overview</p>
      <h2 className="info__heading">
        What is <span className="info__accent">FEED CARD?</span>
      </h2>
      <p className="overview__lead">
        <strong>FEED CARD</strong> is a reward-based membership card that provides discounts and
        benefits across agriculture, inputs, services, education, healthcare, travel and more
        through Krishi Coins.
      </p>

      <ul className="overview__features">
        {FEATURES.map(({ title, text, Icon, tone }) => (
          <li className="overview__feature" key={title}>
            <span className={`overview__icon fc-tone-${tone}`}>
              <Icon />
            </span>
            <h3 className="overview__title">{title}</h3>
            <p className="overview__text">{text}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
