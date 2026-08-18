import fs from 'fs';
import path from 'path';

const outDir = 'src/assets/my-business';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const icons = {
  'business_setup.svg': {
    bg: '#F5F3FF', // purple
    content: `<circle cx="32" cy="24" r="8" fill="#8B5CF6"/>
              <path d="M16 48c0-8 8-12 16-12s16 4 16 12v4H16v-4z" fill="#8B5CF6" opacity="0.8"/>
              <path d="M44 28a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" fill="#C4B5FD"/>
              <path d="M52 48c0-5-4-8-9-10-1 4-5 6-11 6s-10-2-11-6c-5 2-9 5-9 10v4h40v-4z" fill="#C4B5FD" opacity="0.6"/>`
  },
  'create_vendor.svg': {
    bg: '#FFF1F2', // rose
    content: `<path d="M16 28h32v24H16z" fill="#FFE4E6"/>
              <path d="M16 28l4-12h24l4 12z" fill="#FDA4AF"/>
              <path d="M16 28c0 3 3 6 6 6s6-3 6-6 3 6 6 6 6-3 6-6 3 6 6 6 6-3 6-6H16z" fill="#E11D48"/>
              <rect x="26" y="36" width="12" height="16" fill="#BE123C"/>`
  },
  'create_product.svg': {
    bg: '#FFF7ED', // orange
    content: `<path d="M32 16l16 8-16 8-16-8 16-8z" fill="#FDBA74"/>
              <path d="M16 24v16l16 8V32l-16-8z" fill="#F97316"/>
              <path d="M48 24v16l-16 8V32l16-8z" fill="#C2410C"/>`
  },
  'share_capital.svg': {
    bg: '#ECFDF5', // emerald
    content: `<path d="M32 12a20 20 0 1 0 20 20h-20v-20z" fill="#34D399"/>
              <path d="M36 12v16h16a20 20 0 0 0-16-16z" fill="#FCD34D"/>
              <circle cx="44" cy="40" r="10" fill="#F59E0B"/>
              <text x="44" y="44" font-family="Arial" font-size="12" font-weight="bold" fill="#fff" text-anchor="middle">₹</text>`
  },
  'finance_accounting.svg': {
    bg: '#EFF6FF', // blue
    content: `<rect x="18" y="14" width="28" height="36" rx="4" fill="#3B82F6"/>
              <rect x="22" y="18" width="20" height="8" rx="2" fill="#DBEAFE"/>
              <circle cx="25" cy="32" r="2" fill="#fff"/>
              <circle cx="32" cy="32" r="2" fill="#fff"/>
              <circle cx="39" cy="32" r="2" fill="#fff"/>
              <circle cx="25" cy="38" r="2" fill="#fff"/>
              <circle cx="32" cy="38" r="2" fill="#fff"/>
              <circle cx="39" cy="38" r="2" fill="#fff"/>
              <circle cx="25" cy="44" r="2" fill="#fff"/>
              <circle cx="32" cy="44" r="2" fill="#fff"/>
              <circle cx="39" cy="44" r="2" fill="#fff"/>`
  },
  'purchase_registry.svg': {
    bg: '#ECFEFF', // cyan
    content: `<path d="M16 20h6l4 20h22l4-16H24" fill="none" stroke="#06B6D4" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="28" cy="46" r="3" fill="#06B6D4"/>
              <circle cx="44" cy="46" r="3" fill="#06B6D4"/>
              <rect x="28" y="16" width="16" height="18" fill="#fff" stroke="#0891B2" stroke-width="2"/>
              <path d="M32 20h8M32 24h8M32 28h4" stroke="#0891B2" stroke-width="2" stroke-linecap="round"/>`
  },
  'sales_registry.svg': {
    bg: '#FFF1F2', // rose
    content: `<rect x="20" y="14" width="24" height="36" rx="2" fill="#FFE4E6" stroke="#E11D48" stroke-width="2"/>
              <path d="M26 36l4-6 4 4 6-8" fill="none" stroke="#E11D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="40" cy="40" r="8" fill="#F59E0B"/>
              <text x="40" y="44" font-family="Arial" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">₹</text>`
  },
  'bank_registry.svg': {
    bg: '#F3E8FF', // purple
    content: `<path d="M32 16L16 26h32L32 16z" fill="#9333EA"/>
              <rect x="20" y="28" width="4" height="16" fill="#C084FC"/>
              <rect x="30" y="28" width="4" height="16" fill="#C084FC"/>
              <rect x="40" y="28" width="4" height="16" fill="#C084FC"/>
              <rect x="16" y="44" width="32" height="4" fill="#9333EA"/>`
  },
  'cashbook_registry.svg': {
    bg: '#FFEDD5', // orange
    content: `<rect x="18" y="14" width="24" height="36" rx="2" fill="#F97316"/>
              <rect x="42" y="14" width="4" height="36" rx="2" fill="#C2410C"/>
              <rect x="32" y="14" width="6" height="16" fill="#FDE047"/>
              <path d="M24 24h4M24 30h8M24 36h8" stroke="#FFF7ED" stroke-width="2" stroke-linecap="round"/>`
  },
  'ledger_registry.svg': {
    bg: '#E0F2FE', // sky
    content: `<rect x="16" y="18" width="32" height="10" rx="2" fill="#0284C7"/>
              <rect x="16" y="32" width="32" height="10" rx="2" fill="#38BDF8"/>
              <rect x="16" y="46" width="32" height="6" rx="2" fill="#BAE6FD"/>
              <rect x="36" y="26" width="16" height="20" rx="2" fill="#0369A1"/>
              <circle cx="40" cy="32" r="1.5" fill="#fff"/>
              <circle cx="44" cy="32" r="1.5" fill="#fff"/>
              <circle cx="48" cy="32" r="1.5" fill="#fff"/>`
  },
  'inventory.svg': {
    bg: '#DCFCE7', // green
    content: `<path d="M32 18l14 7-14 7-14-7 14-7z" fill="#86EFAC"/>
              <path d="M18 25v14l14 7V32l-14-7z" fill="#22C55E"/>
              <path d="M46 25v14l-14 7V32l14-7z" fill="#16A34A"/>`
  },
  'stock_registry.svg': {
    bg: '#ECFDF5', // emerald
    content: `<path d="M26 28l10 5-10 5-10-5 10-5z" fill="#6EE7B7"/>
              <path d="M16 33v10l10 5V38l-10-5z" fill="#10B981"/>
              <path d="M36 33v10l-10 5V38l10-5z" fill="#047857"/>
              
              <path d="M38 16l10 5-10 5-10-5 10-5z" fill="#6EE7B7"/>
              <path d="M28 21v10l10 5V26l-10-5z" fill="#10B981"/>
              <path d="M48 21v10l-10 5V26l10-5z" fill="#047857"/>`
  },
  'insights_reporting.svg': {
    bg: '#F3E8FF', // purple
    content: `<rect x="18" y="38" width="6" height="12" rx="1" fill="#D8B4FE"/>
              <rect x="29" y="28" width="6" height="22" rx="1" fill="#A855F7"/>
              <rect x="40" y="16" width="6" height="34" rx="1" fill="#7E22CE"/>
              <path d="M18 30l11-8 11-10" fill="none" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  'reports.svg': {
    bg: '#EFF6FF', // blue
    content: `<rect x="20" y="12" width="24" height="40" rx="2" fill="#fff" stroke="#3B82F6" stroke-width="2"/>
              <path d="M26 20h12M26 26h8M26 44h12" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
              <rect x="26" y="32" width="6" height="8" fill="#3B82F6"/>
              <rect x="34" y="28" width="6" height="12" fill="#1D4ED8"/>`
  }
};

for (const [filename, data] of Object.entries(icons)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
  <rect width="64" height="64" rx="16" fill="${data.bg}"/>
  ${data.content}
</svg>`;
  fs.writeFileSync(path.join(outDir, filename), svg);
}

console.log("SVGs generated.");
