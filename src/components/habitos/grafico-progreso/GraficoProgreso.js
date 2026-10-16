import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GraficoProgreso',
  props: {
    porcentaje: {
      type: Number,
      required: true,
      validator: (valor) => Number.isInteger(valor) && valor >= 0 && valor <= 100,
    },
  },
})
