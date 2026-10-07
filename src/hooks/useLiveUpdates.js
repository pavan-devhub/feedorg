import { useEffect, useRef } from 'react';
import { listen, onReconnect } from '../api/liveUpdates';

// A burst of messages (an admin's save reaches both the EPM topic and each user's own queue) is
// one reload, not several.
const SETTLE_MS = 300;
// Midnight's message reaches every open page at once - each waits a random moment up to this long
// so they don't all reload in the same second.
const SPREAD_MS = 30 * 1000;

/**
 * Calls `onUpdate()` when the server says something this screen shows has changed: a message on
 * any of `destinations` (see LIVE in api/liveUpdates) that `accepts(update)` (optional) lets
 * through - and once after every reconnect, as messages sent while disconnected are lost.
 * `onUpdate` should reload quietly, keeping what's on show until the new data arrives.
 */
export default function useLiveUpdates(destinations, onUpdate, accepts) {
  const latest = useRef({ onUpdate, accepts });
  useEffect(() => {
    latest.current = { onUpdate, accepts };
  });

  const key = destinations.filter(Boolean).join(' ');

  useEffect(() => {
    let timer = null;
    let dueAt = 0;
    const schedule = (delay) => {
      const at = Date.now() + delay;
      if (timer && dueAt <= at) return; // a reload already due sooner covers this one
      clearTimeout(timer);
      dueAt = at;
      timer = setTimeout(() => {
        timer = null;
        latest.current.onUpdate();
      }, delay);
    };
    const onMessage = (update) => {
      if (latest.current.accepts && !latest.current.accepts(update)) return;
      schedule(update.type === 'DAY_CHANGED' ? Math.random() * SPREAD_MS : SETTLE_MS);
    };

    const stops = key ? key.split(' ').map((destination) => listen(destination, onMessage)) : [];
    stops.push(onReconnect(() => schedule(SETTLE_MS)));
    return () => {
      stops.forEach((stop) => stop());
      clearTimeout(timer);
    };
  }, [key]);
}
