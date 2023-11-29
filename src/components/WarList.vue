<template>
   <div class="WarList-container">
      <!--Moved task addition to its own component AddWarTask-->
      <!-- Task List Table -->
      <table class="table vh-45">
         <!-- Table headers -->
         <thead>
            <tr>
               <th scope="col">User</th>
               <th scope="col">Task</th>
               <th scope="col">Planned Task</th>
               <th scope="col">Description</th>
               <th scope="col">Planned Hours</th>
               <th scope="col">Actual Hours</th>
               <th scope="col">Status</th>
            </tr>
         </thead>
         <!-- Table body with dynamic rows -->
         <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
               <td>{{ task.user }}</td>
               <td>{{ task.task }}</td>
               <td>{{ task.plannedTask }}</td>
               <td>{{ task.description }}</td>
               <td>{{ task.plannedHours }}</td>
               <td>{{ task.actualHours }}</td>
               <td>{{ task.status }}</td>
               <div v-if="!isTeamWar" class="button-group">
                  <button @click="$emit('deleteTask', task, index)">
                     Remove
                  </button>
                  <button @click="$emit('editTask', task, index)">Edit</button>
               </div>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
/*
This components job is displaying a war table for a 
individual student, this component is chained together
in the WarTable.vue component to display multiple wars for
the team view
*/
import WeekDropdown from './WeekDropdown.vue'
export default {
   name: 'WarList',
   props: {
      tasks: Array,
      isTeamWar: Boolean,
   },
   components: {
      WeekDropdown,
   },
   data() {
      return {
         warDates2023: [
            '2023-09-01 to 2023-09-03',
            '2023-09-04 to 2023-09-10',
            '2023-09-11 to 2023-09-17',
            '2023-09-18 to 2023-09-24',
            '2023-09-25 to 2023-10-01',
            '2023-10-02 to 2023-10-08',
            '2023-10-09 to 2023-10-15',
            '2023-10-16 to 2023-10-22',
            '2023-10-23 to 2023-10-29',
            '2023-10-30 to 2023-11-05',
            '2023-11-06 to 2023-11-12',
            '2023-11-13 to 2023-11-19',
            '2023-11-20 to 2023-11-26',
            '2023-11-27 to 2023-12-03',
            '2023-12-04 to 2023-12-10',
            '2023-12-11 to 2023-12-15',
         ],
         newTask: {
            user: 'John Doe', // Replace with the actual user information
            task: '',
            plannedTask: '',
            description: '',
            plannedHours: 0,
            actualHours: 0,
            status: '',
         },
         // Array to store tasks
         isFormVisible: false, // Flag to control form visibility
      }
   },
   emits: ['deleteTask', 'editTask'],
   methods: {},
}
</script>
<style scoped>
.WarList-container {
   display: flex;
   flex-direction: column;
   padding: 20px;
   background-color: #f5f5f5;
   border-radius: 10px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   margin-bottom: 10%;
}

table {
   margin-top: 20px;
   width: 100%;
   border-collapse: collapse;
}

th,
td {
   border: 1px solid #ddd;
   padding: 10px;
   text-align: left;
}

th {
   background-color: #3498db;
   color: #fff;
}
</style>
