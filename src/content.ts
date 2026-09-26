// ─────────────────────────────────────────────────────────────
//  TODO EL TEXTO DE LA PÁGINA VIVE AQUÍ.
//  Cambia lo que quieras sin tocar los componentes.
// ─────────────────────────────────────────────────────────────

export const NAME = 'Mei'

// Medianoche del 27 de septiembre de 2026 en Playa del Carmen.
// Quintana Roo está en UTC-5 todo el año (no cambia de horario),
// así que el portal se abre a esa hora exacta sin importar dónde esté ella.
export const OPENS_AT = '2026-09-27T00:00:00-05:00'

export const countdown = {
  eyebrow: 'Algo especial se está preparando',
  titleBefore: 'Contando cada segundo hasta tu día especial,',
  subtitle: 'Para alguien que ilumina el universo con solo sonreír.',
  hint: 'Cuando el contador llegue a cero, esta página se abrirá sola.',
  cluesTitle: 'Pistas sobre lo que te espera',
  clues: [
    {
      title: 'Algo que dijiste que no era necesario…',
      detail: 'Pero para mí sí lo era.',
    },
    {
      title: 'Un deseo esperando a ser pedido…',
      detail: 'Guárdalo bien, lo vas a necesitar a medianoche.',
    },
  ],
  quote: 'Que las estrellas velen tus sueños hasta que llegue tu día',
  quoteFooter: 'Con todo el cariño del mundo',
}

export const portal = {
  dateLabel: '27 · 09 · 2026',
  title: '¡Feliz cumpleaños,',
  intro:
    'Hoy el universo florece para celebrarte a ti: tu vida, tu calidez y lo increíblemente especial que eres.',

  wish: {
    title: 'Pide un deseo',
    subtitle: 'Cierra los ojos, piensa en algo bonito y apaga la vela.',
    button: 'Apagar la vela',
    after:
      'Espero que sigas cumpliendo muchos años más, que en esos años yo esté a tu lado y, sobre todo, que se cumplan todos tus deseos.',
    relight: 'Encenderla otra vez',
  },

  letter: {
    title: 'Una carta escrita con el corazón',
    closedHint: 'Toca el sobre para abrirla',
    greeting: 'Querida Mei:',
    paragraphs: [
      'A lo largo del tiempo que nos hemos conocido, siempre me has parecido una persona súper increíble, y no termino de sorprenderme contigo.',
      'Sé que hubo veces en las que no todo estuvo bien, pero me alegra que ya no sea así y que hoy pueda hablarte y seguir aprendiendo muchas cosas de ti. Te adoro y eres súper especial para mí.',
      'Sé que me dijiste que no era necesario ningún regalo, pero no lo hago por compromiso, sino porque eres tan especial para mí que, si pudiera, te daría muchas cosas más.',
      'Espero que al menos este pequeño detalle te guste. Habrá más, pero así ves una parte de lo que soy y de lo que hago.',
      'Te amo, Mei, y te quiero muchísimo 💕💕',
    ],
    signoff: 'Con todo mi cariño',
    // Tu nombre o apodo para firmar. Si lo dejas vacío, no se muestra.
    from: '',
    closeButton: 'Guardar la carta',
  },

  reasonsTitle: 'Por qué eres tan especial',
  // icon: smile | heart | sparkles | flower | star | moon | message
  // text es opcional
  reasons: [
    { icon: 'smile', title: 'Eres una increíble persona, papu', text: '' },
    { icon: 'message', title: 'Me encanta poder hablarte/escribirte', text: '' },
    { icon: 'heart', title: 'Te quiero muchísimooo <3', text: '' },
    { icon: 'sparkles', title: 'Eres el six de mi seven', text: '' },
  ],

  closing: {
    quote: 'Que este nuevo año te regrese todo lo bonito que das.',
    button: 'Lanzar pétalos',
  },

  music: {
    title: 'Música para ti',
    gateTitle: 'Esta sorpresa suena mejor con música',
    gateText: 'Sube un poco el volumen.',
    gatePlay: 'Tocar para escuchar',
    gateSkip: 'Continuar sin música',
    fab: 'Poner música',
  },
}

// ─── Canciones ───────────────────────────────────────────────
// Pon los archivos en la carpeta audios/ (en la raíz del proyecto).
// Se toman solos, en orden alfabético, y el nombre del archivo es el título:
//   "1 - Flores para ti - Artista.mp3" → título "Flores para ti", artista "Artista"
// (el número inicial solo sirve para ordenar y no se muestra).
// Si la carpeta está vacía, el reproductor no aparece.
const files = import.meta.glob('../audios/*.{mp3,m4a,ogg,wav}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export type Song = { title: string; artist: string; src: string }

export const songs: Song[] = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const name = path
      .split('/')
      .pop()!
      .replace(/\.[^.]+$/, '')
      .replace(/^\d+\s*[-._)]\s*/, '')
    const [title, ...artist] = name.split(' - ')
    return { title: title.trim(), artist: artist.join(' - ').trim(), src }
  })
