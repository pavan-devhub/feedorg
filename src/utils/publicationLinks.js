// The app has no router - pages live in sessionStorage (see App.jsx) and the URL never changes -
// so a publication opened "in a new tab" needs an address of its own. `/?publication=<id>` is
// that address: main.jsx renders the standalone PublicationReader for it instead of the app.
// A query string rather than a path so it works on any static host without SPA rewrites.
const READER_PARAM = 'publication';

// Same key App.jsx restores the open page from.
const PAGE_STORAGE_KEY = 'feed_current_page';

// Where a reader tab that needed a login should land once the login succeeds (see App.jsx).
const RETURN_TO_KEY = 'feed_return_to';

const appRoot = () => `${window.location.origin}${import.meta.env.BASE_URL}`;

// Carries only the issue id - never the JWT - so it is safe to share: whoever opens it reads
// through their own login, like the rest of the app.
export const getPublicationReaderUrl = (id) =>
  `${appRoot()}?${READER_PARAM}=${encodeURIComponent(id)}`;

export const readerIdFromLocation = () =>
  new URLSearchParams(window.location.search).get(READER_PARAM);

// Leaves the reader tab for a page of the main app (e.g. 'feedworld', 'login').
export function openAppPage(page) {
  try {
    sessionStorage.setItem(PAGE_STORAGE_KEY, page);
  } catch {
    // sessionStorage unavailable - the app just opens on home
  }
  window.location.assign(appRoot());
}

// Sends the reader to the app's login page, then back to this issue afterwards.
export function loginAndReturnHere() {
  try {
    sessionStorage.setItem(RETURN_TO_KEY, window.location.pathname + window.location.search);
  } catch {
    // no sessionStorage - login still works, it just lands on home
  }
  openAppPage('login');
}

// Read-once: the stored return path, if any, cleared as it's read. Only same-origin paths
// ("/..." but not "//host") are honoured, so it can never become an open redirect.
export function takeReturnTo() {
  try {
    const path = sessionStorage.getItem(RETURN_TO_KEY);
    sessionStorage.removeItem(RETURN_TO_KEY);
    return path && /^\/(?!\/)/.test(path) ? path : null;
  } catch {
    return null;
  }
}

// navigator.clipboard only exists in secure contexts - the app is also opened over plain http
// on a LAN IP (see api/config.js) - and can still refuse a write, so the legacy copy command
// backs it up. Rejects if neither worked. Used by the share dialog (components/ShareDialog.jsx).
export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // permission denied / document not focused - try the legacy path below
    }
  }
  // Selecting the hidden field moves focus to it, so focus is put back afterwards - otherwise
  // it would be left on <body>, outside whatever dialog the copy was made from.
  const previousFocus = document.activeElement;
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(field);
  previousFocus?.focus?.();
  if (!copied) throw new Error('Copy failed');
}
