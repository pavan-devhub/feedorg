import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { deleteEpmVideo, fetchEpmVideoAdmin, uploadEpmVideo, VIDEO_MAX_BYTES } from '../../../api/adminEpmApi';
import { getEpmVideoUrl } from '../../../api/epmApi';
import { ConfirmDialog, Loading } from '../adminUi';
import { formatDateTime, formatSize } from '../adminUtils';

const VIDEO_ACCEPT = 'video/mp4,video/webm';

const MAX_LABEL = `${VIDEO_MAX_BYTES / (1024 * 1024)} MB`;

// What the public EPM page plays until a video is uploaded (see Epm.jsx).
const BUILT_IN_VIDEO = '/vid.mp4';

/**
 * The full-width video under the navbar at the top of the EPM page. "Edit video" uploads a new
 * one (stored in the server's EPM storage folder, replacing any earlier upload); "Remove" goes
 * back to the page's built-in video.
 */
export default function EpmVideoPanel({ showBanner }) {
  // undefined = still loading, null = none uploaded (built-in video playing)
  const [video, setVideo] = useState(undefined);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(null);
  const [removing, setRemoving] = useState(false);
  const input = useRef(null);
  const uploading = progress !== null;

  const load = useCallback(() => {
    fetchEpmVideoAdmin()
      .then((data) => { setVideo(data); setError(''); })
      .catch((e) => { setError(e.message); setVideo(null); });
  }, []);

  useEffect(() => { load(); }, [load]);

  const upload = async (file) => {
    if (file.size > VIDEO_MAX_BYTES) {
      showBanner('error', `“${file.name}” is ${formatSize(file.size)} - videos must be ${MAX_LABEL} or smaller.`);
      return;
    }
    setProgress(0);
    try {
      setVideo(await uploadEpmVideo(file, setProgress));
      showBanner('success', 'Video updated - the EPM page now plays it.');
    } catch (e) {
      showBanner('error', e.message);
    } finally {
      setProgress(null);
    }
  };

  return (
    <section className="adm-block">
      <div className="adm-block-head">
        <div>
          <h3>Hero video</h3>
          <p>
            The full-width video right under the navbar at the top of the EPM page. It plays muted and on a loop,
            so a short clip works best. MP4 or WebM, up to {MAX_LABEL}.
          </p>
        </div>
        <div className="adm-inline-actions">
          <button type="button" className="admin-pub-btn primary adm-btn-sm" disabled={uploading || video === undefined}
            onClick={() => input.current?.click()}>
            {uploading ? <Loader2 size={15} className="admin-pub-spin" /> : <Pencil size={15} />} Edit video
          </button>
          {video && (
            <button type="button" className="admin-pub-btn adm-btn-danger adm-btn-sm" disabled={uploading} onClick={() => setRemoving(true)}>
              <Trash2 size={15} /> Remove
            </button>
          )}
        </div>
        <input
          ref={input}
          type="file"
          accept={VIDEO_ACCEPT}
          hidden
          onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) upload(f); }}
        />
      </div>

      {uploading && <p className="admin-pub-hint adm-hint-tight">Uploading… {Math.round(progress * 100)}%</p>}
      {error && <div className="admin-pub-form-error">{error}</div>}

      {video === undefined ? <Loading label="Loading video…" /> : (
        <div className={`adm-video ${video ? '' : 'is-default'}`}>
          <div className="adm-video-media">
            <video key={video?.videoUrl || BUILT_IN_VIDEO} src={video ? getEpmVideoUrl(video.videoUrl) : BUILT_IN_VIDEO}
              controls muted playsInline preload="metadata" />
          </div>
          <div className="adm-cell-sub">
            {video
              ? [formatSize(video.fileSize), `updated ${formatDateTime(video.updatedAt)}`].filter(Boolean).join(' · ')
              : 'Built-in video - shown until you upload one'}
          </div>
        </div>
      )}

      {removing && (
        <ConfirmDialog
          title="Remove video?"
          confirmLabel="Remove"
          onCancel={() => setRemoving(false)}
          onConfirm={async () => {
            await deleteEpmVideo();
            setRemoving(false);
            setVideo(null);
            showBanner('success', 'Video removed - the EPM page is back to its built-in video.');
          }}
        >
          <p>Remove the uploaded video from the EPM page? The file is deleted from the server too.</p>
          <p className="admin-pub-hint">The page goes back to its built-in video.</p>
        </ConfirmDialog>
      )}
    </section>
  );
}
