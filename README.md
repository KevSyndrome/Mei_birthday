# Para Mei

Cuenta regresiva + portal de cumpleaños. Vite + React + Tailwind.

## Editar
- **Todos los textos, la fecha y la lista de canciones:** `src/content.ts`
- **Música:** pon los mp3 en la carpeta `audios/`. Se agregan solos; el nombre del archivo es
  el título (`1 - Título - Artista.mp3`). Si no hay ninguno, no aparece el reproductor.

## Probar en local
```bash
npm install
npm run dev                       # cuenta regresiva
# http://localhost:5173/?preview  → ver el portal (solo funciona en local)
```

## Publicar en Vercel
1. Sube la carpeta a un repositorio de GitHub.
2. En vercel.com → Add New → Project → importa el repo.
3. Vercel detecta Vite solo (build `npm run build`, salida `dist`). Deploy.
