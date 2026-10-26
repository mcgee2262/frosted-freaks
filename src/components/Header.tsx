import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Snowman } from './Snowman'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/service-areas', label: 'Service Areas' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 font-medium transition-colors hover:bg-white/10 ${isActive ? 'text-ice' : 'text-white'}`

  return (
    <header className="relative z-30 bg-navy text-white">
      <a href="#main" className="skip-link btn btn-warm">Skip to content</a>
      <div className="wrap flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 rounded-full pr-2" aria-label="Frosted Freaks Services, home">
          <Snowman size={60} full={false} texture={false} />
          <span className="text-xl font-semibold leading-none tracking-tight sm:text-2xl">
            Frosted Freaks
            <span className="block text-small font-normal tracking-normal text-glacier">Services</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/quote" className="btn btn-warm ml-3">Request a Quote</Link>
        </nav>

        <button
          ref={btnRef}
          type="button"
          className="btn btn-ghost min-h-11 px-5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full rounded-b-[2rem] bg-navy-2 pb-8 md:hidden"
      >
        <ul className="wrap flex flex-col gap-1 pt-2">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end className={({ isActive }) => `block rounded-2xl px-4 py-3 text-lead font-medium ${isActive ? 'text-ice' : 'text-white'}`}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-3">
            <Link to="/quote" className="btn btn-warm w-full">Request a Quote</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
