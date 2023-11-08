<template>
   <form onsubmit="submitEvaluation">
      <table class="table">
         <thead>
            <tr>
               <th scope="col">Team member</th>
               <th scope="col" v-for="item in rubric">
                  {{ item.description }}
               </th>
               <th>Total</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="student in team.students">
               <td scope="col">{{ student.studentName }}</td>
               <td scope="col" v-for="criteria in student.peerEval.ratings">
                  <input
                     type="number"
                     v-model="criteria.score"
                     min="1"
                     max="10"
                  />
               </td>
               <td scope="col">
                  {{
                     student.peerEval.ratings.reduce((a, b) => a + b.score, 0)
                  }}
               </td>
            </tr>
         </tbody>
      </table>
      <button type="submit">Submit</button>
   </form>
</template>

<script>
export default {
   name: 'PeerEvalTable',

   data() {
      return {
         rubric: [
            {
               description:
                  'How do you rate the quality of this teammate’s work? (1-10)',
               maxScore: 10,
            },
            {
               description: 'How productive is this teammate? (1-10)',
               maxScore: 10,
            },

            {
               description: 'How proactive is this teammate? (1-10)',
               maxScore: 10,
            },
            {
               description:
                  'Does this teammate treat others with respect? (1-10)',
               maxScore: 10,
            },
            {
               description:
                  'How well does this teammate handle criticism of their work? (1-10)',
               maxScore: 10,
            },
            {
               description:
                  'How do you rate the quality of this teammate’s work? (1-10) 1 is Poor, 10 is Excellent',
               maxScore: 10,
            },
         ],

         team: {
            students: [
               {
                  studentName: 'John Doe',
                  studentId: 1,
                  peerEval: this.generatePeerEval(),
               },
               {
                  studentName: 'Jane Doe',
                  studentId: 2,
                  peerEval: this.generatePeerEval(),
               },
               {
                  studentName: 'John Smith',
                  studentId: 3,
                  peerEval: this.generatePeerEval(),
               },
               {
                  studentName: 'Jane Smith',
                  studentId: 4,
                  peerEval: this.generatePeerEval(),
               },
            ],
         },
         peerEval: {
            PeId: 1,
            evaluatorId: 1,
            evaluateeId: 2,
            teamId: 1,
            sectionId: 1,
            weekId: 1,
            ratings: [
               {
                  score: 0,
                  criteria: {
                     criteriaId: 1,
                     description:
                        'How do you rate the quality of this teammate’s work? (1-10)', //This might be just the link to entry in rubric table
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 2,
                     description: 'How productive is this teammate? (1-10)',
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 3,
                     description: 'How proactive is this teammate? (1-10)',
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 4,
                     description:
                        'Does this teammate treat others with respect? (1-10)',
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 5,
                     description:
                        'How well does this teammate handle criticism of their work? (1-10)',
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 6,
                     description:
                        'How do you rate the quality of this teammate’s work? (1-10)',
                     maxScore: 10,
                  },
               },
            ],
         },
      }
   },
   methods: {
      submitEvaluation() {
         return 2
         console.log('Evaluation submitted')
      },
      generatePeerEval() {
         return {
            PeId: 1,
            evaluatorId: 1,
            evaluateeId: 2,
            teamId: 1,
            sectionId: 1,
            weekId: 1,
            ratings: [
               {
                  score: 0,
                  criteria: {
                     criteriaId: 1,
                     description:
                        'How do you rate the quality of this teammate’s work? (1-10)', //This might be just the link to entry in rubric table
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 2,
                     description: 'How productive is this teammate? (1-10)',
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 3,
                     description: 'How proactive is this teammate? (1-10)',
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 4,
                     description:
                        'Does this teammate treat others with respect? (1-10)',
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 5,
                     description:
                        'How well does this teammate handle criticism of their work? (1-10)',
                     maxScore: 10,
                  },
               },
               {
                  score: 0,
                  criteria: {
                     criteriaId: 6,
                     description:
                        'How do you rate the quality of this teammate’s work? (1-10)',
                     maxScore: 10,
                  },
               },
            ],
         }
      },
   },
   computed: {},
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
