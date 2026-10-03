import React, { useCallback, useEffect, useState } from 'react';
import { Tags, Plus, Pencil, Trash2 } from 'lucide-react';
import {
  fetchAdminCategories, createAdminCategory, updateAdminCategory, deleteAdminCategory, CATEGORY_COLORS,
} from '../../../api/adminEpmApi';
import { Banner, ConfirmDialog, Empty, FormActions, FormError, Loading, Modal, Pagination, SectionHeader } from '../adminUi';
import { useBanner, usePagination } from '../adminUtils';

export default function EpmCategoriesAdmin({ onOpenSection }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | { category? }
  const [deleting, setDeleting] = useState(null);
  const [banner, showBanner] = useBanner();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setCategories(await fetchAdminCategories());
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  const pager = usePagination(categories);

  return (
    <>
      <SectionHeader
        eyebrow="EPM"
        icon={Tags}
        title="Categories"
        description="The categories an EPM can belong to. They power the “Filter by Category” list on the public EPM directory and the category chosen for each upcoming EPM."
      >
        <button type="button" className="admin-pub-btn primary" onClick={() => setEditing({})}>
          <Plus size={16} /> Add category
        </button>
      </SectionHeader>

      <Banner banner={banner} />
      {error && <div className="admin-pub-banner error">{error}</div>}

      <div className="admin-pub-table-wrap">
        {loading ? <Loading label="Loading categories…" /> : categories.length === 0 ? (
          <Empty>No categories yet - add one so EPMs can be filed under it.</Empty>
        ) : (
          <>
            <table className="admin-pub-table adm-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Category</th>
                  <th>Shown on the directory as</th>
                  <th className="adm-num">Upcoming EPMs</th>
                  <th className="adm-num">All EPMs</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pager.pageItems.map((c) => (
                  <tr key={c.id}>
                    <td data-label="Order" className="adm-muted">{c.displayOrder}</td>
                    <td data-label="Category"><span className={`adm-tag adm-tag-${c.color}`}>{c.name}</span></td>
                    <td data-label="Shown as">{c.label}</td>
                    <td data-label="Upcoming EPMs" className="adm-num">{c.upcomingEventCount}</td>
                    <td data-label="All EPMs" className="adm-num">
                      <button type="button" className="adm-count-btn" onClick={() => onOpenSection('epm-events')} title="Open EPM events">
                        {c.eventCount}
                      </button>
                    </td>
                    <td className="admin-pub-actions" data-label="Actions">
                      <button type="button" className="admin-pub-icon-btn" title="Edit" onClick={() => setEditing({ category: c })}>
                        <Pencil size={15} />
                      </button>
                      <button type="button" className="admin-pub-icon-btn danger" title={c.eventCount > 0 ? 'In use - move its EPMs first' : 'Delete'}
                        onClick={() => setDeleting(c)}>
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination pager={pager} noun="categories" />
          </>
        )}
      </div>

      {editing && (
        <CategoryFormModal
          category={editing.category}
          nextOrder={categories.length}
          onClose={() => setEditing(null)}
          onSaved={(saved, renamedFrom) => {
            setEditing(null);
            showBanner('success', renamedFrom && renamedFrom !== saved.name
              ? `Renamed “${renamedFrom}” to “${saved.name}” - its ${saved.eventCount} EPM(s) were updated too.`
              : `Saved “${saved.name}”.`);
            load();
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete category?"
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteAdminCategory(deleting.id);
            showBanner('success', `Deleted “${deleting.name}”.`);
            setDeleting(null);
            load();
          }}
        >
          <p>Delete the category <strong>{deleting.name}</strong>?</p>
          {deleting.eventCount > 0 && (
            <p className="admin-pub-hint">
              {deleting.eventCount} EPM(s) still use it, so it can't be deleted until they are moved to another category.
            </p>
          )}
        </ConfirmDialog>
      )}
    </>
  );
}

function CategoryFormModal({ category, nextOrder, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: category?.name || '',
    label: category?.label || '',
    color: category?.color || 'green',
    displayOrder: category?.displayOrder ?? nextOrder,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const payload = { ...form, displayOrder: form.displayOrder === '' ? null : Number(form.displayOrder) };
    try {
      const saved = category ? await updateAdminCategory(category.id, payload) : await createAdminCategory(payload);
      onSaved(saved, category?.name);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title={category ? 'Edit category' : 'Add category'} icon={Tags} onClose={onClose} busy={busy}>
      <form className="admin-pub-form" onSubmit={submit}>
        <FormError message={error} />
        <label>
          Name
          <input type="text" value={form.name} maxLength={100} required placeholder="e.g. Buyer-Seller Meet"
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </label>
        {category && form.name.trim() !== category.name && category.eventCount > 0 && (
          <p className="admin-pub-hint adm-hint-tight">Renaming also updates the {category.eventCount} EPM(s) in this category.</p>
        )}
        <label>
          Longer label <span className="optional">(optional - shown in the directory's category list)</span>
          <input type="text" value={form.label} maxLength={200} placeholder={form.name || 'Defaults to the name'}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} />
        </label>
        <div className="admin-pub-field-block">
          <span className="admin-pub-field-label">Colour</span>
          <div className="adm-swatches" role="radiogroup">
            {CATEGORY_COLORS.map((c) => (
              <button key={c} type="button" role="radio" aria-checked={form.color === c} aria-label={c}
                className={`adm-swatch adm-tag-${c} ${form.color === c ? 'selected' : ''}`}
                onClick={() => setForm((f) => ({ ...f, color: c }))}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <label>
          Position in lists
          <input type="number" min={0} value={form.displayOrder} onChange={(e) => setForm((f) => ({ ...f, displayOrder: e.target.value }))} />
        </label>
        <FormActions onCancel={onClose} busy={busy} submitLabel={category ? 'Save changes' : 'Add category'} busyLabel="Saving…" />
      </form>
    </Modal>
  );
}
