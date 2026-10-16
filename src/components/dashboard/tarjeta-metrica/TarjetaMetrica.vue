<script src="./TarjetaMetrica.js"></script>

<template>
  <article class="tarjeta-metrica" :class="`tarjeta-metrica--${tono}`">
    <span class="tarjeta-metrica__indicador" aria-hidden="true"></span>
    <p class="tarjeta-metrica__etiqueta">{{ etiqueta }}</p>
    <strong>{{ valor }}</strong>
    <p class="tarjeta-metrica__descripcion">{{ descripcion }}</p>
  </article>
</template>

<style scoped src="./tarjeta-metrica.css"></style>
