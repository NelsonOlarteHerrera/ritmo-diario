<script src="./VistaEstadisticas.js"></script>

<template>
  <section class="vista">
    <div class="vista__encabezado">
      <div>
        <h1 id="titulo-pagina">Estadísticas</h1>
        <AvisoEjemplos>
          <p class="vista__descripcion">Revisa tus días completados y tus rachas.</p>
        </AvisoEjemplos>
      </div>
    </div>

    <div class="solo-lectores" role="status" aria-atomic="true">{{ anuncioEstado }}</div>
    <Transition name="mensaje">
      <p v-if="mensajeEstado" class="estadisticas__mensaje">{{ mensajeEstado }}</p>
    </Transition>

    <section class="estadisticas" aria-labelledby="titulo-estadisticas-habitos">
      <div class="estadisticas__encabezado">
        <div>
          <h2 id="titulo-estadisticas-habitos">Constancia por hábito</h2>
        </div>
        <span v-if="habitos.length" class="estadisticas__cantidad">
          {{ habitos.length }} {{ habitos.length === 1 ? 'hábito' : 'hábitos' }}
        </span>
      </div>

      <div v-if="habitos.length" class="estadisticas__lista">
        <TarjetaEstadisticaHabito
          v-for="habito in habitos"
          :key="habito.id"
          :habito="habito"
          @alternar-fecha="solicitarCambioHistorico"
        />
      </div>

      <EstadoVacio
        v-else
        titulo="Aún no hay estadísticas"
        descripcion="Crea un hábito para ver aquí su historial y sus rachas."
      >
        <template #accion>
          <BotonBase ruta="/habitos">Ir a Hábitos</BotonBase>
        </template>
      </EstadoVacio>
    </section>

    <ModalBase
      :ind-abierto="Boolean(cambioHistorico)"
      titulo="Cambiar un día anterior"
      @cerrar="cancelarCambioHistorico"
    >
      <p v-if="cambioHistorico && habitoCambioHistorico">
        ¿Deseas marcar el <strong>{{ fechaCambioVisible }}</strong> como
        <strong>{{ indFechaMarcada ? 'pendiente' : 'completado' }}</strong> para
        <strong>{{ habitoCambioHistorico.nombre }}</strong
        >?
      </p>
      <p>Este cambio actualizará sus estadísticas de inmediato.</p>
      <template #acciones>
        <BotonBase variante="secundario" @presionar="cancelarCambioHistorico">Conservar registro</BotonBase>
        <BotonBase @presionar="confirmarCambioHistorico">{{
          indFechaMarcada ? 'Marcar pendiente' : 'Marcar completado'
        }}</BotonBase>
      </template>
    </ModalBase>
  </section>
</template>

<style scoped src="./vista-estadisticas.css"></style>
