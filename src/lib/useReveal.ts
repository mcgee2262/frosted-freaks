import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Arms .reveal elements on each route and shows them as they scroll in. */
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    root.classList.add('reveal-armed')
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}
