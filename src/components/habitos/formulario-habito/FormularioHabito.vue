<script src="./FormularioHabito.js"></script>

<template>
  <form ref="elementoFormulario" class="formulario-habito" novalidate @submit.prevent="manejarEnvio">
    <div class="solo-lectores" role="alert" aria-atomic="true">{{ avisoErrores }}</div>
    <div class="formulario-habito__encabezado">
      <p>{{ indEdicion ? 'Actualiza los detalles del hábito.' : 'Define una acción para repetir cada día.' }}</p>
      <p>Los campos marcados con <span aria-hidden="true">*</span> son obligatorios.</p>
    </div>

    <div class="formulario-habito__campos">
      <div class="formulario-habito__campo formulario-habito__campo--completo">
        <label for="nombre-habito">Nombre <span aria-hidden="true">*</span></label>
        <input
          id="nombre-habito"
          ref="campoNombre"
          v-model="formulario.nombre"
          name="nombre"
          type="text"
          maxlength="60"
          autocomplete="off"
          required
          :aria-invalid="Boolean(errores.nombre)"
          :aria-describedby="errores.nombre ? 'error-nombre-habito' : 'ayuda-nombre-habito'"
          @blur="validarCampo('nombre')"
        />
        <p v-if="errores.nombre" id="error-nombre-habito" class="formulario-habito__error">{{ errores.nombre }}</p>
        <p v-else id="ayuda-nombre-habito" class="formulario-habito__ayuda">Entre 3 y 60 caracteres.</p>
      </div>

      <div class="formulario-habito__campo formulario-habito__campo--completo">
        <label for="descripcion-habito">Descripción</label>
        <textarea
          id="descripcion-habito"
          v-model="formulario.descripcion"
          name="descripcion"
          rows="3"
          maxlength="180"
          :aria-invalid="Boolean(errores.descripcion)"
          :aria-describedby="errores.descripcion ? 'error-descripcion-habito' : 'ayuda-descripcion-habito'"
          @blur="validarCampo('descripcion')"
        ></textarea>
        <p v-if="errores.descripcion" id="error-descripcion-habito" class="formulario-habito__error">
          {{ errores.descripcion }}
        </p>
        <p v-else id="ayuda-descripcion-habito" class="formulario-habito__ayuda">Opcional, hasta 180 caracteres.</p>
      </div>

      <div class="formulario-habito__campo">
        <label for="categoria-habito">Categoría <span aria-hidden="true">*</span></label>
        <select
          id="categoria-habito"
          v-model="formulario.categoria"
          name="categoria"
          required
          :aria-invalid="Boolean(errores.categoria)"
          :aria-describedby="errores.categoria ? 'error-categoria-habito' : undefined"
          @blur="validarCampo('categoria')"
        >
          <option value="">Selecciona una categoría</option>
          <option v-for="categoria in categorias" :key="categoria.valor" :value="categoria.valor">
            {{ categoria.etiqueta }}
          </option>
        </select>
        <p v-if="errores.categoria" id="error-categoria-habito" class="formulario-habito__error">
          {{ errores.categoria }}
        </p>
      </div>

      <fieldset class="formulario-habito__campo formulario-habito__colores">
        <legend>Color <span aria-hidden="true">*</span></legend>
        <div class="formulario-habito__opciones-color">
          <label v-for="color in colores" :key="color.valor" class="formulario-habito__color">
            <input v-model="formulario.color" type="radio" name="color" :value="color.valor" required />
            <span :class="`formulario-habito__muestra formulario-habito__muestra--${color.clase}`"></span>
            <span>{{ color.etiqueta }}</span>
          </label>
        </div>
      </fieldset>
    </div>

    <div class="formulario-habito__acciones">
      <BotonBase v-if="indEdicion" variante="secundario" @presionar="cancelarEdicion">Cancelar edición</BotonBase>
      <BotonBase tipo="submit">{{ indEdicion ? 'Guardar cambios' : 'Crear hábito' }}</BotonBase>
    </div>
  </form>
</template>

<style scoped src="./formulario-habito.css"></style>
