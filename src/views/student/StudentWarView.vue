<template>
   <div class="container">
      <div v-if="!isFutureWeek">
         War For <b>{{ storeUser.userFullName }} </b>for Week {{ storeWeek.selectedWeek.start }} to {{ storeWeek.selectedWeek.end }}
      </div>
      <WarList
         v-if="(!isFutureWeek)"
         :isTeamWar="false"
         :studentTasks="studentTasks"
         @editTask="editTaskStart"
         @deleteTask="deleteTask"
      />
      <div v-if="isFutureWeek">
         Come back during {{ storeWeek.selectedWeek.start }} to {{ storeWeek.selectedWeek.end }} to submit your war
      </div>
      <EditWarTask
         v-if="isEditTaskTrue"
         @editTaskComplete="editTaskComplete"
         :editTaskProp="this.editTask"
      />
      
      <AddWarTask v-else-if="(!isPastWeek && !isFutureWeek)"  @add-task="addTask" />
      <button class="button" v-if="(!isEditTaskTrue) && (!isPastWeek && !isFutureWeek)" @click="submitWarEntry">Submit Task</button>
   <p v-if="hasSubmited" class="submit-msg">War Submitted for {{ storeWeek.selectedWeek.start }} to {{ storeWeek.selectedWeek.end }}</p>
      
   </div>
</template>

<script>
/* For the view, it has the job of fetching students
War for selected week, and displaying it in a table.

It will also add a task to the students war and 
send it to the backend

*/
import WarList from '@/components/WarList.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import AddWarTask from '@/components/student/AddWarTask.vue'
import ErrorPopUp from '@/components/utilities/ErrorPopUp.vue'
import EditWarTask from '@/components/student/EditWarTask.vue'
import apiClient from  '@/axios-setup.js'
import { ref } from 'vue'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeUser } from '@/stores/store.js'

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
         studentTasks : {
            name : storeUser.userFullName,
            tasks : []
         },
         tasksToBeSubmitted : [],

         editTask: null,
         isEditTaskTrue: false,
         editTaskIndex: 0,
         isFutureWeek: false,
         isPastWeek: false,
         hasSubmited : false,
         storeUser,storeWeek,
         newTasks : []
         
      }
   },
   methods: {
      submitWarEntry() {
         // var listOfActivities = []
         // for(const task of this.tasksToBeSubmitted){
         //    listOfActivities.push({
         //       weekId: storeWeek.currentWeekId,
         //       studentId : storeUser.userID,
         //       taskCategories : task.taskCategories,
         //       plannedTask: task.plannedTask,
         //       description: task.description,
         //       plannedHours: task.plannedHours,
         //       actualHours: task.actualHours,
         //       status: task.status,
         //       comments : task.comments,
         //    })
         // }
         const auth = localStorage.getItem('auth')
         
         apiClient.post('http://localhost:80/api/v1/activity/submit', this.newTasks,
         {
            headers: { 'Authorization': `Bearer ${auth}` }
         }).then(response => {
            console.log(response)

         }).catch(error => {
            console.log(error)
         })
         // Send the student's war to the database
         this.hasSubmited = true
         this.newTasks = []
      },
      addTask(task) {
         
         task.studentId = storeUser.userID
         task.weekId = storeWeek.selectedWeekId
         this.newTasks.push(task)
         this.studentTasks.tasks.push(task)
      },
      editTaskStart(task, index) {
         this.editTask = task
         this.isEditTaskTrue = true
         this.editTaskIndex = index
      },
      editTaskComplete(task) {
         this.studentTasks.tasks[this.editTaskIndex] = task
         this.newTasks.push(task);
         this.isEditTaskTrue = false
      },
      deleteTask(task, index) {
         this.studentTasks.tasks.splice(index, 1)
      },

      getStudentWar() {
         this.hasSubmited = false
         const auth = localStorage.getItem('auth')
         this.studentTasks.tasks = []
         console.log("WEEK BEFORE REQ")
         console.log(storeWeek.selectedWeekId)
         apiClient.get(`http://localhost:80/api/v1/war/get`,
         {
            headers: { 'Authorization': `Bearer ${auth}` },
            params: {
               teamId: storeUser.teamId,
               weekId: String(storeWeek.selectedWeekId),
            },
         },
         ).then(response => {
            console.log(response)
            for(const activity of response.data.data.activities){
               if(activity.studentId == storeUser.userID){
                  this.studentTasks.tasks.push(activity)
               }
            }
            
            
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
   watch: {
      'storeWeek.selectedWeekId': function(newVal, oldVal) {
         console.log(`SelectedWeekId changed from ${oldVal} to ${newVal}`);
         this.tasks = []
         this.getStudentWar();
         this.setWARVisibility(storeWeek.currentWeekId, storeWeek.selectedWeekId)

    }
     
   },

   created() {
      this.getStudentWar()
      this.setWARVisibility(storeWeek.currentWeekId, storeWeek.selectedWeekId)
   },
}
</script>

<style scoped>
.container {
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: center;
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
.button {
   margin-top: 150px;
   border-radius: 12px;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
   .container {
      padding-top: 20px;
   }
   .profile {
      top: -15px;
   }
   
}
</style>
