import { QuoteForm } from '../components/QuoteForm'
import { Snowman } from '../components/Snowman'
import { AREAS } from '../config/site'
import { stagger } from '../lib/stagger'
import { usePageMeta } from '../lib/usePageMeta'

export default function Quote() {
  usePageMeta(
    'Request a Quote | Frosted Freaks Services',
    'Request a snow shoveling quote for your home in Reston, Herndon or Great Falls, Virginia.',
  )
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden bg-navy text-white">
      <span aria-hidden="true" className="absolute -left-[30vw] top-[40%] h-[80vw] w-[80vw] rounded-full bg-navy-2 lg:-left-[12vw] lg:top-[30%] lg:h-[46vw] lg:w-[46vw]" />
      <div className="wrap relative grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h1 id="page-title" className="text-display">Request a quote</h1>
          <p className="reveal mt-6 text-lead text-glacier-2" style={stagger(1)}>
            Tell us about your property and what needs clearing. We’ll review it and follow up with a quote.
          </p>
          <p className="reveal mt-6 text-glacier-2" style={stagger(2)}>
            Not sure whether you’re in our service area? Send a request and we’ll confirm.
          </p>
          <ul className="reveal mt-10 flex gap-3" style={stagger(3)} aria-label="Service areas">
            {AREAS.map((a) => (
              <li key={a.id} className="flex flex-col items-center gap-2 text-small">
                <img src={a.image.src} alt="" width={a.image.width} height={a.image.height} loading="lazy"
                  className="h-24 w-24 rounded-full object-cover md:h-28 md:w-28" />
                {a.name}
              </li>
            ))}
          </ul>
          <div className="reveal mt-10 hidden lg:block" style={stagger(4)}>
            <Snowman size={320} className="bob h-[320px] w-auto" />
          </div>
        </div>
        <div className="reveal text-ink lg:col-span-8" style={stagger(2)}>
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
