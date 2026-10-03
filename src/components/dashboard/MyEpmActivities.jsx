import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle, ArrowRight, CalendarDays, CheckCircle2, ChevronDown, Clock, HeartHandshake,
  Info, Loader2, MapPin, Megaphone, RefreshCw, XCircle,
} from 'lucide-react';
import { fetchMyEpmActivities } from '../../api/epmApi';
import { getCategoryMeta } from '../../utils/epmCategory';
import { formatEventDateShort, formatTimestampParts } from '../../utils/epmDate';
import { describeUpdate, epmStatusTags } from '../../utils/epmStatus';
import { UPDATE_ICONS } from '../../utils/notifications';
import './MyEpmActivities.css';

// The dashboard's "Status of Activities": the upcoming EPMs the logged-in user registered for or
// volunteers at (past ones aren't sent - see EpmActivityServiceImpl), each with its current status
// and the admin's updates (new date, time, venue, cancellation...), which are shown open. Opened
// from a notification, `focus` is the dashboard's navState - { epmId } - and the EPM's cards are
// opened, scrolled to and briefly highlighted.

const SECTIONS = {
  registrations: {
    type: 'registration',
    icon: CalendarDays,
    title: 'My Registered EPMs',
    subtitle: 'Upcoming EPM events you have registered for, with their latest updates.',
    linkLabel: 'View All EPMs',
    linkPage: 'epm-details',
    empty: "You haven't registered for any upcoming EPM.",
    emptyAction: 'Browse upcoming EPMs',
    updatesTitle: 'Updates for this EPM',
  },
  volunteers: {
    type: 'volunteer',
    icon: HeartHandshake,
    title: 'My Volunteer Registrations',
    subtitle: 'Upcoming volunteer activities you have registered for, with their latest updates.',
    linkLabel: 'Volunteer for an EPM',
    linkPage: 'epm-volunteer',
    empty: "You're not volunteering at any upcoming EPM.",
    emptyAction: 'Become a volunteer',
    updatesTitle: 'Updates for this Activity',
  },
};

/** What the card shows for an item, whether or not the admin has since removed its EPM. */
function viewOf(item) {
  const ev = item.event;
  const city = ev?.city || item.eventCity;
  const title = ev?.title || `${city} EPM`;
  return {
    ev,
    title: city && !title.toLowerCase().includes(city.toLowerCase()) ? `${title} – ${city}` : title,
    date: ev?.eventDate || item.eventDate,
    time: ev?.timeRange || 'Time to be announced',
    place: ev ? [ev.venue, ev.city, ev.state].filter(Boolean).join(', ') : [item.eventCity, item.eventState].filter(Boolean).join(', '),
    img: getCategoryMeta(ev?.category).img,
    updates: ev?.updates || [],
  };
}

/** The big badge next to each card: where the person's sign-up stands. */
function signUpBadge(ev) {
  if (!ev) return { label: 'No longer listed', tone: 'gray', icon: Info };
  if (ev.cancelled) return { label: 'Cancelled', tone: 'red', icon: XCircle };
  return { label: 'Registered', tone: 'green', icon: CheckCircle2 };
}

export default function MyEpmActivities({ user, onNavigate, focus }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // Cards whose updates are showing - every card that has updates starts open.
  const [expanded, setExpanded] = useState(() => new Set());
  // The cards a notification pointed at, highlighted for a few seconds.
  const [highlighted, setHighlighted] = useState(() => new Set());

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    fetchMyEpmActivities()
      .then((result) => {
        setData(result);
        const open = new Set();
        ['registrations', 'volunteers'].forEach((key) => {
          (result[key] || []).forEach((item) => {
            if (item.event?.updates?.length > 0) open.add(`${key}-${item.id}`);
          });
        });
        setExpanded(open);
      })
      .catch((e) => setError(e.message || 'Could not load your activities.'))
      .finally(() => setLoading(false));
  }, []);

  // Each notification click is a new navigation (a new `focus`), so the data is fresh for it too.
  useEffect(() => { load(); }, [load, focus]);

  useEffect(() => {
    if (!data || !focus?.epmId) return undefined;
    const keys = ['registrations', 'volunteers'].flatMap((section) => (data[section] || [])
      .filter((item) => item.epmEventId === focus.epmId)
      .map((item) => `${section}-${item.id}`));
    if (keys.length === 0) return undefined;
    setExpanded((prev) => new Set([...prev, ...keys]));
    setHighlighted(new Set(keys));
    const scroll = setTimeout(() => {
      document.getElementById(`mea-card-${keys[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
    const fade = setTimeout(() => setHighlighted(new Set()), 4000);
    return () => { clearTimeout(scroll); clearTimeout(fade); };
  }, [data, focus]);

  const toggle = (key) => setExpanded((prev) => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ');
  const now = new Date();

  return (
    <div className="mea-page">
      <header className="mea-welcome">
        <div className="mea-welcome-icon" aria-hidden="true"><Megaphone size={22} /></div>
        <div className="mea-welcome-text">
          <h2>Welcome Back{name && <>, <span>{name}</span></>} <span aria-hidden="true">👋</span></h2>
          <p>Here are your upcoming EPMs and volunteer activities with the latest updates.</p>
        </div>
        <div className="mea-today">
          <CalendarDays size={26} />
          <div>
            <small>Today</small>
            <strong>{now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
            <small>{now.toLocaleDateString('en-US', { weekday: 'long' })}</small>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="mea-state"><Loader2 size={20} className="mea-spin" /> Loading your activities…</div>
      ) : error ? (
        <div className="mea-state mea-state-error">
          <AlertCircle size={20} /> {error}
          <button type="button" className="mea-btn-outline" onClick={load}><RefreshCw size={14} /> Try again</button>
        </div>
      ) : (
        Object.entries(SECTIONS).map(([key, config]) => (
          <ActivitySection
            key={key}
            sectionKey={key}
            config={config}
            items={data?.[key] || []}
            expanded={expanded}
            highlighted={highlighted}
            onToggle={toggle}
            onNavigate={onNavigate}
          />
        ))
      )}
    </div>
  );
}

function ActivitySection({ sectionKey, config, items, expanded, highlighted, onToggle, onNavigate }) {
  const Icon = config.icon;
  return (
    <section className={`mea-section mea-section-${config.type}`}>
      <div className="mea-section-head">
        <div className="mea-section-icon"><Icon size={24} /></div>
        <div className="mea-section-text">
          <h3>{config.title}</h3>
          <p>{config.subtitle}</p>
        </div>
        <button type="button" className="mea-link-btn" onClick={() => onNavigate(config.linkPage)}>
          {config.linkLabel} <ArrowRight size={16} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mea-empty">
          <p>{config.empty}</p>
          <button type="button" className="mea-btn-outline" onClick={() => onNavigate(config.linkPage)}>
            {config.emptyAction} <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="mea-cards">
          {items.map((item) => {
            const key = `${sectionKey}-${item.id}`;
            return (
              <ActivityCard key={key} id={`mea-card-${key}`} item={item} config={config} expanded={expanded.has(key)}
                highlighted={highlighted.has(key)} onToggle={() => onToggle(key)} />
            );
          })}
        </div>
      )}
    </section>
  );
}

function ActivityCard({ id, item, config, expanded, highlighted, onToggle }) {
  const view = viewOf(item);
  const badge = signUpBadge(view.ev);
  const BadgeIcon = badge.icon;
  // The status line under the place: "On schedule", "Venue changed"... minus what the badge says.
  const chips = epmStatusTags(view.ev).filter((t) => t.label !== badge.label);

  return (
    <article id={id} className={`mea-card ${expanded ? 'is-open' : ''} ${view.ev?.cancelled ? 'is-cancelled' : ''} ${highlighted ? 'is-highlighted' : ''}`}>
      <div
        className="mea-card-main"
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      >
        <img src={view.img} alt="" className="mea-card-img" loading="lazy" />

        <div className="mea-card-info">
          <h4>{view.title}</h4>
          <div className="mea-card-meta">
            <span><CalendarDays size={16} /> {formatEventDateShort(view.date)}</span>
            <span><Clock size={16} /> {view.time}</span>
          </div>
          <div className="mea-card-meta"><span><MapPin size={16} /> {view.place}</span></div>
          {chips.length > 0 && (
            <div className="mea-chips">
              {chips.map((c) => <span key={c.label} className={`mea-chip mea-tone-${c.tone}`}>{c.label}</span>)}
            </div>
          )}
        </div>

        <div className="mea-card-status">
          <span className={`mea-badge mea-tone-${badge.tone}`}><BadgeIcon size={18} /> {badge.label}</span>
          <small>Registered on<br />{formatEventDateShort(item.registeredAt)}</small>
        </div>

        <span className="mea-chevron" aria-hidden="true"><ChevronDown size={20} /></span>
      </div>

      {expanded && <UpdatesPanel title={config.updatesTitle} view={view} />}
    </article>
  );
}

function UpdatesPanel({ title, view }) {
  return (
    <div className="mea-updates">
      <div className="mea-updates-head">
        <span className="mea-updates-icon"><Megaphone size={22} /></span>
        <div>
          <strong>{title}</strong>
          <small>Latest changes and important information.</small>
        </div>
      </div>

      {view.updates.length === 0 ? (
        <p className="mea-updates-none">
          {view.ev ? 'No changes so far - this EPM will be held as scheduled.' : 'This EPM is no longer listed by the organisers.'}
        </p>
      ) : (
        <ol className="mea-timeline">
          {view.updates.map((u, i) => <UpdateRow key={`${u.field}-${u.createdAt}-${i}`} update={u} />)}
        </ol>
      )}
    </div>
  );
}

function UpdateRow({ update }) {
  const d = describeUpdate(update);
  const Icon = UPDATE_ICONS[update.field] || Info;
  const when = formatTimestampParts(update.createdAt);
  return (
    <li className={`mea-update mea-tone-${d.tone}`}>
      <time className="mea-update-when">{when.date}<br />{when.time}</time>
      <span className="mea-update-dot" aria-hidden="true" />
      <span className="mea-update-icon"><Icon size={18} /></span>
      <span className="mea-update-tag">{d.tag}</span>
      <p className="mea-update-text">
        {d.kind === 'change' ? (
          <>{d.subject} has been changed from {d.from} to <strong>{d.to}</strong>.</>
        ) : d.note}
      </p>
    </li>
  );
}
