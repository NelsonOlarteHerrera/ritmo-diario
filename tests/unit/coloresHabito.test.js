import { describe, expect, it } from 'vitest'

import { COLORES_HABITO, indColorHabitoValido, obtenerClaseColorHabito } from '../../src/data/coloresHabito.js'
import { indHabitoValido } from '../../src/data/validadoresHabito.js'

describe('colores de habito', () => {
  it('mantiene un catalogo cerrado con valores y clases unicos', () => {
    expect(COLORES_HABITO).toHaveLength(4)
    expect(new Set(COLORES_HABITO.map((color) => color.valor))).toHaveProperty('size', 4)
    expect(new Set(COLORES_HABITO.map((color) => color.clase))).toHaveProperty('size', 4)
  })

  it.each(COLORES_HABITO)('resuelve $etiqueta como clase $clase', ({ clase, valor }) => {
    expect(indColorHabitoValido(valor)).toBe(true)
    expect(obtenerClaseColorHabito(valor)).toBe(clase)
  })

  it('rechaza colores ajenos al catalogo en la entidad de dominio', () => {
    const habito = {
      id: 'habito-prueba',
      nombre: 'Leer',
      descripcion: '',
      categoria: 'estudio',
      color: '#123456',
      activo: true,
      fechaCreacion: '2026-07-20',
      completados: [],
    }

    expect(indColorHabitoValido(habito.color)).toBe(false)
    expect(indHabitoValido(habito)).toBe(false)
  })
})
