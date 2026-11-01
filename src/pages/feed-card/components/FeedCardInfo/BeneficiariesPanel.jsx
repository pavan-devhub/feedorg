import InfoCard from './InfoCard.jsx'
import {
  CheckIcon,
  FarmerIcon,
  GlobeIcon,
  HandshakeIcon,
  PeopleIcon,
  ShopIcon,
  StakeholderCapIcon,
  TractorIcon,
  WheatIcon,
} from './InfoIcons.jsx'

const BENEFICIARIES = [
  {
    title: 'Individual Farmers',
    text: 'Farmers who may benefit from relevant input, equipment, healthcare, training and everyday-service offers available through participating partners.',
    Icon: FarmerIcon,
    tone: 'blue',
  },
  {
    title: 'Farmer Producer Organisations (FPOs)',
    text: 'FPOs and their eligible members who need access to agricultural supplies, services and other partner benefits, subject to membership rules.',
    Icon: WheatIcon,
    tone: 'orange',
  },
  {
    title: 'Cooperative Members',
    text: 'Eligible members of cooperatives and associated organisations who meet FEED CARD’s registration and participation requirements.',
    Icon: HandshakeIcon,
    tone: 'green',
  },
  {
    title: 'Exporters & Traders',
    text: 'Agricultural exporters, traders and supply-chain participants who may use relevant participating services and offers.',
    Icon: GlobeIcon,
    tone: 'purple',
  },
  {
    title: 'Agri Entrepreneurs & Service Providers',
    text: 'Eligible agriculture-focused entrepreneurs and service-sector participants who support farm production, handling, equipment or related activities.',
    Icon: TractorIcon,
    tone: 'red',
  },
  {
    title: 'Self-Help Groups (SHGs)',
    text: 'Eligible SHGs and community-based groups involved in agriculture, allied activities, local enterprise or value addition, where permitted by policy.',
    Icon: PeopleIcon,
    tone: 'purple',
  },
  {
    title: 'Rural Businesses & Suppliers',
    text: 'Participating rural retailers, input suppliers and other approved businesses may be part of the service ecosystem, depending on the programme model.',
    Icon: ShopIcon,
    tone: 'green',
  },
  {
    title: 'Other Eligible FEED Stakeholders',
    text: 'Other registered or approved FEED stakeholders may be included if they meet the official eligibility criteria.',
    Icon: StakeholderCapIcon,
    tone: 'blue',
  },
  {
    title: 'Partner & Service Network',
    text: 'Approved merchants and service providers may participate to make eligible products, offers and services available to cardholders.',
    Icon: CheckIcon,
    tone: 'green',
  },
]

export default function BeneficiariesPanel() {
  return (
    <>
      <header className="info__header">
        <h2 className="info__heading">
          Who are the <span className="info__accent">Beneficiaries?</span>
        </h2>
        <p className="info__subtitle">
          FEED CARD may serve eligible participants across the agriculture and allied ecosystem.
          Final membership, eligibility and access depend on the official FEED CARD policy.
        </p>
      </header>

      {/* Same cards as Benefits; nine of them sit as a clean 3×3 grid. */}
      <ul className="info-grid info-grid--three">
        {BENEFICIARIES.map((beneficiary) => (
          <InfoCard key={beneficiary.title} {...beneficiary} />
        ))}
      </ul>
    </>
  )
}
