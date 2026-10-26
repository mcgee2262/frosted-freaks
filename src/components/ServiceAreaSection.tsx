import { Link } from 'react-router-dom'
import { AREAS } from '../config/site'
import { stagger } from '../lib/stagger'
import { AreaMap } from './AreaMap'

/** Service-area preview: the sketch map beside the three towns. */
export function ServiceAreaSection() {
  return (
    <section aria-labelledby="areas-title" className="bg-navy py-24 text-white md:py-32">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="areas-title" className="reveal text-head" style={stagger(0)}>
            Reston, Herndon and Great Falls
          </h2>
          <p className="reveal mt-6 text-lead text-glacier-2" style={stagger(1)}>
            Proudly serving Reston, Herndon and Great Falls, Virginia.
          </p>
          <ul className="reveal mt-10 flex flex-col gap-5" style={stagger(2)}>
            {AREAS.map((a) => (
              <li key={a.id} className="flex items-center gap-4">
                <img
                  src={a.image.src}
                  alt=""
                  width={a.image.width}
                  height={a.image.height}
                  loading="lazy"
                  className="h-24 w-24 flex-none rounded-full object-cover md:h-36 md:w-36"
                />
                <span className="text-head">{a.name}</span>
              </li>
            ))}
          </ul>
          <p className="reveal mt-10 max-w-[32rem]" style={stagger(3)}>
            Not sure whether you’re in our service area? Send a request and we’ll confirm.
          </p>
          <Link to="/service-areas" className="reveal btn btn-ghost mt-6" style={stagger(4)}>
            About our service areas
          </Link>
        </div>
        <div className="reveal lg:col-span-7" style={stagger(2)}>
          <AreaMap className="block h-auto w-full rounded-[2.5rem]" />
        </div>
      </div>
    </section>
  )
}
