<template>
   <div class="student-team-view">
      
      <WarTeamTable :team="team"></WarTeamTable>
   </div>
</template>

<script>
import NavbarSide from '@/components/student/NavbarSide.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import WarTeamTable from '@/components/WarTeamTable.vue'
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
      
      
   },
   computed: {
      
   },
   watch: {
      'storeWeek.selectedWeekId': function(newVal, oldVal) {
         console.log(`currentWeekId changed from ${oldVal} to ${newVal}`);
         // Call your function here
         this.getWarTeamEntries();
    }
     
   },
   created() {
      
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
