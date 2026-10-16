import { computed, defineComponent, onBeforeUnmount, onMounted, ref, useId } from 'vue'

import { useHabitStats } from '../../../composables/useHabitStats.js'
import { obtenerClaseColorHabito } from '../../../data/coloresHabito.js'
import { indHabitoValido } from '../../../data/validadoresHabito.js'

function convertirFecha(fecha) {
  const [numAnio, numMes, numDia] = fecha.split('-').map(Number)

  return new Date(Date.UTC(numAnio, numMes - 1, numDia))
}

function formatearFechaCorta(fecha) {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(convertirFecha(fecha))
}

function formatearDiaBreve(fecha) {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    weekday: 'short',
    timeZone: 'UTC',
  })
    .format(convertirFecha(fecha))
    .replace('.', '')
}

function describirDia(dia) {
  const fechaVisible = new Intl.DateTimeFormat('es-PE', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(convertirFecha(dia.fecha))

  return `${fechaVisible}: ${dia.indCompletado ? 'completado' : 'pendiente'}`
}

function obtenerFechaLocalActual() {
  const fechaActual = new Date()
  const numAnio = fechaActual.getFullYear()
  const numMes = String(fechaActual.getMonth() + 1).padStart(2, '0')
  const numDia = String(fechaActual.getDate()).padStart(2, '0')

  return `${numAnio}-${numMes}-${numDia}`
}

export default defineComponent({
  name: 'TarjetaEstadisticaHabito',
  props: {
    habito: {
      type: Object,
      required: true,
      validator: indHabitoValido,
    },
  },
  emits: ['alternar-fecha'],
  setup(props, { emit }) {
    const calendario = ref(null)
    const indCalendarioDesborda = ref(false)
    const idAyudaDesplazamiento = useId()
    let observadorCalendario
    function medirCalendario() {
      const elemento = calendario.value
      indCalendarioDesborda.value = Boolean(elemento && elemento.scrollWidth > elemento.clientWidth + 1)
    }
    onMounted(() => {
      medirCalendario()
      observadorCalendario = new ResizeObserver(medirCalendario)
      if (calendario.value) observadorCalendario.observe(calendario.value)
    })
    onBeforeUnmount(() => observadorCalendario?.disconnect())
    const claseColorHabito = computed(() => obtenerClaseColorHabito(props.habito.color))
    const {
      diasRecientes,
      numDiasCompletados,
      numDiasEvaluables,
      numMejorRacha,
      numRachaActual,
      porcentajeCumplimiento,
    } = useHabitStats(() => props.habito)
    const fechaHoy = obtenerFechaLocalActual()

    function alternarFecha(fecha) {
      emit('alternar-fecha', { fecha, idHabito: props.habito.id })
    }

    return {
      calendario,
      idAyudaDesplazamiento,
      indCalendarioDesborda,
      alternarFecha,
      claseColorHabito,
      describirDia,
      diasRecientes,
      fechaCreacionVisible: formatearFechaCorta(props.habito.fechaCreacion),
      fechaHoy,
      formatearDiaBreve,
      numDiasCompletados,
      numDiasEvaluables,
      numMejorRacha,
      numRachaActual,
      porcentajeCumplimiento,
    }
  },
})
