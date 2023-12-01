<template>
   <div>
     <h1>Instructor Peer Evaluation</h1>
     <table>
       <thead>
         <tr>
           <th>Student Name</th>
           <th>Grade</th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(report, index) in reports" :key="index">
           <td>{{ report.firstName }} {{ report.lastName }}</td>
           <td>
             <input type="number" v-model="report.averageScore" placeholder="Grade">
           </td>
           <td>
             <!-- Remove button for each row -->
             <button @click="removeReport(index)">Remove</button>
           </td>
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
       sectionId: 1, // Replace with dynamic section ID
       selectedWeek: 'week1', // Replace with dynamic week selection
     };
   },
   methods: {
     fetchEvaluationReports() {
       this.isLoading = true;
       axios.get(`api/v1/evaluationReport`, {
         params: {
           sectionId: this.sectionId,
           week: this.selectedWeek,
         }
       }) 
       .then(response => {
         this.isLoading = false;
         if (response.data.flag && response.data.code === 200) {
           this.reports = response.data.data;
         } else {
           this.error = response.data.message || 'Failed to fetch evaluation reports';
         }
       })
       .catch(error => {
         this.isLoading = false;
         this.error = error.message || 'An error occurred while fetching data';
       });
     },
     removeReport(index) {
       this.reports.splice(index, 1);
     },
   },
   mounted() {
     this.fetchEvaluationReports();
   },
 };
 </script>
 
 <style scoped>
 table {
   width: 100%;
   border-collapse: collapse;
 }
 th, td {
   border: 1px solid #ddd;
   padding: 8px;
 }
 input[type="text"] {
   width: 100%;
   padding: 8px;
   border: 1px solid #ddd;
 }
 button {
   margin-top: 20px;
   padding: 10px 20px;
   cursor: pointer;
 }
 </style>