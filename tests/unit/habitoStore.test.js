import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { crearHabitosEjemplo } from '../../src/data/habitosEjemplo.js'
import { useHabitStats } from '../../src/composables/useHabitStats.js'
import { useHabitoStore } from '../../src/stores/habitoStore.js'

const CLAVE_HABITOS = 'ritmo-diario:habitos'

function crearAlmacenamientoSimulado() {
  const valores = new Map()

  return {
    getItem(clave) {
      return valores.has(clave) ? valores.get(clave) : null
    },
    removeItem(clave) {
      valores.delete(clave)
    },
    setItem(clave, valor) {
      valores.set(clave, String(valor))
    },
  }
}

describe('reinicio de habitos', () => {
  beforeEach(() => {
    globalThis.localStorage = crearAlmacenamientoSimulado()
    setActivePinia(createPinia())
  })

  it('restaura tres ejemplos nuevos y persiste el resultado', () => {
    const habitoStore = useHabitoStore()
    const habitosIniciales = habitoStore.habitos

    habitoStore.crearHabito({
      nombre: 'Hábito temporal',
      descripcion: 'Debe desaparecer al reiniciar.',
      categoria: 'personal',
      color: '#2f7d6d',
    })
    habitoStore.alternarCumplimientoHoy('habito-ejemplo-planificacion')

    expect(habitoStore.habitos).toHaveLength(4)
    expect(habitoStore.reiniciarHabitos()).toBe(true)
    expect(habitoStore.habitos).toHaveLength(3)
    expect(habitoStore.habitos).not.toBe(habitosIniciales)
    expect(habitoStore.habitos.map((habito) => habito.id)).toEqual([
      'habito-ejemplo-movimiento',
      'habito-ejemplo-lectura',
      'habito-ejemplo-planificacion',
    ])

    const habitosPersistidos = JSON.parse(globalThis.localStorage.getItem(CLAVE_HABITOS))
    expect(habitosPersistidos).toEqual(habitoStore.habitos)
  })

  it('importa una lista valida mediante una copia persistida', () => {
    const habitoStore = useHabitoStore()
    const habitosImportar = crearHabitosEjemplo().slice(0, 1)

    expect(habitoStore.importarHabitos(habitosImportar)).toBe(true)
    expect(habitoStore.habitos).toEqual(habitosImportar)
    expect(habitoStore.habitos).not.toBe(habitosImportar)
    expect(habitoStore.habitos[0].completados).not.toBe(habitosImportar[0].completados)
    expect(JSON.parse(globalThis.localStorage.getItem(CLAVE_HABITOS))).toEqual(habitosImportar)
  })

  it('rechaza una importacion invalida sin cambiar la coleccion', () => {
    const habitoStore = useHabitoStore()
    const habitosAnteriores = [...habitoStore.habitos]
    const habitosDuplicados = crearHabitosEjemplo()
    habitosDuplicados[1].id = habitosDuplicados[0].id

    expect(habitoStore.importarHabitos(habitosDuplicados)).toBe(false)
    expect(habitoStore.habitos).toEqual(habitosAnteriores)
  })

  it('alterna y persiste el cumplimiento de una fecha historica', () => {
    const habitoStore = useHabitoStore()
    const idHabito = habitoStore.habitos[0].id
    const fechaHistorica = habitoStore.habitos[0].fechaCreacion

    expect(habitoStore.alternarCumplimientoFecha(idHabito, fechaHistorica)).toBe(true)
    expect(habitoStore.habitos[0].completados).toContain(fechaHistorica)
    expect(JSON.parse(globalThis.localStorage.getItem(CLAVE_HABITOS))[0].completados).toContain(fechaHistorica)

    expect(habitoStore.alternarCumplimientoFecha(idHabito, fechaHistorica)).toBe(true)
    expect(habitoStore.habitos[0].completados).not.toContain(fechaHistorica)
  })

  it('rechaza una fecha historica incompatible sin mutar el habito', () => {
    const habitoStore = useHabitoStore()
    const habito = habitoStore.habitos[0]
    const completadosAnteriores = [...habito.completados]

    expect(habitoStore.alternarCumplimientoFecha(habito.id, '01/07/2026')).toBe(false)
    expect(habito.completados).toEqual(completadosAnteriores)
  })

  it('rechaza cambios anteriores a la creacion y posteriores a hoy', () => {
    const habitoStore = useHabitoStore()
    const habito = habitoStore.habitos[0]
    const completadosAnteriores = [...habito.completados]

    expect(habitoStore.alternarCumplimientoFecha(habito.id, '2000-01-01')).toBe(false)
    expect(habitoStore.alternarCumplimientoFecha(habito.id, '9999-12-31')).toBe(false)
    expect(habito.completados).toEqual(completadosAnteriores)
  })

  it('rechaza una fecha inexistente aunque respete el formato persistido', () => {
    const habitoStore = useHabitoStore()
    const habito = habitoStore.habitos[0]
    const completadosAnteriores = [...habito.completados]

    expect(habitoStore.alternarCumplimientoFecha(habito.id, '2026-02-31')).toBe(false)
    expect(habito.completados).toEqual(completadosAnteriores)
  })

  it('recalcula las estadisticas al confirmar una alternancia valida', () => {
    const habitoStore = useHabitoStore()
    const habito = habitoStore.habitos[0]
    const estadisticas = useHabitStats(() => habitoStore.habitos[0])
    const numCompletadosAnterior = estadisticas.numDiasCompletados.value
    const porcentajeAnterior = estadisticas.porcentajeCumplimiento.value

    expect(habitoStore.alternarCumplimientoFecha(habito.id, habito.fechaCreacion)).toBe(true)
    expect(estadisticas.numDiasCompletados.value).toBe(numCompletadosAnterior + 1)
    expect(estadisticas.porcentajeCumplimiento.value).toBeGreaterThan(porcentajeAnterior)
  })
})
