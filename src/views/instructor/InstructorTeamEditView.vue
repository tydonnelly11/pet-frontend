<template>
    <h2> Add teams to section</h2>
    <div>
      <!-- Add Teams for Section: {{sectionName}} -->
      <div class="input-field">
         <label>Team Name</label>
         <input type="text" id="sectionName" v-model="this.teamName" required />
      </div>

      

   <button type="submit" @click="createTeams()">Create Team</button>
   <div class="success" v-if="hasCreatedTeams">
      <p>Teams Succesfully Created!</p>
    </div>
    <div class="loading" v-if="isProcessingTeamCreation">
        Process being requested... DO NOT REFRESH
    </div>

   </div>

    <h3>To add students to a team, please select a team, 
            then select all the students you wish to add to that team 
            and click the save button.
        </h3>
    <div v-if="hasLoaded" class="page">
        <!-- Teams Section -->
        
        <div class="teams">
            <h2>Teams</h2>
            <div class="team" v-for="team in teams" :key="team.id">
                {{ team.name }}
                <input type="radio" :value="team.id" v-model="updatedTeam.id" @change="selectTeam(team)">
                <div class="team-students">
                    <div class="student" v-for="student in team.students" :key="student.id">
                        {{ student.firstName }} {{ student.lastName }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Students Section -->
        <div class="students">
            <h2>Students</h2>
            <div class="student" v-for="student in students" :key="student.id">
                <label>{{ student.firstName }} {{ student.lastName }}</label>
                <input type="checkbox" :value="student.id" @change="toggleStudent(student)">
            </div>
        </div>

    </div>
    <button type="submit" @click="saveTeam()">Save Team</button>
    <div class="success" v-if="hasSavedTeam">
      <p>Teams Succesfully Saved!</p>
    </div>
    <div class="loading" v-if="isProcessingTeamSave">
        Process being requested... DO NOT REFRESH
    </div>
    <button type="submit" @click="clearSelection()">Clear Selection</button>
</template>

<script>
import axios from 'axios'
import { storeUser } from '@/stores/store.js'
import { storeSection } from '../../stores/storeSection'

export default {
   name: 'InstructorTeamEditView',
   components: {
    

   },
   data() {
      return {
        students: [],
        teams: [],
        updatedTeam: {
            id: "",
            name: "",
            sectionId: storeUser.sectionId,
            students: [],

        },
        storeSection,
        isLoading: false,
        isSuccess: false,
        isProcessingTeamCreation: false,
        isProcessingTeamSave: false,
        hasCreatedTeams: false,
        hasSavedTeam: false,
        hasLoaded: false,
        teamName: "",
         
      }
   },
   methods: {
    getStudents(){
        this.isLoading = true
        const auth = localStorage.getItem('auth')
         const config = {
            headers: { 'Authorization': `Basic ${auth}` }
         };
        axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/section/getAllStudents/${storeSection.selectedSectionId}`,
        {  headers: { 'Authorization': `Basic ${auth}` }}
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
    getTeams(){
        this.isLoading = true
        const auth = localStorage.getItem('auth')
         const config = {
            headers: { 'Authorization': `Basic ${auth}` }
         };
        axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/section/getAllTeams/${storeSection.selectedSectionId}`,
        {  headers: { 'Authorization': `Basic ${auth}` }}
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
          this.updatedTeam.id = team.id;
          this.updatedTeam.name = team.name;
          // Clear the students array when a new team is selected
          this.updatedTeam.students = team.students;
      },

      // Method to add/remove a student from the updatedTeam.students array
      toggleStudent(student) {
          const index = this.updatedTeam.students.indexOf(student);

          console.log(index)
          if (index > -1) {
              // Student is already in the array, remove them
              this.updatedTeam.students.splice(index, 1);
          } else {
              // Add the student to the array
              this.updatedTeam.students.push(student);
          }
      },
   
   saveTeam(){
    this.hasSavedTeam = false
    this.isProcessingTeamSave = true
    const auth = localStorage.getItem('auth')
         const config = {
            headers: { 'Authorization': `Basic ${auth}` }
         };
    axios.post(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/team/edit`,
    {
        id: this.updatedTeam.id,
        name: this.updatedTeam.name,
        sectionId: this.updatedTeam.sectionId,
        students: this.updatedTeam.students,
    },
    {  headers: { 'Authorization': `Basic ${auth}` }}
    ).then(response => {
        this.hasSavedTeam = true
        this.isProcessingTeamSave = false
        console.log(response)
        this.getStudents()

        
    }).catch(error => {
        this.isProcessingTeamSave = false
        console.log(error)
    })
   },
   createTeams() {
    this.hasCreatedTeams = false
    this.isProcessingTeamCreation = true
    const auth = localStorage.getItem('auth')
    const config = {
            headers: { 'Authorization': `Basic ${auth}` }
    };

         axios.post(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/team/save`, {
            id : null,
            name: this.teamName,
            sectionId: storeSection.selectedSectionId,
            students: null,
         },
         {  headers: { 'Authorization': `Basic ${auth}` }}
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
   computed: {},
   created() {
    this.getStudents()
    this.getTeams()
   },
}

</script>

<style scoped>
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
    height: 150px;
    text-align: center;
    border: 1px solid black;
}

.students{
    display: flex;
    flex-direction: column;
    flex : 0 0 50%;
}

</style>