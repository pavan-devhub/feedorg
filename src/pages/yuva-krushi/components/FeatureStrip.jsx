import { LeafIcon, SunIcon, UsersIcon } from './icons.jsx'

const features = [
  { title: 'Smart Farming', subtitle: 'Better Decisions', Icon: LeafIcon, tone: 'green' },
  { title: 'Sustainable Future', subtitle: 'Greener Tomorrow', Icon: SunIcon, tone: 'amber' },
  { title: 'Empowering Youth', subtitle: 'Build Agri Careers', Icon: UsersIcon, tone: 'violet' },
]

export default function FeatureStrip() {
  return (
    <ul className="yk-features">
      {features.map(({ title, subtitle, Icon, tone }) => (
        <li key={title} className="yk-feature">
          <span className={`yk-feature__icon yk-feature__icon--${tone}`}>
            <Icon />
          </span>
          <span className="yk-feature__text">
            <strong className="yk-feature__title">{title}</strong>
            <span className="yk-feature__subtitle">{subtitle}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
