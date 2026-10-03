import { API_BASE_URL } from './config';

// The notification bell's data. Logged in (see UserNotificationController, needs the JWT): their
// EPM sign-ups, countdown reminders, the admin's updates to those EPMs, newly announced EPMs and new
// Feed World issues. Not logged in: just the newly announced EPMs (public), with which of them the
// visitor has already seen remembered in this browser.

async function request(path, method = 'GET') {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.status === 204 ? null : res.json();
}

/** { items: [...newest first], unreadCount } - each item is a UserNotificationDto. */
export const fetchMyNotifications = () => request('/api/users/me/notifications');

/** Clears the unread count - call when the notifications panel is opened. */
export const markNotificationsSeen = () => request('/api/users/me/notifications/seen', 'POST');

// --- visitors who aren't logged in ----------------------------------------------------------

const GUEST_SEEN_KEY = 'feed_guest_seen_notifications';

function readGuestSeen() {
  try {
    const ids = JSON.parse(localStorage.getItem(GUEST_SEEN_KEY) || '[]');
    return Array.isArray(ids) ? ids : [];
  } catch {
    return []; // storage blocked or garbled - everything just shows as new
  }
}

/**
 * Same shape as fetchMyNotifications. An announcement is new until the visitor has opened the
 * bell while it was showing - remembered by id, since announcements arrive dated 15 days before
 * their EPM rather than in the order the visitor sees them.
 */
export async function fetchGuestNotifications() {
  const res = await fetch(`${API_BASE_URL}/api/epm/events/announcements`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  const seen = new Set(readGuestSeen());
  const items = (data.items || []).map((n) => ({ ...n, unread: !seen.has(n.id) }));
  return { items, unreadCount: items.filter((n) => n.unread).length };
}

/** Marks the given announcements as seen in this browser (keeps the list from growing forever). */
export function markGuestNotificationsSeen(items) {
  try {
    const ids = Array.from(new Set([...items.map((n) => n.id), ...readGuestSeen()])).slice(0, 200);
    localStorage.setItem(GUEST_SEEN_KEY, JSON.stringify(ids));
  } catch {
    // storage unavailable (e.g. private mode) - they'll just show as new again next time
  }
}
