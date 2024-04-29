<template>
   <div class="home-container">
      <NavbarSide @update:sidebarState="toggleSidebar" />
      <div class="main-item" :class="{ shifted: isSidebarOpen }">
         <div class="top-bar">
            <WeekDropdown
               :displayedWeeks="storeWeek.weeksForSemester"
               :selectWeek="storeWeek.currentWeekId"
               :currentWeekProp="storeWeek.currentWeek"
            >
            </WeekDropdown>
            
         </div>
         <div class="profile">
               <p>{{ storeUser.userFullName }}</p>
            </div>
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
import NavbarSide from '@/components/student/NavbarSide.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeTeam } from '@/stores/storeTeam.js'
import { storeUser } from '@/stores/store.js'
import apiClient from '@/axios-setup.js'
export default {
   name: 'StudentHomePageView',
   components: {
      NavbarSide,
      WeekDropdown,
   },
   data() {
      return {
         storeWeek,
         storeTeam,
         storeUser,
         isSidebarOpen: false,
      }
   },
   methods: {
      toggleSidebar(isOpen) {
         this.isSidebarOpen = isOpen
      },
      getTeamMembers() {
         const auth = localStorage.getItem('auth')

         apiClient
            .get(
               `${this.$baseURL}/api/v1/team/getStudents/${storeUser.teamId}`,
               {
                  headers: { Authorization: `Bearer ${auth}` },
               }
            )
            .then((response) => {
               console.log(response.data.data)
               storeTeam.setTeamMembers(response.data.data)
            })
            .catch((error) => {
               console.log(error)
            })
      },
   },
   computed: {},
   created() {
      storeWeek.calcCurrentWeek()
      this.getTeamMembers()
   },
}
</script>

<style scoped>
.home-container {
   display: flex;
   height: 100vh;
}
.main-item {
   flex-grow: 1;
   transition: margin-left 0.5s; /* Smooth transition for margin changes */
   margin-left: 78px;
}

.main-item.shifted {
   margin-left: 300px;
}
.top-bar {
   display: flex;
   flex-direction: row;
   position: relative;
}
.profile {
   position: absolute;
   top: 25px;
   font-size: 1.25em;
   right: 4%;
   background-color: #743ae1;
   font-weight: 450;
   color: white;
   padding: 15px;
   border-radius: 8px;
   margin-bottom: 10px;
   height: 75px;
   text-align: center;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.profile > p{
   color: white;
}
</style>
