import { BulbIcon, CheckIcon, PuzzleIcon, SignpostIcon, StarIcon, TargetIcon, TrendIcon } from './icons.jsx'
import './TopicDetail.css'

const icons = {
  target: TargetIcon,
  bulb: BulbIcon,
  trend: TrendIcon,
  star: StarIcon,
  puzzle: PuzzleIcon,
  signpost: SignpostIcon,
}

export default function TopicDetail({ topic }) {
  const { id, icon, title, detail } = topic
  const { subtitle, main, aside } = detail
  const titleId = `topic-detail-${id}-title`

  return (
    <article className="topic-detail" aria-labelledby={titleId}>
      <header className="topic-detail__header">
        <span className="topic-detail__badge emoji" aria-hidden="true">
          {icon}
        </span>
        <div>
          <h3 id={titleId} className="topic-detail__title">
            {title}
          </h3>
          <p className="topic-detail__subtitle">{subtitle}</p>
        </div>
      </header>

      <div className="topic-detail__body">
        <section className="topic-detail__card topic-detail__card--main">
          <PanelHeading icon={main.icon}>{main.heading}</PanelHeading>
          {main.paragraphs.map((paragraph) => (
            <p key={paragraph} className="topic-detail__text">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="topic-detail__card">
          <PanelHeading icon={aside.icon}>{aside.heading}</PanelHeading>
          <p className="topic-detail__intro">{aside.intro}</p>
          <ul className="topic-detail__list">
            {aside.items.map((item) => (
              <li key={item}>
                <span className="topic-detail__check" aria-hidden="true">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}

function PanelHeading({ icon, children }) {
  const Icon = icons[icon]

  return (
    <h4 className="topic-detail__heading">
      <span className="topic-detail__icon">
        <Icon />
      </span>
      {children}
    </h4>
  )
}
