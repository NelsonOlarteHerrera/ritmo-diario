<script src="./GraficoProgreso.js"></script>
<template>
  <section class="grafico-progreso" aria-labelledby="titulo-progreso-diario">
    <div class="grafico-progreso__contenido">
      <h2 id="titulo-progreso-diario">Progreso de hoy</h2>
      <div class="grafico-progreso__avance">
        <strong>{{ porcentaje }}%</strong>
        <div class="grafico-progreso__barra">
          <progress :value="porcentaje" max="100" :aria-label="`Progreso diario: ${porcentaje}%`">
            {{ porcentaje }}%
          </progress>
          <span
            class="grafico-progreso__relleno"
            :style="{ transform: `scaleX(${porcentaje / 100})` }"
            aria-hidden="true"
          ></span>
        </div>
      </div>
    </div>
    <slot />
  </section>
</template>
<style scoped src="./grafico-progreso.css"></style>
