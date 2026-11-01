import InfoCard from './InfoCard.jsx'
import {
  CapIcon,
  CartIcon,
  CoinsIcon,
  GearIcon,
  PercentIcon,
  PlusIcon,
  SproutIcon,
  TruckIcon,
} from './InfoIcons.jsx'

const BENEFITS = [
  {
    title: 'Discounts & Special Offers',
    text: 'Access applicable discounts, promotional offers or member pricing from participating merchants and service providers.',
    Icon: PercentIcon,
    tone: 'blue',
  },
  {
    title: 'Krishi Coins & Rewards',
    text: 'Participate in the programme’s reward mechanism. Earning, redemption, expiry and eligibility rules should follow official FEED policy.',
    Icon: CoinsIcon,
    tone: 'orange',
  },
  {
    title: 'Agricultural Inputs',
    text: 'Discover participating offers on eligible farm inputs such as seeds, fertilisers, crop-protection products and other approved supplies.',
    Icon: SproutIcon,
    tone: 'green',
  },
  {
    title: 'Equipment & Machinery',
    text: 'Explore partner offers for agricultural equipment, tools, machinery, irrigation products and related services where available.',
    Icon: GearIcon,
    tone: 'purple',
  },
  {
    title: 'Travel & Logistics',
    text: 'Potential access to offers on transport, logistics and travel services from participating providers and according to their terms.',
    Icon: TruckIcon,
    tone: 'red',
  },
  {
    title: 'Healthcare & Insurance',
    text: 'Find eligible partner services or offers related to healthcare and insurance. Coverage, exclusions and eligibility are determined by the provider.',
    Icon: PlusIcon,
    tone: 'blue',
  },
  {
    title: 'Education & Training',
    text: 'Explore eligible training, skill-development, learning or educational service offers offered by participating organisations.',
    Icon: CapIcon,
    tone: 'purple',
  },
  {
    title: 'Groceries & Daily Needs',
    text: 'Use applicable offers on groceries and everyday essentials when the relevant merchant or service is part of the active partner network.',
    Icon: CartIcon,
    tone: 'green',
  },
]

export default function BenefitsPanel() {
  return (
    <>
      <header className="info__header">
        <h2 className="info__heading">
          Benefits of <span className="info__accent">FEED CARD</span>
        </h2>
        <p className="info__subtitle">
          FEED CARD is designed to help eligible members discover offers and potential savings
          across agriculture-related and everyday needs. Actual benefits depend on participating
          partners and approved programme terms.
        </p>
      </header>

      <ul className="info-grid">
        {BENEFITS.map((benefit) => (
          <InfoCard key={benefit.title} {...benefit} />
        ))}
      </ul>
    </>
  )
}
