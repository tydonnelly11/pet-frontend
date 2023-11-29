<template>
   <div class="instructor-pe-container">
      <h1>Instructor Peer Evaluation</h1>
      <table>
         <thead>
            <tr>
               <th>Student Name</th>
               <th>Grade</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="student in students" :key="student.id">
               <td>{{ student.name }}</td>
               <td>{{ student.grade }}</td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
import { ref } from 'vue'
export default {
   name: 'InstructorPeerEvalView',
   data() {
      return {
         // Placeholder data, replace with actual data later
         students: [
            { id: 1, name: 'Alice', grade: 'A' },
            { id: 2, name: 'Bob', grade: 'B' },
            // ... more students
         ],
      }
   },
}
</script>

<style scoped>
.instructor-pe-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 5%;
}
table {
   /* Add table styling here */
}
</style>
