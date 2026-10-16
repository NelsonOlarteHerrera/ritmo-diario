import { computed, defineComponent } from 'vue'
import IconoBase from '../../base/icono-base/IconoBase.vue'

import { obtenerClaseColorHabito } from '../../../data/coloresHabito.js'
import { indHabitoValido } from '../../../data/validadoresHabito.js'

export default defineComponent({
  name: 'TarjetaHabito',
  components: { IconoBase },
  props: {
    habito: {
      type: Object,
      required: true,
      validator: indHabitoValido,
    },
    indCompletadoHoy: {
      type: Boolean,
      default: false,
    },
    indGestionable: {
      type: Boolean,
      default: false,
    },
    indCompacta: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['alternar-cumplimiento', 'solicitar-edicion', 'solicitar-eliminacion'],
  setup(props) {
    const claseColorHabito = computed(() => obtenerClaseColorHabito(props.habito.color))

    return { claseColorHabito }
  },
})
