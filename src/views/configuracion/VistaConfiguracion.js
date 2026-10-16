import { storeToRefs } from 'pinia'
import { computed, defineComponent, ref } from 'vue'

import BotonBase from '../../components/base/boton-base/BotonBase.vue'
import ModalBase from '../../components/base/modal-base/ModalBase.vue'
import SelectorTema from '../../components/layout/selector-tema/SelectorTema.vue'
import { crearTextoRespaldoHabitos, leerTextoRespaldoHabitos } from '../../data/respaldoHabitos.js'
import { useHabitoStore } from '../../stores/habitoStore.js'
import { useTemaStore } from '../../stores/temaStore.js'
import { useAnuncioAccesible } from '../../composables/useAnuncioAccesible.js'

const NUM_BYTES_MAXIMOS_RESPALDO = 1024 * 1024

function obtenerFechaArchivo() {
  const fechaActual = new Date()
  const numAnio = fechaActual.getFullYear()
  const numMes = String(fechaActual.getMonth() + 1).padStart(2, '0')
  const numDia = String(fechaActual.getDate()).padStart(2, '0')

  return `${numAnio}-${numMes}-${numDia}`
}

export default defineComponent({
  name: 'VistaConfiguracion',
  components: {
    BotonBase,
    ModalBase,
    SelectorTema,
  },
  setup() {
    const habitoStore = useHabitoStore()
    const temaStore = useTemaStore()
    const { habitos } = storeToRefs(habitoStore)
    const { indTemaOscuro } = storeToRefs(temaStore)
    const habitosImportar = ref([])
    const indModalImportacionAbierto = ref(false)
    const indModalReinicioAbierto = ref(false)
    const mensajeDatos = ref(null)
    const nomArchivoImportar = ref('')
    const nomTemaActual = computed(() => (indTemaOscuro.value ? 'oscuro' : 'claro'))
    const numHabitos = computed(() => habitos.value.length)
    const nomHabitos = computed(() => (numHabitos.value === 1 ? 'hábito' : 'hábitos'))

    function abrirModalReinicio() {
      mensajeDatos.value = null
      indModalReinicioAbierto.value = true
    }

    function cerrarModalReinicio() {
      indModalReinicioAbierto.value = false
    }

    function confirmarReinicio() {
      habitoStore.reiniciarHabitos()
      indModalReinicioAbierto.value = false
      mensajeDatos.value = {
        tipo: 'exito',
        texto: 'Volviste a los tres hábitos de ejemplo.',
      }
    }

    function exportarRespaldo() {
      const textoRespaldo = crearTextoRespaldoHabitos(habitos.value)
      const archivo = new Blob([textoRespaldo], { type: 'application/json' })
      const urlArchivo = URL.createObjectURL(archivo)
      const enlace = document.createElement('a')
      enlace.href = urlArchivo
      enlace.download = `respaldo-ritmo-diario-${obtenerFechaArchivo()}.json`
      document.body.append(enlace)
      enlace.click()
      enlace.remove()
      window.setTimeout(() => URL.revokeObjectURL(urlArchivo), 0)
      mensajeDatos.value = {
        tipo: 'exito',
        texto: 'Se inició la descarga del respaldo.',
      }
    }

    async function manejarSeleccionRespaldo(evento) {
      const archivo = evento.target.files?.[0]
      mensajeDatos.value = null

      if (!archivo) return

      if (archivo.size > NUM_BYTES_MAXIMOS_RESPALDO) {
        mensajeDatos.value = { tipo: 'error', texto: 'El archivo supera 1 MB. Elige un respaldo más pequeño.' }
        evento.target.value = ''
        return
      }

      try {
        habitosImportar.value = leerTextoRespaldoHabitos(await archivo.text())
        nomArchivoImportar.value = archivo.name
        indModalImportacionAbierto.value = true
      } catch (error) {
        mensajeDatos.value = { tipo: 'error', texto: error.message }
      } finally {
        evento.target.value = ''
      }
    }

    function cerrarModalImportacion() {
      indModalImportacionAbierto.value = false
      habitosImportar.value = []
      nomArchivoImportar.value = ''
    }

    function confirmarImportacion() {
      const numHabitosImportados = habitosImportar.value.length
      habitoStore.importarHabitos(habitosImportar.value)
      cerrarModalImportacion()
      mensajeDatos.value = {
        tipo: 'exito',
        texto: `Importaste ${numHabitosImportados} ${numHabitosImportados === 1 ? 'hábito' : 'hábitos'}.`,
      }
    }

    return {
      alternarTema: temaStore.alternarTema,
      abrirModalReinicio,
      cerrarModalReinicio,
      cerrarModalImportacion,
      confirmarImportacion,
      confirmarReinicio,
      exportarRespaldo,
      habitosImportar,
      indTemaOscuro,
      indModalImportacionAbierto,
      indModalReinicioAbierto,
      manejarSeleccionRespaldo,
      mensajeDatos,
      anuncioDatos: useAnuncioAccesible(mensajeDatos),
      nomHabitos,
      nomArchivoImportar,
      nomTemaActual,
      numHabitos,
    }
  },
})
