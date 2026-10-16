<script src="./TarjetaHabito.js"></script>

<template>
  <article class="tarjeta-habito" :class="{ 'tarjeta-habito--compacta': indCompacta }">
    <span class="tarjeta-habito__color" :class="`tarjeta-habito__color--${claseColorHabito}`" aria-hidden="true"></span>
    <div class="tarjeta-habito__contenido">
      <h3>{{ habito.nombre }}</h3>
      <p>{{ habito.descripcion }}</p>
      <span class="tarjeta-habito__categoria">{{ habito.categoria }}</span>
    </div>
    <div v-if="indGestionable" class="tarjeta-habito__acciones">
      <button
        class="tarjeta-habito__completar"
        :class="{ 'tarjeta-habito__completar--activo': indCompletadoHoy }"
        type="button"
        :aria-label="
          indCompletadoHoy ? `Completado hoy: ${habito.nombre}. Marcar pendiente.` : `Completar hoy: ${habito.nombre}`
        "
        :aria-pressed="indCompletadoHoy"
        @click="$emit('alternar-cumplimiento', habito)"
      >
        <Transition name="confirmacion">
          <IconoBase v-if="indCompletadoHoy" nombre="completado" />
        </Transition>
        {{ indCompletadoHoy ? 'Completado hoy' : 'Completar hoy' }}
      </button>
      <button
        class="tarjeta-habito__editar"
        type="button"
        :aria-label="`Editar hábito ${habito.nombre}`"
        @click="$emit('solicitar-edicion', habito)"
      >
        Editar
      </button>
      <button
        class="tarjeta-habito__eliminar"
        type="button"
        :aria-label="`Eliminar hábito ${habito.nombre}`"
        @click="$emit('solicitar-eliminacion', habito)"
      >
        Eliminar
      </button>
    </div>
    <span v-else class="tarjeta-habito__estado">Activo</span>
  </article>
</template>

<style scoped src="./tarjeta-habito.css"></style>
