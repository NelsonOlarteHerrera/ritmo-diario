<script src="./AvisoEjemplos.js"></script>

<template>
  <p v-if="indIncluyeEjemplos" class="aviso-ejemplos">
    <strong>Incluye hábitos creados como ejemplo.</strong> Su historial inicial es de muestra.
  </p>
  <slot v-else />
</template>

<style scoped src="./aviso-ejemplos.css"></style>
