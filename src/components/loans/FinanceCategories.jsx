import React from 'react';
import { SectionHeader } from './SectionHeader';
import { FinanceIcon } from './FinanceIcon';
import cropFinance from '../../assets/images/loans-finance/crop-finance.jpg';
import farmEquipment from '../../assets/images/loans-finance/farm-equipment.jpg';
import processing from '../../assets/images/loans-finance/processing-value-addition.jpg';
import exportFinance from '../../assets/images/loans-finance/export-finance.jpg';
import infrastructure from '../../assets/images/loans-finance/infrastructure.jpg';
import workingCapital from '../../assets/images/loans-finance/working-capital.jpg';
import other from '../../assets/images/loans-finance/other.jpg';
import irrigation from '../../assets/images/loans-finance/irrigation.jpg';

// `tag` + `icon` fill the accent chip under the subtitle
const categories = [
  { title: 'Crop Finance', subtitle: 'Seasonal / Term', tag: 'KCC', icon: 'Wheat', color: 'green', image: cropFinance },
  { title: 'Farm Equipment', subtitle: 'Tractor, Tools', tag: 'Machinery', icon: 'Tractor', color: 'orange', image: farmEquipment },
  { title: 'Processing & Value Addition', subtitle: 'Agri processing units', tag: 'Agro units', icon: 'Factory', color: 'purple', image: processing },
  { title: 'Export Finance', subtitle: 'Pre & Post Shipment', tag: 'Export', icon: 'Ship', color: 'blue', image: exportFinance },
  { title: 'Infrastructure', subtitle: 'Cold Storage, Warehouse', tag: 'Storage', icon: 'Warehouse', color: 'blue', image: infrastructure },
  { title: 'Working Capital', subtitle: 'Agri Business', tag: 'Agri biz', icon: 'Coins', color: 'orange', image: workingCapital },
  { title: 'Irrigation & Water Management', subtitle: 'Drip, Sprinkler, Pumps', tag: 'Irrigation', icon: 'Droplets', color: 'blue', image: irrigation },
  { title: 'Personal Loans', subtitle: 'For farmers & families', tag: 'Personal', icon: 'UserRound', color: 'green', image: other },
];

export const FinanceCategories = () => (
  <section id="finance-needs" className="finance-categories">
    <div className="finance-categories__inner">
      <SectionHeader
        number="1"
        title="Explore your finance needs"
        icon="Sprout"
        rightElement={
          <div className="finance-categories__hint">
            <span aria-hidden="true" />
            Choose the category that fits you best
          </div>
        }
      />

      <ul className="finance-category-grid" aria-label="Finance categories">
        {categories.map((cat) => (
          <li key={cat.title} className={`finance-category-card finance-category-card--${cat.color}`}>
            <div className="finance-category-card__media">
              <img className="finance-category-card__image" src={cat.image} alt="" loading="lazy" draggable="false" />
            </div>

            <div className="finance-category-card__body">
              <h3 className="finance-category-card__title">{cat.title}</h3>
              <p className="finance-category-card__subtitle">{cat.subtitle}</p>
              <span className="finance-category-card__tag">
                <FinanceIcon name={cat.icon} size={14} />
                {cat.tag}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
