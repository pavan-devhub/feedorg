import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeImage from '../components/FadeImage';
import ShareDialog from '../components/ShareDialog';
import {
  AlertCircle, BookOpen, ChevronDown, ChevronRight, Download, ExternalLink,
  FileText, Layers, Lock, RefreshCw, Share2
} from 'lucide-react';
import {
  fetchPublicationYears, fetchPublicationsByYear, getPublicationFileUrl,
  getPublicationThumbnailUrl, PUBLICATION_LANGUAGES, PUBLICATION_LANGUAGE_LABELS
} from '../api/publicationsApi';
import { getPublicationReaderUrl } from '../utils/publicationLinks';
import { isReleased, latestReleasedMonth } from '../utils/publicationRelease';
import './PublicationsHub.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// The page always opens on the Telugu edition; the Language dropdown switches from there.
const DEFAULT_LANGUAGE = 'Telugu';

const SKELETON_CARDS = 8;
const NO_ISSUES = [];

// Editions of `language` a reader can open in that year (see YearSummaryDto#languages).
const readableCount = (yearSummary, language) =>
  yearSummary?.languages?.find((l) => l.language === language)?.count ?? 0;

// The year the shelf opens on until the reader picks one: the newest year with that language's
// edition, else the newest year in any language. Only released years are ever in the catalog, so
// "newest" is this year or an earlier one.
function defaultYear(catalog, language) {
  const years = catalog.filter((y) => readableCount(y, language) > 0).map((y) => y.year);
  if (years.length) return Math.max(...years);
  return catalog[0]?.year ?? new Date().getFullYear();
}

// One year's readable issues in one language (a null year loads nothing). The result remembers
// which year/language (and retry) it was loaded for, so "loading" is simply "what's loaded isn't
// what was asked for" - no frame ever shows another year's issues, or an empty state, while the
// right ones are still on their way.
function useYearIssues(year, language, reloadKey) {
  const key = year == null ? null : `${year}|${language}|${reloadKey}`;
  const [loaded, setLoaded] = useState({ key: null, issues: NO_ISSUES, error: false });

  useEffect(() => {
    if (key == null) return undefined;
    let cancelled = false;
    fetchPublicationsByYear(year, language)
      // Only released issues whose PDF is actually on disk are offered.
      .then((list) => {
        if (cancelled) return;
        const latest = latestReleasedMonth();
        const readable = (Array.isArray(list) ? list : []).filter((p) => p.pdfAvailable && isReleased(p, latest));
        setLoaded({ key, issues: readable, error: false });
      })
      .catch(() => { if (!cancelled) setLoaded({ key, issues: NO_ISSUES, error: true }); });
    return () => { cancelled = true; };
  }, [key, year, language]);

  const current = key != null && loaded.key === key;
  return {
    issues: current ? loaded.issues : NO_ISSUES,
    loading: key != null && !current,
    error: current && loaded.error,
  };
}

const PublicationsHub = ({ onNavigate, isLoggedIn, user, onLogout }) => {
  // Every year with at least one issue, newest first, with per-language counts. null = loading.
  const [catalog, setCatalog] = useState(null);
  const [catalogError, setCatalogError] = useState(false);

  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  // null until the reader picks a year - until then the default follows the chosen language.
  const [pickedYear, setPickedYear] = useState(null);
  // Archive years the reader has unfolded or folded by hand; any year not in here uses its
  // default (see isArchiveOpen). Cleared whenever the year or language changes.
  const [archiveToggled, setArchiveToggled] = useState({});

  const [reloadKey, setReloadKey] = useState(0);

  // The issue whose share dialog is open, if any.
  const [sharing, setSharing] = useState(null);

  const year = pickedYear ?? (catalog ? defaultYear(catalog, language) : null);
  const languageLabel = PUBLICATION_LANGUAGE_LABELS[language] || language;
  const summaryOf = (y) => catalog?.find((c) => c.year === y);

  // The selected year's shelf. Only thumbnails load here - a PDF is fetched only when an issue
  // is actually opened, in its own tab.
  const shelf = useYearIssues(isLoggedIn ? year : null, language, reloadKey);
  const issues = shelf.issues;
  const issuesLoading = shelf.loading;
  const issuesError = shelf.error;

  // The archive: every year before the selected one that has this language's edition, newest
  // first. The selected year itself is on the shelf beside it, and a future year is never in the
  // catalog. Only the newest archive year starts unfolded; each one fetches its months only once
  // it's unfolded (see ArchiveYear).
  const archiveYears = (catalog || [])
    .filter((y) => year != null && y.year < year && readableCount(y, language) > 0)
    .map((y) => y.year)
    .sort((a, b) => b - a);
  const isArchiveOpen = (y) => archiveToggled[y] ?? y === archiveYears[0];
  const toggleArchiveYear = (y) => setArchiveToggled((t) => ({ ...t, [y]: !isArchiveOpen(y) }));

  useEffect(() => {
    if (!isLoggedIn) return undefined;
    let cancelled = false;
    fetchPublicationYears()
      .then((years) => {
        if (cancelled) return;
        // A year appears only once its January has arrived - never a future year.
        const currentYear = latestReleasedMonth().year;
        setCatalog((Array.isArray(years) ? years : []).filter((y) => y.year <= currentYear));
        setCatalogError(false);
      })
      .catch(() => {
        if (cancelled) return;
        setCatalog([]);
        setCatalogError(true);
      });
    return () => { cancelled = true; };
  }, [isLoggedIn, reloadKey]);

  const retry = () => {
    if (catalogError) setCatalog(null);
    setReloadKey((k) => k + 1);
  };

  const changeLanguage = (next) => {
    setLanguage(next);
    setArchiveToggled({});
  };

  const changeYear = (next) => {
    setPickedYear(next);
    setArchiveToggled({});
  };

  const hero = (
    <div className="pubs-hero">
      <div className="pubs-hero-overlay"></div>
      <div className="pubs-hero-content">
        <div className="pubs-hero-label">
          <BookOpen size={14} /> PUBLICATIONS
        </div>
        <h1 className="pubs-hero-title">
          <span className="fw-brand-text">Feed World</span>
          <span className="pubs-highlight-text">Publications</span>
        </h1>
        <p className="pubs-hero-subtitle">
          Explore insights, reports and updates that<br />
          empower agriculture and global trade.
        </p>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="pubs-page">
        <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="feedworld" />
        <div className="pubs-navbar-spacer"></div>

        <div className="pubs-hub-container">
          {hero}
          <div className="pubs-login-gate">
            <div className="pubs-login-gate-icon"><Lock size={28} /></div>
            <h2>Please log in to use this feature</h2>
            <p>Feed World publications are available to logged-in members only.</p>
            <button className="pubs-primary-btn" onClick={() => onNavigate('login')}>
              Log In
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  const yearSummary = catalog?.find((y) => y.year === year);
  const otherLanguagesThisYear = PUBLICATION_LANGUAGES.filter(
    (l) => l !== language && readableCount(yearSummary, l) > 0
  );
  const otherYearsThisLanguage = (catalog || [])
    .filter((y) => y.year !== year && readableCount(y, language) > 0)
    .map((y) => y.year);

  let shelfBody;
  if (catalog === null || issuesLoading) {
    shelfBody = (
      <ul className="pubs-grid" aria-busy="true" aria-label="Loading publications">
        {Array.from({ length: SKELETON_CARDS }, (_, i) => (
          <li key={i} className="pubs-card is-skeleton" aria-hidden="true">
            <span className="pubs-skeleton-line" />
            <span className="pubs-card-cover" />
          </li>
        ))}
      </ul>
    );
  } else if (catalogError || issuesError) {
    shelfBody = (
      <div className="pubs-empty">
        <div className="pubs-empty-icon is-error"><AlertCircle size={28} /></div>
        <h3>Publications couldn't be loaded</h3>
        <p>Please check your connection and try again.</p>
        <button type="button" className="pubs-primary-btn" onClick={retry}>
          <RefreshCw size={16} /> Try again
        </button>
      </div>
    );
  } else if (catalog.length === 0) {
    shelfBody = (
      <div className="pubs-empty">
        <div className="pubs-empty-icon"><BookOpen size={28} /></div>
        <h3>No publications yet</h3>
        <p>Feed World issues will appear here as soon as they're published.</p>
      </div>
    );
  } else if (issues.length === 0) {
    shelfBody = (
      <div className="pubs-empty">
        <div className="pubs-empty-icon"><BookOpen size={28} /></div>
        <h3>No {languageLabel} editions for {year} yet</h3>
        <p>New issues appear here as soon as they're published.</p>
        {otherLanguagesThisYear.length > 0 && (
          <div className="pubs-empty-row">
            <span>Read {year} in</span>
            {otherLanguagesThisYear.map((l) => (
              <button key={l} type="button" className="pubs-chip" onClick={() => changeLanguage(l)}>
                {PUBLICATION_LANGUAGE_LABELS[l]}
              </button>
            ))}
          </div>
        )}
        {otherYearsThisLanguage.length > 0 && (
          <div className="pubs-empty-row">
            <span>{languageLabel} editions from</span>
            {otherYearsThisLanguage.map((y) => (
              <button key={y} type="button" className="pubs-chip" onClick={() => changeYear(y)}>{y}</button>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    shelfBody = (
      <ul className="pubs-grid">
        {issues.map((pub) => (
          <IssueCard key={pub.id} pub={pub} onShare={setSharing} />
        ))}
      </ul>
    );
  }

  // Hidden while loading, on error, and at zero - the empty state already says so.
  const shelfCount = catalog && !issuesLoading && !issuesError && issues.length > 0 ? issues.length : null;

  return (
    <div className="pubs-page">
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="feedworld" />
      <div className="pubs-navbar-spacer"></div>

      <div className="pubs-hub-container">
        {hero}

        {/* FIND A PUBLICATION */}
        <section className="pubs-finder-card" aria-label="Find a publication">
          <div className="pubs-finder-brand">
            <div className="pubs-finder-icon-wrap"><BookOpen size={22} /></div>
            <span className="pubs-finder-label">Find a Publication</span>
          </div>
          <div className="pubs-finder-fields">
            <div className="pubs-finder-field">
              <label htmlFor="pubs-year">Year</label>
              <select
                id="pubs-year"
                value={year ?? ''}
                onChange={(e) => changeYear(Number(e.target.value))}
                disabled={!catalog || catalog.length === 0}
              >
                {!catalog && <option value="">Loading…</option>}
                {catalog && catalog.length === 0 && <option value={year ?? ''}>{year}</option>}
                {catalog && catalog.map((y) => (
                  <option key={y.year} value={y.year}>{y.year}</option>
                ))}
              </select>
            </div>
            <span className="pubs-finder-divider" aria-hidden="true"></span>
            <div className="pubs-finder-field">
              <label htmlFor="pubs-language">Language</label>
              <select id="pubs-language" value={language} onChange={(e) => changeLanguage(e.target.value)}>
                {PUBLICATION_LANGUAGES.map((l) => (
                  <option key={l} value={l}>{PUBLICATION_LANGUAGE_LABELS[l]}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="pubs-main-layout">
          {/* PUBLICATION ARCHIVE */}
          <aside className="pubs-archive-panel" aria-label="Publication archive">
            <div className="pubs-archive-title">
              <Layers size={18} /> Publication Archive
            </div>

            {catalog === null && (
              <div className="pubs-archive-loading" aria-hidden="true">
                {[0, 1, 2].map((i) => <span key={i} className="pubs-skeleton-line" />)}
              </div>
            )}

            {catalog && !catalogError && year != null && (
              archiveYears.length > 0 ? archiveYears.map((y) => (
                <ArchiveYear
                  key={y}
                  year={y}
                  language={language}
                  count={readableCount(summaryOf(y), language)}
                  open={isArchiveOpen(y)}
                  onToggle={() => toggleArchiveYear(y)}
                  reloadKey={reloadKey}
                  onRetry={retry}
                />
              )) : (
                <p className="pubs-archive-empty">No {languageLabel} editions before {year}.</p>
              )
            )}
          </aside>

          {/* ONE YEAR'S SHELF */}
          <section className="pubs-shelf" aria-labelledby="pubs-shelf-title">
            <header className="pubs-shelf-head">
              <h2 id="pubs-shelf-title">
                {language} Publications{year != null ? ` – ${year}` : ''}
              </h2>
              {shelfCount !== null && (
                <span className="pubs-shelf-count">
                  {shelfCount} Monthly Publication{shelfCount === 1 ? '' : 's'}
                </span>
              )}
            </header>
            {shelfBody}
          </section>
        </div>
      </div>

      <Footer />

      {sharing && <ShareDialog publication={sharing} onClose={() => setSharing(null)} />}
    </div>
  );
};

// One earlier year in the archive: a header that folds/unfolds it, and - once unfolded - its
// twelve months. Its issues are only fetched while it's unfolded, so a long archive costs one
// request per year the reader actually opens.
const ArchiveYear = ({ year, language, count, open, onToggle, reloadKey, onRetry }) => {
  const { issues, loading, error } = useYearIssues(open ? year : null, language, reloadKey);
  const byMonth = useMemo(() => new Map(issues.map((p) => [p.month, p])), [issues]);
  const languageLabel = PUBLICATION_LANGUAGE_LABELS[language] || language;

  return (
    <div className={`pubs-archive-year ${open ? 'is-active' : ''}`}>
      <button
        type="button"
        className="pubs-archive-year-btn"
        aria-expanded={open}
        aria-controls={`pubs-archive-${year}`}
        onClick={onToggle}
      >
        <span className="pubs-archive-year-label">{year} ({languageLabel})</span>
        <span className="pubs-archive-count" title={`${count} ${language} edition${count === 1 ? '' : 's'}`}>
          {count}
        </span>
        <ChevronDown size={16} className="pubs-archive-year-chevron" />
      </button>
      {open && <ArchiveMonths year={year} byMonth={byMonth} loading={loading} error={error} onRetry={onRetry} />}
    </div>
  );
};

// One archive year's twelve months: a month with an issue links to it (new tab), the rest say
// why there's nothing to open.
const ArchiveMonths = ({ year, byMonth, loading, error, onRetry }) => (
  <ul id={`pubs-archive-${year}`} className="pubs-archive-months">
    {error ? (
      <li className="pubs-archive-note">
        {year} couldn't be loaded.
        <button type="button" onClick={onRetry}>Try again</button>
      </li>
    ) : MONTH_NAMES.map((name, i) => {
      const pub = byMonth.get(i + 1);
      if (loading) {
        return (
          <li key={name}>
            <span className="pubs-archive-month is-loading"><FileText size={16} /> {name}</span>
          </li>
        );
      }
      return (
        <li key={name}>
          {pub ? (
            <a
              className="pubs-archive-month"
              href={getPublicationReaderUrl(pub.id)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Open ${name} ${year} in a new tab`}
            >
              <FileText size={16} />
              <span>{name}<span className="pubs-sr-only"> {year}, opens in a new tab</span></span>
              <ChevronRight size={16} className="pubs-archive-month-chevron" />
            </a>
          ) : (
            <span className="pubs-archive-month is-unavailable">
              <FileText size={16} />
              <span>{name}</span>
              <em>Not published</em>
            </span>
          )}
        </li>
      );
    })}
  </ul>
);

// One issue on the shelf. The cover is a real link (so middle-click / "open in new tab" work
// too) to the issue's reader tab; Share and Download sit beside it, not inside it.
const IssueCard = ({ pub, onShare }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const name = `${pub.title} – ${pub.monthName} ${pub.year} (${pub.language})`;

  return (
    <li className="pubs-card">
      <h3 className="pubs-card-month">{pub.monthName}</h3>
      <div className="pubs-card-cover">
        <a
          className="pubs-card-link"
          href={getPublicationReaderUrl(pub.id)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${name} – opens in a new tab`}
        >
          {coverFailed ? (
            <span className="pubs-card-fallback" aria-hidden="true">
              <strong>FEED WORLD</strong>
              <small>{pub.monthName} {pub.year}</small>
            </span>
          ) : (
            <FadeImage
              src={getPublicationThumbnailUrl(pub.id)}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setCoverFailed(true)}
            />
          )}
          <span className="pubs-card-hover" aria-hidden="true">
            <ExternalLink size={16} /> Read issue
            {pub.pageCount ? <small>{pub.pageCount} pages</small> : null}
          </span>
        </a>
        <div className="pubs-card-actions">
          <button
            type="button"
            className="pubs-card-action"
            onClick={() => onShare(pub)}
            aria-label={`Share ${name}`}
            aria-haspopup="dialog"
            title="Share"
          >
            <Share2 size={15} />
          </button>
          <a
            className="pubs-card-action is-download"
            href={getPublicationFileUrl(pub.id, { download: true })}
            aria-label={`Download ${name} PDF`}
            title="Download PDF"
          >
            <Download size={15} />
          </a>
        </div>
      </div>
    </li>
  );
};

export default PublicationsHub;
