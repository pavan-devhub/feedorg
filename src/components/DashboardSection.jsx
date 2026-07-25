import React from 'react';

const DashboardSection = ({ section, children }) => {
  return (
    <div className={`dashboard-section-wrapper theme-${section.theme}`}>
      <div className="section-container">
        <div className="section-header">
          <div className="section-marker">
            <span className="section-num">{section.num}</span>
          </div>
          <div className="section-titles">
            <span className="section-kicker">Export module</span>
            <h2 className="section-title">{section.title}</h2>
            <p className="section-subtitle">{section.subtitle}</p>
          </div>
          <div className="section-count">{section.count}</div>
        </div>
        
        <div className="section-content-grid">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
