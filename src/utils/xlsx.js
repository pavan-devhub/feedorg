// A small Excel (.xlsx) writer for the admin's exports - no library needed. Unlike CSV, a real
// spreadsheet says what each cell is: mobile numbers stay text (CSV ones open in Excel as
// 9.88E+09), dates are real dates shown as 15-Oct-2026, and every column is wide enough to read
// (CSV dates open as ##### in Excel's narrow default columns).
//
// An .xlsx file is a zip of a few XML files; the zip here is "stored" (uncompressed), which every
// spreadsheet app opens.

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
const NS_MAIN = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
const NS_REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const NS_PKG_REL = 'http://schemas.openxmlformats.org/package/2006/relationships';

// Cell styles, by position in styles.xml's <cellXfs>.
const STYLE = { header: 1, text: 2, date: 3, datetime: 4 };

const STYLES_XML = `${XML_HEADER}<styleSheet xmlns="${NS_MAIN}">`
  + '<numFmts count="2"><numFmt numFmtId="164" formatCode="dd-mmm-yyyy"/><numFmt numFmtId="165" formatCode="dd-mmm-yyyy hh:mm"/></numFmts>'
  + '<fonts count="2"><font><sz val="11"/><name val="Calibri"/><family val="2"/></font>'
  + '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font></fonts>'
  + '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>'
  + '<fill><patternFill patternType="solid"><fgColor rgb="FF0B5D3B"/><bgColor indexed="64"/></patternFill></fill></fills>'
  + '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
  + '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
  + '<cellXfs count="5">'
  + '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
  + '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>'
  + '<xf numFmtId="49" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>'
  + '<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="left"/></xf>'
  + '<xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="left"/></xf>'
  + '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';

// Characters XML 1.0 doesn't allow at all (control characters other than tab / newline / return).
// eslint-disable-next-line no-control-regex
const INVALID_XML = /[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g;

const escapeXml = (s) => String(s).replace(INVALID_XML, '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** 0 -> "A", 25 -> "Z", 26 -> "AA". */
function columnName(index) {
  let name = '';
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) {
    name = String.fromCharCode(65 + ((n - 1) % 26)) + name;
  }
  return name;
}

const EXCEL_EPOCH = Date.UTC(1899, 11, 30);

/**
 * "2026-10-15" or "2026-10-15T18:05:33.12" -> Excel's day number (with the time as a fraction),
 * read as written - no time zone shifting. null if it isn't a date.
 */
function excelSerial(iso, withTime) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?/.exec(String(iso || ''));
  if (!m) return null;
  const days = (Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])) - EXCEL_EPOCH) / 86400000;
  if (!withTime || !m[4]) return days;
  return days + (Number(m[4]) * 3600 + Number(m[5]) * 60 + Number(m[6] || 0)) / 86400;
}

const DISPLAY_WIDTH = { date: 13, datetime: 19 };

function cellXml(ref, value, type) {
  if (value === null || value === undefined || value === '') return '';
  if (type === 'date' || type === 'datetime') {
    const serial = excelSerial(value, type === 'datetime');
    if (serial !== null) return `<c r="${ref}" s="${STYLE[type]}"><v>${serial}</v></c>`;
  }
  if (type === 'number' && Number.isFinite(Number(value))) {
    return `<c r="${ref}"><v>${Number(value)}</v></c>`;
  }
  return `<c r="${ref}" t="inlineStr" s="${STYLE.text}"><is><t xml:space="preserve">${escapeXml(value)}</t></is></c>`;
}

function sheetXml(columns, rows) {
  const lastCol = columnName(columns.length - 1);
  const lastRow = rows.length + 1;
  const values = rows.map((r) => columns.map((c) => c.value(r)));

  // Each column as wide as its longest entry (within reason), dates as wide as they display.
  const widths = columns.map((c, i) => {
    const longest = Math.max(String(c.label).length, ...values.map((v) => (
      v[i] === null || v[i] === undefined ? 0 : DISPLAY_WIDTH[c.type] || String(v[i]).length)));
    return Math.min(60, Math.max(10, longest + 2));
  });

  const header = `<row r="1">${columns.map((c, i) => `<c r="${columnName(i)}1" t="inlineStr" s="${STYLE.header}"><is><t>${escapeXml(c.label)}</t></is></c>`).join('')}</row>`;
  const body = values.map((v, r) => `<row r="${r + 2}">${v.map((value, i) => cellXml(`${columnName(i)}${r + 2}`, value, columns[i].type)).join('')}</row>`).join('');

  return `${XML_HEADER}<worksheet xmlns="${NS_MAIN}" xmlns:r="${NS_REL}">`
    + `<dimension ref="A1:${lastCol}${lastRow}"/>`
    + '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>'
    + '<sheetFormatPr defaultRowHeight="15"/>'
    + `<cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>`
    + `<sheetData>${header}${body}</sheetData>`
    + `<autoFilter ref="A1:${lastCol}${lastRow}"/>`
    + '</worksheet>';
}

// --- zip (stored) ---------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i += 1) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function zip(files) {
  const encoder = new TextEncoder();
  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

  const entries = files.map(({ name, content }) => {
    const nameBytes = encoder.encode(name);
    const data = encoder.encode(content);
    return { nameBytes, data, crc: crc32(data) };
  });
  const localSize = entries.reduce((sum, e) => sum + 30 + e.nameBytes.length + e.data.length, 0);
  const centralSize = entries.reduce((sum, e) => sum + 46 + e.nameBytes.length, 0);
  const out = new Uint8Array(localSize + centralSize + 22);
  const view = new DataView(out.buffer);
  let pos = 0;
  const u16 = (v) => { view.setUint16(pos, v, true); pos += 2; };
  const u32 = (v) => { view.setUint32(pos, v, true); pos += 4; };
  const bytes = (b) => { out.set(b, pos); pos += b.length; };

  const offsets = [];
  entries.forEach((e) => {
    offsets.push(pos);
    u32(0x04034b50); u16(20); u16(0x0800); u16(0); u16(dosTime); u16(dosDate);
    u32(e.crc); u32(e.data.length); u32(e.data.length); u16(e.nameBytes.length); u16(0);
    bytes(e.nameBytes); bytes(e.data);
  });
  const centralStart = pos;
  entries.forEach((e, i) => {
    u32(0x02014b50); u16(20); u16(20); u16(0x0800); u16(0); u16(dosTime); u16(dosDate);
    u32(e.crc); u32(e.data.length); u32(e.data.length); u16(e.nameBytes.length); u16(0); u16(0);
    u16(0); u16(0); u32(0); u32(offsets[i]);
    bytes(e.nameBytes);
  });
  const centralLength = pos - centralStart;
  u32(0x06054b50); u16(0); u16(0); u16(entries.length); u16(entries.length);
  u32(centralLength); u32(centralStart); u16(0);
  return out;
}

// --- public -------------------------------------------------------------------------------

/**
 * The .xlsx file's bytes: one sheet with a bold header row (frozen, with filters) and a row per
 * item. `columns` is [{ label, value: (row) => any, type }], where type is 'text' (the default -
 * kept exactly as written, e.g. a mobile number), 'number', 'date' ("yyyy-MM-dd") or 'datetime'
 * ("yyyy-MM-ddTHH:mm:ss").
 */
export function buildXlsx(sheetName, columns, rows) {
  const name = String(sheetName || 'Sheet1').replace(/[[\]:*?/\\]/g, ' ').slice(0, 31) || 'Sheet1';
  const lastRef = `$A$1:$${columnName(columns.length - 1)}$${rows.length + 1}`;
  return zip([
    {
      name: '[Content_Types].xml',
      content: `${XML_HEADER}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">`
        + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        + '<Default Extension="xml" ContentType="application/xml"/>'
        + '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        + '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        + '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
        + '</Types>',
    },
    {
      name: '_rels/.rels',
      content: `${XML_HEADER}<Relationships xmlns="${NS_PKG_REL}">`
        + `<Relationship Id="rId1" Type="${NS_REL}/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    },
    {
      name: 'xl/workbook.xml',
      content: `${XML_HEADER}<workbook xmlns="${NS_MAIN}" xmlns:r="${NS_REL}">`
        + `<sheets><sheet name="${escapeXml(name)}" sheetId="1" r:id="rId1"/></sheets>`
        + `<definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">'${escapeXml(name.replace(/'/g, "''"))}'!${lastRef}</definedName></definedNames>`
        + '</workbook>',
    },
    {
      name: 'xl/_rels/workbook.xml.rels',
      content: `${XML_HEADER}<Relationships xmlns="${NS_PKG_REL}">`
        + `<Relationship Id="rId1" Type="${NS_REL}/worksheet" Target="worksheets/sheet1.xml"/>`
        + `<Relationship Id="rId2" Type="${NS_REL}/styles" Target="styles.xml"/></Relationships>`,
    },
    { name: 'xl/styles.xml', content: STYLES_XML },
    { name: 'xl/worksheets/sheet1.xml', content: sheetXml(columns, rows) },
  ]);
}

/** Builds the .xlsx (see buildXlsx) and saves it as `filename`. */
export function downloadXlsx(filename, sheetName, columns, rows) {
  const blob = new Blob([buildXlsx(sheetName, columns, rows)], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
