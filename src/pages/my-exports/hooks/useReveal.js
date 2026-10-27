import { useEffect } from 'react'

/** Fades in every [data-reveal] element the first time it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => {
        el.classList.add('is-visible', 'is-settled')
      })
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target
            target.classList.add('is-visible')
            observer.unobserve(target)

            const onSettled = () => {
              target.classList.add('is-settled')
              target.style.transform = 'none'
              target.style.willChange = 'auto'
            }
            target.addEventListener('transitionend', onSettled, { once: true })
            setTimeout(onSettled, 1400)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
