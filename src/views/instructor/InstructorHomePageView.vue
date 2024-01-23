<template>
   <div class="sidebar">
      <InstructorNavbarSide />
   </div>

   <div class="main-item">
      <WeekDropdown :displayedWeeks="storeWeek.weeksForSemester" 
      :selectWeek="storeWeek.currentWeekId" 
      :currentWeekProp="storeWeek.currentWeek">
      </WeekDropdown>
      <router-view> </router-view>
   </div>
</template>

<script setup>
import InstructorNavbarSide from '../../components/InstructorNavbarSide.vue'
import WeekDropdown from '../../components/WeekDropdown.vue';
import {storeWeek} from '@/stores/storeWeek.js';
</script>

<script>
export default {
   name: 'InstructorHomePageView',
   components: {
      InstructorNavbarSide,
      WeekDropdown,
   },
   data() {
      return {}
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
