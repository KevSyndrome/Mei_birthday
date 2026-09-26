import { useCallback, useEffect, useRef, useState } from 'react'
import type { Song } from '../content'

// Comprueba que el archivo exista de verdad. El servidor de desarrollo de Vite
// responde index.html (200) para rutas inexistentes, por eso se revisa el tipo.
async function exists(src: string) {
  try {
    const res = await fetch(src, { method: 'HEAD' })
    return res.ok && !(res.headers.get('content-type') ?? '').includes('text/html')
  } catch {
    return false
  }
}

export function usePlaylist(songs: Song[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [tracks, setTracks] = useState<Song[] | null>(null) // null = revisando
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)
  const [progress, setProgress] = useState({ current: 0, duration: 0 })
  // true mientras la intención sea que suene (autoplay inicial, play, siguiente…)
  const wantsPlay = useRef(true)
  const indexRef = useRef(0)
  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    let cancelled = false
    Promise.all(songs.map(async (s) => ((await exists(s.src)) ? s : null))).then((res) => {
      if (!cancelled) setTracks(res.filter((s): s is Song => s !== null))
    })
    return () => {
      cancelled = true
    }
  }, [songs])

  const count = tracks?.length ?? 0
  const ready = count > 0

  // Un solo elemento de audio mientras haya canciones
  useEffect(() => {
    if (!ready) return
    const audio = new Audio()
    audio.preload = 'auto'
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onTime = () =>
      setProgress({ current: audio.currentTime, duration: Number.isFinite(audio.duration) ? audio.duration : 0 })
    const onEnded = () => {
      wantsPlay.current = true
      setTracks((t) => (t ? [...t] : t)) // fuerza recarga aunque solo haya 1 canción
      setIndex((i) => i + 1)
    }
    // Formato no soportado o archivo corrupto: se quita de la lista.
    // Un fallo de red (internet inestable) no la quita; basta volver a darle play.
    const onError = () => {
      if (!audio.getAttribute('src')) return
      const code = audio.error?.code
      if (code === MediaError.MEDIA_ERR_NETWORK || code === MediaError.MEDIA_ERR_ABORTED) {
        setPlaying(false)
        return
      }
      setTracks((t) => t?.filter((_, i) => i !== indexRef.current % t.length) ?? t)
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onTime)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onTime)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [ready])

  const current = ready ? index % count : 0

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    wantsPlay.current = true
    // Si antes falló la red, recarga la canción antes de reintentar
    if (audio.error) audio.load()
    audio
      .play()
      .then(() => setNeedsTap(false))
      .catch((err: DOMException) => {
        // El navegador bloqueó el autoplay: se pide un toque
        if (err.name === 'NotAllowedError') setNeedsTap(true)
      })
  }, [])

  // Cambia de canción y, si corresponde, intenta reproducir
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !tracks?.length) return
    audio.src = tracks[current].src
    // Con una sola canción se repite sin fin hasta que la pausen
    audio.loop = tracks.length === 1
    setProgress({ current: 0, duration: 0 })
    if (wantsPlay.current) play()
  }, [current, tracks, play])

  const pause = useCallback(() => {
    wantsPlay.current = false
    audioRef.current?.pause()
  }, [])

  const select = useCallback(
    (i: number) => {
      wantsPlay.current = true
      if (i === current) play()
      else setIndex(i)
    },
    [current, play],
  )

  return {
    status: (tracks === null ? 'checking' : ready ? 'ready' : 'none') as 'checking' | 'ready' | 'none',
    tracks: tracks ?? [],
    current,
    playing,
    needsTap,
    progress,
    play,
    pause,
    toggle: () => (playing ? pause() : play()),
    next: () => select((current + 1) % count),
    prev: () => select((current - 1 + count) % count),
    select,
    seek: (t: number) => {
      if (audioRef.current) audioRef.current.currentTime = t
    },
    dismissTap: () => {
      wantsPlay.current = false
      setNeedsTap(false)
    },
  }
}

export type Playlist = ReturnType<typeof usePlaylist>
