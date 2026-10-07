import { API_BASE_URL } from './config';

// The admin panel's "System Admins" section (/api/admin/system-admins) - admin-only like every
// /api/admin/** call, so the logged-in admin's JWT goes with each request.
//
// A failed request throws an Error whose `fields` maps form fields to their problem:
// { username: 'Already taken' } when something is already in use (409 - the message never says
// by whom), or the backend's validation message per field (400).

async function request(path, { method = 'GET', json } = {}) {
  const token = localStorage.getItem('jwt');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  if (json !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: json !== undefined ? JSON.stringify(json) : undefined,
  });
  const data = await res.json().catch(() => null);
  if (res.ok) return data;

  let message = `Request failed (${res.status})`;
  let fields = {};
  if (data?.error) {
    message = data.error;
    fields = data.fields || {};
  } else if (res.status === 400 && data && typeof data === 'object') {
    // A @Valid failure: a plain { field: message } map (see GlobalExceptionHandler).
    fields = data;
    message = 'Please fix the highlighted fields.';
  } else if (res.status === 403) {
    message = 'Admin access required - please log in again with an admin account.';
  }
  const error = new Error(message);
  error.fields = fields;
  throw error;
}

// [{ id, username, mobileNumber, email, createdBy, createdAt, defaultAdmin }] - the default admin
// first, then in the order they were added.
export const fetchSystemAdmins = () => request('/api/admin/system-admins');

// { username, mobileNumber, email, password } -> the new admin, as listed above.
export const createSystemAdmin = (payload) => request('/api/admin/system-admins', { method: 'POST', json: payload });

// Removes an admin and logs them out everywhere. Only the default admin may (403 otherwise), and
// the default admin itself can't be removed (409).
export const deleteSystemAdmin = (id) => request(`/api/admin/system-admins/${id}`, { method: 'DELETE' });
