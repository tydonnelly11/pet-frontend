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
import NavbarSide from '../components/student/NavbarSide.vue'
import WeekDropdown from '../components/WeekDropdown.vue';
import {storeWeek} from '../stores/storeWeek.js';
export default {
   name: 'StudentHomePageView',
   components: {
      NavbarSide,
      WeekDropdown,
   },
   data() {
      return {
         storeWeek,
      }
   },
   methods: {},
   computed: {
      
   },
   created() {
      storeWeek.calcCurrentWeek();
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
