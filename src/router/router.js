
import { createRouter, createWebHistory } from 'vue-router'
import LoginPageView from '../views/LoginPageView.vue'
import App from '../App.vue'
const routes = [{
    path: '/login',
    name: 'LoginPageView',
    component: () => import('../views/LoginPageView.vue')
},

{ 
    path: '/:catchAll(.*)',
    name: 'App',
    component: LoginPageView}
]


const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router