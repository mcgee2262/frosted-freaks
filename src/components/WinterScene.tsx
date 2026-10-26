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
