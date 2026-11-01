import { createContext, useContext } from 'react'

// Stand-in for react-router inside the My Tools pages. The site has no router - App.jsx keeps the
// open page in state and moves between pages with onNavigate - so the app's paths are mapped onto
// that: "/" is the My Tools home and "/farmer/weather-tools" is that screen (page 'tools' with
// { screen: 'farmer/weather-tools' }), which also gives the browser's back / forward buttons a
// history entry per screen.
//
// A link's `state` (e.g. { from: '/' }, which the back buttons read) rides along in the same
// history entry as `routerState`: App.jsx keeps the extra state it is given in history.state, so
// it survives back / forward and a refresh.
const RouterContext = createContext({ path: '/', navigate: () => {} })

const toScreen = (to) => to.replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, '')

export function MtRouter({ path, onNavigate, children }) {
  const navigate = (to, { state } = {}) => {
    if (typeof to === 'number') {
      // navigate(-1): the browser's Back; App.jsx shows the screen kept in that history entry
      if (to === -1) window.history.back()
      else window.history.go(to)
      return
    }
    if (to === path && state == null) return
    const screen = toScreen(to)
    onNavigate('tools', {
      ...(screen ? { screen } : {}),
      ...(state != null ? { routerState: state } : {}),
    })
  }
  return <RouterContext value={{ path, navigate }}>{children}</RouterContext>
}

export const useNavigate = () => useContext(RouterContext).navigate

// Only pathname and state are used by the pages. The state is read from the history entry App.jsx
// pushed (or the browser restored) for this screen.
export function useLocation() {
  const { path } = useContext(RouterContext)
  const entry = window.history.state
  const state = entry && entry.page === 'tools' && entry.routerState != null ? entry.routerState : null
  return { pathname: path, state }
}

// href="#" keeps the link focusable and keyboard-operable; the click never reaches the browser.
// As in react-router, a click handler that calls preventDefault() (the back button going back in
// history instead) stops the link's own navigation.
export function Link({ to, state, onClick, ...props }) {
  const navigate = useNavigate()
  return (
    <a
      {...props}
      href="#"
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        e.preventDefault()
        navigate(to, { state })
      }}
    />
  )
}
