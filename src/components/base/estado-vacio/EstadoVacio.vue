<script src="./EstadoVacio.js"></script>

<template>
  <section class="estado-vacio">
    <div class="estado-vacio__icono" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="estado-vacio__contenido">
      <h2>{{ titulo }}</h2>
      <p>{{ descripcion }}</p>
    </div>

    <div v-if="$slots.accion" class="estado-vacio__accion">
      <slot name="accion" />
    </div>
  </section>
</template>

<style scoped src="./estado-vacio.css"></style>
