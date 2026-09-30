import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PdfViewer from '../../components/PdfViewer';
import {
  BookOpen, Plus, RefreshCw, Trash2, Eye, Download, X, UploadCloud,
  FileText, AlertCircle, CheckCircle2, Loader2
} from 'lucide-react';
import {
  fetchPublicationYears, fetchPublicationsByYear,
  createPublication, replacePublicationPdf, deletePublicationAdmin,
  fetchPublicationPdfBlob, getPublicationFileUrl, PUBLICATION_LANGUAGES,
  publicationOrder
} from '../../api/publicationsApi';
import useScrollToTop from '../../hooks/useScrollToTop';
import { formatPublishedDate } from '../../utils/publicationDate';
import './AdminDashboard.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const LANGUAGE_BADGES = { English: 'EN', Telugu: 'TE', Hindi: 'HI' };

const LanguageBadge = ({ language }) => (
  <span className={`admin-pub-lang-badge admin-pub-lang-badge-${(language || '').toLowerCase()}`}>
    <span className="admin-pub-lang-badge-code">{LANGUAGE_BADGES[language] || language}</span>
    {language}
  </span>
);

// A row only counts as uploaded when the backend found its PDF on disk (pdfAvailable) - a row
// can outlive its file, and uploading that edition again fills the row back in. Anything but an
// explicit false (e.g. a backend that predates the flag) is treated as uploaded.
const isUploaded = (pub) => pub.pdfAvailable !== false;

const StatusBadge = ({ published }) => (
  <span className={`admin-pub-status-badge ${published ? 'published' : 'not-uploaded'}`}>
    <span className="admin-pub-status-dot" />
    {published ? 'Published' : 'Not uploaded'}
  </span>
);

const emptyAddForm = (year, month, language) => ({
  year: year || new Date().getFullYear(),
  month: month || '',
  language: language || 'English',
  languageLocked: Boolean(language),
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
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [banner, setBanner] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState(emptyAddForm());
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

  const loadYears = useCallback(async () => {
    try {
      const data = await fetchPublicationYears();
      const sorted = (data || []).map((y) => y.year).sort((a, b) => b - a);
      setYears(sorted);
      setSelectedYear((prev) => (prev && sorted.includes(prev) ? prev : sorted[0] || new Date().getFullYear()));
      return sorted;
    } catch (e) {
      setLoadError(e.message || 'Failed to load publication years.');
      return [];
    }
  }, []);

  // A year's publications come back already sorted by the database - newest month first, then
  // each month's editions by their `order` (Telugu 1, Hindi 2, English 3) - so they're used as-is
  // (see PublicationRepository#CATALOG_ORDER).
  const loadPublications = useCallback(async (year) => {
    if (!year) {
      setPublications([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError('');
    try {
      setPublications(await fetchPublicationsByYear(year));
    } catch (e) {
      setLoadError(e.message || 'Failed to load publications.');
      setPublications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadYears();
  }, [loadYears]);

  useEffect(() => {
    loadPublications(selectedYear);
  }, [selectedYear, loadPublications]);

  // One group per month, each holding whichever of the three language editions are uploaded -
  // the table always renders all three PUBLICATION_LANGUAGES rows per month (missing ones render
  // as "Not uploaded"), with the Year/Month cells spanning all three. A database row whose PDF
  // isn't on the server counts as missing too (see isUploaded).
  const monthGroups = (() => {
    const byMonth = new Map();
    publications.forEach((pub) => {
      if (!byMonth.has(pub.month)) byMonth.set(pub.month, {});
      if (isUploaded(pub)) byMonth.get(pub.month)[pub.language] = pub;
    });
    return Array.from(byMonth.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([month, byLanguage]) => ({ month, byLanguage }));
  })();

  // Which languages already have an uploaded edition for a given year/month, so the Add modal can
  // grey those out - only known for the currently-loaded year (selectedYear); for any other year
  // typed into the modal this simply allows all three and leaves the duplicate check to the
  // backend, which enforces it regardless (see AdminPublicationController/PublicationServiceImpl).
  const languagesTakenFor = (year, month) => {
    if (!month || Number(year) !== selectedYear) return [];
    const group = monthGroups.find((g) => g.month === Number(month));
    return group ? PUBLICATION_LANGUAGES.filter((lang) => group.byLanguage[lang]) : [];
  };

  const refreshAfterChange = async (landOnYear) => {
    const sorted = await loadYears();
    const yearToShow = landOnYear && sorted.includes(landOnYear) ? landOnYear : selectedYear;
    setSelectedYear(yearToShow);
    loadPublications(yearToShow);
  };

  // --- Add ---
  // `preset` lets the inline "Add {language}" action (shown in a month row when that edition is
  // missing) open this same modal pre-filled with the row's year/month/language, instead of the
  // admin having to re-pick them.
  const openAdd = (preset) => {
    setAddForm(emptyAddForm(preset?.year ?? selectedYear, preset?.month, preset?.language));
    setAddError('');
    setAddOpen(true);
  };

  // Whenever the modal's year/month lands on a combination where the currently-picked language
  // is already taken (or nothing is picked yet), jump to the first still-available language, so
  // the admin is never left with a disabled option selected. Skipped once a preset has locked the
  // language (the "+ Upload {Language}" entry point) - that choice is fixed on purpose.
  useEffect(() => {
    if (!addOpen || addForm.languageLocked) return;
    const taken = languagesTakenFor(addForm.year, addForm.month);
    if (taken.includes(addForm.language)) {
      const nextAvailable = PUBLICATION_LANGUAGES.find((lang) => !taken.includes(lang));
      if (nextAvailable) setAddForm((f) => ({ ...f, language: nextAvailable }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOpen, addForm.year, addForm.month, addForm.language, addForm.languageLocked, monthGroups]);

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
      await createPublication(addForm);
      setAddOpen(false);
      showBanner('success', `${addForm.language} publication for ${MONTH_NAMES[addForm.month - 1]} ${addForm.year} added.`);
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
      const removedYear = deleting.year;
      setDeleting(null);
      await refreshAfterChange(publications.length === 1 ? undefined : removedYear);
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
            <p>Add, replace or remove Feed World's monthly issues.</p>
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

        <div className="admin-pub-toolbar">
          <label htmlFor="admin-pub-year">Year</label>
          <select
            id="admin-pub-year"
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.length === 0 && <option value="">No publications yet</option>}
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="admin-pub-table-wrap">
          {loading ? (
            <div className="admin-pub-empty"><Loader2 size={18} className="admin-pub-spin" /> Loading publications…</div>
          ) : monthGroups.length === 0 ? (
            <div className="admin-pub-empty">No publications for {selectedYear || 'this year'} yet.</div>
          ) : (
            <table className="admin-pub-table admin-pub-table-grouped">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Language</th>
                  <th>Order</th>
                  <th>Title</th>
                  <th>Published</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Three rows per month - one per PUBLICATION_LANGUAGES entry, always in the same
                    order - with Year/Month spanning all three via rowSpan instead of repeating.
                    The rowSpan cells only exist in the DOM on the first row of each group, which
                    reads fine on the desktop table but leaves rows 2-3 with no visible year/month
                    once the responsive layout stacks every cell into its own block below 560px -
                    this mobile-only header row (hidden on desktop) carries that context instead. */}
                {monthGroups.map(({ month, byLanguage }) => ([
                    <tr key={`${month}-mobile-header`} className="admin-pub-mobile-group-header">
                      <td colSpan={8}>{selectedYear} — {MONTH_NAMES[month - 1]}</td>
                    </tr>,
                    ...PUBLICATION_LANGUAGES.map((lang, i) => {
                      const pub = byLanguage[lang];
                      return (
                        <tr key={`${month}-${lang}`} className={i === 0 ? 'admin-pub-group-start' : undefined}>
                          {i === 0 && (
                            <>
                              <td rowSpan={3} className="admin-pub-group-cell" data-label="Year">{selectedYear}</td>
                              <td rowSpan={3} className="admin-pub-group-cell" data-label="Month">{MONTH_NAMES[month - 1]}</td>
                            </>
                          )}
                          <td data-label="Language"><LanguageBadge language={lang} /></td>
                          {/* Uploaded editions show the value stored in the database; a missing
                              edition shows the order its language always gets. */}
                          <td data-label="Order">{pub ? publicationOrder(pub) : i + 1}</td>
                          {pub ? (
                            <>
                              <td data-label="Title">{pub.title}</td>
                              <td data-label="Published">{pub.publishedDate ? formatPublishedDate(pub.publishedDate) : '—'}</td>
                              <td data-label="Status"><StatusBadge published /></td>
                              <td className="admin-pub-actions" data-label="Actions">
                                <button type="button" className="admin-pub-icon-btn" title="View PDF" onClick={() => openView(pub)}>
                                  <Eye size={15} />
                                </button>
                                <a className="admin-pub-icon-btn" href={getPublicationFileUrl(pub.id, { download: true })} title="Download PDF">
                                  <Download size={15} />
                                </a>
                                <button type="button" className="admin-pub-icon-btn" title="Replace PDF" onClick={() => openReplace(pub)}>
                                  <RefreshCw size={15} />
                                </button>
                                <button type="button" className="admin-pub-icon-btn danger" title="Delete" onClick={() => setDeleting(pub)}>
                                  <Trash2 size={15} />
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td colSpan={2} className="admin-pub-empty-slot" data-label="Title">—</td>
                              <td data-label="Status"><StatusBadge published={false} /></td>
                              <td className="admin-pub-actions" data-label="Actions">
                                <button
                                  type="button"
                                  className="admin-pub-btn small"
                                  onClick={() => openAdd({ year: selectedYear, month, language: lang })}
                                >
                                  <Plus size={13} /> Upload {lang}
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    }),
                  ]))}
              </tbody>
            </table>
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
              {/* Every issue is titled "Feed World" (the backend sets it) - shown locked, not editable. */}
              <label>
                Title
                <input type="text" value="Feed World" disabled readOnly />
              </label>
              <div className="admin-pub-form-row">
                <label>
                  Year
                  <input
                    type="number"
                    value={addForm.year}
                    onChange={(e) => setAddForm((f) => ({ ...f, year: e.target.value }))}
                    disabled={addForm.languageLocked}
                    required
                  />
                </label>
                <label>
                  Month
                  <select
                    value={addForm.month}
                    onChange={(e) => setAddForm((f) => ({ ...f, month: e.target.value }))}
                    disabled={addForm.languageLocked}
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
                {addForm.languageLocked ? (
                  <div className="admin-pub-lang-locked">
                    <LanguageBadge language={addForm.language} />
                    <span className="admin-pub-hint">Preselected from the row you opened this from.</span>
                  </div>
                ) : (
                  (() => {
                    const taken = languagesTakenFor(addForm.year, addForm.month);
                    return (
                      <div className="admin-pub-lang-picker">
                        {PUBLICATION_LANGUAGES.map((lang) => {
                          const isTaken = taken.includes(lang);
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
                    );
                  })()
                )}
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
                <div><span>Current PDF</span><strong>Available</strong></div>
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
