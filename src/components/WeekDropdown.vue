<template>
   <div class="week-dropdown-container" style="width: 100%;">
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
               v-for="week in filteredWeeks"
               :value="week.id"
               @click="storeWeek.updateSelectedWeek(week)"
            >
               <a v-if="!isCurrentWeek(week.id)" class="dropdown-item" href="#">{{ convertWeekFormat(week) }}</a>
               <a v-else class="active">{{ convertWeekFormat(week) }}</a> 
            </li>
         </ul>
      </div>
      <div class="button-container">
         <button class="prev-week-btn" @click="setPrevWeek()">Previous Week</button>
         <button class="next-week-btn" @click="setNextWeek()">Next Week</button>
      </div>
   </div>
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
         if(week == undefined){
            return
         }
         else{
            var weekStart = week.start
            var weekEnd = week.end
            return weekStart + ' to ' + weekEnd
         }
      },
      isCurrentWeek(weekId) {
         return weekId == storeWeek.currentWeek.id
      },
      setPrevWeek(){
         var prevWeek = (storeWeek.weeksForSemester[storeWeek.weeksForSemester.indexOf((storeWeek.selectedWeek)) - 1])
         if(prevWeek != null){
            storeWeek.updateSelectedWeek(prevWeek)
         }
      },
      setNextWeek(){
         var nextWeek = (storeWeek.weeksForSemester[storeWeek.weeksForSemester.indexOf((storeWeek.selectedWeek)) + 1])
         storeWeek.updateSelectedWeek(nextWeek)

      }
   },
   computed: {

      filteredWeeks() {
         const currentWeekIndex = storeWeek.weeksForSemester.findIndex(week => week.id === storeWeek.currentWeek.id);
         const start = Math.max(currentWeekIndex - 5, 0);
         const end = Math.min(currentWeekIndex + 6, storeWeek.weeksForSemester.length); // +6 because slice is non-inclusive at the end
         return storeWeek.weeksForSemester.slice(start, end);
      }
      
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
.week-dropdown-container {
   margin-top: 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
}

.dropdown-center {
   margin-bottom: 10px; 
}

.button-container {
   display: flex;
   justify-content: center;
}

.prev-week-btn {
   width: 200px;
   border-radius: 12px;
   margin-right: 10px; 
}

.next-week-btn {
   width: 200px;
   border-radius: 12px;
}

@media screen and (max-width: 900px) {
   .button-container {
      flex-direction: column; 
   }
}
</style>

