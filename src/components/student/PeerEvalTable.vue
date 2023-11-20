<template>
   <form onsubmit="submitEvaluation">
      <table class="table">
         <thead>
            <tr>
               <th scope="col">Team member</th>
               <th scope="col" v-for="item in rubric">
                  {{ item }}
               </th>
               <th>Total</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="student in peerEval">
               <td scope="col">{{ student.evaluateeFirstName + student.evaluateeLastName }}</td>
               <td scope="col" v-for="item in student.ratings">
                  <input
                     type="number"
                     v-model="item.score"
                     min="1"
                     max="10"
                  />
               </td>
               <!-- <td scope="col">
                  {{
                     // student.peerEval.ratings.reduce((a, b) => a + b.score, 0)
                  }}
               </td> -->
            </tr>
         </tbody>
      </table>
      <button type="submit">Submit</button>
   </form>
</template>

<script>
export default {
   name: 'PeerEvalTable',
   props: {
      peerEval: Object,
      },

   data() {
      return {
         rubric: []
         
      }
   },
   methods: {
      submitEvaluation() {
         return 2
         console.log('Evaluation submitted')
      },
      getRubric() {
         var rubric = []
         for(const item of this.peerEval){
            for(const rating of item.ratings){
               rubric.push(rating.criterion.criterionDesc)
            }
         }
         return rubric
      },
   },
   computed: {
      
   },
   mounted() {
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
