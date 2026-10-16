<script src="./DialogosHabito.js"></script>
<template>
  <ModalBase
    :ind-abierto="indFormularioAbierto"
    :titulo="habitoPorEditar ? 'Editar hábito' : 'Crear hábito'"
    @cerrar="$emit('cancelar-edicion')"
  >
    <FormularioHabito
      v-if="indFormularioAbierto"
      ref="formulario"
      :habito-editar="habitoPorEditar"
      @guardar="$emit('guardar', $event)"
      @cancelar-edicion="$emit('cancelar-edicion')"
    />
  </ModalBase>
  <ModalBase
    :ind-abierto="Boolean(habitoPorEliminar)"
    :titulo="`¿Eliminar “${habitoPorEliminar?.nombre ?? 'este hábito'}”?`"
    @cerrar="$emit('cancelar-eliminacion')"
  >
    <p v-if="habitoPorEliminar">
      Se eliminarán <strong>este hábito</strong> y su historial sin opción de recuperarlos.
    </p>
    <template #acciones>
      <BotonBase variante="secundario" @presionar="$emit('cancelar-eliminacion')">Conservar hábito</BotonBase>
      <BotonBase variante="peligro" @presionar="$emit('confirmar-eliminacion')">Eliminar hábito</BotonBase>
    </template>
  </ModalBase>
</template>
