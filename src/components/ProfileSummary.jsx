import React from 'react';
import { Coins, Gauge, MapPin, Send, TrendingUp, User } from 'lucide-react';
import { profileData } from '../data/exportServices';

const readinessItems = [
  { label: 'ERS', key: 'ers', suffix: '/100', tone: 'amber', Icon: Gauge },
  { label: 'Stage', key: 'stage', suffix: '/8', tone: 'green', Icon: TrendingUp },
  { label: 'Coins', key: 'coins', suffix: '', tone: 'gold', Icon: Coins },
  { label: 'Exports', key: 'exports', suffix: '', tone: 'neutral', Icon: Send },
];

const ProfileSummary = () => {
  return (
    <div className="profile-summary-container">
      <div className="profile-strip">
        <div className="profile-avatar">
          <User size={24} />
        </div>
        <div className="profile-info">
          <span className="profile-kicker">Member readiness</span>
          <h2 className="profile-name">{profileData.name}</h2>
          <p className="profile-location">
            <MapPin size={13} />
            {profileData.location} - {profileData.farm}
          </p>
        </div>
        <div className="profile-tier">{profileData.tier}</div>
      </div>

      <div className="status-chips-grid">
        {readinessItems.map(({ label, key, suffix, tone, Icon }) => {
          const rawValue = profileData[key];
          const value = typeof rawValue === 'number' && key === 'coins'
            ? rawValue.toLocaleString()
            : rawValue;

          return (
            <div className={`status-chip chip-${tone}`} key={label}>
              <div className="chip-icon">
                <Icon size={17} />
              </div>
              <div className="chip-label">{label}</div>
              <div className="chip-value">
                {value}<span className="chip-sub">{suffix}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSummary;
