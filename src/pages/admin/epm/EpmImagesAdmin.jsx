import React, { useCallback, useEffect, useState } from 'react';
import { Images, LayoutTemplate, GalleryHorizontalEnd, Map as MapIcon, ScanSearch } from 'lucide-react';
import {
  fetchGalleryBlocks, fetchBlockImages, uploadBlockImage, updateBlockImage, replaceBlockImage,
  reorderBlockImages, deleteBlockImage, importGalleryFromStorage,
} from '../../../api/adminEpmApi';
import { Banner, ConfirmDialog, Loading, SectionHeader } from '../adminUi';
import { useBanner } from '../adminUtils';
import ImageGrid, { ImageDetailsModal, UploadButton } from './ImageGrid';
import EpmGalleryRegionsAdmin from './EpmGalleryRegionsAdmin';

// What the public EPM page shows for a block the admin hasn't uploaded anything to yet
// (see Epm.jsx) - previewed here so it's clear what an upload will replace.
const BUILT_IN = {
  'epm-hero': { defaults: ['/epm_global_agri_export.avif'] },
  'epm-stats': {
    defaults: ['/epm_stat_1.avif', '/epm_stat_2.avif', '/epm_stat_3.avif'],
    slots: ['EPMs Conducted', 'Districts Covered', 'Total Attendees'],
  },
  'epm-calendar': { defaults: ['/epm_calendar.avif'] },
};

const TABS = [
  { id: 'EPM_PAGE', label: 'EPM page', icon: LayoutTemplate },
  { id: 'GALLERY_PAGE', label: 'Gallery page sections', icon: GalleryHorizontalEnd },
  { id: 'REGIONS', label: 'States & districts', icon: MapIcon },
];

export default function EpmImagesAdmin() {
  const [tab, setTab] = useState('EPM_PAGE');
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [banner, showBanner] = useBanner();

  const loadBlocks = useCallback(() => {
    fetchGalleryBlocks()
      .then((data) => { setBlocks(data); setError(''); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadBlocks(); }, [loadBlocks]);

  const scan = async () => {
    setScanning(true);
    try {
      const r = await importGalleryFromStorage();
      const added = r.imagesImported + r.statesCreated + r.districtsCreated;
      showBanner('success', added === 0
        ? 'No new files found in the storage folder.'
        : `Added ${r.imagesImported} image(s), ${r.statesCreated} state(s) and ${r.districtsCreated} district(s) found in the storage folder.`);
      loadBlocks();
      setRefreshKey((k) => k + 1);
    } catch (e) {
      showBanner('error', e.message);
    } finally {
      setScanning(false);
    }
  };

  return (
    <>
      <SectionHeader
        eyebrow="EPM"
        icon={Images}
        title="Page & Gallery Images"
        description="Every picture on the EPM page and the EPM gallery page. Images are stored on the server; their names, captions and order are kept in the database."
      >
        <button type="button" className="admin-pub-btn adm-btn-secondary" onClick={scan} disabled={scanning}
          title="Register image files that were copied straight into the server's storage folder">
          <ScanSearch size={16} /> {scanning ? 'Scanning…' : 'Scan storage folder'}
        </button>
      </SectionHeader>

      <Banner banner={banner} />
      {error && <div className="admin-pub-banner error">{error}</div>}

      <div className="adm-tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className={`adm-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'REGIONS' ? (
        <EpmGalleryRegionsAdmin key={refreshKey} showBanner={showBanner} />
      ) : loading ? <Loading label="Loading image sections…" /> : (
        <div className="adm-block-list">
          {blocks.filter((b) => b.page === tab).map((b) => (
            <BlockPanel key={`${b.id}-${refreshKey}`} block={b} showBanner={showBanner} onCountChange={loadBlocks} />
          ))}
        </div>
      )}
    </>
  );
}

function BlockPanel({ block, showBanner, onCountChange }) {
  const [images, setImages] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const builtIn = BUILT_IN[block.id] || {};
  const max = block.maxImages;
  const full = max != null && (images?.length || 0) >= max;
  const isGalleryPage = block.page === 'GALLERY_PAGE';

  const load = useCallback(() => {
    fetchBlockImages(block.id)
      .then((data) => { setImages(data); setError(''); })
      .catch((e) => { setError(e.message); setImages([]); });
  }, [block.id]);

  useEffect(() => { load(); }, [load]);

  const upload = async (files) => {
    const room = max == null ? files.length : Math.max(0, max - (images?.length || 0));
    const batch = files.slice(0, room);
    let done = 0;
    const failures = [];
    for (const file of batch) {
      setUploading(`Uploading ${done + 1} of ${batch.length}…`);
      try {
        await uploadBlockImage(block.id, file);
        done += 1;
      } catch (e) {
        failures.push(`${file.name}: ${e.message}`);
      }
    }
    setUploading('');
    load();
    onCountChange();
    if (failures.length) showBanner('error', failures.join(' · '));
    else showBanner('success', `Added ${done} image${done === 1 ? '' : 's'} to “${block.label}”.`);
    if (files.length > batch.length) showBanner('error', `“${block.label}” holds at most ${max} - ${files.length - batch.length} file(s) were skipped.`);
  };

  const withBusy = async (id, action, success) => {
    setBusyId(id);
    try {
      await action();
      if (success) showBanner('success', success);
      load();
    } catch (e) {
      showBanner('error', e.message);
    } finally {
      setBusyId(null);
    }
  };

  const move = (index, delta) => {
    const ids = images.map((i) => i.id);
    const [id] = ids.splice(index, 1);
    ids.splice(index + delta, 0, id);
    withBusy(id, async () => setImages(await reorderBlockImages(block.id, ids)));
  };

  return (
    <section className="adm-block">
      <div className="adm-block-head">
        <div>
          <h3>{block.label} <span className="adm-block-count">{images ? images.length : block.imageCount}{max != null ? ` / ${max}` : ''}</span></h3>
          {block.description && <p>{block.description}</p>}
        </div>
        <UploadButton
          label={full ? (max === 1 ? 'Use Replace on the image' : 'Section full') : max === 1 ? 'Upload image' : 'Upload images'}
          multiple={max !== 1}
          disabled={full}
          busy={Boolean(uploading)}
          onFiles={upload}
        />
      </div>
      {uploading && <p className="admin-pub-hint adm-hint-tight">{uploading}</p>}
      {error && <div className="admin-pub-form-error">{error}</div>}
      {images === null ? <Loading /> : images.length === 0 && !builtIn.defaults ? (
        <div className="adm-block-empty">
          {block.id === 'epm-carousel'
            ? 'No carousel photos yet - the EPM page shows the first photos from the gallery page instead.'
            : isGalleryPage ? 'No photos yet - this section is hidden on the gallery page until it has one.' : 'No images yet.'}
        </div>
      ) : (
        <ImageGrid
          images={images}
          slotLabels={builtIn.slots}
          defaults={builtIn.defaults}
          busyId={busyId}
          showMeta={isGalleryPage || block.id === 'epm-carousel'}
          onMove={images.length > 1 ? move : null}
          onEdit={setEditing}
          onReplace={(img, file) => withBusy(img.id, () => replaceBlockImage(block.id, img.id, file), 'Picture replaced.')}
          onDelete={setDeleting}
        />
      )}

      {editing && (
        <ImageDetailsModal
          image={editing}
          showPlace={isGalleryPage || block.id === 'epm-carousel'}
          onClose={() => setEditing(null)}
          onSave={async (payload) => {
            await updateBlockImage(block.id, editing.id, payload);
            setEditing(null);
            showBanner('success', 'Image details saved.');
            load();
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete image?"
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteBlockImage(block.id, deleting.id);
            setDeleting(null);
            showBanner('success', `Image removed from “${block.label}”.`);
            load();
            onCountChange();
          }}
        >
          <p>Delete this image from <strong>{block.label}</strong>? The file is removed from the server too.</p>
          {builtIn.defaults && <p className="admin-pub-hint">The EPM page goes back to its built-in picture for this spot.</p>}
        </ConfirmDialog>
      )}
    </section>
  );
}
