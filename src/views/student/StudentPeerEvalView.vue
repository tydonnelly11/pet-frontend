<template>
   <div class="student-pe-container">
      
      <!--@select-week is the emit from child component with week as first arg of the func-->
      <div v-if="this.isPastWeek" class="display-grade">
         <h1>Grade for {{ storeWeek.selectedWeek.start }} to {{ storeWeek.selectedWeek.end }} : {{ this.gradeForWeek }} / {{ this.totalScore }}</h1>
         <CommentTable v-if="this.publicComments != null" :comments="this.publicComments"/>
      </div>
   

      <div v-if="isLoading" class="popup-overlay">
         <img src="/img/loading-gif.gif">
      </div>
      <PeerEvalTable
         v-if="(!this.isFutureWeek) & this.hasEntry"
         :isPastWeek="isPastWeek"
         :peerEvalProp="this.peerEvalEntriesForSelectedWeek"
         :rubricProp="this.rubric"

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
import apiClient from  '@/axios-setup.js'
import _ from 'lodash'
import { storeUser } from '@/stores/store.js'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeTeam } from '@/stores/storeTeam.js'
import ErrorPopUp from '@/components/utilities/ErrorPopUp.vue'
import PeerEvalTable from '@/components/student/PeerEvalTable.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import CommentTable from '../../components/instructor/CommentTable.vue'
import { ref } from 'vue'
export default {
   name: 'StudentPeerEvalView',
   props: {},
   data() {
      return {
         storeUser,
         storeWeek,
         gradeForWeek: 0,
         peerEvalEntriesForSelectedWeek: [],
         hasEntry: false,
         errorFlag: false,
         responseFlag: null,
         isPastWeek: false,
         isFutureWeek: false,
         isLoading: false,
         rubric: null,
         publicComments: null,
         totalScore: 0,
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
      CommentTable,
   },
   methods: {
      async getPeerEvalEntriesForWeek() {
         this.isLoading = true
         const auth = localStorage.getItem('auth')
         apiClient.get(`http://localhost:80/api/v1/peerEvaluation/getPeerEvaluation/${storeUser.userID}/${storeWeek.selectedWeekId}`,
               // {
               //    headers: { 'Authorization': `Bearer ${auth}` }            
               // }
            )
            .then((response) => {
              
               if (response.data.code == 200) {
                  this.errorFlag = false
                  const peerEvalEntriesForWeek = response.data.data
                  
                  for(const entry of peerEvalEntriesForWeek){
                     for(const rating of entry.ratings){
                        rating.criterion = this.rubric.find((criteria) => criteria.id == rating.criteriaId)
                     }
                  }


                  this.peerEvalEntriesForSelectedWeek = peerEvalEntriesForWeek
                  this.setPeerEvalVisibility(
                     storeWeek.currentWeekId,
                     storeWeek.selectedWeekId
                  )
                  // this.getGradeAndCommentsForPastWeek()
                  this.isLoading = false
                  this.hasEntry = true

               } else if (response.data.code == 409) {
                  //Will be changed to new code
                  //409 is no entry for week
                  this.isLoading = false
                  this.errorFlag = false
                  this.hasEntry = false
                  this.createNewPeerEvalEntry() // Make this function create an empty peer eval entry for the week then pass to table for completion
               } else {
                  this.isLoading = false
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
                  console.log(error.response.data.code == 409)
                  if(error.response.data.code == 401){
                     this.hasEntry = false // No existing eval
                     // this.responseFlag = error.response.data.code //For error comp
                     this.errorFlag = true //Shows error
                     this.responseFlag = 401
                     this.errorMessage = "Unauthorized Access, Please log in again"//FOr error comp
                     this.isLoading = false


                     }
                  else if(error.response.data.code == 409){
                     this.errorFlag = false
                     this.hasEntry = false

                     this.createNewPeerEvalEntry()
                     this.isLoading = false // Make this function create an empty peer eval entry for the week then pass to table for completion
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
            const criterion = _.cloneDeep(criteria)
            const rating = {
               score : criterion.maxScore,
               criterion,
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
         const ownStudent = {
            evaluateeFirstName: storeUser.firstName,
            evaluateeLastName: storeUser.lastName,
            evaluateeId: storeUser.userID,
            evaluatorId: storeUser.userID,
            week: storeWeek.currentWeekId,
            comment: '',
            isCommentPublic : false,
            ratings : _.cloneDeep(ratingList),
         }
         this.peerEvalEntriesForSelectedWeek.push(ownStudent)

         this.setPeerEvalVisibility(storeWeek.currentWeekId, storeWeek.selectedWeekId)
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
            this.getGradeAndCommentsForPastWeek()
         }
      },
      getRubric() {
         const auth = localStorage.getItem('auth')

         apiClient.get(`http://localhost:80/api/v1/section/getRubric/${storeUser.sectionId}`, {
            // headers: { 'Authorization': `Bearer ${auth}` }
         })
         .then((response) => {
            
            this.rubric = response.data.data.criteria
            for(const criteria of this.rubric){
               this.totalScore += criteria.maxScore
            }
            this.getPeerEvalEntriesForWeek()
         })
         .catch((error) => {
            console.log(error)
         })
      },
      getGradeAndCommentsForPastWeek(){      
         // const auth = localStorage.getItem('auth')
         apiClient.get(`http://localhost:80/api/v1/peerEvaluation/getEvaluationReportWithoutPrivateComments`, {
            params: {
               week: storeWeek.selectedWeekId,
               studentId: storeUser.userID,
            }
         })
         .then((response) => {
            if(response.data.data.length == 0){
               this.gradeForWeek = 0
               this.didNotSubmit = true
               this.publicComments = null;
               return
            }
            else{
               this.gradeForWeek = response.data.data[0].averageScore
               this.publicComments = response.data.data[0].publicComments
            }
           
         })
         .catch((error) => {
            console.log(error)
         })
      },
      
      
   },
   watch: {
      'storeWeek.selectedWeekId': function(newVal, oldVal) {
         // Call your function here
         this.getPeerEvalEntriesForWeek();
    }
     
   },

   computed: {
      
   },
   created() {
     this.getRubric()
   },
   mounted() {
      // this.getGradeAndCommentsForPastWeek()
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

/* .overlay {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000; 
} */

.display-grade {
   text-align: center;
   font-size: 1.5em;
   display: flex;
   flex-direction: row;
}
</style>
