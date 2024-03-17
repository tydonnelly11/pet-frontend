<template>
   <form @submit.prevent="submitEvaluation">
      <table class="table">
         <thead>
            <tr>
               <th scope="col">Team member</th>
               <th scope="col" v-for="item in rubric">
                  <p>Name:{{ item.criterionName }}</p>
                  <p>Desc:{{ item.criterionDesc }}</p>
               </th>
               <th scope="col">Comments</th>
               <!-- <th>Total</th> -->
            </tr>
         </thead>
         <tbody>
            <tr v-if="this.isPastWeek" v-for="student in this.peerEval">
               <td scope="col">
                  {{ student.evaluateeFirstName + student.evaluateeLastName }}
               </td>
               <td scope="col" v-for="item in student.ratings">
                  <p type="number" min="0" >{{ item.score }}</p>
               </td>
               <td scope="col">
                  <p v-for="(commentValue, commentKey) in student.publicComments" type="text">{{commentKey}} {{ commentValue }}</p>
               </td>

               
            </tr>
            <tr v-else v-for="student in this.peerEval">
               <td scope="col">
                  {{ student.evaluateeFirstName + student.evaluateeLastName }}
               </td>
               <td scope="col" v-for="item in student.ratings">
                  <input type="number" v-model="item.score" min="0" :max='item.criterion.maxScore' />
               </td>
               <td scope="col">
                  <input type="text" v-model="student.comment" />
                  <!-- <input type="checkbox" v-model="student.isCommentPublic"/> -->
               </td>
            </tr>
         </tbody>
      </table>
      <button v-if="!(this.isPastWeek)" type="submit">Submit</button>
   </form>
   
   <div v-if="this.submissionStatus == 200" class="popup-overlay">
      <div class="success">
      <p>Submitted!</p>
      <button @click="this.submissionStatus = 100">Close</button>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import { storeUser } from '@/stores/store.js'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeTeam } from '@/stores/storeTeam.js'
export default {
   name: 'PeerEvalTable',
   props: {
      peerEvalProp: Object,
      user: Object,
      isPastWeek: Boolean,
      rubricProp: Array,
   },

   data() {
      return {
         rubric: this.rubricProp,
         peerEval: this.peerEvalProp,
         submissionStatus: 0,
         storeUser,
         
      }
   },
   watch: {
      peerEvalProp: {
         handler(newVal) {
            this.peerEval = newVal
         },
         deep: true, // Watch nested properties of peerEvalProp
      },
   },
   methods: {
      async submitEvaluation() {
         const targetPayload = []
         for (const item of this.peerEval) {
            console.log(item)
            console.log(storeUser.userId)
            if(item.comment == ""){
               item.comment = "None"
            }
            targetPayload.push({
               evaluatorId: item.evaluatorId,
               evaluateeId: item.evaluateeId,
               
               week: item.week,
               ratings: item.ratings,
               comment: item.comment,
               // isCommentPublic: item.isCommentPublic,
               
            })
            console.log(targetPayload)
         }
         // const testPayload = {
         //    evaluatorId: this.userID,
         //       evaluateeId: this.peerEval[0].evaluateeId,
         //       week: item..peerEval[0].week,
         //       ratings: item.ratings,
         //       comment: item.comment,
         //       oldScore: item.oldScore,
         // }
         // testPayload.evaluatorId = '1'
         // console.log(targetPayload)
         const auth = localStorage.getItem('auth')

         axios
            .post('http://www.peerevaltool.xyz/api/v1/peerEvaluation/submitPeerEvaluation', targetPayload, {
               headers: { 'Authorization': `Bearer ${auth}` },
            })
            .then((response) => {
               console.log(response)
               this.submissionStatus = response.data.code
            })
            .catch((error) => {
               console.log(error)
            })
      },
      // getRubric() {
      //    axios.get(`http://www.peerevaltool.xyz/api/v1/section/getRubric/${storeUser.sectionId}`, {
      //       withCredentials: true,
      //    })
      //    .then((response) => {
      //       console.log('RUBRIC' + response.data.data.criteria)
      //       this.rubric = response.data.data.criteria
      //    })
      // },
      
   },
   
   created() {
      // this.rubric = this.getRubric()
      
   },
}
</script>

<style scoped>
table {
   height: 70vh;
   width: 100%;
}

th, td {
   max-width: 200px; /* Set maximum width for cells */
   overflow: hidden; /* Hide overflow content */
   white-space: nowrap; /* Prevent line breaks */
   text-overflow: ellipsis; /* Show ellipsis for overflow content */
}

form {
   margin-top: 2.5%;
}

button {
   margin-top: 10px;
}
</style>
