import { useEffect, useState } from 'react';
import { fetchMyEpmDetails } from '../api/epmApi';

const DETAIL_FIELDS = ['fullName', 'mobileNumber', 'email', 'state', 'district', 'participantType'];

/** `formData` with each of its still-empty detail fields taken from `details` - what's typed stays. */
export function fillFromMyDetails(formData, details) {
  const filled = { ...formData };
  DETAIL_FIELDS.forEach((field) => {
    if (!filled[field] && details[field]) filled[field] = details[field];
  });
  return filled;
}

/**
 * For a logged-in user, their own details from their account ({ fullName, mobileNumber, email,
 * state, district, participantType }), so the EPM register and volunteer forms open already filled
 * in. Null when logged out, or until (or if) it can't be loaded - the form is then filled by hand.
 */
export default function useMyEpmDetails(isLoggedIn) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setDetails(null);
      return undefined;
    }
    let cancelled = false;
    fetchMyEpmDetails()
      .then((data) => { if (!cancelled) setDetails(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [isLoggedIn]);

  return details;
}
