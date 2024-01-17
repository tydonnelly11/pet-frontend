<template>
   <div class="student-pe-container">
      
      <!--@select-week is the emit from child component with week as first arg of the func-->
      <div v-if="this.isPastWeek" class="display-grade">
         <h1>Grade for {{ storeWeek.selectedWeek }}: {{ this.gradeForWeek }} </h1>
      </div>
      <PeerEvalTable
         v-if="(!this.isFutureWeek) & this.hasEntry"
         :isPastWeek="isPastWeek"
         :peerEvalProp="this.peerEvalEntriesForSelectedWeek"
      />
      <div
         class="week-not-started"
         v-else-if="(!this.errorFlag & !this.hasEntry) & this.isFutureWeek"
      >
         It is not the week yet for this peer eval, check back during
         {{ storeWeek.selectedWeek }}.
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
import { storeUser } from '../stores/store.js'
import { storeWeek } from '../stores/storeWeek.js'
import ErrorPopUp from '../components/utilities/ErrorPopUp.vue'
import PeerEvalTable from '../components/student/PeerEvalTable.vue'
import WeekDropdown from '../components/WeekDropdown.vue'
import { ref } from 'vue'
export default {
   name: 'StudentPeerEvalView',
   props: {},
   data() {
      return {
         storeUser,
         storeWeek,


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
               studentName: 'John Doe',
            },
            {
               studentid: '2',
               studentName: 'Jane Doe',
            },
            {
               studentid: '3',
               studentName: 'Johnahan Doe',
            },
            
         ],
         gradeForWeek: 0,

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
      async getPeerEvalEntriesForWeek() {
         console.log("Store + " + storeUser.isLoggedIn)
         console.log("Store" + storeUser.studentId)
         axios
            .get(
               `http://localhost:80/api/v1/getPeerEvaluation/${storeUser.studentId}/${storeWeek.selectedWeekId}`,
               {
                  crossdomain: true,
                  // params: {
                  //    week: 1,
                  //    id : 1
                  // },
               }
            )
            .then((response) => {
               console.log(response + "NOT IN CATCH")
               if (response.data.code == 200) {
                  this.errorFlag = false
                  this.hasEntry = true
                  const peerEvalEntriesForWeek = response.data.data
                  for (const item of peerEvalEntriesForWeek) {
                     item.oldScore = item.ratings.reduce(
                        (a, b) => a + b.score,
                        0
                     )
                     console.log(item.oldScore)
                  }
                  this.peerEvalEntriesForSelectedWeek = peerEvalEntriesForWeek
                  this.setPeerEvalVisibility(
                     storeWeek.currentWeekId,
                     storeWeek.selectedWeekId
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
               if(error.response.status == 401){

                  this.hasEntry = false // No existing eval
                  // this.responseFlag = error.response.data.code //For error comp
                  this.errorFlag = true //Shows error
                  this.responseFlag = 401
                  this.errorMessage = "Unauthorized Access, Please log in again"//FOr error comp
               
               }
               else{

                  this.hasEntry = false // No existing eval
                  // this.responseFlag = error.response.data.code //For error comp
                  this.errorFlag = true //Shows error
                  // this.errorMessage = error.response.data.message//FOr error comp
               }
            }
            )
      },
      createNewPeerEvalEntry() {
         //API call to get teams
         this.peerEvalEntriesForSelectedWeek = []
         for (const item of this.team) {
            this.peerEvalEntriesForSelectedWeek.push({
               evaluateeFirstName: item.studentName.split(' ')[0],
               evaluateeLastName: item.studentName.split(' ')[1],
               evaluateeId: item.studentid,
               week: storeWeek.currentWeekId,
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
         this.setPeerEvalVisibility(storeWeek.currentWeekId, storeWeek.selectedWeekId)
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
            // this.getGradeForWeek(this.selectedWeekId, )
         }
      },
      
   },
   watch: {
      'storeWeek.selectedWeekId': function(newVal, oldVal) {
         console.log(`currentWeekId changed from ${oldVal} to ${newVal}`);
         // Call your function here
         this.getPeerEvalEntriesForWeek();
    }
     
   },

   computed: {
      
   },
   created() {
     this.getPeerEvalEntriesForWeek()
   },
}
</script>

<style scoped>
.student-pe-container {
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin-top: 5%;
   height: 70%;
}
.week-not-started {
   margin-top: 5%;
   text-align: center;
   font-size: 1.5em;
}
</style>
