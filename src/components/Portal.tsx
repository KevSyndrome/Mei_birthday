import { Flower2, Heart, MessageCircle, Moon, Smile, Sparkles, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { NAME, portal, songs } from '../content'
import { usePlaylist } from '../hooks/usePlaylist'
import { Letter } from './Letter'
import { MusicGate, MusicPlayer } from './MusicPlayer'
import { Petals } from './Petals'
import { WishCake } from './WishCake'

const REASON_ICONS = {
  smile: Smile,
  heart: Heart,
  sparkles: Sparkles,
  flower: Flower2,
  star: Star,
  moon: Moon,
  message: MessageCircle,
} as const

export function Portal() {
  const playlist = usePlaylist(songs)
  const [bursts, setBursts] = useState<number[]>([])

  const launch = useCallback(() => setBursts((b) => [...b.slice(-3), Date.now() + Math.random()]), [])
  const clear = useCallback((id: number) => setBursts((b) => b.filter((x) => x !== id)), [])

  // Lluvia de bienvenida
  useEffect(() => {
    const id = window.setTimeout(launch, 400)
    return () => clearTimeout(id)
  }, [launch])

  return (
    <>
      <main className="mx-auto flex min-h-dvh w-full max-w-xl animate-fade-in flex-col gap-5 px-4 pt-8 pb-14 sm:px-6 sm:pt-14 lg:max-w-5xl">
        <section className="flex animate-fade-up flex-col items-center gap-4 py-6 text-center lg:py-10">
          <span className="rounded-full border border-gold/30 px-3 py-1 text-[10px] tracking-[0.25em] text-gold uppercase">
            {portal.dateLabel}
          </span>
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-6xl">
            {portal.title} <em className="text-rose">{NAME}!</em>
          </h1>
          <p className="max-w-md text-sm text-white/65 sm:text-base">{portal.intro}</p>
          <div className="flex items-center gap-3 text-rose/70" aria-hidden>
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-rose/50" />
            <Flower2 size={16} strokeWidth={1.25} />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-rose/50" />
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-5">
            {playlist.status === 'ready' && <MusicPlayer p={playlist} />}
            <WishCake onBlow={launch} />
          </div>
          <Letter />
        </div>

        <section className="flex flex-col gap-3 pt-4">
          <h2 className="font-serif text-2xl text-white">{portal.reasonsTitle}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {portal.reasons.map((r, i) => {
              const Icon = REASON_ICONS[r.icon as keyof typeof REASON_ICONS] ?? Heart
              return (
                <article key={i} className="card flex items-center gap-4 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-rose/25 text-rose">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-white">{r.title}</h3>
                    {r.text && <p className="mt-1 text-sm leading-relaxed text-white/60">{r.text}</p>}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <footer className="flex flex-col items-center gap-5 pt-8 text-center">
          <p className="max-w-md font-serif text-xl text-white/85 italic">“{portal.closing.quote}”</p>
          <button
            type="button"
            onClick={launch}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-gold px-7 py-3 font-semibold text-ink shadow-lg shadow-rose/15 transition active:scale-[0.98]"
          >
            <Flower2 size={18} strokeWidth={1.75} />
            {portal.closing.button}
          </button>
        </footer>
      </main>

      <Petals bursts={bursts} onDone={clear} />
      <MusicGate p={playlist} />
    </>
  )
}
