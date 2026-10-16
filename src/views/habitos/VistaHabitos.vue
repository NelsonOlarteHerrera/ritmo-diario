<script src="./VistaHabitos.js"></script>
<template>
  <section class="vista">
    <div class="vista__encabezado">
      <div>
        <h1 id="titulo-pagina">Hábitos</h1>
        <AvisoEjemplos>
          <p class="vista__descripcion">Crea acciones claras que puedas repetir y revisar cada día.</p>
        </AvisoEjemplos>
      </div>
      <BotonBase :variante="habitoStore.habitos.length ? 'secundario' : 'primario'" @presionar="irAlFormulario"
        >Crear hábito</BotonBase
      >
    </div>
    <div class="solo-lectores" role="status" aria-atomic="true">{{ anuncioEstado }}</div>
    <Transition name="mensaje">
      <p v-if="mensajeEstado" class="vista-habitos__mensaje">{{ mensajeEstado }}</p>
    </Transition>
    <section class="vista-habitos__coleccion" aria-labelledby="titulo-coleccion-habitos">
      <div class="vista-habitos__encabezado-coleccion">
        <h2 id="titulo-coleccion-habitos">Hábitos registrados</h2>
        <span class="vista-habitos__cantidad">{{ textoCantidad }}</span>
      </div>
      <FiltrosCategoria :categoria-seleccionada="categoriaSeleccionada" @cambiar="cambiarCategoria" />
      <p class="solo-lectores" role="status" aria-atomic="true">{{ textoCantidad }} en la selección actual.</p>
      <Transition name="contenido" mode="out-in">
        <TransitionGroup
          v-if="habitosFiltrados.length"
          key="lista"
          name="tarjetas"
          tag="div"
          class="vista-habitos__lista"
          @before-leave="(tarjeta) => (tarjeta.inert = true)"
          @leave-cancelled="(tarjeta) => (tarjeta.inert = false)"
        >
          <TarjetaHabito
            v-for="habito in habitosFiltrados"
            :key="habito.id"
            :habito="habito"
            :ind-completado-hoy="habitoStore.indHabitoCompletadoHoy(habito.id)"
            ind-gestionable
            @alternar-cumplimiento="alternarCumplimiento"
            @solicitar-edicion="solicitarEdicion"
            @solicitar-eliminacion="solicitarEliminacion"
          />
        </TransitionGroup>
        <EstadoVacio
          v-else-if="habitoStore.habitos.length === 0"
          key="vacio-inicial"
          titulo="Aún no tienes hábitos"
          descripcion="Crea tu primer hábito para empezar a organizar y seguir tus acciones diarias."
        >
          <template #accion><BotonBase @presionar="irAlFormulario">Crear mi primer hábito</BotonBase></template>
        </EstadoVacio>
        <EstadoVacio
          v-else
          key="vacio-filtro"
          titulo="No hay hábitos en esta categoría"
          descripcion="Prueba otra categoría o vuelve a ver la colección completa."
        >
          <template #accion
            ><BotonBase variante="secundario" @presionar="cambiarCategoria('todas')">Ver todos</BotonBase></template
          >
        </EstadoVacio>
      </Transition>
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
<style scoped src="./vista-habitos.css"></style>
