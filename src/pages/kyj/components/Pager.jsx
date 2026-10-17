import { Link } from '../router.jsx'
import { ArrowLeftIcon, ArrowRightIcon } from './icons.jsx'

function PagerCard({ target, dir }) {
  if (!target) return <span className="pager__placeholder" />

  const isNext = dir === 'next'
  const arrow = <span className="pager__arrow">{isNext ? <ArrowRightIcon /> : <ArrowLeftIcon />}</span>
  const text = (
    <span>
      <span className="pager__label">{isNext ? 'Next' : 'Previous'}</span>
      <span className="pager__title">
        <span className="mono">{target.label}</span>
        {` · ${target.title}`}
      </span>
    </span>
  )

  return (
    <Link className={`pager__link pager__link--${dir}`} to={target.path}>
      {isNext ? text : arrow}
      {isNext ? arrow : text}
    </Link>
  )
}

export default function Pager({ prev, next }) {
  return (
    <nav className="pager" aria-label="Screen navigation">
      <PagerCard target={prev} dir="prev" />
      <PagerCard target={next} dir="next" />
    </nav>
  )
}
