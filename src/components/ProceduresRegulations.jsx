import React from 'react';
import './ExportImportPolicy.css'; // Reusing the same grid CSS for consistency
import { ChevronRight } from 'lucide-react';

const proceduresCards = [
  {
    id: 1,
    title: 'Customs Clearance',
    desc: 'Step-by-step procedures for clearing customs smoothly.',
    icon: '/icons/icon_documentation_1785919613435.jpg',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Export Documentation',
    desc: 'Essential documents required for global shipping.',
    icon: '/icons/icon_policies_1785919575221.jpg',
    color: 'pink'
  },
  {
    id: 3,
    title: 'Quality & Compliance',
    desc: 'Mandatory quality checks and compliance standards.',
    icon: '/icons/icon_process_order_1785919603239.jpg',
    color: 'yellow'
  },
  {
    id: 4,
    title: 'Shipping Regulations',
    desc: 'Rules for packaging, labeling, and freight forwarding.',
    icon: '/icons/icon_tariffs_1785919643320.jpg',
    color: 'orange'
  }
];

const ProceduresRegulations = () => {
  return (
    <main className="eip-main-content">
      <header className="eip-header">
        <div className="eip-header-titles">
          <h1>Export & Import Tariff and Benefits</h1>
          <p>Navigate the complex landscape of international trade compliance and procedures.</p>
        </div>
      </header>

      <div className="eip-cards-grid">
        {proceduresCards.map((card, idx) => {
          const animations = ['eipSlideInFromLeft', 'eipSlideInFromTop', 'eipSlideInFromBottom', 'eipSlideInFromRight'];
          const animName = animations[idx % 4];
          const animDelay = `${Math.floor(idx / 4) * 0.1}s`;

          return (
            <div 
              className="eip-card" 
              key={card.id}
              style={{
                animation: `${animName} 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${animDelay} backwards`
              }}
            >
              <div className="eip-card-icon-wrapper">
                <div className={`eip-icon-bg color-${card.color}`}>
                  <img src={card.icon} alt={card.title} className="eip-card-image" />
                </div>
              </div>
              <div className="eip-card-content">
                <h3>{card.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ProceduresRegulations;
