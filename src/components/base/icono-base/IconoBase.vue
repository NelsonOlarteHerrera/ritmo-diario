<script src="./IconoBase.js"></script>

<template>
  <svg
    class="icono-base"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(trazo, indice) in trazosIconos[nombre]" :key="indice" :d="trazo" />
  </svg>
</template>

<style scoped src="./icono-base.css"></style>
