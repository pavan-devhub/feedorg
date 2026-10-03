import { formatEventDateShort } from './epmDate';

// How an EPM's status and change log are worded, shared by the admin tables and the user
// dashboard's "Status of Activities". EpmEventDto#changes lists the fields that differ from when
// the EPM was first scheduled, #updates every logged change (see EpmEventChanges on the backend).
// Field names are the backend's: "city" is what the forms call "Place".

const CHANGE_TAGS = {
  date: 'Date changed',
  time: 'Time changed',
  state: 'Location changed',
  district: 'Location changed',
  city: 'Location changed',
  venue: 'Venue changed',
  description: 'Details updated',
};

/**
 * Short status tags for an EPM, e.g. [{ label: 'Venue changed', tone: 'amber' }]. `event` is null
 * when the admin has removed the EPM (a user's sign-up for it is still listed).
 */
export function epmStatusTags(event) {
  if (!event) return [{ label: 'No longer listed', tone: 'gray' }];
  if (event.cancelled) return [{ label: 'Cancelled', tone: 'red' }];
  const changed = [...new Set((event.changes || []).map((f) => CHANGE_TAGS[f]).filter(Boolean))]
    .map((label) => ({ label, tone: 'amber' }));
  if (!event.upcoming) return [{ label: 'Completed', tone: 'slate' }, ...changed];
  return changed.length > 0 ? changed : [{ label: 'On schedule', tone: 'green' }];
}

/** An update's value as shown to people: dates as "15 Oct 2026", an unset time as "to be announced". */
export function formatUpdateValue(field, value) {
  if (field === 'date') return formatEventDateShort(value);
  if (!value) return field === 'time' ? 'to be announced' : 'not set';
  return value;
}

const UPDATE_META = {
  date: { tag: 'EPM Rescheduled', subject: 'The EPM date', tone: 'blue' },
  time: { tag: 'Time Updated', subject: 'Event time', tone: 'blue' },
  state: { tag: 'Location Updated', subject: 'The state', tone: 'rose' },
  district: { tag: 'Location Updated', subject: 'The district', tone: 'rose' },
  city: { tag: 'Location Updated', subject: 'The place', tone: 'rose' },
  venue: { tag: 'Venue Updated', subject: 'Venue', tone: 'rose' },
  description: { tag: 'Additional Information', tone: 'green' },
  cancelled: { tag: 'EPM Cancelled', tone: 'red' },
  restored: { tag: 'EPM Reinstated', tone: 'green' },
};

/**
 * One logged update as { tag, tone, kind, subject, from, to, note }:
 * kind 'change' reads "{subject} has been changed from {from} to {to}.", 'info' shows `note`.
 */
export function describeUpdate(update) {
  const meta = UPDATE_META[update.field] || { tag: 'Update', tone: 'blue' };
  if (update.field === 'cancelled') {
    return { ...meta, kind: 'info', note: update.newValue ? `This EPM has been cancelled. Reason: ${update.newValue}` : 'This EPM has been cancelled.' };
  }
  if (update.field === 'restored') {
    return { ...meta, kind: 'info', note: 'This EPM is back on and will be held as scheduled.' };
  }
  if (update.field === 'description') {
    return { ...meta, kind: 'info', note: update.newValue || 'The event details were removed.' };
  }
  return {
    ...meta,
    kind: 'change',
    from: formatUpdateValue(update.field, update.oldValue),
    to: formatUpdateValue(update.field, update.newValue),
  };
}

// What the public register / volunteer lists say about each changed field.
const CHANGE_NOTES = {
  date: { label: 'Rescheduled', tone: 'amber' },
  time: { label: 'Time changed', tone: 'amber' },
  state: { label: 'State changed', tone: 'amber' },
  district: { label: 'District changed', tone: 'amber' },
  city: { label: 'Place changed', tone: 'amber' },
  venue: { label: 'Venue changed', tone: 'amber' },
  description: { label: 'Details updated', tone: 'blue' },
};

/**
 * What everyone - signed up or not - should know has changed about an upcoming EPM, for the
 * register / volunteer lists: [{ key, label, tone, was }], e.g. { label: 'Rescheduled', was:
 * '10 Oct 2026' }. `was` is the value before the admin's first change (none for "Details
 * updated"), and a cancelled EPM gives one note carrying the admin's reason. Needs the event's
 * `changes` and `updates`, which the public EPM list sends.
 */
export function epmChangeNotes(event) {
  if (!event) return [];
  const updates = event.updates || []; // newest first
  if (event.cancelled) {
    const cancellation = updates.find((u) => u.field === 'cancelled');
    return [{ key: 'cancelled', label: 'Cancelled', tone: 'red', reason: cancellation?.newValue || null }];
  }
  return (event.changes || []).filter((field) => CHANGE_NOTES[field]).map((field) => {
    const first = [...updates].reverse().find((u) => u.field === field);
    const was = field === 'description' || !first ? null : formatUpdateValue(field, first.oldValue);
    return { key: field, ...CHANGE_NOTES[field], was };
  });
}

/** When the admin last changed the EPM (ISO date-time), or null if it's as first scheduled. */
export const lastUpdatedAt = (event) => event?.updates?.[0]?.createdAt || null;
