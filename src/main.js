import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { storeUser } from './stores/store.js';
import { storeSection } from './stores/storeSection.js';
import { storeWeek } from './stores/storeWeek.js';


const savedState = localStorage.getItem('storeUser');

if (savedState) {
  const parsedState = JSON.parse(savedState);
  Object.assign(storeUser, parsedState);
}
const savedState2 = localStorage.getItem('storeSection');
if (savedState2) {
    const parsedState = JSON.parse(savedState2);
    Object.assign(storeSection, parsedState);
}

const savedState3 = localStorage.getItem('storeWeek');
if (savedState3) {
    const parsedState = JSON.parse(savedState3);
    Object.assign(storeWeek, parsedState);
  }




import './scss/styles.scss'
createApp(App).use(router).mount('#app')
