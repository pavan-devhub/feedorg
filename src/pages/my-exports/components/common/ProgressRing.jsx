import { Check } from 'lucide-react'
import { cls } from '../../utils/cls'
import './ProgressRing.css'

export default function ProgressRing({ value, total, size = 48, stroke = 4, showLabel = true }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = total ? value / total : 0
  const complete = total > 0 && value >= total

  return (
    <span
      className={cls('ring', complete && 'is-complete', pct === 0 && 'is-empty')}
      style={{ '--ring-size': `${size}px` }}
      role="img"
      aria-label={`${value} of ${total} complete`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
        <circle
          className="ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {showLabel && (
        <span className="ring-label" aria-hidden="true">
          {complete ? <Check size={size * 0.36} strokeWidth={3} /> : `${Math.round(pct * 100)}%`}
        </span>
      )}
    </span>
  )
}
