import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PdfViewer from '../../components/PdfViewer';
import {
  BookOpen, Plus, RefreshCw, Trash2, Eye, Download, X, UploadCloud,
  FileText, AlertCircle, CheckCircle2, Loader2
} from 'lucide-react';
import {
  fetchPublicationYears, fetchAdminPublications,
  createPublication, replacePublicationPdf, deletePublicationAdmin,
  fetchPublicationPdfBlob, getPublicationFileUrl, PUBLICATION_LANGUAGES,
  PUBLICATION_DEFAULT_TITLE
} from '../../api/publicationsApi';
import useScrollToTop from '../../hooks/useScrollToTop';
import { formatPublishedDate } from '../../utils/publicationDate';
import { latestReleasedMonth } from '../../utils/publicationRelease';
import { Pagination } from './adminUi';
import './AdminDashboard.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// A fully uploaded month has three editions, so multiples of three keep such a month's rows on
// one page.
const PAGE_SIZES = [6, 12, 24, 48];
const DEFAULT_PAGE_SIZE = 12;

// Published = readers can open it: its month has begun (the 1st, India time - see
// PublicationVisibility). An issue uploaded ahead of its month is Not published until then.
const STATUS_FILTERS = [
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'NOT_PUBLISHED', label: 'Not published' },
];

const EMPTY_PAGE = { items: [], total: 0, totalPages: 1 };

const LANGUAGE_BADGES = { English: 'EN', Telugu: 'TE', Hindi: 'HI' };

const LanguageBadge = ({ language }) => (
  <span className={`admin-pub-lang-badge admin-pub-lang-badge-${(language || '').toLowerCase()}`}>
    <span className="admin-pub-lang-badge-code">{LANGUAGE_BADGES[language] || language}</span>
    {language}
  </span>
);

const StatusBadge = ({ published }) => (
  <span className={`admin-pub-status-badge ${published ? 'published' : 'not-published'}`}>
    <span className="admin-pub-status-dot" />
    {published ? 'Published' : 'Not published'}
  </span>
);

// The title starts as "Feed World"; the admin can change it, and clearing it falls back to
// "Feed World" again (on the backend too).
const emptyAddForm = (year, month) => ({
  title: PUBLICATION_DEFAULT_TITLE,
  year: year || latestReleasedMonth().year,
  month: month || '',
  language: 'English',
  file: null,
});

/**
 * Admin-only publication management (see AdminPublicationController / SecurityConfig's
 * hasRole("ADMIN") matcher on /api/admin/**). App.jsx only ever renders this for a logged-in user
 * whose role is ADMIN, but the backend is the real gate - every write here would be rejected with
 * 403 for anyone else regardless of what the frontend shows. `embedded` renders just the content,
 * for the Feed World section of the shared admin panel (AdminPortal), which supplies the page chrome.
 */
const AdminDashboard = ({ onNavigate, isLoggedIn, user, onLogout, embedded = false }) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [monthFilter, setMonthFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [result, setResult] = useState(EMPTY_PAGE);
  // Bumped to fetch the current page again after an add, replace or delete.
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [banner, setBanner] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState(emptyAddForm());
  const [addTakenLanguages, setAddTakenLanguages] = useState([]);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [addError, setAddError] = useState('');

  const [replacing, setReplacing] = useState(null);
  const [replaceFile, setReplaceFile] = useState(null);
  const [replaceSubmitting, setReplaceSubmitting] = useState(false);
  const [replaceError, setReplaceError] = useState('');

  const [deleting, setDeleting] = useState(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const [viewing, setViewing] = useState(null);
  const [viewPdfUrl, setViewPdfUrl] = useState(null);
  const [viewError, setViewError] = useState('');
  const viewPdfUrlRef = useRef(null);

  useScrollToTop(selectedYear);

  const showBanner = (type, message) => {
    setBanner({ type, message });
    setTimeout(() => setBanner((b) => (b && b.message === message ? null : b)), 4000);
  };

  // The page opens on the current year (India time, like the release rule), and that year is
  // always in the list - even before anything has been uploaded for it. Older and later years
  // appear once they have an upload.
  const loadYears = useCallback(async () => {
    try {
      const data = await fetchPublicationYears();
      const currentYear = latestReleasedMonth().year;
      const sorted = Array.from(new Set([...(data || []).map((y) => y.year), currentYear])).sort((a, b) => b - a);
      setYears(sorted);
      setSelectedYear((prev) => (prev && sorted.includes(prev) ? prev : currentYear));
      return sorted;
    } catch (e) {
      setLoadError(e.message || 'Failed to load publication years.');
      return [];
    }
  }, []);

  useEffect(() => {
    loadYears();
  }, [loadYears]);

  // The backend pages the table (see AdminPublicationController#list): the year's uploaded
  // editions only - so a year shows just the months that have a PDF - newest month first, each
  // month's editions in language order, each marked Published or Not published.
  useEffect(() => {
    if (!selectedYear) {
      setResult(EMPTY_PAGE);
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    setLoadError('');
    fetchAdminPublications({ year: selectedYear, month: monthFilter, status: statusFilter, page: page - 1, size: pageSize })
      .then((data) => { if (!cancelled) setResult(data); })
      .catch((e) => {
        if (!cancelled) {
          setLoadError(e.message || 'Failed to load publications.');
          setResult(EMPTY_PAGE);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [selectedYear, monthFilter, statusFilter, page, pageSize, reloadKey]);

  const rows = result.items;
  const pageCount = Math.max(1, result.totalPages);
  const pager = {
    page,
    pageCount,
    pageSize,
    start: (page - 1) * pageSize,
    total: result.total,
    setPage,
    setPageSize: (size) => { setPageSize(size); setPage(1); },
  };

  // A delete can empty the last page - step back to the new last one.
  useEffect(() => {
    if (!loading && page > pageCount) setPage(pageCount);
  }, [loading, page, pageCount]);

  // This page's rows, grouped by month so the Year/Month cells can span each month's editions. A
  // month split across two pages simply continues on the next one.
  const monthGroups = [];
  rows.forEach((row) => {
    const { month } = row.publication;
    const last = monthGroups[monthGroups.length - 1];
    if (last && last.month === month) last.rows.push(row);
    else monthGroups.push({ month, rows: [row] });
  });

  const filtersActive = Boolean(monthFilter || statusFilter);
  const shownPeriod = monthFilter ? `${MONTH_NAMES[monthFilter - 1]} ${selectedYear}` : `${selectedYear}`;
  const statusLabel = STATUS_FILTERS.find((s) => s.value === statusFilter)?.label.toLowerCase();
  const tableSummary = `${result.total} ${statusLabel || 'uploaded'} PDF${result.total === 1 ? '' : 's'} in ${shownPeriod}`;
  const emptyMessage = statusLabel
    ? `No ${statusLabel} PDFs in ${shownPeriod}.`
    : `No PDFs uploaded for ${shownPeriod}.`;

  // Any filter change starts again from the first page.
  const changeYear = (year) => { setSelectedYear(year); setPage(1); };
  const changeMonth = (month) => { setMonthFilter(month); setPage(1); };
  const changeStatus = (status) => { setStatusFilter(status); setPage(1); };
  const clearFilters = () => { setMonthFilter(''); setStatusFilter(''); setPage(1); };

  // After a change the year list is reloaded too: a delete can empty a year (loadYears then moves
  // to the current year), and an add can create one - which the table then switches to.
  const refreshAfterChange = async (landOnYear) => {
    const sorted = await loadYears();
    if (landOnYear && sorted.includes(landOnYear) && landOnYear !== selectedYear) changeYear(landOnYear);
    else if (!sorted.includes(selectedYear)) setPage(1);
    setReloadKey((k) => k + 1);
  };

  // --- Add ---
  // Starts on the year the table is showing, and on its month when the Month filter is set.
  const openAdd = () => {
    setAddForm(emptyAddForm(selectedYear, monthFilter));
    setAddError('');
    setAddOpen(true);
  };

  // Which languages already have a PDF for the modal's year/month, so the modal can grey those
  // out. Asked of the backend, since the table only holds one page; the backend also rejects a
  // duplicate upload regardless. A row whose PDF has gone missing doesn't count - uploading that
  // edition again fills it back in.
  useEffect(() => {
    setAddTakenLanguages([]);
    if (!addOpen || !addForm.month || !/^\d{4}$/.test(String(addForm.year))) return undefined;
    let cancelled = false;
    fetchAdminPublications({ year: addForm.year, month: addForm.month, size: PUBLICATION_LANGUAGES.length })
      .then((data) => {
        if (cancelled) return;
        setAddTakenLanguages(data.items.filter((row) => row.publication.pdfAvailable).map((row) => row.publication.language));
      })
      .catch(() => {}); // the backend's duplicate check still applies
    return () => { cancelled = true; };
  }, [addOpen, addForm.year, addForm.month]);

  // Whenever the picked language turns out to be taken, jump to the first still-available one, so
  // the admin is never left with a disabled option selected.
  useEffect(() => {
    if (!addOpen || !addTakenLanguages.includes(addForm.language)) return;
    const nextAvailable = PUBLICATION_LANGUAGES.find((lang) => !addTakenLanguages.includes(lang));
    if (nextAvailable) setAddForm((f) => ({ ...f, language: nextAvailable }));
  }, [addOpen, addForm.language, addTakenLanguages]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!addForm.file) {
      setAddError('Please choose a PDF file.');
      return;
    }
    if (!addForm.month) {
      setAddError('Please select a month.');
      return;
    }
    setAddSubmitting(true);
    setAddError('');
    try {
      const created = await createPublication(addForm);
      setAddOpen(false);
      showBanner('success', `"${created?.title || PUBLICATION_DEFAULT_TITLE}" - ${addForm.language} edition for ${MONTH_NAMES[addForm.month - 1]} ${addForm.year} added.`);
      await refreshAfterChange(Number(addForm.year));
    } catch (err) {
      setAddError(err.message || 'Failed to add publication.');
    } finally {
      setAddSubmitting(false);
    }
  };

  // --- Replace PDF ---
  const openReplace = (pub) => {
    setReplacing(pub);
    setReplaceFile(null);
    setReplaceError('');
  };

  const handleReplaceSubmit = async (e) => {
    e.preventDefault();
    if (!replaceFile) {
      setReplaceError('Please choose a new PDF file.');
      return;
    }
    setReplaceSubmitting(true);
    setReplaceError('');
    try {
      await replacePublicationPdf(replacing.id, replaceFile);
      showBanner('success', `PDF replaced for the ${replacing.language} edition of ${replacing.monthName} ${replacing.year}.`);
      setReplacing(null);
      await refreshAfterChange();
    } catch (err) {
      setReplaceError(err.message || 'Failed to replace the PDF.');
    } finally {
      setReplaceSubmitting(false);
    }
  };

  // --- Delete ---
  const handleDeleteConfirm = async () => {
    setDeleteSubmitting(true);
    try {
      await deletePublicationAdmin(deleting.id);
      showBanner('success', `${deleting.language} edition of ${deleting.monthName} ${deleting.year} deleted.`);
      setDeleting(null);
      await refreshAfterChange();
    } catch (err) {
      showBanner('error', err.message || 'Failed to delete publication.');
      setDeleting(null);
    } finally {
      setDeleteSubmitting(false);
    }
  };

  // --- View ---
  // Fetches the PDF into an in-memory blob and hands react-pdf that blob URL instead of linking
  // straight to /file - opening /file directly leaves viewing at the mercy of the browser's own
  // "always download PDFs" setting, which is exactly what happened here (see PublicationsHub's
  // showPublication/fetchPublicationPdfBlob for the same pattern on the public reader page).
  const releaseViewPdf = () => {
    if (viewPdfUrlRef.current) {
      URL.revokeObjectURL(viewPdfUrlRef.current);
      viewPdfUrlRef.current = null;
    }
  };

  useEffect(() => releaseViewPdf, []);

  const openView = async (pub) => {
    releaseViewPdf();
    setViewPdfUrl(null);
    setViewError('');
    setViewing(pub);
    try {
      const blob = await fetchPublicationPdfBlob(pub.id);
      const objectUrl = URL.createObjectURL(blob);
      viewPdfUrlRef.current = objectUrl;
      setViewPdfUrl(objectUrl);
    } catch (err) {
      setViewError(err.message || 'The PDF for this issue could not be loaded.');
    }
  };

  const closeView = () => {
    releaseViewPdf();
    setViewPdfUrl(null);
    setViewError('');
    setViewing(null);
  };

  const Page = embedded ? React.Fragment : 'div';
  return (
    <Page {...(embedded ? {} : { className: 'admin-pub-page' })}>
      {!embedded && (
        <>
          <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="admin-dashboard" />
          <div style={{ height: '86px', flexShrink: 0 }} />
        </>
      )}

      <div className={embedded ? undefined : 'admin-pub-container'}>
        <div className="admin-pub-header">
          <div>
            <div className="admin-pub-eyebrow"><BookOpen size={14} /> FEED WORLD</div>
            <h1>Publication Management</h1>
            <p>Add, replace or remove Feed World's monthly issues. Readers can open an issue from the 1st of its month.</p>
          </div>
          <button type="button" className="admin-pub-btn primary" onClick={() => openAdd()}>
            <Plus size={16} /> Add Publication
          </button>
        </div>

        {banner && (
          <div className={`admin-pub-banner ${banner.type}`}>
            {banner.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {banner.message}
          </div>
        )}
        {loadError && (
          <div className="admin-pub-banner error"><AlertCircle size={16} /> {loadError}</div>
        )}

        <div className="adm-filters">
          <label className="adm-filter">
            <span>Year</span>
            <select value={selectedYear || ''} onChange={(e) => changeYear(Number(e.target.value))}>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </label>
          <label className="adm-filter">
            <span>Month</span>
            <select value={monthFilter} onChange={(e) => changeMonth(e.target.value ? Number(e.target.value) : '')}>
              <option value="">All months</option>
              {MONTH_NAMES.map((m, idx) => (
                <option key={m} value={idx + 1}>{m}</option>
              ))}
            </select>
          </label>
          <label className="adm-filter">
            <span>Status</span>
            <select value={statusFilter} onChange={(e) => changeStatus(e.target.value)}>
              <option value="">All statuses</option>
              {STATUS_FILTERS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
          {filtersActive && (
            <button type="button" className="adm-link-btn" onClick={clearFilters}>
              <X size={14} /> Clear
            </button>
          )}
        </div>

        <div className="admin-pub-table-wrap">
          {loading && rows.length === 0 ? (
            <div className="admin-pub-empty"><Loader2 size={18} className="admin-pub-spin" /> Loading publications…</div>
          ) : rows.length === 0 ? (
            <div className="admin-pub-empty">{emptyMessage}</div>
          ) : (
            <>
              <div className="adm-table-caption">
                {tableSummary}
                {loading && <Loader2 size={13} className="admin-pub-spin" style={{ marginLeft: 8, verticalAlign: 'middle' }} />}
              </div>
              <table className="admin-pub-table admin-pub-table-grouped">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Language</th>
                    <th>Order</th>
                    <th>Title</th>
                    <th>Release date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* One row per uploaded edition, in the backend's order (Telugu, Hindi, English
                      within a month), with Year/Month spanning the month's rows via rowSpan instead
                      of repeating. The rowSpan cells only exist in the DOM on the first row of each
                      group, which reads fine on the desktop table but leaves the other rows with no
                      visible year/month once the responsive layout stacks every cell into its own
                      block below 560px - this mobile-only header row (hidden on desktop) carries
                      that context instead. */}
                  {monthGroups.map(({ month, rows: monthRows }) => ([
                      <tr key={`${month}-mobile-header`} className="admin-pub-mobile-group-header">
                        <td colSpan={8}>{selectedYear} — {MONTH_NAMES[month - 1]}</td>
                      </tr>,
                      ...monthRows.map(({ publication: pub, status }, i) => {
                        // A row can outlive its PDF on the server: it can't be viewed, but Replace
                        // puts a new PDF in place and Delete removes it.
                        const pdfMissing = pub.pdfAvailable === false;
                        return (
                          <tr key={pub.id} className={i === 0 ? 'admin-pub-group-start' : undefined}>
                            {i === 0 && (
                              <>
                                <td rowSpan={monthRows.length} className="admin-pub-group-cell" data-label="Year">{pub.year}</td>
                                <td rowSpan={monthRows.length} className="admin-pub-group-cell" data-label="Month">{MONTH_NAMES[month - 1]}</td>
                              </>
                            )}
                            <td data-label="Language"><LanguageBadge language={pub.language} /></td>
                            <td data-label="Order">{pub.order}</td>
                            <td data-label="Title">{pub.title}</td>
                            <td data-label="Release date">{pub.publishedDate ? formatPublishedDate(pub.publishedDate) : '—'}</td>
                            <td data-label="Status">
                              <StatusBadge published={status === 'PUBLISHED'} />
                              {pdfMissing && <span className="admin-pub-pdf-missing"><AlertCircle size={12} /> PDF missing</span>}
                            </td>
                            <td className="admin-pub-actions" data-label="Actions">
                              {!pdfMissing && (
                                <>
                                  <button type="button" className="admin-pub-icon-btn" title="View PDF" onClick={() => openView(pub)}>
                                    <Eye size={15} />
                                  </button>
                                  <a className="admin-pub-icon-btn" href={getPublicationFileUrl(pub.id, { download: true })} title="Download PDF">
                                    <Download size={15} />
                                  </a>
                                </>
                              )}
                              <button type="button" className="admin-pub-icon-btn" title="Replace PDF" onClick={() => openReplace(pub)}>
                                <RefreshCw size={15} />
                              </button>
                              <button type="button" className="admin-pub-icon-btn danger" title="Delete" onClick={() => setDeleting(pub)}>
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        );
                      }),
                    ]))}
                </tbody>
              </table>
              <Pagination pager={pager} noun="PDFs" sizes={PAGE_SIZES} />
            </>
          )}
        </div>
      </div>

      {addOpen && (
        <div className="admin-pub-modal-backdrop" onClick={() => !addSubmitting && setAddOpen(false)}>
          <div className="admin-pub-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-pub-modal-header">
              <h3><UploadCloud size={18} /> Add Publication</h3>
              <button type="button" onClick={() => setAddOpen(false)} disabled={addSubmitting}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddSubmit} className="admin-pub-form">
              {addError && <div className="admin-pub-form-error"><AlertCircle size={14} /> {addError}</div>}
              <label>
                Title
                <input
                  type="text"
                  value={addForm.title}
                  onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder={PUBLICATION_DEFAULT_TITLE}
                  maxLength={255}
                />
                <span className="admin-pub-hint">Left empty, the issue is saved as "{PUBLICATION_DEFAULT_TITLE}".</span>
              </label>
              <div className="admin-pub-form-row">
                <label>
                  Year
                  <input
                    type="number"
                    value={addForm.year}
                    onChange={(e) => setAddForm((f) => ({ ...f, year: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  Month
                  <select
                    value={addForm.month}
                    onChange={(e) => setAddForm((f) => ({ ...f, month: e.target.value }))}
                    required
                  >
                    <option value="">Select month</option>
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={idx + 1}>{m}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="admin-pub-field-block">
                <span className="admin-pub-field-label">Language</span>
                <div className="admin-pub-lang-picker">
                  {PUBLICATION_LANGUAGES.map((lang) => {
                    const isTaken = addTakenLanguages.includes(lang);
                    const isSelected = addForm.language === lang;
                    return (
                      <button
                        type="button"
                        key={lang}
                        className={`admin-pub-lang-option ${isSelected ? 'selected' : ''} ${isTaken ? 'taken' : ''}`}
                        disabled={isTaken}
                        onClick={() => setAddForm((f) => ({ ...f, language: lang }))}
                      >
                        <LanguageBadge language={lang} />
                        <span className="admin-pub-lang-option-note">
                          {isTaken ? '✓ Already uploaded' : '○ Available'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <label>
                PDF File
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setAddForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
                  required
                />
              </label>
              <div className="admin-pub-form-actions">
                <button type="button" onClick={() => setAddOpen(false)} disabled={addSubmitting}>Cancel</button>
                <button type="submit" className="primary" disabled={addSubmitting}>
                  {addSubmitting ? (<><Loader2 size={14} className="admin-pub-spin" /> Adding…</>) : 'Add Publication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {replacing && (
        <div className="admin-pub-modal-backdrop" onClick={() => !replaceSubmitting && setReplacing(null)}>
          <div className="admin-pub-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-pub-modal-header">
              <h3><RefreshCw size={18} /> Replace PDF</h3>
              <button type="button" onClick={() => setReplacing(null)} disabled={replaceSubmitting}><X size={18} /></button>
            </div>
            <form onSubmit={handleReplaceSubmit} className="admin-pub-form">
              {replaceError && <div className="admin-pub-form-error"><AlertCircle size={14} /> {replaceError}</div>}
              <div className="admin-pub-replace-summary">
                <div><span>Current Publication</span><strong>{replacing.language} — {replacing.monthName} {replacing.year}</strong></div>
                <div><span>Current PDF</span><strong>{replacing.pdfAvailable === false ? 'Missing' : 'Available'}</strong></div>
              </div>
              <label>
                New PDF
                <input type="file" accept="application/pdf" onChange={(e) => setReplaceFile(e.target.files?.[0] || null)} required />
              </label>
              <p className="admin-pub-hint">
                <AlertCircle size={13} /> This replaces the existing PDF and regenerates its cover thumbnail. This cannot be undone.
              </p>
              <div className="admin-pub-form-actions">
                <button type="button" onClick={() => setReplacing(null)} disabled={replaceSubmitting}>Cancel</button>
                <button type="submit" className="primary" disabled={replaceSubmitting}>
                  {replaceSubmitting ? (<><Loader2 size={14} className="admin-pub-spin" /> Replacing…</>) : 'Replace PDF'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleting && (
        <div className="admin-pub-modal-backdrop" onClick={() => !deleteSubmitting && setDeleting(null)}>
          <div className="admin-pub-modal admin-pub-modal-narrow" onClick={(e) => e.stopPropagation()}>
            <div className="admin-pub-modal-header">
              <h3><Trash2 size={18} /> Delete Publication?</h3>
              <button type="button" onClick={() => setDeleting(null)} disabled={deleteSubmitting}><X size={18} /></button>
            </div>
            <div className="admin-pub-form">
              <p>Delete the <strong>{deleting.language} edition of {deleting.monthName} {deleting.year}</strong>?</p>
              <p className="admin-pub-hint">This will permanently delete:</p>
              <ul className="admin-pub-delete-list">
                <li><FileText size={13} /> PDF</li>
                <li><FileText size={13} /> Thumbnail</li>
                <li><FileText size={13} /> Metadata</li>
              </ul>
              <div className="admin-pub-form-actions">
                <button type="button" onClick={() => setDeleting(null)} disabled={deleteSubmitting}>Cancel</button>
                <button type="button" className="danger" onClick={handleDeleteConfirm} disabled={deleteSubmitting}>
                  {deleteSubmitting ? (<><Loader2 size={14} className="admin-pub-spin" /> Deleting…</>) : (<><Trash2 size={14} /> Delete</>)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewing && (
        <div className="admin-pub-modal-backdrop" onClick={closeView}>
          <div className="admin-pub-modal admin-pub-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="admin-pub-modal-header">
              <h3><Eye size={18} /> {viewing.language} — {viewing.monthName} {viewing.year}</h3>
              <button type="button" onClick={closeView}><X size={18} /></button>
            </div>
            <div className="admin-pub-view-body">
              {!viewPdfUrl && !viewError && (
                <div className="admin-pub-empty"><Loader2 size={18} className="admin-pub-spin" /> Loading PDF…</div>
              )}
              {viewError && <div className="admin-pub-form-error"><AlertCircle size={14} /> {viewError}</div>}
              {viewPdfUrl && (
                <PdfViewer
                  fileUrl={viewPdfUrl}
                  downloadUrl={getPublicationFileUrl(viewing.id, { download: true })}
                  initialPageCount={viewing.pageCount}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {!embedded && <Footer />}
    </Page>
  );
};

export default AdminDashboard;
