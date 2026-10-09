import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { FinanceIcon } from './FinanceIcon';
import { STATES, STATE_DISTRICTS } from '../../data/stateDistricts';

// Each rule: `sanitize` cleans keystrokes/pastes, `validate` returns an error message ('' when fine).
// `left` is true once the user has moved out of the field, so incomplete values aren't flagged mid-typing.

// Indian mobile: 10 digits starting with 6-9. Pasted "+91 ..." or "0..." prefixes are dropped.
const MOBILE_LENGTH = 10;
const mobileRule = {
  sanitize: (raw) => {
    let digits = raw.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
    if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
    return digits.slice(0, MOBILE_LENGTH);
  },
  validate: (value, left) => {
    if (value && !/^[6-9]/.test(value)) return 'Mobile number must start with 6, 7, 8 or 9';
    if (value && value.length < MOBILE_LENGTH && left) return `Enter a valid ${MOBILE_LENGTH}-digit mobile number`;
    return '';
  },
};

// Email: bad characters or a second "@" are flagged while typing; the full name@domain.tld shape once the user leaves
const EMAIL_ALLOWED_CHARS = /^[A-Za-z0-9._%+@-]*$/;
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const isEmailValid = (value) => EMAIL_PATTERN.test(value)
  && !value.includes('..') && !value.startsWith('.') && !value.includes('.@') && !value.includes('@-');
const emailRule = {
  sanitize: (raw) => raw.replace(/\s/g, '').slice(0, 254),
  validate: (value, left) => {
    if (!EMAIL_ALLOWED_CHARS.test(value)) return 'Email can only use letters, numbers and . _ % + - @';
    if ((value.match(/@/g) || []).length > 1) return 'Email can contain only one @';
    if (value && left && !isEmailValid(value)) return 'Enter a valid email, e.g. name@example.com';
    return '';
  },
};

// PAN format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
const PAN_LENGTH = 10;
const PAN_EXAMPLE = 'ABCDE1234F';
const isPanCharValid = (char, index) => (index < 5 || index === 9 ? /[A-Z]/ : /[0-9]/).test(char);
const panRule = {
  sanitize: (raw) => raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, PAN_LENGTH),
  validate: (value, left) => {
    if (![...value].every(isPanCharValid)) return `Use format ${PAN_EXAMPLE} (5 letters, 4 digits, 1 letter)`;
    if (value && value.length < PAN_LENGTH && left) return `PAN must be ${PAN_LENGTH} characters, e.g. ${PAN_EXAMPLE}`;
    return '';
  },
};

// CIBIL: 300-900, checked once all 3 digits are typed or the user leaves the field
const CIBIL_MIN = 300;
const CIBIL_MAX = 900;
const cibilRule = {
  sanitize: (raw) => raw.replace(/\D/g, '').slice(0, 3),
  validate: (value, left) => {
    const score = Number(value);
    const outOfRange = score < CIBIL_MIN || score > CIBIL_MAX;
    return value && (value.length === 3 || left) && outOfRange ? `Score must be between ${CIBIL_MIN} and ${CIBIL_MAX}` : '';
  },
};

// Loan amount: ₹1,00,000 – ₹10,00,000, shown with Indian digit grouping as the user types.
// Too large is flagged at once; too small only once the user leaves the field (e.g. "5" on the way to "5,00,000").
const LOAN_MIN = 100000;
const LOAN_MAX = 1000000;
const formatINR = (amount) => amount.toLocaleString('en-IN');
const loanRule = {
  sanitize: (raw) => {
    const digits = raw.replace(/\D/g, '').replace(/^0+/, '').slice(0, String(LOAN_MAX).length);
    return digits ? formatINR(Number(digits)) : '';
  },
  validate: (value, left) => {
    const amount = Number(value.replace(/,/g, ''));
    const outOfRange = amount > LOAN_MAX || (left && amount < LOAN_MIN);
    return value && outOfRange ? `Enter an amount between ₹${formatINR(LOAN_MIN)} and ₹${formatINR(LOAN_MAX)}` : '';
  },
};

const useValidatedInput = ({ sanitize, validate }, errorId) => {
  const [value, setValue] = useState('');
  const [left, setLeft] = useState(false);
  const error = validate(value, left);

  return {
    error,
    errorId,
    inputProps: {
      value,
      onChange: (e) => { setValue(sanitize(e.target.value)); setLeft(false); },
      onBlur: () => setLeft(true),
      'aria-invalid': Boolean(error),
      'aria-describedby': error ? errorId : undefined,
    },
  };
};

const FieldError = ({ field }) => field.error ? (
  <p id={field.errorId} className="finance-details__error" role="alert">{field.error}</p>
) : null;

const Field = ({ label, required, children }) => (
  <div className="finance-details__field">
    <label className="finance-details__label">
      {label} {required && <span className="finance-details__required">*</span>}
    </label>
    {children}
  </div>
);

const Control = ({ icon, select, invalid, children }) => (
  <div className={`finance-details__control${select ? ' finance-details__control--select' : ''}${invalid ? ' is-invalid' : ''}`}>
    <span className="finance-details__control-icon"><FinanceIcon name={icon} size={17} /></span>
    {children}
    {select && <span className="finance-details__chevron"><FinanceIcon name="ChevronDown" size={16} /></span>}
  </div>
);

export const FinanceDetailsForm = () => {
  const mobile = useValidatedInput(mobileRule, 'mobile-error');
  const email = useValidatedInput(emailRule, 'email-error');
  const pan = useValidatedInput(panRule, 'pan-error');
  const cibil = useValidatedInput(cibilRule, 'cibil-error');
  const loanAmount = useValidatedInput(loanRule, 'loan-amount-error');

  const [state, setState] = useState(STATES[0]);
  const [district, setDistrict] = useState('');

  const handleStateChange = (e) => {
    setState(e.target.value);
    setDistrict(''); // the previous district doesn't belong to the newly chosen state
  };

  return (
    <section className="finance-details">
      <div className="finance-details__inner">
        <SectionHeader
          number="2"
          title="Your Details (Check Finance Options)"
          icon="ClipboardList"
          rightElement={
            <div className="finance-details__hint">
              Fill in your details to find the best finance options for you
            </div>
          }
        />

        <div className="finance-details__card">
          <div className="finance-details__intro">
            <div className="finance-details__intro-main">
              <span className="finance-details__intro-icon">
                <FinanceIcon name="FileText" size={22} />
                <span className="finance-details__intro-badge"><FinanceIcon name="Check" size={8} /></span>
              </span>
              <div>
                <h3 className="finance-details__intro-title">Provide your details</h3>
                <p className="finance-details__intro-text">Help us understand your profile to suggest the most suitable finance schemes and loans.</p>
              </div>
            </div>
            <div className="finance-details__intro-aside">
              <span className="finance-details__intro-sprout"><FinanceIcon name="Sprout" size={18} /></span>
              <span className="finance-details__intro-divider" aria-hidden="true" />
              <span className="finance-details__intro-tags">
                Quick <i aria-hidden="true" /> Easy <i aria-hidden="true" /> Secure
              </span>
            </div>
          </div>

          <div className="finance-details__grid">
            {/* Row 1 */}
            <Field label="Applicant Type" required>
              <Control icon="User" select>
                <select>
                  <option>Farmer</option>
                  <option>FPO</option>
                  <option>SHG</option>
                  <option>PACS</option>
                  <option>Exporter</option>
                  <option>Business Members</option>
                  <option>MSME</option>
                  <option>Individual</option>
                </select>
              </Control>
            </Field>

            <Field label="State" required>
              <Control icon="MapPin" select>
                <select value={state} onChange={handleStateChange}>
                  {STATES.map((name) => <option key={name}>{name}</option>)}
                </select>
              </Control>
            </Field>

            <Field label="District" required>
              <Control icon="MapPin" select>
                <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                  <option value="" disabled>Select District</option>
                  {STATE_DISTRICTS[state].map((name) => <option key={name}>{name}</option>)}
                </select>
              </Control>
            </Field>

            {/* Row 2 */}
            <Field label="Name" required>
              <Control icon="User">
                <input type="text" placeholder="Enter your name" />
              </Control>
            </Field>

            <Field label="Mobile" required>
              <Control icon="Phone" invalid={Boolean(mobile.error)}>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder={`Enter ${MOBILE_LENGTH}-digit mobile number`}
                  {...mobile.inputProps}
                />
              </Control>
              <FieldError field={mobile} />
            </Field>

            <Field label="Email">
              <Control icon="Mail" invalid={Boolean(email.error)}>
                <input
                  type="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="Enter email address"
                  {...email.inputProps}
                />
              </Control>
              <FieldError field={email} />
            </Field>

            {/* Row 3 */}
            <Field label="Organisation / FPO (if any)">
              <Control icon="Building">
                <input type="text" placeholder="Enter organisation name" />
              </Control>
            </Field>

            <Field label="PAN (if available)">
              <Control icon="CreditCard" invalid={Boolean(pan.error)}>
                <input
                  type="text"
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder={`Enter PAN number (e.g. ${PAN_EXAMPLE})`}
                  {...pan.inputProps}
                />
              </Control>
              <FieldError field={pan} />
            </Field>

            <Field label="CIBIL / Credit Score">
              <Control icon="Activity" invalid={Boolean(cibil.error)}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={`Enter score ${CIBIL_MIN}–${CIBIL_MAX} (optional)`}
                  {...cibil.inputProps}
                />
              </Control>
              <FieldError field={cibil} />
            </Field>

            {/* Row 4 */}
            <Field label="Required Loan Amount" required>
              <Control icon="Rupee" invalid={Boolean(loanAmount.error)}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter amount (₹1 Lakh – ₹10 Lakh)"
                  {...loanAmount.inputProps}
                />
              </Control>
              <FieldError field={loanAmount} />
            </Field>

            <Field label="Existing Loan">
              <div className="finance-details__radios">
                <label className="finance-details__radio">
                  <input type="radio" name="existing-loan" value="yes" />
                  <span>Yes</span>
                </label>
                <label className="finance-details__radio">
                  <input type="radio" name="existing-loan" value="no" defaultChecked />
                  <span>No</span>
                </label>
              </div>
            </Field>

            <Field label="Purpose (Short Description)">
              <Control icon="FileText" select>
                <select defaultValue="">
                  <option value="" disabled>Select Purpose</option>
                  <option>Crop Production</option>
                  <option>Farm Input Finance</option>
                  <option>Cold Chain &amp; Logistics Finance</option>
                  <option>Export &amp; Trade Finance</option>
                  <option>Infrastructure Finance</option>
                  <option>Personal Loans</option>
                </select>
              </Control>
            </Field>
          </div>

          <div className="finance-details__actions">
            <button type="button" className="finance-details__submit">
              <FinanceIcon name="Search" size={18} />
              Check Finance Options <FinanceIcon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
