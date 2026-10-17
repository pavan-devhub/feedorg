import React from 'react';
import { Globe } from 'lucide-react';
import HeroBackdrop from './HeroBackdrop';
import IndiaMap from './IndiaMap';

const SCOPES = [
  { id: 'national', label: 'National', icon: <IndiaMap className="tf-scope__india" /> },
  { id: 'international', label: 'International', icon: <Globe size={23} strokeWidth={1.7} /> },
];

// The backdrop runs up behind the site's floating navbar; the top padding clears it.
const TradeFairsHero = ({ scope, onScopeChange }) => (
  <header className="tf-hero">
    <div className="tf-hero__clip">
      <HeroBackdrop />

      <div className="tf-shell tf-hero__inner">
        <div className="tf-hero__text">
          <h1 className="tf-hero__title">
            <span className="tf-hero__title-trade">Trade</span>{' '}
            <span className="tf-hero__title-fairs">Fairs</span>
          </h1>

          {/* Tricolour underline */}
          <div className="tf-hero__tricolour" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="tf-scope">
            {SCOPES.map(({ id, label, icon }) => {
              const active = scope === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onScopeChange(id)}
                  className={`tf-scope__option tf-scope__option--${id}${active ? ' is-active' : ''}`}
                >
                  <span className="tf-scope__icon">{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default TradeFairsHero;
