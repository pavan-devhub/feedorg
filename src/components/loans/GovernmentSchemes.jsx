import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { FinanceIcon } from './FinanceIcon';

const MOA = 'Ministry of Agriculture & Farmers Welfare';
const MOFPI = 'Ministry of Food Processing Industries';
const AP_AGRI = 'Dept. of Agriculture, Govt. of AP';
const AP_HORTI = 'Dept. of Horticulture, Govt. of AP';
const AP_AGRI_URL = 'https://www.apagrisnet.gov.in/';
const AP_HORTI_URL = 'https://horticulture.ap.gov.in/';

// Cards show only the name, status and headline benefit. Ministry, description, tags,
// fine-print notes and the official apply links are kept here so a details view can use them later.
const SCHEMES = {
  'Central Schemes': [
    {
      title: 'PMFME', status: 'Active', ministry: MOFPI,
      desc: 'Support for setting up/expansion of micro food processing units.',
      tags: ['Processing', 'MSME'],
      value: '35%', label: 'Credit-Linked Subsidy', note: 'Up to ₹10 Lakh per unit', badge: 'Capital Subsidy',
      icon: 'Factory', color: 'orange', applyLabel: 'Official Apply', applyUrl: 'https://pmfme.mofpi.gov.in/',
    },
    {
      title: 'PMKSY – Cold Chain', status: 'Active', ministry: MOFPI,
      desc: 'Integrated cold chain and value chain development.',
      tags: ['Infrastructure', 'Cold Chain'],
      value: '35% – 50%', label: 'Grant-in-Aid', note: 'Up to ₹10 Crore per project', badge: 'Capital Subsidy',
      icon: 'Snowflake', color: 'blue', applyLabel: 'Official Apply',
      applyUrl: 'https://www.mofpi.gov.in/Schemes/pradhan-mantri-kisan-sampada-yojana',
    },
    {
      title: 'PMKSY – Micro Irrigation', status: 'Active', ministry: MOA,
      desc: 'Drip and sprinkler irrigation systems.',
      tags: ['Irrigation', 'Water Management'],
      value: '55%', label: 'for Small & Marginal Farmers', note: '(45% for others)',
      icon: 'Droplets', color: 'primary', applyLabel: 'Official Apply', applyUrl: 'https://pdmc.da.gov.in/',
    },
    {
      title: 'Agriculture Infrastructure Fund (AIF)', status: 'Active', ministry: MOA,
      desc: 'Post-harvest management and community farming assets.',
      tags: ['Infrastructure', 'Storage', 'FPO'],
      value: '3%', label: 'Interest Subvention', note: 'on eligible loans', badge: 'Interest Support',
      icon: 'Warehouse', color: 'orange', applyLabel: 'Official Apply', applyUrl: 'https://agriinfra.dac.gov.in/',
    },
    {
      title: 'PM-KISAN', status: 'Active', ministry: MOA,
      desc: 'Direct income support to eligible farmers.',
      tags: ['Farmer Support', 'Income Support'],
      value: '₹6,000', label: 'per year', note: '(₹2,000 × 3 instalments)', badge: 'Direct Benefit',
      icon: 'HandCoins', color: 'primary', applyLabel: 'Official Apply', applyUrl: 'https://pmkisan.gov.in/',
    },
    {
      title: 'RKVY', status: 'Active', ministry: MOA,
      desc: 'Support for agri & allied activities.',
      prefix: 'Up to', value: '50%', label: 'Subsidy',
      icon: 'Wheat', color: 'blue', applyLabel: 'Official Apply', applyUrl: 'https://rkvy.da.gov.in/',
    },
  ],
  'State Schemes': [
    {
      title: 'APMIP – Drip Irrigation', status: 'Active', ministry: AP_AGRI,
      desc: 'Micro irrigation through drip systems.',
      tags: ['Irrigation', 'Water Management'],
      value: '90%', label: 'for Small & Marginal Farmers', note: '(up to 5 acres)', badge: 'State Subsidy',
      icon: 'Droplets', color: 'blue', applyLabel: 'Apply via RBK', applyUrl: AP_AGRI_URL,
    },
    {
      title: 'APMIP – Sprinkler Irrigation', status: 'Active', ministry: AP_AGRI,
      desc: 'Sprinkler irrigation systems.',
      tags: ['Irrigation', 'Water Management'],
      value: '55%', label: 'for Small & Marginal Farmers', note: '(up to 5 acres)', badge: 'State Subsidy',
      icon: 'CloudRain', color: 'primary', applyLabel: 'Apply via RBK', applyUrl: AP_AGRI_URL,
    },
    {
      title: 'Horticulture – Protected Cultivation', status: 'Active', ministry: AP_HORTI,
      desc: 'Polyhouse / Shadenet for high value crops.',
      tags: ['Horticulture', 'Protected Cultivation'],
      value: '50%', label: 'Subsidy', note: 'Up to prescribed limit', badge: 'State Subsidy',
      icon: 'Sprout', color: 'primary', applyLabel: 'Apply via Dept.', applyUrl: AP_HORTI_URL,
    },
    {
      title: 'Farm Mechanisation Support', status: 'Active', ministry: AP_AGRI,
      desc: 'Support for farm machinery and equipment.',
      tags: ['Equipment', 'Mechanisation'],
      value: '50%', label: 'Subsidy', note: 'on eligible equipment', badge: 'State Subsidy',
      icon: 'Tractor', color: 'orange', applyLabel: 'Apply via Dept.', applyUrl: AP_AGRI_URL,
    },
    {
      title: 'Pack House', status: 'Active', ministry: AP_HORTI,
      desc: 'Post-harvest handling and packing infrastructure.',
      tags: ['Post-Harvest', 'Infrastructure'],
      value: '50%', label: 'Subsidy', note: 'Up to ₹2 Lakh per pack house', badge: 'State Subsidy',
      icon: 'Package', color: 'orange', applyLabel: 'Apply via Dept.', applyUrl: AP_HORTI_URL,
    },
    {
      title: 'Supply of Seeds to Farmers', status: 'Active', ministry: 'State Government of AP (State-led)',
      desc: 'Supply of quality seeds to farmers through the State Government.',
      tags: ['Farmers', 'Seed Support'],
      value: '50%', label: 'Subsidy', note: 'State budget 2026-27: ₹240 crore', badge: 'Seed Support',
      icon: 'Wheat', color: 'primary', applyLabel: 'Official Source', applyUrl: AP_AGRI_URL,
    },
  ],
};

const TABS = Object.keys(SCHEMES);

// Accent colour (icon circle + figure) cycles by grid position in CSS: blue / orange / violet / green
const SchemeCard = ({ scheme }) => (
  <article className="finance-scheme-card">
    <div className="finance-scheme-card__top">
      <span className="finance-scheme-card__icon">
        <FinanceIcon name={scheme.icon} size={18} />
      </span>
      {scheme.status && <span className="finance-scheme-card__status">{scheme.status}</span>}
    </div>

    <h3 className="finance-scheme-card__title">{scheme.title}</h3>
    <p className="finance-scheme-card__benefit">
      <strong className="finance-scheme-card__value">
        {scheme.prefix && <span className="finance-scheme-card__prefix">{scheme.prefix}</span>}
        {scheme.value}
      </strong>
      <span className="finance-scheme-card__label">{scheme.label}</span>
    </p>
    {scheme.badge && (
      <div className="finance-scheme-card__tags">
        <span className="finance-scheme-card__badge">{scheme.badge}</span>
      </div>
    )}

    <a href="#" className="finance-scheme-card__view">
      View Details
      <span className="finance-scheme-card__arrow"><FinanceIcon name="ArrowRight" size={16} /></span>
    </a>
  </article>
);

export const GovernmentSchemes = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section id="government-schemes" className="finance-schemes">
      <div className="finance-schemes__panel">
        <SectionHeader
          number="4"
          title="Government Schemes & Subsidies"
          icon="Institution"
          rightElement={
            <a href="#" className="finance-schemes__view-all">
              View All <FinanceIcon name="ArrowRight" size={16} />
            </a>
          }
        />

        {/* Tabs */}
        <div className="finance-schemes__tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={`finance-schemes__tab${activeTab === tab ? ' is-active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scheme Cards for the selected tab */}
        <div className="finance-schemes__grid">
          {SCHEMES[activeTab].map((scheme) => <SchemeCard key={scheme.title} scheme={scheme} />)}
        </div>
      </div>
    </section>
  );
};
