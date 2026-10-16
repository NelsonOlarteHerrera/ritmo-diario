<script src="./BotonBase.js"></script>

<template>
  <RouterLink
    v-if="ruta"
    :to="ruta"
    class="boton-base"
    :class="`boton-base--${variante}`"
    :aria-busy="indCargando || undefined"
    :aria-disabled="indDeshabilitado || indCargando || undefined"
    :tabindex="indDeshabilitado || indCargando ? -1 : undefined"
    @click="manejarEnlace"
  >
    <span v-if="indCargando" class="boton-base__indicador" aria-hidden="true"></span>
    <slot />
  </RouterLink>

  <button
    v-else
    class="boton-base"
    :class="`boton-base--${variante}`"
    :type="tipo"
    :disabled="indDeshabilitado || indCargando"
    :aria-busy="indCargando || undefined"
    @click="manejarBoton"
  >
    <span v-if="indCargando" class="boton-base__indicador" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<style scoped src="./boton-base.css"></style>
