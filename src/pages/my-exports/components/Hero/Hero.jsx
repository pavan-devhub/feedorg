import React, { useEffect, useRef, useState } from 'react'
import { FileText, Globe, List, Package, Sprout } from 'lucide-react'
import { heroImage } from '../../data/images'
import { modules, pad, phases, TOTAL_LESSONS } from '../../data/curriculum'
import { PhaseArt, SproutMark } from './HeroArt'
import './Hero.css'

const STATS = [
  { icon: Sprout, value: pad(phases.length), label: 'Phases' },
  { icon: Package, value: pad(modules.length), label: 'Modules' },
  { icon: FileText, value: TOTAL_LESSONS, label: 'Topics' },
  { icon: Globe, value: 'A–Z', label: 'End-to-End Coverage' },
]

function AnimatedStatValue({ value, shouldAnimate }) {
  const targetNum = parseInt(value, 10)
  const isNumeric = !isNaN(targetNum)
  const isPad = typeof value === 'string' && value.length === 2 && value.startsWith('0')

  const [display, setDisplay] = useState(() => (isNumeric ? (isPad ? '00' : '0') : '—'))

  useEffect(() => {
    if (!shouldAnimate) return

    if (!isNumeric) {
      const frames = ['—', 'A', 'A–M', 'A–V', 'A–Z']
      let frameIndex = 0
      const interval = setInterval(() => {
        frameIndex++
        if (frameIndex < frames.length) {
          setDisplay(frames[frameIndex])
        } else {
          setDisplay(value)
          clearInterval(interval)
        }
      }, 160)
      return () => clearInterval(interval)
    }

    const duration = 1400
    const start = performance.now()
    let rafId

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(targetNum * ease)

      if (isPad) {
        setDisplay(String(current).padStart(2, '0'))
      } else {
        setDisplay(String(current))
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [shouldAnimate, isNumeric, isPad, targetNum, value])

  return <strong>{display}</strong>
}

export default function Hero({ onExplorePhase }) {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      setStatsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStatsVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleScrollToTree = (e) => {
    e.preventDefault()
    document.getElementById('tree')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-media">
          <img
            className="hero-photo"
            src={heroImage.src}
            width={heroImage.width}
            height={heroImage.height}
            alt="A smiling farmer beside baskets of fresh produce looks towards a port, where cranes, a container ship, a truck and an aircraft link India to markets around the world"
            fetchPriority="high"
          />
        </div>

        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-pill">
              <span className="hero-pill-icon" aria-hidden="true">
                <SproutMark />
              </span>
              Step-by-step export learning path
            </span>

            <h1 id="hero-title">
              My <em>Exports</em>
            </h1>
            <span className="hero-rule" aria-hidden="true" />

            <p className="hero-lead">
              My Exports guides users through every step of exporting, from starting an export business to finding international buyers.
              <br />
              It explains export licenses, quality, pricing, documentation, shipping, payments, government schemes, and dispute resolution in a simple way.
            </p>

            <div className="hero-ctas">
              <a
                href="#tree"
                className="hero-btn hero-btn-primary"
                onClick={handleScrollToTree}
              >
                <List strokeWidth={2.2} /> View program tree
              </a>
            </div>

            <ul className="hero-phases" aria-label="Program phases">
              {phases.map((p) => (
                <li key={p.id}>
                  <button type="button" className="hero-phase" onClick={() => onExplorePhase(p.id)}>
                    <span className="hero-phase-tile">
                      <PhaseArt id={p.id} />
                    </span>
                    {/* keep "&" on the first line: "Documents &" / "Delivery" */}
                    <span className="hero-phase-label">{p.title.replace(' &', ' &')}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="hero-stats" id="hero-stats" ref={statsRef}>
        <ul className="container hero-stats-list">
          {STATS.map(({ icon: Icon, value, label }) => (
            <li key={label} className="hero-stat">
              <span className="hero-stat-icon" aria-hidden="true">
                <Icon size={28} strokeWidth={1.9} />
              </span>
              <span className="hero-stat-text">
                <AnimatedStatValue value={value} shouldAnimate={statsVisible} />
                <span>{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
