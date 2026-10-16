<script src="./VistaConfiguracion.js"></script>

<template>
  <section class="vista">
    <div class="vista__encabezado">
      <div>
        <h1 id="titulo-pagina">Configuración</h1>
        <p class="vista__descripcion">Elige el tema y administra tus hábitos guardados.</p>
      </div>
    </div>

    <div class="configuracion">
      <section class="configuracion__seccion" aria-labelledby="titulo-apariencia">
        <div class="configuracion__encabezado">
          <div>
            <h2 id="titulo-apariencia">Apariencia</h2>
            <p>Elige el tema que te resulte más cómodo. Tu preferencia se conserva en este navegador.</p>
          </div>
        </div>

        <div class="configuracion__control">
          <div>
            <strong>Tema de la aplicación</strong>
            <span>Actualmente usas el tema {{ nomTemaActual }}.</span>
          </div>
          <SelectorTema :ind-tema-oscuro="indTemaOscuro" @alternar="alternarTema" />
        </div>
      </section>

      <section class="configuracion__seccion" aria-labelledby="titulo-datos">
        <div class="configuracion__encabezado">
          <div>
            <h2 id="titulo-datos">Gestión de datos</h2>
            <p>Tus hábitos y su historial se guardan en este navegador.</p>
          </div>
        </div>

        <dl class="configuracion__resumen">
          <div>
            <dt>Contenido guardado</dt>
            <dd>{{ numHabitos }} {{ nomHabitos }}</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd>Este navegador</dd>
          </div>
        </dl>

        <div class="configuracion__respaldo">
          <article>
            <strong>Exportar respaldo</strong>
            <p>Descarga tus hábitos y su historial en un archivo de respaldo (.json).</p>
            <BotonBase variante="secundario" @presionar="exportarRespaldo">Descargar respaldo</BotonBase>
          </article>
          <article class="configuracion__importacion">
            <strong>Importar respaldo</strong>
            <p id="ayuda-archivo-respaldo">
              Selecciona un respaldo de Ritmo Diario de hasta 1 MB. Nada cambiará sin tu confirmación.
            </p>
            <input
              id="archivo-respaldo"
              class="configuracion__archivo"
              type="file"
              accept="application/json,.json"
              aria-label="Seleccionar archivo JSON"
              aria-describedby="ayuda-archivo-respaldo"
              @change="manejarSeleccionRespaldo"
            />
          </article>
        </div>

        <div class="configuracion__reinicio">
          <div>
            <strong>Restablecer hábitos</strong>
            <p>Vuelve a los tres hábitos de ejemplo y elimina tus cambios y registros de cumplimiento.</p>
          </div>
          <BotonBase variante="peligro" @presionar="abrirModalReinicio">Restablecer hábitos</BotonBase>
        </div>

        <div class="solo-lectores" role="status" aria-atomic="true">
          {{ anuncioDatos?.tipo === 'exito' ? anuncioDatos.texto : '' }}
        </div>
        <div class="solo-lectores" role="alert" aria-atomic="true">
          {{ anuncioDatos?.tipo === 'error' ? anuncioDatos.texto : '' }}
        </div>
        <Transition name="mensaje">
          <p
            v-if="mensajeDatos"
            class="configuracion__mensaje"
            :class="{ 'configuracion__mensaje--error': mensajeDatos.tipo === 'error' }"
          >
            {{ mensajeDatos.texto }}
          </p>
        </Transition>
      </section>

      <section class="configuracion__seccion configuracion__seccion--destacada" aria-labelledby="titulo-privacidad">
        <div class="configuracion__encabezado">
          <div>
            <h2 id="titulo-privacidad">Tus hábitos permanecen contigo</h2>
            <p>Tus hábitos y preferencias se guardan solo en este navegador y no se envían a un servidor.</p>
          </div>
        </div>

        <ul class="configuracion__garantias">
          <li>Sin registro ni inicio de sesión.</li>
          <li>Sin seguimiento de actividad.</li>
          <li>Sin sincronización automática entre dispositivos.</li>
        </ul>
      </section>
    </div>

    <ModalBase
      :ind-abierto="indModalImportacionAbierto"
      titulo="¿Reemplazar tus hábitos?"
      @cerrar="cerrarModalImportacion"
    >
      <p>
        El archivo <strong>{{ nomArchivoImportar }}</strong> contiene {{ habitosImportar.length }}
        {{ habitosImportar.length === 1 ? 'hábito' : 'hábitos' }}. Al importarlo, reemplazará todos los hábitos y el
        historial actuales.
      </p>
      <p>Tu preferencia de tema no cambiará.</p>

      <template #acciones>
        <BotonBase variante="secundario" @presionar="cerrarModalImportacion">Cancelar importación</BotonBase>
        <BotonBase variante="peligro" @presionar="confirmarImportacion">Importar y reemplazar</BotonBase>
      </template>
    </ModalBase>

    <ModalBase :ind-abierto="indModalReinicioAbierto" titulo="¿Restablecer tus hábitos?" @cerrar="cerrarModalReinicio">
      <p>
        Se eliminarán los hábitos que creaste, tus ediciones y todo el historial de cumplimiento. Ritmo Diario volverá a
        mostrar los tres hábitos de ejemplo. Esta acción no se puede deshacer.
      </p>
      <p>Tu preferencia de tema no cambiará.</p>

      <template #acciones>
        <BotonBase variante="secundario" @presionar="cerrarModalReinicio">Conservar mis datos</BotonBase>
        <BotonBase variante="peligro" @presionar="confirmarReinicio">Restablecer hábitos</BotonBase>
      </template>
    </ModalBase>
  </section>
</template>

<style scoped src="./vista-configuracion.css"></style>
