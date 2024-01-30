<template>
   <div class="home-container">
     <div class="sidebar">
       <InstructorNavbarSide />
     </div>

   <div class="main-item">
      <!-- <SectionDropdown/> -->
      <router-view> </router-view>
   </div>
   </div>
</template>

<script setup>
import InstructorNavbarSide from '../../components/InstructorNavbarSide.vue'
import WeekDropdown from '../../components/WeekDropdown.vue';
import {storeWeek} from '@/stores/storeWeek.js';
import { storeSection } from '../../stores/storeSection';
import SectionDropdown from '../../components/instructor/SectionDropdown.vue';
</script>

<script>
export default {
   name: 'InstructorHomePageView',
   components: {
      InstructorNavbarSide,
      WeekDropdown,
      SectionDropdown
   },
   data() {
      return {
         storeWeek,
         storeSection
      }
   },
   methods: {},
   computed: {
      
   },
   watch: {
      
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

.home-container {
  display: flex;
  height: 100vh;
  background-color: #E4E9F7; /* Set background color for the whole page */
}
.sidebar {
   width: 78px;
   margin-left: auto;

}

.main-item {
   width: 100%;
   display: flex;
   flex-direction: column;
   background-color: #E4E9F7;
}
</style>
