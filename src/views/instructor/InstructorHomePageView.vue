<template>
   <div class="home-container" style="margin-top: 20px">
      <InstructorNavbarSide @update:sidebarState="toggleSidebar" />
      <div class="main-item" :class="{ shifted: isSidebarOpen }">
         <router-view> </router-view>
      </div>
   </div>
</template>

<script setup>
import InstructorNavbarSide from '../../components/InstructorNavbarSide.vue'
import WeekDropdown from '../../components/WeekDropdown.vue'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeSection } from '../../stores/storeSection'
import apiClient from '../../axios-setup.js'
</script>

<script>
export default {
   name: 'InstructorHomePageView',
   components: {
      InstructorNavbarSide,
      WeekDropdown,
   },
   data() {
      return {
         isSidebarOpen: false,
         storeSection,
      }
   },
   methods: {
      toggleSidebar(isOpen) {
         this.isSidebarOpen = isOpen
      },
   },
   //computed: {

   // },
   created() {
      // this.getWeeksForSection(storeSection.selectedSectionId);
      // storeWeek.calcCurrentWeek();
      console.log(storeWeek.currentWeek)
      console.log(storeWeek.currentWeekId)
      console.log(storeWeek.weeksForSemester)
   },
}
</script>

<style scoped>
.home-container {
   display: flex;
   height: 100vh;
   background-color: #e4e9f7;
}

/*
.sidebar {
   width: 78px;
   margin-left: auto; 

}
*/

.main-item {
   flex-grow: 1;
   transition: margin-left 0.5s;
   overflow-x: unset;
   margin-left: 78px;
}

.main-item.shifted {
   margin-left: 250px;
}
</style>
