<template>
   <div class="section-info">
      <h1>Teams assigned to you for {{ storeSection.selectedSectionName }}</h1>
      <h3 v-if="isActiveSection" class="act-sctn">Active Section</h3>
      <h3 v-else class="inact-sctn">Inactive Section</h3>
   </div>

   <div v-if="hasLoaded" class="page" style="justify-content: center">
      <!-- Teams Section -->
      <h2 class="teams-header">Teams</h2>
      <div class="teams">
         <div class="teams-container">
            <div class="team-card" v-for="team in teams" :key="team.id">
               <div class="team-name-checkbox">
                  <div>
                     <button class="view-team-btn" style="margin-bottom: 10px" @click="openTeam(team.name, team.id, team.students)">
                        <h3> {{ team.name }} </h3>
                     </button>
                  </div>
               </div>
               <div v-if="team.students.length  === 0">
                  No students assigned
               </div>

               <div :style="'width : 100%;'" class='student-in-team-container' v-for="student in team.students" :key="student.id">

                  <button class="view-team-btn"
                          v-if="student.teamId"
                          @click="openWARAndEval(student, team)">{{ student.firstName }} {{ student.lastName }}</button>
                  <p class='view-team-btn' v-else>{{ student.firstName }} {{ student.lastName }}</p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import apiClient from  '@/axios-setup.js'
import { storeUser } from '@/stores/store.js'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeSection } from '@/stores/storeSection.js'
import { storeTeam } from '@/stores/storeTeam'
import SectionDropdown from '../../components/instructor/SectionDropdown.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import InstructorInviteStudents from '@/components/instructor/InviteStudents.vue'
import InviteAssitInstructor from '../../components/instructor/InviteAssitInstructor.vue'

export default {
   name: 'AssistantInstructorShowTeamView',
   components: {
      SectionDropdown,
      InstructorInviteStudents,
      WeekDropdown,
      InviteAssitInstructor

   },
   data() {
      return {
         students: [],
         teams: [],
         selectedStudent: [],
         updatedTeam: {
            id: "",
            name: "",
            sectionId: storeSection.selectedSectionId,
            students: [],

         },
         newSectionName: storeSection.selectedSection.name,
         selectInviteTeam: false,
         studentIDToDelete : null,
         selectedTeamId: null,
         isLoading: false,
         isSuccess: false,
         isProcessingTeamCreation: false,
         isProcessingTeamSave: false,
         hasCreatedTeams: false,
         hasSavedTeam: false,
         hasLoaded: false,
         teamName: "",
         storeSection,storeWeek,
         inviteStudentPressed: false,
         inviteInstructorPressed: false,
         hasSetActiveSection: false,
         assistInstructors: [],
         editSection: false,
         hasUpdatedSection: false,
         activeInstructors: [],
         storeUser,
         selectedSectionInfo : storeSection.selectedSection,
         currentTeam: null,
         currentInstructor: null,
         teamConformation: false,
         isActiveSection: false,
         teamCreationFailed: false,
         hasSelectedDeleteStudent: false,
         hasDeletedStudent: false,
      }
   },
   methods: {
      getStudents(){
         this.isLoading = true

         apiClient.get(`${this.$baseURL}/api/v1/section/getAllStudents/${storeSection.selectedSectionId}`,

         )
            .then(response => {
               this.students = []
               this.isSuccess = true
               this.isLoading = false
               this.hasLoaded = true
               console.log(response.data.data)
               for(const student of response.data.data){
                  if(student.teamId == null){
                     this.students.push(student)
                  }

               }
               // this.students = response.data.data
            })
            .catch(error => {
               console.log(error)
            })
      },

      getActiveAssistantInstructors(){
         this.activeInstructors = []
         this.isLoading = true
         apiClient.get(`${this.$baseURL}/api/v1/assistantInstructor/getAllInstructors`, {

         })
            .then(response => {
               console.log(response)
               if(response.data.data == null){
                  this.isLoading = false
                  return
               }
               else{
                  for(const instructor of response.data.data){
                     if(instructor.isActive){
                        this.activeInstructors.push(instructor)
                     }
                  }
               }

               this.isLoading = false
            })
            .catch(error => {
               console.log(error)
               this.isLoading = false
            })
      },
      openWARAndEval(studentVar){
         const name = studentVar.firstName + " "  + studentVar.lastName;

         this.$router.push({name: 'InstructorViewStudent', params: {teamid: studentVar.teamId, studentid: studentVar.id, studentName: name}});
      },
      openTeam(name, id, members){
         storeTeam.setTeamMembers(members)
         localStorage.setItem('storeTeam', JSON.stringify(storeTeam));
         this.$router.push({name: 'InstructorViewTeam', params: {teamid: id, teamname: name, sectionId : storeSection.selectedSectionId}});
      },
      getTeams(){
         this.isLoading = true
         const auth = localStorage.getItem('auth')
         const config = {
            headers: { 'Authorization': `Bearer ${auth}` }
         };
         apiClient.get(`${this.$baseURL}/api/v1/section/getAllTeams/${storeSection.selectedSectionId}`,
            {  headers: { 'Authorization': `Bearer ${auth}` }}
         )
            .then(response => {
               this.teams = response.data.data
               this.hasLoaded = true

            })
            .catch(error => {
               console.log(error)
            })

      }
   },
   computed: {
      isLoading() {
         return (this.students === null || this.teams === null)
      }
   },
   watch: {
      'storeSection.selectedSectionId': function(newVal, oldVal) {
         this.getStudents()
         this.getTeams()
      }

   },

   created() {
      const fromViewAllSection = this.$route.query.fromViewAllSection === 'true';
      console.log(fromViewAllSection)
      if(!fromViewAllSection){
         storeSection.setSelectedSection(storeSection.activeSection)
      }
      if(storeSection.activeSection.id === storeSection.selectedSectionId){
         this.isActiveSection = true
      }
      else{
         this.isActiveSection = false
      }
      this.getStudents()
      this.getTeams()
      this.getActiveAssistantInstructors()
   },
}

</script>

<style scoped>
.act-sctn{
   margin-left: 20px;
   color: green;
}
.inact-sctn{
   margin-left: 20px;
   color:red;
}
.section-info{
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: center;
}

.student-in-team-container{
   display: flex;
   align-items: center;
   justify-content: center;
}

.page {
   display: flex;
   flex-direction: row;
   flex-wrap: wrap; /* Wrap items on smaller screens */
}

.teams {
   width: 100%; /* Take full width of the container */
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Create a responsive grid */
   gap: 10px; /* Space between tiles */
}


.teams-header {
   text-align: center;
   font-size: 2rem;
   margin-bottom: 30px; /* Adjust as needed */
   color: black; /* TCU purple or any other color that fits the theme */
}

/* Style for the overall Teams container */
.teams-container {
   display: flex; /* Using flexbox to align items */
   flex-wrap: wrap; /* Allows items to wrap onto the next line */
   justify-content: space-around; /* Spreads out the cards evenly */
   align-items: flex-start; /* Aligns items at the start of the container */
   padding: 20px; /* Padding around the container */
}

/* Style for the team cards */
.team-card {
   background-color: #4E2A84; /* TCU purple */
   color: white;
   padding: 15px;
   border-radius: 8px;
   margin: 10px; /* Space between cards */
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
   width: calc(20% - 20px); /* Calculates width for 5 items per row, accounting for margin */
   transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effects */
   min-width: 300px;
   min-height: 300px;
   justify-content: center;
}

.view-team-btn:hover {
   opacity: 0.9;
}

/* Style for individual buttons */
.view-team-btn {
   background-color: #5C4B93; /* A lighter shade of purple for contrast */
   color: white;
   padding: 10px 20px;
   border: none;
   border-radius: 20px;
   margin-top: 5px;
   cursor: pointer;
   width: 250px;
   max-width: 400px;
   margin-right: 5px;
}

/* Media query for responsive design */
@media (max-width: 768px) {
   .team-card {
      width: 90%; /* Full width on smaller screens */
   }
}

.team-name-checkbox {
   display: flex; /* This will place child elements in a row */
   align-items: center; /* This will vertically center the items in the container */
   justify-content: center;
}

.student-name-checkbox > input{
   flex-basis: 10%;

}
.student-name-checkbox > label{
   flex-basis: 70%;

}
.student-name-checkbox > button{
   flex-basis: 20%;

}

.team-name-checkbox > *:not(:last-child) {
   margin-right: 10px; /* Add right margin to all child elements except the last one */
}

.section-btn > *:not(:last-child) {
   margin-right: 10px;
}

/* Additional responsive adjustments for smaller screens */
@media (max-width: 768px) {
   .team-card {
      width: calc(50% - 20px); /* Adjusts to two columns on smaller screens */
   }
}

/* Further adjustments if needed for very small screens */
@media (max-width: 480px) {
   .team-card {
      width: calc(100% - 20px); /* Full width for very small devices */
   }
}
</style>