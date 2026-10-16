import { indListaHabitosValida } from './validadoresHabito.js'

const IDENTIFICADOR_APLICACION = 'ritmo-diario'
const VERSION_RESPALDO = 1

function copiarHabitos(habitos) {
  return habitos.map((habito) => ({
    ...habito,
    completados: [...habito.completados],
  }))
}

export function crearTextoRespaldoHabitos(habitos, fechaExportacion = new Date()) {
  if (!indListaHabitosValida(habitos) || Number.isNaN(fechaExportacion.getTime())) {
    throw new TypeError('No se puede crear un respaldo con datos inválidos.')
  }

  return JSON.stringify(
    {
      aplicacion: IDENTIFICADOR_APLICACION,
      version: VERSION_RESPALDO,
      fechaExportacion: fechaExportacion.toISOString(),
      habitos: copiarHabitos(habitos),
    },
    null,
    2,
  )
}

export function leerTextoRespaldoHabitos(textoRespaldo) {
  let respaldo

  try {
    respaldo = JSON.parse(textoRespaldo)
  } catch {
    throw new TypeError('No se pudo leer el archivo. Selecciona un respaldo de Ritmo Diario (.json).')
  }

  if (respaldo === null || typeof respaldo !== 'object' || Array.isArray(respaldo)) {
    throw new TypeError('El archivo no es un respaldo de Ritmo Diario. Selecciona otro respaldo.')
  }

  if (respaldo.aplicacion !== IDENTIFICADOR_APLICACION || respaldo.version !== VERSION_RESPALDO) {
    throw new TypeError('El archivo no corresponde a esta versión de Ritmo Diario. Selecciona otro respaldo.')
  }

  if (typeof respaldo.fechaExportacion !== 'string' || Number.isNaN(Date.parse(respaldo.fechaExportacion))) {
    throw new TypeError('Al respaldo le falta una fecha válida. Selecciona otro respaldo.')
  }

  if (!indListaHabitosValida(respaldo.habitos)) {
    throw new TypeError('El respaldo contiene hábitos no válidos. Selecciona otro respaldo.')
  }

  return copiarHabitos(respaldo.habitos)
}
