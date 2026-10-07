import React, { useRef } from 'react';
import { ArrowRight, Ban, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { fetchEpmEventsPage } from '../../api/epmApi';
import { LIVE } from '../../api/liveUpdates';
import { formatEventDateParts } from '../../utils/epmDate';
import useLiveUpdates from '../../hooks/useLiveUpdates';
import useServerPagedList from '../../hooks/useServerPagedList';
import ListPager from '../ListPager';
import EpmChangeNotes from './EpmChangeNotes';

const PAGE_SIZE = 5;

// Cancelled ones too: they stay listed, marked cancelled, so people can see they're off.
const fetchUpcomingPage = ({ page, size }) => fetchEpmEventsPage({ status: 'upcoming', includeCancelled: true, page, size });

/**
 * The upcoming-EPM list on the register and volunteer pages, a page at a time from the backend.
 * Each card says what has changed since the EPM was scheduled (rescheduled, new venue or time...);
 * a cancelled EPM is listed but can't be picked. `mine` maps an EPM id to the logged-in user's own
 * sign-ups for it, e.g. ['Registered', 'Volunteering'], shown as a tag on its card. `onPick` gets
 * the picked EPM; `emptyMessage` is shown when there are no upcoming EPMs at all.
 */
export default function EpmEventPicker({ actionLabel, mine, onPick, emptyMessage }) {
  const listRef = useRef(null);
  const { items: events, pager, loading, error, reload } = useServerPagedList(fetchUpcomingPage, PAGE_SIZE);
  // Live: an EPM added, changed, cancelled or removed - or one that passed at midnight - reloads
  // the list. It shows no sign-up counts, so sign-ups don't.
  useLiveUpdates([LIVE.EPM_EVENTS], reload, (update) => update.type !== 'SIGNUPS_CHANGED');

  if (loading && events.length === 0) return <p style={{ color: '#64748b' }}>Loading upcoming EPMs…</p>;
  if (error) return <p className="epm-form-error" style={{ fontSize: '0.95rem' }}>{error}</p>;
  if (events.length === 0) return <p style={{ color: '#64748b' }}>{emptyMessage}</p>;

  return (
    <>
      <div className="epm-events-timeline" ref={listRef}>
        {events.map((epm) => {
          const { day, month, year } = formatEventDateParts(epm.eventDate);
          const signedUp = mine?.get(epm.id) || [];
          const pick = () => { if (!epm.cancelled) onPick(epm); };
          return (
            <div
              key={epm.id}
              className={`epm-event-card ${epm.cancelled ? 'is-cancelled' : ''}`}
              role={epm.cancelled ? undefined : 'button'}
              tabIndex={epm.cancelled ? undefined : 0}
              aria-disabled={epm.cancelled || undefined}
              onClick={pick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } }}
            >
              <div className="epm-event-date-block">
                <span className="epm-date-day">{day}</span>
                <span className="epm-date-month">{month}</span>
                <span className="epm-date-year">{year}</span>
              </div>
              <div className="epm-event-details">
                <h3 className="epm-event-city">{epm.city}</h3>
                <p className="epm-event-state">{epm.title} · {epm.state}</p>
                <div className="epm-event-chips">
                  <span className="epm-event-venue"><MapPin size={14} /> {epm.venue}</span>
                  {epm.timeRange && <span className="epm-event-venue"><Clock size={14} /> {epm.timeRange}</span>}
                  {signedUp.map((label) => (
                    <span key={label} className="epm-mine-chip"><CheckCircle2 size={14} /> You're {label.toLowerCase()}</span>
                  ))}
                </div>
                <EpmChangeNotes event={epm} />
              </div>
              <div className="epm-event-action">
                {epm.cancelled ? (
                  <span className="epm-text-btn is-closed"><Ban size={16} /> Not taking sign-ups</span>
                ) : (
                  <span className="epm-text-btn">{actionLabel} <ArrowRight size={16} /></span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ListPager pager={pager} noun="EPMs" scrollTarget={listRef} />
    </>
  );
}
