import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './scss/styles.scss'
createApp(App).use(router).mount('#app')
