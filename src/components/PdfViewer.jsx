import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import {
  Menu, ChevronLeft, ChevronRight, Minus, Plus, Maximize, RotateCw,
  Download, Printer
} from 'lucide-react';
import './PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.1;

/**
 * Renders a PDF entirely in the browser via pdf.js (react-pdf). The backend only ever streams
 * the raw PDF bytes (see publicationsApi.getPublicationFileUrl) - every page image and thumbnail
 * seen here is rasterized client-side from that stream, so the server never has to pre-render or
 * store an image per page.
 */
const PdfViewer = ({ fileUrl, downloadUrl, initialPageCount, onPageChange }) => {
  const [numPages, setNumPages] = useState(initialPageCount || null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showThumbs, setShowThumbs] = useState(true);
  const thumbStripRef = useRef(null);
  const activeThumbRef = useRef(null);

  // A different issue was opened - reset the viewer back to page 1 / default zoom.
  useEffect(() => {
    setPageNumber(1);
    setScale(1);
    setRotation(0);
    setNumPages(initialPageCount || null);
  }, [fileUrl, initialPageCount]);

  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    if (onPageChange) onPageChange(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const onDocumentLoadSuccess = useCallback(({ numPages: loadedPages }) => {
    setNumPages(loadedPages);
  }, []);

  const goToPage = (target) => {
    const clamped = Math.min(Math.max(target, 1), numPages || target);
    setPageNumber(clamped);
  };

  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, +(s + SCALE_STEP).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, +(s - SCALE_STEP).toFixed(2)));
  const resetZoom = () => setScale(1);
  const rotate = () => setRotation((r) => (r + 90) % 360);
  const scrollThumbs = (direction) => {
    if (thumbStripRef.current) {
      thumbStripRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    const printWindow = window.open(fileUrl, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => printWindow.print());
    }
  };

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-toolbar-group">
          <button
            type="button"
            className={`pdf-tool-btn ${showThumbs ? 'active' : ''}`}
            title="Toggle thumbnails"
            onClick={() => setShowThumbs((v) => !v)}
          >
            <Menu size={18} />
          </button>
          <span className="pdf-page-indicator">
            <input
              type="number"
              min={1}
              max={numPages || 1}
              value={pageNumber}
              onChange={(e) => goToPage(Number(e.target.value) || 1)}
            />
            <span className="pdf-page-total">/ {numPages || '-'}</span>
          </span>
        </div>

        <div className="pdf-toolbar-group">
          <button type="button" className="pdf-tool-btn" title="Zoom out" onClick={zoomOut}>
            <Minus size={16} />
          </button>
          <button type="button" className="pdf-zoom-value" title="Reset zoom" onClick={resetZoom}>
            {Math.round(scale * 100)}%
          </button>
          <button type="button" className="pdf-tool-btn" title="Zoom in" onClick={zoomIn}>
            <Plus size={16} />
          </button>
          <button type="button" className="pdf-tool-btn" title="Fit to page" onClick={resetZoom}>
            <Maximize size={16} />
          </button>
          <button type="button" className="pdf-tool-btn" title="Rotate" onClick={rotate}>
            <RotateCw size={16} />
          </button>
        </div>

        <div className="pdf-toolbar-group">
          <a className="pdf-tool-btn" href={downloadUrl} title="Download">
            <Download size={16} />
          </a>
          <button type="button" className="pdf-tool-btn" title="Print" onClick={handlePrint}>
            <Printer size={16} />
          </button>
        </div>
      </div>

      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="pdf-status">Loading publication…</div>}
        error={<div className="pdf-status pdf-status-error">This PDF could not be loaded.</div>}
      >
        <div className="pdf-canvas-area">
          <Page
            pageNumber={pageNumber}
            scale={scale}
            rotate={rotation}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </div>

        {showThumbs && numPages > 0 && (
          <div className="pdf-thumb-strip-wrapper">
            <button type="button" className="pdf-thumb-nav" onClick={() => scrollThumbs(-1)}>
              <ChevronLeft size={18} />
            </button>
            <div className="pdf-thumb-strip" ref={thumbStripRef}>
              {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                <div
                  key={n}
                  ref={n === pageNumber ? activeThumbRef : null}
                  className={`pdf-thumb ${n === pageNumber ? 'active' : ''}`}
                  onClick={() => goToPage(n)}
                >
                  <Page
                    pageNumber={n}
                    width={72}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    loading={null}
                  />
                  <span>{n}</span>
                </div>
              ))}
            </div>
            <button type="button" className="pdf-thumb-nav" onClick={() => scrollThumbs(1)}>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </Document>
    </div>
  );
};

export default PdfViewer;
