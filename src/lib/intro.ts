// Shared state for the home intro (kept out of Intro.tsx for fast refresh).

export type IntroState = 'hello' | 'play' | 'done'

export const SEEN_KEY = 'ff-intro-seen'

/** Whether the intro should be skipped outright (reduced motion, or already seen this visit). */
export function introSkipped() {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

