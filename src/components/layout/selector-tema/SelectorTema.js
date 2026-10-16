import { computed, defineComponent } from 'vue'
import IconoBase from '../../base/icono-base/IconoBase.vue'

export default defineComponent({
  name: 'SelectorTema',
  components: { IconoBase },
  props: {
    indTemaOscuro: {
      type: Boolean,
      required: true,
    },
    indCompacto: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['alternar'],
  setup(propiedades) {
    const etiquetaAccion = computed(() => (propiedades.indTemaOscuro ? 'Activar tema claro' : 'Activar tema oscuro'))

    return {
      etiquetaAccion,
    }
  },
})
