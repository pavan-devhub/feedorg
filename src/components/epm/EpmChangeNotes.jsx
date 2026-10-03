import React from 'react';
import { Ban, CalendarClock, Clock, FileText, MapPin } from 'lucide-react';
import { epmChangeNotes, lastUpdatedAt } from '../../utils/epmStatus';
import { timeAgo } from '../../utils/notifications';
import './EpmChangeNotes.css';

const ICONS = {
  date: CalendarClock,
  time: Clock,
  state: MapPin,
  district: MapPin,
  city: MapPin,
  venue: MapPin,
  description: FileText,
  cancelled: Ban,
};

/**
 * What the admin has changed about an upcoming EPM - "Rescheduled · was 10 Oct 2026", "Venue
 * changed · was Town Hall", "Cancelled" with the reason - for everyone browsing the EPM lists,
 * signed up or not. Renders nothing for an EPM that is going ahead as first scheduled.
 */
export default function EpmChangeNotes({ event, compact = false }) {
  const notes = epmChangeNotes(event);
  if (notes.length === 0) return null;
  const updatedAt = lastUpdatedAt(event);
  return (
    <div className={`ecn ${compact ? 'is-compact' : ''}`}>
      <ul className="ecn-list">
        {notes.map((n) => {
          const Icon = ICONS[n.key] || FileText;
          return (
            <li key={n.key} className={`ecn-note ecn-tone-${n.tone}`}>
              <Icon size={13} aria-hidden="true" />
              <span className="ecn-label">{n.label}</span>
              {n.was && <span className="ecn-was">· was <s>{n.was}</s></span>}
            </li>
          );
        })}
      </ul>
      {notes[0].reason && <p className="ecn-reason">Reason: {notes[0].reason}</p>}
      {updatedAt && <small className="ecn-when">Updated {timeAgo(updatedAt)}</small>}
    </div>
  );
}
