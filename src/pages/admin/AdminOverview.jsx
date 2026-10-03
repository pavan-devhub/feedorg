import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard, CalendarDays, History, Users, HeartHandshake, Images, Quote, BookOpen, ArrowRight, Tags,
} from 'lucide-react';
import { fetchAdminEpmOverview, fetchAdminEvents } from '../../api/adminEpmApi';
import { fetchLatestPublication, fetchPublicationYears } from '../../api/publicationsApi';
import { Empty, Loading, SectionHeader } from './adminUi';
import { formatDate } from './adminUtils';

/** Landing page of the admin panel: headline numbers for Feed World and EPM, with shortcuts. */
export default function AdminOverview({ user, onOpenSection }) {
  const [overview, setOverview] = useState(null);
  const [nextEvents, setNextEvents] = useState(null);
  const [feedWorld, setFeedWorld] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminEpmOverview().then(setOverview).catch((e) => setError(e.message));
    fetchAdminEvents({ status: 'upcoming' })
      .then((data) => setNextEvents(data.filter((e) => !e.cancelled).slice(0, 5)))
      .catch(() => setNextEvents([]));
    Promise.all([fetchPublicationYears().catch(() => []), fetchLatestPublication().catch(() => null)])
      .then(([years, latest]) => setFeedWorld({
        issues: years.reduce((sum, y) => sum + (y.count || 0), 0),
        years: years.length,
        latest,
      }));
  }, []);

  const cards = overview ? [
    { label: 'Upcoming EPMs', value: overview.upcomingEvents, icon: CalendarDays, section: 'epm-events', tone: 'green' },
    { label: 'Previous EPMs', value: overview.previousEvents, icon: History, section: 'epm-events', tone: 'slate',
      note: overview.cancelledEvents ? `${overview.cancelledEvents} cancelled` : null },
    { label: 'Registrations', value: overview.registrations, icon: Users, section: 'epm-registrations', tone: 'blue',
      note: `${overview.registrationsToday} today` },
    { label: 'Volunteers', value: overview.volunteers, icon: HeartHandshake, section: 'epm-volunteers', tone: 'orange',
      note: `${overview.volunteersToday} today` },
    { label: 'Images', value: overview.galleryImages, icon: Images, section: 'epm-images', tone: 'purple' },
    { label: 'Reviews', value: overview.reviews, icon: Quote, section: 'epm-reviews', tone: 'amber' },
    { label: 'Categories', value: overview.categories, icon: Tags, section: 'epm-categories', tone: 'teal' },
  ] : [];

  return (
    <>
      <SectionHeader
        eyebrow="ADMIN"
        icon={LayoutDashboard}
        title={`Welcome${user?.firstName ? `, ${user.firstName}` : ''}`}
        description="One place to manage Feed World publications and Export Promotional Meetings."
      />

      {error && <div className="admin-pub-banner error">{error}</div>}

      <h2 className="adm-subhead">EPM</h2>
      {!overview && !error ? <Loading /> : (
        <div className="adm-stat-grid">
          {cards.map((c) => (
            <button key={c.label} type="button" className={`adm-stat adm-tone-${c.tone}`} onClick={() => onOpenSection(c.section)}>
              <span className="adm-stat-icon"><c.icon size={18} /></span>
              <span className="adm-stat-value">{c.value}</span>
              <span className="adm-stat-label">{c.label}</span>
              {c.note && <span className="adm-stat-note">{c.note}</span>}
            </button>
          ))}
        </div>
      )}

      <div className="adm-overview-cols">
        <section className="adm-block">
          <div className="adm-block-head">
            <div><h3>Next EPMs</h3><p>The soonest upcoming meetings and who has signed up.</p></div>
            <button type="button" className="adm-link-btn" onClick={() => onOpenSection('epm-events')}>All EPMs <ArrowRight size={14} /></button>
          </div>
          {nextEvents === null ? <Loading /> : nextEvents.length === 0 ? <Empty>No upcoming EPMs scheduled.</Empty> : (
            <ul className="adm-next-list">
              {nextEvents.map((e) => (
                <li key={e.id}>
                  <span className="adm-next-date">{formatDate(e.eventDate)}</span>
                  <span className="adm-next-title">
                    <strong>{e.title}</strong>
                    <span className="adm-cell-sub">{e.venue}, {e.city}</span>
                  </span>
                  <button type="button" className="adm-count-btn" title="Registrations" onClick={() => onOpenSection('epm-registrations', { eventId: e.id })}>
                    <Users size={13} /> {e.registrationCount ?? 0}
                  </button>
                  <button type="button" className="adm-count-btn" title="Volunteers" onClick={() => onOpenSection('epm-volunteers', { eventId: e.id })}>
                    <HeartHandshake size={13} /> {e.volunteerCount ?? 0}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="adm-block">
          <div className="adm-block-head">
            <div><h3><BookOpen size={16} /> Feed World</h3><p>Monthly publication issues.</p></div>
            <button type="button" className="adm-link-btn" onClick={() => onOpenSection('feedworld')}>Manage <ArrowRight size={14} /></button>
          </div>
          {!feedWorld ? <Loading /> : (
            <div className="adm-fw-summary">
              <div><span className="adm-stat-value">{feedWorld.issues}</span><span className="adm-stat-label">issues across {feedWorld.years} year{feedWorld.years === 1 ? '' : 's'}</span></div>
              <div className="adm-cell-sub">
                {feedWorld.latest ? <>Latest: <strong>{feedWorld.latest.monthName} {feedWorld.latest.year}</strong> ({feedWorld.latest.language})</> : 'No issues uploaded yet.'}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
