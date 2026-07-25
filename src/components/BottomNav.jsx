import React from 'react';
import { Home, Sprout, PackageSearch, ShoppingCart, User } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', hint: 'Start', Icon: Home, color: '#FF006E' },
  { id: 'farm', label: 'Farm', hint: 'Crops', Icon: Sprout, color: '#00F5D4' },
  { id: 'exports', label: 'Exports', hint: 'KYJ', Icon: PackageSearch, color: '#FF9F1C' },
  { id: 'market', label: 'Market', hint: 'Trade', Icon: ShoppingCart, color: '#9B5DE5' },
  { id: 'you', label: 'You', hint: 'Profile', Icon: User, color: '#3A86FF' },
];

const BottomNav = ({ currentPage, onNavigate }) => {
  return (
    <nav className="bottom-nav-menu" aria-label="Primary navigation">
      {navItems.map(({ id, label, hint, Icon, color }) => {
        const isActive = currentPage === id;

        return (
          <button
            key={id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            style={{ '--btn-color': color }}
            onClick={() => onNavigate(id)}
          >
            <span className="nav-icon-wrap">
              <Icon size={21} strokeWidth={2.2} />
            </span>
            <span className="nav-copy">
              <span className="nav-label">{label}</span>
              <span className="nav-hint">{hint}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
