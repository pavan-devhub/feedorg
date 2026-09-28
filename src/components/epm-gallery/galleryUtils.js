import { useEffect, useState } from 'react';
import { fetchEpmEvents } from '../../api/epmApi';

export const plural = (count, one, many = `${one}s`) => (count === 1 ? one : many);

export const pad2 = (n) => String(n).padStart(2, '0');

// Event rows name their state/district in free text ("Andhra Pradesh", "Krishna") while the gallery
// states/districts carry their own display names, so both sides are compared case- and space-insensitively.
export const placeKey = (name) => (name || '').trim().toLowerCase().replace(/\s+/g, ' ');

const liveEvents = (events) => (events || []).filter((e) => !e.cancelled);

// { total, held, upcoming, next } for a list of EPM events - `next` is the soonest upcoming one.
export function summariseMeetings(events) {
  const live = liveEvents(events);
  const upcoming = live
    .filter((e) => e.upcoming)
    .sort((a, b) => (a.eventDate || '').localeCompare(b.eventDate || ''));
  return {
    total: live.length,
    held: live.length - upcoming.length,
    upcoming: upcoming.length,
    next: upcoming[0] || null,
  };
}

// Map of placeKey(event[field]) -> number of (non-cancelled) events, e.g. meetings per district.
export function countMeetingsBy(events, field) {
  const counts = new Map();
  liveEvents(events).forEach((e) => {
    const key = placeKey(e[field]);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return counts;
}

// The EPM meetings matching `filter` (see fetchEpmEvents), across past and upcoming. The gallery
// only uses these for counts and the "next EPM" card, so a failed call quietly yields [] and the
// pages simply leave those details out. Stays null until loaded; pass enabled=false to wait.
export function useEpmMeetings(filter = {}, enabled = true) {
  const key = JSON.stringify(filter);
  // Results are stored with the filter they belong to, so a new filter never shows the last one's.
  const [result, setResult] = useState({ key: null, events: null });

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    fetchEpmEvents({ status: 'all', ...JSON.parse(key) })
      .then((data) => { if (!cancelled) setResult({ key, events: Array.isArray(data) ? data : [] }); })
      .catch(() => { if (!cancelled) setResult({ key, events: [] }); });
    return () => { cancelled = true; };
  }, [key, enabled]);

  return enabled && result.key === key ? result.events : null;
}
