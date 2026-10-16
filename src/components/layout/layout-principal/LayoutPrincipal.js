import { storeToRefs } from 'pinia'
import { defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { useTemaStore } from '../../../stores/temaStore'
import MarcaAplicacion from '../marca-aplicacion/MarcaAplicacion.vue'
import NavegacionPrincipal from '../navegacion-principal/NavegacionPrincipal.vue'
import SelectorTema from '../selector-tema/SelectorTema.vue'

export default defineComponent({
  name: 'LayoutPrincipal',
  components: {
    MarcaAplicacion,
    NavegacionPrincipal,
    RouterView,
    SelectorTema,
  },
  setup() {
    const enrutador = useRouter()
    const contenidoPrincipal = ref(null)
    const temaStore = useTemaStore()
    const { indTemaOscuro, temaActual } = storeToRefs(temaStore)

    watch(
      temaActual,
      (nuevoTema) => {
        document.documentElement.dataset.tema = nuevoTema
      },
      { immediate: true },
    )

    const retirarEnfoque = enrutador.afterEach(async (destino, origen, fallo) => {
      if (fallo || !origen.matched.length || destino.path === origen.path) return
      await nextTick()
      contenidoPrincipal.value?.focus()
    })
    onBeforeUnmount(retirarEnfoque)

    return {
      alternarTema: temaStore.alternarTema,
      contenidoPrincipal,
      indTemaOscuro,
    }
  },
})
