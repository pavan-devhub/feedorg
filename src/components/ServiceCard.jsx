import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const accentByIcon = {
  'ic-yellow': '#d98718',
  'ic-green': '#24945b',
  'ic-blue': '#1976d2',
  'ic-amber': '#df8a20',
  'ic-purple': '#8a5bc2',
  'ic-teal': '#0f8f83',
  'ic-red': '#dc3c52',
  'ic-navy': '#5f66c9',
  'ic-gold': '#d99a18',
  'ic-pink': '#c33c76',
  'ic-darkgreen': '#1f8d5f',
  'ic-indigo': '#5b68c8',
  'ic-orange': '#e37516',
  'ic-lime': '#879b1c',
  'ic-maroon': '#8a7247',
};

const ServiceCard = ({ tile }) => {
  const accent = tile.borderLeft || accentByIcon[tile.iconClass] || '#1f8d5f';
  const Icon = tile.Icon;

  return (
    <article className="service-card" style={{ '--service-accent': accent }}>
      <div className="service-card-glow" aria-hidden="true"></div>

      <div className="card-top-row">
        <div className={`card-icon ${tile.iconClass}`}>
          <Icon size={24} />
        </div>
        <div className="card-title-group">
          <span className="card-english-title">{tile.englishTitle}</span>
          <h3 className="card-telugu-title">{tile.teluguTitle}</h3>
        </div>
        <div className={`card-pill ${tile.pillClass}`}>
          {tile.pillText}
        </div>
      </div>

      <p className="card-body-text">
        {tile.body}
      </p>

      {tile.checklist && (
        <div className="reg-checklist">
          <div className="reg-checklist-header">
            <CheckCircle2 size={16} />
            Registration progress
          </div>
          <div className="reg-grid">
            {tile.checklist.map((item, idx) => (
              <div key={idx} className="reg-item">
                <span className={`reg-dot ${item.status}`}></span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card-facts">
        {tile.facts.map((fact, idx) => (
          <div key={idx} className="fact-chip">
            <span className="fact-icon">{fact.icon}</span>
            <span dangerouslySetInnerHTML={{ __html: fact.html }}></span>
          </div>
        ))}
      </div>

      <button className="card-open-btn" type="button">
        <span>Open module</span>
        <ArrowRight size={16} />
      </button>
    </article>
  );
};

export default ServiceCard;
