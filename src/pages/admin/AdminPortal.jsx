import React from 'react';
import {
  LayoutDashboard, BookOpen, CalendarDays, Users, HeartHandshake, Tags, MapPin, Images, Quote, ShieldCheck,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useScrollToTop from '../../hooks/useScrollToTop';
import AdminDashboard from './AdminDashboard';
import AdminOverview from './AdminOverview';
import EpmEventsAdmin from './epm/EpmEventsAdmin';
import EpmSubmissionsAdmin from './epm/EpmSubmissionsAdmin';
import EpmCategoriesAdmin from './epm/EpmCategoriesAdmin';
import EpmVenuesAdmin from './epm/EpmVenuesAdmin';
import EpmImagesAdmin from './epm/EpmImagesAdmin';
import EpmReviewsAdmin from './epm/EpmReviewsAdmin';
import './AdminDashboard.css';
import './AdminPortal.css';

const ADMIN_SECTIONS = [
  { group: null, items: [{ id: 'overview', label: 'Overview', icon: LayoutDashboard }] },
  { group: 'Feed World', items: [{ id: 'feedworld', label: 'Publications', icon: BookOpen }] },
  {
    group: 'EPM',
    items: [
      { id: 'epm-events', label: 'EPM Events', icon: CalendarDays },
      { id: 'epm-registrations', label: 'Registrations', icon: Users },
      { id: 'epm-volunteers', label: 'Volunteers', icon: HeartHandshake },
      { id: 'epm-categories', label: 'Categories', icon: Tags },
      { id: 'epm-venues', label: 'Venues', icon: MapPin },
      { id: 'epm-images', label: 'Page & Gallery Images', icon: Images },
      { id: 'epm-reviews', label: 'Reviews', icon: Quote },
    ],
  },
];

const ALL_IDS = ADMIN_SECTIONS.flatMap((g) => g.items.map((i) => i.id));

/**
 * The one admin panel for the whole site - Feed World publications and every EPM screen share a
 * login (the ADMIN role, see SecurityConfig) and this shell. Which section is open lives in the
 * browser history entry (App.jsx's navState), so refresh and back/forward keep it.
 */
export default function AdminPortal({ onNavigate, isLoggedIn, user, onLogout, section, sectionParams }) {
  const current = ALL_IDS.includes(section) ? section : 'overview';
  useScrollToTop(current);

  const openSection = (id, params = {}) => onNavigate('admin-dashboard', { section: id, ...params });

  let content;
  switch (current) {
    case 'feedworld':
      content = <AdminDashboard embedded onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />;
      break;
    case 'epm-events':
      content = <EpmEventsAdmin onOpenSection={openSection} />;
      break;
    case 'epm-registrations':
      content = <EpmSubmissionsAdmin key="registrations" kind="registrations" params={sectionParams} onOpenSection={openSection} />;
      break;
    case 'epm-volunteers':
      content = <EpmSubmissionsAdmin key="volunteers" kind="volunteers" params={sectionParams} onOpenSection={openSection} />;
      break;
    case 'epm-categories':
      content = <EpmCategoriesAdmin onOpenSection={openSection} />;
      break;
    case 'epm-venues':
      content = <EpmVenuesAdmin />;
      break;
    case 'epm-images':
      content = <EpmImagesAdmin />;
      break;
    case 'epm-reviews':
      content = <EpmReviewsAdmin />;
      break;
    default:
      content = <AdminOverview user={user} onOpenSection={openSection} />;
  }

  return (
    <div className="admin-pub-page adm-page">
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="admin-dashboard" />
      <div style={{ height: '86px', flexShrink: 0 }} />

      <div className="adm-shell">
        <aside className="adm-sidebar" aria-label="Admin sections">
          <div className="adm-sidebar-title"><ShieldCheck size={16} /> Admin panel</div>
          <nav>
            {ADMIN_SECTIONS.map((group) => (
              <div key={group.group || 'general'} className="adm-nav-group">
                {group.group && <div className="adm-nav-group-label">{group.group}</div>}
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`adm-nav-item ${current === item.id ? 'active' : ''}`}
                    aria-current={current === item.id ? 'page' : undefined}
                    onClick={() => openSection(item.id)}
                  >
                    <item.icon size={16} /> <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <main className="adm-main">{content}</main>
      </div>

      <Footer />
    </div>
  );
}
