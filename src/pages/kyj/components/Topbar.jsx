import { Link } from '../router.jsx'
import { screens } from '../data/screens.js'
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, GridIcon, MenuIcon } from './icons.jsx'

function NavButton({ target, label, children }) {
  if (!target) {
    return (
      <span className="kyj-icon-btn" aria-disabled="true" aria-label={label}>
        {children}
      </span>
    )
  }
  return (
    <Link
      className="kyj-icon-btn"
      to={target.path}
      aria-label={`${label}: ${target.title}`}
      title={`${target.file} · ${target.title}`}
    >
      {children}
    </Link>
  )
}

export default function Topbar({ current, prev, next, navOpen, onMenuClick }) {
  const position = current.index + 1

  return (
    // --progress draws the journey progress line along the bar's bottom edge
    <header className="topbar" style={{ '--progress': `${(position / screens.length) * 100}%` }}>
      <button
        className="topbar__menu"
        type="button"
        aria-label="Open navigation"
        aria-expanded={navOpen}
        onClick={onMenuClick}
      >
        <MenuIcon />
      </button>
      <Link className="topbar__home" to="/">
        <ArrowLeftIcon />
        <span><span className="topbar__home-back">Back to </span>Home</span>
      </Link>
      <div className="topbar__spacer" />
      <span className="topbar__count">
        <strong>{position}</strong>
        {` / ${screens.length}`}
      </span>
      <div className="topbar__nav">
        <NavButton target={prev} label="Previous screen">
          <ChevronLeftIcon />
        </NavButton>
        <NavButton target={next} label="Next screen">
          <ChevronRightIcon />
        </NavButton>
      </div>
      <Link className="topbar__all" to="/">
        <GridIcon />
        <span>All screens</span>
      </Link>
    </header>
  )
}
