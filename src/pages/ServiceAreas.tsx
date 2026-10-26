import { asset } from '../lib/asset'
import { Link } from 'react-router-dom'
import { AreaMap } from '../components/AreaMap'
import { CtaBand } from '../components/CtaBand'
import { PageIntro } from '../components/PageIntro'
import { AREAS } from '../config/site'
import { stagger } from '../lib/stagger'
import { usePageMeta } from '../lib/usePageMeta'

export default function ServiceAreas() {
  usePageMeta(
    'Service Areas: Reston, Herndon and Great Falls, VA | Frosted Freaks Services',
    'Frosted Freaks Services offers residential snow shoveling in Reston, Herndon and Great Falls, Virginia. Not sure you are in our area? Send a request and we will confirm.',
  )
  return (
    <>
      <PageIntro title="Where we shovel">
        <p>Proudly serving Reston, Herndon and Great Falls, Virginia, three neighboring communities in western Fairfax County.</p>
      </PageIntro>

      <section aria-labelledby="map-title" className="bg-glacier-2 py-20 md:py-32">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 id="map-title" className="reveal text-head" style={stagger(0)}>Three neighbors</h2>
            <p className="reveal mt-6" style={stagger(1)}>
              Herndon and Reston sit side by side, with Great Falls to the northeast along the Potomac. These are the areas we serve.
            </p>
          </div>
          <div className="reveal lg:col-span-8" style={stagger(2)}>
            <AreaMap className="block h-auto w-full rounded-[2.5rem]" />
          </div>
        </div>
      </section>

      {AREAS.map((a, i) => (
        <section key={a.id} aria-labelledby={`area-${a.id}`} className={`${i % 2 ? 'bg-glacier-2' : 'bg-glacier'} overflow-hidden py-20 md:py-32`}>
          <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`}>
              <div className="reveal mx-auto aspect-square w-[min(80vw,560px)] overflow-hidden rounded-full" style={stagger(0)}>
                <img src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} loading="lazy" className="drift h-full w-full object-cover" />
              </div>
            </div>
            <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-1' : ''}`}>
              <h2 id={`area-${a.id}`} className="reveal text-head" style={stagger(0)}>Snow shoveling in {a.name}</h2>
              <p className="reveal mt-6 max-w-[38rem]" style={stagger(1)}>{a.blurb}</p>
              <Link to="/quote" className="reveal btn btn-navy mt-8" style={stagger(2)}>Request a Quote in {a.name}</Link>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="check-title" className="bg-navy py-20 text-white md:py-32">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="check-title" className="reveal text-head" style={stagger(0)}>Check your address</h2>
            <p className="reveal mt-6 max-w-[38rem] text-lead text-glacier-2" style={stagger(1)}>
              Not sure whether you’re in our service area? Send a request with your address and we’ll confirm.
            </p>
          </div>
          <div className="reveal lg:col-span-5 lg:justify-self-end" style={stagger(2)}>
            <Link to="/quote" className="btn btn-warm">Check my address</Link>
          </div>
        </div>
      </section>

      <div className="bg-glacier-2">
        <figure className="wrap py-20 md:py-28">
          <img src={asset('/images/great-falls-sunny.jpg')} alt="The Great Falls of the Potomac on a clear winter day" width={1400} height={1050} loading="lazy"
            className="reveal aspect-[21/9] w-full rounded-[2.5rem] object-cover" />
          <figcaption className="mt-4 text-small text-muted">The Great Falls of the Potomac on a winter day.</figcaption>
        </figure>
      </div>

      <CtaBand />
    </>
  )
}
