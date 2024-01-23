<template>
   <div class="student-pe-container">
      
      <!--@select-week is the emit from child component with week as first arg of the func-->
      <div v-if="this.isPastWeek" class="display-grade">
         <h1>Grade for {{ storeWeek.selectedWeek.start }} to {{ storeWeek.selectedWeek.end }} :</h1>
         <!-- {{ this.gradeForWeek }} -->
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
         {{ storeWeek.selectedWeek.start }} to {{ storeWeek.selectedWeek.end }}.
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
import _ from 'lodash'
import { storeUser } from '@/stores/store.js'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeTeam } from '@/stores/storeTeam.js'
import ErrorPopUp from '@/components/utilities/ErrorPopUp.vue'
import PeerEvalTable from '@/components/student/PeerEvalTable.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import { ref } from 'vue'
export default {
   name: 'StudentPeerEvalView',
   props: {},
   data() {
      return {
         storeUser,
         storeWeek,
         team: [
            {
               studentId : '3deea794-06ba-4dc2-9255-d18a7d5eb61c'	,
               studentName: 'Student One',
            }

         ],
         gradeForWeek: 0,
         peerEvalEntriesForSelectedWeek: [],
         hasEntry: false,
         errorFlag: false,
         responseFlag: null,
         isPastWeek: false,
         isFutureWeek: false,
         rubric: null,
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
         
         axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/peerEvaluation/getPeerEvaluation/${storeUser.userID}/${storeWeek.selectedWeekId}`,
               {
                  crossdomain: true,
                  withCredentials: true,
                 
               }
            )
            .then((response) => {
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
               console.log(error.response)
               if(error.response.data != null)
               {
                  console.log(error.response.data.code)
                  console.log("BEFORE SECOND IFS")
                  console.log(error.response.data.code == 409)
                  if(error.response.data.code == 401){
                     console.log("HERE")
                     this.hasEntry = false // No existing eval
                     // this.responseFlag = error.response.data.code //For error comp
                     this.errorFlag = true //Shows error
                     this.responseFlag = 401
                     this.errorMessage = "Unauthorized Access, Please log in again"//FOr error comp

                     }
                  else if(error.response.data.code == 409){
                     this.errorFlag = false
                     this.hasEntry = false

                     this.createNewPeerEvalEntry() // Make this function create an empty peer eval entry for the week then pass to table for completion
                  }
                  
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
         
         this.peerEvalEntriesForSelectedWeek = []
         var ratingList = []
         for (const criteria of this.rubric) {
            const rating = {
               score : 0,
               criteria
            }
            ratingList.push(rating)


            
         }
         for (const student of storeTeam.teamMembers) {
            this.peerEvalEntriesForSelectedWeek.push({
               evaluateeFirstName: student.firstName,
               evaluateeLastName: student.lastName,
               evaluateeId: student.id,
               evaluatorId: storeUser.userID,
               week: storeWeek.currentWeekId,
               comment: '',
               ratings : _.cloneDeep(ratingList),
               
               
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
      getRubric() {
         axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/section/getRubric/${storeUser.sectionId}`, {
            withCredentials: true,
         })
         .then((response) => {
            console.log('RUBRIC' + response.data.data.criteria)
            this.rubric = response.data.data.criteria
         })
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
     this.rubric = this.getRubric()
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
