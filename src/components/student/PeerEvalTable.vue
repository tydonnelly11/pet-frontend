<template>
   <form @submit.prevent="submitEvaluation">
      <table class="table">
         <thead>
            <tr>
               <th scope="col">Team member</th>
               <th scope="col" v-for="item in rubric">
                  {{ item }}
               </th>
               <th scope="col">Comments</th>
               <th>Total</th>
            </tr>
         </thead>
         <tbody>
            <tr v-if="this.isPastWeek" v-for="student in this.peerEval">
               <td scope="col">
                  {{ student.evaluateeFirstName + student.evaluateeLastName }}
               </td>
               <td scope="col" v-for="item in student.ratings">
                  <p type="number" min="1" max="10">{{ item.score }}</p>
               </td>
               <td scope="col">
                  <p type="text">{{ student.comment }}</p>
               </td>

               <!-- <td scope="col">
                  {{
                      student.ratings.reduce((a, b) => a + b.score, 0)
                  }}
               </td> -->
            </tr>
            <tr v-else v-for="student in this.peerEval">
               <td scope="col">
                  {{ student.evaluateeFirstName + student.evaluateeLastName }}
               </td>
               <td scope="col" v-for="item in student.ratings">
                  <input type="number" v-model="item.score" min="1" max="10" />
               </td>
               <td scope="col">
                  <input type="text" v-model="student.comment" />
               </td>
            </tr>
         </tbody>
      </table>
      <button v-if="!(this.isPastWeek)" type="submit">Submit</button>
   </form>
   <div v-if="this.submissionStatus == 200" class="submit-message">
      <p>Submitted!</p>
   </div>
</template>

<script>
import axios from 'axios'
export default {
   name: 'PeerEvalTable',
   props: {
      peerEvalProp: Object,
      user: Object,
      isPastWeek: Boolean,
   },

   data() {
      return {
         rubric: null,
         peerEval: this.peerEvalProp,
         userID: '1',
         submissionStatus: 0,
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
         var count = 0
         for (const item of this.peerEval) {
            count = count + 1
            targetPayload.push({
               evaluatorId: this.userID,
               evaluateeId: count.toString(),
               week: item.week,
               ratings: item.ratings,
               comment: item.comment,
               oldScore: 0,
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

         axios
            .post('http://localhost:80/api/v1/submitEval', targetPayload, {})
            .then((response) => {
               console.log(response)
               this.submissionStatus = response.data.code
            })
            .catch((error) => {
               console.log(error)
            })
      },
      getRubric() {
         var rubric = []
         const item = this.peerEvalProp[0]
         console.log(item.ratings)
         for (const rating of item.ratings) {
            rubric.push(rating.criterion.criterionDesc)
         }

         return rubric
      },
   },
   computed: {},
   created() {
      this.rubric = this.getRubric()
   },
}
</script>

<style scoped>
table {
   height: 70vh;
}
/* tr{
    border: black 1px solid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
} */
td {
   align-content: center;
}

form {
   margin-top: 2.5%;
}
</style>
