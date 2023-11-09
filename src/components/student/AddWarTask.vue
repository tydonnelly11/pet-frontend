<template>
   <!-- Task Form (conditionally rendered based on isFormVisible) -->
   <form v-if="isFormVisible" @submit.prevent="addTask">
      <label for="task">Task:</label>
      <input v-model="newTask.task" type="text" required />

      <label for="plannedTask">Planned Task:</label>
      <input v-model="newTask.plannedTask" type="text" required />

      <label for="description">Description:</label>
      <textarea v-model="newTask.description" required></textarea>

      <label for="plannedHours">Planned Hours:</label>
      <input v-model="newTask.plannedHours" type="number" required />

      <label for="actualHours">Actual Hours:</label>
      <input v-model="newTask.actualHours" type="number" required />

      <label for="status">Status:</label>
      <input v-model="newTask.status" type="text" required />

      <button @click="$emit('addTask', newTask)">Submit</button>
   </form>
   <button @click="toggleFormVisibility">Add Task</button>
</template>

<script>
/*
Moved logic and look of adding task to this component
from WarList.vue

*/
export default {
   name: 'AddWarTask',
   data() {
      return {
         newTask: {
            task: '',
            plannedTask: '',
            description: '',
            plannedHours: '',
            actualHours: '',
            status: '',
         },
         isFormVisible: false,
      }
   },

   methods: {
      toggleFormVisibility() {
         // Toggle the visibility of the form
         this.isFormVisible = !this.isFormVisible
      },
   },
}
</script>

<style scoped></style>
