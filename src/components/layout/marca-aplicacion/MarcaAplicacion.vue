<script src="./MarcaAplicacion.js"></script>

<template>
  <RouterLink class="marca" :class="{ 'marca--compacta': indCompacta }" to="/" title="Ir al resumen">
    <span class="marca__simbolo" aria-hidden="true"
      >RD<span class="marca__ritmo"><i></i><i></i><i></i></span
    ></span>
    <span class="marca__texto">
      <strong>Ritmo Diario</strong>
      <small v-if="!indCompacta">Tu progreso, a tu ritmo</small>
    </span>
  </RouterLink>
</template>

<style scoped src="./marca-aplicacion.css"></style>
