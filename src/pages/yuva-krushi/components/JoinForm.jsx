import { useId, useState } from 'react'
import teamPhoto from '../assets/join-team.webp'
import { ArrowRightIcon } from './icons.jsx'
import './JoinForm.css'

const profiles = [
  'Student',
  'Young professional',
  'Aspiring entrepreneur',
  'Farmer / farm family',
  'Agriculture enthusiast',
  'Other',
]

// Dialling codes for the phone field; India is the default.
const countryCodes = [
  { country: 'IN', code: '+91' },
  { country: 'US', code: '+1' },
  { country: 'GB', code: '+44' },
  { country: 'AU', code: '+61' },
  { country: 'SG', code: '+65' },
  { country: 'AE', code: '+971' },
  { country: 'SA', code: '+966' },
  { country: 'NP', code: '+977' },
  { country: 'BD', code: '+880' },
  { country: 'LK', code: '+94' },
]

const interestAreas = [
  'Agri-tech & digital farming',
  'Farm services & inputs',
  'Food processing & value addition',
  'Supply chain, logistics & marketing',
  'Organic / sustainable agriculture',
  'Other / still exploring',
]

const NAME_START_ERROR = 'No symbols or numbers allowed at the start of the name.'
const NAME_CHARACTER_ERROR = 'Numbers and symbols are not allowed in the name.'

// Names may only contain letters (any script) and spaces, starting with a
// letter. Anything else is dropped as the user types or pastes, and the
// returned message (or '') explains why.
function cleanNameInput(input) {
  const value = input.value
  const cleaned = value.replace(/[^\p{L}\p{M}\s]/gu, '').replace(/^[^\p{L}]+/u, '')
  if (cleaned === value) return ''

  const caret = Math.max(0, input.selectionStart - (value.length - cleaned.length))
  input.value = cleaned
  input.setSelectionRange(caret, caret)

  const firstCharacter = value.trimStart().charAt(0)
  if (firstCharacter && !/\p{L}/u.test(firstCharacter)) return NAME_START_ERROR
  return /[^\p{L}\p{M}\s]/u.test(value) ? NAME_CHARACTER_ERROR : ''
}

// Character limit for "Your idea or message".
const IDEA_MAX_LENGTH = 500

const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp', 'xls', 'xlsx', 'csv', 'txt']
const ACCEPT_FILE_TYPES = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.xls,.xlsx,.csv,.txt'
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

function validateFiles(fileList) {
  if (!fileList || fileList.length === 0) return ''
  const errors = []
  for (const file of Array.from(fileList)) {
    const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : ''
    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      errors.push(`"${file.name}" has an unsupported format. Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG, WEBP, XLS, XLSX, CSV, TXT.`)
    } else if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.push(`"${file.name}" exceeds the 5 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB).`)
    }
  }
  return errors.join(' ')
}

export default function JoinForm() {
  const [submitted, setSubmitted] = useState(false)
  const [nameError, setNameError] = useState('')
  const [fileError, setFileError] = useState('')
  const [ideaLength, setIdeaLength] = useState(0)
  const id = useId()

  const handleFileChange = (event) => {
    setSubmitted(false)
    const error = validateFiles(event.currentTarget.files)
    setFileError(error)
  }

  // There is no backend yet: the browser validates the fields, then the form
  // confirms and clears itself.
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const fileInput = form.elements.namedItem('supportingFiles')
    const error = fileInput && fileInput.files ? validateFiles(fileInput.files) : ''

    if (error || fileError || nameError) {
      if (error) setFileError(error)
      return
    }

    setSubmitted(true)
    setNameError('')
    setIdeaLength(0)
    setFileError('')
    form.reset()
  }

  return (
    <section id="join" className="join" aria-labelledby={`${id}-title`}>
      <div className="join__card">
        {/* Bottom-right curve of the photo, in the photo's own 0–1 box. */}
        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <clipPath id="yk-join-photo-clip" clipPathUnits="objectBoundingBox">
            <path d="M0 0H1V0.47L0.9414 0.5118C0.9414 0.7746 0.7471 1 0.6506 1H0Z" />
          </clipPath>
        </svg>
        <img className="join__photo" src={teamPhoto} alt="Two young agripreneurs reviewing a tablet in a smart farm" />

        <div className="join__panel">
          <h2 id={`${id}-title`} className="join__title">
            Join Yuva Krushi
          </h2>
          <p className="join__subtitle">Fill in your details to register your interest.</p>

          <form onSubmit={handleSubmit} onInput={() => setSubmitted(false)}>
            <div className="join__grid">
              <Field id={`${id}-name`} label="Full name" required>
                <input
                  id={`${id}-name`}
                  className="join__input"
                  name="fullName"
                  autoComplete="name"
                  pattern="\p{L}[\p{L}\p{M}\s]*"
                  title={NAME_START_ERROR}
                  placeholder="Enter your full name"
                  aria-invalid={nameError ? true : undefined}
                  aria-describedby={nameError ? `${id}-name-error` : undefined}
                  onInput={(event) => setNameError(cleanNameInput(event.currentTarget))}
                  required
                />
                {nameError && (
                  <p id={`${id}-name-error`} className="join__error" role="alert">
                    {nameError}
                  </p>
                )}
              </Field>

              <Field id={`${id}-phone`} label="Phone number" required>
                <div className="join__phone">
                  <select
                    className="join__input join__code"
                    name="countryCode"
                    defaultValue="+91"
                    autoComplete="tel-country-code"
                    aria-label="Country code"
                  >
                    {countryCodes.map(({ country, code }) => (
                      <option key={code} value={code}>
                        {`${country} ${code}`}
                      </option>
                    ))}
                  </select>
                  <input
                    id={`${id}-phone`}
                    className="join__input"
                    name="phone"
                    type="tel"
                    autoComplete="tel-national"
                    pattern="[0-9\s\-]{6,15}"
                    title="Enter 6 to 15 digits; spaces and dashes are allowed."
                    placeholder="98765 43210"
                    required
                  />
                </div>
              </Field>

              <Field id={`${id}-email`} label="Email address" required>
                <input
                  id={`${id}-email`}
                  className="join__input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="yourname@gmail.com"
                  required
                />
              </Field>

              <Field id={`${id}-profile`} label="Profession">
                <select id={`${id}-profile`} className="join__input" name="profile" defaultValue="">
                  <option value="">Select your profession</option>
                  {profiles.map((profile) => (
                    <option key={profile}>{profile}</option>
                  ))}
                </select>
              </Field>

              <Field id={`${id}-interest`} label="Area of interest" full>
                <select id={`${id}-interest`} className="join__input" name="interest" defaultValue="">
                  <option value="">Choose an area (optional)</option>
                  {interestAreas.map((area) => (
                    <option key={area}>{area}</option>
                  ))}
                </select>
              </Field>

              <Field id={`${id}-idea`} label="Your idea or message" required full>
                <textarea
                  id={`${id}-idea`}
                  className="join__input"
                  name="idea"
                  placeholder="Tell us about your idea, interest or the problem you want to solve…"
                  maxLength={IDEA_MAX_LENGTH}
                  aria-describedby={`${id}-idea-count`}
                  onInput={(event) => setIdeaLength(event.currentTarget.value.length)}
                  required
                />
                <p id={`${id}-idea-count`} className="join__count">
                  <span>Up to {IDEA_MAX_LENGTH} characters.</span>
                  <span className={ideaLength >= IDEA_MAX_LENGTH ? 'join__count-limit' : undefined}>
                    {ideaLength} / {IDEA_MAX_LENGTH} characters
                  </span>
                </p>
              </Field>

              <Field id={`${id}-files`} label="Supporting files (optional)" full>
                <input
                  id={`${id}-files`}
                  className="join__input join__file-input"
                  name="supportingFiles"
                  type="file"
                  multiple
                  accept={ACCEPT_FILE_TYPES}
                  aria-invalid={fileError ? true : undefined}
                  aria-describedby={fileError ? `${id}-files-error` : `${id}-files-hint`}
                  onChange={handleFileChange}
                />
                <p id={`${id}-files-hint`} className="join__file-hint">
                  Accepts PDF, DOC, DOCX, JPG, JPEG, PNG, WEBP, XLS, XLSX, CSV, TXT (up to 5 MB per file).
                </p>
                {fileError && (
                  <p id={`${id}-files-error`} className="join__error" role="alert">
                    {fileError}
                  </p>
                )}
              </Field>
            </div>

            <button type="submit" className="join__submit">
              Submit
              <ArrowRightIcon className="join__submit-arrow" />
            </button>
            {submitted && (
              <p className="join__success" role="status">
                Thanks for your interest! This frontend demo validated your form. Connect a backend to save your
                submission.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, required, full, children }) {
  return (
    <div className={`join__field${full ? ' join__field--full' : ''}`}>
      <label className="join__label" htmlFor={id}>
        {label}
        {required && (
          <span className="join__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  )
}
