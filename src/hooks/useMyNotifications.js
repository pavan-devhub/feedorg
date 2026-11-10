import { useCallback, useEffect, useState } from 'react';
import { fetchMyNotifications } from '../api/notificationsApi';
import { LIVE } from '../api/liveUpdates';
import { onNotificationsRefresh } from '../utils/notifications';
import useLiveUpdates from './useLiveUpdates';

// Only a backstop for when the live connection can't be made at all (same as the bell's).
const FALLBACK_REFRESH_MS = 5 * 60 * 1000;

/**
 * The logged-in user's notifications (GET /api/users/me/notifications, newest first), kept
 * current the way the navbar bell keeps them: reloaded when the server says something on them
 * changed, after the user signs up for an EPM, and on a slow timer. `null` until the first load
 * answers; a failed load keeps whatever was already there (or an empty list).
 */
export default function useMyNotifications() {
  const [items, setItems] = useState(null);

  const load = useCallback(() => {
    fetchMyNotifications()
      .then((data) => setItems(data?.items || []))
      .catch(() => setItems((prev) => prev ?? []));
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, FALLBACK_REFRESH_MS);
    const stopListening = onNotificationsRefresh(load);
    return () => {
      clearInterval(timer);
      stopListening();
    };
  }, [load]);

  // Other people's sign-ups only move EPM counts - nothing in this user's notifications.
  useLiveUpdates([LIVE.EPM_EVENTS, LIVE.PUBLICATIONS, LIVE.MINE], load, (update) => update.type !== 'SIGNUPS_CHANGED');

  return items;
}
