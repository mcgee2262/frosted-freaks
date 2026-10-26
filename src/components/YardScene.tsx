type Props = {
  /** Service ids whose areas show as cleared. */
  cleared: string[]
  className?: string
  title?: string
}

const SNOW = '#ffffff'
const EDGE = '#a9c6da'
const PAVE = '#6d7f96'
const PAVE_LIGHT = '#9fb1c4'

/**
 * A drawn house front in deep snow. Each service id maps to the parts of
 * the yard it covers; those parts lose their snow when listed in `cleared`.
 */
export function YardScene({ cleared, className, title }: Props) {
  const on = (id: string) => cleared.includes(id)
  const cover = (id: string) => ({
    style: { opacity: on(id) ? 0 : 1, transition: 'opacity 600ms ease' },
  })

  const driveway = 'M96 224 H214 L246 300 H64 Z'
  const walkway = 'M326 252 H354 L366 300 H314 Z'
  const sidewalk = 'M0 300 H600 V324 H0 Z'
  const steps = 'M304 222 H376 V254 H304 Z'
  const sidePath = 'M474 224 H500 L572 300 H540 Z'

  return (
    <svg
      viewBox="0 0 600 340"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* snowy lawn */}
      <rect x="0" y="210" width="600" height="130" fill="#eef6fb" />

      {/* garage */}
      <path d="M80 140 L152 96 L228 140 Z" fill="#ffffff" />
      <rect x="90" y="138" width="130" height="86" fill="#132d52" />
      <rect x="104" y="160" width="102" height="64" fill="#dfeaf3" />
      <path d="M104 176 H206 M104 192 H206 M104 208 H206" stroke="#a9c6da" strokeWidth="2" />

      {/* house */}
      <path d="M204 98 L346 22 L492 98 Z" fill="#ffffff" />
      <rect x="220" y="96" width="254" height="128" fill="#0b1f3a" />
      <rect x="244" y="122" width="44" height="40" rx="22" fill="#ffd9a8" />
      <rect x="406" y="122" width="44" height="40" rx="22" fill="#ffd9a8" />
      <rect x="320" y="146" width="40" height="76" rx="20" fill="#f08a3c" />
      <circle cx="350" cy="186" r="3" fill="#0b1f3a" />
      {/* icicles on the eaves */}
      <path d="M232 96 l4 12 l4 -12 M262 96 l3 8 l3 -8 M300 96 l4 14 l4 -14 M392 96 l3 9 l3 -9 M430 96 l4 12 l4 -12 M458 96 l3 8 l3 -8" fill="#c9f0fa" />

      {/* side gate */}
      <rect x="500" y="176" width="60" height="48" fill="#132d52" />
      <path d="M512 176 V224 M524 176 V224 M536 176 V224 M548 176 V224" stroke="#0b1f3a" strokeWidth="3" />

      {/* pavement underneath */}
      <path d={driveway} fill={PAVE} />
      <path d={sidewalk} fill={PAVE_LIGHT} />
      <path d={walkway} fill={PAVE_LIGHT} />
      <path d={steps} fill={PAVE_LIGHT} />
      <path d="M304 233 H376 M304 244 H376" stroke="#6d7f96" strokeWidth="2" />
      <path d={sidePath} fill={PAVE_LIGHT} />

      {/* snow on top: fades away when cleared */}
      <g stroke={EDGE} strokeWidth="2" strokeLinejoin="round">
        <path {...cover('driveway')} d="M92 226 Q150 214 218 226 L250 302 Q150 290 60 302 Z" fill={SNOW} />
        <g {...cover('walkway')}>
          <path d="M-2 298 Q150 290 300 300 T602 298 V326 H-2 Z" fill={SNOW} />
          <path d="M322 250 Q340 244 358 250 L370 302 Q340 296 310 302 Z" fill={SNOW} />
        </g>
        <path {...cover('steps')} d="M300 224 Q340 214 380 224 V256 Q340 250 300 256 Z" fill={SNOW} />
        <path {...cover('residential')} d="M470 226 Q488 220 504 226 L576 302 Q556 296 536 302 Z" fill={SNOW} />
      </g>

      {/* banks along the edges where the snow was thrown */}
      <path d="M0 214 Q30 196 60 214 Q74 222 92 214 L92 232 H0 Z" fill="#ffffff" />
      <path d="M560 214 Q584 198 600 210 V232 H560 Z" fill="#ffffff" />
    </svg>
  )
}
