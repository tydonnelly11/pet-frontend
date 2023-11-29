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
      <button type="submit">Submit</button>
   </form>
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
      submitEvaluation() {
         const targetPayload = []

         for (const item of this.peerEval) {
            targetPayload.push({
               evaluatorId: this.userID,
               evaluateeId: item.evaluateeId,
               week: item.week,
               ratings: item.ratings,
               comment: item.comment,
               oldScore: item.oldScore,
            })
         }
         const testPayload = this.peerEval[1]
         testPayload.evaluatorId = '1'
         console.log(targetPayload)

         axios
            .post('http://localhost:8080/api/v1/submitEval', testPayload, {})
            .then((response) => {
               console.log(response)
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
