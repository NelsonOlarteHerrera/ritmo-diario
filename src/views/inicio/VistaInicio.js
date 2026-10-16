import { storeToRefs } from 'pinia'
import { computed, defineComponent } from 'vue'
import BotonBase from '../../components/base/boton-base/BotonBase.vue'
import EstadoVacio from '../../components/base/estado-vacio/EstadoVacio.vue'
import AvisoEjemplos from '../../components/habitos/aviso-ejemplos/AvisoEjemplos.vue'
import DialogosHabito from '../../components/habitos/dialogos-habito/DialogosHabito.vue'
import GraficoProgreso from '../../components/habitos/grafico-progreso/GraficoProgreso.vue'
import TarjetaHabito from '../../components/habitos/tarjeta-habito/TarjetaHabito.vue'
import { useGestionHabitos } from '../../composables/useGestionHabitos.js'
import { useHabitoStore } from '../../stores/habitoStore.js'

export default defineComponent({
  name: 'VistaInicio',
  components: { AvisoEjemplos, BotonBase, DialogosHabito, EstadoVacio, GraficoProgreso, TarjetaHabito },
  setup() {
    const habitoStore = useHabitoStore()
    // Prioriza pendientes al entrar sin mover la fila ni el foco al marcarla.
    const ordenInicial = new Map(
      [...habitoStore.habitosActivos]
        .sort(
          (a, b) => Number(habitoStore.indHabitoCompletadoHoy(a.id)) - Number(habitoStore.indHabitoCompletadoHoy(b.id)),
        )
        .map((habito, indice) => [habito.id, indice]),
    )
    const habitosParaHoy = computed(() =>
      [...habitoStore.habitosActivos].sort((a, b) => (ordenInicial.get(a.id) ?? -1) - (ordenInicial.get(b.id) ?? -1)),
    )
    const fechaVisible = new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' }).format(
      new Date(),
    )
    return { ...storeToRefs(habitoStore), ...useGestionHabitos(habitoStore), habitoStore, fechaVisible, habitosParaHoy }
  },
})
