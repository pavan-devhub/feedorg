/** Joins truthy class names. */
export const cls = (...names) => names.filter(Boolean).join(' ')

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToEl(el, block = 'start') {
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block })
}
