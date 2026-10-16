export function useAlmacenamientoLocal({ clave, validarValor, valorPredeterminado }) {
  if (typeof clave !== 'string' || clave.trim() === '') {
    throw new TypeError('La clave de almacenamiento debe ser un texto no vacio.')
  }

  if (typeof validarValor !== 'function') {
    throw new TypeError('La validacion del valor debe ser una funcion.')
  }

  function leer() {
    try {
      const valorSerializado = localStorage.getItem(clave)

      if (valorSerializado === null) {
        return valorPredeterminado
      }

      const valorAlmacenado = JSON.parse(valorSerializado)
      return validarValor(valorAlmacenado) ? valorAlmacenado : valorPredeterminado
    } catch {
      return valorPredeterminado
    }
  }

  function guardar(nuevoValor) {
    if (!validarValor(nuevoValor)) {
      return false
    }

    try {
      localStorage.setItem(clave, JSON.stringify(nuevoValor))
      return true
    } catch {
      return false
    }
  }

  function eliminar() {
    try {
      localStorage.removeItem(clave)
      return true
    } catch {
      return false
    }
  }

  return {
    eliminar,
    guardar,
    leer,
  }
}
