import { nextTick, ref } from 'vue'
import { useAnuncioAccesible } from './useAnuncioAccesible.js'

export function useGestionHabitos(habitoStore) {
  const formularioHabito = ref(null)
  const habitoPorEditar = ref(null)
  const habitoPorEliminar = ref(null)
  const indFormularioAbierto = ref(false)
  const mensajeEstado = ref('')

  function alternarCumplimiento(habito) {
    const indActualizado = habitoStore.alternarCumplimientoHoy(habito.id)
    const indCompletado = habitoStore.indHabitoCompletadoHoy(habito.id)
    mensajeEstado.value = indActualizado
      ? `“${habito.nombre}”: ${indCompletado ? 'completado hoy' : 'pendiente para hoy'}.`
      : 'No fue posible actualizar el cumplimiento. Inténtalo nuevamente.'
  }
  function cancelarEdicion() {
    indFormularioAbierto.value = false
    habitoPorEditar.value = null
  }
  function cancelarEliminacion() {
    habitoPorEliminar.value = null
  }
  function confirmarEliminacion() {
    if (!habitoPorEliminar.value) return
    const nombreHabito = habitoPorEliminar.value.nombre
    const indEliminado = habitoStore.eliminarHabito(habitoPorEliminar.value.id)
    habitoPorEliminar.value = null
    mensajeEstado.value = indEliminado
      ? `“${nombreHabito}” y su historial se eliminaron.`
      : 'No fue posible eliminar el hábito. Inténtalo nuevamente.'
  }
  function guardarHabito(nuevoHabito) {
    const indEdicion = Boolean(habitoPorEditar.value)
    const indGuardado = indEdicion
      ? habitoStore.actualizarHabito(habitoPorEditar.value.id, nuevoHabito)
      : habitoStore.crearHabito(nuevoHabito)
    mensajeEstado.value = indGuardado
      ? `“${nuevoHabito.nombre}” ${indEdicion ? 'actualizado' : 'creado'}.`
      : `No fue posible ${indEdicion ? 'actualizar' : 'crear'} el hábito. Revisa los datos e inténtalo nuevamente.`
    if (indGuardado) cancelarEdicion()
  }
  async function abrirFormulario(habito = null) {
    habitoPorEditar.value = habito
    indFormularioAbierto.value = true
    await nextTick()
    await nextTick()
    formularioHabito.value?.enfocarNombre()
  }
  function irAlFormulario() {
    return abrirFormulario()
  }
  function solicitarEdicion(habito) {
    return abrirFormulario(habito)
  }
  function solicitarEliminacion(habito) {
    habitoPorEliminar.value = habito
  }

  return {
    alternarCumplimiento,
    cancelarEdicion,
    cancelarEliminacion,
    confirmarEliminacion,
    formularioHabito,
    guardarHabito,
    habitoPorEditar,
    habitoPorEliminar,
    indFormularioAbierto,
    irAlFormulario,
    mensajeEstado,
    anuncioEstado: useAnuncioAccesible(mensajeEstado),
    solicitarEdicion,
    solicitarEliminacion,
  }
}
