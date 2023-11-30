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
         <tr v-for="(evaluation, index) in evaluations" :key="index">
           <td>
             <input type="text" v-model="evaluation.name" placeholder="Enter student name">
           </td>
           <td>
             <input type="text" v-model="evaluation.grade" placeholder="Enter grade">
           </td>
           <td>
             <!-- Remove button for each row -->
             <button @click="removeStudent(index)">Remove</button>
           </td>
         </tr>
       </tbody>
     </table>
     <button @click="addStudent">Add Student</button>
     <button @click="submitEvaluations">Submit Evaluations</button>
   </div>
 </template>
 
 <script>
 export default {
   name: 'InstructorPeerEvalView',
   data() {
     return {
       evaluations: [
         // Pre-populated or empty array as needed
       ],
     };
   },
   methods: {
     addStudent() {
       this.evaluations.push({ name: '', grade: '' });
     },
     removeStudent(index) {
       // Remove the evaluation at the given index
       this.evaluations.splice(index, 1);
     },
     submitEvaluations() {
       console.log(this.evaluations);
     },
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
 