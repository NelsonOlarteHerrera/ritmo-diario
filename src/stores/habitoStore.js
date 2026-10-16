import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

import { useAlmacenamientoLocal } from '../composables/useAlmacenamientoLocal.js'
import { crearHabitosEjemplo } from '../data/habitosEjemplo.js'
import { indListaHabitosValida } from '../data/validadoresHabito.js'

const CLAVE_HABITOS = 'ritmo-diario:habitos'

function obtenerFechaLocalActual() {
  const fechaActual = new Date()
  const numAnio = fechaActual.getFullYear()
  const numMes = String(fechaActual.getMonth() + 1).padStart(2, '0')
  const numDia = String(fechaActual.getDate()).padStart(2, '0')

  return `${numAnio}-${numMes}-${numDia}`
}

function crearIdHabito() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `habito-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function indFechaValida(fecha) {
  if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false

  const [numAnio, numMes, numDia] = fecha.split('-').map(Number)
  const fechaUtc = new Date(Date.UTC(numAnio, numMes - 1, numDia))

  return fechaUtc.toISOString().slice(0, 10) === fecha
}

export const useHabitoStore = defineStore('habitos', () => {
  const habitosEjemplo = crearHabitosEjemplo()
  const almacenamiento = useAlmacenamientoLocal({
    clave: CLAVE_HABITOS,
    validarValor: indListaHabitosValida,
    valorPredeterminado: habitosEjemplo,
  })
  const habitos = ref(almacenamiento.leer())
  const habitosActivos = computed(() => habitos.value.filter((habito) => habito.activo))
  const numHabitosCompletadosHoy = computed(() => {
    const fechaHoy = obtenerFechaLocalActual()

    return habitosActivos.value.filter((habito) => habito.completados.includes(fechaHoy)).length
  })
  const numHabitosPendientesHoy = computed(() => habitosActivos.value.length - numHabitosCompletadosHoy.value)
  const porcentajeProgresoDiario = computed(() => {
    if (habitosActivos.value.length === 0) {
      return 0
    }

    return Math.round((numHabitosCompletadosHoy.value / habitosActivos.value.length) * 100)
  })
  function crearHabito(nuevoHabito) {
    const habito = {
      id: crearIdHabito(),
      nombre: nuevoHabito.nombre,
      descripcion: nuevoHabito.descripcion,
      categoria: nuevoHabito.categoria,
      color: nuevoHabito.color,
      activo: true,
      fechaCreacion: obtenerFechaLocalActual(),
      completados: [],
    }

    if (!indListaHabitosValida([habito])) return false

    habitos.value.push(habito)
    return true
  }
  function eliminarHabito(idHabito) {
    const indiceHabito = habitos.value.findIndex((habito) => habito.id === idHabito)

    if (indiceHabito === -1) return false

    habitos.value.splice(indiceHabito, 1)
    return true
  }
  function actualizarHabito(idHabito, cambiosHabito) {
    const indiceHabito = habitos.value.findIndex((habito) => habito.id === idHabito)

    if (indiceHabito === -1) return false

    const habitoActualizado = {
      ...habitos.value[indiceHabito],
      nombre: cambiosHabito.nombre,
      descripcion: cambiosHabito.descripcion,
      categoria: cambiosHabito.categoria,
      color: cambiosHabito.color,
    }

    if (!indListaHabitosValida([habitoActualizado])) return false

    habitos.value.splice(indiceHabito, 1, habitoActualizado)
    return true
  }
  function indHabitoCompletadoHoy(idHabito) {
    const fechaHoy = obtenerFechaLocalActual()
    const habito = habitos.value.find((habitoActual) => habitoActual.id === idHabito)

    return habito?.completados.includes(fechaHoy) ?? false
  }
  function alternarCumplimientoHoy(idHabito) {
    return alternarCumplimientoFecha(idHabito, obtenerFechaLocalActual())
  }
  function alternarCumplimientoFecha(idHabito, fecha) {
    const habito = habitos.value.find((habitoActual) => habitoActual.id === idHabito)
    const fechaHoy = obtenerFechaLocalActual()

    if (!habito || !indFechaValida(fecha) || fecha < habito.fechaCreacion || fecha > fechaHoy) return false

    const indiceFecha = habito.completados.indexOf(fecha)

    if (indiceFecha === -1) {
      habito.completados.push(fecha)
    } else {
      habito.completados.splice(indiceFecha, 1)
    }

    return true
  }
  function reiniciarHabitos() {
    habitos.value = crearHabitosEjemplo()
    return true
  }
  function importarHabitos(nuevosHabitos) {
    if (!indListaHabitosValida(nuevosHabitos)) return false

    habitos.value = nuevosHabitos.map((habito) => ({
      ...habito,
      completados: [...habito.completados],
    }))
    return true
  }
  almacenamiento.guardar(habitos.value)

  watch(habitos, (nuevosHabitos) => almacenamiento.guardar(nuevosHabitos), {
    deep: true,
    flush: 'sync',
  })

  return {
    habitos,
    habitosActivos,
    numHabitosCompletadosHoy,
    numHabitosPendientesHoy,
    porcentajeProgresoDiario,
    alternarCumplimientoFecha,
    alternarCumplimientoHoy,
    actualizarHabito,
    crearHabito,
    eliminarHabito,
    indHabitoCompletadoHoy,
    importarHabitos,
    reiniciarHabitos,
  }
})
