import { Headphones, Music, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { portal } from '../content'
import type { Playlist } from '../hooks/usePlaylist'

function fmt(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function Equalizer({ on }: { on: boolean }) {
  return (
    <span aria-hidden className="flex h-4 items-end gap-[3px]">
      {[0, 0.2, 0.4, 0.1].map((d, i) => (
        <span
          key={i}
          data-on={on}
          className="eq-bar w-[3px] rounded-full bg-rose"
          style={{ height: '100%', animationDelay: `${d}s` }}
        />
      ))}
    </span>
  )
}

const iconBtn =
  'grid size-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white active:scale-95'

export function MusicPlayer({ p }: { p: Playlist }) {
  const song = p.tracks[p.current]
  const { current, duration } = p.progress

  return (
    <section className="card flex flex-col gap-4 p-5">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gold/80 uppercase">
        <Headphones size={13} strokeWidth={1.5} />
        {portal.music.title}
      </div>

      <div className="flex items-center gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-rose/10">
          <Equalizer on={p.playing} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-white">{song.title}</p>
          {song.artist && <p className="truncate text-xs text-white/50">{song.artist}</p>}
        </div>
        <div className="flex items-center">
          {p.tracks.length > 1 && (
            <button type="button" className={iconBtn} onClick={p.prev} aria-label="Anterior">
              <SkipBack size={18} strokeWidth={1.5} />
            </button>
          )}
          <button
            type="button"
            onClick={p.toggle}
            aria-label={p.playing ? 'Pausar' : 'Reproducir'}
            className="grid size-11 place-items-center rounded-full bg-rose text-ink transition active:scale-95"
          >
            {p.playing ? <Pause size={18} strokeWidth={2} /> : <Play size={18} strokeWidth={2} className="ml-0.5" />}
          </button>
          {p.tracks.length > 1 && (
            <button type="button" className={iconBtn} onClick={p.next} aria-label="Siguiente">
              <SkipForward size={18} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-white/40 tabular-nums">
        <span className="w-8">{fmt(current)}</span>
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={current}
          disabled={!duration}
          onChange={(e) => p.seek(Number(e.target.value))}
          aria-label="Posición de la canción"
          className="h-1 flex-1 cursor-pointer"
        />
        <span className="w-8 text-right">{fmt(duration)}</span>
      </div>

      {p.tracks.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {p.tracks.map((t, i) => (
            <button
              key={t.src}
              type="button"
              onClick={() => p.select(i)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                i === p.current
                  ? 'border-rose/60 bg-rose/15 text-rose'
                  : 'border-white/10 text-white/60 hover:text-white'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

/** Botón flotante: siempre a mano para poner o pausar la música mientras recorre la página. */
export function MusicFab({ p }: { p: Playlist }) {
  if (p.status !== 'ready' || p.needsTap) return null
  return (
    <button
      type="button"
      onClick={p.toggle}
      aria-label={p.playing ? 'Pausar música' : 'Poner música'}
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-30 flex h-12 animate-fade-in items-center gap-2 rounded-full border border-rose/30 bg-surface/90 px-4 text-sm text-rose shadow-lg shadow-black/40 backdrop-blur transition active:scale-95"
    >
      {p.playing ? (
        <>
          <Equalizer on />
          <Pause size={16} strokeWidth={1.75} />
        </>
      ) : (
        <>
          <Music size={16} strokeWidth={1.75} />
          {portal.music.fab}
        </>
      )}
    </button>
  )
}

export function MusicGate({ p }: { p: Playlist }) {
  if (p.status !== 'ready' || !p.needsTap) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      className="fixed inset-0 z-50 grid animate-fade-in place-items-center bg-ink/70 p-6 backdrop-blur-sm"
    >
      <div className="card flex w-full max-w-sm flex-col items-center gap-4 p-7 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-rose/15 text-rose">
          <Headphones size={24} strokeWidth={1.5} />
        </span>
        <h2 id="gate-title" className="font-serif text-2xl text-white">
          {portal.music.gateTitle}
        </h2>
        <p className="text-sm text-white/60">{portal.music.gateText}</p>
        <button
          type="button"
          autoFocus
          onClick={p.play}
          className="mt-2 w-full rounded-full bg-gradient-to-r from-rose to-gold px-6 py-3 font-semibold text-ink transition active:scale-[0.98]"
        >
          {portal.music.gatePlay}
        </button>
        <button type="button" onClick={p.dismissTap} className="text-xs text-white/50 hover:text-white">
          {portal.music.gateSkip}
        </button>
      </div>
    </div>
  )
}
