import { COLORES_HABITO } from './coloresHabito.js'

export const IDS_HABITOS_EJEMPLO = Object.freeze({
  movimiento: 'habito-ejemplo-movimiento',
  lectura: 'habito-ejemplo-lectura',
  planificacion: 'habito-ejemplo-planificacion',
})

function obtenerFechaRelativa(numDiasAnteriores) {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() - numDiasAnteriores)

  const numAnio = fecha.getFullYear()
  const numMes = String(fecha.getMonth() + 1).padStart(2, '0')
  const numDia = String(fecha.getDate()).padStart(2, '0')

  return `${numAnio}-${numMes}-${numDia}`
}

export function crearHabitosEjemplo() {
  return [
    {
      id: IDS_HABITOS_EJEMPLO.movimiento,
      nombre: 'Moverme durante 30 minutos',
      descripcion: 'Caminar, entrenar o realizar una actividad que mantenga el cuerpo activo.',
      categoria: 'salud',
      color: COLORES_HABITO[0].valor,
      activo: true,
      fechaCreacion: obtenerFechaRelativa(12),
      completados: [0, 1, 3, 4, 5].map(obtenerFechaRelativa),
    },
    {
      id: IDS_HABITOS_EJEMPLO.lectura,
      nombre: 'Leer 20 minutos',
      descripcion: 'Reservar un momento diario para avanzar una lectura sin interrupciones.',
      categoria: 'estudio',
      color: COLORES_HABITO[1].valor,
      activo: true,
      fechaCreacion: obtenerFechaRelativa(9),
      completados: [0, 2, 3, 6].map(obtenerFechaRelativa),
    },
    {
      id: IDS_HABITOS_EJEMPLO.planificacion,
      nombre: 'Planificar el día siguiente',
      descripcion: 'Definir por la noche las tres prioridades principales del próximo día.',
      categoria: 'trabajo',
      color: COLORES_HABITO[2].valor,
      activo: true,
      fechaCreacion: obtenerFechaRelativa(7),
      completados: [1, 2, 4, 6].map(obtenerFechaRelativa),
    },
  ]
}
