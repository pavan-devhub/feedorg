import { Link, useLocation, useNavigate } from '../router.jsx'
import './BackButton.css'

// "Back to …" pill in the top-left corner of a page header. Size it from the page's design unit
// by setting --bu on the page.
//
// When the visitor came here from that page (the link that brought them passes
// `state={{ from: '<that path>' }}`), it works like the browser's Back button, so the page
// returns to where it was; opened any other way, it simply opens the page.
export default function BackButton({ to, label }) {
  const location = useLocation()
  const navigate = useNavigate()

  function handleClick(event) {
    if (location.state?.from === to) {
      event.preventDefault()
      navigate(-1)
    }
  }

  return (
    <Link to={to} className="mt-back-btn" onClick={handleClick}>
      <svg viewBox="3 5 17 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H4M10 6l-6 6 6 6" />
      </svg>
      <span>{label}</span>
    </Link>
  )
}
