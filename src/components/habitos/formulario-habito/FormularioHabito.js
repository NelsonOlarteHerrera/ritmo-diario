import { computed, defineComponent, nextTick, reactive, ref, watch } from 'vue'

import BotonBase from '../../base/boton-base/BotonBase.vue'
import { COLORES_HABITO, indColorHabitoValido } from '../../../data/coloresHabito.js'
import { indHabitoValido } from '../../../data/validadoresHabito.js'

const CATEGORIAS = [
  { valor: 'salud', etiqueta: 'Salud' },
  { valor: 'estudio', etiqueta: 'Estudio' },
  { valor: 'trabajo', etiqueta: 'Trabajo' },
  { valor: 'personal', etiqueta: 'Personal' },
]
function obtenerFormularioInicial() {
  return { nombre: '', descripcion: '', categoria: '', color: COLORES_HABITO[0].valor }
}

function obtenerError(campo, valor) {
  const valorLimpio = typeof valor === 'string' ? valor.trim() : ''

  if (campo === 'nombre' && valorLimpio.length < 3) return 'Escribe un nombre de al menos 3 caracteres.'
  if (campo === 'nombre' && valorLimpio.length > 60) return 'El nombre no puede superar 60 caracteres.'
  if (campo === 'descripcion' && valorLimpio.length > 180) return 'La descripción no puede superar 180 caracteres.'
  if (campo === 'categoria' && !CATEGORIAS.some((categoria) => categoria.valor === valor)) {
    return 'Selecciona una categoría.'
  }
  if (campo === 'color' && !indColorHabitoValido(valor)) return 'Selecciona un color.'
  return ''
}

export default defineComponent({
  name: 'FormularioHabito',
  components: { BotonBase },
  props: {
    habitoEditar: {
      type: Object,
      default: null,
      validator: (valor) => valor === null || indHabitoValido(valor),
    },
  },
  emits: ['cancelar-edicion', 'guardar'],
  setup(propiedades, { emit, expose }) {
    const elementoFormulario = ref(null)
    const avisoErrores = ref('')
    const campoNombre = ref(null)
    const formulario = reactive(obtenerFormularioInicial())
    const errores = reactive(obtenerFormularioInicial())
    const indEdicion = computed(() => propiedades.habitoEditar !== null)

    function validarCampo(campo) {
      errores[campo] = obtenerError(campo, formulario[campo])
      return errores[campo] === ''
    }

    function restablecerFormulario() {
      avisoErrores.value = ''
      Object.assign(formulario, obtenerFormularioInicial())
      Object.assign(errores, obtenerFormularioInicial())
    }

    async function manejarEnvio() {
      const indFormularioValido = Object.keys(formulario).map(validarCampo).every(Boolean)
      avisoErrores.value = ''
      if (!indFormularioValido) {
        await nextTick()
        avisoErrores.value = 'Revisa los campos indicados antes de guardar.'
        elementoFormulario.value?.querySelector('[aria-invalid="true"]')?.focus()
        return
      }

      emit('guardar', {
        nombre: formulario.nombre.trim(),
        descripcion: formulario.descripcion.trim(),
        categoria: formulario.categoria,
        color: formulario.color,
      })
      if (!indEdicion.value) restablecerFormulario()
    }

    function cancelarEdicion() {
      emit('cancelar-edicion')
    }

    function enfocarNombre() {
      campoNombre.value?.focus()
    }

    expose({ enfocarNombre })

    watch(
      () => propiedades.habitoEditar,
      (habitoEditar) => {
        if (!habitoEditar) {
          restablecerFormulario()
          return
        }

        Object.assign(formulario, {
          nombre: habitoEditar.nombre,
          descripcion: habitoEditar.descripcion,
          categoria: habitoEditar.categoria,
          color: habitoEditar.color,
        })
        Object.assign(errores, obtenerFormularioInicial())
        avisoErrores.value = ''
      },
      { immediate: true },
    )

    return {
      avisoErrores,
      campoNombre,
      cancelarEdicion,
      categorias: CATEGORIAS,
      colores: COLORES_HABITO,
      errores,
      elementoFormulario,
      formulario,
      indEdicion,
      manejarEnvio,
      validarCampo,
    }
  },
})
