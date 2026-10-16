import { indColorHabitoValido } from './coloresHabito.js'

const CATEGORIAS_HABITO = ['salud', 'estudio', 'trabajo', 'personal']
const PATRON_FECHA = /^\d{4}-\d{2}-\d{2}$/

function indTextoNoVacio(valor) {
  return typeof valor === 'string' && valor.trim() !== ''
}

export function indHabitoValido(habito) {
  if (habito === null || typeof habito !== 'object' || Array.isArray(habito)) {
    return false
  }

  return (
    indTextoNoVacio(habito.id) &&
    indTextoNoVacio(habito.nombre) &&
    typeof habito.descripcion === 'string' &&
    CATEGORIAS_HABITO.includes(habito.categoria) &&
    indColorHabitoValido(habito.color) &&
    typeof habito.activo === 'boolean' &&
    PATRON_FECHA.test(habito.fechaCreacion) &&
    Array.isArray(habito.completados) &&
    habito.completados.every((fecha) => PATRON_FECHA.test(fecha))
  )
}

export function indListaHabitosValida(habitos) {
  if (!Array.isArray(habitos) || !habitos.every(indHabitoValido)) {
    return false
  }

  return new Set(habitos.map((habito) => habito.id)).size === habitos.length
}
