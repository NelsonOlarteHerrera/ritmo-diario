import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

import { useAlmacenamientoLocal } from '../composables/useAlmacenamientoLocal.js'

const CLAVE_TEMA = 'ritmo-diario:tema'

function indTemaValido(tema) {
  return tema === 'claro' || tema === 'oscuro'
}

export const useTemaStore = defineStore('tema', () => {
  const almacenamiento = useAlmacenamientoLocal({
    clave: CLAVE_TEMA,
    validarValor: indTemaValido,
    valorPredeterminado: 'claro',
  })
  const temaActual = ref(almacenamiento.leer())
  const indTemaOscuro = computed(() => temaActual.value === 'oscuro')
  almacenamiento.guardar(temaActual.value)

  watch(temaActual, (nuevoTema) => almacenamiento.guardar(nuevoTema), { flush: 'sync' })

  function alternarTema() {
    temaActual.value = indTemaOscuro.value ? 'claro' : 'oscuro'
  }

  return {
    alternarTema,
    indTemaOscuro,
    temaActual,
  }
})
