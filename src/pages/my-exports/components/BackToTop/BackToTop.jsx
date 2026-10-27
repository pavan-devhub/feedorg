import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cls } from '../../utils/cls'
import './BackToTop.css'

export default function BackToTop() {
  const [visible, setVisible] = useState(() => window.scrollY > 900)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#top"
      className={cls('to-top', visible && 'is-visible')}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp size={18} strokeWidth={2.4} />
    </a>
  )
}
