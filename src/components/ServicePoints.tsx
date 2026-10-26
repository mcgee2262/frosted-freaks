import { asset } from '../lib/asset'
import { Link } from 'react-router-dom'
import { SERVICES } from '../config/site'
import { stagger } from '../lib/stagger'

const BALL = ['bg-warm', 'bg-ice', 'bg-navy', 'bg-glacier']

/** Services preview: a shuttered snowball photo beside the service points. */
export function ServicePoints() {
  return (
    <section aria-labelledby="services-title" className="overflow-hidden bg-glacier-2 py-24 md:py-32">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <figure className="relative lg:col-span-5">
          <div className="shutter -ml-[12vw] aspect-square w-[82vw] overflow-hidden rounded-full sm:w-[60vw] lg:-ml-[10vw] lg:w-[min(46vw,78svh)]">
            <img
              src={asset('/images/shoveling-1979.jpg')}
              alt="Two people shoveling a snowy city sidewalk, black and white photograph from 1979"
              width={1400}
              height={983}
              loading="lazy"
              className="h-full w-full object-cover object-[30%_50%] grayscale"
            />
          </div>
        </figure>

        <div className="lg:col-span-7">
          <h2 id="services-title" className="reveal text-head" style={stagger(0)}>
            What we shovel
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <li key={s.id} className="reveal" style={stagger(i + 1)}>
                <h3 className="flex items-baseline gap-3 text-lead">
                  <span className={`ball ${BALL[i % BALL.length]}`} />
                  {s.name}
                </h3>
                <p className="mt-3 pl-[calc(0.7em+0.75rem)]">{s.short}</p>
              </li>
            ))}
          </ul>
          <Link to="/services" className="reveal btn btn-navy mt-12" style={stagger(5)}>
            View Services
          </Link>
        </div>
      </div>
    </section>
  )
}
