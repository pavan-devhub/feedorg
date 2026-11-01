import { useEffect, useRef, useState } from 'react'
import topics from '../data/topics.js'
import { ArrowRightIcon } from './icons.jsx'
import Lines from './Lines.jsx'
import TopicDetail from './TopicDetail.jsx'
import './Discover.css'

const DETAIL_ID = 'topic-detail'

export default function Discover() {
  // The first topic ("What is Yuva Krushi?") is open when the page loads.
  const [activeId, setActiveId] = useState(topics[0].id)
  const detailRef = useRef(null)
  const scrollOnChange = useRef(false)
  const activeTopic = topics.find((topic) => topic.id === activeId)

  // After a card is clicked, make sure the topic below the cards is in view.
  // Skipped for the default topic so the page doesn't jump on load.
  useEffect(() => {
    if (!activeId || !scrollOnChange.current) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    detailRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' })
  }, [activeId])

  const toggleTopic = (id) => {
    scrollOnChange.current = true
    setActiveId((current) => (current === id ? null : id))
  }

  return (
    <section id="discover" className="discover" aria-labelledby="discover-title">
      <div className="discover__inner">
        <div className="discover__intro">
          <p className="discover__eyebrow">
            <span className="emoji" aria-hidden="true">
              ✨
            </span>
            Your future in agriculture
            <span className="emoji" aria-hidden="true">
              ✨
            </span>
          </p>
          <h2 id="discover-title" className="discover__title">
            Discover
            <br />
            Yuva Krushi
          </h2>
          <p className="discover__lead">
            Choose a card to explore what Yuva Krushi means, why it matters, and how it can connect with your
            ambitions.
          </p>
        </div>

        <div className="discover__cards">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              {...topic}
              isActive={topic.id === activeId}
              onToggle={() => toggleTopic(topic.id)}
            />
          ))}
        </div>
      </div>

      {activeTopic && (
        <div id={DETAIL_ID} ref={detailRef} className="discover__detail">
          <TopicDetail key={activeTopic.id} topic={activeTopic} />
        </div>
      )}
    </section>
  )
}

function TopicCard({ icon, label, title, description, action, isActive, onToggle }) {
  return (
    <article className={`topic-card${isActive ? ' yk-is-active' : ''}`}>
      <span className="topic-card__icon emoji" aria-hidden="true">
        {icon}
      </span>

      <p className="topic-card__label">{label}</p>
      <h3 className="topic-card__title">{title}</h3>
      <p className="topic-card__text">
        <Lines lines={description} />
      </p>

      <div className="topic-card__footer">
        <button
          type="button"
          className="topic-card__action"
          aria-expanded={isActive}
          aria-controls={DETAIL_ID}
          onClick={onToggle}
        >
          {action}
          <ArrowRightIcon className="topic-card__arrow" />
        </button>
      </div>
    </article>
  )
}
