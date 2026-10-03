import { useEffect, useState } from 'react';
import { fetchEpmParticipantTypes } from '../api/epmApi';

// Shown until the backend's list arrives, and if it can't be loaded - the same six it serves.
const FALLBACK = ['Institutional', 'Individual', 'Business Collaborator', 'Student', 'Executive', 'Guest'];

let cached = null;

/**
 * The "Participant Type" choices for the EPM register and volunteer forms, as names, from the
 * user_types table (see GET /api/epm/participant-types). Loaded once per visit.
 */
export default function useEpmParticipantTypes() {
  const [types, setTypes] = useState(cached || FALLBACK);

  useEffect(() => {
    if (cached) return undefined;
    let cancelled = false;
    fetchEpmParticipantTypes()
      .then((data) => {
        const names = (data || []).map((t) => t.name).filter(Boolean);
        if (names.length === 0) return;
        cached = names;
        if (!cancelled) setTypes(names);
      })
      .catch(() => {}); // keep the built-in list
    return () => { cancelled = true; };
  }, []);

  return types;
}
