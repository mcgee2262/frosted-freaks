import { useId } from 'react'

type Props = {
  /** Rendered height in px (width follows the 200:280 box). */
  size?: number
  /** Arms, buttons and ground shadow. Off for the small logo. */
  full?: boolean
  /** Snow grain, sparkle and fuzz filters. Off at tiny sizes, where they cost more than they show. */
  texture?: boolean
  className?: string
  /** Accessible name. Leave empty when the snowman is decorative. */
  title?: string
}

/**
 * Frosted Freaks mascot: a two-ball snowman whose head is a big, grinning,
 * heavy-lidded snow face. The drool has frozen into icicles.
 * Lit from the top left: blue shadow side, bounce light from the snow below.
 */
export function Snowman({ size = 280, full = true, texture = true, className, title }: Props) {
  const id = useId().replace(/:/g, '')
  const u = (name: string) => `${name}-${id}`
  const ref = (name: string) => `url(#${u(name)})`
  const decorative = !title
  const grain = texture ? ref('grain') : undefined

  const balls = [
    { cx: 100, cy: 224, r: 52 },
    { cx: 100, cy: 152, r: 40 },
  ]

  return (
    <svg
      viewBox="0 0 200 280"
      width={(size * 200) / 280}
      height={size}
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
      focusable="false"
      overflow="visible"
    >
      <defs>
        {/* packed snow: key light top-left, cool blue core shadow */}
        <radialGradient id={u('snow')} cx="36%" cy="28%" r="78%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.38" stopColor="#f4f9fc" />
          <stop offset="0.7" stopColor="#d3e3ef" />
          <stop offset="0.9" stopColor="#a9c3d8" />
          <stop offset="1" stopColor="#8eaac2" />
        </radialGradient>
        {/* bounce light from the snow ground, lower right rim */}
        <radialGradient id={u('rim')} cx="78%" cy="88%" r="60%">
          <stop offset="0.55" stopColor="#dff6ff" stopOpacity="0" />
          <stop offset="0.92" stopColor="#e8faff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={u('contact')} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#5f7f9c" stopOpacity="0.7" />
          <stop offset="1" stopColor="#5f7f9c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={u('ground')} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#4a6a8a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4a6a8a" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={u('iris')} cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#9ad8ff" />
          <stop offset="0.45" stopColor="#3b97ea" />
          <stop offset="0.85" stopColor="#1a5fb4" />
          <stop offset="1" stopColor="#0c2f63" />
        </radialGradient>
        <linearGradient id={u('sclera')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9d6e2" />
          <stop offset="0.35" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e3ebf2" />
        </linearGradient>
        <radialGradient id={u('coal')} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#5b6575" />
          <stop offset="0.4" stopColor="#252c38" />
          <stop offset="1" stopColor="#07090d" />
        </radialGradient>
        <linearGradient id={u('mouth')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a0c18" />
          <stop offset="1" stopColor="#5a1a2c" />
        </linearGradient>
        <linearGradient id={u('tooth')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#f3f6f9" />
          <stop offset="1" stopColor="#c8d3dd" />
        </linearGradient>
        <radialGradient id={u('tongue')} cx="45%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffb3cb" />
          <stop offset="0.5" stopColor="#f17aa0" />
          <stop offset="1" stopColor="#b9406a" />
        </radialGradient>
        <linearGradient id={u('ice')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#c6eefa" stopOpacity="0.8" />
          <stop offset="1" stopColor="#6fc3df" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={u('muff')} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#ffc08a" />
          <stop offset="0.5" stopColor="#f08a3c" />
          <stop offset="1" stopColor="#b8571a" />
        </radialGradient>
        <linearGradient id={u('band')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d5a80" />
          <stop offset="0.5" stopColor="#14233a" />
          <stop offset="1" stopColor="#0b1525" />
        </linearGradient>
        <linearGradient id={u('scarf')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffa765" />
          <stop offset="0.55" stopColor="#f08a3c" />
          <stop offset="1" stopColor="#b8571a" />
        </linearGradient>
        <pattern id={u('knit')} width="5" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 0 L2.5 3 L5 0 M0 3 L2.5 6 L5 3" stroke="#a84d14" strokeOpacity="0.45" strokeWidth="0.8" fill="none" />
        </pattern>
        <linearGradient id={u('twig')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a6040" />
          <stop offset="1" stopColor="#3b2414" />
        </linearGradient>

        {texture && (
          <>
            {/* snow grain: noise lit as a bumpy surface, multiplied onto the shape */}
            <filter id={u('grain')} x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="7" result="noise" />
              <feDiffuseLighting in="noise" surfaceScale="0.9" lightingColor="#ffffff" result="lit">
                <feDistantLight azimuth="225" elevation="58" />
              </feDiffuseLighting>
              <feComposite in="SourceGraphic" in2="lit" operator="arithmetic" k1="0.55" k2="0.5" k3="0" k4="0" result="tex" />
              <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3" result="spark" />
              <feColorMatrix in="spark" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 9 -6.4" result="sparkDots" />
              <feComposite in="sparkDots" in2="SourceAlpha" operator="in" result="sparkIn" />
              <feMerge>
                <feMergeNode in="tex" />
                <feMergeNode in="sparkIn" />
              </feMerge>
              <feComposite in2="SourceAlpha" operator="in" />
            </filter>
            {/* fluffy earmuffs */}
            <filter id={u('fuzz')} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="2" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
            </filter>
            <filter id={u('soft')} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
          </>
        )}

        <clipPath id={u('eyeL')}>
          <ellipse cx="78" cy="64" rx="14" ry="11" />
        </clipPath>
        <clipPath id={u('eyeR')}>
          <ellipse cx="122" cy="64" rx="14" ry="11" />
        </clipPath>
        <clipPath id={u('mouthClip')}>
          <path d="M54 82 Q100 132 146 82 Q100 100 54 82 Z" />
        </clipPath>
      </defs>

      {/* ground: cast shadow and a mound of snow at the base */}
      {full && (
        <>
          <ellipse cx="112" cy="272" rx="86" ry="9" fill={ref('ground')} />
          <path d="M40 268 Q52 256 68 262 Q84 252 100 260 Q118 252 132 262 Q148 254 162 266 Q150 276 100 276 Q52 276 40 268 Z" fill={ref('snow')} filter={grain} />
        </>
      )}

      {/* arms: twigs with a fork */}
      {full && (
        <g stroke={ref('twig')} strokeLinecap="round" fill="none">
          <path d="M66 150 Q46 138 26 122" strokeWidth="4.5" />
          <path d="M40 132 L30 113" strokeWidth="3" />
          <path d="M33 126 L22 124" strokeWidth="2.2" />
          <path d="M134 150 Q154 136 174 122" strokeWidth="4.5" />
          <path d="M160 132 L171 115" strokeWidth="3" />
          <path d="M167 127 L179 128" strokeWidth="2.2" />
        </g>
      )}

      {/* body balls, each with grain, rim bounce and a contact shadow on top */}
      {balls.map((b) => (
        <g key={b.cy}>
          <circle cx={b.cx} cy={b.cy} r={b.r} fill={ref('snow')} filter={grain} />
          <circle cx={b.cx} cy={b.cy} r={b.r} fill={ref('rim')} />
        </g>
      ))}
      <ellipse cx="100" cy="182" rx="34" ry="8" fill={ref('contact')} />
      {full && (
        <g>
          {[146, 164, 212].map((y, i) => (
            <g key={y}>
              <circle cx="100" cy={y} r={i === 2 ? 5 : 4.4} fill={ref('coal')} />
              <circle cx={98.6} cy={y - 1.6} r="1.1" fill="#ffffff" opacity="0.55" />
            </g>
          ))}
        </g>
      )}

      {/* scarf: knit band, a fold shadow and a hanging tail */}
      <ellipse cx="100" cy="134" rx="42" ry="9" fill={ref('contact')} />
      <path d="M118 128 L136 124 L142 168 L124 170 Z" fill={ref('scarf')} />
      <path d="M118 128 L136 124 L142 168 L124 170 Z" fill={ref('knit')} />
      <path d="M121 134 L138 131" stroke="#a84d14" strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M124 170 L123 177 M129 169.6 L129 176.5 M134 169 L135 176 M139 168.4 L141 175" stroke="#d9732a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M60 116 Q100 134 140 116 L142 130 Q100 148 58 130 Z" fill={ref('scarf')} />
      <path d="M60 116 Q100 134 140 116 L142 130 Q100 148 58 130 Z" fill={ref('knit')} />
      <path d="M62 120 Q100 137 139 120" stroke="#ffd2ad" strokeOpacity="0.6" strokeWidth="1.4" fill="none" />

      {/* head */}
      <circle cx="100" cy="72" r="46" fill={ref('snow')} filter={grain} />
      <circle cx="100" cy="72" r="46" fill={ref('rim')} />
      {/* cheek bulges pushed up by the grin */}
      <path d="M52 78 Q53 92 63 98" stroke="#9fbad0" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M148 78 Q147 92 137 98" stroke="#9fbad0" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <ellipse cx="64" cy="86" rx="9" ry="6" fill="#ffffff" opacity="0.7" />
      <ellipse cx="136" cy="86" rx="8" ry="5" fill="#ffffff" opacity="0.45" />

      {/* earmuffs */}
      <path d="M56 62 Q100 0 144 62" stroke={ref('band')} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M62 50 Q100 4 132 44" stroke="#8fb2d6" strokeOpacity="0.55" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {[56, 144].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx + 1.5} cy="71" rx="12" ry="12" fill="#5f7f9c" opacity="0.35" />
          <circle cx={cx} cy="68" r="12.5" fill={ref('muff')} filter={texture ? ref('fuzz') : undefined} />
          <circle cx={cx - 4} cy="63" r="3.6" fill="#ffd9b8" opacity="0.8" />
        </g>
      ))}

      {/* brows: lumps of coal */}
      <path d="M61 46 Q64 38 76 36 Q88 35 93 41 Q92 45 86 44 Q76 41 67 47 Q63 49 61 46 Z" fill={ref('coal')} />
      <path d="M107 41 Q112 35 124 36 Q136 38 139 46 Q137 49 133 47 Q124 41 114 44 Q108 45 107 41 Z" fill={ref('coal')} />
      <path d="M70 40 Q78 37 86 38" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M114 38 Q122 37 130 40" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* eyes: glossy irises under heavy snow lids */}
      {[
        { clip: 'eyeL', cx: 78 },
        { clip: 'eyeR', cx: 122 },
      ].map(({ clip, cx }) => (
        <g key={clip}>
          <ellipse cx={cx} cy="65.5" rx="15" ry="12" fill="#7e9ab3" opacity="0.5" />
          <g clipPath={ref(clip)}>
            <rect x={cx - 15} y="52" width="30" height="24" fill={ref('sclera')} />
            <circle cx={cx + 1} cy="67" r="9.2" fill={ref('iris')} />
            <circle cx={cx + 1} cy="67" r="9.2" fill="none" stroke="#08234a" strokeWidth="1.2" />
            <circle cx={cx + 1} cy="67" r="5.4" fill="#05080d" />
            {/* lid: snow, casting a soft shadow down over the eye */}
            <rect x={cx - 16} y="58" width="32" height="7" fill="#365a7c" opacity="0.35" />
            <path d={`M${cx - 16} 48 H${cx + 16} V62 Q${cx} 54 ${cx - 16} 62 Z`} fill={ref('snow')} />
            <ellipse cx={cx + 4.5} cy="64.6" rx="2.6" ry="2" fill="#ffffff" />
            <circle cx={cx - 2.5} cy="70.5" r="1.1" fill="#ffffff" opacity="0.85" />
          </g>
          <path d={`M${cx - 14.5} 62 Q${cx} 54.5 ${cx + 14.5} 62`} stroke="#7e9ab3" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d={`M${cx - 12} 74 Q${cx} 78 ${cx + 12} 74`} stroke="#a9c3d8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      ))}

      {/* grin */}
      <path d="M52 81 Q100 137 148 81" stroke="#8eaac2" strokeWidth="3" fill="none" opacity="0.6" />
      <g clipPath={ref('mouthClip')}>
        <path d="M54 82 Q100 132 146 82 Q100 100 54 82 Z" fill={ref('mouth')} />
        {/* top teeth, one by one, following the upper lip */}
        {[56, 67.5, 79, 90.5, 102, 113.5, 125, 136.5].map((x) => {
          const t = (x + 5 - 54) / 92
          const y = 82 + 36 * t * (1 - t)
          return <rect key={x} x={x} y={y - 3} width={10.5} height={14} rx="2.5" fill={ref('tooth')} />
        })}
        <path d="M54 82 Q100 100 146 82 L146 86 Q100 104 54 86 Z" fill="#6c8299" opacity="0.35" />
      </g>
      <path d="M54 82 Q100 132 146 82" stroke="#2a0c18" strokeWidth="1.6" fill="none" />

      {/* tongue hanging out, glossy */}
      <path d="M82 102 Q79 136 100 138 Q121 136 118 102 Q100 110 82 102 Z" fill={ref('tongue')} />
      <path d="M100 108 Q99 122 100 130" stroke="#b9406a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="92" cy="116" rx="4" ry="7" fill="#ffffff" opacity="0.45" filter={texture ? ref('soft') : undefined} />

      {/* frozen drool: translucent icicles with a bright edge */}
      <g fill={ref('ice')}>
        {[
          'M64 92 L72 96 L67 120 Z',
          'M74 98 L80 101 L77 113 Z',
          'M128 100 L134 97 L131 115 Z',
          'M136 94 L142 90 L140 124 Z',
          'M87 131 L96 136 L90.5 154 Z',
          'M107 135 L114 130 L112 160 Z',
        ].map((d) => (
          <path key={d} d={d} stroke="#9fdcf0" strokeWidth="0.8" strokeLinejoin="round" />
        ))}
      </g>
      <g stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.9">
        <path d="M66 95 L67.5 112" />
        <path d="M137.5 94 L139.5 116" />
        <path d="M108.5 135 L111 152" />
      </g>
      <g fill="#d6f4fc" stroke="#9fdcf0" strokeWidth="0.6">
        <circle cx="67" cy="124" r="2.3" />
        <circle cx="140" cy="128.5" r="2.1" />
        <circle cx="112" cy="164" r="2.4" />
      </g>
      <g fill="#ffffff">
        <circle cx="66.3" cy="123.2" r="0.8" />
        <circle cx="139.3" cy="127.8" r="0.7" />
        <circle cx="111.2" cy="163.2" r="0.8" />
      </g>
    </svg>
  )
}

/** The tongue alone, at any size, for the intro's lick. `mouth` adds lips and teeth around its root. */
export function Tongue({ className, mouth = false }: { className?: string; mouth?: boolean }) {
  const id = useId().replace(/:/g, '')
  const box = mouth ? '-50 -46 220 206' : '0 0 120 160'
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false" overflow="visible">
      <defs>
        <radialGradient id={`t-${id}`} cx="45%" cy="40%" r="70%">
          <stop offset="0" stopColor="#ffb8ce" />
          <stop offset="0.5" stopColor="#f17aa0" />
          <stop offset="1" stopColor="#b33d66" />
        </radialGradient>
        <linearGradient id={`th-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c8d3dd" />
        </linearGradient>
        <linearGradient id={`root-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a0c18" stopOpacity="0.85" />
          <stop offset="1" stopColor="#2a0c18" stopOpacity="0" />
        </linearGradient>
        <filter id={`b-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {mouth && <path d="M-44 -20 Q60 30 164 -20 Q60 -60 -44 -20 Z" fill="#2a0c18" />}
      <path d="M8 0 Q-4 150 60 158 Q124 150 112 0 Z" fill={`url(#t-${id})`} />
      <path d="M60 14 Q57 80 60 130" stroke="#b33d66" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="36" cy="70" rx="10" ry="30" fill="#ffffff" opacity="0.4" filter={`url(#b-${id})`} />
      <ellipse cx="86" cy="96" rx="5" ry="14" fill="#ffffff" opacity="0.25" filter={`url(#b-${id})`} />
      {mouth && (
        <>
          <rect x="4" y="-2" width="112" height="22" fill={`url(#root-${id})`} />
          {[-36, -12, 12, 36, 60, 84, 108, 132].map((x) => {
            const t = (x + 11 + 44) / 208
            const y = -44 + 50 * t * (1 - t) * 2.2
            return <rect key={x} x={x} y={y} width="22" height="30" rx="5" fill={`url(#th-${id})`} />
          })}
          <path d="M-50 -46 H170 V-24 Q60 -2 -50 -24 Z" fill="#eef6fb" />
        </>
      )}
    </svg>
  )
}
