import React from 'react';
import { FinanceIcon } from './FinanceIcon';

// Each item jumps to the page section it summarises (ids are set on those sections).
// The items sit in one pill bar; the first is highlighted until another is hovered or focused.
export const FinanceStats = () => {
  const stats = [
    { icon: 'Sprout', value: '10+', label: 'Financial Needs', target: 'finance-needs', section: 'Explore your finance needs' },
    { icon: 'Institution', value: '50+', label: 'Financial Institutions', target: 'finance-providers', section: 'Available Finance Options' },
    { icon: 'FileText', value: '200+', label: 'Govt. Schemes', target: 'government-schemes', section: 'Government Schemes & Subsidies' },
    { icon: 'Calculator', value: '10+', label: 'Financial Tools', target: 'financial-tools', section: 'Financial Tools & Calculators' },
  ];

  return (
    <div className="finance-stats">
      {stats.map((stat) => (
        <a
          key={stat.label}
          href={`#${stat.target}`}
          className="finance-stat-card"
          aria-label={`${stat.value} ${stat.label} - go to ${stat.section}`}
        >
          <div className="finance-stat-card__icon"><FinanceIcon name={stat.icon} size={20} /></div>
          <div className="finance-stat-card__copy">
            <div className="finance-stat-card__value">{stat.value}</div>
            <div className="finance-stat-card__label">{stat.label}</div>
          </div>
        </a>
      ))}
    </div>
  );
};
