// Shared helpers for formatting the ISO "yyyy-MM-dd" eventDate that EpmEventDto sends down.

export function formatEventDateLong(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Powers the day/month/year date-block used on the event timeline cards, e.g. { day: '18',
// month: 'OCT', weekday: 'Sun', year: '2026' }.
export function formatEventDateParts(isoDate) {
  if (!isoDate) return { day: '', month: '', weekday: '', year: '' };
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return {
    day: String(day),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    year: String(year),
  };
}

// "2026-10-15" -> "15 Oct 2026".
export function formatEventDateShort(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = String(isoDate).slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// "2026-09-30T10:30:12" -> { date: "30 Sep 2026", time: "10:30 AM" }, read as local time.
export function formatTimestampParts(isoDateTime) {
  if (!isoDateTime) return { date: '', time: '' };
  const d = new Date(String(isoDateTime));
  if (Number.isNaN(d.getTime())) return { date: '', time: '' };
  return {
    date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
}

// Whole days from today to an ISO "yyyy-MM-dd" date, in local time: 0 today, 1 tomorrow, -1 yesterday.
export function daysUntil(isoDate) {
  if (!isoDate) return null;
  const [year, month, day] = String(isoDate).slice(0, 10).split('-').map(Number);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((Date.UTC(year, month - 1, day) - today) / 86400000);
}
