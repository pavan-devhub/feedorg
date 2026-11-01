import { useMemo, useState } from 'react'
import FaqIllustration from './FaqIllustration.jsx'
import { FAQS } from './faqData.js'
import './FaqSection.css'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m6.5 9.5 5.5 5.5 5.5-5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FaqItem({ faq, open, onToggle }) {
  const qId = `faq-${faq.n}-q`
  const aId = `faq-${faq.n}-a`
  return (
    <article className={`faq-item${open ? ' fc-is-open' : ''}`}>
      <h3 className="faq-item__heading">
        <button
          type="button"
          id={qId}
          className="faq-item__toggle"
          aria-expanded={open}
          aria-controls={aId}
          onClick={onToggle}
        >
          <span className="faq-item__num">{faq.n}</span>
          <span className="faq-item__q">{faq.q}</span>
          <span className="faq-item__chev">
            <ChevronIcon />
          </span>
        </button>
      </h3>
      <div id={aId} className="faq-item__answer" role="region" aria-labelledby={qId} inert={!open}>
        <div className="faq-item__answer-inner">
          <p>{faq.a}</p>
        </div>
      </div>
    </article>
  )
}

export default function FaqSection() {
  const [query, setQuery] = useState('')
  const [openIds, setOpenIds] = useState(() => new Set())

  const term = query.trim().toLowerCase()
  const visible = useMemo(
    () => (term ? FAQS.filter(({ q, a }) => `${q} ${a}`.toLowerCase().includes(term)) : FAQS),
    [term],
  )
  const allOpen = visible.length > 0 && visible.every(({ n }) => openIds.has(n))

  function toggle(n) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }

  function toggleAll() {
    setOpenIds(allOpen ? new Set() : new Set(visible.map(({ n }) => n)))
  }

  return (
    <section className="faq" id="faqs" aria-labelledby="faq-title">
      <div className="faq__inner">
        <div className="faq__panel">
          <div className="faq__intro">
            <div className="faq__intro-text">
              <p className="faq__tag">Frequently Asked Questions</p>
              <h2 className="faq__title" id="faq-title">
                FAQs
              </h2>
              <p className="faq__subtitle">
                Find answers about FEED CARD, benefits, eligibility and Krishi Coins.
              </p>

              <div className="faq__tools">
                <label className="faq__search">
                  <SearchIcon />
                  <input
                    type="search"
                    placeholder="Search FAQs..."
                    aria-label="Search FAQs"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <button
                  type="button"
                  className="faq__expand"
                  onClick={toggleAll}
                  disabled={visible.length === 0}
                >
                  {allOpen ? 'Collapse all' : 'Expand all'}
                </button>
              </div>
            </div>

            <FaqIllustration />
          </div>

          <div className="faq__body">
            <p className="faq__status" role="status">
              {term ? `${visible.length} matching ${visible.length === 1 ? 'FAQ' : 'FAQs'}` : ''}
            </p>

            {/* One column of questions that scrolls inside the panel */}
            <div className="faq__scroll">
              {visible.length === 0 ? (
                <p className="faq__empty">No matching FAQs found. Try another keyword.</p>
              ) : (
                <div className="faq__list">
                  {visible.map((faq) => (
                    <FaqItem
                      key={faq.n}
                      faq={faq}
                      open={openIds.has(faq.n)}
                      onToggle={() => toggle(faq.n)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
