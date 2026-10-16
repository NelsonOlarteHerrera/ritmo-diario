<script src="./VistaInicio.js"></script>
<template>
  <section class="vista vista-inicio">
    <div class="vista__encabezado">
      <div>
        <p class="vista__fecha">{{ fechaVisible }}</p>
        <h1 id="titulo-pagina">Tu ritmo de hoy</h1>
        <AvisoEjemplos>
          <p class="vista__descripcion">Marca lo que ya hiciste y sigue con tu día.</p>
        </AvisoEjemplos>
      </div>
    </div>
    <div class="solo-lectores" role="status" aria-atomic="true">{{ anuncioEstado }}</div>
    <Transition name="mensaje">
      <p v-if="mensajeEstado" class="vista-habitos__mensaje">{{ mensajeEstado }}</p>
    </Transition>
    <GraficoProgreso v-if="habitosActivos.length" :porcentaje="porcentajeProgresoDiario">
      <dl class="progreso-conteos">
        <div>
          <dt>Activos</dt>
          <dd>{{ habitosActivos.length }}</dd>
        </div>
        <div>
          <dt>Completados</dt>
          <dd>{{ numHabitosCompletadosHoy }}</dd>
        </div>
        <div>
          <dt>Pendientes</dt>
          <dd>{{ numHabitosPendientesHoy }}</dd>
        </div>
      </dl>
    </GraficoProgreso>
    <section class="seccion-habitos" aria-labelledby="titulo-habitos-activos">
      <div class="seccion-habitos__encabezado">
        <h2 id="titulo-habitos-activos">Hábitos de hoy</h2>
        <BotonBase v-if="habitosActivos.length" variante="secundario" @presionar="irAlFormulario"
          >Crear hábito</BotonBase
        >
      </div>
      <div v-if="habitosActivos.length" class="seccion-habitos__lista">
        <TarjetaHabito
          v-for="habito in habitosParaHoy"
          :key="habito.id"
          :habito="habito"
          :ind-completado-hoy="habitoStore.indHabitoCompletadoHoy(habito.id)"
          ind-gestionable
          ind-compacta
          @alternar-cumplimiento="alternarCumplimiento"
          @solicitar-edicion="solicitarEdicion"
          @solicitar-eliminacion="solicitarEliminacion"
        />
      </div>
      <EstadoVacio
        v-else
        :titulo="habitoStore.habitos.length ? 'No tienes hábitos activos' : 'Tu primer hábito empieza aquí'"
        descripcion="Crea una acción pequeña para empezar a registrar tu día."
      >
        <template #accion>
          <BotonBase @presionar="irAlFormulario">{{
            habitoStore.habitos.length ? 'Crear hábito' : 'Crear mi primer hábito'
          }}</BotonBase>
          <BotonBase v-if="habitoStore.habitos.length" variante="texto" ruta="/habitos"
            >Ver hábitos guardados</BotonBase
          >
        </template>
      </EstadoVacio>
    </section>
    <DialogosHabito
      ref="formularioHabito"
      :habito-por-editar="habitoPorEditar"
      :habito-por-eliminar="habitoPorEliminar"
      :ind-formulario-abierto="indFormularioAbierto"
      @guardar="guardarHabito"
      @cancelar-edicion="cancelarEdicion"
      @cancelar-eliminacion="cancelarEliminacion"
      @confirmar-eliminacion="confirmarEliminacion"
    />
  </section>
</template>
<style scoped src="./vista-inicio.css"></style>
