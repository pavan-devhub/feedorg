import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapPin, Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { fetchAdminVenues, createAdminVenue, updateAdminVenue, deleteAdminVenue } from '../../../api/adminEpmApi';
import { Banner, ConfirmDialog, Empty, FormActions, FormError, Loading, Modal, SectionHeader } from '../adminUi';
import { useBanner } from '../adminUtils';

const uniqueSorted = (values) => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));

export default function EpmVenuesAdmin() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [editing, setEditing] = useState(null); // null | { venue? }
  const [deleting, setDeleting] = useState(null);
  const [banner, showBanner] = useBanner();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setVenues(await fetchAdminVenues());
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const states = useMemo(() => uniqueSorted(venues.map((v) => v.state)), [venues]);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return venues.filter((v) => (!stateFilter || v.state === stateFilter)
      && (!q || [v.name, v.city, v.district, v.state, v.address].some((x) => x && x.toLowerCase().includes(q))));
  }, [venues, query, stateFilter]);

  return (
    <>
      <SectionHeader
        eyebrow="EPM"
        icon={MapPin}
        title="Venues"
        description="Reusable list of places where EPMs are held - state, district, place and venue. Pick one when adding an EPM to fill in its location. Editing a venue here doesn't change EPMs already scheduled."
      >
        <button type="button" className="admin-pub-btn primary" onClick={() => setEditing({})}>
          <Plus size={16} /> Add venue
        </button>
      </SectionHeader>

      <Banner banner={banner} />
      {error && <div className="admin-pub-banner error">{error}</div>}

      <div className="adm-filters">
        <label className="adm-filter adm-filter-search">
          <span>Search venues</span>
          <div className="adm-input-icon">
            <Search size={15} />
            <input type="search" placeholder="Venue, place, district…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </label>
        <label className="adm-filter">
          <span>State</span>
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="">All States</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        {(query || stateFilter) && (
          <button type="button" className="adm-link-btn" onClick={() => { setQuery(''); setStateFilter(''); }}><X size={14} /> Clear</button>
        )}
      </div>

      <div className="admin-pub-table-wrap">
        {loading ? <Loading label="Loading venues…" /> : visible.length === 0 ? (
          <Empty>{venues.length === 0 ? 'No venues yet.' : 'No venues match.'}</Empty>
        ) : (
          <>
            <div className="adm-table-caption">{visible.length} {visible.length === 1 ? 'venue' : 'venues'}</div>
            <table className="admin-pub-table adm-table">
              <thead>
                <tr>
                  <th>Venue</th>
                  <th>Place</th>
                  <th>District</th>
                  <th>State</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((v) => (
                  <tr key={v.id}>
                    <td data-label="Venue">
                      <div className="adm-cell-title">{v.name}</div>
                      {v.address && <div className="adm-cell-sub">{v.address}</div>}
                    </td>
                    <td data-label="Place">{v.city}</td>
                    <td data-label="District">{v.district}</td>
                    <td data-label="State">{v.state}</td>
                    <td className="admin-pub-actions" data-label="Actions">
                      <button type="button" className="admin-pub-icon-btn" title="Edit" onClick={() => setEditing({ venue: v })}><Pencil size={15} /></button>
                      <button type="button" className="admin-pub-icon-btn danger" title="Delete" onClick={() => setDeleting(v)}><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {editing && (
        <VenueFormModal
          venue={editing.venue}
          venues={venues}
          onClose={() => setEditing(null)}
          onSaved={(saved) => {
            setEditing(null);
            showBanner('success', `Saved ${saved.name}, ${saved.city}.`);
            load();
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete venue?"
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteAdminVenue(deleting.id);
            showBanner('success', `Removed ${deleting.name}, ${deleting.city} from the venue list.`);
            setDeleting(null);
            load();
          }}
        >
          <p>Remove <strong>{deleting.name}, {deleting.city}</strong> from the venue list?</p>
          <p className="admin-pub-hint">EPMs already held or scheduled there keep their location.</p>
        </ConfirmDialog>
      )}
    </>
  );
}

function VenueFormModal({ venue, venues, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: venue?.name || '',
    state: venue?.state || '',
    district: venue?.district || '',
    city: venue?.city || '',
    address: venue?.address || '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const stateList = uniqueSorted(venues.map((v) => v.state));
  const districtList = uniqueSorted(venues.filter((v) => !form.state || v.state === form.state).map((v) => v.district));
  const cityList = uniqueSorted(venues.filter((v) => !form.district || v.district === form.district).map((v) => v.city));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      onSaved(venue ? await updateAdminVenue(venue.id, form) : await createAdminVenue(form));
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title={venue ? 'Edit venue' : 'Add venue'} icon={MapPin} onClose={onClose} busy={busy}>
      <form className="admin-pub-form" onSubmit={submit}>
        <FormError message={error} />
        <label>
          Venue name
          <input type="text" value={form.name} onChange={set('name')} required placeholder="e.g. Convention Centre" />
        </label>
        <div className="admin-pub-form-row">
          <label>
            State
            <input type="text" list="adm-vn-states" value={form.state} onChange={set('state')} required />
          </label>
          <label>
            District
            <input type="text" list="adm-vn-districts" value={form.district} onChange={set('district')} required />
          </label>
        </div>
        <label>
          Place
          <input type="text" list="adm-vn-cities" value={form.city} onChange={set('city')} required />
        </label>
        <label>
          Address <span className="optional">(optional)</span>
          <textarea rows={2} maxLength={500} value={form.address} onChange={set('address')} />
        </label>
        <datalist id="adm-vn-states">{stateList.map((s) => <option key={s} value={s} />)}</datalist>
        <datalist id="adm-vn-districts">{districtList.map((s) => <option key={s} value={s} />)}</datalist>
        <datalist id="adm-vn-cities">{cityList.map((s) => <option key={s} value={s} />)}</datalist>
        <FormActions onCancel={onClose} busy={busy} submitLabel={venue ? 'Save changes' : 'Add venue'} busyLabel="Saving…" />
      </form>
    </Modal>
  );
}
