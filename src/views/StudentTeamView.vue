<template>
   <div class="student-team-view">
      <WeekDropdown
         :current-week="currentWeekVar"
         :select-week="this.selectedWeek"
         :displayedWeeks="weeks"
         @select-week="setSelectedWeek"
      ></WeekDropdown>
      <WarTable :team="team"></WarTable>
   </div>
</template>

<script>
import NavbarSide from '../components/NavbarSide.vue'
import WeekDropdown from '../components/WeekDropdown.vue'
import WarList from '../components/WarList.vue'
import WarTable from '../components/WarTable.vue'
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
      WarTable,
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
         selectedWeek: ref(null),
         weeks: [
            '2023-09-01 to 2023-09-03',
            '2023-09-04 to 2023-09-10',
            '2023-09-11 to 2023-09-17',
            '2023-09-18 to 2023-09-24',
            '2023-09-25 to 2023-10-01',
            '2023-10-02 to 2023-10-08',
            '2023-10-09 to 2023-10-15',
            '2023-10-16 to 2023-10-22', //This will prolly be
            '2023-10-23 to 2023-10-29',
            '2023-10-30 to 2023-11-05',
            '2023-11-06 to 2023-11-12',
            '2023-11-13 to 2023-11-19',
            '2023-11-20 to 2023-11-26',
            '2023-11-27 to 2023-12-03',
            '2023-12-04 to 2023-12-10',
            '2023-12-11 to 2023-12-15',
         ],
      }
   },
   methods: {
      setSelectedWeek(week) {
         if (this.selectedWeek == null) {
            this.selectedWeek = this.getCurrentWeek()
         } else {
            this.selectedWeek = week
         }
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
   },
   computed: {
      currentWeekVar() {
         return this.getCurrentWeek()
      },
   },
   mounted() {
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
