<template>
   <button @click="setPrevWeek()">Previous Week</button>
   <div class="dropdown-center">
      <a
         class="btn btn-primary dropdown-toggle"
         href="#"
         role="button"
         data-bs-toggle="dropdown"
         aria-expanded="false"
      >
         {{
            storeWeek.selectedWeek
               ? convertWeekFormat(storeWeek.selectedWeek)
               : convertWeekFormat(storeWeek.currentWeek)
         }}
      </a>

      <ul class="dropdown-menu" :style="'columns : 3;'">
         <li
            
            v-for="week in storeWeek.weeksForSemester"
            :value="week.id"
            @click="storeWeek.updateSelectedWeek(week)"
         >
            <!--@Click Sends week to parent-->

            <a v-if=(!isCurrentWeek(week.id)) class="dropdown-item" href="#">{{ convertWeekFormat(week) }}</a>
            <a v-else class="active">{{ convertWeekFormat(week) }}</a> 
         </li>
      </ul>
   </div>
   <button @click="setNextWeek()">Next Week</button>
</template>

<script>
import { ref, toRaw } from 'vue'
import { storeWeek } from '../stores/storeWeek.js'
export default {
   name: 'WeekDropdown',
   props: {
      
   },
   data() {
      return {
         storeWeek,
         hasSelectedWeek: ref(false),
         defaultCurrentWeek: toRaw(this.currentWeekProp),
         currentWeekCalculated: false,
      }
   },
   methods: {
      userSelectsWeek() {
         console.log(this.displayedWeeks)
         this.hasSelectedWeek = true
      },
      
      convertWeekFormat(week) {
         var weekStart = week.start
         var weekEnd = week.end
         return weekStart + ' to ' + weekEnd
      },
      isCurrentWeek(weekId) {
         return weekId == storeWeek.currentWeek.id
      },
      setPrevWeek(){
         var prevWeek = (storeWeek.weeksForSemester[storeWeek.weeksForSemester.indexOf((storeWeek.selectedWeek)) - 1])
         console.log(prevWeek)
         storeWeek.updateSelectedWeek(prevWeek)},
      setNextWeek(){
         var nextWeek = (storeWeek.weeksForSemester[storeWeek.weeksForSemester.indexOf((storeWeek.selectedWeek)) + 1])
         storeWeek.updateSelectedWeek(nextWeek)

      }
   },
   computed: {
      
   },
   mounted() {
     
   },

   //Note for future self while doing visual only, so i think I
   //should try to emit event to warList which I think will handle what week is
   //in the little row as well as adding rows
   //also look at bootstrap docs
}
</script>

<style scoped>
.active{
   border-color: blue;
   text-decoration: none;
}
</style>
