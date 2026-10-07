import { API_BASE_URL } from './config';

// Admin-only EPM endpoints (/api/admin/epm/**). Like the Feed World admin calls in
// publicationsApi.js, every request carries the logged-in user's JWT, and the backend only
// accepts it when that user holds the ADMIN role (see SecurityConfig) - one admin login for both
// Feed World and EPM.

const authToken = () => localStorage.getItem('jwt');

function messageFrom(body, status) {
  if (body && typeof body === 'object') {
    if (body.error) return body.error;
    // A @Valid failure comes back as a plain {field: message} map (see GlobalExceptionHandler).
    const values = Object.values(body).filter((v) => typeof v === 'string');
    if (values.length > 0) return values.join(' · ');
  }
  if (status === 403) return 'Admin access required - please log in again with the admin account.';
  return `Request failed (${status})`;
}

async function request(path, { method = 'GET', json, form } = {}) {
  const token = authToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  let body;
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  } else if (form) {
    body = form;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, { method, headers, body });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(messageFrom(data, res.status));
  return data;
}

const query = (params) => {
  const qs = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  const s = qs.toString();
  return s ? `?${s}` : '';
};

const formWith = (file, fields = {}) => {
  const form = new FormData();
  if (file) form.append('file', file);
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') form.append(k, v);
  });
  return form;
};

// --- overview / submissions ---------------------------------------------------------------

export const fetchAdminEpmOverview = () => request('/api/admin/epm/overview');

// Filters: { eventId, eventDate: 'yyyy-mm-dd' (the EPM's date), submittedOn: 'yyyy-mm-dd', q }.
// The lists come a page at a time - pass { page (0-based), size } too - as
// { items, total, page, size, totalPages }; the export twins return every matching row, for the
// spreadsheet download.
export const fetchAdminRegistrations = (filters) => request(`/api/admin/epm/registrations${query(filters)}`);
export const fetchAdminVolunteers = (filters) => request(`/api/admin/epm/volunteers${query(filters)}`);
export const exportAdminRegistrations = (filters) => request(`/api/admin/epm/registrations/export${query(filters)}`);
export const exportAdminVolunteers = (filters) => request(`/api/admin/epm/volunteers/export${query(filters)}`);

// --- events -------------------------------------------------------------------------------

// Filters: { status: 'upcoming' | 'previous' | 'all', q, state, district, city, category, month, year }.
// fetchAdminEvents returns every matching EPM (the lookups other screens need); the EPM Events
// table pages them on the server - pass { page (0-based), size } too - as
// { items, total, page, size, totalPages }.
export const fetchAdminEvents = (filters) => request(`/api/admin/epm/events${query(filters)}`);
export const fetchAdminEventsPage = (filters) => request(`/api/admin/epm/events/page${query(filters)}`);
// The EPM Events filters' choices for one tab: { total, places: [{ state, district, city }] } -
// `total` counts the tab's EPMs before any filter.
export const fetchAdminEventFacets = (status) => request(`/api/admin/epm/events/facets${query({ status })}`);
export const createAdminEvent = (payload) => request('/api/admin/epm/events', { method: 'POST', json: payload });
export const updateAdminEvent = (id, payload) => request(`/api/admin/epm/events/${id}`, { method: 'PUT', json: payload });
export const deleteAdminEvent = (id) => request(`/api/admin/epm/events/${id}`, { method: 'DELETE' });
// Only upcoming EPMs can be edited, cancelled or reinstated - a previous one is kept as it was.
// The optional reason is shown to everyone registered or volunteering for the EPM.
export const cancelAdminEvent = (id, reason) => request(`/api/admin/epm/events/${id}/cancel`, { method: 'POST', json: { reason } });
export const restoreAdminEvent = (id) => request(`/api/admin/epm/events/${id}/restore`, { method: 'POST' });
// Every { state, district, city, venue } already used by an EPM or in the venue list - the event
// form's suggestions. Saving an EPM at a new place adds it to the venue list on the backend.
export const fetchAdminEventLocations = () => request('/api/admin/epm/events/locations');

// --- activity log -------------------------------------------------------------------------

// The EPM Activity log - which admin did what to each EPM, newest first, a page at a time:
// { items, total, page, size, totalPages } of { id, createdAt, adminId, adminUsername, action,
// field, epmEventId, eventTitle, eventDate, eventCity, oldValue, newValue }. `action` is created /
// updated / cancelled / reinstated / deleted; `field` (updated only) is what changed, e.g. 'venue'.
// Filters: { adminId, action, eventDate: 'yyyy-mm-dd' (the EPM's date) }. There is no way to
// change or remove an entry.
export const fetchAdminEpmActivity = (params) => request(`/api/admin/epm/activity${query(params)}`);
// [{ id, username }] - every admin with an entry, by username (deleted admins included).
export const fetchAdminEpmActivityAdmins = () => request('/api/admin/epm/activity/admins');

// --- categories ---------------------------------------------------------------------------

// Accent colours the public pages have styles for - must match EpmCategory.COLORS on the backend.
export const CATEGORY_COLORS = ['green', 'teal', 'purple', 'blue', 'orange', 'emerald', 'gray'];

// Every category (the EPM form's choices); the Categories table pages them on the server instead.
export const fetchAdminCategories = () => request('/api/admin/epm/categories');
export const fetchAdminCategoriesPage = ({ page, size }) => request(`/api/admin/epm/categories/page${query({ page, size })}`);
export const createAdminCategory = (payload) => request('/api/admin/epm/categories', { method: 'POST', json: payload });
export const updateAdminCategory = (id, payload) => request(`/api/admin/epm/categories/${id}`, { method: 'PUT', json: payload });
export const deleteAdminCategory = (id) => request(`/api/admin/epm/categories/${id}`, { method: 'DELETE' });

// --- reviews ------------------------------------------------------------------------------

// A page of reviews in display order: { items, total, page, size, totalPages, publishedCount } -
// `publishedCount` is how many reviews, on any page, the EPM page shows.
export const fetchAdminReviews = ({ page, size }) => request(`/api/admin/epm/reviews${query({ page, size })}`)
  .then(({ page: rows, publishedCount }) => ({ ...rows, publishedCount }));
export const createAdminReview = (payload) => request('/api/admin/epm/reviews', { method: 'POST', json: payload });
export const updateAdminReview = (id, payload) => request(`/api/admin/epm/reviews/${id}`, { method: 'PUT', json: payload });
export const deleteAdminReview = (id) => request(`/api/admin/epm/reviews/${id}`, { method: 'DELETE' });
// One place up (delta -1) or down (1) the Testimonials slider - across pages too.
export const moveAdminReview = (id, delta) => request(`/api/admin/epm/reviews/${id}/move${query({ delta })}`, { method: 'POST' });

// --- block images (EPM page + gallery page sections) --------------------------------------

export const fetchGalleryBlocks = () => request('/api/admin/epm/gallery/blocks');
export const fetchBlockImages = (block) => request(`/api/admin/epm/gallery/${encodeURIComponent(block)}`);
export const uploadBlockImage = (block, file, fields) =>
  request(`/api/admin/epm/gallery/${encodeURIComponent(block)}`, { method: 'POST', form: formWith(file, fields) });
export const updateBlockImage = (block, id, payload) =>
  request(`/api/admin/epm/gallery/${encodeURIComponent(block)}/${id}`, { method: 'PUT', json: payload });
export const replaceBlockImage = (block, id, file) =>
  request(`/api/admin/epm/gallery/${encodeURIComponent(block)}/${id}/file`, { method: 'PUT', form: formWith(file) });
export const reorderBlockImages = (block, orderedIds) =>
  request(`/api/admin/epm/gallery/${encodeURIComponent(block)}/order`, { method: 'PUT', json: orderedIds });
export const deleteBlockImage = (block, id) =>
  request(`/api/admin/epm/gallery/${encodeURIComponent(block)}/${id}`, { method: 'DELETE' });
export const importGalleryFromStorage = () => request('/api/admin/epm/gallery/import', { method: 'POST' });

// --- EPM page video (the full-width one under the navbar) ---------------------------------

// Must match EpmPageVideoServiceImpl's limit (and the backend's multipart limit).
export const VIDEO_MAX_BYTES = 50 * 1024 * 1024;

/** null while the EPM page still plays its built-in video. */
export const fetchEpmVideoAdmin = () => request('/api/admin/epm/video');
export const deleteEpmVideo = () => request('/api/admin/epm/video', { method: 'DELETE' });

// A video runs to tens of MB, so unlike every other upload here this one goes through
// XMLHttpRequest - fetch can't report upload progress. `onProgress` gets 0..1.
export const uploadEpmVideo = (file, onProgress) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `${API_BASE_URL}/api/admin/epm/video`);
  const token = authToken();
  if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.responseType = 'json';
  xhr.upload.onprogress = (e) => { if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total); };
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
    else reject(new Error(messageFrom(xhr.response, xhr.status)));
  };
  xhr.onerror = () => reject(new Error('The upload was interrupted - check the connection and try again.'));
  xhr.send(formWith(file));
});

// --- gallery page: states -> districts -> photos ------------------------------------------

const REGIONS = '/api/admin/epm/gallery-regions';

export const fetchGalleryStatesAdmin = () => request(`${REGIONS}/states`);
export const createGalleryState = (payload) => request(`${REGIONS}/states`, { method: 'POST', json: payload });
export const updateGalleryState = (id, payload) => request(`${REGIONS}/states/${id}`, { method: 'PUT', json: payload });
export const deleteGalleryState = (id) => request(`${REGIONS}/states/${id}`, { method: 'DELETE' });
export const setGalleryStateCover = (id, file) => request(`${REGIONS}/states/${id}/cover`, { method: 'PUT', form: formWith(file) });
export const removeGalleryStateCover = (id) => request(`${REGIONS}/states/${id}/cover`, { method: 'DELETE' });

export const createGalleryDistrict = (stateId, payload) =>
  request(`${REGIONS}/states/${stateId}/districts`, { method: 'POST', json: payload });
export const updateGalleryDistrict = (id, payload) => request(`${REGIONS}/districts/${id}`, { method: 'PUT', json: payload });
export const deleteGalleryDistrict = (id) => request(`${REGIONS}/districts/${id}`, { method: 'DELETE' });

export const fetchDistrictPhotos = (districtId) => request(`${REGIONS}/districts/${districtId}/photos`);
export const uploadDistrictPhoto = (districtId, file, caption) =>
  request(`${REGIONS}/districts/${districtId}/photos`, { method: 'POST', form: formWith(file, { caption }) });
export const updateDistrictPhoto = (districtId, photoId, payload) =>
  request(`${REGIONS}/districts/${districtId}/photos/${photoId}`, { method: 'PUT', json: payload });
export const replaceDistrictPhoto = (districtId, photoId, file) =>
  request(`${REGIONS}/districts/${districtId}/photos/${photoId}/file`, { method: 'PUT', form: formWith(file) });
export const reorderDistrictPhotos = (districtId, orderedIds) =>
  request(`${REGIONS}/districts/${districtId}/photos/order`, { method: 'PUT', json: orderedIds });
export const deleteDistrictPhoto = (districtId, photoId) =>
  request(`${REGIONS}/districts/${districtId}/photos/${photoId}`, { method: 'DELETE' });
