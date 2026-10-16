import { defineComponent } from 'vue'

const trazosIconos = {
  resumen: ['m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z'],
  habitos: ['M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z', 'm7 12 3 3 7-7'],
  estadisticas: ['M5 20v-7M12 20V4M19 20v-11'],
  configuracion: ['m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3z', 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],
  sol: [
    'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  ],
  luna: ['M20 14a8 8 0 0 1-10-10A8 8 0 1 0 20 14z'],
  completado: ['m5 12 4 4L19 6'],
  pendiente: ['M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0'],
}

export default defineComponent({
  name: 'IconoBase',
  props: {
    nombre: {
      type: String,
      required: true,
      validator: (valor) => Object.hasOwn(trazosIconos, valor),
    },
  },
  setup() {
    return { trazosIconos }
  },
})
