import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PdfViewer from '../components/PdfViewer';
import {
  BookOpen, Eye, Search, Download, ExternalLink, Calendar,
  Layers, ChevronDown, ChevronRight, FileText, Loader2
} from 'lucide-react';
import {
  fetchPublicationYears, fetchPublicationsByYear, fetchPublicationById,
  fetchPublicationByYearMonth, fetchLatestPublication, searchPublications,
  getPublicationFileUrl, getPublicationThumbnailUrl
} from '../api/publicationsApi';
import useScrollToTop from '../hooks/useScrollToTop';
import './PublicationsHub.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const PublicationsHub = ({ onNavigate, isLoggedIn, user, onLogout }) => {
  const [years, setYears] = useState([]);
  const [expandedYears, setExpandedYears] = useState({});
  const [archiveByYear, setArchiveByYear] = useState({});
  const [yearLoading, setYearLoading] = useState({});

  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [pageError, setPageError] = useState('');
  const [bootLoading, setBootLoading] = useState(true);

  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const searchDebounceRef = useRef(null);

  // Opening a different publication swaps the whole viewer panel in place - reset scroll
  // for that (mount-time scroll-to-top for the hub itself is unaffected, key starts null).
  useScrollToTop(selected?.id ?? null);

  const loadYear = useCallback(async (year) => {
    setYearLoading((prev) => ({ ...prev, [year]: true }));
    try {
      const list = await fetchPublicationsByYear(year);
      setArchiveByYear((prev) => ({ ...prev, [year]: list }));
    } catch (e) {
      setPageError(`Could not load publications for ${year}.`);
    } finally {
      setYearLoading((prev) => ({ ...prev, [year]: false }));
    }
  }, []);

  const openPublication = useCallback(async (id) => {
    setDetailLoading(true);
    setPageError('');
    try {
      const detail = await fetchPublicationById(id);
      setSelected(detail);
      setFilterYear(String(detail.year));
      setFilterMonth(String(detail.month));
    } catch (e) {
      setPageError('That publication could not be opened.');
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // Bootstrap: load the year list + open the most recent issue by default.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const yearsData = await fetchPublicationYears();
        if (cancelled) return;
        setYears(yearsData);

        let latest = null;
        try {
          latest = await fetchLatestPublication();
        } catch (_) {
          // No publications uploaded yet - not a hard error, just an empty state.
        }
        if (cancelled) return;

        if (latest) {
          setSelected(latest);
          setFilterYear(String(latest.year));
          setFilterMonth(String(latest.month));
          setExpandedYears({ [latest.year]: true });
          loadYear(latest.year);
        } else if (yearsData.length > 0) {
          setFilterYear(String(yearsData[0].year));
          setExpandedYears({ [yearsData[0].year]: true });
          loadYear(yearsData[0].year);
        }
      } catch (e) {
        if (!cancelled) setPageError('Could not reach the publications service. Please try again later.');
      } finally {
        if (!cancelled) setBootLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [loadYear]);

  const toggleYear = (year) => {
    const isOpen = !!expandedYears[year];
    setExpandedYears((prev) => ({ ...prev, [year]: !isOpen }));
    if (!isOpen && !archiveByYear[year]) {
      loadYear(year);
    }
  };

  const handleViewPublication = async () => {
    if (!filterYear || !filterMonth) return;
    setDetailLoading(true);
    setPageError('');
    try {
      const detail = await fetchPublicationByYearMonth(filterYear, filterMonth);
      setSelected(detail);
      setExpandedYears((prev) => ({ ...prev, [detail.year]: true }));
      if (!archiveByYear[detail.year]) loadYear(detail.year);
    } catch (e) {
      setPageError(`No publication found for ${MONTH_NAMES[Number(filterMonth) - 1]} ${filterYear}.`);
    } finally {
      setDetailLoading(false);
    }
  };

  // Debounced search across all publications, independent of which year is expanded.
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    if (!searchQuery.trim()) {
      setSearchResults(null);
      setSearching(false);
      return;
    }
    setSearching(true);
    searchDebounceRef.current = setTimeout(async () => {
      try {
        const results = await searchPublications(searchQuery.trim());
        setSearchResults(results);
      } catch (e) {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);
    return () => clearTimeout(searchDebounceRef.current);
  }, [searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc' }}>
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
      <div style={{ height: '86px', flexShrink: 0 }}></div>

      <div className="pubs-hub-container">
        {/* HEADER */}
        <div className="pubs-page-header">
          <div className="pubs-header-icon"><BookOpen size={26} /></div>
          <div>
            <h1>Publications</h1>
            <p>Explore all Feed World publications</p>
          </div>
        </div>

        {pageError && <div className="pubs-alert">{pageError}</div>}

        {/* FIND A PUBLICATION */}
        <div className="pubs-finder-card">
          <div className="pubs-finder-fields">
            <span className="pubs-finder-label">Find a Publication</span>
            <div className="pubs-finder-field">
              <label>Year</label>
              <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                {years.length === 0 && <option value="">--</option>}
                {years.map((y) => (
                  <option key={y.year} value={y.year}>{y.year}</option>
                ))}
              </select>
            </div>
            <div className="pubs-finder-field">
              <label>Month</label>
              <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                <option value="">--</option>
                {MONTH_NAMES.map((m, idx) => (
                  <option key={m} value={idx + 1}>{m}</option>
                ))}
              </select>
            </div>
            <button className="pubs-view-btn" onClick={handleViewPublication} disabled={!filterYear || !filterMonth}>
              <Eye size={16} /> View Publication
            </button>
          </div>

          <div className="pubs-search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="pubs-main-layout">
          {/* ARCHIVE SIDEBAR */}
          <aside className="pubs-archive-panel">
            <div className="pubs-archive-title">
              <Layers size={16} /> Publication Archive
            </div>

            {searchQuery.trim() ? (
              <div className="pubs-search-results">
                {searching && <div className="pubs-empty-state">Searching…</div>}
                {!searching && searchResults && searchResults.length === 0 && (
                  <div className="pubs-empty-state">No publications match "{searchQuery}"</div>
                )}
                {!searching && searchResults && searchResults.map((pub) => (
                  <ArchiveItem key={pub.id} pub={pub} active={selected && selected.id === pub.id} onClick={() => openPublication(pub.id)} />
                ))}
              </div>
            ) : (
              <div className="pubs-year-groups">
                {bootLoading && <div className="pubs-empty-state"><Loader2 size={16} className="pubs-spin" /> Loading archive…</div>}
                {!bootLoading && years.length === 0 && (
                  <div className="pubs-empty-state">No publications have been uploaded yet.</div>
                )}
                {years.map((y) => {
                  const isOpen = !!expandedYears[y.year];
                  return (
                    <div key={y.year} className="pubs-year-group">
                      <button type="button" className="pubs-year-header" onClick={() => toggleYear(y.year)}>
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        <span>{y.year}</span>
                        <span className="pubs-year-count">{y.count}</span>
                      </button>
                      {isOpen && (
                        <div className="pubs-year-items">
                          {yearLoading[y.year] && <div className="pubs-empty-state">Loading…</div>}
                          {!yearLoading[y.year] && (archiveByYear[y.year] || []).map((pub) => (
                            <ArchiveItem
                              key={pub.id}
                              pub={pub}
                              active={selected && selected.id === pub.id}
                              onClick={() => openPublication(pub.id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </aside>

          {/* MAIN VIEWER */}
          <main className="pubs-viewer-panel">
            {detailLoading && <div className="pubs-empty-state pubs-viewer-loading">Loading publication…</div>}

            {!detailLoading && selected && (
              <>
                <div className="pubs-selected-header">
                  <img
                    className="pubs-selected-thumb"
                    src={getPublicationThumbnailUrl(selected.id)}
                    alt={`${selected.title} cover`}
                    onError={(e) => { e.target.style.visibility = 'hidden'; }}
                  />
                  <div className="pubs-selected-info">
                    <h2>{selected.title} – {selected.monthName} {selected.year}</h2>
                    <div className="pubs-selected-meta">
                      <span><Calendar size={13} /> Published: {selected.publishedDate}</span>
                      {selected.volume && <span>Volume {selected.volume}</span>}
                      {selected.issueNumber && <span>Issue {selected.issueNumber}</span>}
                      {selected.pageCount && <span><FileText size={13} /> {selected.pageCount} Pages</span>}
                    </div>
                  </div>
                  <div className="pubs-selected-actions">
                    <a
                      className="pubs-action-btn primary"
                      href={getPublicationFileUrl(selected.id, { download: true })}
                    >
                      <Download size={15} /> Download PDF
                    </a>
                    <a
                      className="pubs-action-btn"
                      href={getPublicationFileUrl(selected.id)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={15} /> Open in New Tab
                    </a>
                  </div>
                </div>

                <PdfViewer
                  fileUrl={getPublicationFileUrl(selected.id)}
                  downloadUrl={getPublicationFileUrl(selected.id, { download: true })}
                  initialPageCount={selected.pageCount}
                />
              </>
            )}

            {!detailLoading && !selected && !bootLoading && (
              <div className="pubs-empty-state pubs-viewer-loading">
                Select a publication from the archive to start reading.
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ArchiveItem = ({ pub, active, onClick }) => (
  <div className={`pubs-archive-item ${active ? 'active' : ''}`} onClick={onClick}>
    <img
      src={getPublicationThumbnailUrl(pub.id)}
      alt={`${pub.title} cover`}
      onError={(e) => { e.target.style.visibility = 'hidden'; }}
    />
    <div className="pubs-archive-item-text">
      <strong>{pub.monthName} {pub.year}</strong>
      <span>{pub.title}</span>
      {pub.pageCount && <span className="pubs-archive-item-pages">{pub.pageCount} Pages</span>}
    </div>
    <FileText size={16} className="pubs-archive-item-icon" />
  </div>
);

export default PublicationsHub;
