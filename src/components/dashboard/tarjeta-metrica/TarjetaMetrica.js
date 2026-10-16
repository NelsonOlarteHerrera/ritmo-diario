import { defineComponent } from 'vue'

const TONOS_METRICA = ['primario', 'secundario', 'exito', 'advertencia']

export default defineComponent({
  name: 'TarjetaMetrica',
  props: {
    descripcion: {
      type: String,
      required: true,
    },
    etiqueta: {
      type: String,
      required: true,
    },
    tono: {
      type: String,
      required: true,
      validator: (valor) => TONOS_METRICA.includes(valor),
    },
    valor: {
      type: [Number, String],
      required: true,
    },
  },
})
