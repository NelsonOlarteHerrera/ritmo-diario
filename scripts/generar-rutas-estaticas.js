import { copyFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const RUTAS_PUBLICAS = ['habitos', 'estadisticas', 'configuracion']
const carpetaDistribucion = join(process.cwd(), 'dist')
const archivoEntrada = join(carpetaDistribucion, 'index.html')

for (const nomRuta of RUTAS_PUBLICAS) {
  const carpetaRuta = join(carpetaDistribucion, nomRuta)

  mkdirSync(carpetaRuta, { recursive: true })
  copyFileSync(archivoEntrada, join(carpetaRuta, 'index.html'))
}

console.info('Rutas estaticas generadas para GitHub Pages.')
