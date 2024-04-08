import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { storeUser } from './stores/store.js';
import { storeSection } from './stores/storeSection.js';
import { storeWeek } from './stores/storeWeek.js';
import { setAuthHeader } from './axios-setup.js';
import { storeTeam } from './stores/storeTeam.js';



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

const savedState4 = localStorage.getItem('storeTeam');

if (savedState4) {
  const parsedState = JSON.parse(savedState4);
  Object.assign(storeTeam, parsedState);
}

const savedState5 = localStorage.getItem('auth');

if(savedState5){
  setAuthHeader(savedState5);
}






import './scss/styles.scss'
// import { c } from 'vitest/dist/reporters-5f784f42.js';
createApp(App).use(router).mount('#app')

// Import Font Awesome related packages
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add Font Awesome icons to the library
library.add(fas);

// Add Font Awesome component globally
createApp(App).component('font-awesome-icon', FontAwesomeIcon);
