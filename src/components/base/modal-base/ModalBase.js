import { defineComponent, onBeforeUnmount, ref, useId } from 'vue'

export default defineComponent({
  name: 'ModalBase',
  props: {
    indAbierto: {
      type: Boolean,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
  },
  emits: ['cerrar'],
  setup(_, { emit }) {
    const modal = ref(null)
    const idTitulo = useId()
    let animacion = null
    let retirarPreferencia = null

    function cancelarAnimacion() {
      retirarPreferencia?.()
      retirarPreferencia = null
      if (animacion) {
        animacion.onfinish = null
        animacion.cancel()
        animacion = null
      }
    }

    function animarModal(fotogramas, tokenDuracion, tokenCurva, alTerminar) {
      cancelarAnimacion()
      const preferencia = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (preferencia.matches || !modal.value?.animate) {
        alTerminar()
        return
      }

      const estilos = getComputedStyle(modal.value)
      const duracion = Number.parseFloat(estilos.getPropertyValue(tokenDuracion))
      const curva = estilos.getPropertyValue(tokenCurva).trim()
      const actual = modal.value.animate(fotogramas, { duration: duracion, easing: curva, fill: 'forwards' })
      animacion = actual
      function finalizar() {
        if (animacion !== actual) return
        cancelarAnimacion()
        alTerminar()
      }
      function reducirMovimiento(evento) {
        if (evento.matches) finalizar()
      }
      actual.onfinish = finalizar
      preferencia.addEventListener('change', reducirMovimiento)
      retirarPreferencia = () => preferencia.removeEventListener('change', reducirMovimiento)
    }

    function abrirPanel(panel, finalizar) {
      panel.inert = false
      if (!modal.value.open) modal.value.showModal()
      animarModal(
        [
          { opacity: 0, transform: 'translateY(4px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        '--duracion-entrada',
        '--curva-entrada',
        finalizar,
      )
    }

    function cerrarPanel(panel, finalizar) {
      // Vue conserva el contenido durante la salida; la acción ya fue emitida.
      panel.inert = true
      animarModal([{ opacity: 1 }, { opacity: 0 }], '--duracion-salida', '--curva-salida', () => {
        modal.value?.close()
        if (document.activeElement === document.body) {
          document.getElementById('contenido-principal')?.focus()
        }
        finalizar()
      })
    }

    function cancelarCierre(panel) {
      cancelarAnimacion()
      panel.inert = false
    }

    function cerrarModal() {
      emit('cerrar')
    }

    function cerrarDesdeFondo(evento) {
      if (evento.target === modal.value) {
        cerrarModal()
      }
    }

    onBeforeUnmount(cancelarAnimacion)

    return {
      abrirPanel,
      cancelarAnimacion,
      cancelarCierre,
      cerrarPanel,
      cerrarDesdeFondo,
      cerrarModal,
      idTitulo,
      modal,
    }
  },
})
