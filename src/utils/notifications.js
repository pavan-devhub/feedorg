import {
  AlarmClock, Ban, BookOpen, CalendarCheck, CalendarDays, Clock, FileText, HeartHandshake, Info, MapPin, Megaphone, RotateCcw,
} from 'lucide-react';
import { daysUntil, formatEventDateShort } from './epmDate';
import { describeUpdate } from './epmStatus';
import { getPublicationReaderUrl } from './publicationLinks';

// How a notification from GET /api/users/me/notifications (UserNotificationDto) is shown and
// where clicking it goes - shared by the navbar bell and the dashboard's "Latest Alerts &
// Announcements", so both always say the same thing.

/** Icon for each kind of EPM update (EpmEventUpdateDto#field). */
export const UPDATE_ICONS = {
  date: CalendarDays,
  time: Clock,
  state: MapPin,
  district: MapPin,
  city: MapPin,
  venue: MapPin,
  description: FileText,
  cancelled: Ban,
  restored: RotateCcw,
};

/** [background, foreground] for each tone. */
export const TONE_COLORS = {
  green: ['#dcfce7', '#16a34a'],
  blue: ['#dbeafe', '#2563eb'],
  rose: ['#ffe4e6', '#e11d48'],
  red: ['#fee2e2', '#dc2626'],
  orange: ['#ffedd5', '#ea580c'],
  purple: ['#f3e8ff', '#9333ea'],
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// The dashboard's "Status of Activities" (see Dashboard's navState.tab), opened at the EPM the
// notification is about - MyEpmActivities scrolls to and highlights its card.
const statusOfActivities = (epm) => ({ page: 'dashboard', params: { tab: 'status', epmId: epm?.id } });

/** "in 12 days", "tomorrow", "today". */
function countdown(isoDate) {
  const days = daysUntil(isoDate);
  if (days === null || days < 0) return '';
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  return `in ${days} days`;
}

// Fired after the user signs up for an EPM so the bell shows "You registered…" straight away,
// instead of at its next minute-by-minute refresh.
const REFRESH_EVENT = 'feed:notifications-refresh';

export const requestNotificationsRefresh = () => window.dispatchEvent(new Event(REFRESH_EVENT));

export function onNotificationsRefresh(handler) {
  window.addEventListener(REFRESH_EVENT, handler);
  return () => window.removeEventListener(REFRESH_EVENT, handler);
}

const whenAndWhere = (epm) => [
  formatEventDateShort(epm.eventDate),
  epm.timeRange,
  [epm.venue, epm.city].filter(Boolean).join(', '),
].filter(Boolean).join(' · ');

/**
 * { icon, tone, title, message, link } for a notification. `link` is { page, params } for a page of
 * the app, or { href } for a Feed World issue (it opens in its own tab, like the Feed World page does).
 */
export function describeNotification(n) {
  switch (n.type) {
    case 'registered':
      return {
        icon: CalendarCheck, tone: 'green', title: `You registered for ${n.epm.title}`, message: whenAndWhere(n.epm),
        link: statusOfActivities(n.epm),
      };
    case 'volunteered':
      return {
        icon: HeartHandshake, tone: 'orange', title: `You're volunteering at ${n.epm.title}`, message: whenAndWhere(n.epm),
        link: statusOfActivities(n.epm),
      };
    case 'epm-reminder':
      return {
        icon: AlarmClock,
        tone: 'orange',
        title: n.daysLeft === 1 ? `Tomorrow: ${n.epm.title}` : `${n.daysLeft} days to go: ${n.epm.title}`,
        message: whenAndWhere(n.epm),
        link: statusOfActivities(n.epm),
      };
    case 'epm-update': {
      const d = describeUpdate(n.update);
      return {
        icon: UPDATE_ICONS[n.update.field] || Info,
        tone: d.tone,
        title: `${d.tag} – ${n.epm.title}`,
        message: d.kind === 'change' ? `${d.subject} has been changed from ${d.from} to ${d.to}.` : d.note,
        link: statusOfActivities(n.epm),
      };
    }
    case 'new-epm': {
      const when = countdown(n.epm.eventDate);
      return {
        icon: Megaphone,
        tone: 'blue',
        title: `New EPM: ${n.epm.title}`,
        message: `${formatEventDateShort(n.epm.eventDate)}${when ? ` (${when})` : ''} in ${n.epm.city}. Registration and volunteering are open.`,
        link: { page: 'epm-register', params: { eventId: n.epm.id } },
      };
    }
    case 'new-publication':
      return {
        icon: BookOpen,
        tone: 'purple',
        title: `Feed World ${MONTHS[n.publication.month - 1]} ${n.publication.year} is out`,
        message: `The ${n.publication.language} edition is now available to read.`,
        link: { href: getPublicationReaderUrl(n.publication.id) },
      };
    default:
      return { icon: Info, tone: 'blue', title: 'Update', message: '', link: null };
  }
}

/** Follows a notification's link. */
export function openNotificationLink(link, onNavigate) {
  if (!link) return;
  if (link.href) {
    window.open(link.href, '_blank', 'noopener,noreferrer');
  } else {
    onNavigate(link.page, link.params);
  }
}

/** "just now", "5 min ago", "3 hours ago", "2 days ago", then the date. */
export function timeAgo(isoDateTime) {
  const then = new Date(String(isoDateTime));
  const seconds = Math.round((Date.now() - then.getTime()) / 1000);
  if (Number.isNaN(seconds)) return '';
  if (seconds < 60) return 'just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  return then.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
