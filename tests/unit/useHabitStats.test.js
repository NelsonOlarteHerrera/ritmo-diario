import { nextTick, ref } from 'vue'
import { describe, expect, it } from 'vitest'

import { useHabitStats } from '../../src/composables/useHabitStats.js'
import { COLORES_HABITO } from '../../src/data/coloresHabito.js'

function crearHabito({ completados = [], fechaCreacion = '2026-07-01' } = {}) {
  return {
    id: 'habito-prueba',
    nombre: 'Leer',
    descripcion: '',
    categoria: 'estudio',
    color: COLORES_HABITO[0].valor,
    activo: true,
    fechaCreacion,
    completados,
  }
}

describe('useHabitStats', () => {
  it('normaliza fechas sin duplicados, las ordena y no muta el habito', () => {
    const habito = crearHabito({
      completados: ['2026-07-20', '2026-07-18', '2026-07-20'],
    })
    const fechasOriginales = [...habito.completados]
    const estadisticas = useHabitStats(habito, '2026-07-20')

    expect(estadisticas.fechasCompletadas.value).toEqual(['2026-07-18', '2026-07-20'])
    expect(estadisticas.numDiasCompletados.value).toBe(2)
    expect(habito.completados).toEqual(fechasOriginales)
  })

  it('ofrece resultados seguros ante un habito incompatible', () => {
    const estadisticas = useHabitStats(null, '2026-07-20')

    expect(estadisticas.fechasCompletadas.value).toEqual([])
    expect(estadisticas.diasRecientes.value).toEqual([])
    expect(estadisticas.numDiasEvaluables.value).toBe(0)
    expect(estadisticas.numRachaActual.value).toBe(0)
    expect(estadisticas.numMejorRacha.value).toBe(0)
    expect(estadisticas.porcentajeCumplimiento.value).toBe(0)
  })

  it('calcula la racha actual terminada hoy o ayer y se detiene ante un hueco', () => {
    const terminadaHoy = useHabitStats(
      crearHabito({ completados: ['2026-07-17', '2026-07-18', '2026-07-19', '2026-07-20'] }),
      '2026-07-20',
    )
    const terminadaAyer = useHabitStats(
      crearHabito({ completados: ['2026-07-17', '2026-07-18', '2026-07-19'] }),
      '2026-07-20',
    )
    const conHueco = useHabitStats(crearHabito({ completados: ['2026-07-17', '2026-07-19'] }), '2026-07-20')

    expect(terminadaHoy.numRachaActual.value).toBe(4)
    expect(terminadaAyer.numRachaActual.value).toBe(3)
    expect(conHueco.numRachaActual.value).toBe(1)
  })

  it('calcula la mejor racha historica dentro del intervalo valido', () => {
    const estadisticas = useHabitStats(
      crearHabito({
        fechaCreacion: '2026-07-10',
        completados: ['2026-07-08', '2026-07-10', '2026-07-11', '2026-07-12', '2026-07-19', '2026-07-21'],
      }),
      '2026-07-20',
    )

    expect(estadisticas.numMejorRacha.value).toBe(3)
    expect(estadisticas.numRachaActual.value).toBe(1)
  })

  it('calcula el porcentaje inclusivo con redondeo y calendario UTC', () => {
    const estadisticas = useHabitStats(
      crearHabito({
        fechaCreacion: '2024-02-28',
        completados: ['2024-02-29'],
      }),
      '2024-03-01',
    )

    expect(estadisticas.numDiasEvaluables.value).toBe(3)
    expect(estadisticas.porcentajeCumplimiento.value).toBe(33)
  })

  it('devuelve un periodo vacio cuando la creacion es futura', () => {
    const estadisticas = useHabitStats(crearHabito({ fechaCreacion: '2026-07-21' }), '2026-07-20')

    expect(estadisticas.numDiasEvaluables.value).toBe(0)
    expect(estadisticas.diasRecientes.value).toEqual([])
    expect(estadisticas.porcentajeCumplimiento.value).toBe(0)
  })

  it('limita el historial reciente a catorce dias y marca cada estado', () => {
    const estadisticas = useHabitStats(crearHabito({ completados: ['2026-07-07', '2026-07-20'] }), '2026-07-20')

    expect(estadisticas.diasRecientes.value).toHaveLength(14)
    expect(estadisticas.diasRecientes.value[0]).toEqual({ fecha: '2026-07-07', indCompletado: true })
    expect(estadisticas.diasRecientes.value[13]).toEqual({ fecha: '2026-07-20', indCompletado: true })
    expect(estadisticas.diasRecientes.value[1]).toEqual({ fecha: '2026-07-08', indCompletado: false })
  })

  it('actualiza todas las metricas cuando cambia el historial reactivo', async () => {
    const habito = ref(
      crearHabito({
        fechaCreacion: '2026-07-18',
        completados: ['2026-07-18', '2026-07-19'],
      }),
    )
    const estadisticas = useHabitStats(habito, '2026-07-20')

    habito.value.completados.push('2026-07-20')
    await nextTick()

    expect(estadisticas.numDiasCompletados.value).toBe(3)
    expect(estadisticas.numRachaActual.value).toBe(3)
    expect(estadisticas.numMejorRacha.value).toBe(3)
    expect(estadisticas.porcentajeCumplimiento.value).toBe(100)
    expect(estadisticas.diasRecientes.value[2].indCompletado).toBe(true)
  })
})
