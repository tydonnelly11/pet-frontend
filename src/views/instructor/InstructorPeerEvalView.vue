<template>
  <WeekDropdown :displayedWeeks="storeWeek.weeksForSemester" 
      :selectWeek="storeWeek.currentWeekId" 
      :currentWeekProp="storeWeek.currentWeek">
      </WeekDropdown>
  <div>
    <h1>Instructor Peer Evaluation</h1>
    <!-- Display loading state or errors -->
    <div v-if="isLoading" class="popup-overlay">
         <img src="/img/loading-gif.gif">
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
import apiClient from '../../axios-setup.js';
import { storeWeek } from '../../stores/storeWeek.js';
import { storeUser } from '../../stores/store.js';
import WeekDropdown from '@/components/WeekDropdown.vue';
import { storeSection } from '../../stores/storeSection';
import CommentTable from '../../components/instructor/CommentTable.vue';
export default {
  name: 'InstructorPeerEvalView',
  components: {
    WeekDropdown,
    CommentTable
  },
  data() {
    return {
      reports: [], // This will hold the fetched evaluation reports
      isLoading: false,
      error: null,
      
      // week: '15', 
      storeWeek,storeUser,storeSection, 
      rubric: null,
    };
  },
  methods: {
    getRubric() {
        const auth = localStorage.getItem('auth')
         
         apiClient.get(`${this.$baseURL}/api/v1/section/getRubric/${storeSection.selectedSectionId}`, 
         {headers: { 'Authorization': `Bearer ${auth}` }}
         )
         .then((response) => {
            this.rubric = response.data.data.criteria
            this.fetchEvaluationReports();
         })
      },
    async fetchEvaluationReports() {
      this.isLoading = true;
      this.error = null;
      // Temporary container for the reports
      let tempReports = [];
     
      const auth = localStorage.getItem('auth')
      // Fetch reports for each student
        try {
          const response = await apiClient.get(`${this.$baseURL}/api/v1/peerEvaluation/getEvaluationReportWithPrivateComments`, {
            params: {
              
              week: storeWeek.selectedWeekId,
              sectionId: storeSection.selectedSectionId,
            },
            headers: { 'Authorization': `Bearer ${auth}` }
            
          },
          );
          
          if (response.data.flag && response.data.code === 200 && response.data.data.length > 0) {
            const studentReport = response.data.data;

            
              for(const student of studentReport){
                const name = `${student.firstName} ${student.middleName} ${student.lastName}`;
                
                if((name in student.privateComments)){
                  
                tempReports.push({
                name: `${student.firstName} ${student.lastName}`,
                score: `${student.averageScore}/${this.totalScore}`, 
                privateComments: student.privateComments,
                publicComments: student.publicComments
                

                });
                  
                }
              else{
                tempReports.push({
                  name: `${student.firstName} ${student.lastName}`,
                  score: `${student.averageScore}/${this.totalScore} : NO EVAL SUBMITTED`, 
                  privateComments: student.privateComments,
                  publicComments: student.publicComments
              

              });

              }
             


            }
            
           
            
          } else {
            this.error = "No reports for week " + storeWeek.selectedWeek.start + " - " + storeWeek.selectedWeek.end + " found";
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
         // Call your function here
         this.fetchEvaluationReports();
    }
     
   },
  created() {
    this.getRubric();
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
