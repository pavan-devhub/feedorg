import React from 'react';
import { FlaskConical, ArrowRight } from 'lucide-react';
import { nextActionData } from '../data/exportServices';

const NextActionCard = () => {
  return (
    <div className="next-action-card">
      <div className="next-action-header">
        <div className="next-action-icon">
          <FlaskConical size={22} />
        </div>
        <div className="next-action-titles">
          <div className="next-action-subtitle">{nextActionData.subtitle}</div>
          <div className="next-action-title">{nextActionData.title}</div>
        </div>
      </div>
      <div className="next-action-body">
        {nextActionData.body}
      </div>
      <div className="next-action-timeline" aria-label="Action timeline">
        <span className="timeline-step complete">PHRT</span>
        <span className="timeline-line"></span>
        <span className="timeline-step active">NABL</span>
        <span className="timeline-line"></span>
        <span className="timeline-step">Buyer</span>
      </div>
      <button className="next-action-cta">
        <span>{nextActionData.cta}</span>
        <ArrowRight size={17} />
      </button>
    </div>
  );
};

export default NextActionCard;
