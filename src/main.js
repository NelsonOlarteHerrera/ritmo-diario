import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import enrutador from './router'

const aplicacion = createApp(App)
const pinia = createPinia()

aplicacion.use(pinia)
aplicacion.use(enrutador)
aplicacion.mount('#app')
