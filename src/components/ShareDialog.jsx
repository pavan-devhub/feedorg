import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, Ellipsis, Link2, X } from 'lucide-react';
import { getPublicationThumbnailUrl, PUBLICATION_LANGUAGE_LABELS } from '../api/publicationsApi';
import { copyText, getPublicationReaderUrl } from '../utils/publicationLinks';
import './ShareDialog.css';

// Where Instagram's "Share" goes once the link is copied - its web inbox, which a phone hands
// straight to the Instagram app.
const INSTAGRAM_URL = 'https://www.instagram.com/direct/inbox/';

/**
 * "Share this issue": WhatsApp, Instagram and Gmail, plus Copy link and - on devices that have
 * one - the device's own share sheet ("More"). What gets shared is the issue's reader link (see
 * utils/publicationLinks.js), which carries no login token: whoever opens it reads through their
 * own login. Rendered into <body> so a card's hover transform or overflow can never clip it.
 *
 * `publication` is a summary or detail DTO (id, title, monthName, year, language, pageCount).
 */
export default function ShareDialog({ publication, onClose }) {
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState('');
  const [coverFailed, setCoverFailed] = useState(false);
  const dialogRef = useRef(null);
  const linkRef = useRef(null);
  const copiedTimerRef = useRef(null);

  const languageLabel = PUBLICATION_LANGUAGE_LABELS[publication.language] || publication.language;
  const title = `${publication.title} – ${publication.monthName} ${publication.year}`;
  const url = getPublicationReaderUrl(publication.id);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} (${languageLabel})\n${url}`)}`;
  const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1'
    + `&su=${encodeURIComponent(`${title} (${languageLabel})`)}`
    + `&body=${encodeURIComponent(`${title} (${languageLabel})\n\nRead it here: ${url}`)}`;
  const canShareNatively = typeof navigator.share === 'function';

  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });

  // Modal behaviour: lock the page behind it, take focus, and hand focus back on close. Esc and
  // Tab are handled on the whole document, so they work wherever focus has ended up - Esc closes,
  // Tab cycles within the dialog rather than escaping to the page behind it.
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('a[href], button, input')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const outside = !dialog.contains(active) || active === dialog;
      if (e.shiftKey && (outside || active === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (outside || active === last)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      clearTimeout(copiedTimerRef.current);
      previousFocus?.focus?.();
    };
  }, []);

  const copyLink = async () => {
    try {
      await copyText(url);
      setCopied(true);
      clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      setNote("Couldn't copy automatically - the link below is selected, copy it from there.");
      linkRef.current?.select();
      return false;
    }
  };

  // Instagram has no way for a website to pre-fill a message, so: copy the link, open Instagram,
  // and say where to paste it.
  const shareToInstagram = async () => {
    const copiedOk = await copyLink();
    window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
    setNote(copiedOk
      ? 'Link copied - paste it into your Instagram chat or story.'
      : 'Copy the link below, then paste it into your Instagram chat or story.');
  };

  const shareNatively = async () => {
    try {
      await navigator.share({ title, text: `${title} (${languageLabel})`, url });
      onClose();
    } catch {
      // cancelled by the user, or the share sheet failed - the dialog stays open either way
    }
  };

  return createPortal(
    <div
      className="share-backdrop"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        className="share-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-dialog-title"
        tabIndex={-1}
      >
        <header className="share-head">
          <h2 id="share-dialog-title">Share this issue</h2>
          <button type="button" className="share-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </header>

        <div className="share-issue">
          <span className="share-issue-cover">
            {!coverFailed && (
              <img src={getPublicationThumbnailUrl(publication.id)} alt="" onError={() => setCoverFailed(true)} />
            )}
          </span>
          <span className="share-issue-text">
            <strong>{title}</strong>
            <span>{languageLabel}{publication.pageCount ? ` · ${publication.pageCount} pages` : ''}</span>
          </span>
        </div>

        <ul className="share-targets">
          <li>
            <a className="share-target" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <span className="share-icon is-whatsapp"><WhatsAppGlyph /></span>
              WhatsApp
            </a>
          </li>
          <li>
            <button type="button" className="share-target" onClick={shareToInstagram}>
              <span className="share-icon is-instagram"><InstagramGlyph /></span>
              Instagram
            </button>
          </li>
          <li>
            <a className="share-target" href={gmailUrl} target="_blank" rel="noopener noreferrer">
              <span className="share-icon is-gmail"><GmailGlyph /></span>
              Gmail
            </a>
          </li>
          <li>
            <button type="button" className="share-target" onClick={copyLink}>
              <span className={`share-icon is-copy ${copied ? 'is-done' : ''}`}>
                {copied ? <Check size={22} /> : <Link2 size={22} />}
              </span>
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </li>
          {canShareNatively && (
            <li>
              <button type="button" className="share-target" onClick={shareNatively}>
                <span className="share-icon is-more"><Ellipsis size={22} /></span>
                More
              </button>
            </li>
          )}
        </ul>

        <div className="share-link">
          <input
            ref={linkRef}
            type="text"
            readOnly
            value={url}
            aria-label="Link to this issue"
            onFocus={(e) => e.target.select()}
          />
          <button type="button" onClick={copyLink}>
            {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {note && <p className="share-note" role="status">{note}</p>}
        <p className="share-hint">People you share with sign in to Feed World to read it.</p>
      </div>
    </div>,
    document.body
  );
}

// Simplified brand marks, drawn in-house (the icon set has no brand logos).
const WhatsAppGlyph = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2.5 21.5Z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
    <path
      transform="translate(7.2 7.2) scale(0.4)"
      fill="#fff"
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    />
  </svg>
);

const InstagramGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="#fff" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="#fff" />
  </svg>
);

const GmailGlyph = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    <path fill="#4285F4" d="M3.5 19H6.5V10.6L2 7.4v10.1A1.5 1.5 0 0 0 3.5 19z" />
    <path fill="#34A853" d="M17.5 19h3a1.5 1.5 0 0 0 1.5-1.5V7.4l-4.5 3.2z" />
    <path fill="#FBBC04" d="M17.5 5.2v5.4L22 7.4V6.2c0-1.6-1.8-2.5-3.1-1.6z" />
    <path fill="#EA4335" d="M6.5 10.6V5.2L12 9.1l5.5-3.9v5.4L12 14.5z" />
    <path fill="#C5221F" d="M2 6.2v1.2l4.5 3.2V5.2L5.1 4.6C3.8 3.7 2 4.6 2 6.2z" />
  </svg>
);
