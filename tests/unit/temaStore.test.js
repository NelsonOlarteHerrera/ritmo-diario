import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useTemaStore } from '../../src/stores/temaStore.js'

const CLAVE_TEMA = 'ritmo-diario:tema'

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

describe('store de tema', () => {
  beforeEach(() => {
    globalThis.localStorage = crearAlmacenamientoSimulado()
    setActivePinia(createPinia())
  })

  it('inicia en claro y materializa una preferencia valida', () => {
    const temaStore = useTemaStore()

    expect(temaStore.temaActual).toBe('claro')
    expect(temaStore.indTemaOscuro).toBe(false)
    expect(globalThis.localStorage.getItem(CLAVE_TEMA)).toBe('"claro"')
  })

  it('alterna el tema en ambos sentidos y persiste cada cambio', () => {
    const temaStore = useTemaStore()

    temaStore.alternarTema()
    expect(temaStore.temaActual).toBe('oscuro')
    expect(temaStore.indTemaOscuro).toBe(true)
    expect(globalThis.localStorage.getItem(CLAVE_TEMA)).toBe('"oscuro"')

    temaStore.alternarTema()
    expect(temaStore.temaActual).toBe('claro')
    expect(temaStore.indTemaOscuro).toBe(false)
    expect(globalThis.localStorage.getItem(CLAVE_TEMA)).toBe('"claro"')
  })

  it('recupera el tema oscuro al crear una nueva instancia', () => {
    const temaStoreInicial = useTemaStore()
    temaStoreInicial.alternarTema()

    setActivePinia(createPinia())
    const temaStoreRecargado = useTemaStore()

    expect(temaStoreRecargado.temaActual).toBe('oscuro')
    expect(temaStoreRecargado.indTemaOscuro).toBe(true)
  })
})
