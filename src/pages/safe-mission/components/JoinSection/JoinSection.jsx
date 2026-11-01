import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CircleCheckBig, MapPin, MessageSquareText, Phone, User, Users } from 'lucide-react';
import './JoinSection.css';
import COUNTRY_CODES from './countryCodes';
import AP_DISTRICTS from './apDistricts';

import joinImg from '../../assets/join/join-safe-mission.jpg';

const PARTICIPANT_TYPES = [
  'Farmer',
  'FPO / Cooperative',
  'SHG',
  'MSME / Entrepreneur',
  'Trader / Exporter',
  'Service Partner',
  'Other',
];

const MESSAGE_MIN = 50;
const MESSAGE_MAX = 500;

const EMPTY_FORM = { name: '', country: 'IN', mobile: '', type: '', district: '', message: '' };

// National number digits only: spaces / dashes dropped, and a leading trunk 0 (e.g. 098...) removed
const mobileDigits = (value) => value.replace(/\D/g, '').replace(/^0/, '');

function validateMobile(form) {
  const digits = mobileDigits(form.mobile);
  if (!digits) return 'Please enter your mobile number.';
  if (form.country === 'IN') {
    return /^[6-9]\d{9}$/.test(digits) ? null : 'Enter a valid 10-digit mobile number.';
  }
  // Other countries: 6–14 digits, and at most 15 digits with the country code (E.164)
  const { dial } = COUNTRY_CODES.find((c) => c.iso === form.country);
  const ok = digits.length >= 6 && digits.length + dial.length - 1 <= 15;
  return ok ? null : 'Enter a valid mobile number for the selected country.';
}

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = 'Please enter your full name.';
  const mobileError = validateMobile(form);
  if (mobileError) errors.mobile = mobileError;
  if (!form.type) errors.type = 'Please select a participant type.';
  if (!form.district) errors.district = 'Please select your district.';
  const messageLength = form.message.trim().length;
  if (!messageLength) errors.message = 'Please enter your message.';
  else if (messageLength < MESSAGE_MIN)
    errors.message = `Message must be at least ${MESSAGE_MIN} characters (${MESSAGE_MIN - messageLength} more).`;
  else if (messageLength > MESSAGE_MAX) errors.message = `Message can be at most ${MESSAGE_MAX} characters.`;
  return errors;
}

function Field({ id, label, icon: Icon, error, hint, counter, wide, children }) {
  return (
    <div className={`join-field${wide ? ' join-field-wide' : ''}${error ? ' has-error' : ''}`}>
      <label className="join-label" htmlFor={id}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <div className="join-control">
        <Icon className="join-control-icon" aria-hidden="true" strokeWidth={1.8} />
        {children}
      </div>
      {(error || hint || counter) && (
        <div className="join-help">
          {error ? (
            <p className="join-error" id={`${id}-error`}>
              {error}
            </p>
          ) : (
            hint && (
              <p className="join-hint" id={`${id}-hint`}>
                {hint}
              </p>
            )
          )}
          {counter}
        </div>
      )}
    </div>
  );
}

export default function JoinSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sentName, setSentName] = useState('');

  const update = (key) => (e) => {
    let next = { ...form, [key]: e.target.value };
    if (key === 'mobile') {
      // A pasted "+91 98765..." picks that country and keeps only the number
      let raw = e.target.value.trimStart();
      if (raw.startsWith('+')) {
        const current = COUNTRY_CODES.find((c) => c.iso === form.country);
        const hit = raw.startsWith(current.dial)
          ? current
          : [...COUNTRY_CODES].sort((a, b) => b.dial.length - a.dial.length).find((c) => raw.startsWith(c.dial));
        if (hit) {
          next.country = hit.iso;
          raw = raw.slice(hit.dial.length);
        }
      }
      // the number box takes digits, spaces and dashes only
      next.mobile = raw.replace(/[^\d\s-]/g, '').trimStart();
    }
    if (key === 'message') next.message = next.message.slice(0, MESSAGE_MAX);
    setForm(next);
    if (submitted) setErrors(validate(next)); // live feedback once the user has tried to submit
    if (sentName) setSentName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    setSubmitted(true);
    if (Object.keys(found).length) {
      document.getElementById(`join-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    // No backend yet: send `form` to the API / email service here
    setSentName(form.name.trim().split(/\s+/)[0]);
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  };

  const describedBy = (key) => (errors[key] ? `join-${key}-error` : undefined);
  const country = COUNTRY_CODES.find((c) => c.iso === form.country);
  const messageOk = form.message.trim().length >= MESSAGE_MIN;

  return (
    <section className="join-section" id="sm-join">
      {/* Soft background shapes */}
      <span className="join-blob join-blob-top" aria-hidden="true" />
      <span className="join-blob join-blob-left" aria-hidden="true" />
      <span className="join-blob join-blob-bottom" aria-hidden="true" />

      <div className="join-container">
        {/* Left: photo */}
        <div className="join-media">
          <img
            src={joinImg}
            alt="S.A.F.E. Mission agricultural export zone with packhouses, solar power and drone monitoring"
            className="join-media-img"
            loading="lazy"
          />
        </div>

        {/* Right: form card */}
        <div className="join-card">
          <span className="join-card-blob" aria-hidden="true" />

          <h2 className="join-title">Join Safe Mission</h2>
          <p className="join-subtitle">Share your details and area of interest to express interest in the mission.</p>

          <form className="join-form" onSubmit={handleSubmit} noValidate>
            <div className="join-grid">
              <Field id="join-name" label="Full Name" icon={User} error={errors.name}>
                <input
                  id="join-name"
                  type="text"
                  className="join-input"
                  placeholder="Enter your name"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy('name')}
                />
              </Field>

              <Field id="join-mobile" label="Mobile Number" icon={Phone} error={errors.mobile}>
                {/* One box: country code picker | number */}
                <div className="join-input join-phone">
                  <div className="join-code">
                    <span className="join-code-value" aria-hidden="true">
                      {country.dial}
                    </span>
                    <ChevronDown className="join-code-chevron" aria-hidden="true" strokeWidth={2.4} />
                    <select
                      className="join-code-select"
                      aria-label="Country code"
                      value={form.country}
                      onChange={update('country')}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.iso} value={c.iso}>
                          {c.name} ({c.dial})
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    id="join-mobile"
                    type="tel"
                    inputMode="numeric"
                    className="join-phone-input"
                    placeholder="Enter mobile number"
                    autoComplete="tel-national"
                    maxLength={17}
                    value={form.mobile}
                    onChange={update('mobile')}
                    required
                    aria-invalid={Boolean(errors.mobile)}
                    aria-describedby={describedBy('mobile')}
                  />
                </div>
              </Field>

              <Field id="join-type" label="Participant Type" icon={Users} error={errors.type}>
                <select
                  id="join-type"
                  className="join-input join-select"
                  value={form.type}
                  onChange={update('type')}
                  required
                  aria-invalid={Boolean(errors.type)}
                  aria-describedby={describedBy('type')}
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  {PARTICIPANT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="join-select-chevron" aria-hidden="true" strokeWidth={2.4} />
              </Field>

              <Field id="join-district" label="District" icon={MapPin} error={errors.district}>
                <select
                  id="join-district"
                  className="join-input join-select"
                  value={form.district}
                  onChange={update('district')}
                  required
                  aria-invalid={Boolean(errors.district)}
                  aria-describedby={describedBy('district')}
                >
                  <option value="" disabled>
                    Select district
                  </option>
                  {AP_DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <ChevronDown className="join-select-chevron" aria-hidden="true" strokeWidth={2.4} />
              </Field>

              <Field
                id="join-message"
                label="Message"
                icon={MessageSquareText}
                error={errors.message}
                hint={`Minimum ${MESSAGE_MIN} characters`}
                counter={
                  <span className={`join-counter${messageOk ? ' sm-is-ok' : ''}`}>
                    {form.message.length}/{MESSAGE_MAX}
                  </span>
                }
                wide
              >
                <textarea
                  id="join-message"
                  className="join-input join-textarea"
                  placeholder="Enter your message"
                  rows={3}
                  minLength={MESSAGE_MIN}
                  maxLength={MESSAGE_MAX}
                  value={form.message}
                  onChange={update('message')}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'join-message-error' : 'join-message-hint'}
                />
              </Field>
            </div>

            <button type="submit" className="join-submit">
              Submit <ArrowRight className="join-submit-icon" aria-hidden="true" strokeWidth={2.4} />
            </button>

            <p className="join-success" role="status" aria-live="polite">
              {sentName && (
                <>
                  <CircleCheckBig className="join-success-icon" aria-hidden="true" />
                  Thank you, {sentName}! Our team will get in touch with you soon.
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
