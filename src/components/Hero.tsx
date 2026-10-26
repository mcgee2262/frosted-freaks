import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../lib/asset'
import { introSkipped, type IntroState } from '../lib/intro'
import { Intro } from './Intro'
import { Snowfall } from './Snowfall'
import { Snowman } from './Snowman'
import { Snowbanks } from './WinterScene'

/**
 * Full-bleed winter photo with the headline on top. The photo drifts and the
 * copy fades as you scroll past. On first visit the lick intro plays over it.
 */
export function Hero() {
  const [intro, setIntro] = useState<IntroState>(() => (introSkipped() ? 'done' : 'hello'))
  const photoRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight)
        if (photoRef.current) photoRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(${1.06 + y * 0.0001})`
        if (copyRef.current) {
          copyRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.6)))
          copyRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      aria-labelledby="hero-title"
      data-intro={intro}
      className="hero relative isolate overflow-hidden bg-navy text-white min-h-[calc(100svh-5rem)]"
    >
      <div ref={photoRef} aria-hidden="true" className="absolute inset-0 -top-[6%] will-change-transform">
        <img
          src={asset('/images/great-falls-winter.jpg')}
          alt=""
          width={1400}
          height={931}
          fetchPriority="high"
          className="h-[112%] w-full object-cover object-[50%_40%]"
        />
      </div>
      {/* scrim so the white type always reads */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_31_58/0.88)_0%,rgb(11_31_58/0.62)_45%,rgb(11_31_58/0.25)_100%)] max-md:bg-[linear-gradient(180deg,rgb(11_31_58/0.9)_0%,rgb(11_31_58/0.7)_55%,rgb(11_31_58/0.35)_100%)]" />
      <Snowfall />

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
        <Snowbanks className="h-[90px] md:h-[150px]" />
      </div>
      <div aria-hidden="true" className="hero-man absolute bottom-[34px] right-1/2 translate-x-1/2 md:bottom-[64px] md:right-[8vw] md:translate-x-0">
        <div className="bob">
          <Snowman size={480} className="h-[min(36svh,300px)] w-auto md:h-[min(62vh,520px)]" />
        </div>
      </div>

      <div ref={copyRef} className="wrap relative pt-[8svh] pb-[42svh] md:flex md:min-h-[inherit] md:items-center md:py-24">
        <div className="hero-copy max-w-[48rem]">
          <p className="hero-line text-lead font-medium text-ice" style={{ '--d': '0ms' } as CSSProperties}>
            Snow removal for Northern Virginia
          </p>
          <h1 id="hero-title" className="hero-line mt-4 text-display" style={{ '--d': '90ms' } as CSSProperties}>
            Clear paths.
            <br />
            Less winter stress.
          </h1>
          <p className="hero-line mt-8 max-w-[34rem] text-lead text-glacier-2" style={{ '--d': '180ms' } as CSSProperties}>
            Frosted Freaks Services helps keep driveways, walkways, steps and entryways clear in Reston, Herndon and Great Falls.
          </p>
          <div className="hero-line mt-10 flex flex-wrap gap-3" style={{ '--d': '270ms' } as CSSProperties}>
            <Link to="/quote" className="btn btn-warm">Request a Quote</Link>
            <Link to="/services" className="btn btn-ghost">View Services</Link>
          </div>
        </div>
      </div>

      <Intro state={intro} onChange={setIntro} />
    </section>
  )
}
