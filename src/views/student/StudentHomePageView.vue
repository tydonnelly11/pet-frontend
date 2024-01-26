<template>
   <div class="sidebar">
      <NavbarSide />
   </div>

   <div class="main-item">
      <WeekDropdown :displayedWeeks="storeWeek.weeksForSemester" 
      :selectWeek="storeWeek.currentWeekId" 
      :currentWeekProp="storeWeek.currentWeek">
      </WeekDropdown>
      

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
         axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/team/getStudents/${storeUser.teamId}`,
         {
             withCredentials: true,
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
}
</style>
