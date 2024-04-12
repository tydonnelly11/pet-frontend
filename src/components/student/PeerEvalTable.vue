<template>
   <form @submit.prevent="submitEvaluation">
      <table class="table">
         <thead>
            <tr>
               <th scope="col">Team member</th>
               <th scope="col" v-for="item in rubric">
                  <p class="crit-title">{{ item.criterionName }}</p>
                  <el-tooltip
                     class="box-item"
                     effect="dark"
                     :content="item.criterionDesc"
                     placement="bottom"
                     >
                     <el-button>Description</el-button>
                     </el-tooltip>
               </th>
               <th scope="col">Private Comments</th>
               <th scope="col">Public Comments</th>
               <!-- <th>Total</th> -->
            </tr>
         </thead>
         <tbody>
            <tr v-if="this.isPastWeek" v-for="student in this.peerEval">
               <td scope="col">
                  {{ student.evaluateeFirstName + student.evaluateeLastName }}
               </td>
               <td scope="col" v-for="item in student.ratings">
                  <p type="number" min="0">{{ item.score }}</p>
               </td>
               <td scope="col">
                  <p
                     v-for="(
                        commentValue, commentKey
                     ) in student.publicComments"
                     type="text"
                  >
                     {{ commentKey }} {{ commentValue }}
                  </p>
               </td>
            </tr>
            <tr v-else v-for="student in this.peerEval">
               <td scope="col">
                  {{ student.evaluateeFirstName }}
                  {{ student.evaluateeLastName }}
               </td>
               <td scope="col" v-for="item in student.ratings">
                  <input
                     type="number"
                     v-model="item.score"
                     min="0"
                     :max="item.criterion.maxScore"
                  />
               </td>
               <td scope="col">
                  <input
                     class="comment"
                     type="text"
                     v-model="student.privateComment"
                  />
                  <!-- <input type="checkbox" v-model="student.isCommentPublic"/> -->
               </td>
               <td scope="col">
                  <input
                     class="comment"
                     type="text"
                     v-model="student.publicComment"
                  />
                  <!-- <input type="checkbox" v-model="student.isCommentPublic"/> -->
               </td>
            </tr>
         </tbody>
      </table>
      <button v-if="!this.isPastWeek && !this.isLoading" type="submit">
         Submit
      </button>
   </form>

   <div v-if="this.isLoading" class="popup-overlay">
      <div class="loading">
         <img src="/img/loading-gif.gif">
      </div>
   </div>

   <div v-if="this.submissionStatus == 200" class="popup-overlay">
      <div class="success">
         <p>Submitted!</p>
         <button @click="this.submissionStatus = 100">Close</button>
      </div>
   </div>
</template>

<script>
import apiClient from '@/axios-setup.js'
import { storeUser } from '@/stores/store.js'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeTeam } from '@/stores/storeTeam.js'
import { ElButton, ElTooltip } from 'element-plus'

export default {
   name: 'PeerEvalTable',
   props: {
      peerEvalProp: Object,
      user: Object,
      isPastWeek: Boolean,
      rubricProp: Array,
   },
   components: {
      // { ElButton },
      // { ElTooltip },
   },

   data() {
      return {
         rubric: this.rubricProp,
         peerEval: this.peerEvalProp,
         submissionStatus: 0,
         storeUser,
         isLoading: false,
         showDesc: false,
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
         this.isLoading = true
         const targetPayload = []
         for (const item of this.peerEval) {
            if (item.publicComment == ' ' || item.publicComment == null) {
               item.publicComment = 'None'
            }
            if (item.privateComment == ' ' || item.privateComment == null) {
               item.privateComment = 'None'
            }
            targetPayload.push({
               evaluatorId: item.evaluatorId,
               evaluateeId: item.evaluateeId,

               week: item.week,
               ratings: item.ratings,
               comment: item.comment,
               publicComment: item.publicComment,
               privateComment: item.privateComment,
               // isCommentPublic: item.isCommentPublic,
            })
         }

         const auth = localStorage.getItem('auth')

         apiClient
            .post(
               `${this.$baseURL}/api/v1/peerEvaluation/submitPeerEvaluation`,
               targetPayload,
               {
                  headers: { Authorization: `Bearer ${auth}` },
               }
            )
            .then((response) => {
               console.log(response)
               this.submissionStatus = response.data.code
               this.isLoading = false
            })
            .catch((error) => {
               console.log(error)
            })
      },
   },

   created() {},
}
</script>

<style scoped>
table {
   height: auto;
   width: 90%;
   position: relative;
   left: 5%;
}
.comment {
   height: 75px;
   width: 150px;
}
th,
td {
   /* max-width: 200px; Set maximum width for cells */
   overflow: hidden; /* Hide overflow content */
   /* white-space: nowrap; Prevent line breaks */
   text-overflow: ellipsis; /* Show ellipsis for overflow content */
}
.column-top {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
}
.crit-desc {
   font-size: 0.75em;
   flex-basis: 50%;
}
.crit-title {
   font-size: 1.25em;
   flex-basis: 60%;
   position: relative;
}
form {
   margin-top: 2.5%;
}

p{
   margin-block-end: 0;
}

button {
   margin-top: 10px;
}
</style>
