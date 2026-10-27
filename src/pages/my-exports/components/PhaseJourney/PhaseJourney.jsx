import { ArrowRight } from 'lucide-react'
import { pad, phases } from '../../data/curriculum'
import { phaseCardImages } from '../../data/images'
import Amp from '../common/Amp'
import './PhaseJourney.css'

export default function PhaseJourney({ progress, onExplorePhase }) {
  return (
    <section id="phases" className="learning-path" aria-labelledby="phases-title">
      <div className="container learning-path-inner">
        <div className="learning-path-head">
          <span className="learning-path-eyebrow">Program overview</span>
          <h2 id="phases-title">Export Learning Path</h2>
        </div>

        <ol className="lp-grid">
          {phases.map((p) => {
            const total = p.lessonIds.length
            const done = progress.countIn(p.lessonIds)
            return (
              <li key={p.id} className={`lp-card lp-${p.id}`}>
                <article aria-labelledby={`phase-${p.id}-title`}>
                  <div className="lp-media">
                    <img src={phaseCardImages[p.id]} width="1670" height="941" alt="" loading="lazy" decoding="async" />
                    <span className="lp-badge" aria-label={`Phase ${p.id}`}>
                      {pad(p.id)}
                    </span>
                  </div>

                  <div className="lp-body">
                    <h3 id={`phase-${p.id}-title`}>
                      <Amp>{p.title}</Amp>
                    </h3>
                    <p className="lp-desc">{p.tagline}</p>

                    <div className="lp-foot">
                      <div className="lp-progress">
                        <span
                          className="lp-track"
                          role="progressbar"
                          aria-label={`${p.title} progress`}
                          aria-valuemin={0}
                          aria-valuemax={total}
                          aria-valuenow={done}
                        >
                          <i style={{ width: `${(done / total) * 100}%` }} />
                        </span>
                        <span className="lp-count">{done > 0 ? `${done}/${total} topics` : `${total} topics`}</span>
                      </div>
                      <button type="button" className="lp-explore" onClick={() => onExplorePhase(p.id)}>
                        Explore<span className="sr-only"> {p.title}</span> <ArrowRight size={18} strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
