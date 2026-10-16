import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EstadoVacio',
  props: {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
  },
})
