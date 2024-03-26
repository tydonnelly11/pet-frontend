<template>
    <h1>Information for: {{ storeSection.selectedSectionName }}</h1>
    <div :style="'display: flex; flex-direction:row'">
        <button @click="inviteStudentPressed = true">Invite Students</button>
        <button @click="inviteInstructorPressed = true">Invite Instructors</button>

    </div>
    
    <div v-if="inviteStudentPressed">
        <InstructorInviteStudents />
        <button @click="inviteStudentPressed = false">Cancel</button>
    </div>
    <div v-if="inviteInstructorPressed">
        <InviteAssitInstructor />
        <button @click="inviteInstructorPressed = false">Cancel</button>
    </div>
    
    <h2> Add Teams To:  {{ storeSection.selectedSectionName }}</h2>
    <div>
      <!-- Add Teams for Section: {{sectionName}} -->
      <div class="input-field">
         <label>Team Name</label>
         <input type="text" id="sectionName" v-model="this.teamName" required class="team-name-input"/>
      </div>

      

      <button type="submit" class="small-button" @click="createTeams()">Create Team</button>
   <div v-if="hasCreatedTeams" class="popup-overlay">
      <div class="success">
         <p>Team Successfully Created!</p>
         <!-- Add a button or a way to close the overlay -->
         <button @click="hasCreatedTeams = false">Close</button>
      </div>
      </div>
    <div v-if="isProcessingTeamCreation" class="popup-overlay">
         <img src="/img/loading-gif.gif">
      </div>
    

   </div>

   <div class="centered-text">
  To add students to a team, please select a team, then select all the students you wish to add to that team and click the save button.
</div>

    <!--<h3>To add students to a team, please select a team, 
            then select all the students you wish to add to that team 
            and click the save button.
        </h3>
    -->
        <div v-if="isLoading" class="popup-overlay">
         <img src="/img/loading-gif.gif">
      </div>    
      <div v-if="hasLoaded" class="page">
        <!-- Teams Section -->
        
        <div class="teams">
            <h2>Teams</h2>
            <div class="team" v-for="team in teams" :key="team.id">
                {{ team.name }}
                <input type="checkbox" 
                    :value="team.id" 
                    :checked="team.id === selectedTeamId" 
                    @change="selectTeam(team)"
                >
                <p @click="openTeam(team.name, team.id, team.students)">View Team</p>
                <div class="team-students">
                    <div class="student" v-for="student in team.students" :key="student.id">
                        <label>{{ student.firstName }} {{ student.lastName }}</label>
                        <p v-if="(student.teamId)" @click="toggleStudentOnTeam(student, team)">Remove</p>
                        <p v-if="(student.teamId)" @click="openWARAndEval(student, team)">View Student</p>

                    </div>
                </div>
            </div>
        </div>

        <!-- Students Section -->
        <div class="students">
            <h2>Students</h2>
            <div v-for="student in students" :key="student.id">
                <label>{{ student.firstName }} {{ student.lastName }}</label>
                <input type="checkbox" :value="student.id" @change="toggleStudent(student)">
            </div>
        </div>

    </div>
    <button type="submit" class="small-button" @click="saveTeam()">Save Team</button>
    <div v-if="hasSavedTeam" class="popup-overlay">
      <div class="success">
         <p>Team Successfully Saved!</p>
         <!-- Add a button or a way to close the overlay -->
         <button @click="hasSavedTeam = false">Close</button>
      </div>
      </div>
    <div v-if="isProcessingTeamSave" class="popup-overlay">
         <img src="/img/loading-gif.gif">
      </div>
      <button type="submit" class="small-button" @click="clearSelection()">Clear Selection</button>
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
   name: 'InstructorTeamEditView',
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
        updatedTeam: {
            id: "",
            name: "",
            sectionId: storeSection.selectedSectionId,
            students: [],

        },
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
         
      }
   },
   methods: {

    clearSelection(){
        this.selectedTeamId = null
        this.updatedTeam.students = []
        this.updatedTeam.id = ""
        this.updatedTeam.name = ""
        this.getStudents()
        this.getTeams()
    },
    getStudents(){
        
        this.isLoading = true
        const auth = localStorage.getItem('auth')
         const config = {
            headers: { 'Authorization': `Bearer ${auth}` }
         };
        
        apiClient.get(`http://localhost:80/api/v1/section/getAllStudents/${storeSection.selectedSectionId}`,
        {  headers: { 'Authorization': `Bearer ${auth}` }}
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
    toggleStudentOnTeam(student, team){
        if(this.selectedTeamId === null){
            alert("Please select a team to remove a student from")
            return
        }
        const index = team.students.indexOf(student);
        team.students.splice(index, 1);

        
        this.students.push(student);
        console.log(student);
        console.log(team);
    },
    openWARAndEval(studentVar){
        console.log(studentVar);
        const name = studentVar.firstName + " "  + studentVar.lastName;

        this.$router.push({name: 'InstructorViewStudent', params: {teamid: studentVar.teamId, studentid: studentVar.id, studentName: name}});
    },
    openTeam(name, id, members){
        storeTeam.setTeamMembers(members)
        localStorage.setItem('storeTeam', JSON.stringify(storeTeam));
        console.log(storeTeam.teamMembers)
        this.$router.push({name: 'InstructorViewTeam', params: {teamid: id, teamname: name, sectionId : storeSection.selectedSectionId}});
    },

    getTeams(){
        this.isLoading = true
        const auth = localStorage.getItem('auth')
         const config = {
            headers: { 'Authorization': `Bearer ${auth}` }
         };
        apiClient.get(`http://localhost:80/api/v1/section/getAllTeams/${storeSection.selectedSectionId}`,
        {  headers: { 'Authorization': `Bearer ${auth}` }}
        )
        .then(response => {
            this.teams = response.data.data
            this.hasLoaded = true

        })
        .catch(error => {
            console.log(error)
        })
    },
    selectTeam(team) {
        if (this.selectedTeamId === team.id) {
        // If the team is already selected, deselect it
            this.selectedTeamId = null;
        } else {
        // Otherwise, select the new team and deselect others
            this.selectedTeamId = team.id;
            this.updatedTeam.id = team.id;
            this.updatedTeam.name = team.name;
            this.updatedTeam.students = team.students;

        }
          
      },

      // Method to add/remove a student from the updatedTeam.students array
      toggleStudent(student) {
          const index = this.updatedTeam.students.indexOf(student);

          console.log(index)
          if (index > -1) {
              // Student is already in the array, remove them
              this.updatedTeam.students.splice(index, 1);
          } else {
            student.weeks = null;
            this.updatedTeam.students.push(student);
          }
      },
   
   saveTeam(){
    
    this.hasSavedTeam = false
    this.isProcessingTeamSave = true
    for(const student of this.updatedTeam.students){
        console.log(student.weeks)
        console.log(student)
        if(student.weeks != null){
            student.weeks = null
        }
    }
   
    apiClient.post(`http://localhost:80/api/v1/team/edit`,
    {
        id: this.updatedTeam.id,
        name: this.updatedTeam.name,
        sectionId: this.updatedTeam.sectionId,
        students: this.updatedTeam.students,
    },
    ).then(response => {
        this.hasSavedTeam = true
        this.isProcessingTeamSave = false
        console.log(response)
        this.getStudents()
        this.getTeams()

        
    }).catch(error => {
        this.isProcessingTeamSave = false
        console.log(error)
    })
   },
   createTeams() {
    if(this.teamName == " " || this.teamName == ""){
        alert("Please enter a team name")
        return
    }
    this.hasCreatedTeams = false
    this.isProcessingTeamCreation = true
    const auth = localStorage.getItem('auth')
    const config = {
            headers: { 'Authorization': `Bearer ${auth}` }
    };

         apiClient.post(`http://localhost:80/api/v1/team/save`, {
            id : null,
            name: this.teamName,
            sectionId: storeSection.selectedSectionId,
            students: null,
         },
         {  headers: { 'Authorization': `Bearer ${auth}` }}
         )
            .then(res => {
               console.log(res)
               console.log(res.data.data)
               this.getTeams()
               this.isProcessingTeamCreation = false
            
               this.hasCreatedTeams = true
               
               
            })
            .catch(err => {
               console.log(err)
            })
      },
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
    this.getStudents()
    this.getTeams()
   },
}

</script>

<style scoped>
.team-name-input {
    margin-left: auto;
    margin-right: auto;
    width: 50%; 
   height: 100px; 
   border-radius: 20px; 
   border: 1px solid #cccccc; 
   margin-bottom: 10px; 
   font-size: 1rem; 
   color: #333; 
   background-color: #fff; 
}


.team-name-input:focus {
   outline: none; 
   border: 1px solid #6f42c1;
   box-shadow: 0 0 0 2px rgba(111, 66, 193, 0.25);
}
.page{
    display: flex;
    flex-direction: row;
    width: 100%;
}
.teams{
    display: flex;
    flex-direction: column;
    flex : 0 0 50%;
}

.team{
    flex : 0 0 10%;
    text-align: center;
    border: 1px solid black;
}
.small-button {
    width: 250px; 
   height: 50px;
   font-size: 1rem; 
   margin: 1px; 
   border-radius: 4px; 
}

.students{
    display: flex;
    flex-direction: column;
    flex : 0 0 50%;
}
.student{
    display: flex;
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
    justify-content: space-between;

}

.centered-text {
   text-align: center;
   font-size: 1.3rem;
   margin: 20px;
}

</style>