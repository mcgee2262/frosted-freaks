import { useEffect, useRef } from 'react'

/** Light, decorative snowfall on a canvas. Off under reduced motion. */
export function Snowfall({ density = 70 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const count = window.innerWidth < 640 ? Math.round(density * 0.45) : density

    const flakes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 2.2,
      s: 0.15 + Math.random() * 0.45,
      d: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      for (const f of flakes) {
        f.y += (f.s * f.r) / h * 1.4
        f.d += 0.01
        f.x += Math.sin(f.d) * 0.0004
        if (f.y > 1.02) {
          f.y = -0.02
          f.x = Math.random()
        }
        ctx.beginPath()
        ctx.arc(f.x * w, f.y * h, f.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(tick)
    })
    const onVis = () => {
      running = !document.hidden
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    io.observe(canvas)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [density])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
