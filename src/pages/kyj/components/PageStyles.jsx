import { createPortal } from 'react-dom'

// Page stylesheets (src/styles/pages/*.css) re-theme :root and restyle shared
// components, so only the current page's sheet may be active. Import the sheet
// with `?inline` and render it here: it is added to <head> while the page is
// mounted and removed when the page is left.
export default function PageStyles({ css }) {
  return createPortal(<style>{css}</style>, document.head)
}
