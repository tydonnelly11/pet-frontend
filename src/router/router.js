
import { createRouter, createWebHistory } from 'vue-router'
import LoginPageView from '../views/LoginPageView.vue'
import App from '../App.vue'
import StudentWarView from '../views/StudentWarView.vue'
import HomePage from '../views/HomePageView.vue'
const routes = [{
    path: '/',
    name: 'login',
    component: LoginPageView
    
},
{
    path: '/home',
    component: HomePage,
    children: [                     //Is a nested route witin HomePageView
        {
            path: 'StudentWAR',
            component: StudentWarView
        },
    ]     
},

{
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: LoginPageView
}
]


const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router