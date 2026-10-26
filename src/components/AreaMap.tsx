/**
 * Illustrated, not-to-scale sketch of where the three service areas sit
 * relative to each other and the Potomac. Not a coverage map.
 */
export function AreaMap({ className }: { className?: string }) {
  const towns = [
    { name: 'Herndon', x: 150, y: 250, r: 70, fill: '#cfe4f2' },
    { name: 'Reston', x: 300, y: 220, r: 84, fill: '#ffffff' },
    { name: 'Great Falls', x: 470, y: 130, r: 78, fill: '#7fd6e8' },
  ]
  return (
    <svg
      viewBox="0 0 640 380"
      className={className}
      role="img"
      aria-label="Sketch map, not to scale: Herndon to the west, Reston beside it, and Great Falls to the northeast along the Potomac River."
    >
      <rect width="640" height="380" fill="#132d52" />
      {/* Potomac */}
      <path d="M300 -10 C360 30 420 40 470 30 C540 16 590 60 650 70" stroke="#2f6aa8" strokeWidth="26" fill="none" strokeLinecap="round" />
      <text x="560" y="40" fill="#cfe4f2" fontSize="16" fontWeight="500" textAnchor="middle">Potomac River</text>
      {towns.map((t) => (
        <g key={t.name}>
          <circle cx={t.x} cy={t.y} r={t.r} fill={t.fill} />
          <text x={t.x} y={t.y + 7} fill="#0b1f3a" fontSize="22" fontWeight="600" textAnchor="middle">
            {t.name}
          </text>
        </g>
      ))}
      <text x="24" y="356" fill="#cfe4f2" fontSize="15">Not to scale. Approximate positions only.</text>
      {/* compass */}
      <g transform="translate(596 336)" fill="#cfe4f2">
        <path d="M0 -22 L7 0 L0 -5 L-7 0 Z" />
        <text y="20" fontSize="14" textAnchor="middle">N</text>
      </g>
    </svg>
  )
}
