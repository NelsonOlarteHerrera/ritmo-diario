import { defineComponent } from 'vue'

const CATEGORIAS = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'salud', etiqueta: 'Salud' },
  { valor: 'estudio', etiqueta: 'Estudio' },
  { valor: 'trabajo', etiqueta: 'Trabajo' },
  { valor: 'personal', etiqueta: 'Personal' },
]

export default defineComponent({
  name: 'FiltrosCategoria',
  props: {
    categoriaSeleccionada: {
      type: String,
      required: true,
      validator: (valor) => CATEGORIAS.some((categoria) => categoria.valor === valor),
    },
  },
  emits: ['cambiar'],
  setup() {
    return { categorias: CATEGORIAS }
  },
})
