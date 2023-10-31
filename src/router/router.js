
import { createRouter, createWebHistory } from 'vue-router'
import LoginPageView from '../views/LoginPageView.vue'
import App from '../App.vue'
import StudentWarView from '../views/StudentWarView.vue'
import StudentHomePageView from '../views/StudentHomePageView.vue'
const routes = [{
    path: '/',           //This is the parent route
    name: 'Login',
    component: LoginPageView
    
},
{
    path: '/studenthome',                  //Will need to add id param to this route
    component: StudentHomePageView,
    children: [                     //Is a nested route in HomePageView,
        {
            path: 'studentwar',
            component: StudentWarView
        },
        {
            path: '',
            component: StudentWarView
        }
    ]     
},
{                                 //Any other route will redirect to login
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: LoginPageView
}

]


const router = createRouter({
    history: createWebHistory(),
    routes
  })

//   router.beforeEach(async (to, from) => {
//     if (
//       // make sure the user is authenticated
//       // ❗️ Avoid an infinite redirect   ❗️      //Will need this to ensure user is logged in
//       to.path == '/home/StudentWAR'
//     ) {
//       // redirect the user to the login page
//       return {name: 'Login'}
//     }
//   })
  
  export default router