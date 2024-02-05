<template>
   <div class="sidebar">
      <NavbarSide />
   </div>
   

      
   <div class="main-item">
      <div class="top-bar">
         
      <WeekDropdown :displayedWeeks="storeWeek.weeksForSemester" 
      :selectWeek="storeWeek.currentWeekId" 
      :currentWeekProp="storeWeek.currentWeek"
      :style="'width: 100%;'">
      </WeekDropdown>
      <div class="profile">
         <p>{{ storeUser.userFullName }}</p>
      </div>
      </div>

      <router-view></router-view>
   </div>
</template>

<script>
import NavbarSide from '@/components/student/NavbarSide.vue'
import WeekDropdown from '@/components/WeekDropdown.vue';
import { storeWeek } from '@/stores/storeWeek.js';
import { storeTeam } from '@/stores/storeTeam.js';
import { storeUser } from '@/stores/store.js';
import axios from 'axios';
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
      }
   },
   methods: {
      getTeamMembers() {
         const auth = localStorage.getItem('auth')

         axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/team/getStudents/${storeUser.teamId}`,
         {
             headers: { 'Authorization': `Bearer ${auth}` },
         }
         )
         .then((response) => {
            console.log(response.data.data)
            storeTeam.setTeamMembers(response.data.data);
            console.log(storeTeam.teamMembers);
         })
         .catch((error) => {
            console.log(error);
         })
      }
   },
   computed: {
      
   },
   created() {
      storeWeek.calcCurrentWeek();
      this.getTeamMembers();
      console.log(storeWeek.currentWeek)
      console.log(storeWeek.currentWeekId)
      console.log(storeWeek.weeksForSemester)
   }
}
</script>

<style scoped>
.sidebar {
   width: 20%;
   margin-left: 3.5%;
}

.main-item {
   width: 100%;
   display: flex;
   flex-direction: column;
   flex: 1 0 80%;
}
.top-bar{
   display: flex;
   flex-direction: row;
   position: relative;
   right: 2.5%;
}
.profile{
   position: relative;
   right: 2.5%;
   width: 20%;
}
</style>
