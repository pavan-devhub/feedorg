import './SectionHeading.css'

export default function SectionHeading({ eyebrow, title, lead, id }) {
  return (
    <div className="section-head" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  )
}
