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
import RegisterPageView from '../views/RegisterPageView.vue'
import InstructorSectionView from '../views/instructor/InstructorSectionView.vue'
import InstructorInviteStudentsView from '../views/instructor/InstructorInviteStudentsView.vue'
import { storeUser } from '../stores/store.js'


const routes = [
   {
      path: '/', //This is the parent route
      name: 'Login',
      component: LoginPageView,
      
   },
   {
      ///register/student?token=:token
      path: '/auth/register/student/token=:token',
      name: 'Register',
      component: RegisterPageView,
      //http://localhost:5173/auth/register/student?token=1
   
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
         {
            path: 'section',
            name: 'InstructorSection',
            component: InstructorSectionView,

         },
         {
            path: 'invite',
            name: 'InstructorInvite',
            component: InstructorInviteStudentsView,
         }
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

  router.beforeEach(async (to, from) => {
   if (!storeUser.isLoggedIn) {
      // Allow access to the login page
      if (to.path === '/') {
          return true;
      }

      // Allow access to the registration page (adjust the condition to match your register route pattern)
      if (to.path.startsWith('/auth/register/student/token=')) {
          return true;
      }

      // For all other routes, redirect to the login page
      return {name: 'Login'};
  }

  // If logged in, continue as normal
  return true;
})

export default router
