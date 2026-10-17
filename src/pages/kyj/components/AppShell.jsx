import { useEffect, useState } from 'react'
import { useNavigate } from '../router.jsx'
import { screens } from '../data/screens.js'
import Pager from './Pager.jsx'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

// ← / → move through the journey (ignored while typing or with modifier keys).
function useArrowKeyNavigation(prev, next) {
  const navigate = useNavigate()

  useEffect(() => {
    function onKeyDown(e) {
      const tag = (e.target.tagName || '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'ArrowLeft' && prev) navigate(prev.path)
      else if (e.key === 'ArrowRight' && next) navigate(next.path)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [navigate, prev, next])
}

// Layout for every screen: sidebar, top bar, the screen itself (children), pager.
export default function AppShell({ current, children }) {
  const prev = screens[current.index - 1]
  const next = screens[current.index + 1]

  // The mobile drawer belongs to the screen it was opened on, so navigating closes it.
  const [drawerScreen, setDrawerScreen] = useState(null)
  const navOpen = drawerScreen === current.id

  useArrowKeyNavigation(prev, next)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setDrawerScreen(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {/* data-stage themes the whole shell with the stage's colour (styles/stage/theme.css) */}
      <div className={`app${navOpen ? ' nav-open' : ''}`} data-stage={current.stage}>
        <Sidebar current={current} />
        <div className="app__main">
          <Topbar
            current={current}
            prev={prev}
            next={next}
            navOpen={navOpen}
            onMenuClick={() => setDrawerScreen(navOpen ? null : current.id)}
          />
          <main className="page" id="main">
            {children}
          </main>
          <Pager prev={prev} next={next} />
        </div>
        <div className="scrim" onClick={() => setDrawerScreen(null)} />
      </div>
    </>
  )
}
