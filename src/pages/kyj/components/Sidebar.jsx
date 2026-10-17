import { useLayoutEffect, useRef } from 'react'
import { Link } from '../router.jsx'
import { screens, stages } from '../data/screens.js'
import { GridIcon, ScreenIcon } from './icons.jsx'

export default function Sidebar({ current }) {
  const navRef = useRef(null)
  const activeRef = useRef(null)
  const centredOnce = useRef(false)

  // Keep the active link in view. Scroll only the nav (never the window).
  // Centre it on first render; afterwards only move when it is out of view,
  // so the list doesn't jump under the pointer when a link is clicked.
  useLayoutEffect(() => {
    const nav = navRef.current
    const active = activeRef.current
    if (!nav || !active) return
    const top = active.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop
    const visible = top >= nav.scrollTop && top + active.offsetHeight <= nav.scrollTop + nav.clientHeight
    if (centredOnce.current && visible) return
    nav.scrollTop = Math.max(0, top - nav.clientHeight / 2 + active.offsetHeight / 2)
    centredOnce.current = true
  }, [current.id])

  return (
    <aside className="sidebar">
      <Link className="sidebar__brand" to="/">
        <span className="sidebar__wordmark">
          <strong>KYJ</strong>
          <span>Krushi Yeva Jayate</span>
        </span>
      </Link>
      <Link className="sidebar__home" to="/">
        <GridIcon />
        All screens
      </Link>
      <nav className="sidebar__nav" aria-label="Screens by stage" ref={navRef}>
        {stages.map((stage) => (
          <div key={stage.id} className={`nav-stage${current.stage === stage.id ? ' is-current' : ''}`} data-stage={stage.id}>
            <div className="nav-stage__head">
              <span className="nav-stage__num">{stage.id}</span>
              {`Stage ${stage.id} · ${stage.name}`}
            </div>
            {screens
              .filter((screen) => screen.stage === stage.id)
              .map((screen) => {
                const active = screen.id === current.id
                return (
                  <Link
                    key={screen.id}
                    ref={active ? activeRef : undefined}
                    className={`nav-link${active ? ' is-active' : ''}`}
                    to={screen.path}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="nav-link__id">{screen.label}</span>
                    <span>{screen.title}</span>
                    {screen.badge && <ScreenIcon name="award" className="nav-link__badge" />}
                  </Link>
                )
              })}
          </div>
        ))}
      </nav>
      <div className="sidebar__foot">
        {`${screens.length} screens · ${stages.length} stages`}
      </div>
    </aside>
  )
}
