import React, { useCallback, useEffect, useState } from 'react';
import { History, Loader2, Lock, X } from 'lucide-react';
import { fetchAdminEpmActivity, fetchAdminEpmActivityAdmins } from '../../../api/adminEpmApi';
import { Empty, Loading, Pagination, SectionHeader } from '../adminUi';
import { formatDate, formatDateTime } from '../adminUtils';
import { formatUpdateValue } from '../../../utils/epmStatus';
import useServerPagedList from '../../../hooks/useServerPagedList';

const PAGE_SIZE = 20;

const ACTIONS = [
  { value: 'created', label: 'Created' },
  { value: 'updated', label: 'Updated (date, time, place, venue…)' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'reinstated', label: 'Reinstated' },
  { value: 'deleted', label: 'Deleted' },
];

// What an "updated" entry changed - field names are the backend's, so "city" is the forms' "Place".
const FIELDS = {
  title: { label: 'Title', tag: 'Title changed', tone: 'amber' },
  category: { label: 'Category', tag: 'Category changed', tone: 'amber' },
  date: { label: 'Date', tag: 'Rescheduled', tone: 'blue' },
  time: { label: 'Time', tag: 'Time changed', tone: 'blue' },
  state: { label: 'State', tag: 'Location changed', tone: 'purple' },
  district: { label: 'District', tag: 'Location changed', tone: 'purple' },
  city: { label: 'Place', tag: 'Location changed', tone: 'purple' },
  venue: { label: 'Venue', tag: 'Venue changed', tone: 'purple' },
  description: { label: 'Details', tag: 'Details changed', tone: 'amber' },
};

/** An entry as { tag, tone, detail } for its Action and Details cells. */
function describe(entry) {
  switch (entry.action) {
    case 'created':
      return { tag: 'Created', tone: 'green', detail: `Scheduled for ${formatDate(entry.eventDate)}` };
    case 'cancelled':
      return { tag: 'Cancelled', tone: 'red', detail: entry.newValue ? `Reason: ${entry.newValue}` : 'No reason given' };
    case 'reinstated':
      return { tag: 'Reinstated', tone: 'teal', detail: 'Back on - to be held as scheduled' };
    case 'deleted':
      return { tag: 'Deleted', tone: 'gray', detail: 'Removed from the EPM list' };
    default: {
      const meta = FIELDS[entry.field] || { label: entry.field, tag: 'Updated', tone: 'amber' };
      const detail = entry.field === 'description'
        ? entry.newValue || 'Details removed'
        : `${meta.label}: ${formatUpdateValue(entry.field, entry.oldValue)} → ${formatUpdateValue(entry.field, entry.newValue)}`;
      return { tag: meta.tag, tone: meta.tone, detail };
    }
  }
}

/**
 * The EPM Activity log: which admin scheduled each EPM, and who later changed its date, time,
 * place or venue, cancelled, reinstated or deleted it. The backend writes an entry with every
 * such action; this screen only reads them - nobody can edit or remove an entry.
 */
export default function EpmActivityAdmin({ user }) {
  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState('');
  const [action, setAction] = useState('');
  const [eventDate, setEventDate] = useState('');

  useEffect(() => {
    fetchAdminEpmActivityAdmins().then(setAdmins).catch(() => setAdmins([]));
  }, []);

  // A new fetcher for new filters - useServerPagedList then starts again from page 1.
  const fetchPage = useCallback(
    ({ page, size }) => fetchAdminEpmActivity({ adminId, action, eventDate, page, size }),
    [adminId, action, eventDate],
  );
  const { items: entries, pager, loading, error } = useServerPagedList(fetchPage, PAGE_SIZE);

  const filtersActive = adminId || action || eventDate;
  const clearFilters = () => { setAdminId(''); setAction(''); setEventDate(''); };

  return (
    <>
      <SectionHeader
        eyebrow="EPM"
        icon={History}
        title="EPM Activity"
        description="Which admin scheduled each EPM, and who changed its date, time, place or venue, cancelled, reinstated or deleted it - newest first."
      />

      <div className="adm-filters">
        <label className="adm-filter">
          <span>Admin</span>
          <select value={adminId} onChange={(e) => setAdminId(e.target.value)}>
            <option value="">All admins</option>
            {admins.map((a) => <option key={a.id} value={a.id}>{a.username}</option>)}
          </select>
        </label>
        <label className="adm-filter adm-filter-wide">
          <span>Action</span>
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="">All actions</option>
            {ACTIONS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </label>
        <label className="adm-filter">
          <span>EPM date</span>
          <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </label>
        {filtersActive && (
          <button type="button" className="adm-link-btn" onClick={clearFilters}>
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {error && <div className="admin-pub-banner error">{error}</div>}

      <div className="admin-pub-table-wrap">
        {loading && entries.length === 0 ? <Loading label="Loading activity…" /> : entries.length === 0 ? (
          <Empty>{filtersActive ? 'No activity matches these filters.' : 'No activity yet - it is recorded as admins add and change EPMs.'}</Empty>
        ) : (
          <>
            <div className="adm-table-caption">
              {pager.total} {pager.total === 1 ? 'entry' : 'entries'}
              {eventDate && <> for EPMs on {formatDate(eventDate)}</>}
              {loading && <Loader2 size={13} className="admin-pub-spin" style={{ marginLeft: 8, verticalAlign: 'middle' }} />}
            </div>
            <table className="admin-pub-table adm-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>EPM</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const d = describe(entry);
                  return (
                    <tr key={entry.id}>
                      <td data-label="When" className="adm-nowrap">{formatDateTime(entry.createdAt)}</td>
                      <td data-label="Admin">
                        <div className="adm-cell-tags">
                          <strong>{entry.adminUsername}</strong>
                          {entry.adminId === user?.adminId && <span className="adm-tag adm-tag-green">You</span>}
                        </div>
                      </td>
                      <td data-label="Action"><span className={`adm-tag adm-tag-${d.tone}`}>{d.tag}</span></td>
                      <td data-label="EPM">
                        <div>{entry.eventTitle}</div>
                        <div className="adm-cell-sub">
                          <button type="button" className="adm-inline-link adm-left" onClick={() => setEventDate(entry.eventDate)}
                            title="Show activity for EPMs on this date">
                            {formatDate(entry.eventDate)}
                          </button>
                          {entry.eventCity && <> · {entry.eventCity}</>}
                        </div>
                      </td>
                      <td data-label="Details"><div className="adm-clamp" title={d.detail}>{d.detail}</div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination pager={pager} noun="entries" />
          </>
        )}
      </div>

      <p className="admin-pub-hint adm-footnote">
        <Lock size={13} /> This log is a permanent record: entries are added automatically as admins work on EPMs, and no one can edit or remove them.
      </p>
    </>
  );
}
