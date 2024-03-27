<template>
   <div class="WarList-container">
      <!--Moved task addition to its own component AddWarTask-->
      <!-- Task List Table -->
       <!--Replace with teammates name-->
      <table v-if="hasTaskForWeek" class="table">
         <!-- Table headers -->
         <thead>
            <tr>
               <th scope="col">Student</th>
               <th scope="col">Task Category</th>
               <th scope="col">Planned Task</th>
               <th scope="col">Description</th>
               <th scope="col">Planned Hours</th>
               <th scope="col">Actual Hours</th>
               <th scope="col">Status</th>
               <th scope="col" v-if="!isTeamWar">Actions</th>
            </tr>
         </thead>
         <!-- Table body with dynamic rows -->
         <tbody>
            <tr v-for="(task, index) in studentTasks.tasks" :key="index">
               <td :style="'width: 15%'">{{ studentTasks.name }}</td>
               <td :style="'width: 15%'">{{ task.taskCategories }}</td>
               <td :style="'width: 20%'">{{ task.plannedTask }}</td>
               <td :style="'width: 25%'">{{ task.description }}</td>
               <td :style="'width: 10%'">{{ task.plannedHours }}</td>
               <td :style="'width: 10%'">{{ task.actualHours }}</td>
               <td :style="'width: 15%'">{{ task.status }}</td>
               <div v-if="!isTeamWar" class="button-group">
                  <!-- <button @click="$emit('deleteTask', task, index)">
                     Remove
                  </button> -->
                  <button @click="$emit('editTask', task, index)">Edit</button>
               </div>
            </tr>
            
         </tbody>
      </table>
      <div v-else>
               <p>No Tasks for {{ studentTasks.name }} for {{ studentTasks.weekStart}} to {{ studentTasks.weekEnd }}</p>
            </div>
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
import { storeWeek } from '../stores/storeWeek.js'
export default {
   name: 'WarList',
   props: {
      studentTasks: Object,
      isTeamWar: Boolean,
      
   },
   components: {
      WeekDropdown,
   },
   data() {
      return {
         // hasTasksForWeek: true,
         storeWeek
         
         
        
      }
   },
   emits: ['deleteTask', 'editTask'],
   methods: {
      toggleFormVisibility() {
         const tasks = this.studentTasks.tasks
         if(tasks.length == 0){
            this.hasTasksForWeek = false
         }
         else{
            this.hasTasksForWeek = true
         }
         
      },
   },
   computed: {
      hasTaskForWeek() {
         // Make sure studentTasks and studentTasks.tasks are not null or undefined
         return this.studentTasks && this.studentTasks.tasks && this.studentTasks.tasks.length > 0;
      }
   },
   created() {

    
   },
}
</script>
<style scoped>
.WarList-container {
   display: flex;
   flex-direction: column;
   padding: 20px;
   background-color: #f5f5f5;
   border-radius: 10px;
   /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
   margin-bottom: 50px;
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
