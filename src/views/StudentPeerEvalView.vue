<template>
   <div class="student-pe-container">
      <WeekDropdown
         :currentWeek="currentWeekVar"
         :selectWeek="this.selectedWeek"
         :displayedWeeks="weeks"
         @select-week="setSelectedWeek"
      />
      <!--@select-week is the emit from child component with week as first arg of the func-->

      <PeerEvalTable
         v-if="!this.isFutureWeek & this.hasEntry"
         :isPastWeek="isPastWeek"
         :peerEvalProp="this.peerEvalEntriesForSelectedWeek"
      />
      <div
         class="week-not-started"
         v-else-if="!this.errorFlag & !this.hasEntry"
      >
         It is not the week yet for this peer eval, check back during
         {{ this.selectedWeek }}.
      </div>

      <!-- <div v-else>
         <h1>No Peer Evaluation for this week</h1>
      </div> -->
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
         team: [
            {
               studentid: '1',
               studentName: 'John Doe1',
            },
            {
               studentid: '2',
               studentName: 'John Doe2',
            },
            {
               studentid: '3',
               studentName: 'John Doe3',
            },
            {
               studentid: '4',
               studentName: 'John Doe4',
            },
         ],

         selectedWeekId: null,
         currentWeekId: 2,
         selectedWeek: ref(null),
         peerEvalEntriesForSelectedWeek: [],
         hasEntry: false,
         errorFlag: false,
         responseFlag: null,
         isPastWeek: false,
         isFutureWeek: false,
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
               `http://localhost:80/api/v1/peerEvaluation/1/${this.selectedWeekId}`,
               {
                  crossdomain: true,
                  // params: {
                  //    week: 1,
                  //    id : 1
                  // },
               }
            )
            .then((response) => {
               console.log(response)
               if (response.data.code == 200) {
                  this.errorFlag = false
                  this.hasEntry = true
                  const peerEvalEntriesForWeek = response.data.data
                  for (const item of peerEvalEntriesForWeek) {
                     item.oldScore = item.ratings.reduce(
                        (a, b) => a + b.score,
                        0
                     )
                  }
                  this.peerEvalEntriesForSelectedWeek = peerEvalEntriesForWeek
                  this.setPeerEvalVisibility(
                     this.currentWeekId,
                     this.selectedWeekId
                  )
               } else if (response.data.code == 409) {
                  //Will be changed to new code
                  //409 is no entry for week

                  this.errorFlag = false
                  this.hasEntry = false

                  this.createNewPeerEvalEntry() // Make this function create an empty peer eval entry for the week then pass to table for completion
               } else {
                  this.hasEntry = false
                  this.errorFlag = true
                  this.responseFlag = response.data.code
                  this.errorMessage = response.data.message
               }
            })
            .catch((error) => {
               console.log(error.response.status)
               if (error.response.status == 409) {
                  this.errorFlag = false //No error
                  this.hasEntry = false //No existing eval
                  console.log('about to create entry')
                  this.createNewPeerEvalEntry()
               } else {
                  this.hasEntry = false // No existing eval
                  this.responseFlag = error.response.data.status //For error comp
                  this.errorFlag = true //Shows error
                  this.errorMessage = error.response.data.message //FOr error comp
               }
            })
      },
      createNewPeerEvalEntry() {
         //API call to get teams
         this.peerEvalEntriesForSelectedWeek = []
         for (const item of this.team) {
            this.peerEvalEntriesForSelectedWeek.push({
               evaluateeFirstName: item.studentName.split(' ')[0],
               evaluateeLastName: item.studentName.split(' ')[1],
               evaluateeId: item.studentid,
               week: this.selectedWeekId,
               comment: '',
               ratings: [
                  {
                     score: 0,
                     criterion: {
                        criterionDesc: 'Quality of Work',
                        maxScore: 10,
                     },
                  },
                  {
                     score: 0,
                     criterion: {
                        criterionDesc: 'Productiveness',
                        maxScore: 10,
                     },
                  },
                  {
                     score: 0,
                     criterion: {
                        criterionDesc: 'Proactiveness',
                        maxScore: 10,
                     },
                  },
                  {
                     score: 0,
                     criterion: {
                        criterionDesc: 'Respectfulness',
                        maxScore: 10,
                     },
                  },
                  {
                     score: 0,
                     criterion: {
                        criterionDesc: 'Meeting Performance',
                        maxScore: 10,
                     },
                  },
               ],
            })
         }
         this.setPeerEvalVisibility(this.currentWeekId, this.selectedWeekId)
         console.log(this.peerEvalEntriesForSelectedWeek)
      },
      setPeerEvalVisibility(currentWeekId, selectedWeekId) {
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

      setWeekList() {
         //Sets the week list for the dropdown menu
         //Will be removed probably
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
         //Formats date for display on week dropdown
         const day = String(date.getDate()).padStart(2, '0')
         const month = String(date.getMonth() + 1).padStart(2, '0')
         const year = date.getFullYear()

         return `${month}-${day}-${year}`
      },

      setSelectedWeek(week) {
         //Sets the selected week based on what user selects
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
         //Function gets current week based on provided week list
         //Sets currentWeekID too
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
.week-not-started {
   margin-top: 5%;
   text-align: center;
   font-size: 1.5em;
}
</style>
