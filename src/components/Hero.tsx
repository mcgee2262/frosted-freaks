import { Link } from 'react-router-dom'
import { stagger } from '../lib/stagger'
import { Snowfall } from './Snowfall'
import { WinterScene } from './WinterScene'

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-navy text-white min-h-[calc(100svh-5rem)] md:min-h-[min(calc(100svh-5rem),900px)]"
    >
      <WinterScene />
      <Snowfall />

      <div className="wrap relative pt-[8svh] pb-[46svh] md:flex md:min-h-[inherit] md:items-center md:py-24">
        <div className="max-w-[48rem]">
          <p className="reveal text-lead font-medium text-ice" style={stagger(0)}>
            Snow removal for Northern Virginia
          </p>
          <h1
            id="hero-title"
            className="reveal mt-4 text-display"
            style={stagger(1)}
          >
            Clear paths.
            <br />
            Less winter stress.
          </h1>
          <p
            className="reveal mt-8 max-w-[34rem] text-lead text-glacier-2"
            style={stagger(2)}
          >
            Frosted Freaks Services helps keep driveways, walkways, steps and entryways clear in Reston, Herndon and Great Falls.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-3" style={stagger(3)}>
            <Link to="/quote" className="btn btn-warm">Request a Quote</Link>
            <Link to="/services" className="btn btn-ghost">View Services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
