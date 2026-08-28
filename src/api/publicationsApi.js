import { API_BASE_URL } from './config';

// Publications require a logged-in user (see SecurityConfig#filterChain), so every call here
// needs the same JWT the rest of the app keeps in localStorage.
const authToken = () => localStorage.getItem('jwt');

async function getJson(path) {
  const token = authToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
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

// Archive sidebar: up to `count` issues after year/month, oldest first, capped at December of
// that same year.
export const fetchPublicationsWindow = (year, month, count = 12) =>
  getJson(`/api/publications/window?year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}&count=${encodeURIComponent(count)}`);

// Full detail for one issue, used to populate the viewer.
export const fetchPublicationById = (id) => getJson(`/api/publications/${id}`);

// Powers the "Find a Publication" year + month lookup.
export const fetchPublicationByYearMonth = (year, month) =>
  getJson(`/api/publications/lookup?year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`);

// Used to open the page on the most recent issue by default.
export const fetchLatestPublication = () => getJson('/api/publications/latest');

export const searchPublications = (query) =>
  getJson(`/api/publications/search?q=${encodeURIComponent(query)}`);

// Viewing an issue pulls the bytes through the app's own authenticated request and keeps them
// in memory, instead of pointing the viewer at a PDF URL and letting the browser fetch it.
//
// It deliberately hits /stream, not /file: /file is typed application/pdf, and a response typed
// application/pdf is capturable content. Download managers (IDM and friends) and "always
// download PDFs" browser settings grab it out from under the page - they cancel this very
// request, which lands here as "Failed to fetch", and raise their own save dialog. That was the
// automatic download. /stream serves the identical bytes under a content type no capture list
// knows about, and the PDF label is reapplied here, in the page, where nothing can intercept it.
export async function fetchPublicationPdfBlob(id) {
  const token = authToken();
  const res = await fetch(`${API_BASE_URL}/api/publications/${id}/stream`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new Error(
      res.status === 404
        ? 'The publication stream endpoint was not found (HTTP 404) - the backend may need to be restarted to pick it up.'
        : `The PDF for this issue could not be loaded (HTTP ${res.status}).`
    );
  }
  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  if (contentType.includes('json') || contentType.includes('html')) {
    // An error page or a JSON body here means the request never actually reached the bytes -
    // say so, rather than handing the viewer something it will fail to parse.
    throw new Error(`Expected publication bytes but the server returned "${contentType}".`);
  }
  // Re-label as a PDF for the viewer. The bytes are unchanged; only the type the page attaches
  // to them differs, and that label never crosses the network.
  const buffer = await res.arrayBuffer();
  return new Blob([buffer], { type: 'application/pdf' });
}

// These two are consumed as plain URLs (react-pdf's <Document file=...>, <img src>, <a href>),
// which can't attach an Authorization header, so the JWT rides along as a query param instead -
// see JwtAuthenticationFilter's query-parameter fallback for these two routes specifically.
export const getPublicationFileUrl = (id, { download = false } = {}) => {
  const params = new URLSearchParams();
  if (download) params.set('download', 'true');
  const token = authToken();
  if (token) params.set('token', token);
  const qs = params.toString();
  return `${API_BASE_URL}/api/publications/${id}/file${qs ? `?${qs}` : ''}`;
};

export const getPublicationThumbnailUrl = (id) => {
  const token = authToken();
  return `${API_BASE_URL}/api/publications/${id}/thumbnail${token ? `?token=${encodeURIComponent(token)}` : ''}`;
};
