import { useState } from 'react'
import { stagger } from '../lib/stagger'

const STEPS = [
  {
    name: 'Tell us about your property',
    body: 'Use the quote form to tell us where you are and what needs clearing: the driveway, the walk, the steps, or all of it. A sentence or two about the layout helps.',
    tone: 'bg-navy text-white',
  },
  {
    name: 'Receive a quote',
    body: 'We look over your request and get back to you with a quote for the work you described. Questions first? Ask them in the notes.',
    tone: 'bg-navy-2 text-white',
  },
  {
    name: 'Get ready for a clearer path',
    body: 'Once you are happy with the quote, we sort out the details with you, so that when the snow comes your paths are on our list.',
    tone: 'bg-glacier text-ink',
  },
]

/** Three steps as a row of panels, dark to light; one is open at a time. */
export function HowItWorks() {
  const [open, setOpen] = useState(0)

  return (
    <section aria-labelledby="how-title" className="bg-glacier-2 py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="how-title" className="reveal text-head lg:col-span-5" style={stagger(0)}>
            How it works
          </h2>
          <p className="reveal max-w-[36rem] text-lead lg:col-span-6 lg:col-start-7" style={stagger(1)}>
            Getting a quote takes three steps, and the first one is just telling us about your place.
          </p>
        </div>

        <ol className="reveal mt-16 flex flex-col overflow-hidden rounded-[2.5rem] lg:h-[520px] lg:flex-row" style={stagger(2)}>
          {STEPS.map((s, i) => {
            const isOpen = open === i
            return (
              <li
                key={s.name}
                className={`${s.tone} relative transition-[flex-basis] duration-500 ease-out lg:min-w-0 ${
                  isOpen ? 'lg:basis-[60%]' : 'lg:basis-[20%]'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`step-${i}`}
                    onClick={() => setOpen(i)}
                    className={`flex w-full items-center gap-4 px-6 py-5 text-left text-lead font-semibold lg:h-full lg:items-end lg:justify-start lg:p-8 ${
                      isOpen ? 'lg:sr-only' : ''
                    }`}
                  >
                    <span className="lg:rotate-180 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]">{s.name}</span>
                  </button>
                </h3>
                <div
                  id={`step-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-8 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-between lg:p-10"
                >
                  <p className="hidden text-head font-semibold leading-none tracking-[-0.035em] lg:block" aria-hidden="true">{s.name}</p>
                  <p className="max-w-[36ch] text-lead">{s.body}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
