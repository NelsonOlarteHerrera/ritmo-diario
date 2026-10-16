<script src="./LayoutPrincipal.js"></script>

<template>
  <div class="layout-principal">
    <a class="saltar-contenido" href="#contenido-principal">Saltar al contenido</a>
    <aside class="barra-lateral">
      <MarcaAplicacion />
      <NavegacionPrincipal />

      <div class="barra-lateral__pie">
        <SelectorTema :ind-tema-oscuro="indTemaOscuro" @alternar="alternarTema" />

        <div class="barra-lateral__almacenamiento">
          <span class="barra-lateral__estado" aria-hidden="true"></span>
          <span>Datos guardados en este navegador</span>
        </div>
      </div>
    </aside>

    <div class="layout-principal__contenido">
      <header class="cabecera-movil">
        <MarcaAplicacion ind-compacta />
        <SelectorTema ind-compacto :ind-tema-oscuro="indTemaOscuro" @alternar="alternarTema" />
      </header>

      <main
        id="contenido-principal"
        ref="contenidoPrincipal"
        class="contenido-principal"
        tabindex="-1"
        aria-labelledby="titulo-pagina"
      >
        <RouterView v-slot="{ Component }">
          <component :is="Component" class="vista-entrada" />
        </RouterView>
      </main>
    </div>

    <NavegacionPrincipal ind-movil />
  </div>
</template>

<style scoped src="./layout-principal.css"></style>
