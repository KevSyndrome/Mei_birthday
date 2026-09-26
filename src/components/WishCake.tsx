import { Wind } from 'lucide-react'
import { useState } from 'react'
import { NAME, portal } from '../content'

function Cake({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 200 190" className="h-auto w-44 sm:w-52" aria-hidden>
      {/* resplandor */}
      <circle
        cx="100"
        cy="40"
        r="38"
        fill="url(#glow)"
        className="transition-opacity duration-700"
        opacity={lit ? 1 : 0}
      />
      <defs>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#d4af37" stopOpacity="0.45" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* vela */}
      <rect x="95" y="52" width="10" height="38" rx="3" fill="#f9cdd7" />
      <path d="M95 60l10-5M95 70l10-5M95 80l10-5" stroke="#f4a6b8" strokeWidth="2" />
      <line x1="100" y1="52" x2="100" y2="46" stroke="#555" strokeWidth="1.5" />
      {lit ? (
        <g className="flame">
          <path d="M100 18c7 9 9 16 9 20a9 9 0 0 1-18 0c0-4 2-11 9-20Z" fill="#f5c451" />
          <path d="M100 30c3 4 4 7 4 9a4 4 0 0 1-8 0c0-2 1-5 4-9Z" fill="#fff4d6" />
        </g>
      ) : (
        <g className="smoke" opacity="0">
          <path d="M100 44c-4-6 4-8 0-14s4-8 0-12" stroke="#aaa" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* piso superior */}
      <rect x="55" y="90" width="90" height="38" rx="8" fill="#2a2f3f" />
      <path
        d="M55 98c0-5 4-8 8-8h74c4 0 8 3 8 8v4c-6 0-6 8-12 8s-6-8-12-8-6 10-12 10-6-10-12-10-6 8-12 8-6-8-12-8-6 8-12 8-6-6-6-6Z"
        fill="#f4a6b8"
      />
      {/* piso inferior */}
      <rect x="30" y="128" width="140" height="44" rx="9" fill="#232838" />
      <path
        d="M30 137c0-5 4-9 9-9h122c5 0 9 4 9 9v3c-7 0-7 9-14 9s-7-9-14-9-7 11-14 11-7-11-14-11-7 9-14 9-7-9-14-9-7 11-14 11-7-11-14-11-7 9-14 9-7-7-7-7Z"
        fill="#f9cdd7"
      />
      <text
        x="100"
        y="165"
        textAnchor="middle"
        fontFamily="Playfair Display Variable, serif"
        fontStyle="italic"
        fontSize="14"
        fill="#d4af37"
      >
        {NAME}
      </text>
      {/* plato */}
      <ellipse cx="100" cy="176" rx="86" ry="8" fill="#d4af37" opacity="0.35" />
    </svg>
  )
}

export function WishCake({ onBlow }: { onBlow: () => void }) {
  const [lit, setLit] = useState(true)
  const w = portal.wish

  const blow = () => {
    setLit(false)
    onBlow()
  }

  return (
    <section className="card flex flex-col items-center gap-4 p-6 text-center">
      <div>
        <h2 className="font-serif text-2xl text-white">{w.title}</h2>
        <p className="mt-1 text-sm text-white/60">{lit ? w.subtitle : w.after}</p>
      </div>

      <button
        type="button"
        onClick={lit ? blow : undefined}
        tabIndex={-1}
        aria-hidden
        className={lit ? 'cursor-pointer' : 'cursor-default'}
      >
        <Cake lit={lit} />
      </button>

      {lit ? (
        <button
          type="button"
          onClick={blow}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-rose px-6 py-3 font-semibold text-ink transition active:scale-[0.98] sm:w-auto"
        >
          <Wind size={18} strokeWidth={1.75} />
          {w.button}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setLit(true)}
          className="text-xs text-white/50 underline-offset-4 hover:text-white hover:underline"
        >
          {w.relight}
        </button>
      )}
    </section>
  )
}
