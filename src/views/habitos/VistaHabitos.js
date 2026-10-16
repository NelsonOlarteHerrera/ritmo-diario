import { computed, defineComponent, ref } from 'vue'
import BotonBase from '../../components/base/boton-base/BotonBase.vue'
import EstadoVacio from '../../components/base/estado-vacio/EstadoVacio.vue'
import AvisoEjemplos from '../../components/habitos/aviso-ejemplos/AvisoEjemplos.vue'
import DialogosHabito from '../../components/habitos/dialogos-habito/DialogosHabito.vue'
import FiltrosCategoria from '../../components/habitos/filtros-categoria/FiltrosCategoria.vue'
import TarjetaHabito from '../../components/habitos/tarjeta-habito/TarjetaHabito.vue'
import { useGestionHabitos } from '../../composables/useGestionHabitos.js'
import { useHabitoStore } from '../../stores/habitoStore.js'

export default defineComponent({
  name: 'VistaHabitos',
  components: { AvisoEjemplos, BotonBase, DialogosHabito, EstadoVacio, FiltrosCategoria, TarjetaHabito },
  setup() {
    const habitoStore = useHabitoStore()
    const categoriaSeleccionada = ref('todas')
    const habitosFiltrados = computed(() =>
      categoriaSeleccionada.value === 'todas'
        ? habitoStore.habitos
        : habitoStore.habitos.filter((habito) => habito.categoria === categoriaSeleccionada.value),
    )
    const textoCantidad = computed(
      () => `${habitosFiltrados.value.length} ${habitosFiltrados.value.length === 1 ? 'hábito' : 'hábitos'}`,
    )
    function cambiarCategoria(nuevaCategoria) {
      categoriaSeleccionada.value = nuevaCategoria
    }
    return {
      ...useGestionHabitos(habitoStore),
      cambiarCategoria,
      categoriaSeleccionada,
      habitoStore,
      habitosFiltrados,
      textoCantidad,
    }
  },
})
