import { storeToRefs } from 'pinia'
import { computed, defineComponent } from 'vue'
import { IDS_HABITOS_EJEMPLO } from '../../../data/habitosEjemplo.js'
import { useHabitoStore } from '../../../stores/habitoStore.js'

const idsEjemplo = new Set(Object.values(IDS_HABITOS_EJEMPLO))

export default defineComponent({
  name: 'AvisoEjemplos',
  setup() {
    const { habitos } = storeToRefs(useHabitoStore())
    const indIncluyeEjemplos = computed(() => habitos.value.some((habito) => idsEjemplo.has(habito.id)))
    return { indIncluyeEjemplos }
  },
})
