import { useEffect, useState } from 'react';
import { fetchMyEpmActivities } from '../api/epmApi';

/**
 * For a logged-in user, a Map from EPM id to their own sign-ups for it - e.g. ['Registered',
 * 'Volunteering'] - so the EPM lists can mark the ones they're already in. Empty when logged out
 * (or if it can't be loaded: the list just goes without the marks). Reloads when `refreshKey` changes.
 */
export default function useMyEpmSignUps(isLoggedIn, refreshKey) {
  const [signUps, setSignUps] = useState(() => new Map());

  useEffect(() => {
    if (!isLoggedIn) {
      setSignUps(new Map());
      return undefined;
    }
    let cancelled = false;
    fetchMyEpmActivities()
      .then((data) => {
        if (cancelled) return;
        const labels = new Map();
        const add = (items, label) => (items || []).forEach((a) => {
          labels.set(a.epmEventId, new Set([...(labels.get(a.epmEventId) || []), label]));
        });
        add(data.registrations, 'Registered');
        add(data.volunteers, 'Volunteering');
        setSignUps(new Map(Array.from(labels, ([id, set]) => [id, Array.from(set)])));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [isLoggedIn, refreshKey]);

  return signUps;
}
