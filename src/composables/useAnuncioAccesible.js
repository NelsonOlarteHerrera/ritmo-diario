import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// El fondo de un diálogo nativo es inert: se anuncia cuando vuelve a estar disponible.
export function useAnuncioAccesible(mensaje) {
  const anuncio = ref(mensaje.value)
  let pendiente = false

  async function anunciarPendiente() {
    if (!pendiente || document.querySelector('dialog[open]')) return
    pendiente = false
    anuncio.value = null
    await nextTick()
    if (document.querySelector('dialog[open]')) {
      pendiente = true
    } else {
      anuncio.value = mensaje.value
    }
  }

  watch(
    mensaje,
    () => {
      pendiente = true
      anunciarPendiente()
    },
    { flush: 'post' },
  )
  onMounted(() => document.addEventListener('close', anunciarPendiente, true))
  onBeforeUnmount(() => document.removeEventListener('close', anunciarPendiente, true))

  return anuncio
}
