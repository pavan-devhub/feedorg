import React from 'react';
import { SectionHeader } from './SectionHeader';
import { FinanceIcon } from './FinanceIcon';

export const FinancialTools = () => {
  const tools = [
    { title: 'EMI Calculator', icon: 'Calculator', color: 'blue' },
    { title: 'Loan Eligibility', icon: 'CheckCircle', color: 'primary' },
    { title: 'Interest Calculator', icon: 'Percentage', color: 'orange' },
    { title: 'Project Cost Calculator', icon: 'FileText', color: 'purple' },
    { title: 'Working Capital', icon: 'Money', color: 'orange' },
    { title: 'Subsidy Calculator', icon: 'Rupee', color: 'purple' },
    { title: 'Export Finance', icon: 'Ship', color: 'blue' },
    { title: 'Repayment Planner', icon: 'Calendar', color: 'primary' },
  ];

  return (
    <section id="financial-tools" className="finance-tools">
      <div className="finance-tools__panel">
        <SectionHeader
          number="5"
          title="Financial Tools & Calculators"
          icon="Calculator"
          rightElement={
            <a href="#" className="finance-tools__view-all">
              View All <FinanceIcon name="ArrowRight" size={16} />
            </a>
          }
        />

        <div className="finance-tools__grid">
          {tools.map((tool, idx) => (
            <button
              key={idx}
              type="button"
              className={`finance-tool-card finance-tool-card--${tool.color}`}
            >
              {/* grey tile holds the icon; the name sits underneath, outside the tile */}
              <span className="finance-tool-card__tile">
                <span className="finance-tool-card__icon">
                  <FinanceIcon name={tool.icon} size={24} />
                </span>
              </span>
              <span className="finance-tool-card__title">{tool.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
