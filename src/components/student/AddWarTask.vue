<template>
   <!-- Task Form (conditionally rendered based on isFormVisible) -->
   <form v-if="isFormVisible" @submit.prevent="addTask" class="war-form">
      <div class="task">
         <label for="task">Task Category:</label>
         <input
            class="input-field"
            v-model="newTask.taskCategories"
            type="text"
            required
         />
      </div>

      <div class="task">
         <label for="plannedTask">Planned Task:</label>
         <input
            class="input-field"
            v-model="newTask.plannedTask"
            type="text"
            required
         />
      </div>

      <div class="task">
         <label for="description">Description:</label>
         <textarea
            class="text-area"
            v-model="newTask.description"
            required
         ></textarea>
      </div>

      <div class="task">
         <label for="plannedHours">Planned Hours:</label>
         <input
            class="input-field"
            v-model="newTask.plannedHours"
            type="number"
            required
         />
      </div>

      <div class="task">
         <label for="actualHours">Actual Hours:</label>
         <input
            class="input-field"
            v-model="newTask.actualHours"
            type="number"
            required
         />
      </div>

      <div class="task">
         <label for="status">Status:</label>
         <input
            class="input-field"
            v-model="newTask.status"
            type="text"
            required
         />
      </div>

      <button @click="$emit('addTask', { ...newTask }), resetForm()">
         Add
      </button>
   </form>
   <button v-if="!isFormVisible" @click="toggleFormVisibility">Add Task</button>
   <button v-else @click="toggleFormVisibility">Done</button>
</template>

<script>
/*
Moved logic and look of adding task to this component
from WarList.vue

*/
import { storeUser } from '../../stores/store'
export default {
   name: 'AddWarTask',
   data() {
      return {
         newTask: {
            studentName: storeUser.userFullName,
            taskCategories: '',
            plannedTask: '',
            description: '',
            plannedHours: '',
            actualHours: '',
            status: '',
         },
         isFormVisible: false,
      }
   },
   emits: ['addTask'],

   methods: {
      toggleFormVisibility() {
         // Toggle the visibility of the form
         this.isFormVisible = !this.isFormVisible
      },
      resetForm() {
         this.newTask = {
            task: '',
            plannedTask: '',
            description: '',
            plannedHours: '',
            actualHours: '',
            status: '',
         }
      },
   },
}
</script>

<style scoped>
.war-form {
   display: flex;
   flex-direction: column;
   width: 100%;
   align-items: center;
   justify-content: space-between;
   height: 45%;
}

.input-field {
   border: 1px solid #ccc; /* Border style */
   border-radius: 5px;
   width: 250px;
}
.text-area {
   border: 1px solid #ccc; /* Border style */
   border-radius: 5px;
   width: 250px;
   height: 80px;
}

.task {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   width: 75%;
}
</style>
