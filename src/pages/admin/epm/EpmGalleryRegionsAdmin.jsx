import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, ImagePlus, ImageOff, FolderPlus, Map as MapIcon } from 'lucide-react';
import {
  fetchGalleryStatesAdmin, createGalleryState, updateGalleryState, deleteGalleryState,
  setGalleryStateCover, removeGalleryStateCover, createGalleryDistrict, updateGalleryDistrict,
  deleteGalleryDistrict, fetchDistrictPhotos, uploadDistrictPhoto, updateDistrictPhoto,
  replaceDistrictPhoto, reorderDistrictPhotos, deleteDistrictPhoto,
} from '../../../api/adminEpmApi';
import { getEpmGalleryImageUrl } from '../../../api/epmApi';
import { ConfirmDialog, Empty, FormActions, FormError, Loading, Modal } from '../adminUi';
import ImageGrid, { IMAGE_ACCEPT, ImageDetailsModal, UploadButton } from './ImageGrid';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/**
 * The gallery page's "Explore by state" cards: state -> district -> photos. A state or district
 * only appears on the public page once it has at least one photo.
 */
export default function EpmGalleryRegionsAdmin({ showBanner }) {
  const [states, setStates] = useState(null);
  const [error, setError] = useState('');
  const [stateId, setStateId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [naming, setNaming] = useState(null); // { kind: 'state'|'district', item? }
  const [deleting, setDeleting] = useState(null); // { kind, item }
  const [coverBusy, setCoverBusy] = useState(false);
  const coverInput = useRef(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchGalleryStatesAdmin();
      setStates(data);
      setError('');
      setStateId((cur) => (data.some((s) => s.id === cur) ? cur : data[0]?.id ?? null));
      return data;
    } catch (e) {
      setError(e.message);
      setStates([]);
      return [];
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const state = states?.find((s) => s.id === stateId) || null;
  const district = state?.districts.find((d) => d.id === districtId) || null;

  useEffect(() => {
    // Keep the open district valid when switching state or after a delete.
    if (state && !state.districts.some((d) => d.id === districtId)) setDistrictId(state.districts[0]?.id ?? null);
  }, [state, districtId]);

  const changeCover = async (file) => {
    setCoverBusy(true);
    try {
      await setGalleryStateCover(state.id, file);
      showBanner('success', `New cover picture for ${state.name}.`);
      await load();
    } catch (e) {
      showBanner('error', e.message);
    } finally {
      setCoverBusy(false);
    }
  };

  const resetCover = async () => {
    setCoverBusy(true);
    try {
      await removeGalleryStateCover(state.id);
      showBanner('success', `${state.name} now uses its first district photo as the cover.`);
      await load();
    } catch (e) {
      showBanner('error', e.message);
    } finally {
      setCoverBusy(false);
    }
  };

  if (states === null) return <Loading label="Loading states…" />;

  return (
    <div className="adm-regions">
      {error && <div className="admin-pub-banner error">{error}</div>}

      <div className="adm-region-bar">
        <div className="adm-pills" role="tablist" aria-label="States">
          {states.map((s) => (
            <button key={s.id} type="button" role="tab" aria-selected={s.id === stateId}
              className={`adm-pill ${s.id === stateId ? 'active' : ''} ${s.photoCount === 0 ? 'is-empty' : ''}`}
              onClick={() => setStateId(s.id)}>
              {s.name} <span>{s.districts.length} · {s.photoCount}</span>
            </button>
          ))}
        </div>
        <button type="button" className="admin-pub-btn primary adm-btn-sm" onClick={() => setNaming({ kind: 'state' })}>
          <Plus size={15} /> Add state
        </button>
      </div>

      {!state ? (
        <Empty>No states yet. Add one, then add its districts and their photos.</Empty>
      ) : (
        <>
          <section className="adm-block adm-state-panel">
            <div className="adm-state-cover">
              {state.coverUrl
                ? <img src={getEpmGalleryImageUrl(state.coverUrl)} alt={`${state.name} cover`} />
                : <span className="adm-state-cover-empty"><ImageOff size={22} /></span>}
            </div>
            <div className="adm-state-info">
              <h3>{state.name}</h3>
              <p className="adm-cell-sub">
                {plural(state.districts.length, 'district')} · {plural(state.photoCount, 'photo')}
                {state.photoCount === 0 && ' · hidden on the gallery page until it has a photo'}
              </p>
              <p className="adm-cell-sub">
                Card picture: {state.hasCustomCover ? 'its own cover' : state.coverUrl ? 'first photo of its first district' : 'none yet'}
              </p>
              <div className="adm-inline-actions">
                <button type="button" className="admin-pub-btn adm-btn-secondary adm-btn-sm" disabled={coverBusy} onClick={() => coverInput.current?.click()}>
                  <ImagePlus size={14} /> {state.hasCustomCover ? 'Change cover' : 'Upload cover'}
                </button>
                {state.hasCustomCover && (
                  <button type="button" className="admin-pub-btn adm-btn-secondary adm-btn-sm" disabled={coverBusy} onClick={resetCover}>
                    Use first photo instead
                  </button>
                )}
                <button type="button" className="admin-pub-btn adm-btn-secondary adm-btn-sm" onClick={() => setNaming({ kind: 'state', item: state })}>
                  <Pencil size={14} /> Rename / reorder
                </button>
                <button type="button" className="admin-pub-btn adm-btn-danger adm-btn-sm" onClick={() => setDeleting({ kind: 'state', item: state })}>
                  <Trash2 size={14} /> Delete state
                </button>
              </div>
              <input ref={coverInput} type="file" accept={IMAGE_ACCEPT} hidden
                onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) changeCover(f); }} />
            </div>
          </section>

          <div className="adm-district-layout">
            <aside className="adm-district-list">
              <div className="adm-district-list-head">
                <span>Districts</span>
                <button type="button" className="adm-link-btn" onClick={() => setNaming({ kind: 'district' })}><FolderPlus size={14} /> Add</button>
              </div>
              {state.districts.length === 0 ? (
                <p className="adm-cell-sub adm-pad">No districts yet.</p>
              ) : (
                <ul>
                  {state.districts.map((d) => (
                    <li key={d.id}>
                      <button type="button" className={`adm-district ${d.id === districtId ? 'active' : ''}`} onClick={() => setDistrictId(d.id)}>
                        <span className="adm-district-thumb">
                          {d.coverUrl ? <img src={getEpmGalleryImageUrl(d.coverUrl)} alt="" loading="lazy" /> : <MapIcon size={14} />}
                        </span>
                        <span className="adm-district-name">{d.name}</span>
                        <span className="adm-district-count">{d.photoCount}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </aside>

            <div className="adm-district-photos">
              {district ? (
                <DistrictPhotos
                  key={district.id}
                  district={district}
                  showBanner={showBanner}
                  onChanged={load}
                  onRename={() => setNaming({ kind: 'district', item: district })}
                  onDelete={() => setDeleting({ kind: 'district', item: district })}
                />
              ) : (
                <Empty>Add a district to start uploading its photos.</Empty>
              )}
            </div>
          </div>
        </>
      )}

      {naming && (
        <NameModal
          kind={naming.kind}
          item={naming.item}
          parentName={state?.name}
          onClose={() => setNaming(null)}
          onSave={async (payload) => {
            let saved;
            if (naming.kind === 'state') {
              saved = naming.item ? await updateGalleryState(naming.item.id, payload) : await createGalleryState(payload);
            } else {
              saved = naming.item ? await updateGalleryDistrict(naming.item.id, payload) : await createGalleryDistrict(state.id, payload);
            }
            setNaming(null);
            showBanner('success', `${naming.item ? 'Saved' : 'Added'} ${saved.name}.`);
            await load();
            if (naming.kind === 'state' && !naming.item) setStateId(saved.id);
            if (naming.kind === 'district' && !naming.item) setDistrictId(saved.id);
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title={`Delete ${deleting.kind}?`}
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            if (deleting.kind === 'state') await deleteGalleryState(deleting.item.id);
            else await deleteGalleryDistrict(deleting.item.id);
            showBanner('success', `Deleted ${deleting.item.name}.`);
            setDeleting(null);
            await load();
          }}
        >
          <p>
            Delete <strong>{deleting.item.name}</strong>
            {deleting.kind === 'state'
              ? ` with its ${plural(deleting.item.districts.length, 'district')} and ${plural(deleting.item.photoCount, 'photo')}?`
              : ` and its ${plural(deleting.item.photoCount, 'photo')}?`}
          </p>
          <p className="admin-pub-hint">The photo files are removed from the server as well. This can't be undone.</p>
        </ConfirmDialog>
      )}
    </div>
  );
}

function DistrictPhotos({ district, showBanner, onChanged, onRename, onDelete }) {
  const [photos, setPhotos] = useState(null);
  const [uploading, setUploading] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(() => {
    fetchDistrictPhotos(district.id).then(setPhotos).catch((e) => { showBanner('error', e.message); setPhotos([]); });
  }, [district.id, showBanner]);

  useEffect(() => { load(); }, [load]);

  const upload = async (files) => {
    const failures = [];
    let done = 0;
    for (const file of files) {
      setUploading(`Uploading ${done + failures.length + 1} of ${files.length}…`);
      try {
        await uploadDistrictPhoto(district.id, file);
        done += 1;
      } catch (e) {
        failures.push(`${file.name}: ${e.message}`);
      }
    }
    setUploading('');
    load();
    onChanged();
    showBanner(failures.length ? 'error' : 'success',
      failures.length ? failures.join(' · ') : `Added ${plural(done, 'photo')} to ${district.name}.`);
  };

  const withBusy = async (id, action, success) => {
    setBusyId(id);
    try {
      await action();
      if (success) showBanner('success', success);
      load();
      onChanged();
    } catch (e) {
      showBanner('error', e.message);
    } finally {
      setBusyId(null);
    }
  };

  const move = (index, delta) => {
    const ids = photos.map((p) => p.id);
    const [id] = ids.splice(index, 1);
    ids.splice(index + delta, 0, id);
    withBusy(id, async () => setPhotos(await reorderDistrictPhotos(district.id, ids)));
  };

  return (
    <section className="adm-block">
      <div className="adm-block-head">
        <div>
          <h3>{district.name} <span className="adm-block-count">{photos ? photos.length : district.photoCount}</span></h3>
          <p>The first photo is the district card's picture. Photos are shown in this order.</p>
        </div>
        <div className="adm-inline-actions">
          <button type="button" className="admin-pub-icon-btn" title="Rename / reorder district" onClick={onRename}><Pencil size={15} /></button>
          <button type="button" className="admin-pub-icon-btn danger" title="Delete district" onClick={onDelete}><Trash2 size={15} /></button>
          <UploadButton label="Upload photos" multiple busy={Boolean(uploading)} onFiles={upload} />
        </div>
      </div>
      {uploading && <p className="admin-pub-hint adm-hint-tight">{uploading}</p>}
      {photos === null ? <Loading /> : photos.length === 0 ? (
        <div className="adm-block-empty">No photos yet - this district is hidden on the gallery page until it has one.</div>
      ) : (
        <ImageGrid
          images={photos}
          busyId={busyId}
          onMove={photos.length > 1 ? move : null}
          onEdit={setEditing}
          onReplace={(p, file) => withBusy(p.id, () => replaceDistrictPhoto(district.id, p.id, file), 'Photo replaced.')}
          onDelete={setDeleting}
        />
      )}

      {editing && (
        <ImageDetailsModal
          image={editing}
          showPlace={false}
          onClose={() => setEditing(null)}
          onSave={async (payload) => {
            await updateDistrictPhoto(district.id, editing.id, payload);
            setEditing(null);
            showBanner('success', 'Caption saved.');
            load();
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete photo?"
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteDistrictPhoto(district.id, deleting.id);
            setDeleting(null);
            showBanner('success', `Photo removed from ${district.name}.`);
            load();
            onChanged();
          }}
        >
          <p>Delete this photo from <strong>{district.name}</strong>? The file is removed from the server too.</p>
        </ConfirmDialog>
      )}
    </section>
  );
}

function NameModal({ kind, item, parentName, onClose, onSave }) {
  const [name, setName] = useState(item?.name || '');
  const [order, setOrder] = useState(item ? String(item.displayOrder) : '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onSave({ name, displayOrder: order === '' ? null : Number(order) });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const title = `${item ? 'Edit' : 'Add'} ${kind}${kind === 'district' && parentName ? ` in ${parentName}` : ''}`;
  return (
    <Modal title={title} icon={kind === 'state' ? MapIcon : FolderPlus} onClose={onClose} busy={busy} size="narrow">
      <form className="admin-pub-form" onSubmit={submit}>
        <FormError message={error} />
        <label>
          Name
          <input type="text" value={name} maxLength={100} required autoFocus onChange={(e) => setName(e.target.value)}
            placeholder={kind === 'state' ? 'e.g. Karnataka' : 'e.g. Mysuru'} />
        </label>
        <label>
          Position <span className="optional">(lower comes first{item ? '' : '; blank = last'})</span>
          <input type="number" min={0} value={order} onChange={(e) => setOrder(e.target.value)} />
        </label>
        {item && <p className="admin-pub-hint adm-hint-tight">Renaming changes the page's web address but keeps every photo.</p>}
        <FormActions onCancel={onClose} busy={busy} submitLabel={item ? 'Save' : `Add ${kind}`} busyLabel="Saving…" />
      </form>
    </Modal>
  );
}
