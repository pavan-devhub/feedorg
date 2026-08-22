import { API_BASE_URL } from './config';

async function getJson(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.error) message = body.error;
    } catch (_) {
      // response had no JSON body - keep the generic message
    }
    throw new Error(message);
  }
  return res.json();
}

// Archive sidebar: how many issues exist per year, most recent year first.
export const fetchPublicationYears = () => getJson('/api/publications/years');

// All issues published in a given year (used to fill a year group once it's expanded).
export const fetchPublicationsByYear = (year) =>
  getJson(`/api/publications?year=${encodeURIComponent(year)}`);

// Full detail for one issue, used to populate the viewer.
export const fetchPublicationById = (id) => getJson(`/api/publications/${id}`);

// Powers the "Find a Publication" year + month lookup.
export const fetchPublicationByYearMonth = (year, month) =>
  getJson(`/api/publications/lookup?year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`);

// Used to open the page on the most recent issue by default.
export const fetchLatestPublication = () => getJson('/api/publications/latest');

export const searchPublications = (query) =>
  getJson(`/api/publications/search?q=${encodeURIComponent(query)}`);

export const getPublicationFileUrl = (id, { download = false } = {}) =>
  `${API_BASE_URL}/api/publications/${id}/file${download ? '?download=true' : ''}`;

export const getPublicationThumbnailUrl = (id) => `${API_BASE_URL}/api/publications/${id}/thumbnail`;
