import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import {
  fetchGuestNotifications, fetchMyNotifications, markGuestNotificationsSeen, markNotificationsSeen,
} from '../api/notificationsApi';
import {
  TONE_COLORS, describeNotification, onNotificationsRefresh, openNotificationLink, timeAgo,
} from '../utils/notifications';
import { LIVE } from '../api/liveUpdates';
import useLiveUpdates from '../hooks/useLiveUpdates';
import './NotificationBell.css';

// The navbar's bell: a badge with the number of new notifications, and a panel listing them.
// Logged in, that's their EPM sign-ups, countdown reminders and updates, newly announced EPMs and
// new Feed World issues; for a visitor who isn't logged in, just the newly announced EPMs (each
// shows up 15 days before it's held). Opening the panel marks everything as seen; the new ones
// stay highlighted until it's closed.
//
// It reloads live, when the server says something on it changed (see useLiveUpdates); this slow
// timer is only a backstop for when the live connection can't be made at all.
const FALLBACK_REFRESH_MS = 5 * 60 * 1000;

export default function NotificationBell({ onNavigate, isLoggedIn = true }) {
  const [data, setData] = useState({ items: [], unreadCount: 0 });
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef(null);

  const load = useCallback(() => {
    (isLoggedIn ? fetchMyNotifications() : fetchGuestNotifications())
      .then((result) => { setData(result); setLoaded(true); })
      .catch(() => setLoaded(true)); // a failed refresh just keeps what's shown
  }, [isLoggedIn]);

  useEffect(() => {
    load();
    const timer = setInterval(load, FALLBACK_REFRESH_MS);
    window.addEventListener('focus', load);
    const stopListening = onNotificationsRefresh(load);
    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', load);
      stopListening();
    };
  }, [load]);

  // Other people's sign-ups only move the EPM lists' counts, never anything on the bell.
  useLiveUpdates(
    isLoggedIn ? [LIVE.EPM_EVENTS, LIVE.PUBLICATIONS, LIVE.MINE] : [LIVE.EPM_EVENTS],
    load,
    (update) => update.type !== 'SIGNUPS_CHANGED',
  );

  const close = useCallback(() => {
    setOpen(false);
    setData((d) => ({ ...d, items: d.items.map((n) => ({ ...n, unread: false })) }));
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) close(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const toggle = () => {
    if (open) {
      close();
      return;
    }
    setOpen(true);
    if (data.unreadCount > 0) {
      setData((d) => ({ ...d, unreadCount: 0 }));
      if (isLoggedIn) markNotificationsSeen().catch(() => {});
      else markGuestNotificationsSeen(data.items);
    }
  };

  const go = (link) => {
    close();
    openNotificationLink(link, onNavigate);
  };

  const newCount = data.items.filter((n) => n.unread).length;

  return (
    <div className="nb-wrap" ref={wrapRef}>
      <button
        type="button"
        className="nb-bell"
        aria-label={data.unreadCount > 0 ? `Notifications, ${data.unreadCount} new` : 'Notifications'}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={toggle}
      >
        <Bell size={16} strokeWidth={2.25} />
        {data.unreadCount > 0 && <span className="nb-badge">{data.unreadCount > 9 ? '9+' : data.unreadCount}</span>}
      </button>

      {open && (
        <div className="nb-panel" role="dialog" aria-label="Notifications">
          <div className="nb-head">
            <strong>Notifications</strong>
            {newCount > 0 && <span className="nb-new-pill">{newCount} new</span>}
          </div>

          {!loaded ? (
            <p className="nb-empty">Loading…</p>
          ) : data.items.length === 0 ? (
            <p className="nb-empty">
              {isLoggedIn
                ? "You're all caught up. Updates about your EPMs and new Feed World issues will show up here."
                : 'No new EPMs right now. Upcoming EPMs are announced here 15 days before they are held.'}
            </p>
          ) : (
            <ul className="nb-list">
              {data.items.map((n) => {
                const d = describeNotification(n);
                const [bg, fg] = TONE_COLORS[d.tone] || TONE_COLORS.blue;
                const Icon = d.icon;
                return (
                  <li key={n.id}>
                    <button type="button" className={`nb-item ${n.unread ? 'is-unread' : ''}`} onClick={() => go(d.link)}>
                      <span className="nb-icon" style={{ background: bg, color: fg }}><Icon size={16} /></span>
                      <span className="nb-body">
                        <strong>{d.title}</strong>
                        {d.message && <span>{d.message}</span>}
                        <small>{timeAgo(n.createdAt)}</small>
                      </span>
                      {n.unread && <span className="nb-dot" aria-label="New" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {!isLoggedIn && (
            <p className="nb-foot">
              <button type="button" onClick={() => { close(); onNavigate('login'); }}>Log in</button> to get reminders and
              updates about the EPMs you register for.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
