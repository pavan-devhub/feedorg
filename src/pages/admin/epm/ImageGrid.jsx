import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pencil, RefreshCw, Trash2, ImagePlus, Loader2 } from 'lucide-react';
import { FormActions, FormError, Modal } from '../adminUi';
import { getEpmGalleryImageUrl } from '../../../api/epmApi';

export const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,image/avif';

const formatSize = (bytes) => {
  if (!bytes) return null;
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

/** A button that opens the file picker and hands back the chosen image file(s). */
export function UploadButton({ label = 'Upload', multiple = false, disabled, busy, onFiles, className = 'admin-pub-btn primary adm-btn-sm' }) {
  const input = useRef(null);
  return (
    <>
      <button type="button" className={className} disabled={disabled || busy} onClick={() => input.current?.click()}>
        {busy ? <Loader2 size={15} className="admin-pub-spin" /> : <ImagePlus size={15} />} {label}
      </button>
      <input
        ref={input}
        type="file"
        accept={IMAGE_ACCEPT}
        multiple={multiple}
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          e.target.value = '';
          if (files.length) onFiles(files);
        }}
      />
    </>
  );
}

/** Invisible file input for "replace this picture" - returns a function that opens it. */
function useFilePicker(onFile) {
  const input = useRef(null);
  const element = (
    <input ref={input} type="file" accept={IMAGE_ACCEPT} hidden
      onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) onFile(f); }} />
  );
  return [() => input.current?.click(), element];
}

function Thumb({ image, index, count, slotLabel, busy, showMeta, onMove, onEdit, onReplace, onDelete }) {
  const [openPicker, picker] = useFilePicker((file) => onReplace(image, file));
  const place = [image.city, image.state].filter(Boolean).join(', ');
  return (
    <li className={`adm-thumb ${busy ? 'is-busy' : ''}`}>
      {slotLabel && <span className="adm-thumb-slot">{slotLabel}</span>}
      <div className="adm-thumb-media">
        <img src={getEpmGalleryImageUrl(image.imageUrl)} alt={image.caption || ''} loading="lazy" />
        {busy && <span className="adm-thumb-busy"><Loader2 size={20} className="admin-pub-spin" /></span>}
      </div>
      <div className="adm-thumb-body">
        {showMeta && (
          <>
            <div className={`adm-thumb-caption ${image.caption ? '' : 'is-empty'}`} title={image.caption || ''}>{image.caption || 'No caption'}</div>
            {place && <div className="adm-cell-sub">{place}</div>}
          </>
        )}
        <div className="adm-cell-sub">
          {[image.width && image.height ? `${image.width}×${image.height}` : null, formatSize(image.fileSize)].filter(Boolean).join(' · ')}
        </div>
      </div>
      <div className="adm-thumb-actions">
        {onMove && (
          <>
            <button type="button" className="admin-pub-icon-btn" title="Move earlier" disabled={busy || index === 0} onClick={() => onMove(index, -1)}><ArrowLeft size={14} /></button>
            <button type="button" className="admin-pub-icon-btn" title="Move later" disabled={busy || index === count - 1} onClick={() => onMove(index, 1)}><ArrowRight size={14} /></button>
          </>
        )}
        {onEdit && <button type="button" className="admin-pub-icon-btn" title="Edit details" disabled={busy} onClick={() => onEdit(image)}><Pencil size={14} /></button>}
        <button type="button" className="admin-pub-icon-btn" title="Replace picture" disabled={busy} onClick={openPicker}><RefreshCw size={14} /></button>
        <button type="button" className="admin-pub-icon-btn danger" title="Delete" disabled={busy} onClick={() => onDelete(image)}><Trash2 size={14} /></button>
      </div>
      {picker}
    </li>
  );
}

/**
 * Thumbnails with move / edit / replace / delete actions. `defaults` are built-in pictures that
 * the public page falls back to for positions nothing has been uploaded for yet (e.g. the three
 * stat cards), shown greyed out after the uploaded images.
 */
export default function ImageGrid({ images, slotLabels, defaults = [], busyId, showMeta = true, onMove, onEdit, onReplace, onDelete }) {
  const fallbackSlots = defaults.slice(images.length);
  return (
    <ul className="adm-thumb-grid">
      {images.map((img, i) => (
        <Thumb key={img.id} image={img} index={i} count={images.length} slotLabel={slotLabels?.[i]}
          busy={busyId === img.id} showMeta={showMeta}
          onMove={onMove} onEdit={onEdit} onReplace={onReplace} onDelete={onDelete} />
      ))}
      {fallbackSlots.map((src, i) => (
        <li key={`default-${i}`} className="adm-thumb is-default">
          {slotLabels?.[images.length + i] && <span className="adm-thumb-slot">{slotLabels[images.length + i]}</span>}
          <div className="adm-thumb-media"><img src={src} alt="" loading="lazy" /></div>
          <div className="adm-thumb-body"><div className="adm-cell-sub">Built-in picture - shown until you upload one</div></div>
        </li>
      ))}
    </ul>
  );
}

/** Caption (and, for page sections, where it was taken) for one image. */
export function ImageDetailsModal({ image, showPlace = true, onClose, onSave }) {
  const [form, setForm] = useState({
    caption: image.caption || '',
    city: image.city || '',
    state: image.state || '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onSave(showPlace ? form : { caption: form.caption });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title="Image details" icon={Pencil} onClose={onClose} busy={busy}>
      <form className="admin-pub-form" onSubmit={submit}>
        <FormError message={error} />
        <label>
          Caption <span className="optional">(optional)</span>
          <input type="text" maxLength={500} value={form.caption} onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
            placeholder="e.g. Opening session with exporters" />
        </label>
        {showPlace && (
          <div className="admin-pub-form-row">
            <label>
              Place <span className="optional">(optional)</span>
              <input type="text" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
            </label>
            <label>
              State <span className="optional">(optional)</span>
              <input type="text" value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} />
            </label>
          </div>
        )}
        <FormActions onCancel={onClose} busy={busy} submitLabel="Save" busyLabel="Saving…" />
      </form>
    </Modal>
  );
}
