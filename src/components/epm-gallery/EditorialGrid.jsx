import React, { useMemo } from 'react';
import { Maximize2 } from 'lucide-react';
import FadeImage from '../FadeImage';
import Reveal from './Reveal';
import { pad2 } from './galleryUtils';
import './EditorialGrid.css';

// Rows of three cycle through these compositions and rows of two alternate their wide side, so a
// long album keeps changing rhythm instead of repeating one grid.
const TRIO_LAYOUTS = ['feature-left', 'trio', 'feature-right', 'trio'];
const DUO_LAYOUTS = ['duo-left', 'duo-right'];

// Splits `count` photos into rows of 3 and 2 - never a lone photo on a row unless the whole album
// is one photo (4 left over becomes 2 + 2) - and gives each row its layout.
function planRows(count) {
  if (count <= 0) return [];
  if (count === 1) return [{ start: 0, size: 1, layout: 'single' }];
  const rows = [];
  let start = 0;
  let trios = 0;
  let duos = 0;
  while (start < count) {
    const left = count - start;
    const size = left === 2 || left === 4 ? 2 : 3;
    const layout = size === 3
      ? TRIO_LAYOUTS[trios++ % TRIO_LAYOUTS.length]
      : DUO_LAYOUTS[duos++ % DUO_LAYOUTS.length];
    rows.push({ start, size, layout });
    start += size;
  }
  return rows;
}

// An art-directed photo grid. photos: [{ id, src, ratio? }]; onOpen(index) opens the viewer.
// `label` names a photo for screen readers, e.g. "Guntur photograph" -> "View Guntur photograph 3 of 7".
export default function EditorialGrid({ photos, onOpen, label = 'photo' }) {
  const rows = useMemo(() => planRows(photos.length), [photos.length]);

  return (
    <div className="epg-mosaic">
      {rows.map((row) => (
        <Reveal key={`${row.start}-${row.layout}`} className={`epg-mosaic-row is-${row.layout}`}>
          {photos.slice(row.start, row.start + row.size).map((photo, k) => {
            const i = row.start + k;
            return (
              <button
                key={photo.id}
                type="button"
                className="epg-tile"
                style={row.layout === 'single' && photo.ratio ? { '--epg-ratio': photo.ratio } : undefined}
                onClick={() => onOpen(i)}
                aria-label={`View ${label} ${i + 1} of ${photos.length}`}
              >
                <FadeImage
                  className="epg-tile-img"
                  src={photo.src}
                  alt=""
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="epg-tile-meta" aria-hidden="true">
                  <span className="epg-tile-num">{pad2(i + 1)}</span>
                  <span className="epg-tile-zoom"><Maximize2 size={16} /></span>
                </span>
              </button>
            );
          })}
        </Reveal>
      ))}
    </div>
  );
}

export function EditorialGridSkeleton() {
  return (
    <div className="epg-mosaic" aria-hidden="true">
      <div className="epg-mosaic-row is-feature-left">
        <span className="epg-tile epg-skeleton" />
        <span className="epg-tile epg-skeleton" />
        <span className="epg-tile epg-skeleton" />
      </div>
    </div>
  );
}
