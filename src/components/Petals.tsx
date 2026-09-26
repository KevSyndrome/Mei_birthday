import { useEffect, useRef, useState } from 'react'

const COLORS = ['#f4a6b8', '#f9cdd7', '#f4a6b8', '#ee8fa6', '#fbe3e9', '#d4af37', '#9bb0a5']

function makePetals(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 10 + Math.random() * 14,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    dur: 4.5 + Math.random() * 3.5,
    delay: Math.random() * 1.8,
    drift: (Math.random() - 0.5) * 160,
    rot: (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 360),
  }))
}

function Burst({ onDone }: { onDone: () => void }) {
  const [petals] = useState(() => makePetals(window.innerWidth < 640 ? 26 : 42))

  // Ref para que los re-renders del padre no reinicien el temporizador
  const done = useRef(onDone)
  useEffect(() => {
    done.current = onDone
  })
  useEffect(() => {
    const id = window.setTimeout(() => done.current(), 10500)
    return () => clearTimeout(id)
  }, [])

  return petals.map((p) => (
    <svg
      key={p.id}
      viewBox="0 0 20 28"
      className="petal absolute top-0"
      style={
        {
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 1.4,
          '--dur': `${p.dur}s`,
          '--delay': `${p.delay}s`,
          '--drift': `${p.drift}px`,
          '--rot': `${p.rot}deg`,
        } as React.CSSProperties
      }
    >
      <path d="M10 1C16 7 19 14 16 21c-2 4-4 6-6 6s-4-2-6-6C1 14 4 7 10 1Z" fill={p.color} opacity="0.9" />
      <path d="M10 5v18" stroke="#fff" strokeOpacity="0.25" strokeWidth="0.8" />
    </svg>
  ))
}

/** Capa de pétalos. Cada id en `bursts` es una lluvia independiente. */
export function Petals({ bursts, onDone }: { bursts: number[]; onDone: (id: number) => void }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {bursts.map((id) => (
        <Burst key={id} onDone={() => onDone(id)} />
      ))}
    </div>
  )
}
