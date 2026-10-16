import { describe, expect, it } from 'vitest'

import { crearHabitosEjemplo } from '../../src/data/habitosEjemplo.js'
import { crearTextoRespaldoHabitos, leerTextoRespaldoHabitos } from '../../src/data/respaldoHabitos.js'

describe('respaldo de habitos', () => {
  it('crea un JSON versionado y recupera una copia independiente', () => {
    const habitos = crearHabitosEjemplo()
    const fechaExportacion = new Date('2026-07-21T12:30:00.000Z')
    const textoRespaldo = crearTextoRespaldoHabitos(habitos, fechaExportacion)
    const respaldo = JSON.parse(textoRespaldo)
    const habitosRecuperados = leerTextoRespaldoHabitos(textoRespaldo)

    expect(respaldo).toMatchObject({
      aplicacion: 'ritmo-diario',
      version: 1,
      fechaExportacion: '2026-07-21T12:30:00.000Z',
    })
    expect(habitosRecuperados).toEqual(habitos)
    expect(habitosRecuperados).not.toBe(habitos)
    expect(habitosRecuperados[0].completados).not.toBe(habitos[0].completados)
  })

  it.each([
    ['JSON roto', '{'],
    ['otra aplicación', '{"aplicacion":"otra","version":1,"fechaExportacion":"2026-07-21T00:00:00.000Z","habitos":[]}'],
    [
      'versión incompatible',
      '{"aplicacion":"ritmo-diario","version":2,"fechaExportacion":"2026-07-21T00:00:00.000Z","habitos":[]}',
    ],
    ['fecha inválida', '{"aplicacion":"ritmo-diario","version":1,"fechaExportacion":"sin-fecha","habitos":[]}'],
  ])('rechaza %s', (_caso, textoRespaldo) => {
    expect(() => leerTextoRespaldoHabitos(textoRespaldo)).toThrow(TypeError)
  })

  it('rechaza identificadores duplicados', () => {
    const habitos = crearHabitosEjemplo()
    habitos[1].id = habitos[0].id
    const textoRespaldo = JSON.stringify({
      aplicacion: 'ritmo-diario',
      version: 1,
      fechaExportacion: '2026-07-21T00:00:00.000Z',
      habitos,
    })

    expect(() => leerTextoRespaldoHabitos(textoRespaldo)).toThrow('El respaldo contiene hábitos no válidos.')
  })
})
