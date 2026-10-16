<script src="./ModalBase.js"></script>

<template>
  <dialog
    ref="modal"
    class="modal-base"
    :aria-labelledby="idTitulo"
    @cancel.prevent="cerrarModal"
    @click="cerrarDesdeFondo"
    @keydown.esc.prevent="cerrarModal"
  >
    <Transition
      appear
      :css="false"
      @enter="abrirPanel"
      @leave="cerrarPanel"
      @enter-cancelled="cancelarAnimacion"
      @leave-cancelled="cancelarCierre"
    >
      <div v-if="indAbierto" class="modal-base__panel">
        <header class="modal-base__cabecera">
          <div>
            <h2 :id="idTitulo">{{ titulo }}</h2>
          </div>
          <button class="modal-base__cerrar" type="button" aria-label="Cerrar ventana" @click="cerrarModal">
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div class="modal-base__contenido">
          <slot />
        </div>

        <footer v-if="$slots.acciones" class="modal-base__acciones">
          <slot name="acciones" />
        </footer>
      </div>
    </Transition>
  </dialog>
</template>

<style scoped src="./modal-base.css"></style>
