<script src="./SelectorTema.js"></script>

<template>
  <button
    class="selector-tema"
    :class="{ 'selector-tema--compacto': indCompacto }"
    type="button"
    :aria-label="indCompacto ? etiquetaAccion : undefined"
    :aria-pressed="indTemaOscuro"
    @click="$emit('alternar')"
  >
    <IconoBase :nombre="indTemaOscuro ? 'sol' : 'luna'" />
    <span v-if="!indCompacto" class="selector-tema__texto">
      <strong>{{ indTemaOscuro ? 'Tema oscuro' : 'Tema claro' }}</strong>
      <small>{{ etiquetaAccion }}</small>
    </span>
  </button>
</template>

<style scoped src="./selector-tema.css"></style>
