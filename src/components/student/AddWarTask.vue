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
            placeholder="Enter Task Category"
         />
      </div>

      <div class="task">
         <label for="plannedTask">Planned Task:</label>
         <input
            class="input-field"
            v-model="newTask.plannedTask"
            type="text"
            required
            placeholder="Enter Planned Task"
         />
      </div>

      <div class="task">
         <label for="description">Description:</label>
         <textarea
            class="text-area"
            v-model="newTask.description"
            required
            placeholder="Enter Description"
         ></textarea>
      </div>

      <div class="task">
         <label for="plannedHours">Planned Hours:</label>
         <input
            class="input-field"
            v-model="newTask.plannedHours"
            type="number"
            required
            placeholder="Enter Planned Hours"
         />
      </div>

      <div class="task">
         <label for="actualHours">Actual Hours:</label>
         <input
            class="input-field"
            v-model="newTask.actualHours"
            type="number"
            required
            placeholder="Enter Actual Hours"
         />
      </div>

      <div class="task">
         <label for="status">Status:</label>
         <input
            class="input-field"
            v-model="newTask.status"
            type="text"
            required
            placeholder="Enter Status"
         />
      </div>

      <button class="add-button" @click="$emit('addTask', { ...newTask }), resetForm()">Add</button>
      <button class="done-button" @click="toggleFormVisibility">Done</button>

   </form>

   <button v-if="!isFormVisible" @click="toggleFormVisibility">Add Task</button>
   <!-- <button v-else @click="toggleFormVisibility">Done</button> -->

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
   display: grid;
   grid-template-columns: 1fr 1fr; 
   gap: 20px; 
   justify-content: center;
   height: 45%;
}

.task {
   display: flex;
   flex-direction: column;
   margin-bottom: 20px;
}

.label {
   margin-bottom: 5px; 
   width: 120px; 
   text-align: right; 
}

.input-field,
.text-area {
   border: 1px solid #ccc;
   border-radius: 8px;
   padding: 8px;
   background-color: rgba(255, 255, 255, 0.7);
   margin-top: 5px;
   color: black; 
}

.text-area {
   height: 80px;
   /* Disable textarea resizing else its messing with everything*/
   resize: none; 
}

.input-field::placeholder,
.text-area::placeholder {
   text-align: center;
}

.add-button, .done-button {
   width: 100%;
   padding: 8px;
   border: none;
   border-radius: 12px;
   color: white;
   cursor: pointer;
}

button {
   /*margin-top: 15px;*/
   border-radius: 12px;
}

@media only screen and (max-width: 700px) {
   .war-form {
      grid-template-columns: 1fr; 
   }
}
</style>


