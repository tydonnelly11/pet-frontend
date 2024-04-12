<template>
   <!-- Task Form (conditionally rendered based on isFormVisible) -->
   <form @submit.prevent="" class="war-form">
      <div class="task">
         <label for="task">Task Category:</label>
         <input
            class="input-field"
            v-model="editTask.taskCategories"
            type="text"
            required
         />
      </div>

      <div class="task">
         <label for="plannedTask">Planned Task:</label>
         <input
            class="input-field"
            v-model="editTask.plannedTask"
            type="text"
            required
         />
      </div>

      <div class="task">
         <label for="description">Description:</label>
         <textarea
            class="text-area"
            v-model="editTask.description"
            required
         ></textarea>
      </div>

      <div class="task">
         <label for="plannedHours">Planned Hours:</label>
         <input
            class="input-field"
            v-model="editTask.plannedHours"
            type="number"
            required
         />
      </div>

      <div class="task">
         <label for="actualHours">Actual Hours:</label>
         <input
            class="input-field"
            v-model="editTask.actualHours"
            type="number"
            required
         />
      </div>

      <div class="task">
         <label for="status">Status:</label>
         <input
            class="input-field"
            v-model="editTask.status"
            type="text"
            required
         />
      </div>
   </form>
   <button @click="$emit('editTaskComplete', editTask)">Edit</button>
   
</template>

<script>
/*
 Moved logic and look of adding task to this component
 from WarList.vue
 
 */
export default {
   name: 'EditWarTask',
   props: {
      editTaskProp: Object,
   },
   data() {
      return {
         editTask: { ...this.editTaskProp },
         isFormVisible: false,
      }
   },
   emits: ['editTaskComplete'],

   methods: {
      toggleFormVisibility() {
         // Toggle the visibility of the form
         this.isFormVisible = !this.isFormVisible
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
   height: 60%;
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

.add-button,
.done-button {
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
