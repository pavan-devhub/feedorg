import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatEventDateLong, formatEventDateParts } from '../../utils/epmDate';

// Small building blocks shared by the three EPM gallery pages. Styles: epmGallery.css.

// items: [{ label, onClick? }] - the last item is the current page.
export function Crumbs({ items, light = false }) {
  return (
    <nav className={`epg-crumbs${light ? ' is-light' : ''}`} aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.label}>
            {i < items.length - 1 && item.onClick ? (
              <button type="button" onClick={item.onClick}>{item.label}</button>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// With actions (children) the description sits under the title and the actions take the right;
// without them, the description itself balances the title on the right.
export function SectionHeading({ id, eyebrow, title, description, children }) {
  const desc = description && <p className="epg-section-desc">{description}</p>;
  return (
    <header className="epg-section-head">
      <div className="epg-section-head-main">
        {eyebrow && <span className="epg-eyebrow">{eyebrow}</span>}
        <h2 id={id} className="epg-h2">{title}</h2>
        {children && desc}
      </div>
      {(children || desc) && <div className="epg-section-head-side">{children || desc}</div>}
    </header>
  );
}

// items: [{ label, value }] - falsy entries are skipped so callers can list optional stats inline.
export function Stats({ items, light = false, className = '' }) {
  const visible = items.filter(Boolean);
  if (visible.length === 0) return null;
  return (
    <dl className={`epg-stats${light ? ' is-light' : ''}${className ? ` ${className}` : ''}`}>
      {visible.map((item) => (
        <div key={item.label} className="epg-stat">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StatusMessage({ icon: Icon, title, text, children, headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <div className="epg-message">
      {Icon && <span className="epg-message-icon"><Icon size={26} strokeWidth={1.6} /></span>}
      <Heading className="epg-message-title">{title}</Heading>
      {text && <p className="epg-message-text">{text}</p>}
      {children && <div className="epg-message-actions">{children}</div>}
    </div>
  );
}

// The soonest upcoming EPM for a place, shown on the state and district heroes.
export function NextEpmCard({ event, place, onOpen }) {
  const { day, month } = formatEventDateParts(event.eventDate);
  const meta = [event.city, event.timeRange].filter(Boolean).join(' · ');
  return (
    <button
      type="button"
      className="epg-next"
      onClick={onOpen}
      aria-label={`Next EPM in ${place}: ${event.title}, ${formatEventDateLong(event.eventDate)}. See all upcoming EPMs`}
    >
      <span className="epg-next-date" aria-hidden="true">
        <span>{month}</span>
        <strong>{day}</strong>
      </span>
      <span className="epg-next-body">
        <span className="epg-next-label">Next EPM in {place}</span>
        <span className="epg-next-title">{event.title}</span>
        {meta && <span className="epg-next-meta">{meta}</span>}
      </span>
      <span className="epg-next-go" aria-hidden="true"><ArrowRight size={18} /></span>
    </button>
  );
}
