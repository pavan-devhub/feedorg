import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './WelcomeHero.css';

// The dashboard's welcome banner. "Welcome, <name>" first shows large; after WELCOME_MS it shrinks
// into the top-left corner and the user's personalized updates (see utils/personalUpdates) take
// turns in the banner - each one fades in, stays UPDATE_MS, fades out, and the next follows, round
// and round. Hovering or focusing an update holds it; the dots jump straight to one.

const WELCOME_MS = 4500;
const UPDATE_MS = 6000;
const LEAVE_MS = 450; // the fade-out at the end of each update's turn (matches the CSS)

function UpdateCard({ update, position, total, leaving, first, paused, showTimer, timerKey, onOpen }) {
  const Icon = update.icon;
  const actionable = !!(update.link || update.action);
  const open = () => onOpen(update);
  return (
    <article
      className={`db-hero-update tone-${update.tone}${leaving ? ' is-leaving' : ''}${first ? ' is-first' : ''}${actionable ? ' is-actionable' : ''}`}
      {...(actionable ? {
        role: 'button',
        tabIndex: 0,
        onClick: open,
        onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } },
      } : {})}
    >
      <span className="db-hero-update-icon" aria-hidden="true"><Icon size={24} strokeWidth={2.1} /></span>
      <div className="db-hero-update-body">
        <div className="db-hero-update-top">
          <span className="db-hero-update-tag">{update.tag}</span>
          {update.isNew && <span className="db-hero-update-new">New</span>}
          {update.meta && <span className="db-hero-update-time">{update.meta}</span>}
          <span className="db-hero-update-count" aria-label={`Update ${position} of ${total}`}>
            <strong>{position}</strong> / {total}
          </span>
        </div>
        <h3 className="db-hero-update-title">{update.title}</h3>
        {update.message && <p className="db-hero-update-msg">{update.message}</p>}
        {update.cta && (
          <span className="db-hero-update-cta">{update.cta} <ArrowRight size={15} strokeWidth={2.4} /></span>
        )}
      </div>
      {showTimer && (
        <span
          key={timerKey}
          className="db-hero-update-timer"
          style={{ animationDuration: `${UPDATE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
          aria-hidden="true"
        />
      )}
    </article>
  );
}

export default function WelcomeHero({ name, updates, onOpen }) {
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [turn, setTurn] = useState(0); // bumps for every new update on show - replays its entrance
  const [resumes, setResumes] = useState(0); // bumps when a hold ends - restarts its timer bar
  const currentId = useRef(null);

  const count = updates.length;
  const showUpdates = welcomeDone && count > 0;
  const paused = hovered || focused;
  const safeIndex = count ? Math.min(index, count - 1) : 0;
  const current = showUpdates ? updates[safeIndex] : null;

  useEffect(() => {
    const timer = setTimeout(() => setWelcomeDone(true), WELCOME_MS);
    return () => clearTimeout(timer);
  }, []);

  // A live reload of the list keeps the update that's on show where it is (it may have moved).
  useEffect(() => {
    if (!count) return;
    const keep = updates.findIndex((u) => u.id === currentId.current);
    setIndex(keep >= 0 ? keep : 0);
  }, [updates, count]);

  useEffect(() => {
    currentId.current = updates[safeIndex]?.id ?? null;
  }, [safeIndex, updates]);

  // Each update's turn: fade out near the end, then the next one.
  useEffect(() => {
    if (!showUpdates || paused || count < 2) return undefined;
    const leaveTimer = setTimeout(() => setLeaving(true), UPDATE_MS - LEAVE_MS);
    const nextTimer = setTimeout(() => {
      setLeaving(false);
      setIndex((i) => (i + 1) % count);
      setTurn((t) => t + 1);
    }, UPDATE_MS);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(nextTimer);
    };
  }, [showUpdates, paused, count, turn, resumes]);

  const hold = (setter) => () => {
    setter(true);
    setLeaving(false);
  };
  const release = (setter) => () => {
    setter(false);
    setResumes((r) => r + 1);
  };

  const jumpTo = (i) => {
    setLeaving(false);
    setIndex(i);
    setTurn((t) => t + 1);
  };

  return (
    <section
      className={`db-hero${showUpdates ? ' is-updates' : ''}`}
      style={{ backgroundImage: "url('/images/dashboard/welcome-hero-bg.webp')" }}
    >
      <div className={`db-hero-welcome${showUpdates ? ' is-compact' : ''}`}>
        <span className="db-hero-welcome-hi">Welcome,</span>
        <h1 className="db-hero-welcome-name">{name}</h1>
        <svg className="db-hero-welcome-swoosh" viewBox="0 0 170 24" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="dbSwoosh" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fdba74" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M3 19 C 46 5, 104 2, 167 6 C 110 8, 56 13, 9 23 C 5 23.5, 2 21.5, 3 19 Z" fill="url(#dbSwoosh)" />
        </svg>
      </div>

      {current && (
        <div
          className="db-hero-updates"
          aria-label="Your updates"
          onMouseEnter={hold(setHovered)}
          onMouseLeave={release(setHovered)}
          onFocus={hold(setFocused)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) release(setFocused)(); }}
        >
          <UpdateCard
            key={`${current.id}-${turn}`}
            update={current}
            position={safeIndex + 1}
            total={count}
            leaving={leaving}
            first={turn === 0}
            paused={paused}
            showTimer={count > 1}
            timerKey={`${turn}-${resumes}`}
            onOpen={onOpen}
          />
          {count > 1 && (
            <div className="db-hero-dots">
              {updates.map((u, i) => (
                <button
                  key={u.id}
                  type="button"
                  className={`db-hero-dot${i === safeIndex ? ' is-active' : ''}`}
                  aria-label={`Show update ${i + 1} of ${count}`}
                  aria-current={i === safeIndex ? 'true' : undefined}
                  onClick={() => jumpTo(i)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="db-hero-logo">
        <span className="db-hero-logo-glow" aria-hidden="true"></span>
        <img src="/dashboard-logo.avif" alt="FEED MSCS LTD" />
      </div>
    </section>
  );
}
