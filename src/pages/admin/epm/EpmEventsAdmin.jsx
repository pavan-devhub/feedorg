import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CalendarDays, History, Plus, Pencil, Trash2, Search, X, Users, HeartHandshake, Ban, MapPin, Tags,
} from 'lucide-react';
import {
  fetchAdminEvents, createAdminEvent, updateAdminEvent, deleteAdminEvent,
  fetchAdminCategories, fetchAdminVenues, createAdminVenue,
} from '../../../api/adminEpmApi';
import { Banner, ConfirmDialog, Empty, FormActions, FormError, Loading, Modal, SectionHeader } from '../adminUi';
import { MONTH_NAMES, formatDate, todayIso, useBanner } from '../adminUtils';

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

export default function EpmEventsAdmin({ onOpenSection }) {
  const [tab, setTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [editing, setEditing] = useState(null); // null | { mode: 'create' | 'edit', event? }
  const [deleting, setDeleting] = useState(null);
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
    fetchAdminVenues().then(setVenues).catch(() => setVenues([]));
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
        description="Add, edit, cancel or remove upcoming and previous Export Promotional Meetings. An EPM moves to Previous on its own once its date has passed."
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
                  <th className="adm-num">Registered</th>
                  <th className="adm-num">Volunteers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((e) => (
                  <tr key={e.id} className={e.cancelled ? 'adm-row-muted' : undefined}>
                    <td data-label="Date" className="adm-nowrap"><strong>{formatDate(e.eventDate)}</strong></td>
                    <td data-label="EPM">
                      <div className="adm-cell-title">{e.title}</div>
                      <div className="adm-cell-tags">
                        <span className={`adm-tag adm-tag-${categoryColor(e.category)}`}>{e.category || 'No category'}</span>
                        {e.cancelled && <span className="adm-tag adm-tag-red"><Ban size={11} /> Cancelled</span>}
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
                      <button type="button" className="admin-pub-icon-btn" title="Edit" onClick={() => setEditing({ mode: 'edit', event: e })}>
                        <Pencil size={15} />
                      </button>
                      <button type="button" className="admin-pub-icon-btn danger" title="Delete" onClick={() => setDeleting(e)}>
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {editing && (
        <EventFormModal
          mode={editing.mode}
          event={editing.event}
          defaultPast={tab === 'previous'}
          categories={categories}
          venues={venues}
          knownPlaces={events}
          onOpenSection={onOpenSection}
          onClose={() => setEditing(null)}
          onSaved={(saved) => afterSave(saved, editing.mode)}
        />
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
          {!deleting.cancelled && deleting.upcoming && (
            <p className="admin-pub-hint">To call off a meeting but keep it on record, edit it and tick “Cancelled” instead.</p>
          )}
        </ConfirmDialog>
      )}
    </>
  );
}

function EventFormModal({ mode, event, defaultPast, categories, venues, knownPlaces, onOpenSection, onClose, onSaved }) {
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
    cancelled: Boolean(event?.cancelled),
  }));
  const [saveVenue, setSaveVenue] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const keptTimeText = event?.timeRange && !initialTimes.start ? event.timeRange : '';
  const matchingVenue = venues.find((v) => [['name', 'venue'], ['city', 'city'], ['district', 'district'], ['state', 'state']]
    .every(([a, b]) => (v[a] || '').trim().toLowerCase() === (form[b] || '').trim().toLowerCase()));
  const venueComplete = form.state.trim() && form.district.trim() && form.city.trim() && form.venue.trim();

  const pickVenue = (id) => {
    const v = venues.find((x) => String(x.id) === id);
    if (v) setForm((f) => ({ ...f, state: v.state, district: v.district, city: v.city, venue: v.name }));
  };

  // Suggestions for the free-text place fields: everything already in the venue list or used by an EPM.
  const places = useMemo(() => [...venues.map((v) => ({ ...v, venue: v.name })), ...knownPlaces], [venues, knownPlaces]);
  const stateList = uniqueSorted(places.map((p) => p.state));
  const districtList = uniqueSorted(places.filter((p) => !form.state || p.state === form.state).map((p) => p.district));
  const cityList = uniqueSorted(places.filter((p) => !form.district || p.district === form.district).map((p) => p.city));

  const isPast = form.eventDate && form.eventDate < todayIso();

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
      timeRange: formatTimeRange(form.startTime, form.endTime) || keptTimeText,
      description: form.description,
      cancelled: form.cancelled,
    };
    try {
      const saved = mode === 'create' ? await createAdminEvent(payload) : await updateAdminEvent(event.id, payload);
      if (saveVenue && !matchingVenue && venueComplete) {
        // Best effort - the EPM itself is already saved.
        await createAdminVenue({ name: form.venue, state: form.state, district: form.district, city: form.city }).catch(() => {});
      }
      onSaved(saved);
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
            <input type="date" value={form.eventDate} onChange={set('eventDate')} required />
          </label>
        </div>
        <p className="admin-pub-hint adm-hint-tight">
          <Tags size={13} /> Categories are managed under{' '}
          <button type="button" className="adm-inline-link" onClick={() => { onClose(); onOpenSection('epm-categories'); }}>Categories</button>.
          {isPast && <> This date has passed, so the EPM will be listed under <strong>Previous</strong>.</>}
        </p>

        <div className="adm-fieldset">
          <div className="adm-fieldset-head">
            <span><MapPin size={14} /> Location</span>
            {venues.length > 0 && (
              <select className="adm-venue-picker" value={matchingVenue ? String(matchingVenue.id) : ''} onChange={(e) => pickVenue(e.target.value)}>
                <option value="">Pick from venue list…</option>
                {venues.map((v) => <option key={v.id} value={v.id}>{v.name} — {v.city}, {v.state}</option>)}
              </select>
            )}
          </div>
          <div className="admin-pub-form-row">
            <label>
              State
              <input type="text" list="adm-ev-states" value={form.state} onChange={set('state')} required />
            </label>
            <label>
              District
              <input type="text" list="adm-ev-districts" value={form.district} onChange={set('district')} required />
            </label>
          </div>
          <div className="admin-pub-form-row">
            <label>
              Place
              <input type="text" list="adm-ev-cities" value={form.city} onChange={set('city')} required />
            </label>
            <label>
              Venue
              <input type="text" value={form.venue} onChange={set('venue')} required placeholder="e.g. Convention Centre" />
            </label>
          </div>
          {venueComplete && !matchingVenue && (
            <label className="adm-check">
              <input type="checkbox" checked={saveVenue} onChange={(e) => setSaveVenue(e.target.checked)} />
              Also add this venue to the venue list
            </label>
          )}
          <datalist id="adm-ev-states">{stateList.map((s) => <option key={s} value={s} />)}</datalist>
          <datalist id="adm-ev-districts">{districtList.map((s) => <option key={s} value={s} />)}</datalist>
          <datalist id="adm-ev-cities">{cityList.map((s) => <option key={s} value={s} />)}</datalist>
        </div>

        <div className="admin-pub-form-row">
          <label>
            Starts <span className="optional">(optional)</span>
            <input type="time" value={form.startTime} onChange={set('startTime')} />
          </label>
          <label>
            Ends <span className="optional">(optional)</span>
            <input type="time" value={form.endTime} onChange={set('endTime')} />
          </label>
        </div>
        {keptTimeText && !form.startTime && (
          <p className="admin-pub-hint adm-hint-tight">Current time text “{keptTimeText}” is kept unless you pick new times.</p>
        )}

        <label>
          Description <span className="optional">(optional, shown on the EPM directory card)</span>
          <textarea rows={3} maxLength={2000} value={form.description} onChange={set('description')} />
        </label>

        {mode === 'edit' && (
          <label className="adm-check">
            <input type="checkbox" checked={form.cancelled} onChange={set('cancelled')} />
            Cancelled — hide from the public EPM pages but keep it (and its registrations) on record
          </label>
        )}

        <FormActions onCancel={onClose} busy={busy} submitLabel={mode === 'create' ? 'Add EPM' : 'Save changes'} busyLabel="Saving…" />
      </form>
    </Modal>
  );
}
