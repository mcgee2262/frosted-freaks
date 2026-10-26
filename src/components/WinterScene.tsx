import { Snowman } from './Snowman'

/** Snowbank humps along the bottom of a scene. Decorative. */
export function Snowbanks({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      className={`pointer-events-none block w-full ${className}`}
    >
      <path d="M0 90 C120 40 220 60 320 80 C430 102 520 30 660 52 C780 70 860 100 980 70 C1080 46 1150 60 1200 72 V160 H0 Z" fill="#e4f0f8" />
      <path d="M0 120 C140 84 260 100 380 116 C520 134 600 86 760 100 C900 112 1000 132 1200 104 V160 H0 Z" fill="#ffffff" />
      <path d="M380 116 C520 134 600 86 760 100" stroke="#7fd6e8" strokeWidth="3" fill="none" opacity="0.6" />
    </svg>
  )
}

/**
 * The hero scene: one giant snowball, cropped by the screen, with the
 * mascot standing in the snowbank at its foot.
 */
export function WinterScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* giant snowball */}
      <div
        className="absolute rounded-full bg-glacier
          left-1/2 bottom-[calc(42svh-130vw)] h-[130vw] w-[130vw] -translate-x-1/2
          md:left-auto md:right-[-52vh] md:bottom-auto md:top-[50%] md:h-[120vh] md:w-[120vh] md:translate-x-0 md:-translate-y-1/2"
      />

      <div className="absolute inset-x-0 bottom-0">
        <Snowbanks className="h-[90px] md:h-[150px]" />
      </div>

      <div className="absolute bottom-[40px] right-1/2 translate-x-1/2 md:bottom-[70px] md:right-[12vw] md:translate-x-0">
        <div className="bob">
          <Snowman size={300} className="h-[min(38svh,300px)] w-auto md:h-[min(64vh,540px)]" />
        </div>
      </div>
    </div>
  )
}
