import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Download, FileText, Loader2, Lock, RefreshCw, Share2 } from 'lucide-react';
import PdfViewer from '../components/PdfViewer';
import ShareDialog from '../components/ShareDialog';
import {
  fetchPublicationById, fetchPublicationPdfBlob, getPublicationFileUrl, PUBLICATION_LANGUAGE_LABELS,
} from '../api/publicationsApi';
import { loginAndReturnHere, openAppPage } from '../utils/publicationLinks';
import { callerIsAdmin, isReleased } from '../utils/publicationRelease';
import './PublicationReader.css';

const isAuthError = (e) => e?.status === 401 || e?.status === 403;

const NOT_AVAILABLE = "This publication isn't available. It may not be published yet, or the link is incomplete.";

// Resolves (never rejects) to what the tab should show - see the effect below.
async function loadIssue(id) {
  let detail;
  try {
    detail = await fetchPublicationById(id);
  } catch (e) {
    if (isAuthError(e)) return { needsLogin: true };
    // A 404 won't change on retry; anything else (server down, network blip) might. It's also
    // what the backend answers for an issue that isn't released yet.
    return e?.status === 404
      ? { failure: NOT_AVAILABLE }
      : { failure: 'This publication could not be loaded right now. Please check your connection and try again.', retryable: true };
  }
  // Same release rule as the backend, checked here too - see utils/publicationRelease.js. Stops
  // before the PDF is ever requested.
  if (!isReleased(detail) && !callerIsAdmin()) {
    return { failure: NOT_AVAILABLE };
  }
  if (!detail.pdfAvailable) {
    return { detail, pdfError: "This issue's PDF hasn't been uploaded yet. Please check back soon." };
  }
  try {
    return { detail, blob: await fetchPublicationPdfBlob(id) };
  } catch (e) {
    if (isAuthError(e)) return { needsLogin: true };
    return { detail, pdfError: e.message || 'The PDF for this issue could not be loaded.' };
  }
}

/**
 * One Feed World issue, full-window, in its own browser tab - what a cover or an archive month on
 * the publications page opens (see utils/publicationLinks.js). main.jsx renders this in place of
 * the app. The PDF comes through the same authenticated /stream request as the admin viewer and
 * is rendered with pdf.js, so the tab's address never carries the JWT and is safe to share.
 */
export default function PublicationReader({ id }) {
  const [needsLogin, setNeedsLogin] = useState(() => !localStorage.getItem('jwt'));
  const [issue, setIssue] = useState(null);
  const [failure, setFailure] = useState('');
  const [retryable, setRetryable] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfError, setPdfError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [sharing, setSharing] = useState(false);

  // StrictMode runs effects twice in development; sharing one in-flight load per attempt keeps
  // that to a single PDF download instead of two.
  const loadRef = useRef({ key: null, promise: null });

  useEffect(() => {
    if (needsLogin) return undefined;
    const key = `${id}#${attempt}`;
    if (loadRef.current.key !== key) loadRef.current = { key, promise: loadIssue(id) };

    let cancelled = false;
    let objectUrl = null;
    loadRef.current.promise.then((result) => {
      if (cancelled) return;
      if (result.needsLogin) {
        setNeedsLogin(true);
        return;
      }
      setFailure(result.failure || '');
      setRetryable(!!result.retryable);
      setIssue(result.detail || null);
      setPdfError(result.pdfError || '');
      if (result.blob) {
        objectUrl = URL.createObjectURL(result.blob);
        setPdfUrl(objectUrl);
      }
    });
    // The object URL pins the PDF bytes in memory until revoked.
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [id, attempt, needsLogin]);

  useEffect(() => {
    document.title = issue
      ? `${issue.title} – ${issue.monthName} ${issue.year} (${issue.language})`
      : 'Feed World Publication';
  }, [issue]);

  const retry = () => {
    setFailure('');
    setPdfError('');
    setPdfUrl(null);
    setAttempt((n) => n + 1);
  };

  const downloadUrl = getPublicationFileUrl(id, { download: true });
  const loading = !needsLogin && !failure && !pdfUrl && !pdfError;

  return (
    <div className="pub-reader">
      <header className="pub-reader-bar">
        <button
          type="button"
          className="pub-reader-brand"
          onClick={() => openAppPage('feedworld')}
          title="All Feed World publications"
        >
          <span className="pub-reader-logo"><img src="/dashboard-logo.avif" alt="" /></span>
          <span className="pub-reader-brand-text">
            <strong>FEED WORLD</strong>
            <small>Publications</small>
          </span>
        </button>

        <div className="pub-reader-heading">
          {issue ? (
            <>
              <h1>{issue.title} – {issue.monthName} {issue.year}</h1>
              <div className="pub-reader-meta">
                <span className="pub-reader-lang">
                  {PUBLICATION_LANGUAGE_LABELS[issue.language] || issue.language}
                </span>
                {issue.pageCount ? <span><FileText size={13} /> {issue.pageCount} pages</span> : null}
              </div>
            </>
          ) : (
            !needsLogin && !failure && <div className="pub-reader-heading-skeleton" aria-hidden="true" />
          )}
        </div>

        {issue && (
          <div className="pub-reader-actions">
            <button type="button" className="pub-reader-btn" onClick={() => setSharing(true)} aria-haspopup="dialog">
              <Share2 size={16} /> <span>Share</span>
            </button>
            {issue.pdfAvailable && (
              <a className="pub-reader-btn is-primary" href={downloadUrl}>
                <Download size={16} /> <span>Download</span>
              </a>
            )}
          </div>
        )}
      </header>

      <main className="pub-reader-stage">
        {needsLogin && (
          <div className="pub-reader-panel">
            <div className="pub-reader-panel-icon"><Lock size={26} /></div>
            <h2>Log in to read this issue</h2>
            <p>Feed World publications are available to logged-in members. You'll come straight back here after logging in.</p>
            <button type="button" className="pub-reader-btn is-primary" onClick={loginAndReturnHere}>Log In</button>
          </div>
        )}

        {failure && (
          <div className="pub-reader-panel">
            <div className="pub-reader-panel-icon is-error"><AlertCircle size={26} /></div>
            <h2>Publication unavailable</h2>
            <p>{failure}</p>
            <div className="pub-reader-panel-actions">
              {retryable && (
                <button type="button" className="pub-reader-btn" onClick={retry}><RefreshCw size={15} /> Try again</button>
              )}
              <button type="button" className="pub-reader-btn is-primary" onClick={() => openAppPage('feedworld')}>
                All publications
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="pub-reader-panel is-quiet" role="status">
            <Loader2 size={28} className="pub-reader-spin" />
            <p>Opening publication…</p>
          </div>
        )}

        {pdfError && (
          <div className="pub-reader-panel">
            <div className="pub-reader-panel-icon is-error"><AlertCircle size={26} /></div>
            <h2>This PDF couldn't be opened</h2>
            <p>{pdfError}</p>
            <div className="pub-reader-panel-actions">
              <button type="button" className="pub-reader-btn" onClick={retry}><RefreshCw size={15} /> Try again</button>
              {issue?.pdfAvailable && (
                <a className="pub-reader-btn is-primary" href={downloadUrl}><Download size={15} /> Download instead</a>
              )}
            </div>
          </div>
        )}

        {pdfUrl && (
          <PdfViewer fileUrl={pdfUrl} downloadUrl={downloadUrl} initialPageCount={issue?.pageCount} />
        )}
      </main>

      {sharing && issue && <ShareDialog publication={issue} onClose={() => setSharing(false)} />}
    </div>
  );
}
