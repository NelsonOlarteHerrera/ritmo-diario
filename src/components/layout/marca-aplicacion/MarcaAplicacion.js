import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'MarcaAplicacion',
  components: {
    RouterLink,
  },
  props: {
    indCompacta: {
      type: Boolean,
      default: false,
    },
  },
})
