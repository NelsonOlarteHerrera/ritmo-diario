<script src="./TarjetaEstadisticaHabito.js"></script>

<template>
  <article class="tarjeta-estadistica" :class="`tarjeta-estadistica--${claseColorHabito}`">
    <header class="tarjeta-estadistica__encabezado">
      <div>
        <h2>{{ habito.nombre }}</h2>
        <p>{{ habito.categoria }}</p>
      </div>
      <strong>{{ porcentajeCumplimiento }}%</strong>
    </header>

    <div class="tarjeta-estadistica__progreso">
      <div>
        <span>Cumplimiento</span>
        <span>{{ numDiasCompletados }} de {{ numDiasEvaluables }} días</span>
      </div>
      <progress
        :value="porcentajeCumplimiento"
        max="100"
        :aria-label="`Cumplimiento de ${habito.nombre}: ${porcentajeCumplimiento}%`"
      >
        {{ porcentajeCumplimiento }}%
      </progress>
    </div>

    <dl class="tarjeta-estadistica__rachas">
      <div>
        <dt>Racha actual</dt>
        <dd>{{ numRachaActual }} {{ numRachaActual === 1 ? 'día' : 'días' }}</dd>
      </div>
      <div>
        <dt>Mejor racha</dt>
        <dd>{{ numMejorRacha }} {{ numMejorRacha === 1 ? 'día' : 'días' }}</dd>
      </div>
    </dl>

    <section class="tarjeta-estadistica__historial" :aria-label="`Historial reciente de ${habito.nombre}`">
      <div class="tarjeta-estadistica__historial-encabezado">
        <h3>Últimos {{ diasRecientes.length }} días</h3>
        <span>Desde {{ fechaCreacionVisible }}</span>
      </div>
      <p class="tarjeta-estadistica__ayuda">Selecciona una fecha anterior para cambiar su estado.</p>
      <p v-if="indCalendarioDesborda" :id="idAyudaDesplazamiento" class="tarjeta-estadistica__desplazamiento">
        Desplaza el calendario para ver todas las fechas.
      </p>
      <ol
        ref="calendario"
        class="tarjeta-estadistica__dias"
        :tabindex="indCalendarioDesborda ? 0 : undefined"
        :aria-describedby="indCalendarioDesborda ? idAyudaDesplazamiento : undefined"
        :aria-label="`Calendario de ${habito.nombre}`"
      >
        <li v-for="dia in diasRecientes" :key="dia.fecha">
          <time :datetime="dia.fecha">{{ formatearDiaBreve(dia.fecha) }}</time>
          <button
            v-if="dia.fecha < fechaHoy"
            type="button"
            class="tarjeta-estadistica__dia"
            :class="{ 'tarjeta-estadistica__dia--completado': dia.indCompletado }"
            :aria-label="`${describirDia(dia)}. Cambiar estado`"
            :aria-pressed="dia.indCompletado"
            @click="alternarFecha(dia.fecha)"
          >
            <Transition name="marca-dia">
              <span :key="dia.indCompletado" class="tarjeta-estadistica__simbolo" aria-hidden="true">
                {{ dia.indCompletado ? '✓' : '—' }}
              </span>
            </Transition>
          </button>
          <span
            v-else
            class="tarjeta-estadistica__dia"
            role="img"
            :class="{ 'tarjeta-estadistica__dia--completado': dia.indCompletado }"
            :aria-label="describirDia(dia)"
          >
            {{ dia.indCompletado ? '✓' : '—' }}
          </span>
        </li>
      </ol>
      <div class="tarjeta-estadistica__leyenda" aria-hidden="true">
        <span><i class="tarjeta-estadistica__muestra tarjeta-estadistica__muestra--completado"></i>Completado</span>
        <span><i class="tarjeta-estadistica__muestra"></i>Pendiente</span>
      </div>
    </section>
  </article>
</template>

<style scoped src="./tarjeta-estadistica-habito.css"></style>
