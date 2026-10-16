import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'BotonBase',
  components: {
    RouterLink,
  },
  props: {
    ruta: {
      type: String,
      default: '',
    },
    tipo: {
      type: String,
      default: 'button',
      validator: (valor) => ['button', 'submit', 'reset'].includes(valor),
    },
    variante: {
      type: String,
      default: 'primario',
      validator: (valor) => ['primario', 'secundario', 'texto', 'peligro'].includes(valor),
    },
    indDeshabilitado: {
      type: Boolean,
      default: false,
    },
    indCargando: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['presionar'],
  setup(propiedades, { emit }) {
    function manejarEnlace(evento) {
      if (propiedades.indDeshabilitado || propiedades.indCargando) {
        evento.preventDefault()
        return
      }

      emit('presionar')
    }

    function manejarBoton() {
      emit('presionar')
    }

    return {
      manejarBoton,
      manejarEnlace,
    }
  },
})
