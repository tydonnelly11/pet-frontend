import { createRouter, createWebHistory } from 'vue-router'
import LoginPageView from '../views/LoginPageView.vue'
import App from '../App.vue'
import StudentWarView from '../views/student/StudentWarView.vue'
import StudentHomePageView from '../views/student/StudentHomePageView.vue'
import StudentPeerEvalView from '../views/student/StudentPeerEvalView.vue'
import StudentTeamView from '../views/student/StudentTeamView.vue'
import InstructorHomePage from '../views/instructor/InstructorHomePageView.vue'
import InstructorPeerEvalView from '../views/instructor/InstructorPeerEvalView.vue'
// import InstructorTeamView from '../views/instructor/InstructorTeamView.vue';
import RegisterPageView from '../views/RegisterPageView.vue'
import InstructorSectionView from '../views/instructor/InstructorSectionView.vue'
import InstructorTeamEditView from '../views/instructor/InstructorTeamEditView.vue'
import { storeUser } from '../stores/store.js'
import WaitingForTeam from '@/components/student/WaitingForTeam.vue'
import InstructorRubricView from '../views/instructor/InstructorRubricView.vue'
import InstructorWARView from '../views/instructor/InstructorWARView.vue'
import StudentWarAndEval from '@/components/instructor/StudentWarAndEval.vue'
import InstructorShowSectionView from '@/views/instructor/InstructorShowSectionView.vue'
import TeamWarAndEdit from '../components/instructor/TeamWarAndEdit.vue'
import RegisterPageInstructorView from '../components/instructor/RegisterPageInstructorView.vue'
import AssistantInstructorHomePage from '../views/assistant/AssistantIntructorHomePageView.vue'
import AssistantInstructorRubricView from '../views/assistant/AssistantInstructorRubricView.vue'
import AssistantInstructorWARView from '../views/assistant/AssistantIntructorWARView.vue'
import AssistantInstructorPeerEvalView from '../views/assistant/AssistantInstructorPeerEvalView.vue'
import ManageAssistantInstructorView from '../views/instructor/ManageAssistantInstructorView.vue'

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
      path: '/auth/register/assistantInstructor/token=:token',
      name: 'RegisterIns',
      component: RegisterPageInstructorView,

   },
   {
      path: '/waitingroom',
      component: WaitingForTeam,
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
            path: '', // No leading slash for child routes
            name: 'InstructorPeerEval',
            component: InstructorPeerEvalView,
         },
         {
            path: 'rubric',
            name: 'InstructorRubric',
            component: InstructorRubricView,

         },
         {
            path : 'manageassistant',
            name : 'InstructorManageAssistant',
            component : ManageAssistantInstructorView

         },
         {
            path: 'war',
            name: 'InstructorWar',
            component: InstructorWARView,
         },
         // {
         //    path: 'team/:teamId', // Dynamic segment for team ID
         //    name: 'InstructorTeam',
         //    component: InstructorTeamView,
         //    props: true // This allows you to pass the teamId as a prop to the component
         // },
         {
            path: 'section',
            name: 'InstructorSection',
            component: InstructorSectionView,

         },
         {
            path: 'showsection',
            name: 'InstructorShowSection',
            component: InstructorShowSectionView,
         },
         
         {
            path: 'editteams',
            name: 'InstructorEditTeams',
            component: InstructorTeamEditView,
            props: true,

         },
         {
            path: ':teamid/:studentid/:studentName',
            name: 'InstructorViewStudent',
            component: StudentWarAndEval,
            props: true,
         },
         {
            path: ':teamid:/:teamname/:sectionId',
            name: 'InstructorViewTeam',
            component: TeamWarAndEdit,
            props: true,
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

   {
      path: '/assistantinstructorhome',
      component: AssistantInstructorHomePage,
      children: [
         {
            path: '',
            name: 'AssistantInstructorPeerEval',
            component: AssistantInstructorPeerEvalView,
         },
         {
            path: 'rubric',
            name: 'AssistantInstructorRubric',
            component: AssistantInstructorRubricView,

         },
         {
            path: 'war',
            name: 'AssistantInstructorWar',
            component: AssistantInstructorWARView,
         },
      ]
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

  router.beforeEach(async (to, from) => {
   const loggedIn = localStorage.getItem('logginstatus')
   if (!loggedIn) {
      // Allow access to the login page
      if (to.path === '/') {
          return true;
      }

      // Allow access to the registration page (adjust the condition to match your register route pattern)
      if (to.path.startsWith('/auth/register/student/token=') || to.path.startsWith('/auth/register/assistantInstructor/token=')) {
          return true;
      }

      // For all other routes, redirect to the login page
      return {name: 'Login'};
  }

  // If logged in, continue as normal
  return true;
})

export default router