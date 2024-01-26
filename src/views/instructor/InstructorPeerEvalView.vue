<template>
  <WeekDropdown :displayedWeeks="storeWeek.weeksForSemester" 
      :selectWeek="storeWeek.currentWeekId" 
      :currentWeekProp="storeWeek.currentWeek">
      </WeekDropdown>
  <div>
    <h1>Instructor Peer Evaluation</h1>
    <!-- Display loading state or errors -->
    <div v-if="isLoading">Loading...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <table v-if="!isLoading && !error">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in reports" :key="index">
          <td>{{ report.name }}</td>
          <td>{{ report.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { storeWeek } from '../../stores/storeWeek.js';
import { storeUser } from '../../stores/store.js';
import WeekDropdown from '@/components/WeekDropdown.vue';
export default {
  name: 'InstructorPeerEvalView',
  components: {
    WeekDropdown,
  },
  data() {
    return {
      reports: [], // This will hold the fetched evaluation reports
      isLoading: false,
      error: null,
      
      // week: '15', 
      storeWeek,storeUser,
      rubric: null,
    };
  },
  methods: {
    getRubric() {
         axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/section/getRubric/${storeUser.sectionId}`, {
            withCredentials: true,
         })
         .then((response) => {
            this.rubric = response.data.data.criteria
         })
      },
    async fetchEvaluationReports() {
      this.isLoading = true;
      this.error = null;
      // Temporary container for the reports
      let tempReports = [];
      console.log(storeWeek.currentWeekId)
      console.log(storeUser.sectionId)
      // Fetch reports for each student
        try {
          const response = await axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/peerEvaluation/getEvaluationReport`, {
            params: {
              
              week: storeWeek.selectedWeekId,
              sectionId: storeUser.sectionId,
            },
            withCredentials : true,
            
          });
          console.log(response)
          if (response.data.flag && response.data.code === 200 && response.data.data.length > 0) {
            const studentReport = response.data.data;
            for(const student of studentReport){
              tempReports.push({
              name: `${student.firstName} ${student.lastName}`,
              score: `${student.averageScore}/${this.totalScore}`, 
            });
            }
            
          } else {
            this.error = response.data.message || `Failed to fetch evaluation report for student ID ${studentId}`;
            // Consider how you want to handle partial failures
          }
        } catch (error) {
          this.error = error.message || 'An error occurred while fetching data';
          // Break the loop if one call fails or decide how to handle this case
        }
      

      // All requests are complete, update the reports data property
      this.reports = tempReports;
      this.isLoading = false;
    },
  },
  computed: {
    // This is a computed property that will return the total score
    // of all the reports
    totalScore() {
      let total = 0
      for(const criteria of this.rubric){
        total = total + criteria.maxScore
      }
      return total
    },
  },
  watch: {
      'storeWeek.selectedWeekId': function(newVal, oldVal) {
         console.log(`currentWeekId changed from ${oldVal} to ${newVal}`);
         // Call your function here
         this.fetchEvaluationReports();
    }
     
   },
  created() {
    this.getRubric()
    this.fetchEvaluationReports();
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
