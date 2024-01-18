<template>
   <div class="container">
      <div>
         War For {{ storeUser.userFullName }} for Week {{ storeWeek.selectedWeek.start }} to {{ storeWeek.selectedWeek.end }}
      </div>
      <WarList
         :isTeamWar="false"
         :tasks="tasks"
         @editTask="editTaskStart"
         @deleteTask="deleteTask"
      />
      <EditWarTask
         v-if="isEditTaskTrue"
         @editTaskComplete="editTaskComplete"
         :editTaskProp="this.editTask"
      />
      
      <AddWarTask v-else-if="(!isPastWeek & !isFutureWeek)"  @add-task="addTask" />
      <button v-if="(!isEditTaskTrue)" @click="submitWarEntry">Submit Task</button>
   <p v-if="hasSubmited" class="submit-msg">War Submitted for {{ this.selectedWeek }}</p>
      
   </div>
</template>

<script>
/* For the view, it has the job of fetching students
War for selected week, and displaying it in a table.

It will also add a task to the students war and 
send it to the backend

*/
import WarList from '../components/WarList.vue'
import WeekDropdown from '../components/WeekDropdown.vue'
import AddWarTask from '../components/student/AddWarTask.vue'
import ErrorPopUp from '../components/utilities/ErrorPopUp.vue'
import EditWarTask from '../components/student/EditWarTask.vue'
import axios from 'axios'
import { ref } from 'vue'
import { storeWeek } from '../stores/storeWeek.js'
import { storeUser } from '../stores/store.js'

export default {
   name: 'StudentWarView',
   components: {
      WarList,
      WeekDropdown,
      AddWarTask,
      EditWarTask,
   },
   data() {
      return {
         selectedWeek: ref(null),
         tasks: [],
         editTask: null,
         isEditTaskTrue: false,
         editTaskIndex: 0,
         isFutureWeek: false,
         isPastWeek: false,
         hasSubmited : false,
         storeUser,storeWeek
      }
   },
   methods: {
      submitWarEntry() {
         axios.post('http://localhost:80/api/v1/submit/activity', {
            weekId: storeWeek.currentWeekId,
            studentId : storeUser.userID,
            taskCategories : this.tasks[0].task,
            plannedTasks: this.tasks[0].plannedTasks,
            description: this.tasks[0].description,
            plannedHours: this.tasks[0].plannedHours,
            actualHours: this.tasks[0].actualHours,
            status: this.tasks[0].status,
            comments : "",

     
         },
         {
            withCredentials: true,
         }).then(response => {
            console.log(response)
         }).catch(error => {
            console.log(error)
         })
         // Send the student's war to the database
         this.hasSubmited = true
      },
      addTask(task) {
         this.tasks.push(task)
      },
      editTaskStart(task, index) {
         this.editTask = task
         this.isEditTaskTrue = true
         this.editTaskIndex = index
      },
      editTaskComplete(task) {
         this.tasks[this.editTaskIndex] = task
         this.isEditTaskTrue = false
      },
      deleteTask(task, index) {
         this.tasks.splice(index, 1)
      },

      getStudentWar() {
         axios.get(`http://localhost:80/api/v1/get/war/${storeUser.teamId}/${storeWeek.selectedWeekId}`,
         {
            withCredentials: true,
         }).then(response => {
            console.log(response)
            
         }).catch(error => {
            console.log(error)
         })
      },
      
      setWARVisibility(currentWeekId, selectedWeekId) {
         //Sets the visibility of the peer eval table and is used in
         //getPeerEvalEntriesForWeek() and createNewPeerEvalEntry() to
         //determine if the table should be displayed/editable

         if (currentWeekId == selectedWeekId) {
            this.hasEntry = true
            this.isPastWeek = false
            this.isFutureWeek = false
         } else if (currentWeekId < selectedWeekId) {
            this.hasEntry = false
            this.isFutureWeek = true
            this.isPastWeek = false
         } else {
            this.hasEntry = true
            this.isPastWeek = true
            this.isFutureWeek = false
         }
      },

      
      
   },
   computed: {
      
   },
   created() {
      this.getStudentWar()
      
   },
}
</script>

<style scoped>
.container {
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   width: 100%;
   height: 100%;
   padding-top: 10%;
}

.profile {
   position: relative;
   top: -25px;
   margin-bottom: -150px;
   left: 80%;
   width: 10%;
   border: 2px solid black;
}
</style>
