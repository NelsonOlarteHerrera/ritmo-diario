export const COLORES_HABITO = Object.freeze([
  { valor: '#2f7d6d', etiqueta: 'Verde', clase: 'verde' },
  { valor: '#a8662b', etiqueta: 'Ámbar', clase: 'ambar' },
  { valor: '#5d61a8', etiqueta: 'Morado', clase: 'morado' },
  { valor: '#b34d66', etiqueta: 'Rosa', clase: 'rosa' },
])

export function indColorHabitoValido(valor) {
  return COLORES_HABITO.some((color) => color.valor === valor)
}

export function obtenerClaseColorHabito(valor) {
  return COLORES_HABITO.find((color) => color.valor === valor)?.clase ?? 'morado'
}
