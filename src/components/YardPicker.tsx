import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../config/site'
import { stagger } from '../lib/stagger'
import { YardScene } from './YardScene'

const BALL = ['bg-warm', 'bg-ice', 'bg-navy', 'bg-glacier']

/** The page's live thing: pick what needs clearing, watch it clear. */
export function YardPicker() {
  const [picked, setPicked] = useState<string[]>(['driveway', 'walkway'])
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const query = picked.length ? `?services=${picked.join(',')}` : ''

  return (
    <section aria-labelledby="picker-title" className="bg-glacier py-24 md:py-32">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="picker-title" className="reveal text-head" style={stagger(0)}>
            What needs clearing?
          </h2>
          <p className="reveal mt-6 max-w-[34rem]" style={stagger(1)}>
            Tap the parts of your property you want shoveled. Your picks carry over to the quote form.
          </p>

          <div className="reveal mt-10 flex flex-col gap-3" role="group" aria-label="Areas to clear" style={stagger(2)}>
            {SERVICES.map((s, i) => {
              const on = picked.includes(s.id)
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s.id)}
                  className={`flex min-h-14 items-center gap-4 rounded-full px-6 py-3 text-left font-medium transition-colors ${
                    on ? 'bg-navy text-white' : 'bg-glacier-2 text-ink hover:bg-white'
                  }`}
                >
                  <span className={`ball ${BALL[i % BALL.length]}`} />
                  <span className="flex-1">{s.name}</span>
                  <span className="text-small">{on ? 'Cleared' : 'Snowed in'}</span>
                </button>
              )
            })}
          </div>

          <Link to={`/quote${query}`} className="reveal btn btn-warm mt-8" style={stagger(3)}>
            Request a Quote for {picked.length === 0 ? 'my property' : picked.length === 1 ? 'this' : 'these'}
          </Link>
        </div>

        <div className="reveal lg:col-span-7" style={stagger(2)}>
          <div className="overflow-hidden rounded-[2.5rem] bg-glacier-2">
            <YardScene
              cleared={picked}
              className="block h-auto w-full"
              title={`Drawing of a snowy house front. Cleared: ${
                picked.length ? SERVICES.filter((s) => picked.includes(s.id)).map((s) => s.name).join(', ') : 'nothing yet'
              }.`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
