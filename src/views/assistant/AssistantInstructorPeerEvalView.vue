<template>
   <WeekDropdown
      :displayedWeeks="storeWeek.weeksForSemester"
      :selectWeek="storeWeek.currentWeekId"
      :currentWeekProp="storeWeek.currentWeek"
   >
   </WeekDropdown>
   <div>
      <h1>Assistant Instructor Peer Evaluation</h1>
      <!-- Display loading state or errors -->
      <div v-if="isLoading" class="popup-overlay">
         <img src="/img/loading-gif.gif" />
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>

      <table v-if="!isLoading && !error">
         <thead>
            <tr>
               <th>Student Name</th>
               <th>Grade</th>
               <th>Private Comments</th>
               <th>Public Comments</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(report, index) in reports" :key="index">
               <td>{{ report.name }}</td>
               <td>{{ report.score }}</td>
               <td>
                  <CommentTable :comments="report.publicComments" />
               </td>
               <td>
                  <CommentTable :comments="report.privateComments" />
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
import apiClient from '../../axios-setup.js'
import { storeWeek } from '../../stores/storeWeek.js'
import { storeUser } from '../../stores/store.js'
import WeekDropdown from '@/components/WeekDropdown.vue'
import CommentTable from '../../components/instructor/CommentTable.vue'
import { storeSection } from '../../stores/storeSection'

export default {
   name: 'AssistantInstructorPeerEvalView',
   components: {
      WeekDropdown,
      CommentTable,
   },
   data() {
      return {
         reports: [],
         isLoading: false,
         error: null,
         rubric: null,
         storeWeek,
         storeUser,
         storeSection,
         assistantSectionId: null,
      }
   },
   methods: {
      async fetchRubricAndReports() {
         try {
            const auth = localStorage.getItem('auth')
            const rubricResponse = await apiClient.get(
               `${this.$baseURL}/api/v1/section/getRubric/${storeSection.selectedSectionId}`,
               {
                  headers: { Authorization: `Bearer ${auth}` },
               }
            )
            this.rubric = rubricResponse.data.data.criteria
            this.fetchEvaluationReports()
         } catch (error) {
            console.error('Error fetching rubric:', error)
            this.error = 'An error occurred while fetching the rubric.'
         }
      },
      async fetchEvaluationReports() {
         this.isLoading = true
         this.error = null
         let tempReports = []

         try {
            const auth = localStorage.getItem('auth')
            const response = await apiClient.get(
               `${this.$baseURL}/api/v1/peerEvaluation/getEvaluationReportWithPrivateComments`,
               {
                  params: {
                     week: storeWeek.selectedWeekId,
                     sectionId: this.getSectionIdForRequest(),
                  },
                  headers: { Authorization: `Bearer ${auth}` },
               }
            )

            if (
               response.data.flag &&
               response.data.code === 200 &&
               response.data.data.length > 0
            ) {
               const studentReport = response.data.data
               for (const student of studentReport) {
                  const name = `${student.firstName} ${student.middleName} ${student.lastName}`
                  const score = student.averageScore
                     ? `${student.averageScore}/${this.totalScore}`
                     : 'NO PEER EVALUATION SUBMITTED'
                  tempReports.push({
                     name: `${student.firstName} ${student.lastName}`,
                     score: score,
                     privateComments: student.privateComments,
                     publicComments: student.publicComments,
                  })
               }
            } else {
               this.error = 'No reports found for the selected week.'
            }
         } catch (error) {
            console.error('Error fetching evaluation reports:', error)
            this.error =
               'An error occurred while fetching the evaluation reports.'
         }

         this.reports = tempReports
         this.isLoading = false
      },
      getSectionIdForRequest() {
         if (storeUser.role === 'assistant_instructor') {
            return this.assistantSectionId
         } else {
            return storeSection.selectedSectionId
         }
      },
   },
   computed: {
      totalScore() {
         let total = 0
         for (const criteria of this.rubric) {
            total += criteria.maxScore
         }
         return total
      },
   },
   watch: {
      'storeWeek.selectedWeekId': function (newVal, oldVal) {
         console.log(`currentWeekId changed from ${oldVal} to ${newVal}`)
         this.fetchEvaluationReports()
      },
   },
   created() {
      if (storeUser.role === 'user') {
         this.assistantSectionId = storeUser.assignedSectionId
      }
      this.fetchRubricAndReports()
   },
}
</script>

<style scoped>
.error-message {
   color: red;
}
table {
   width: 100%;
   border-collapse: collapse;
}
th,
td {
   border: 1px solid #ddd;
   padding: 8px;
}
.overlay {
   position: fixed; /* or absolute */
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
   z-index: 1000; /* Ensure it's above other content */
}
</style>
