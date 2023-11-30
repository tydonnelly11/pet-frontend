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
            <tr v-for="student in peerEval">
               <td scope="col">
                  {{ student.evaluateeFirstName + student.evaluateeLastName }}
               </td>
               <td scope="col" v-for="item in student.ratings">
                  <input type="number" v-model="item.score" min="1" max="10" />
               </td>
               <td scope="col">
                  <input type="text" v-model="student.comment" />
               </td>
               <!-- <td scope="col">
                  {{
                      student.ratings.reduce((a, b) => a + b.score, 0)
                  }}
               </td> -->
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
   },

   data() {
      return {
         rubric: null,
         peerEval: this.peerEvalProp,
         userID: '3',
      }
   },
   methods: {
      submitEvaluation() {
         const targetPayload = {
            evaluatorId: '1',
            evaluateeId: '2',
            week: '1',
            ratings: this.peerEval[0].ratings,
            comment: 'test',
            oldScore: 0,
         }

         // for (const item of this.peerEval) {
         //    payload

         // }
         console.log(targetPayload)

         axios
            .post('http://localhost:8080/api/v1/submitEval', targetPayload, {})
            .then((response) => {
               console.log(response)
            })
            .catch((error) => {
               console.log(error)
            })
      },
      getRubric() {
         var rubric = []
         for (const item of this.peerEvalProp) {
            console.log(item.ratings)
            for (const rating of item.ratings) {
               rubric.push(rating.criterion.criterionDesc)
            }
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
