<template>
   <div class="container">
      <WeekDropdown
         :current-week="currentWeekVar"
         :select-week="this.selectedWeek"
         :displayed-weeks="weeks"
         @select-week="setSelectedWeek"
      />

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
      <AddWarTask v-else-if="!isPastWeek & !isFutureWeek" @add-task="addTask" />
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
import { ref } from 'vue'

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
      }
   },
   methods: {
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
         // Get the student's war from the database
      },
      setWeekList() {
         const startDate = new Date('August 21, 2023') // Start date
         const endDate = new Date('May 6, 2024') // End date
         const weeks = []

         let currentDate = new Date(startDate)

         let weekId = 1
         while (currentDate <= endDate) {
            const startOfWeek = new Date(currentDate)
            const endOfWeek = new Date(currentDate)
            endOfWeek.setDate(endOfWeek.getDate() + 6)

            weeks.push({
               id: weekId,
               start: this.formatDate(startOfWeek),
               end: this.formatDate(endOfWeek),
            })

            currentDate.setDate(currentDate.getDate() + 7) // Move to the next week
            weekId++
         }
         this.weeks = weeks
      },
      formatDate(date) {
         const day = String(date.getDate()).padStart(2, '0')
         const month = String(date.getMonth() + 1).padStart(2, '0')
         const year = date.getFullYear()

         return `${month}-${day}-${year}`
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

      setSelectedWeek(week) {
         if (this.selectedWeek == null) {
            const currentWeek = this.getCurrentWeek()
            this.selectedWeek = currentWeek.start + ' to ' + currentWeek.end
            this.selectedWeekId = currentWeek.id
         } else {
            this.selectedWeek = week.start + ' to ' + week.end
            this.selectedWeekId = week.id
         }
      },
      getCurrentWeek() {
         var today = new Date()
         var dd = String(today.getDate()).padStart(2, '0')
         var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
         var yyyy = today.getFullYear()
         today = mm + '-' + dd + '-' + yyyy
         var currentWeek = this.weeks.find((week) => {
            var weekStart = week.start
            var weekEnd = week.end
            return today >= weekStart && today <= weekEnd
         })
         this.currentWeekId = currentWeek.id
         return currentWeek
      },
   },
   computed: {
      currentWeekVar() {
         return this.getCurrentWeek()
      },
   },
   created() {
      this.setWeekList()
      this.setSelectedWeek()
   },
}
</script>

<style scoped>
.container {
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   width: 100%;
   height: 100%;
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
