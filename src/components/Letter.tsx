import { Mail } from 'lucide-react'
import { useState } from 'react'
import { NAME, portal } from '../content'

export function Letter() {
  const [open, setOpen] = useState(false)
  const l = portal.letter

  return (
    <section className="card overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-col items-center gap-4 p-6 text-center"
      >
        <div className="flex items-center gap-2 self-start text-[10px] tracking-[0.2em] text-gold/80 uppercase">
          <Mail size={13} strokeWidth={1.5} />
          Carta
        </div>

        {/* Sobre */}
        <div className={`relative h-28 w-44 transition-[margin] duration-500 ${open ? 'mt-14' : ''}`}>
          <div className="absolute inset-0 rounded-lg border border-white/10 bg-surface-2" />
          <svg viewBox="0 0 176 112" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <path d="M1 110 70 58M175 110 106 58" stroke="rgba(255,255,255,0.08)" fill="none" />
            <path
              d="M1 2 88 66 175 2"
              stroke="rgba(255,255,255,0.12)"
              fill="#1f2638"
              className="origin-top transition-transform duration-500"
              style={{ transformBox: 'fill-box', transform: open ? 'scaleY(-1)' : 'none' }}
            />
          </svg>
          <span
            className={`absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/3 place-items-center rounded-full bg-rose font-serif text-lg text-ink italic shadow-lg shadow-rose/20 transition ${
              open ? 'scale-75 opacity-0' : ''
            }`}
          >
            {NAME[0]}
          </span>
        </div>

        <div>
          <h2 className="font-serif text-xl text-white">{l.title}</h2>
          {!open && <p className="mt-1 text-xs text-white/50">{l.closedHint}</p>}
        </div>
      </button>

      <div className="reveal" data-open={open}>
        <div>
          <article className="mx-4 mb-4 rounded-xl bg-[#f7efe9] px-6 py-7 text-[#3a2f36] sm:mx-6 sm:px-8">
            <p className="font-serif text-xl italic">{l.greeting}</p>
            {l.paragraphs.map((text, i) => (
              <p key={i} className="mt-4 text-[15px] leading-relaxed">
                {text}
              </p>
            ))}
            <p className="mt-6 text-sm">
              {l.signoff}
              {l.from ? ',' : ''}
            </p>
            {l.from && <p className="font-serif text-lg text-[#c0607a] italic">{l.from}</p>}
          </article>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mx-auto mb-5 block text-xs text-white/50 hover:text-white"
          >
            {l.closeButton}
          </button>
        </div>
      </div>
    </section>
  )
}
