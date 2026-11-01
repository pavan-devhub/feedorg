import { Link } from '../router.jsx'
import { CATEGORY_CARDS } from '../data/categoryCards.js'
import { LeafMark, USER_TYPE_ICONS } from './UserTypeIcons.jsx'
import './CategoryCards.css'

function ArrowIcon() {
  return (
    <svg viewBox="3 5 17 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function UserTypeCard({ card, index }) {
  const { id, title, description, icon, image, imageAlt, accent, tint, to } = card
  const Icon = USER_TYPE_ICONS[icon]

  return (
    <li id={id} className="ucard" style={{ '--accent': accent, '--tint': tint }}>
      <LeafMark className="ucard__leaf" />
      <span className="ucard__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="ucard__art">{image ? <img src={image} alt={imageAlt} /> : Icon && <Icon />}</div>
      <h3 className="ucard__title">
        {/* with a page to open, the title link covers the whole card */}
        {to ? (
          <Link to={to} state={{ from: '/' }} className="ucard__link">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="ucard__text">{description}</p>
      <span className="ucard__arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </li>
  )
}

export default function CategoryCards() {
  return (
    <section id="user-types" className="cards" aria-labelledby="user-types-title">
      <div className="cards__inner">
        <h2 id="user-types-title" className="cards__label">
          Explore all tools
        </h2>
        <ul className="cards__grid">
          {CATEGORY_CARDS.map((card, index) => (
            <UserTypeCard key={card.id} card={card} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
