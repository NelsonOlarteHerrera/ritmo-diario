import { computed, toValue } from 'vue'

import { indHabitoValido } from '../data/validadoresHabito.js'

function obtenerFechaLocalActual() {
  const fechaActual = new Date()
  const numAnio = fechaActual.getFullYear()
  const numMes = String(fechaActual.getMonth() + 1).padStart(2, '0')
  const numDia = String(fechaActual.getDate()).padStart(2, '0')

  return `${numAnio}-${numMes}-${numDia}`
}

function restarUnDia(fecha) {
  const [numAnio, numMes, numDia] = fecha.split('-').map(Number)
  const fechaAnterior = new Date(Date.UTC(numAnio, numMes - 1, numDia - 1))

  return fechaAnterior.toISOString().slice(0, 10)
}

function calcularRachaActual(fechasCompletadas, fechaCreacion, fechaHoy) {
  const fechas = new Set(fechasCompletadas)
  let fechaEvaluada = fechas.has(fechaHoy) ? fechaHoy : restarUnDia(fechaHoy)
  let numRacha = 0

  while (fechaEvaluada >= fechaCreacion && fechas.has(fechaEvaluada)) {
    numRacha += 1
    fechaEvaluada = restarUnDia(fechaEvaluada)
  }

  return numRacha
}

function calcularMejorRacha(fechasCompletadas, fechaCreacion, fechaHoy) {
  const fechasAplicables = fechasCompletadas.filter((fecha) => fecha >= fechaCreacion && fecha <= fechaHoy)
  let fechaAnterior = ''
  let numMejorRacha = 0
  let numRachaEvaluada = 0

  fechasAplicables.forEach((fecha) => {
    numRachaEvaluada = fechaAnterior === restarUnDia(fecha) ? numRachaEvaluada + 1 : 1
    numMejorRacha = Math.max(numMejorRacha, numRachaEvaluada)
    fechaAnterior = fecha
  })

  return numMejorRacha
}

function convertirFechaUtc(fecha) {
  const [numAnio, numMes, numDia] = fecha.split('-').map(Number)

  return Date.UTC(numAnio, numMes - 1, numDia)
}

function calcularNumDiasEvaluables(fechaCreacion, fechaHoy) {
  if (fechaCreacion > fechaHoy) return 0

  const numMilisegundosDia = 24 * 60 * 60 * 1000

  return Math.floor((convertirFechaUtc(fechaHoy) - convertirFechaUtc(fechaCreacion)) / numMilisegundosDia) + 1
}

function calcularPorcentajeCumplimiento(fechasCompletadas, fechaCreacion, fechaHoy) {
  const numDiasEvaluables = calcularNumDiasEvaluables(fechaCreacion, fechaHoy)

  if (numDiasEvaluables === 0) return 0

  const numDiasCumplidos = fechasCompletadas.filter((fecha) => fecha >= fechaCreacion && fecha <= fechaHoy).length

  return Math.round((numDiasCumplidos / numDiasEvaluables) * 100)
}

function crearDiasRecientes(fechasCompletadas, fechaCreacion, fechaHoy) {
  if (fechaCreacion > fechaHoy) return []

  const fechas = new Set(fechasCompletadas)
  const diasRecientes = []
  let fechaEvaluada = fechaHoy

  while (diasRecientes.length < 14 && fechaEvaluada >= fechaCreacion) {
    diasRecientes.push({
      fecha: fechaEvaluada,
      indCompletado: fechas.has(fechaEvaluada),
    })
    fechaEvaluada = restarUnDia(fechaEvaluada)
  }

  return diasRecientes.reverse()
}

export function useHabitStats(habito, fechaActual = obtenerFechaLocalActual) {
  const fechasCompletadas = computed(() => {
    const habitoActual = toValue(habito)

    if (!indHabitoValido(habitoActual)) return []

    return [...new Set(habitoActual.completados)].sort()
  })
  const numDiasCompletados = computed(() => fechasCompletadas.value.length)
  const numDiasEvaluables = computed(() => {
    const habitoActual = toValue(habito)

    if (!indHabitoValido(habitoActual)) return 0

    return calcularNumDiasEvaluables(habitoActual.fechaCreacion, toValue(fechaActual))
  })
  const numRachaActual = computed(() => {
    const habitoActual = toValue(habito)

    if (!indHabitoValido(habitoActual)) return 0

    return calcularRachaActual(fechasCompletadas.value, habitoActual.fechaCreacion, toValue(fechaActual))
  })
  const numMejorRacha = computed(() => {
    const habitoActual = toValue(habito)

    if (!indHabitoValido(habitoActual)) return 0

    return calcularMejorRacha(fechasCompletadas.value, habitoActual.fechaCreacion, toValue(fechaActual))
  })
  const porcentajeCumplimiento = computed(() => {
    const habitoActual = toValue(habito)

    if (!indHabitoValido(habitoActual)) return 0

    return calcularPorcentajeCumplimiento(fechasCompletadas.value, habitoActual.fechaCreacion, toValue(fechaActual))
  })
  const diasRecientes = computed(() => {
    const habitoActual = toValue(habito)

    if (!indHabitoValido(habitoActual)) return []

    return crearDiasRecientes(fechasCompletadas.value, habitoActual.fechaCreacion, toValue(fechaActual))
  })

  return {
    diasRecientes,
    fechasCompletadas,
    numDiasCompletados,
    numDiasEvaluables,
    numMejorRacha,
    numRachaActual,
    porcentajeCumplimiento,
  }
}
