import { createRouter, createWebHistory } from 'vue-router'

const rutas = [
  {
    path: '/',
    name: 'resumen.ver',
    component: () => import('../views/inicio/VistaInicio.vue'),
    meta: { titulo: 'Resumen' },
  },
  {
    path: '/habitos',
    name: 'habitos.ver',
    component: () => import('../views/habitos/VistaHabitos.vue'),
    meta: { titulo: 'Hábitos' },
  },
  {
    path: '/estadisticas',
    name: 'estadisticas.ver',
    component: () => import('../views/estadisticas/VistaEstadisticas.vue'),
    meta: { titulo: 'Estadísticas' },
  },
  {
    path: '/configuracion',
    name: 'configuracion.ver',
    component: () => import('../views/configuracion/VistaConfiguracion.vue'),
    meta: { titulo: 'Configuración' },
  },
]

const enrutador = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: rutas,
})

enrutador.afterEach((ruta) => {
  document.title = `${ruta.meta.titulo} | Ritmo Diario`
})

export default enrutador
