import './assets/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from '@/stores/store'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
const store = useStore()

const savedToken = localStorage.getItem('userToken')
const savedUsername = localStorage.getItem('userName')
if (savedToken && savedUsername) {
  store.setUserLogin(true, savedToken, savedUsername)
}

app.mount('#app')
