import React, { useState } from 'react';
import { Quote, Plus, Pencil, Trash2, Star, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import {
  fetchAdminReviews, createAdminReview, updateAdminReview, deleteAdminReview, moveAdminReview,
} from '../../../api/adminEpmApi';
import { Banner, ConfirmDialog, Empty, FormActions, FormError, Loading, Modal, Pagination, SectionHeader } from '../adminUi';
import { DEFAULT_PAGE_SIZE, useBanner } from '../adminUtils';
import useServerPagedList from '../../../hooks/useServerPagedList';

const toPayload = (r, overrides = {}) => ({
  authorName: r.authorName,
  authorRole: r.authorRole,
  content: r.content,
  rating: r.rating,
  published: r.published,
  displayOrder: r.displayOrder,
  ...overrides,
});

export default function EpmReviewsAdmin() {
  const [editing, setEditing] = useState(null); // null | { review? }
  const [deleting, setDeleting] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [banner, showBanner] = useBanner();

  // The backend pages the list, in the order the EPM page shows it.
  const {
    items: reviews, result, pager, loading, error, reload,
  } = useServerPagedList(fetchAdminReviews, DEFAULT_PAGE_SIZE);

  const run = async (id, action, message) => {
    setBusyId(id);
    try {
      await action();
      if (message) showBanner('success', message);
      reload();
    } catch (e) {
      showBanner('error', e.message);
    } finally {
      setBusyId(null);
    }
  };

  // Swaps places with the neighbour - which may be on the next or previous page; the backend
  // rewrites every review's order as 0..n-1 so ties can't stick.
  const move = (review, delta) => run(review.id, () => moveAdminReview(review.id, delta));

  return (
    <>
      <SectionHeader
        eyebrow="EPM"
        icon={Quote}
        title="Reviews"
        description="Testimonials shown in the Testimonials slider on the EPM page. Hidden reviews stay here but aren't shown publicly."
      >
        <button type="button" className="admin-pub-btn primary" onClick={() => setEditing({})}>
          <Plus size={16} /> Add review
        </button>
      </SectionHeader>

      <Banner banner={banner} />
      {error && <div className="admin-pub-banner error">{error}</div>}

      {loading && reviews.length === 0 ? <div className="admin-pub-table-wrap"><Loading label="Loading reviews…" /></div> : reviews.length === 0 ? (
        <div className="admin-pub-table-wrap"><Empty>No reviews yet - the EPM page hides its Testimonials section until one is published.</Empty></div>
      ) : (
        <div className="adm-paged">
          <div className="adm-table-caption">{result.publishedCount} of {pager.total} shown on the EPM page, in this order</div>
          <ul className="adm-review-list">
            {reviews.map((r, pageIndex) => {
              // Position in the whole list - moving up/down works across page boundaries too.
              const i = pager.start + pageIndex;
              return (
                <li key={r.id} className={`adm-review ${r.published ? '' : 'is-hidden'}`}>
                  <div className="adm-review-order">
                    <button type="button" className="admin-pub-icon-btn" title="Move up" disabled={i === 0 || busyId !== null || loading} onClick={() => move(r, -1)}><ArrowUp size={14} /></button>
                    <button type="button" className="admin-pub-icon-btn" title="Move down" disabled={i === pager.total - 1 || busyId !== null || loading} onClick={() => move(r, 1)}><ArrowDown size={14} /></button>
                  </div>
                  <div className="adm-review-body">
                    <div className="adm-stars" aria-label={`${r.rating} out of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={14} className={n <= r.rating ? 'on' : ''} fill={n <= r.rating ? 'currentColor' : 'none'} />)}
                      {!r.published && <span className="adm-tag adm-tag-gray">Hidden</span>}
                    </div>
                    <p className="adm-review-text">“{r.content}”</p>
                    <div className="adm-review-author">
                      <span className="adm-avatar">{r.authorName.charAt(0).toUpperCase()}</span>
                      <div>
                        <strong>{r.authorName}</strong>
                        {r.authorRole && <div className="adm-cell-sub">{r.authorRole}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="adm-review-actions">
                    <button type="button" className="admin-pub-icon-btn" title={r.published ? 'Hide from EPM page' : 'Show on EPM page'} disabled={busyId !== null}
                      onClick={() => run(r.id, () => updateAdminReview(r.id, toPayload(r, { published: !r.published })),
                        r.published ? `Hid ${r.authorName}'s review.` : `${r.authorName}'s review is now on the EPM page.`)}>
                      {r.published ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button type="button" className="admin-pub-icon-btn" title="Edit" onClick={() => setEditing({ review: r })}><Pencil size={15} /></button>
                    <button type="button" className="admin-pub-icon-btn danger" title="Delete" onClick={() => setDeleting(r)}><Trash2 size={15} /></button>
                  </div>
                </li>
              );
            })}
          </ul>
          <Pagination pager={pager} noun="reviews" />
        </div>
      )}

      {editing && (
        <ReviewFormModal
          review={editing.review}
          onClose={() => setEditing(null)}
          onSaved={(saved) => {
            setEditing(null);
            showBanner('success', `Saved ${saved.authorName}'s review.`);
            reload();
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete review?"
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteAdminReview(deleting.id);
            showBanner('success', `Deleted ${deleting.authorName}'s review.`);
            setDeleting(null);
            reload();
          }}
        >
          <p>Delete the review by <strong>{deleting.authorName}</strong>? To take it off the EPM page but keep it, hide it instead.</p>
        </ConfirmDialog>
      )}
    </>
  );
}

function ReviewFormModal({ review, onClose, onSaved }) {
  const [form, setForm] = useState({
    authorName: review?.authorName || '',
    authorRole: review?.authorRole || '',
    content: review?.content || '',
    rating: review?.rating || 5,
    published: review ? review.published : true,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = { ...form, displayOrder: review?.displayOrder };
      onSaved(review ? await updateAdminReview(review.id, payload) : await createAdminReview(payload));
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title={review ? 'Edit review' : 'Add review'} icon={Quote} onClose={onClose} busy={busy}>
      <form className="admin-pub-form" onSubmit={submit}>
        <FormError message={error} />
        <div className="admin-pub-form-row">
          <label>
            Name
            <input type="text" value={form.authorName} maxLength={255} required placeholder="e.g. Ramesh"
              onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))} />
          </label>
          <label>
            Role <span className="optional">(optional)</span>
            <input type="text" value={form.authorRole} maxLength={255} placeholder="e.g. Farmer, FPO Member"
              onChange={(e) => setForm((f) => ({ ...f, authorRole: e.target.value }))} />
          </label>
        </div>
        <label>
          Review
          <textarea rows={4} maxLength={2000} required value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} />
        </label>
        <div className="admin-pub-field-block">
          <span className="admin-pub-field-label">Rating</span>
          <div className="adm-star-picker" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={form.rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`}
                className={n <= form.rating ? 'on' : ''} onClick={() => setForm((f) => ({ ...f, rating: n }))}>
                <Star size={22} fill={n <= form.rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>
        <label className="adm-check">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
          Show on the EPM page
        </label>
        <FormActions onCancel={onClose} busy={busy} submitLabel={review ? 'Save changes' : 'Add review'} busyLabel="Saving…" />
      </form>
    </Modal>
  );
}
