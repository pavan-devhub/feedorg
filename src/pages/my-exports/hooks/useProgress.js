import { useCallback, useEffect, useMemo, useState } from 'react'
import { lessons, TOTAL_LESSONS } from '../data/curriculum'

// Shared with the topic pages (public/assets/js/data/curriculum.js), whose "Mark as complete"
// toggle writes the same list.
const KEY = 'export-program:progress'
// Where progress was kept before the topic pages shared it; read only until KEY is first written.
const LEGACY_KEY = 'export-program:progress:v1'
const VALID_IDS = new Set(lessons.map((l) => l.id))

function load() {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY)
    const ids = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(ids) ? ids.filter((id) => VALID_IDS.has(id)) : [])
  } catch {
    return new Set()
  }
}

/** Tracks completed topics, persisted per device in localStorage. */
export function useProgress() {
  const [done, setDone] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify([...done]))
    } catch {
      /* storage unavailable (private mode etc.) — progress lives in memory only */
    }
  }, [done])

  const toggle = useCallback((id) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const markDone = useCallback((id) => {
    setDone((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => setDone(new Set()), [])

  const countIn = useCallback(
    (ids) => ids.reduce((n, id) => n + (done.has(id) ? 1 : 0), 0),
    [done],
  )

  return useMemo(
    () => ({ done, toggle, markDone, reset, countIn, completed: done.size, total: TOTAL_LESSONS }),
    [done, toggle, markDone, reset, countIn],
  )
}
