<template>
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

export default {
  name: 'InstructorPeerEvalView',
  data() {
    return {
      reports: [], // This will hold the fetched evaluation reports
      isLoading: false,
      error: null,
      studentId: [1, 2, 3], 
      week: '15', 
    };
  },
  methods: {
    async fetchEvaluationReports() {
      this.isLoading = true;
      this.error = null;
      // Temporary container for the reports
      let tempReports = [];

      // Fetch reports for each student
      for (const studentId of this.studentId) {
        try {
          const response = await axios.get(`http://localhost:80/api/v1/evaluationReport`, {
            params: {
              studentId: studentId,
              week: this.week,
            }
          });

          if (response.data.flag && response.data.code === 200 && response.data.data.length > 0) {
            const studentReport = response.data.data[0];
            tempReports.push({
              name: `${studentReport.firstName} ${studentReport.lastName}`,
              score: `${studentReport.averageScore}/60`, 
            });
          } else {
            this.error = response.data.message || `Failed to fetch evaluation report for student ID ${studentId}`;
            // Consider how you want to handle partial failures
          }
        } catch (error) {
          this.error = error.message || 'An error occurred while fetching data';
          // Break the loop if one call fails or decide how to handle this case
          break;
        }
      }

      // All requests are complete, update the reports data property
      this.reports = tempReports;
      this.isLoading = false;
    },
  },
  mounted() {
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
