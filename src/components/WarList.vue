<!-- <template>
    <div class="WarList-container">
        <div class="title">
            <WeekDropdown :dates="warDates2023" />
        </div>
        <table class="table vh-45">
            <thead>
                <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Planned Task</th>
                    <th scope="col">Description</th>
                    <th scope="col">Planned Hours</th>
                    <th scope="col">Actual Hours</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                    <td>Thornton</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import WeekDropdown from './WeekDropdown.vue'
export default {
    name: 'WarList',
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
        }

        //TODO: When I get selected date from drop down, eventually i will select week from object that i got when
        // or call for when student selected on WAR tab or directly from backend when student selects week.
        // Then having to add task and save to backendI
    },
}
</script>

<style scoped>
.WarList-container {
    display: flex;
    flex-direction: column;
}

td {
    font-size: 1.1rem;
    line-height: 3.5em;
}

.title {
    font-size: 1.5rem;
    margin-bottom: 2.5%;
}
</style> -->

<template>
   <div class="WarList-container">
      <div class="title">
         <WeekDropdown :dates="warDates2023" />
      </div>

      <!-- "Add Task" button to toggle form visibility -->
      <button @click="toggleFormVisibility">Add Task</button>

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

         <button type="submit">Add Task</button>
      </form>

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
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
import WeekDropdown from './WeekDropdown.vue'

export default {
   name: 'WarList',
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
         tasks: [], // Array to store tasks
         isFormVisible: false, // Flag to control form visibility
      }
   },
   methods: {
      addTask() {
         // Validate the new task object, add it to the tasks array, and reset the form
         if (this.validateTask()) {
            this.tasks.push({ ...this.newTask })
            this.resetForm()
         }
      },
      validateTask() {
         // Implement your validation logic here
         // Return true if the task is valid, false otherwise
         return true
      },
      resetForm() {
         // Reset the form by creating a new task object
         this.newTask = {
            user: 'John Doe', // Replace with the actual user information
            task: '',
            plannedTask: '',
            description: '',
            plannedHours: 0,
            actualHours: 0,
            status: '',
         }
      },
      toggleFormVisibility() {
         // Toggle the visibility of the form
         this.isFormVisible = !this.isFormVisible
      },
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
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-task-btn {
   background-color: #3498db;
   color: #fff;
   padding: 10px;
   margin-bottom: 10px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
}

.task-form {
   display: flex;
   flex-direction: column;
   gap: 10px;
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
