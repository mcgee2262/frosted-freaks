import { Link } from 'react-router-dom'
import { AREAS, CONTACT, CREDITS, isPlaceholder } from '../config/site'
import { Snowman } from './Snowman'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy text-white">
      <div className="wrap py-20 md:py-28">
        {/* the mark, built large: three snowballs and the name */}
        <div aria-hidden="true" className="flex items-end gap-1">
          <span className="block aspect-square w-[22%] rounded-full bg-glacier" />
          <span className="block aspect-square w-[15%] rounded-full bg-white" />
          <span className="block aspect-square w-[10%] rounded-full bg-ice" />
          <span className="ml-auto block">
            <Snowman size={260} className="h-[22vw] max-h-[260px] w-auto" />
          </span>
        </div>
        <p className="mt-6 text-[clamp(2.75rem,10.5vw,10rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
          Frosted Freaks
        </p>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-lead">Pages</h2>
            <ul className="mt-4 flex flex-col gap-2">
              <li><Link className="hover:text-ice" to="/">Home</Link></li>
              <li><Link className="hover:text-ice" to="/services">Services</Link></li>
              <li><Link className="hover:text-ice" to="/service-areas">Service Areas</Link></li>
              <li><Link className="hover:text-ice" to="/quote">Request a Quote</Link></li>
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <h2 className="text-lead">Service areas</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {AREAS.map((a) => (
                <li key={a.id}>{a.name}, Virginia</li>
              ))}
            </ul>
          </div>
          <address className="not-italic lg:col-span-4 lg:col-start-9">
            <h2 className="text-lead">Contact</h2>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                {isPlaceholder(CONTACT.phone) ? CONTACT.phone : <a className="hover:text-ice" href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`}>{CONTACT.phone}</a>}
              </li>
              <li>
                {isPlaceholder(CONTACT.email) ? CONTACT.email : <a className="hover:text-ice" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>}
              </li>
              <li>{CONTACT.address}</li>
            </ul>
          </address>
        </div>

        <p className="mt-16 max-w-[70rem] text-small text-glacier">
          Pictures:{' '}
          {CREDITS.map((c, i) => (
            <span key={c.page}>
              <a className="underline hover:text-white" href={c.page}>“{c.title}”</a> by {c.by},{' '}
              <a className="underline hover:text-white" href={c.licenceUrl}>{c.licence}</a>, via Wikimedia Commons
              {i < CREDITS.length - 1 ? '; ' : '.'}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-small text-glacier">© {year} {CONTACT.businessName}</p>
          <Link to="/quote" className="btn btn-warm min-h-11 px-5 text-small">Request a Quote</Link>
        </div>
      </div>
    </footer>
  )
}
