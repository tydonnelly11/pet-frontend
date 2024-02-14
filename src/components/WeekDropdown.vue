<template>
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

            <a class="dropdown-item" href="#">{{ convertWeekFormat(week) }}</a>
         </li>
      </ul>
   </div>
</template>

<script>
import { ref, toRaw } from 'vue'
import { storeWeek } from '../stores/storeWeek.js'
export default {
   name: 'WeekDropdown',
   props: {},
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
   },
   computed: {},
   mounted() {},

   //Note for future self while doing visual only, so i think I
   //should try to emit event to warList which I think will handle what week is
   //in the little row as well as adding rows
   //also look at bootstrap docs
}
</script>

<style scoped></style>
