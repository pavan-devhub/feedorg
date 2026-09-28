import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './PhotoLightbox.css';

const SWIPE_THRESHOLD = 50;
const pad2 = (n) => String(n).padStart(2, '0');

// Full-screen photo viewer. `photos` is [{ id, src, alt?, caption? }]; `index` is the open photo
// (null = closed). `title`/`subtitle` head the viewer, e.g. "Guntur" / "Andhra Pradesh".
// Arrow keys / swipe / thumbnails move between photos, Esc or a click outside the photo closes it.
export default function PhotoLightbox({ photos, index, onIndexChange, onClose, title, subtitle }) {
  const isOpen = index !== null && index !== undefined && photos[index] !== undefined;
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const thumbsRef = useRef(null);
  const swipeStartX = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState(null);

  const go = useCallback((delta) => {
    onIndexChange((index + delta + photos.length) % photos.length);
  }, [index, photos.length, onIndexChange]);

  // Keyboard + scroll lock, and hand focus back to whatever opened the viewer when it closes.
  useEffect(() => {
    if (!isOpen) return undefined;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Home') onIndexChange(0);
      else if (e.key === 'End') onIndexChange(photos.length - 1);
      else if (e.key === 'Tab') {
        // keep keyboard focus inside the viewer while it is open
        const focusable = overlayRef.current?.querySelectorAll('button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, go, onClose, onIndexChange, photos.length]);

  // Warm the cache for the neighbours so next/previous feels instant.
  useEffect(() => {
    if (!isOpen) return;
    [index - 1, index + 1].forEach((i) => {
      const photo = photos[(i + photos.length) % photos.length];
      if (photo) new Image().src = photo.src;
    });
  }, [isOpen, index, photos]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (!isOpen) return;
    const active = thumbsRef.current?.querySelector('[aria-current="true"]');
    active?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [isOpen, index]);

  if (!isOpen) return null;

  const photo = photos[index];
  const loaded = loadedSrc === photo.src;
  const heading = [title, subtitle].filter(Boolean).join(', ');

  const onPointerDown = (e) => { swipeStartX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="pl-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={heading ? `${heading} photo viewer` : 'Photo viewer'}
    >
      <div className="pl-top">
        <div className="pl-heading">
          {title && <span className="pl-title">{title}</span>}
          {subtitle && <span className="pl-subtitle">{subtitle}</span>}
        </div>
        <div className="pl-counter" aria-live="polite">
          <span><strong>{pad2(index + 1)}</strong> / {pad2(photos.length)}</span>
          <span className="pl-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(index + 1) / photos.length})` }} />
          </span>
        </div>
        <button ref={closeRef} type="button" className="pl-btn pl-close" onClick={onClose} aria-label="Close viewer">
          <X size={20} />
        </button>
      </div>

      <div
        className="pl-stage"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { swipeStartX.current = null; }}
      >
        {photos.length > 1 && (
          <button type="button" className="pl-btn pl-nav pl-prev" onClick={() => go(-1)} aria-label="Previous photo">
            <ChevronLeft size={24} />
          </button>
        )}
        {!loaded && <span className="pl-spinner" aria-hidden="true" />}
        <img
          key={photo.src}
          className={`pl-img${loaded ? ' is-loaded' : ''}`}
          src={photo.src}
          alt={photo.alt || `${heading || 'Gallery'} photo ${index + 1} of ${photos.length}`}
          draggable={false}
          onLoad={() => setLoadedSrc(photo.src)}
        />
        {photos.length > 1 && (
          <button type="button" className="pl-btn pl-nav pl-next" onClick={() => go(1)} aria-label="Next photo">
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {photo.caption && <p className="pl-caption">{photo.caption}</p>}

      {photos.length > 1 && (
        <div className="pl-thumbs" ref={thumbsRef}>
          {photos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`pl-thumb${i === index ? ' is-active' : ''}`}
              aria-current={i === index}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => onIndexChange(i)}
            >
              <img src={p.src} alt="" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
