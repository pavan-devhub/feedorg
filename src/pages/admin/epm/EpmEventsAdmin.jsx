import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CalendarDays, History, Plus, Pencil, Trash2, Search, X, Users, HeartHandshake, Ban, MapPin, RotateCcw, BellRing, Eye, Lock,
} from 'lucide-react';
import {
  fetchAdminEvents, createAdminEvent, updateAdminEvent, deleteAdminEvent, fetchAdminEventLocations,
  cancelAdminEvent, restoreAdminEvent, fetchAdminCategories,
} from '../../../api/adminEpmApi';
import {
  Banner, ConfirmDialog, Empty, EpmStatusTags, FormActions, FormError, Loading, Modal, Pagination, SectionHeader,
} from '../adminUi';
import { MONTH_NAMES, formatDate, formatDateTime, todayIso, useBanner, usePagination } from '../adminUtils';
import { describeUpdate } from '../../../utils/epmStatus';

const EMPTY_FILTERS = { q: '', month: '', state: '', district: '', city: '', category: '' };

// "10:00 AM - 02:00 PM" <-> { start: "10:00", end: "14:00" }. Events store the display text only
// (see EpmEvent#timeRange); the form edits it with two time pickers.
function parseTimeRange(text) {
  const m = /^\s*(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)\s*$/i.exec(text || '');
  if (!m) return { start: '', end: '' };
  const to24 = (h, min, ap) => {
    let hour = Number(h) % 12;
    if (ap.toUpperCase() === 'PM') hour += 12;
    return `${String(hour).padStart(2, '0')}:${min}`;
  };
  return { start: to24(m[1], m[2], m[3]), end: to24(m[4], m[5], m[6]) };
}

function formatTime(hhmm) {
  const [h, min] = hhmm.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')} ${ap}`;
}

function formatTimeRange(start, end) {
  if (start && end) return `${formatTime(start)} - ${formatTime(end)}`;
  if (start) return formatTime(start);
  return '';
}

const uniqueSorted = (values) => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));

const sameText = (a, b) => (a || '').trim().toLowerCase() === (b || '').trim().toLowerCase();

// Like uniqueSorted, but "Telangana" and "telangana" only show up once.
function uniqueSuggestions(values) {
  const byKey = new Map();
  values.filter(Boolean).forEach((v) => {
    const key = v.trim().toLowerCase();
    if (!byKey.has(key)) byKey.set(key, v.trim());
  });
  return Array.from(byKey.values()).sort((a, b) => a.localeCompare(b));
}

const signedUpCount = (e) => (e.registrationCount ?? 0) + (e.volunteerCount ?? 0);

export default function EpmEventsAdmin({ onOpenSection }) {
  const [tab, setTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [editing, setEditing] = useState(null); // null | { mode: 'create' | 'edit', event? }
  const [viewing, setViewing] = useState(null); // a previous EPM, shown read-only
  const [deleting, setDeleting] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [restoring, setRestoring] = useState(null);
  const [banner, showBanner] = useBanner();

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      setEvents(await fetchAdminEvents({ status: tab }));
    } catch (e) {
      setLoadError(e.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  const loadLookups = useCallback(() => {
    fetchAdminCategories().then(setCategories).catch(() => setCategories([]));
    fetchAdminEventLocations().then(setLocations).catch(() => setLocations([]));
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { loadLookups(); }, [loadLookups]);
  useEffect(() => { setFilters(EMPTY_FILTERS); }, [tab]);

  // Filter options come from the events in this tab, same as the public EPM directory's filters.
  const stateOptions = useMemo(() => uniqueSorted(events.map((e) => e.state)), [events]);
  const districtOptions = useMemo(
    () => uniqueSorted(events.filter((e) => !filters.state || e.state === filters.state).map((e) => e.district)),
    [events, filters.state]
  );
  const cityOptions = useMemo(
    () => uniqueSorted(events
      .filter((e) => (!filters.state || e.state === filters.state) && (!filters.district || e.district === filters.district))
      .map((e) => e.city)),
    [events, filters.state, filters.district]
  );

  const visible = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return events.filter((e) => {
      if (q && ![e.title, e.city, e.district, e.state, e.venue, e.category].some((v) => v && v.toLowerCase().includes(q))) return false;
      if (filters.month && Number(e.eventDate.slice(5, 7)) !== Number(filters.month)) return false;
      if (filters.state && e.state !== filters.state) return false;
      if (filters.district && e.district !== filters.district) return false;
      if (filters.city && e.city !== filters.city) return false;
      if (filters.category && e.category !== filters.category) return false;
      return true;
    });
  }, [events, filters]);
  const pager = usePagination(visible, `${tab}|${JSON.stringify(filters)}`);

  const filtersActive = Object.values(filters).some(Boolean);
  const categoryColor = (name) => categories.find((c) => c.name === name)?.color || 'gray';

  const afterSave = (saved, mode) => {
    setEditing(null);
    const movedTab = saved.upcoming ? 'upcoming' : 'previous';
    showBanner('success', `${mode === 'create' ? 'Added' : 'Saved'} "${saved.title}" on ${formatDate(saved.eventDate)}${movedTab !== tab ? ` - it is listed under ${movedTab === 'upcoming' ? 'Upcoming' : 'Previous'} EPMs` : ''}.`);
    load();
    loadLookups();
  };

  return (
    <>
      <SectionHeader
        eyebrow="EPM"
        icon={CalendarDays}
        title="EPM Events"
        description="Add, edit, cancel or remove upcoming Export Promotional Meetings. An EPM moves to Previous on its own once its date has passed, and is then kept as a record - it can be viewed but no longer edited or cancelled."
      >
        <button type="button" className="admin-pub-btn primary" onClick={() => setEditing({ mode: 'create' })}>
          <Plus size={16} /> {tab === 'upcoming' ? 'Add upcoming EPM' : 'Add previous EPM'}
        </button>
      </SectionHeader>

      <Banner banner={banner} />

      <div className="adm-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === 'upcoming'} className={`adm-tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>
          <CalendarDays size={15} /> Upcoming
        </button>
        <button type="button" role="tab" aria-selected={tab === 'previous'} className={`adm-tab ${tab === 'previous' ? 'active' : ''}`} onClick={() => setTab('previous')}>
          <History size={15} /> Previous
        </button>
      </div>

      <div className="adm-filters">
        <label className="adm-filter adm-filter-search">
          <span>Search EPMs</span>
          <div className="adm-input-icon">
            <Search size={15} />
            <input type="search" placeholder="Title, place, venue or category…" value={filters.q}
              onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} />
          </div>
        </label>
        <label className="adm-filter">
          <span>Month</span>
          <select value={filters.month} onChange={(e) => setFilters((f) => ({ ...f, month: e.target.value }))}>
            <option value="">All Months</option>
            {MONTH_NAMES.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </label>
        <label className="adm-filter">
          <span>State</span>
          <select value={filters.state} onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value, district: '', city: '' }))}>
            <option value="">All States</option>
            {stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="adm-filter">
          <span>District</span>
          <select value={filters.district} onChange={(e) => setFilters((f) => ({ ...f, district: e.target.value, city: '' }))}>
            <option value="">All Districts</option>
            {districtOptions.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <label className="adm-filter">
          <span>Place</span>
          <select value={filters.city} onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}>
            <option value="">All Places</option>
            {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="adm-filter">
          <span>Category</span>
          <select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </label>
        {filtersActive && (
          <button type="button" className="adm-link-btn" onClick={() => setFilters(EMPTY_FILTERS)}><X size={14} /> Clear</button>
        )}
      </div>

      {loadError && <div className="admin-pub-banner error">{loadError}</div>}

      <div className="admin-pub-table-wrap">
        {loading ? <Loading label="Loading EPMs…" /> : visible.length === 0 ? (
          <Empty>
            {filtersActive ? 'No EPMs match these filters.' : tab === 'upcoming' ? 'No upcoming EPMs yet - add the next one.' : 'No previous EPMs recorded.'}
          </Empty>
        ) : (
          <>
            <div className="adm-table-caption">{visible.length} {visible.length === 1 ? 'EPM' : 'EPMs'}{filtersActive ? ` of ${events.length}` : ''}</div>
            <table className="admin-pub-table adm-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>EPM</th>
                  <th>Place</th>
                  <th>Venue & time</th>
                  <th>Status</th>
                  <th className="adm-num">Registered</th>
                  <th className="adm-num">Volunteers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pager.pageItems.map((e) => (
                  <tr key={e.id} className={e.cancelled ? 'adm-row-muted' : undefined}>
                    <td data-label="Date" className="adm-nowrap"><strong>{formatDate(e.eventDate)}</strong></td>
                    <td data-label="EPM">
                      <div className="adm-cell-title">{e.title}</div>
                      <div className="adm-cell-tags">
                        <span className={`adm-tag adm-tag-${categoryColor(e.category)}`}>{e.category || 'No category'}</span>
                      </div>
                    </td>
                    <td data-label="Place">
                      <div>{e.city}</div>
                      <div className="adm-cell-sub">{e.district}, {e.state}</div>
                    </td>
                    <td data-label="Venue & time">
                      <div>{e.venue}</div>
                      <div className="adm-cell-sub">{e.timeRange || 'Time to be announced'}</div>
                    </td>
                    <td data-label="Status"><EpmStatusTags event={e} /></td>
                    <td data-label="Registered" className="adm-num">
                      <button type="button" className="adm-count-btn" title="View registrations"
                        onClick={() => onOpenSection('epm-registrations', { eventId: e.id })}>
                        <Users size={13} /> {e.registrationCount ?? 0}
                      </button>
                    </td>
                    <td data-label="Volunteers" className="adm-num">
                      <button type="button" className="adm-count-btn" title="View volunteers"
                        onClick={() => onOpenSection('epm-volunteers', { eventId: e.id })}>
                        <HeartHandshake size={13} /> {e.volunteerCount ?? 0}
                      </button>
                    </td>
                    <td className="admin-pub-actions" data-label="Actions">
                      {e.upcoming ? (
                        <button type="button" className="admin-pub-icon-btn" title="Edit" onClick={() => setEditing({ mode: 'edit', event: e })}>
                          <Pencil size={15} />
                        </button>
                      ) : (
                        <button type="button" className="admin-pub-icon-btn" title="View (previous EPMs can't be edited)" onClick={() => setViewing(e)}>
                          <Eye size={15} />
                        </button>
                      )}
                      <button type="button" className="admin-pub-icon-btn danger" title="Delete" onClick={() => setDeleting(e)}>
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination pager={pager} noun="EPMs" />
          </>
        )}
      </div>

      {editing && (
        <EventFormModal
          mode={editing.mode}
          event={editing.event}
          defaultPast={tab === 'previous'}
          categories={categories}
          locations={locations}
          onClose={() => setEditing(null)}
          onSaved={(saved) => afterSave(saved, editing.mode)}
          onCancelEvent={() => { setCancelling(editing.event); setEditing(null); }}
          onRestoreEvent={() => { setRestoring(editing.event); setEditing(null); }}
        />
      )}

      {viewing && <EventDetailsModal event={viewing} categoryColor={categoryColor(viewing.category)} onClose={() => setViewing(null)} />}

      {cancelling && (
        <CancelEventDialog
          event={cancelling}
          onClose={() => setCancelling(null)}
          onCancelled={(saved) => {
            setCancelling(null);
            showBanner('success', `Cancelled "${saved.title}" on ${formatDate(saved.eventDate)}. Everyone signed up has been notified, and the EPM lists show it as cancelled.`);
            load();
          }}
        />
      )}

      {restoring && (
        <ConfirmDialog
          title="Reinstate EPM?"
          icon={RotateCcw}
          danger={false}
          confirmLabel="Reinstate EPM"
          busyLabel="Reinstating…"
          onCancel={() => setRestoring(null)}
          onConfirm={async () => {
            const saved = await restoreAdminEvent(restoring.id);
            showBanner('success', `"${saved.title}" is back on for ${formatDate(saved.eventDate)}.`);
            setRestoring(null);
            load();
          }}
        >
          <p>Put <strong>{restoring.title}</strong> on {formatDate(restoring.eventDate)} in {restoring.city} back on?</p>
          <p className="admin-pub-hint">It opens for sign-ups again on the public EPM pages, and everyone signed up is notified that it will be held as scheduled.</p>
        </ConfirmDialog>
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete EPM?"
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteAdminEvent(deleting.id);
            showBanner('success', `Deleted "${deleting.title}".`);
            setDeleting(null);
            load();
          }}
        >
          <p>Delete <strong>{deleting.title}</strong> on {formatDate(deleting.eventDate)} in {deleting.city}?</p>
          {(deleting.registrationCount > 0 || deleting.volunteerCount > 0) && (
            <p className="admin-pub-hint">
              Its {deleting.registrationCount} registration(s) and {deleting.volunteerCount} volunteer(s) are kept and stay
              visible under Registrations / Volunteers.
            </p>
          )}
          {!deleting.cancelled && deleting.upcoming && signedUpCount(deleting) > 0 && (
            <p className="admin-pub-hint">
              To call off the meeting and let the people signed up know, edit it and use “Cancel EPM” instead - deleting it
              sends them no notification.
            </p>
          )}
        </ConfirmDialog>
      )}
    </>
  );
}

/** A previous EPM, read-only: it happened (or was called off), so it's kept exactly as it was. */
function EventDetailsModal({ event, categoryColor, onClose }) {
  const rows = [
    ['Date', formatDate(event.eventDate)],
    ['Time', event.timeRange || 'Time to be announced'],
    ['Venue', event.venue],
    ['Place', `${event.city}, ${event.district}, ${event.state}`],
    ['Registered', event.registrationCount ?? 0],
    ['Volunteers', event.volunteerCount ?? 0],
  ];
  const updates = event.updates || [];
  return (
    <Modal title="Previous EPM" icon={History} onClose={onClose} size="medium">
      <div className="admin-pub-form">
        <div>
          <div className="adm-cell-title">{event.title}</div>
          <div className="adm-cell-tags">
            <span className={`adm-tag adm-tag-${categoryColor}`}>{event.category || 'No category'}</span>
            <EpmStatusTags event={event} />
          </div>
        </div>
        <dl className="adm-details">
          {rows.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        {event.description && <p className="adm-details-text">{event.description}</p>}
        {updates.length > 0 && (
          <div className="adm-fieldset">
            <div className="adm-fieldset-head"><span><History size={14} /> Changes made before it was held</span></div>
            <ul className="adm-update-log">
              {updates.map((u, i) => {
                const d = describeUpdate(u);
                return (
                  <li key={`${u.field}-${u.createdAt}-${i}`}>
                    <strong>{d.tag}</strong>{' '}
                    {d.kind === 'change' ? <>from {d.from} to {d.to}</> : d.note}
                    <span className="adm-cell-sub"> · {formatDateTime(u.createdAt)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <p className="admin-pub-hint adm-hint-tight">
          <Lock size={13} /> Previous EPMs are kept as a record - they can't be edited or cancelled.
        </p>
        <div className="admin-pub-form-actions">
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
}

/** Shown under a field the admin has changed while editing: its saved value, in red. */
function PreviousValue({ children }) {
  return <span className="adm-prev-value"><span>Previous:</span> <s>{children}</s></span>;
}

const PLACE_FIELDS = ['state', 'district', 'city', 'venue'];

function EventFormModal({ mode, event, defaultPast, categories, locations, onClose, onSaved, onCancelEvent, onRestoreEvent }) {
  const initialTimes = parseTimeRange(event?.timeRange);
  const [form, setForm] = useState(() => ({
    title: event?.title || '',
    category: event?.category || categories[0]?.name || '',
    state: event?.state || '',
    district: event?.district || '',
    city: event?.city || '',
    venue: event?.venue || '',
    eventDate: event?.eventDate || (defaultPast ? '' : todayIso()),
    startTime: initialTimes.start,
    endTime: initialTimes.end,
    description: event?.description || '',
  }));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const keptTimeText = event?.timeRange && !initialTimes.start ? event.timeRange : '';
  const timeRange = formatTimeRange(form.startTime, form.endTime) || keptTimeText;

  // Each place field suggests what's been entered before (any EPM, upcoming or previous, or the
  // venue list), narrowed to the fields already filled in above it.
  const within = (fields) => locations.filter((l) => fields.every((f) => !form[f].trim() || sameText(l[f], form[f])));
  const stateList = uniqueSuggestions(locations.map((l) => l.state));
  const districtList = uniqueSuggestions(within(['state']).map((l) => l.district));
  const cityList = uniqueSuggestions(within(['state', 'district']).map((l) => l.city));
  const venueList = uniqueSuggestions(within(['state', 'district', 'city']).map((l) => l.venue));

  // While editing, a field that no longer matches the saved EPM turns green with its saved value
  // underneath in red. Compared the way the backend logs changes (EpmEventChanges): place names
  // ignoring case, everything else exactly. These are the updates people signed up get to see.
  const saved = mode === 'edit' ? {
    eventDate: event.eventDate || '',
    time: event.timeRange || '',
    state: event.state || '',
    district: event.district || '',
    city: event.city || '',
    venue: event.venue || '',
    description: event.description || '',
  } : null;
  const current = { ...form, time: timeRange };
  const changed = (field) => {
    if (!saved) return false;
    const before = saved[field].trim();
    const after = (current[field] || '').trim();
    return PLACE_FIELDS.includes(field) ? before.toLowerCase() !== after.toLowerCase() : before !== after;
  };
  const changedFields = Object.keys(saved || {}).filter(changed);
  const mark = (field) => (changed(field) ? 'adm-input-changed' : undefined);
  const previous = (field, empty = 'Not set') => changed(field) && <PreviousValue>{saved[field] || empty}</PreviousValue>;
  const unsaved = changedFields.length > 0 || (saved && (form.title !== event.title || form.category !== (event.category || '')));

  const isPast = form.eventDate && form.eventDate < todayIso();
  // Only upcoming EPMs reach this form for editing, and they can't be moved to a passed date
  // (the backend refuses it too) - a new EPM can be backdated to record a previous one.
  const minDate = mode === 'edit' ? todayIso() : undefined;

  const submit = async (e) => {
    e.preventDefault();
    if (form.startTime && form.endTime && form.endTime <= form.startTime) {
      setError('The end time must be after the start time.');
      return;
    }
    setBusy(true);
    setError('');
    const payload = {
      title: form.title,
      category: form.category,
      state: form.state,
      district: form.district,
      city: form.city,
      venue: form.venue,
      eventDate: form.eventDate,
      timeRange,
      description: form.description,
    };
    try {
      onSaved(mode === 'create' ? await createAdminEvent(payload) : await updateAdminEvent(event.id, payload));
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title={mode === 'create' ? 'Add EPM' : `Edit EPM`} icon={mode === 'create' ? Plus : Pencil} onClose={onClose} busy={busy} size="medium">
      <form className="admin-pub-form" onSubmit={submit}>
        <FormError message={error} />
        <label>
          Title
          <input type="text" value={form.title} onChange={set('title')} required maxLength={255} placeholder="e.g. Buyer-Seller Meet" />
        </label>

        <div className="admin-pub-form-row">
          <label>
            Category
            <select value={form.category} onChange={set('category')} required>
              {categories.length === 0 && <option value="">No categories yet</option>}
              {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </label>
          <label>
            Date
            <input type="date" className={mark('eventDate')} value={form.eventDate} onChange={set('eventDate')} min={minDate} required />
            {changed('eventDate') && <PreviousValue>{formatDate(saved.eventDate)}</PreviousValue>}
          </label>
        </div>
        {isPast && (
          <p className="admin-pub-hint adm-hint-tight">
            <Lock size={13} /> This date has passed, so the EPM will be listed under <strong>Previous</strong> - and previous EPMs
            can't be edited or cancelled once saved, so check the details first.
          </p>
        )}

        <div className="adm-fieldset">
          <div className="adm-fieldset-head">
            <span><MapPin size={14} /> Location</span>
          </div>
          <div className="admin-pub-form-row">
            <label>
              State
              <input type="text" list="adm-ev-states" className={mark('state')} value={form.state} onChange={set('state')} required maxLength={255} autoComplete="off" />
              {previous('state')}
            </label>
            <label>
              District
              <input type="text" list="adm-ev-districts" className={mark('district')} value={form.district} onChange={set('district')} required maxLength={255} autoComplete="off" />
              {previous('district')}
            </label>
          </div>
          <div className="admin-pub-form-row">
            <label>
              Place
              <input type="text" list="adm-ev-cities" className={mark('city')} value={form.city} onChange={set('city')} required maxLength={255} autoComplete="off" />
              {previous('city')}
            </label>
            <label>
              Venue
              <input type="text" list="adm-ev-venues" className={mark('venue')} value={form.venue} onChange={set('venue')} required maxLength={255} autoComplete="off" placeholder="e.g. Convention Centre" />
              {previous('venue')}
            </label>
          </div>
          <p className="admin-pub-hint adm-hint-tight">
            Pick a suggestion from earlier EPMs or type a new one - new places are saved for next time.
          </p>
          <datalist id="adm-ev-states">{stateList.map((s) => <option key={s} value={s} />)}</datalist>
          <datalist id="adm-ev-districts">{districtList.map((s) => <option key={s} value={s} />)}</datalist>
          <datalist id="adm-ev-cities">{cityList.map((s) => <option key={s} value={s} />)}</datalist>
          <datalist id="adm-ev-venues">{venueList.map((s) => <option key={s} value={s} />)}</datalist>
        </div>

        <div className="admin-pub-form-row">
          <label>
            Starts <span className="optional">(optional)</span>
            <input type="time" className={mark('time')} value={form.startTime} onChange={set('startTime')} />
          </label>
          <label>
            Ends <span className="optional">(optional)</span>
            <input type="time" className={mark('time')} value={form.endTime} onChange={set('endTime')} />
          </label>
        </div>
        {changed('time') && (
          <div className="adm-prev-row">
            <PreviousValue>{saved.time || 'Time to be announced'}</PreviousValue>
            <span className="adm-new-value"><span>New:</span> {timeRange || 'Time to be announced'}</span>
          </div>
        )}
        {keptTimeText && !form.startTime && (
          <p className="admin-pub-hint adm-hint-tight">Current time text “{keptTimeText}” is kept unless you pick new times.</p>
        )}

        <label>
          Description <span className="optional">(optional, shown on the EPM directory card)</span>
          <textarea rows={3} maxLength={2000} className={mark('description')} value={form.description} onChange={set('description')} />
          {previous('description', 'No description')}
        </label>

        {changedFields.length > 0 && signedUpCount(event) > 0 && (
          <p className="adm-notice">
            <BellRing size={14} />
            <span>
              The {event.registrationCount ?? 0} people registered and {event.volunteerCount ?? 0} volunteers are notified of{' '}
              {changedFields.length === 1 ? 'this change' : 'these changes'} and see {changedFields.length === 1 ? 'it' : 'them'} in
              “Status of Activities”. The register and volunteer lists show {changedFields.length === 1 ? 'it' : 'them'} to everyone.
            </span>
          </p>
        )}

        {mode === 'edit' && (event.cancelled ? (
          <div className="adm-cancel-zone is-cancelled">
            <div>
              <strong>This EPM is cancelled</strong>
              <span>It is listed as cancelled on the register and volunteer pages and takes no sign-ups. Reinstate it to hold it as scheduled.</span>
            </div>
            <button type="button" className="admin-pub-btn adm-btn-secondary adm-btn-sm" onClick={onRestoreEvent} disabled={busy}>
              <RotateCcw size={14} /> Reinstate EPM
            </button>
          </div>
        ) : (
          <div className="adm-cancel-zone">
            <div>
              <strong>Cancel this EPM</strong>
              <span>
                Calls off the EPM on {formatDate(event.eventDate)}: everyone signed up is notified, and the register and volunteer
                pages list it as cancelled. Registrations are kept.{unsaved && ' Unsaved edits above are discarded.'}
              </span>
            </div>
            <button type="button" className="admin-pub-btn adm-btn-danger adm-btn-sm" onClick={onCancelEvent} disabled={busy}>
              <Ban size={14} /> Cancel EPM
            </button>
          </div>
        ))}

        <FormActions onCancel={onClose} busy={busy} submitLabel={mode === 'create' ? 'Add EPM' : 'Save changes'} busyLabel="Saving…" />
      </form>
    </Modal>
  );
}

function CancelEventDialog({ event, onClose, onCancelled }) {
  const [reason, setReason] = useState('');
  return (
    <ConfirmDialog
      title="Cancel EPM?"
      icon={Ban}
      confirmLabel="Cancel EPM"
      busyLabel="Cancelling…"
      cancelLabel="Keep EPM"
      onCancel={onClose}
      onConfirm={async () => onCancelled(await cancelAdminEvent(event.id, reason.trim() || null))}
    >
      <p>Call off <strong>{event.title}</strong> on {formatDate(event.eventDate)} in {event.city}?</p>
      <label>
        Reason <span className="optional">(optional, shown to everyone signed up)</span>
        <textarea rows={2} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Postponed due to heavy rain" />
      </label>
      {signedUpCount(event) > 0 && (
        <p className="admin-pub-hint">
          The {event.registrationCount ?? 0} people registered and {event.volunteerCount ?? 0} volunteers are notified and see it as
          cancelled on their dashboard. Their sign-ups are kept.
        </p>
      )}
    </ConfirmDialog>
  );
}
