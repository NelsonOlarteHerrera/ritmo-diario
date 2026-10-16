import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import IconoBase from '../../base/icono-base/IconoBase.vue'

const enlacesNavegacion = [
  { icono: 'resumen', ruta: '/', etiqueta: 'Resumen' },
  { icono: 'habitos', ruta: '/habitos', etiqueta: 'Hábitos' },
  { icono: 'estadisticas', ruta: '/estadisticas', etiqueta: 'Estadísticas' },
  { icono: 'configuracion', ruta: '/configuracion', etiqueta: 'Configuración' },
]

export default defineComponent({
  name: 'NavegacionPrincipal',
  components: {
    IconoBase,
    RouterLink,
  },
  props: {
    indMovil: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      enlacesNavegacion,
    }
  },
})
