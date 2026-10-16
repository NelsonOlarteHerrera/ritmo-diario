import { defineComponent, ref } from 'vue'
import BotonBase from '../../base/boton-base/BotonBase.vue'
import ModalBase from '../../base/modal-base/ModalBase.vue'
import FormularioHabito from '../formulario-habito/FormularioHabito.vue'

export default defineComponent({
  name: 'DialogosHabito',
  components: { BotonBase, FormularioHabito, ModalBase },
  props: {
    habitoPorEditar: { type: Object, default: null },
    habitoPorEliminar: { type: Object, default: null },
    indFormularioAbierto: { type: Boolean, default: false },
  },
  emits: ['guardar', 'cancelar-edicion', 'cancelar-eliminacion', 'confirmar-eliminacion'],
  setup(_, { expose }) {
    const formulario = ref(null)
    function enfocarNombre() {
      formulario.value?.enfocarNombre()
    }
    expose({ enfocarNombre })
    return { formulario }
  },
})
