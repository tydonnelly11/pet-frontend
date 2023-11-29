<template>
   <div class="war-table-container">
      <WarList
         :isTeamWar="true"
         v-for="student in team"
         :tasks="student.tasks"
      />
   </div>
</template>

<script>
/*
This component is responsible for holding multiple wars for
the team view this
may be changed and some of the logic may be moved to the view
if it is easier
 */
import WarList from './WarList.vue'
export default {
   name: 'WarTeamTable',
   components: {
      WarList,
   },
   props: {
      team: Array,
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
      }
   },
   methods: {},
   computed: {},
}
</script>

<style scoped>
.war-table-container {
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   width: 100%;
   height: 100%;
}
</style>
