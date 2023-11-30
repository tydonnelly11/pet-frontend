import { createRouter, createWebHistory } from 'vue-router'
import LoginPageView from '../views/LoginPageView.vue'
import App from '../App.vue'
import StudentWarView from '../views/StudentWarView.vue'
import StudentHomePageView from '../views/StudentHomePageView.vue'
import StudentPeerEvalView from '../views/StudentPeerEvalView.vue'
import StudentTeamView from '..//views/StudentTeamView.vue'
import InstructorHomePage from '../views/instructor/InstructorHomePageView.vue'
import InstructorPeerEvalView from '../views/instructor/InstructorPeerEvalView.vue'
import InstructorTeamView from '../views/instructor/InstructorTeamView.vue';


const routes = [
   {
      path: '/', //This is the parent route
      name: 'Login',
      component: LoginPageView,
   },
   {
      path: '/studenthome', //Will need to add id param to this route
      component: StudentHomePageView,
      children: [
         //Is a nested route in HomePageView,
         {
            path: 'studentwar',
            component: StudentWarView,
         },
         {
            path: '',
            component: StudentWarView,
         },
         {
            path: 'studentpeereval',
            component: StudentPeerEvalView,
         },
         {
            path: 'team',
            component: StudentTeamView,
         },
      ],
   },
   {
      path: '/instructorhome',
      component: InstructorHomePage,
      children: [
         {
            path: 'instructorpeereval', // No leading slash for child routes
            name: 'InstructorPeerEval',
            component: InstructorPeerEvalView,
         },
         {
            path: 'team/:teamId', // Dynamic segment for team ID
            name: 'InstructorTeam',
            component: InstructorTeamView,
            props: true // This allows you to pass the teamId as a prop to the component
         },
         // The Instructor WAR is going to be added later
      ],
   },
   {
      //Any other route will redirect to login
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: LoginPageView,
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
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
