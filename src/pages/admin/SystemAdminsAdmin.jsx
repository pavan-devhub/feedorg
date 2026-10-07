import React, { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Trash2, UserPlus } from 'lucide-react';
import { createSystemAdmin, deleteSystemAdmin, fetchSystemAdmins } from '../../api/systemAdminsApi';
import { Banner, ConfirmDialog, Empty, FormActions, FormError, Loading, Modal, SectionHeader } from './adminUi';
import { formatDateTime, useBanner } from './adminUtils';

// The same rules the backend applies (SystemAdminRequestDto), checked first so most mistakes show
// up without a round trip. Whether something is already taken only the backend can say.
function validate(form) {
  const errors = {};
  if (!form.username.trim()) errors.username = 'Username is required';
  else if (!/^[A-Za-z][A-Za-z0-9._-]{2,29}$/.test(form.username.trim())) {
    errors.username = '3-30 characters - letters, numbers, dots, hyphens or underscores - starting with a letter';
  }
  if (!form.mobileNumber.trim()) errors.mobileNumber = 'Mobile number is required';
  else if (!/^\d{10}$/.test(form.mobileNumber.trim())) errors.mobileNumber = 'Mobile number must be exactly 10 digits';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address';
  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 8 || form.password.length > 72) errors.password = 'Password must be 8-72 characters';
  else if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
    errors.password = 'Password must contain at least one letter and one number';
  }
  return errors;
}

/**
 * Who can use the admin panel. Every admin can add another - username, mobile number, email and
 * password - and any of the first three logs them in on the normal login page. Only the default
 * admin (the one the site was set up with) can remove an admin, and it can't be removed itself;
 * the backend enforces both, this just hides the buttons nobody else could use.
 */
export default function SystemAdminsAdmin({ user }) {
  const [admins, setAdmins] = useState(null);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [banner, showBanner] = useBanner();

  const load = useCallback(() => {
    fetchSystemAdmins()
      .then((list) => { setAdmins(list); setError(''); })
      .catch((e) => setError(e.message));
  }, []);
  useEffect(load, [load]);

  const canRemove = !!admins?.some((a) => a.defaultAdmin && a.id === user?.adminId);

  return (
    <>
      <SectionHeader
        eyebrow="ACCESS"
        icon={ShieldCheck}
        title="System Admins"
        description="Everyone who can use this admin panel. An admin logs in on the normal login page with their username, email or mobile number."
      >
        <button type="button" className="admin-pub-btn primary" onClick={() => setAdding(true)}>
          <UserPlus size={16} /> Add admin
        </button>
      </SectionHeader>

      <Banner banner={banner} />
      {error && <div className="admin-pub-banner error">{error}</div>}

      <div className="admin-pub-table-wrap">
        {!admins && !error ? <Loading label="Loading admins…" /> : !admins || admins.length === 0 ? (
          <Empty>No admins to show.</Empty>
        ) : (
          <table className="admin-pub-table adm-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile number</th>
                <th>Added by</th>
                <th>Added on</th>
                {canRemove && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id}>
                  <td data-label="Username">
                    <div className="adm-cell-tags">
                      <strong>{a.username}</strong>
                      {a.defaultAdmin && <span className="adm-tag adm-tag-blue">Default</span>}
                      {a.id === user?.adminId && <span className="adm-tag adm-tag-green">You</span>}
                    </div>
                  </td>
                  <td data-label="Email">{a.email}</td>
                  <td data-label="Mobile number">{a.mobileNumber}</td>
                  <td data-label="Added by" className={a.createdBy ? undefined : 'adm-muted'}>{a.createdBy || 'Set up with the site'}</td>
                  <td data-label="Added on" className="adm-muted">{formatDateTime(a.createdAt)}</td>
                  {canRemove && (
                    <td className="admin-pub-actions" data-label="Actions">
                      {!a.defaultAdmin && (
                        <button type="button" className="admin-pub-icon-btn danger" title="Remove admin" onClick={() => setRemoving(a)}>
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {adding && (
        <AddAdminModal
          onClose={() => setAdding(false)}
          onAdded={(admin) => {
            setAdding(false);
            showBanner('success', `Added “${admin.username}” as a system admin - they can now log in with their username, email or mobile number.`);
            load();
          }}
        />
      )}

      {removing && (
        <ConfirmDialog
          title="Remove admin?"
          confirmLabel="Remove"
          busyLabel="Removing…"
          onCancel={() => setRemoving(null)}
          onConfirm={async () => {
            await deleteSystemAdmin(removing.id);
            showBanner('success', `Removed “${removing.username}” - they can no longer use the admin panel.`);
            setRemoving(null);
            load();
          }}
        >
          <p>Remove <strong>{removing.username}</strong> ({removing.email}) as a system admin?</p>
          <p className="admin-pub-hint">They are logged out on every device right away. Admins they added stay, credited to whoever added them.</p>
        </ConfirmDialog>
      )}
    </>
  );
}

function AddAdminModal({ onClose, onAdded }) {
  const [form, setForm] = useState({ username: '', mobileNumber: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  const change = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError('Please fix the highlighted fields.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const admin = await createSystemAdmin({
        username: form.username.trim(),
        mobileNumber: form.mobileNumber.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      onAdded(admin);
    } catch (err) {
      // e.g. "That username is already taken - please choose another." - never who has it.
      setError(err.message);
      setFieldErrors(err.fields || {});
      setBusy(false);
    }
  };

  const fieldClass = (field) => (fieldErrors[field] ? 'adm-input-invalid' : undefined);
  const fieldError = (field) => fieldErrors[field] && <span className="adm-field-error">{fieldErrors[field]}</span>;

  return (
    <Modal title="Add system admin" icon={UserPlus} onClose={onClose} busy={busy}>
      <form className="admin-pub-form" onSubmit={submit} noValidate>
        <FormError message={error} />
        <label>
          Username
          <input type="text" value={form.username} maxLength={30} autoComplete="off" placeholder="e.g. ravi.kumar"
            className={fieldClass('username')} onChange={change('username')} />
          {fieldError('username')}
        </label>
        <div className="admin-pub-form-row">
          <label>
            Mobile number
            <input type="tel" inputMode="numeric" value={form.mobileNumber} maxLength={10} autoComplete="off" placeholder="10-digit mobile number"
              className={fieldClass('mobileNumber')} onChange={change('mobileNumber')} />
            {fieldError('mobileNumber')}
          </label>
          <label>
            Email
            <input type="email" value={form.email} maxLength={255} autoComplete="off" placeholder="name@example.com"
              className={fieldClass('email')} onChange={change('email')} />
            {fieldError('email')}
          </label>
        </div>
        <label>
          Password
          <span className="adm-password">
            <input type={showPassword ? 'text' : 'password'} value={form.password} maxLength={72} autoComplete="new-password"
              placeholder="At least 8 characters, with a letter and a number"
              className={fieldClass('password')} onChange={change('password')} />
            <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </span>
          {fieldError('password')}
        </label>
        <p className="admin-pub-hint">Username, mobile number and email must each be unused - share the password with the new admin yourself.</p>
        <FormActions onCancel={onClose} busy={busy} submitLabel={<><UserPlus size={14} /> Add admin</>} busyLabel="Adding…" />
      </form>
    </Modal>
  );
}
