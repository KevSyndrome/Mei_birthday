import { useState } from 'react'

const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#d4af37', '#f4a6b8']

function makeStars(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() < 0.85 ? 1 + Math.random() : 2 + Math.random() * 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    dur: 2.5 + Math.random() * 4,
    delay: -Math.random() * 6,
  }))
}

export function Starfield({ count = 90 }: { count?: number }) {
  const [stars] = useState(() => makeStars(count))

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Nebulosa suave */}
      <div className="absolute -top-1/4 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,97,255,0.16),transparent_60%)]" />
      <div className="absolute -bottom-1/3 -left-1/4 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(244,166,184,0.10),transparent_60%)]" />
      {stars.map((s) => (
        <span
          key={s.id}
          className="star absolute rounded-full"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background: s.color,
              boxShadow: s.size > 2 ? `0 0 6px ${s.color}` : undefined,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
