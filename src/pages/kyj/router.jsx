import { createContext, useContext } from 'react'

// Stand-in for react-router inside the KYJ pages. The site has no router - App.jsx keeps the open
// page in state and moves between pages with onNavigate - so the KYJ paths are mapped onto that:
// "/" is the KYJ home and "/screens/<id>" is that screen (page 'kyj' with { screen: id }), which
// also gives the browser's back / forward buttons a history entry per screen.
const RouterContext = createContext({ path: '/', navigate: () => {} })

export function KyjRouter({ path, onNavigate, children }) {
  const navigate = (to) => {
    if (to === path) return
    const screen = to.match(/^\/screens\/([^/?#]+)/)?.[1]
    onNavigate('kyj', screen ? { screen } : {})
  }
  return <RouterContext value={{ path, navigate }}>{children}</RouterContext>
}

export const useNavigate = () => useContext(RouterContext).navigate

// href="#" keeps the link focusable and keyboard-operable; the click never reaches the browser.
export function Link({ to, onClick, ...props }) {
  const navigate = useNavigate()
  return (
    <a
      {...props}
      href="#"
      onClick={(e) => {
        onClick?.(e)
        e.preventDefault()
        navigate(to)
      }}
    />
  )
}
