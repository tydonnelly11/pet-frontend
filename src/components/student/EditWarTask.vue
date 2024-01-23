<template>
   <!-- Task Form (conditionally rendered based on isFormVisible) -->
   <form @submit.prevent="" class="war-form">
      <div class="task">
         <label for="task">Task:</label>
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
