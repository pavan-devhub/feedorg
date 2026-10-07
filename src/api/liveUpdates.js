import { Client } from '@stomp/stompjs';
import { API_BASE_URL } from './config';

// Live updates over STOMP / WebSocket (backend: WebSocketConfig, LiveUpdateBroadcaster). The server
// only says what changed - e.g. { type: 'EPM_CHANGED', eventId: 199 } - and each screen reloads
// through its usual REST call. The whole app shares one connection, opened by the first screen
// that listens (see useLiveUpdates). It logs in with the stored JWT, so a logged-in user also gets
// their own queue; call syncLiveLogin() after logging in or out.

export const LIVE = {
  /** Every EPM list, and every bell: an EPM added / edited / cancelled / deleted, a sign-up, midnight. */
  EPM_EVENTS: '/topic/epm-events',
  /** A Feed World issue uploaded, removed or released - for logged-in bells. */
  PUBLICATIONS: '/topic/publications',
  /** This user's own EPMs changed - their bell and Status of Activities. Logged in only. */
  MINE: '/user/queue/updates',
};

const WS_URL = `${API_BASE_URL.replace(/^http/, 'ws')}/ws`;

const handlers = new Map(); // destination -> Set of handlers
const subscriptions = new Map(); // destination -> its subscription on the current connection
const reconnectHandlers = new Set();
let client = null;
let connectedToken = null; // the JWT the current connection logged in with
let connectedBefore = false;

function storedToken() {
  try {
    return localStorage.getItem('jwt');
  } catch {
    return null;
  }
}

function subscribe(destination) {
  if (!client?.connected || subscriptions.has(destination)) return;
  // The server only gives a logged-in connection its own queue.
  if (destination === LIVE.MINE && !connectedToken) return;
  subscriptions.set(destination, client.subscribe(destination, (frame) => {
    let update = {};
    try {
      update = JSON.parse(frame.body);
    } catch {
      // not JSON - still worth a reload
    }
    handlers.get(destination)?.forEach((handler) => handler(update));
  }));
}

function ensureClient() {
  if (client) return;
  client = new Client({
    brokerURL: WS_URL,
    // Retries every 5 s while the backend is down or the network is gone. Heartbeats match the
    // server's, so a dead connection (sleeping laptop, dropped Wi-Fi) is noticed and replaced.
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    beforeConnect: (c) => {
      connectedToken = storedToken();
      c.connectHeaders = connectedToken ? { Authorization: `Bearer ${connectedToken}` } : {};
    },
    onConnect: () => {
      subscriptions.clear();
      handlers.forEach((_, destination) => subscribe(destination));
      // Whatever was sent while disconnected is lost, so every screen reloads once.
      if (connectedBefore) reconnectHandlers.forEach((handler) => handler());
      connectedBefore = true;
    },
  });
  client.activate();
}

/** Calls `handler(update)` for each message on `destination`. Returns the function that stops it. */
export function listen(destination, handler) {
  if (!handlers.has(destination)) handlers.set(destination, new Set());
  handlers.get(destination).add(handler);
  ensureClient();
  subscribe(destination);
  return () => {
    const forDestination = handlers.get(destination);
    if (!forDestination) return;
    forDestination.delete(handler);
    if (forDestination.size > 0) return;
    handlers.delete(destination);
    const subscription = subscriptions.get(destination);
    subscriptions.delete(destination);
    if (subscription && client?.connected) subscription.unsubscribe();
  };
}

/** Calls `handler()` each time the connection comes back after being lost. Returns the function that stops it. */
export function onReconnect(handler) {
  reconnectHandlers.add(handler);
  return () => reconnectHandlers.delete(handler);
}

/** After a login or logout: reconnects if the stored JWT isn't the one the connection logged in with. */
export function syncLiveLogin() {
  if (!client || storedToken() === connectedToken) return;
  client.deactivate().then(() => client.activate());
}
