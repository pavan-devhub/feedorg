// Card used by both the Benefits and Beneficiaries panels: tinted icon tile, title, text.
export default function InfoCard({ Icon, tone, title, text }) {
  return (
    <li className="fc-info-card">
      <span className={`fc-info-card__icon fc-tone-${tone}`}>
        <Icon />
      </span>
      <h3 className="fc-info-card__title">{title}</h3>
      <p className="fc-info-card__text">{text}</p>
    </li>
  )
}
