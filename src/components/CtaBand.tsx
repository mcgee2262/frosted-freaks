import { Link } from 'react-router-dom'
import { Snowbanks } from './WinterScene'

/** Closing call to action: the whole band is the link. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-glacier-2">
      <Snowbanks className="h-[60px] md:h-[100px]" />
      <Link
        to="/quote"
        className="group relative block overflow-hidden rounded-t-[3rem] bg-warm text-navy transition-colors duration-150 hover:bg-navy hover:text-warm focus-visible:bg-navy focus-visible:text-warm focus-visible:outline-offset-[-6px] md:rounded-t-[6rem]"
      >
        {/* snowballs drifting in from the corner */}
        <span aria-hidden="true" className="absolute -right-[8vw] -top-[10vw] h-[34vw] w-[34vw] rounded-full bg-white/25" />
        <span aria-hidden="true" className="absolute right-[22vw] -top-[4vw] h-[12vw] w-[12vw] rounded-full bg-white/25" />

        <div className="wrap relative flex min-h-[46svh] flex-col justify-between py-10 md:min-h-[60svh] md:py-14">
          <div className="flex items-start justify-between gap-6">
            <p className="max-w-[28rem] text-lead font-medium">
              Tell us about your property and we’ll follow up with a quote.
            </p>
            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-8 w-8 flex-none transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-12 md:w-12">
              <path d="M12 36 L36 12 M16 12 H36 V32" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 id="cta-title" className="text-[clamp(3rem,11vw,11rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            Request a Quote
          </h2>
        </div>
      </Link>
    </section>
  )
}
