import { useEffect, useImperativeHandle, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { lessons, modules, pad, phases } from '../../data/curriculum'
import { programBannerImage, programPhaseImages } from '../../data/images'
import { cls, scrollToEl } from '../../utils/cls'
import Amp from '../common/Amp'

import './ProgramTree.css'

export default function ProgramTree({ ref, progress }) {
  // Modules start collapsed so the whole block fits one screen; topics open on demand
  const [open, setOpen] = useState(() => new Set())

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // Imperative navigation used by phase cards, hero and CTA
  const reveal = (moduleIds, elId) => {
    setOpen((prev) => new Set([...prev, ...moduleIds]))
    scrollToEl(document.getElementById(elId))
  }

  // Topic pages link back with #tree, #tree-phase-N (opens every module in the phase) or
  // #tree-module-N. Revealed a frame later, after the page's own scroll-to-top, then the hash is dropped.
  const [deepLink] = useState(() => window.location.hash.match(/^#tree(?:-(phase|module)-(\d+))?$/))

  useEffect(() => {
    if (!deepLink) return undefined
    const [hash, kind, num] = deepLink
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
    const moduleIds =
      kind === 'phase'
        ? (phases.find((p) => p.id === Number(num))?.modules.map((m) => m.id) ?? [])
        : kind === 'module'
          ? [Number(num)]
          : []
    const frame = requestAnimationFrame(() => reveal(moduleIds, hash.slice(1)))
    return () => cancelAnimationFrame(frame)
  }, [deepLink])

  useImperativeHandle(ref, () => ({
    showPhase: (id) => {
      const phase = phases.find((p) => p.id === id)
      if (phase) {
        reveal(phase.modules.map((m) => m.id), `tree-phase-${id}`)
      }
    },
    focusLesson: (id) => {
      const lesson = lessons.find((l) => l.id === id)
      if (lesson) {
        reveal([lesson.moduleId], `tree-module-${lesson.moduleId}`)
      }
    },
  }))

  return (
    <section id="tree" className="tree-section" aria-labelledby="tree-title">
      <div className="tree-banner-art" data-reveal="banner" aria-hidden="true">
        <img
          src={programBannerImage.src}
          width={programBannerImage.width}
          height={programBannerImage.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="tree-inner">
        <header className="tree-head" data-reveal="head">
          <span className="tree-eyebrow">Program</span>
          <h2 id="tree-title">Export Program</h2>
          <p className="tree-lead">
            A structured learning path to help you understand and practice every
            <br /> step of the export journey — from foundations to payments and protection.
          </p>
        </header>

        <div className="tree-grid">
          {phases.map((p) => (
            <article
              key={p.id}
              id={`tree-phase-${p.id}`}
              className={`tree-phase phase-${p.id}`}
              data-reveal={`phase-${p.id}`}
              aria-labelledby={`tree-phase-${p.id}-title`}
            >
              <header className="tree-phase-head">
                <img
                  className="tree-phase-art"
                  src={programPhaseImages[p.id]}
                  width="1678"
                  height="937"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

                <div className="tree-phase-copy">
                  <span className="tree-phase-kicker">Phase {pad(p.id)}</span>
                  <h3 id={`tree-phase-${p.id}-title`}>
                    <Amp>{p.title}</Amp>
                  </h3>
                  <p>{p.tagline}</p>
                </div>

                <p className="tree-phase-meta">
                  {p.modules.length} Modules
                  <span className="tree-phase-sep" aria-hidden="true" />
                  <span>
                    <strong>{p.lessonIds.length}</strong> Topics
                  </span>
                </p>
              </header>

              <div className="tree-modules">
                {p.modules.map((m) => {
                  const isOpen = open.has(m.id)

                  return (
                    <div key={m.id} id={`tree-module-${m.id}`} className={cls('tree-module', isOpen && 'is-open')}>
                      <button
                        type="button"
                        className="tree-module-head"
                        aria-expanded={isOpen}
                        aria-controls={`tree-topics-${m.id}`}
                        onClick={() => toggle(m.id)}
                      >
                        <span className="tree-module-num">{pad(m.id)}</span>
                        <span className="tree-module-title">{m.title}</span>
                        <span className="tree-module-count">{m.lessonIds.length} topics</span>
                        <ChevronDown className="tree-module-chev" strokeWidth={2.2} aria-hidden="true" />
                      </button>

                      <div id={`tree-topics-${m.id}`} className="tree-module-body" inert={!isOpen}>
                        <div className="tree-module-clip">
                          <ol className="tree-topics">
                            {m.lessons.map((l) => {
                              const isDone = progress.done.has(l.id)
                              return (
                                <li key={l.id} className={cls('tree-topic', isDone && 'is-done')}>
                                  <div className="tree-topic-row">
                                    <a
                                      href={l.path || '#'}
                                      className="tree-topic-btn"
                                      title={l.title}
                                      onClick={(e) => {
                                        if (progress.markDone) {
                                          progress.markDone(l.id)
                                        }
                                        if (l.path) {
                                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                            e.preventDefault()
                                            window.location.href = l.path
                                          }
                                        }
                                      }}
                                    >
                                      <span className="tree-topic-id">{l.id}</span>
                                      <span className="tree-topic-name">{l.name}</span>
                                      <span className="tree-topic-check-wrap" aria-hidden="true">
                                        {isDone ? (
                                          <Check className="tree-topic-check" strokeWidth={2.6} aria-label="Completed" />
                                        ) : (
                                          <span className="tree-topic-check-empty" />
                                        )}
                                      </span>
                                    </a>
                                  </div>
                                </li>
                              )
                            })}
                          </ol>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
