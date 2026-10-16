<script src="./FiltrosCategoria.js"></script>

<template>
  <div class="filtros-categoria" role="group" aria-label="Filtrar hábitos por categoría">
    <button
      v-for="categoria in categorias"
      :key="categoria.valor"
      class="filtros-categoria__opcion"
      :class="{ 'filtros-categoria__opcion--activa': categoriaSeleccionada === categoria.valor }"
      type="button"
      :aria-pressed="categoriaSeleccionada === categoria.valor"
      @click="$emit('cambiar', categoria.valor)"
    >
      {{ categoria.etiqueta }}
    </button>
  </div>
</template>

<style scoped src="./filtros-categoria.css"></style>
