<template>
   <div class="student-team-view">
      <!-- <WeekDropdown
         :currentWeekProp="currentWeekVar"
         :selectWeek="this.selectedWeek"
         :displayedWeeks="weeks"
         @select-week="setSelectedWeek"
      ></WeekDropdown> -->
      <WarTeamTable :team="team"></WarTeamTable>
   </div>
</template>

<script>
import NavbarSide from '../components/student/NavbarSide.vue'
import WeekDropdown from '../components/WeekDropdown.vue'
import WarList from '../components/WarList.vue'
import WarTeamTable from '../components/WarTeamTable.vue'
import { ref } from 'vue'
export default {
   name: 'StudentTeamView',
   props: {
      selectWeek: String,
      currentWeek: String,
   },
   components: {
      NavbarSide,
      WeekDropdown,
      WarTeamTable,
   },
   data() {
      return {
         team: [
            {
               student: 'John Doe',
               tasks: [
                  {
                     task: 'Task 1',
                     plannedTask: 'Planned Task 1',
                     description: 'Description 1',
                     plannedHours: 1,
                     actualHours: 1,
                     status: 'Status 1',
                  },
                  {
                     task: 'Task 2',
                     plannedTask: 'Planned Task 2',
                     description: 'Description 2',
                     plannedHours: 2,
                     actualHours: 2,
                     status: 'Status 2',
                  },
                  {
                     task: 'Task 3',
                     plannedTask: 'Planned Task 3',
                     description: 'Description 3',
                     plannedHours: 3,
                     actualHours: 3,
                     status: 'Status 3',
                  },
               ],
            },
            {
               student: 'Jane Doe',
               tasks: [
                  {
                     task: 'Task 1',
                     plannedTask: 'Planned Task 1',
                     description: 'Description 1',
                     plannedHours: 1,
                     actualHours: 1,
                     status: 'Status 1',
                  },
                  {
                     task: 'Task 2',
                     plannedTask: 'Planned Task 2',
                     description: 'Description 2',
                     plannedHours: 2,
                     actualHours: 2,
                     status: 'Status 2',
                  },
                  {
                     task: 'Task 3',
                     plannedTask: 'Planned Task 3',
                     description: 'Description 3',
                     plannedHours: 3,
                     actualHours: 3,
                     status: 'Status 3',
                  },
               ],
            },
         ],
         selectedWeekId: null,
         currentWeekId: null,
         selectedWeek: ref(null),
      }
   },
   methods: {
      setWeekList() {
         const startDate = new Date('August 21, 2023') // Start date
         const endDate = new Date('May 6, 2024') // End date
         const weeks = []

         let currentDate = new Date(startDate)

         let weekId = 1
         while (currentDate <= endDate) {
            const startOfWeek = new Date(currentDate)
            const endOfWeek = new Date(currentDate)
            endOfWeek.setDate(endOfWeek.getDate() + 6)

            weeks.push({
               id: weekId,
               start: this.formatDate(startOfWeek),
               end: this.formatDate(endOfWeek),
            })

            currentDate.setDate(currentDate.getDate() + 7) // Move to the next week
            weekId++
         }
         this.weeks = weeks
      },
      formatDate(date) {
         const day = String(date.getDate()).padStart(2, '0')
         const month = String(date.getMonth() + 1).padStart(2, '0')
         const year = date.getFullYear()

         return `${month}-${day}-${year}`
      },

      setSelectedWeek(week) {
         if (this.selectedWeek == null) {
            const currentWeek = this.getCurrentWeek()
            this.selectedWeek = currentWeek.start + ' to ' + currentWeek.end
            this.selectedWeekId = currentWeek.id
         } else {
            this.selectedWeek = week.start + ' to ' + week.end
            this.selectedWeekId = week.id
         }
         //Add war entry api call
      },
      getCurrentWeek() {
         var today = new Date()
         var dd = String(today.getDate()).padStart(2, '0')
         var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
         var yyyy = today.getFullYear()
         today = mm + '-' + dd + '-' + yyyy
         var currentWeek = this.weeks.find((week) => {
            var weekStart = week.start
            var weekEnd = week.end
            return today >= weekStart && today <= weekEnd
         })
         this.currentWeekId = currentWeek.id
         return currentWeek
      },
   },
   computed: {
      currentWeekVar() {
         return this.getCurrentWeek()
      },
   },
   created() {
      this.setWeekList()
      this.setSelectedWeek()
   },
}
</script>

<style scoped>
.student-team-view {
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin-top: 5%;
}
</style>
