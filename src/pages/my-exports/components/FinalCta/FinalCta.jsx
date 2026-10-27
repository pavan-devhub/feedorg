import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Activity,
  FileText,
  PartyPopper,
  RotateCcw,
  Sprout,
} from 'lucide-react';
import { lessons } from '../../data/curriculum';
import { ctaIllustration } from '../../data/images';
import { API_BASE_URL } from '../../../../api/config';
import './FinalCta.css';

export default function FinalCta({ progress, onContinue, onNavigate }) {
  const next = lessons.find((l) => !progress.done.has(l.id));

  const [ersStatus, setErsStatus] = useState({
    attempted: false,
    percentage: 0,
    passed: false,
    totalScore: 0,
  });

  useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem('jwt');
    if (!token) return;

    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/ers/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.attempted && data.status) {
            setErsStatus({
              attempted: true,
              percentage: data.status.percentage || 0,
              passed: data.status.passed || false,
              totalScore: data.status.totalScore || 0,
            });
          }
        }
      } catch {
        // Fall back to default non-started state
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleReset = () => {
    if (window.confirm('Reset all progress? This clears every topic you have marked complete on this device.')) {
      progress.reset();
    }
  };

  const handleNavigateToErs = () => {
    if (onNavigate) {
      onNavigate('ers-assessment');
    }
  };

  const ringCircumference = 264;
  const strokeOffset = ersStatus.attempted
    ? ringCircumference * (1 - Math.min(100, Math.max(0, ersStatus.percentage)) / 100)
    : 220; // ~15% progress indicator for not-started

  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="container cta-container">
        <div className="cta-card" data-reveal>
          {/* LEFT COPY */}
          <div className="cta-copy">
            <span className="cta-eyebrow">Your learning journey</span>
            <h2 id="cta-title">
              Ready to make
              <br /> your <em>first shipment?</em>
            </h2>
            <p className="cta-lead">
              Work through the phases in order, or jump straight to the topic you need today. Progress is saved
              automatically on this device.
            </p>
            <div className="cta-actions">
              {next ? (
                <button type="button" className="cta-btn" onClick={() => onContinue(next.id)}>
                  {progress.completed ? 'Continue' : 'Start'} with {next.id} {next.name}
                  <ArrowRight className="cta-btn-arrow" strokeWidth={2.2} aria-hidden="true" />
                </button>
              ) : (
                <span className="cta-done">
                  <PartyPopper size={18} aria-hidden="true" /> All topics complete — well done!
                </span>
              )}
              {progress.completed > 0 && (
                <button type="button" className="cta-reset" onClick={handleReset}>
                  <RotateCcw size={15} aria-hidden="true" /> Reset progress
                </button>
              )}
            </div>
          </div>

          {/* MIDDLE ILLUSTRATION */}
          <img
            className="cta-art"
            src={ctaIllustration.src}
            width={ctaIllustration.width}
            height={ctaIllustration.height}
            alt=""
            loading="lazy"
            decoding="async"
          />

          {/* RIGHT SIDE: REPLACED WITH ERS ASSESSMENT CARD */}
          <div
            className="cta-ers-card"
            onClick={handleNavigateToErs}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigateToErs();
              }
            }}
            aria-label="ERS Assessment — Click to start assessment"
          >
            {/* 1. Header */}
            <div className="cta-ers-header">
              <div className="cta-ers-brand">
                <div className="cta-ers-brand-icon" aria-hidden="true">
                  <Sprout size={28} strokeWidth={2.2} color="#ffffff" />
                </div>
                <div className="cta-ers-brand-text">
                  <h4 className="cta-ers-title">ERS</h4>
                  <p className="cta-ers-subtitle">Empowerment &amp; Rural Support</p>
                </div>
              </div>

              <div className="cta-ers-badge">
                <span className="cta-ers-badge-dot" aria-hidden="true" />
                ACTIVE
              </div>
            </div>

            {/* 2. Middle Body */}
            <div className="cta-ers-body">
              {/* Left Column: Progress Ring Gauge */}
              <div className="cta-ers-gauge-col">
                <div className="cta-ers-gauge-wrap">
                  <svg viewBox="0 0 100 100" className="cta-ers-gauge-svg" aria-hidden="true">
                    <circle className="cta-ers-gauge-track" cx="50" cy="50" r="42" />
                    <circle
                      className="cta-ers-gauge-fill"
                      cx="50"
                      cy="50"
                      r="42"
                      style={{
                        strokeDasharray: `${ringCircumference}`,
                        strokeDashoffset: `${strokeOffset}`,
                      }}
                    />
                  </svg>
                  <div className="cta-ers-gauge-center">
                    <div className="cta-ers-sprout-badge" aria-hidden="true">
                      <Sprout size={24} color="#059669" strokeWidth={2.2} />
                    </div>
                    <span className="cta-ers-gauge-status">
                      {ersStatus.attempted ? `${Math.round(ersStatus.percentage)}%` : 'Not Started'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="cta-ers-divider" aria-hidden="true" />

              {/* Right Column: Status & Let's Begin */}
              <div className="cta-ers-info-col">
                {/* Status Row */}
                <div className="cta-ers-status-block">
                  <div className="cta-ers-status-head">
                    <div className="cta-ers-pulse-icon" aria-hidden="true">
                      <Activity size={20} color="#059669" strokeWidth={2.4} />
                    </div>
                    <div className="cta-ers-status-labels">
                      <span className="cta-ers-status-eyebrow">ASSESSMENT STATUS</span>
                      <span className="cta-ers-status-value">
                        {ersStatus.attempted ? (ersStatus.passed ? 'Passed' : 'Not Passed') : 'Not Started'}
                      </span>
                    </div>
                  </div>

                  <div className="cta-ers-status-bar" role="progressbar" aria-valuenow={ersStatus.attempted ? ersStatus.percentage : 18}>
                    <div
                      className="cta-ers-status-fill"
                      style={{ width: ersStatus.attempted ? `${Math.max(15, ersStatus.percentage)}%` : '18%' }}
                    />
                  </div>

                  <span className="cta-ers-status-desc">
                    {ersStatus.attempted
                      ? ersStatus.passed
                        ? 'Completed successfully'
                        : 'Review your answers & retake'
                      : 'Take the assessment to get started'}
                  </span>
                </div>

                {/* Let's Begin Row */}
                <div className="cta-ers-begin-block">
                  <div className="cta-ers-cone-icon-wrap" aria-hidden="true">
                    <div className="cta-ers-cone-circle">
                      <svg viewBox="0 0 24 24" className="cta-ers-cone-svg">
                        <path
                          d="M12 4.2 L19.8 18.2 C20.3 19 19.8 19.8 18.8 19.8 L5.2 19.8 C4.2 19.8 3.7 19 4.2 18.2 Z"
                          fill="#047857"
                        />
                      </svg>
                    </div>
                    <span className="cta-ers-cone-label">GET STARTED</span>
                  </div>
                  <div className="cta-ers-begin-text">
                    <span className="cta-ers-begin-title">Let’s Begin!</span>
                    <span className="cta-ers-begin-desc">Take the test</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Bottom Button */}
            <button
              className="cta-ers-action-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToErs();
              }}
            >
              <div className="cta-ers-btn-left">
                <div className="cta-ers-doc-icon" aria-hidden="true">
                  <FileText size={20} color="#ffffff" strokeWidth={2.2} />
                </div>
                <div className="cta-ers-btn-text">
                  <strong>{ersStatus.attempted ? 'Review Assessment' : 'Start Assessment'}</strong>
                  <span>Begin your empowerment journey</span>
                </div>
              </div>
              <div className="cta-ers-arrow-circle" aria-hidden="true">
                <ArrowRight size={18} color="#4f46e5" strokeWidth={2.6} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
