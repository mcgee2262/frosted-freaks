import { useId } from 'react'

type Props = {
  /** Rendered height in px (width follows the 200:280 box). */
  size?: number
  /** Arms, buttons and the ice puddle. Off for the small logo. */
  full?: boolean
  className?: string
  /** Accessible name. Leave empty when the snowman is decorative. */
  title?: string
}

/**
 * Frosted Freaks mascot: a two-ball snowman whose head is a big, grinning,
 * heavy-lidded snow face. The drool has frozen into icicles.
 */
export function Snowman({ size = 280, full = true, className, title }: Props) {
  const id = useId().replace(/:/g, '')
  const snow = `snow-${id}`
  const eyeL = `eyeL-${id}`
  const eyeR = `eyeR-${id}`
  const mouth = `mouth-${id}`
  const decorative = !title

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
    >
      <defs>
        <radialGradient id={snow} cx="38%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#eef6fb" />
          <stop offset="1" stopColor="#b9d4e6" />
        </radialGradient>
        <clipPath id={eyeL}>
          <ellipse cx="78" cy="64" rx="14" ry="11" />
        </clipPath>
        <clipPath id={eyeR}>
          <ellipse cx="122" cy="64" rx="14" ry="11" />
        </clipPath>
        <clipPath id={mouth}>
          <path d="M54 82 Q100 132 146 82 Q100 100 54 82 Z" />
        </clipPath>
      </defs>

      {full && <ellipse cx="100" cy="272" rx="74" ry="6" fill="#8fd6ea" opacity="0.75" />}

      {/* arms */}
      {full && (
        <g stroke="#4a3220" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M66 150 L26 122 M40 132 L30 114" />
          <path d="M134 150 L174 122 M160 132 L172 116" />
        </g>
      )}

      {/* body */}
      <circle cx="100" cy="224" r="52" fill={`url(#${snow})`} />
      <circle cx="100" cy="152" r="40" fill={`url(#${snow})`} />
      {full && (
        <g fill="#14233a">
          <circle cx="100" cy="146" r="4" />
          <circle cx="100" cy="164" r="4" />
          <circle cx="100" cy="212" r="4.5" />
        </g>
      )}

      {/* scarf */}
      <path d="M60 116 Q100 134 140 116 L142 130 Q100 148 58 130 Z" fill="#f08a3c" />
      <path d="M118 128 L136 124 L142 168 L124 170 Z" fill="#e2762a" />
      <path d="M124 170 L124 176 M130 169 L130 175 M136 168 L137 174 M141 167 L142 173" stroke="#e2762a" strokeWidth="2.5" strokeLinecap="round" />

      {/* head */}
      <circle cx="100" cy="72" r="46" fill={`url(#${snow})`} />
      {/* cheek bulges */}
      <path d="M52 80 Q54 92 62 96" stroke="#b9d4e6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M148 80 Q146 92 138 96" stroke="#b9d4e6" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* earmuffs */}
      <path d="M56 62 Q100 0 144 62" stroke="#14233a" strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="68" r="12" fill="#f08a3c" />
      <circle cx="144" cy="68" r="12" fill="#f08a3c" />
      <circle cx="53" cy="64" r="4" fill="#ffb27a" />
      <circle cx="141" cy="64" r="4" fill="#ffb27a" />

      {/* brows */}
      <path d="M62 44 Q76 34 92 42" stroke="#14233a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M108 42 Q124 34 138 44" stroke="#14233a" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* eyes: heavy lids over big blue irises */}
      {[
        { clip: eyeL, cx: 78 },
        { clip: eyeR, cx: 122 },
      ].map(({ clip, cx }) => (
        <g key={clip}>
          <g clipPath={`url(#${clip})`}>
            <rect x={cx - 15} y="52" width="30" height="24" fill="#ffffff" />
            <circle cx={cx + 1} cy="67" r="9" fill="#2f8fe0" />
            <circle cx={cx + 1} cy="67" r="5.5" fill="#0b1220" />
            <circle cx={cx + 4} cy="64.5" r="2" fill="#ffffff" />
            <circle cx={cx - 2} cy="70" r="1" fill="#ffffff" />
            <path d={`M${cx - 16} 50 H${cx + 16} V62 Q${cx} 54 ${cx - 16} 62 Z`} fill="#dceaf4" />
          </g>
          <path d={`M${cx - 14} 62 Q${cx} 55 ${cx + 14} 62`} stroke="#8fb2cc" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx={cx} cy="64" rx="14" ry="11" fill="none" stroke="#a9c6da" strokeWidth="1.2" />
        </g>
      ))}

      {/* grin */}
      <g clipPath={`url(#${mouth})`}>
        <path d="M54 82 Q100 132 146 82 Q100 100 54 82 Z" fill="#14233a" />
        <path d="M54 82 Q100 100 146 82 L146 94 Q100 112 54 94 Z" fill="#ffffff" />
        <g stroke="#c4d5e3" strokeWidth="1">
          <path d="M70 88 V100 M82 91 V104 M94 92 V106 M106 92 V106 M118 91 V104 M130 88 V100" />
        </g>
      </g>
      <path d="M54 82 Q100 132 146 82" stroke="#0b1220" strokeWidth="1.5" fill="none" />

      {/* tongue hanging out */}
      <path d="M82 102 Q80 134 100 136 Q120 134 118 102 Q100 110 82 102 Z" fill="#f28fb1" />
      <path d="M100 108 V128" stroke="#d96b93" strokeWidth="2" strokeLinecap="round" />

      {/* frozen drool: icicles */}
      <g fill="#c9f0fa" stroke="#79cde3" strokeWidth="1" strokeLinejoin="round">
        <path d="M64 92 L72 96 L67 118 Z" />
        <path d="M74 98 L80 101 L77 112 Z" />
        <path d="M128 100 L134 97 L131 114 Z" />
        <path d="M136 94 L142 90 L140 122 Z" />
        <path d="M88 130 L96 135 L91 150 Z" />
        <path d="M108 134 L114 130 L112 156 Z" />
      </g>
      <g fill="#c9f0fa">
        <circle cx="67" cy="122" r="2.2" />
        <circle cx="140" cy="127" r="2" />
        <circle cx="112" cy="160" r="2.2" />
      </g>
    </svg>
  )
}
