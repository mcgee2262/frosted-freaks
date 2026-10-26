import { useCallback, useEffect } from 'react'
import { SEEN_KEY, type IntroState } from '../lib/intro'
import { Snowman, Tongue } from './Snowman'

/** Length of the lick timeline in ms; keep in step with the keyframes in index.css. */
const PLAY_MS = 3600
const AUTO_START_MS = 1400

type Props = { state: IntroState; onChange: (s: IntroState) => void }

/**
 * Opening sequence over the home hero: the snowman grins, leans in and licks
 * the screen, the glass frosts over, and a second lick wipes it clear to
 * reveal the hero underneath. Decorative; the hero content is always in the DOM.
 */
export function Intro({ state, onChange }: Props) {
  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage blocked: the intro just plays again next time */
    }
    onChange('done')
  }, [onChange])

  // Start on the visitor's first nudge, or on its own after a beat.
  useEffect(() => {
    if (state !== 'hello') return
    const start = () => onChange('play')
    const t = window.setTimeout(start, AUTO_START_MS)
    const opts = { once: true, passive: true } as const
    window.addEventListener('wheel', start, opts)
    window.addEventListener('touchstart', start, opts)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('wheel', start)
      window.removeEventListener('touchstart', start)
    }
  }, [state, onChange])

  useEffect(() => {
    if (state !== 'play') return
    const t = window.setTimeout(finish, PLAY_MS)
    return () => window.clearTimeout(t)
  }, [state, finish])

  useEffect(() => {
    if (state === 'done') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [state, finish])

  if (state === 'done') return null

  return (
    <div className="intro absolute inset-0 z-20 overflow-hidden" data-state={state}>
      <div aria-hidden="true" className="intro-stage absolute inset-0 bg-navy">
        <p className="intro-hello absolute inset-x-0 top-[10svh] text-center text-lead font-medium text-ice">
          Hey there, neighbor.
        </p>
        <div className="intro-man absolute left-1/2 top-[18svh]">
          <div className="bob">
            <Snowman size={560} className="h-[64svh] w-auto" />
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="intro-tongue intro-tongue-1 absolute left-1/2 top-[30svh]">
        <Tongue mouth className="h-auto w-full" />
      </div>

      {/* frosty, slobbery glass */}
      <div aria-hidden="true" className="intro-frost absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <filter id="intro-frost-noise" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="4" seed="11" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.86  0 0 0 0 0.95  0 0 0 0 1  0 0 0 1.4 -0.1" />
            </filter>
            <filter id="intro-frost-crystals" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="turbulence" baseFrequency="0.09" numOctaves="2" seed="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 3 -1.5" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="#d8ecf6" opacity="0.92" />
          <rect width="100%" height="100%" filter="url(#intro-frost-noise)" />
          <rect width="100%" height="100%" filter="url(#intro-frost-crystals)" opacity="0.5" />
        </svg>
        {/* the wet smear the first lick left behind */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M30 110 C28 70 34 30 46 -10 L66 -10 C60 30 62 70 70 110 Z" fill="#f6b6cb" opacity="0.28" />
          <path d="M36 110 C35 70 40 30 50 -10" stroke="#ffffff" strokeWidth="1.4" opacity="0.7" fill="none" />
          <path d="M62 110 C58 70 58 30 61 -10" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" fill="none" />
        </svg>
        <div className="intro-drips absolute inset-x-0 top-0 h-full">
          {[34, 41, 55, 63].map((x, i) => (
            <span
              key={x}
              className="intro-drip absolute top-[30%] block w-[0.9vw] min-w-[6px] rounded-full bg-white/70"
              style={{ left: `${x}%`, height: `${10 + i * 4}vh`, animationDelay: `${1.5 + i * 0.12}s` }}
            />
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="intro-tongue intro-tongue-2 absolute top-[10svh]">
        <Tongue className="h-auto w-full" />
      </div>

      <button
        type="button"
        onClick={finish}
        className="btn btn-ghost absolute bottom-6 right-4 z-10 min-h-11 bg-navy/60 px-5 text-white md:right-8"
      >
        Skip intro
      </button>
    </div>
  )
}
