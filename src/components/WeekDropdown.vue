<template>
   <div class="dropdown-center">
      <a
         class="btn btn-primary dropdown-toggle"
         href="#"
         role="button"
         data-bs-toggle="dropdown"
         aria-expanded="false"
         :style="'width: 40%;'"
      >
         {{
            selectWeek
               ? this.selectWeek
               : this.currentWeek.start + '-' + this.currentWeek.end
         }}
      </a>

      <ul class="dropdown-menu" :style="'columns : 3;'">
         <li
            v-for="week in displayedWeeks"
            :value="week.id"
            @click="$emit('selectWeek', week), userSelectsWeek()"
         >
            <!--@Click Sends week to parent-->

            <a class="dropdown-item" href="#">{{ convertWeekFormat(week) }}</a>
         </li>
      </ul>
   </div>
</template>

<script>
import { ref } from 'vue'
export default {
   name: 'WeekDropdown',
   props: {
      displayedWeeks: Array,
      selectWeek: String,
      currentWeek: Object,
   },
   data() {
      return {
         hasSelectedWeek: ref(false),
      }
   },
   methods: {
      userSelectsWeek() {
         console.log(this.displayedWeeks)
         this.hasSelectedWeek = true
      },
      getCurrentWeek() {
         var today = new Date()
         var dd = String(today.getDate()).padStart(2, '0')
         var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
         var yyyy = today.getFullYear()
         today = yyyy + '-' + mm + '-' + dd
         var currentWeek = this.weeks.find((week) => {
            var weekStart = week.split(' ')[0]
            var weekEnd = week.split(' ')[2]
            return today >= weekStart && today <= weekEnd
         })
         return currentWeek
      },
      convertWeekFormat(week) {
         var weekStart = week.start
         var weekEnd = week.end
         return weekStart + ' to ' + weekEnd
      },
   },
   computed: {},

   //Note for future self while doing visual only, so i think I
   //should try to emit event to warList which I think will handle what week is
   //in the little row as well as adding rows
   //also look at bootstrap docs
}
</script>

<style scoped></style>
