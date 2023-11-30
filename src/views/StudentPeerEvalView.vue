<template>
   <div class="student-pe-container">
      <WeekDropdown
         :currentWeek="currentWeekVar"
         :selectWeek="this.selectedWeek"
         :displayedWeeks="weeks"
         @select-week="setSelectedWeek"
      />
      <!--@select-week is the emit from child component with week as first arg of the func-->

      <PeerEvalTable :peerEvalProp="evaluationData" v-if="hasEntry" />
      <div v-else>
         <h1>No Peer Evaluation for this week</h1>
      </div>
      <ErrorPopUp
         v-if="errorFlag"
         :responseFlag="responseFlag"
         :errorMessageProp="errorMessage"
      />
   </div>
</template>

<script>
import axios from 'axios'
import ErrorPopUp from '../components/utilities/ErrorPopUp.vue'
import PeerEvalTable from '../components/student/PeerEvalTable.vue'
import WeekDropdown from '../components/WeekDropdown.vue'
import { ref } from 'vue'
export default {
   name: 'StudentPeerEvalView',
   props: {},
   data() {
      return {
         evaluationData: [
            {
               evaluateeFirstName: 'Jonathan',
               evaluateeLastName: 'Doe',
               week: 1,
               comment: 'Great teamwork and communication.',
               ratings: [
                  {
                     score: 5,
                     criterion: {
                        criterionDesc: 'Quality of Work',
                        maxScore: 10,
                     },
                  },
                  {
                     score: 5,
                     criterion: {
                        criterionDesc: 'Productiveness',
                        maxScore: 10,
                     },
                  },
                  {
                     score: 5,
                     criterion: {
                        criterionDesc: 'Proactiveness',
                        maxScore: 10,
                     },
                  },
                  {
                     score: 5,
                     criterion: {
                        criterionDesc: 'Respectfulness',
                        maxScore: 10,
                     },
                  },
                  {
                     score: 5,
                     criterion: {
                        criterionDesc: 'Meeting Performance',
                        maxScore: 10,
                     },
                  },
               ],
            },
         ],

         selectedWeekId: null,
         currentWeekId: null,
         selectedWeek: ref(null),
         peerEvalEntriesForSelectedWeek: null,
         hasEntry: false,
         errorFlag: false,
         responseFlag: null,
      }
   },
   /*
                                Logic for this container might be to have weeks as dropdown, 
                                when you select Week, it will load the PeerEvalTable component for 
                                that week, and then you can submit the form for that week.

                                Unsure if I want this component handling sending data
                                 or if i want the PeerEvalTable component to handle sending data
                                */
   components: {
      PeerEvalTable,
      WeekDropdown,
      ErrorPopUp,
   },
   methods: {
      getPeerEvalEntriesForWeek() {
         axios
            .get(
               `http://localhost:8080/api/v1/peerEvaluation/1/${this.selectedWeekId}`,
               {
                  crossdomain: true,
                  // params: {
                  //    week: 1,
                  //    id : 1
                  // },
               }
            )
            .then((response) => {
               if (response.data.code == 200) {
                  this.errorFlag = false
                  this.hasEntry = true
                  const peerEvalEntriesForWeek = response.data.data
                  this.peerEvalEntriesForSelectedWeek = peerEvalEntriesForWeek
               } else if (response.data.code == 404) {
                  //Will be changed to new code
                  this.errorFlag = false
                  this.hasEntry = false
                  createNewPeerEvalEntry() // Make this function create an empty peer eval entry for the week then pass to table for completion
               } else {
                  this.responseFlag = response.data.status
                  this.errorFlag = true
                  this.errorMessage = response.data.message
               }
            })
            .catch((error) => {
               // if(error)
               if (error.response.status != 404) {
                  this.errorFlag = false
                  this.hasEntry = false
                  createNewPeerEvalEntry()
               } else {
                  this.responseFlag = error.response.data.status
                  this.errorFlag = true
                  this.errorMessage = error.response.data.message
               }
            })
      },
      createNewPeerEvalEntry() {},

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

      setSelectedWeek(week) {
         if (this.selectedWeek == null) {
            const currentWeek = this.getCurrentWeek()
            this.selectedWeek = currentWeek.start + ' to ' + currentWeek.end
            this.selectedWeekId = currentWeek.id
         } else {
            this.selectedWeek = week.start + ' to ' + week.end
            this.selectedWeekId = week.id
         }
         this.getPeerEvalEntriesForWeek()
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
.student-pe-container {
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin-top: 5%;
}
</style>
