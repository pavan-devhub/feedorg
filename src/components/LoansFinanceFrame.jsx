import React, { useEffect, useRef, useState } from 'react';
import { Banknote, RefreshCw } from 'lucide-react';
import { LOANS_FINANCE_URL } from '../api/config';
import './LoansFinanceFrame.css';

// How far below the top of the window an in-page jump lands, so the section clears the fixed navbar.
const NAVBAR_CLEARANCE = 90;

/**
 * The Loans & Finance service's UI, which is its own front end (the FeedLoanAndFinance project).
 * It is embedded rather than imported because it ships its own Tailwind reset and global styles,
 * which would otherwise leak into every other page here. The frame is kept as tall as the embedded
 * page, so it never scrolls on its own - the page around it scrolls as one, like any other page.
 * The embedded app reports its height and its in-page jump links over postMessage (see its
 * src/embed.js), since a page from another origin can't be measured or scrolled from here.
 */
export default function LoansFinanceFrame({ className = '' }) {
  // 'checking' until the server answers, then 'ready' - or 'unavailable' when nothing is listening
  // there, which an iframe alone would show as the browser's own "refused to connect" page.
  const [status, setStatus] = useState('checking');
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [contentHeight, setContentHeight] = useState(null);
  const frameRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    // no-cors: only whether the server is reachable matters, not what it sends back.
    fetch(LOANS_FINANCE_URL, { mode: 'no-cors', cache: 'no-store' })
      .then(() => { if (!cancelled) setStatus('ready'); })
      .catch(() => { if (!cancelled) setStatus('unavailable'); });
    return () => { cancelled = true; };
  }, [attempt]);

  useEffect(() => {
    const handleMessage = (event) => {
      const frame = frameRef.current;
      if (!frame || event.source !== frame.contentWindow) return;
      const { type, height, top } = event.data || {};
      if (type === 'feed-loans-finance:height' && height > 0) {
        setContentHeight(height);
      } else if (type === 'feed-loans-finance:scroll-to' && Number.isFinite(top)) {
        const frameTop = frame.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: frameTop + top - NAVBAR_CLEARANCE, behavior: 'smooth' });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const retry = () => {
    setStatus('checking');
    setLoaded(false);
    setContentHeight(null);
    setAttempt((n) => n + 1);
  };

  return (
    <div className={`lf-frame ${className}`}>
      {status === 'unavailable' ? (
        <div className="lf-frame-message" role="alert">
          <span className="lf-frame-message-icon"><Banknote size={28} /></span>
          <h3>Loans &amp; Finance is not available right now</h3>
          <p>We couldn&apos;t reach the Loans &amp; Finance service. Please try again in a moment.</p>
          <button type="button" className="lf-frame-retry" onClick={retry}>
            <RefreshCw size={15} /> Try again
          </button>
        </div>
      ) : (
        <>
          {status === 'ready' && (
            <iframe
              ref={frameRef}
              title="Loans & Finance"
              src={LOANS_FINANCE_URL}
              className="lf-frame-iframe"
              style={contentHeight ? { height: `${contentHeight}px` } : undefined}
              onLoad={() => setLoaded(true)}
            />
          )}
          {!loaded && (
            <div className="lf-frame-loading" aria-live="polite">
              <span className="lf-frame-spinner" aria-hidden="true" /> Loading Loans &amp; Finance…
            </div>
          )}
        </>
      )}
    </div>
  );
}
