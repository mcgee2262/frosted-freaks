import { asset } from '../lib/asset'
import { Link } from 'react-router-dom'
import { CtaBand } from '../components/CtaBand'
import { PageIntro } from '../components/PageIntro'
import { Snowman } from '../components/Snowman'
import { YardScene } from '../components/YardScene'
import { SERVICES } from '../config/site'
import { stagger } from '../lib/stagger'
import { usePageMeta } from '../lib/usePageMeta'

const FIELD = ['bg-glacier-2', 'bg-glacier', 'bg-glacier-2', 'bg-glacier']

export default function Services() {
  usePageMeta(
    'Services | Frosted Freaks Services',
    'Driveway clearing, walkway and sidewalk clearing, steps, porches and entryways, and residential snow shoveling in Reston, Herndon and Great Falls, VA.',
  )
  return (
    <>
      <PageIntro title="Snow shoveling services" aside={<Snowman size={260} className="bob h-[200px] w-auto md:h-[260px]" />}>
        <p>We shovel the parts of your home you walk and drive on, by hand. Here is what we can help with.</p>
      </PageIntro>

      {SERVICES.map((s, i) => (
        <section key={s.id} aria-labelledby={`svc-${s.id}`} className={`${FIELD[i % FIELD.length]} py-20 md:py-32`}>
          <div className={`wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
            <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
              <h2 id={`svc-${s.id}`} className="reveal text-head" style={stagger(0)}>{s.name}</h2>
              {s.long.map((p, j) => (
                <p key={j} className="reveal mt-6 max-w-[38rem]" style={stagger(j + 1)}>{p}</p>
              ))}
              <Link to={`/quote?services=${s.id}`} className="reveal btn btn-warm mt-8" style={stagger(3)}>
                Request a Quote
              </Link>
            </div>
            <div className={`reveal lg:col-span-7 ${i % 2 ? 'lg:order-1 lg:col-start-1' : ''}`} style={stagger(2)}>
              <div className="overflow-hidden rounded-[2.5rem] bg-white">
                <YardScene cleared={[s.id]} className="block h-auto w-full" title={`Drawing of a snowy house front with the ${s.name.toLowerCase()} area cleared.`} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="by-hand-title" className="bg-navy py-20 text-white md:py-32">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="by-hand-title" className="reveal text-head" style={stagger(0)}>Shovel work, done for you</h2>
            <p className="reveal mt-6 max-w-[34rem] text-lead text-glacier-2" style={stagger(1)}>
              Shoveling is the same job it has always been. We take it off your list in Reston, Herndon and Great Falls.
            </p>
          </div>
          <div className="reveal grid grid-cols-2 gap-4 lg:col-span-7" style={stagger(2)}>
            <img src={asset('/images/shoveling-1979.jpg')} alt="Two people shoveling a snowy city sidewalk, black and white photograph from 1979" width={1400} height={983} loading="lazy"
              className="aspect-square w-full rounded-full object-cover object-[30%_50%] grayscale" />
            <img src={asset('/images/great-falls-winter.jpg')} alt="The Great Falls of the Potomac River in winter" width={1400} height={931} loading="lazy"
              className="drift aspect-square w-full rounded-full object-cover" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
