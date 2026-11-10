// The app has no router - pages live in sessionStorage (see App.jsx) and the URL never changes -
// so a page opened "in a new tab" needs an address of its own. `/?page=<id>` is that address: App
// reads it once at load, opens on that page, then drops it from the URL so a later refresh on some
// other page isn't sent back here. A query string rather than a path so it works on any static host.
const PAGE_PARAM = 'page';

export const getAppPageUrl = (page) =>
  `${window.location.origin}${import.meta.env.BASE_URL}?${PAGE_PARAM}=${encodeURIComponent(page)}`;

// Read-once: the page the URL asks for, if any, removed from the address bar as it's read.
export function takePageFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get(PAGE_PARAM);
  if (page === null) return null;
  params.delete(PAGE_PARAM);
  const rest = params.toString();
  window.history.replaceState(
    window.history.state,
    '',
    window.location.pathname + (rest ? `?${rest}` : '') + window.location.hash,
  );
  return page;
}

// Opens a page of the app in its own tab. The new tab shares this one's login (the JWT is in
// localStorage), so signed-in-only pages open straight away.
export function openAppPageInNewTab(page) {
  window.open(getAppPageUrl(page), '_blank', 'noopener');
}
