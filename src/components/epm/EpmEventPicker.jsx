import React, { useRef } from 'react';
import { ArrowRight, Ban, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { formatEventDateParts } from '../../utils/epmDate';
import usePagedList from '../../hooks/usePagedList';
import ListPager from '../ListPager';
import EpmChangeNotes from './EpmChangeNotes';

const PAGE_SIZE = 5;

/**
 * The upcoming-EPM list on the register and volunteer pages, a page at a time. Each card says what
 * has changed since the EPM was scheduled (rescheduled, new venue or time...); a cancelled EPM is
 * listed but can't be picked. `mine` maps an EPM id to the logged-in user's own sign-ups for it,
 * e.g. ['Registered', 'Volunteering'], shown as a tag on its card.
 */
export default function EpmEventPicker({ events, actionLabel, mine, onPick }) {
  const listRef = useRef(null);
  const pager = usePagedList(events, PAGE_SIZE, events.length);

  return (
    <>
      <div className="epm-events-timeline" ref={listRef}>
        {pager.pageItems.map((epm) => {
          const { day, month, year } = formatEventDateParts(epm.eventDate);
          const signedUp = mine?.get(epm.id) || [];
          const pick = () => { if (!epm.cancelled) onPick(epm.id); };
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
