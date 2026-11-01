import { useState } from 'react';
import './TabsSection.css';
import aboutSvg from '../../assets/icons/about.svg';
import objSvg from '../../assets/icons/obj.svg';
import whySvg from '../../assets/icons/why.svg';
import howSvg from '../../assets/icons/how.svg';

const TABS = [
  {
    id: 'about',
    label: 'About',
    theme: 'orange',
    icon: aboutSvg,
  },
  {
    id: 'objectives',
    label: 'Objectives',
    theme: 'green',
    icon: objSvg,
  },
  {
    id: 'why',
    label: 'Why',
    theme: 'blue',
    icon: whySvg,
  },
  {
    id: 'how',
    label: 'How',
    theme: 'purple',
    icon: howSvg,
  },
];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState('about');

  // Highlight the tab and scroll to its section (sections use the tab ids with an sm- prefix: sm-about, sm-objectives, ...)
  const goToSection = (id) => {
    setActiveTab(id);
    const section = document.getElementById(`sm-${id}`);
    if (!section) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section className="tabs-nav-section" aria-label="Navigation Section">
      <div className="tabs-capsule-container">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          if (isActive) {
            return (
              <button
                key={tab.id}
                type="button"
                className={`tab-btn sm-active active-${tab.theme}`}
                onClick={() => goToSection(tab.id)}
                aria-pressed="true"
              >
                <div className={`tab-active-icon-wrapper sm-${tab.theme}-glow`}>
                  <img
                    src={tab.icon}
                    alt={`${tab.label} icon`}
                    className="tab-icon-svg"
                  />
                </div>
                <span className="tab-label-text">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn inactive inactive-${tab.theme}`}
              onClick={() => goToSection(tab.id)}
              aria-pressed="false"
            >
              <div className={`tab-badge-circle sm-${tab.theme}-badge`}>
                <img
                  src={tab.icon}
                  alt={`${tab.label} icon`}
                  className="tab-icon-svg"
                />
              </div>
              <span className="tab-label-text">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
