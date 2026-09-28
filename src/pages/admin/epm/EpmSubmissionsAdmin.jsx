import React, { useEffect, useMemo, useState } from 'react';
import { Users, HeartHandshake, Search, Download, X, CalendarDays, Clock } from 'lucide-react';
import { fetchAdminEvents, fetchAdminRegistrations, fetchAdminVolunteers } from '../../../api/adminEpmApi';
import { Empty, Loading, SectionHeader } from '../adminUi';
import { downloadCsv, formatDate, formatDateTime, todayIso } from '../adminUtils';

// One screen for both submission types - they share filters and layout and differ only in the
// columns each form collects (participant type vs. experience/reason).
const KINDS = {
  registrations: {
    eyebrow: 'EPM',
    icon: Users,
    title: 'EPM Registrations',
    noun: 'registration',
    description: 'People who registered to attend an EPM. Pick a date to see everyone registered for the EPMs held that day, or the people who signed up on that day.',
    fetch: fetchAdminRegistrations,
    extraColumns: [
      { label: 'Participant type', value: (r) => r.participantType },
      { label: 'Consent', value: (r) => (r.consent ? 'Yes' : 'No') },
    ],
  },
  volunteers: {
    eyebrow: 'EPM',
    icon: HeartHandshake,
    title: 'EPM Volunteers',
    noun: 'volunteer',
    description: 'People who offered to volunteer at an EPM. Pick a date to see the volunteers for the EPMs held that day, or the people who applied on that day.',
    fetch: fetchAdminVolunteers,
    extraColumns: [
      { label: 'Background', value: (r) => r.experience },
      { label: 'Why they want to volunteer', value: (r) => r.reason },
    ],
  },
};

export default function EpmSubmissionsAdmin({ kind, params, onOpenSection }) {
  const config = KINDS[kind];
  const [events, setEvents] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [eventId, setEventId] = useState(params?.eventId ? String(params.eventId) : '');
  const [dateMode, setDateMode] = useState('eventDate'); // 'eventDate' | 'submittedOn'
  const [date, setDate] = useState('');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => { setEventId(params?.eventId ? String(params.eventId) : ''); }, [params?.eventId]);

  useEffect(() => {
    fetchAdminEvents({ status: 'all' }).then(setEvents).catch(() => setEvents([]));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    config.fetch({
      eventId: eventId || undefined,
      eventDate: dateMode === 'eventDate' ? date : undefined,
      submittedOn: dateMode === 'submittedOn' ? date : undefined,
      q: debouncedQuery,
    })
      .then((data) => { if (!cancelled) setRows(data); })
      .catch((e) => { if (!cancelled) { setError(e.message); setRows([]); } })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [config, eventId, dateMode, date, debouncedQuery]);

  const eventsById = useMemo(() => new Map(events.map((e) => [e.id, e])), [events]);

  // The event dropdown follows the date filter, so picking a date narrows it to that day's EPMs.
  const eventChoices = useMemo(() => {
    const list = dateMode === 'eventDate' && date ? events.filter((e) => e.eventDate === date) : events;
    return [...list].sort((a, b) => b.eventDate.localeCompare(a.eventDate));
  }, [events, dateMode, date]);

  // Dates that actually have an EPM, for the quick-pick chips (nearest first).
  const eventDates = useMemo(() => {
    const today = todayIso();
    const dates = Array.from(new Set(events.filter((e) => !e.cancelled).map((e) => e.eventDate)));
    const upcoming = dates.filter((d) => d >= today).sort();
    const past = dates.filter((d) => d < today).sort().reverse();
    return [...upcoming.slice(0, 4), ...past.slice(0, 3)];
  }, [events]);

  const describeEvent = (r) => {
    const e = eventsById.get(r.epmEventId);
    return e ? `${e.title} — ${e.city}` : `${r.eventCity}, ${r.eventState} (EPM removed)`;
  };

  const selectedEvent = eventId ? eventsById.get(Number(eventId)) : null;
  const filtersActive = eventId || date || query;

  const summary = (() => {
    const n = `${rows.length} ${config.noun}${rows.length === 1 ? '' : 's'}`;
    if (selectedEvent) return `${n} for ${selectedEvent.title} in ${selectedEvent.city} on ${formatDate(selectedEvent.eventDate)}`;
    if (date && dateMode === 'eventDate') return `${n} for EPMs held on ${formatDate(date)}`;
    if (date) return `${n} submitted on ${formatDate(date)}`;
    return `${n} in total`;
  })();

  const exportCsv = () => {
    const columns = [
      { label: 'Name', value: (r) => r.fullName },
      { label: 'Mobile', value: (r) => r.mobileNumber },
      { label: 'Email', value: (r) => r.email },
      { label: 'District', value: (r) => r.district },
      { label: 'State', value: (r) => r.state },
      ...config.extraColumns,
      { label: 'EPM', value: describeEvent },
      { label: 'EPM date', value: (r) => r.eventDate },
      { label: 'Submitted at', value: (r) => (r.createdAt || '').replace('T', ' ').slice(0, 16) },
    ];
    const suffix = selectedEvent ? `-epm-${selectedEvent.id}` : date ? `-${dateMode === 'eventDate' ? 'epm' : 'submitted'}-${date}` : '';
    downloadCsv(`epm-${kind}${suffix}.csv`, columns, rows);
  };

  return (
    <>
      <SectionHeader eyebrow={config.eyebrow} icon={config.icon} title={config.title} description={config.description}>
        <button type="button" className="admin-pub-btn adm-btn-secondary" onClick={exportCsv} disabled={rows.length === 0}>
          <Download size={16} /> Export CSV
        </button>
      </SectionHeader>

      <div className="adm-filters">
        <div className="adm-filter adm-filter-auto">
          <span>Date is the…</span>
          <div className="adm-segmented" role="radiogroup">
            <button type="button" role="radio" aria-checked={dateMode === 'eventDate'} className={dateMode === 'eventDate' ? 'active' : ''}
              onClick={() => setDateMode('eventDate')}><CalendarDays size={13} /> EPM date</button>
            <button type="button" role="radio" aria-checked={dateMode === 'submittedOn'} className={dateMode === 'submittedOn' ? 'active' : ''}
              onClick={() => { setDateMode('submittedOn'); }}><Clock size={13} /> Signed-up date</button>
          </div>
        </div>
        <label className="adm-filter">
          <span>Date</span>
          <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setEventId(''); }} />
        </label>
        <label className="adm-filter adm-filter-wide">
          <span>EPM</span>
          <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
            <option value="">{dateMode === 'eventDate' && date ? `All EPMs on ${formatDate(date)}` : 'All EPMs'}</option>
            {eventChoices.map((e) => (
              <option key={e.id} value={e.id}>{formatDate(e.eventDate)} · {e.title} — {e.city}{e.cancelled ? ' (cancelled)' : ''}</option>
            ))}
          </select>
        </label>
        <label className="adm-filter adm-filter-search">
          <span>Search</span>
          <div className="adm-input-icon">
            <Search size={15} />
            <input type="search" placeholder="Name, mobile, email, district…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </label>
        {filtersActive && (
          <button type="button" className="adm-link-btn" onClick={() => { setEventId(''); setDate(''); setQuery(''); }}>
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {dateMode === 'eventDate' && eventDates.length > 0 && (
        <div className="adm-chips" aria-label="Dates with EPMs">
          <span className="adm-chips-label">EPM dates:</span>
          {eventDates.map((d) => (
            <button key={d} type="button" className={`adm-chip ${date === d ? 'active' : ''}`} onClick={() => { setDate(date === d ? '' : d); setEventId(''); }}>
              {formatDate(d)}{d === todayIso() ? ' (today)' : ''}
            </button>
          ))}
        </div>
      )}

      {error && <div className="admin-pub-banner error">{error}</div>}

      <div className="admin-pub-table-wrap">
        {loading ? <Loading label={`Loading ${config.noun}s…`} /> : rows.length === 0 ? (
          <Empty>{filtersActive ? `No ${config.noun}s match these filters.` : `No ${config.noun}s yet.`}</Empty>
        ) : (
          <>
            <div className="adm-table-caption">{summary}</div>
            <table className="admin-pub-table adm-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>From</th>
                  {kind === 'registrations' ? <th>Participant</th> : <th>Background</th>}
                  <th>EPM</th>
                  <th>Signed up</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td data-label="Name"><strong>{r.fullName}</strong></td>
                    <td data-label="Contact">
                      <div><a href={`tel:${r.mobileNumber}`} className="adm-plain-link">{r.mobileNumber}</a></div>
                      {r.email && <div className="adm-cell-sub"><a href={`mailto:${r.email}`} className="adm-plain-link">{r.email}</a></div>}
                    </td>
                    <td data-label="From">
                      <div>{r.district}</div>
                      <div className="adm-cell-sub">{r.state}</div>
                    </td>
                    {kind === 'registrations' ? (
                      <td data-label="Participant">{r.participantType}</td>
                    ) : (
                      <td data-label="Background">
                        <div>{r.experience}</div>
                        {r.reason && <div className="adm-cell-sub adm-clamp" title={r.reason}>{r.reason}</div>}
                      </td>
                    )}
                    <td data-label="EPM">
                      <button type="button" className="adm-inline-link adm-left" onClick={() => setEventId(String(r.epmEventId))}
                        title="Show everyone for this EPM" disabled={!eventsById.get(r.epmEventId)}>
                        {describeEvent(r)}
                      </button>
                      <div className="adm-cell-sub">{formatDate(r.eventDate)}</div>
                    </td>
                    <td data-label="Signed up" className="adm-nowrap">{formatDateTime(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {selectedEvent && (
        <p className="admin-pub-hint adm-footnote">
          Viewing one EPM.{' '}
          <button type="button" className="adm-inline-link" onClick={() => onOpenSection('epm-events')}>Back to EPM events</button>
        </p>
      )}
    </>
  );
}
