import { storeToRefs } from 'pinia'
import { computed, defineComponent, ref } from 'vue'

import BotonBase from '../../components/base/boton-base/BotonBase.vue'
import EstadoVacio from '../../components/base/estado-vacio/EstadoVacio.vue'
import AvisoEjemplos from '../../components/habitos/aviso-ejemplos/AvisoEjemplos.vue'
import ModalBase from '../../components/base/modal-base/ModalBase.vue'
import TarjetaEstadisticaHabito from '../../components/estadisticas/tarjeta-estadistica-habito/TarjetaEstadisticaHabito.vue'
import { useHabitoStore } from '../../stores/habitoStore.js'
import { useAnuncioAccesible } from '../../composables/useAnuncioAccesible.js'

export default defineComponent({
  name: 'VistaEstadisticas',
  components: { AvisoEjemplos, BotonBase, EstadoVacio, ModalBase, TarjetaEstadisticaHabito },
  setup() {
    const habitoStore = useHabitoStore()
    const { habitos } = storeToRefs(habitoStore)
    const cambioHistorico = ref(null)
    const mensajeEstado = ref('')
    const habitoCambioHistorico = computed(() => {
      if (!cambioHistorico.value) return null
      return habitoStore.habitos.find((habito) => habito.id === cambioHistorico.value.idHabito) ?? null
    })
    const indFechaMarcada = computed(
      () => habitoCambioHistorico.value?.completados.includes(cambioHistorico.value?.fecha) ?? false,
    )

    function formatearFechaVisible(fecha) {
      const [numAnio, numMes, numDia] = fecha.split('-').map(Number)

      return new Intl.DateTimeFormat('es-PE', {
        dateStyle: 'long',
        timeZone: 'UTC',
      }).format(new Date(Date.UTC(numAnio, numMes - 1, numDia)))
    }

    function solicitarCambioHistorico(solicitud) {
      cambioHistorico.value = solicitud
    }

    function cancelarCambioHistorico() {
      cambioHistorico.value = null
    }

    function confirmarCambioHistorico() {
      if (!cambioHistorico.value || !habitoCambioHistorico.value) return

      const { fecha, idHabito } = cambioHistorico.value
      const nombreHabito = habitoCambioHistorico.value.nombre
      const nuevoEstado = indFechaMarcada.value ? 'pendiente' : 'completado'
      const indActualizado = habitoStore.alternarCumplimientoFecha(idHabito, fecha)
      cambioHistorico.value = null
      mensajeEstado.value = indActualizado
        ? `“${nombreHabito}” quedó como ${nuevoEstado} para el ${formatearFechaVisible(fecha)}.`
        : 'No fue posible actualizar esa fecha. Inténtalo nuevamente.'
    }

    return {
      cancelarCambioHistorico,
      cambioHistorico,
      confirmarCambioHistorico,
      fechaCambioVisible: computed(() =>
        cambioHistorico.value ? formatearFechaVisible(cambioHistorico.value.fecha) : '',
      ),
      habitoCambioHistorico,
      habitos,
      indFechaMarcada,
      mensajeEstado,
      anuncioEstado: useAnuncioAccesible(mensajeEstado),
      solicitarCambioHistorico,
    }
  },
})
