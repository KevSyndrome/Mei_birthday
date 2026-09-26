import { ChevronDown, Gift, Moon, Sparkles, Wand2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NAME, countdown } from '../content'
import { useCountdown } from '../hooks/useCountdown'

const CLUE_ICONS = [Gift, Wand2]

function statusText(days: number, hours: number) {
  if (days > 1) return `Faltan ${days} días`
  if (days === 1) return 'Falta 1 día'
  if (hours > 0) return 'Hoy es la víspera'
  return 'Ya casi…'
}

function Unit({ value, label, accent }: { value: number; label: string; accent?: boolean }) {
  return (
    <div
      className={`card flex flex-col items-center gap-1 py-4 sm:py-6 ${accent ? 'ring-1 ring-gold/40' : ''}`}
    >
      <span
        className={`font-serif text-3xl tabular-nums sm:text-5xl ${accent ? 'text-gold' : 'text-white'}`}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] font-medium tracking-[0.1em] text-white/50 uppercase sm:text-xs sm:tracking-[0.18em]">
        {label}
      </span>
    </div>
  )
}

export function CountdownScreen({ target, onFinish }: { target: number; onFinish: () => void }) {
  const { done, days, hours, minutes, seconds } = useCountdown(target)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (done) onFinish()
  }, [done, onFinish])

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-8 px-4 pt-8 pb-12 sm:px-6 sm:pt-14">
      <header className="flex animate-fade-in items-center justify-center gap-2 text-xs tracking-[0.2em] text-gold/90 uppercase">
        <Sparkles size={14} strokeWidth={1.5} />
        {countdown.eyebrow}
      </header>

      <section className="flex animate-fade-up flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          {statusText(days, hours)}
        </span>
        <h1 className="font-serif text-3xl leading-tight text-balance text-white sm:text-5xl">
          {countdown.titleBefore} <em className="text-rose">{NAME}</em>
        </h1>
        <p className="max-w-sm text-sm text-white/60 sm:text-base">{countdown.subtitle}</p>
      </section>

      <section
        aria-label="Tiempo restante"
        className="grid animate-fade-up grid-cols-4 gap-2 [animation-delay:150ms] sm:gap-3"
      >
        <Unit value={days} label="Días" />
        <Unit value={hours} label="Horas" />
        <Unit value={minutes} label="Minutos" />
        <Unit value={seconds} label="Segundos" accent />
      </section>

      <p className="-mt-4 text-center text-xs text-balance text-white/45">{countdown.hint}</p>

      <section className="flex animate-fade-up flex-col gap-3 [animation-delay:300ms]">
        <h2 className="font-serif text-xl text-white">{countdown.cluesTitle}</h2>
        {countdown.clues.map((clue, i) => {
          const Icon = CLUE_ICONS[i % CLUE_ICONS.length]
          const isOpen = open === i
          return (
            <div key={i} className="card">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-rose">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <span className="flex-1">
                  <span className="block text-[10px] tracking-[0.18em] text-gold/80 uppercase">
                    Pista {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-white/90">{clue.title}</span>
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  className={`shrink-0 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div className="reveal" data-open={isOpen}>
                <div>
                  <p className="px-4 pb-4 pl-16 text-sm text-white/60">{clue.detail}</p>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <footer className="mt-auto flex flex-col items-center gap-2 pt-6 text-center">
        <Moon size={18} strokeWidth={1.5} className="text-gold/80" />
        <p className="font-serif text-lg text-white/85 italic">“{countdown.quote}”</p>
        <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">{countdown.quoteFooter}</p>
      </footer>
    </main>
  )
}
