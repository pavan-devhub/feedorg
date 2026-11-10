import { Award, ClipboardCheck, RotateCcw } from 'lucide-react';
import { describeNotification, timeAgo } from './notifications';

// The personalized updates the dashboard's welcome banner cycles through, one at a time: the
// user's own notifications (GET /api/users/me/notifications - their EPM reminders, changes to
// their EPMs, their registrations / volunteering, new EPMs and Feed World issues) plus where they
// stand on the ERS assessment (GET /api/ers/status). Each comes out as
// { id, icon, tone, tag, title, message, meta, isNew, cta, link | action }.

/** The banner shows at most this many - the most pressing ones. */
export const MAX_PERSONAL_UPDATES = 8;

// Lower comes first; within the same rank the notifications keep the server's newest-first order.
const RANK = {
  'epm-reminder': 0,
  'epm-update': 1,
  'ers-pending': 2,
  registered: 3,
  volunteered: 3,
  'new-epm': 4,
  'new-publication': 5,
  'ers-done': 6,
};

// The small label above each update, and the words on its link.
const KIND = {
  'epm-reminder': { tag: 'Upcoming EPM', cta: 'View details' },
  'epm-update': { tag: 'EPM Update', cta: 'See what changed' },
  registered: { tag: 'EPM Registration', cta: 'View my activity' },
  volunteered: { tag: 'Volunteering', cta: 'View my activity' },
  'new-epm': { tag: 'New EPM', cta: 'Register now' },
  'new-publication': { tag: 'Feed World', cta: 'Read now' },
};

function fromNotification(n) {
  const kind = KIND[n.type];
  if (!kind) return null; // a kind this banner doesn't know how to show
  const d = describeNotification(n);
  return {
    id: n.id,
    rank: RANK[n.type],
    icon: d.icon,
    tone: d.tone,
    tag: kind.tag,
    title: d.title,
    message: d.message,
    meta: timeAgo(n.createdAt),
    isNew: !!n.unread,
    cta: d.link ? kind.cta : null,
    link: d.link,
  };
}

function fromErs(ers) {
  const formattedDate = ers.completedOn
    ? new Date(ers.completedOn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;
  const pct = Math.round(ers.percentage || 0);
  if (!ers.attempted) {
    return {
      id: 'ers-pending', rank: RANK['ers-pending'], icon: ClipboardCheck, tone: 'teal', tag: 'ERS Assessment',
      title: 'Your ERS assessment is waiting',
      message: 'Take the Empowerment & Rural Support test to get certified.',
      cta: 'Start assessment', action: 'ers',
    };
  }
  if (ers.passed) {
    return {
      id: 'ers-passed', rank: RANK['ers-done'], icon: Award, tone: 'green', tag: 'ERS Assessment',
      title: `You passed ERS with ${pct}%`,
      message: formattedDate ? `Completed on ${formattedDate}. Your certificate and score are ready.` : 'Your certificate and score are ready.',
      cta: 'View results', action: 'ers',
    };
  }
  return {
    id: 'ers-retake', rank: RANK['ers-pending'], icon: RotateCcw, tone: 'orange', tag: 'ERS Assessment',
    title: `You scored ${pct}% in ERS`,
    message: "You're close - review your answers and retake the assessment to pass.",
    cta: 'Retake assessment', action: 'ers',
  };
}

/**
 * `notifications` - the user's notification items (null while loading);
 * `ers` - { loaded, attempted, percentage, passed, completedOn } (left out until `loaded`).
 */
export function buildPersonalUpdates({ notifications, ers }) {
  const updates = (notifications || []).map(fromNotification).filter(Boolean);
  if (ers?.loaded) updates.push(fromErs(ers));
  return updates
    .map((u, order) => ({ ...u, order }))
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
    .slice(0, MAX_PERSONAL_UPDATES);
}
