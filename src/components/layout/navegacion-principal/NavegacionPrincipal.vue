<script src="./NavegacionPrincipal.js"></script>

<template>
  <nav
    class="navegacion"
    :class="{ 'navegacion--movil': indMovil }"
    :aria-label="indMovil ? 'Navegación principal móvil' : 'Navegación principal'"
  >
    <RouterLink v-for="enlace in enlacesNavegacion" :key="enlace.ruta" class="navegacion__enlace" :to="enlace.ruta">
      <IconoBase :nombre="enlace.icono" />
      <span>{{ enlace.etiqueta }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped src="./navegacion-principal.css"></style>
