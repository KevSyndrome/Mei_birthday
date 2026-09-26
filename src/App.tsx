import { useCallback, useState } from 'react'
import { OPENS_AT } from './content'
import { CountdownScreen } from './components/CountdownScreen'
import { Portal } from './components/Portal'
import { Starfield } from './components/Starfield'

const TARGET = Date.parse(OPENS_AT)

// Solo en desarrollo (npm run dev): http://localhost:5173/?preview abre el portal.
// En la versión publicada esto no existe: el portal solo abre al llegar la fecha.
const devPreview = import.meta.env.DEV && new URLSearchParams(location.search).has('preview')

export default function App() {
  const [open, setOpen] = useState(() => devPreview || Date.now() >= TARGET)
  const finish = useCallback(() => setOpen(true), [])

  return (
    <>
      <Starfield />
      {open ? <Portal /> : <CountdownScreen target={TARGET} onFinish={finish} />}
    </>
  )
}
