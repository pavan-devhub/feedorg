import React from 'react';

// Artwork for the dashboard's widget cards. The headers' backgrounds and the scenes along the cards'
// feet are images (public/images/dashboard/widgets); this draws the commodity tiles in Market Prices,
// flat two-tone crops on a pale tile, so they stay sharp at any size.

// The wheat ear's grains: pointed grains in two rows, each standing out about 40 degrees from the stalk,
// and one on top. Each is [base x, base y, rotation] for a grain drawn pointing straight up from its base.
const WHEAT_GRAINS = (() => {
  const foot = [10.6, 41];
  const ux = 0.663, uy = -0.749; // along the stalk, up and to the right
  const theta = (Math.atan2(uy, ux) * 180) / Math.PI;
  const grain = (dist, phi) => [foot[0] + ux * dist, foot[1] + uy * dist, phi + 90];
  const out = [];
  for (let i = 0; i < 5; i++) {
    out.push(grain(11.6 + i * 4.9, theta - 40));
    out.push(grain(13.8 + i * 4.9, theta + 40));
  }
  out.push(grain(35.4, theta));
  return out.map((g) => g.map((v) => Math.round(v * 100) / 100));
})();

// Each crop's tile colour and drawing (on a 48 x 48 grid)
const CROPS = {
  sugarcane: {
    tile: '#e2f8d4',
    art: (
      <>
        {/* Two canes, each split into segments at its joints, the taller one sprouting a leaf */}
        <g fill="#14932a">
          <rect x="15.8" y="13" width="4.8" height="8" rx="0.9" />
          <rect x="15.8" y="22.2" width="4.8" height="7.6" rx="0.9" />
          <rect x="15.8" y="31" width="4.8" height="8" rx="0.9" />
          <rect x="24" y="8.2" width="5" height="8.4" rx="0.9" />
          <rect x="24" y="17.8" width="5" height="10" rx="0.9" />
          <rect x="24" y="29" width="5" height="10" rx="0.9" />
        </g>
        <path d="M17.2 14.4 V19.6 M17.2 23.6 V28.4 M17.2 32.4 V37.6 M25.4 9.6 V15.2 M25.4 19.2 V26.4 M25.4 30.4 V37.6" stroke="#46c052" strokeWidth="1" strokeLinecap="round" />
        <path d="M29 19.4 C30 15.4 33 12.8 37.2 12.2 C36.4 16 33.4 18.6 29 19.4 Z" fill="#22a336" />
      </>
    ),
  },
  mustard: {
    tile: '#fdf6c4',
    art: (
      <>
        {/* Five round petals around a small centre, on a stem with two buds */}
        <path d="M24 22 V40.4" stroke="#f0a40a" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M24 31.6 L19.4 28.2 M24 31.6 L28.6 28.2" stroke="#f0a40a" strokeWidth="1.8" strokeLinecap="round" />
        <g fill="#f8bb17">
          <circle cx="24" cy="10.6" r="5.6" />
          <circle cx="32.6" cy="17.2" r="5.6" />
          <circle cx="15.4" cy="17.2" r="5.6" />
          <circle cx="18.2" cy="27.4" r="5.2" />
          <circle cx="29.8" cy="27.4" r="5.2" />
        </g>
        <circle cx="24" cy="19.6" r="2.8" fill="#f0a40a" />
        <circle cx="24" cy="19.6" r="1.2" fill="#fde68a" />
      </>
    ),
  },
  wheat: {
    tile: '#fdf5c6',
    art: (
      <>
        {/* An ear of wheat leaning to the right: a slim stalk, grains splaying out either side, one on top */}
        <path d="M10.6 41 L34.4 14.2" stroke="#ef8419" strokeWidth="2" strokeLinecap="round" />
        <g fill="#f08a1b">
          {WHEAT_GRAINS.map(([x, y, rot], i) => (
            <path key={i} d="M0 0 C2 -2.6 2 -7 0 -9.6 C-2 -7 -2 -2.6 0 0 Z" transform={`translate(${x} ${y}) rotate(${rot})`} />
          ))}
        </g>
      </>
    ),
  },
  rice: {
    tile: '#e1f0fd',
    art: (
      <>
        {/* A paddy stalk arching over to the right, grains hanging in two tiers from the bend */}
        <path d="M17 41 C16.6 31 18.4 21.6 24.4 15.4 C28.4 11.4 33.6 10.4 37.6 13" stroke="#2b7fd3" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M17 33.6 C13.4 31.2 11.2 27.4 11 22.8 C14.8 24.8 16.6 28.6 17 33.6 Z" fill="#5aa6ea" />
        <g fill="#2b7fd3">
          <ellipse cx="22.6" cy="21.6" rx="1.8" ry="3.7" transform="rotate(14 22.6 21.6)" />
          <ellipse cx="26.6" cy="18" rx="1.8" ry="3.7" transform="rotate(8 26.6 18)" />
          <ellipse cx="30.8" cy="16" rx="1.8" ry="3.7" transform="rotate(2 30.8 16)" />
          <ellipse cx="35.2" cy="16.6" rx="1.8" ry="3.7" transform="rotate(-6 35.2 16.6)" />
          <ellipse cx="25.6" cy="26.4" rx="1.8" ry="3.7" transform="rotate(10 25.6 26.4)" />
          <ellipse cx="29.8" cy="23.4" rx="1.8" ry="3.7" transform="rotate(4 29.8 23.4)" />
          <ellipse cx="34" cy="23.8" rx="1.8" ry="3.7" transform="rotate(-4 34 23.8)" />
        </g>
      </>
    ),
  },
  soyabean: {
    tile: '#e5f6d8',
    art: (
      <>
        {/* A curved pod holding three beans, a leaf at its stem */}
        <path d="M11.5 31 C13.5 22 22 14.5 33.5 12.5 C37.6 11.8 38.8 15.2 36.4 18.6 C31 26.4 22.6 33.4 15 34.6 C12.4 35 11 33.6 11.5 31 Z" fill="#3f9d2a" />
        <g fill="#a6e07c">
          <circle cx="17.6" cy="28.6" r="3.3" />
          <circle cx="24.4" cy="22.8" r="3.3" />
          <circle cx="31.2" cy="17.4" r="3.3" />
        </g>
        <path d="M36.8 13.6 C38.6 11.4 40 9.6 40.8 7.6" stroke="#2f7f1d" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M39.6 9.8 C37.4 6.2 33.8 5.6 31.6 6.6 C33.4 9.4 36.4 10.6 39.6 9.8 Z" fill="#5bb83a" />
      </>
    ),
  },
  maize: {
    tile: '#fdeedb',
    art: (
      <>
        {/* A cob of corn standing in its husk */}
        <path d="M24 7.6 C29 7.6 31.4 13 31.4 21 C31.4 28 28.8 33 24 33 C19.2 33 16.6 28 16.6 21 C16.6 13 19 7.6 24 7.6 Z" fill="#f6a51e" />
        <g stroke="#dc800c" strokeWidth="1" strokeLinecap="round" fill="none">
          <path d="M20.6 11.6 C19.6 16 19.6 26 20.6 30.6" />
          <path d="M24 8.6 V32" />
          <path d="M27.4 11.6 C28.4 16 28.4 26 27.4 30.6" />
          <path d="M17.6 15 H30.4 M17 19.4 H31 M17 23.8 H31 M17.6 28.2 H30.4" />
        </g>
        <path d="M24 40.4 C17 38.6 12.8 31.4 13 21.6 C16.2 25 18.6 30 24 33.6 Z" fill="#4ea43a" />
        <path d="M24 40.4 C31 38.6 35.2 31.4 35 21.6 C31.8 25 29.4 30 24 33.6 Z" fill="#3a8f2b" />
      </>
    ),
  },
};

// Market Prices' header icon: three bars standing over a baseline with a short upright at its left end
export const MarketChartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 46 38" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M3.8 22.5 V34.5 H43.2" />
    <path d="M14 27 V16.5 M25 27 V2.6 M36 27 V11.5" />
  </svg>
);

// The arrow in a price-change pill: a thick shaft with a solid head, pointing up or down to the right
export const TrendArrow = ({ down = false }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <g transform={down ? 'matrix(1 0 0 -1 0 16)' : undefined}>
      <path d="M2.4 13.6 L10.6 5.4" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" fill="none" />
      <path d="M6 2.1 L14 2 L13.9 10 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </g>
  </svg>
);

export const CommodityIcon = ({ crop, className }) => {
  const c = CROPS[crop] || CROPS.wheat;
  return (
    <span className={className} style={{ '--crop-tile': c.tile }} aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">{c.art}</svg>
    </span>
  );
};
