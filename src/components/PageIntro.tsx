import type { ReactNode } from 'react'
import { stagger } from '../lib/stagger'
import { Snowfall } from './Snowfall'
import { Snowbanks } from './WinterScene'

/** Top band for inner pages: big title, one sentence, a snowball. */
export function PageIntro({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-navy text-white">
      <span aria-hidden="true" className="absolute -right-[20vw] -top-[30vw] h-[70vw] w-[70vw] rounded-full bg-navy-2 md:-right-[10vw] md:-top-[20vw] md:h-[50vw] md:w-[50vw]" />
      <Snowfall density={40} />
      <div className="wrap relative grid items-end gap-10 pb-10 pt-16 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-8">
          <h1 id="page-title" className="reveal text-display" style={stagger(0)}>{title}</h1>
          <div className="reveal mt-6 max-w-[38rem] text-lead text-glacier-2" style={stagger(1)}>{children}</div>
        </div>
        {aside && <div className="reveal md:col-span-4 md:justify-self-end" style={stagger(2)}>{aside}</div>}
      </div>
      <Snowbanks className="relative h-[60px] md:h-[110px]" />
    </section>
  )
}
