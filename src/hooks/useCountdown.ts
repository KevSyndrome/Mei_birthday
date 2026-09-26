import { useEffect, useState } from 'react'

export function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    let id: number
    // Se alinea al inicio de cada segundo para que el contador no "salte"
    const schedule = () => {
      id = window.setTimeout(() => {
        setNow(Date.now())
        schedule()
      }, 1000 - (Date.now() % 1000) + 5)
    }
    schedule()
    // Al volver a la pestaña (o desbloquear el celular) actualiza de inmediato
    const onVisible = () => document.visibilityState === 'visible' && setNow(Date.now())
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearTimeout(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  const total = Math.max(0, Math.ceil((target - now) / 1000))
  return {
    done: total === 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}
