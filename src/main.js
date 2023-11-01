import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'

createApp(App).use(router).mount('#app')
