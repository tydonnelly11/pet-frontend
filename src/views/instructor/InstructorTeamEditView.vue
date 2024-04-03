<template>
    <h1>Information For:  {{ storeSection.selectedSectionName }}</h1>
    <div :style="'display: flex; justify-content: center; flex-direction: row; margin-bottom: 20px;'">
        <button class="small-button" @click="inviteStudentPressed = true">Invite Students</button>
        <button class="small-button" @click="inviteInstructorPressed = true" style="margin-left: 10px;">Invite Instructors</button>
        <button @click="editSection = true">Edit Section</button>
        <button @click="setCurrentSection">Click to set Section as Active</button>

    </div>
    

    <div v-if="editSection">
        <label>Enter New Name</label>
        <input v-model="newSectionName" type="text" />

        <label></label>

        <button @click="editSectionInfo()">Update Section</button>
        <button @click="editSection = false">Cancel</button>
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
                <div v-if="team.assistantInstructorDTO == null">
                    No Assistant Instructor assigned
                </div>
                <div v-else>
                    <label>{{ team.assistantInstructorDTO.firstName }} {{ team.assistantInstructorDTO.lastName }}</label>
                    <p @click="removeInstructorFromTeam(team, team.assistantInstructorDTO)">Remove Instructor</p>
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

    

    <div v-if="hasSetActiveSection" class="popup-overlay">
      <div class="success">
         <p>Section Set as Active!</p>
         <button @click="hasSetActiveSection = false">Close</button>
      </div>
      </div>
    
      <div v-if="hasUpdatedSection" class="popup-overlay">
      <div class="success">
         <p>Section Updated</p>
         <button @click="hasUpdatedSection = false">Close</button>
      </div>
      </div>


    <button type="submit" class="small-button" @click="saveTeam()">Save Team</button>
    <div v-if="hasSavedTeam" class="popup-overlay">
      <div class="success">
         <p>Team Successfully Saved!</p>
         <button @click="hasSavedTeam = false">Close</button>
      </div>
    </div>
    <div v-if="isProcessingTeamSave" class="popup-overlay">
         <img src="/img/loading-gif.gif">
      </div>
      <button type="submit" class="small-button" @click="clearSelection()">Clear Selection</button>

      <div>
        <h3>Assistant Instructors</h3>
        <div v-for="instructor in activeInstructors">
            <label>{{ instructor.firstName }} {{ instructor.lastName }}</label>
            <div v-for="team in teams">
                <button v-if="(team.assistantInstructorDTO == null || instructor.id != team.assistantInstructorDTO.id) && team.name != null" @click="showConfirmationPopup(team, instructor)">{{ team.name }}</button>
                
            </div>
            
            <!-- <button v-if="instructor.id != team.assistantInstructorDTO.id" @click="addInstructorToTeam(team, instructor)">{{ team.name }}</button> -->
            <button @click="addInstructorToSection(instructor)">Assign to {{this.selectedSectionInfo.name}}</button>
        </div>


    </div>
    <div v-if="teamConformation" class="popup-overlay">
        <div class="conformation-popup">
        <p>Do you want to add {{ this.currentInstructor.firstName }} {{ this.currentInstructor.lastName }} to {{ this.currentTeam.name }}?</p>
        <div class="button-group">
            <button :style="'border: 1px solid black;'" @click="confirmAddInstructor">Yes</button>
            <button :style="'border: 1px solid black;'" @click="cancelAddInstructor">No</button>
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
    showConfirmationPopup(team, instructor) {
        // Assuming you have data properties for the current selection and visibility of the confirmation
        this.currentTeam = team;
        this.currentInstructor = instructor;
        this.teamConformation = true; // Show the confirmation popup
    },
    confirmAddInstructor() {
        if (this.currentTeam && this.currentInstructor) {
            this.addInstructorToTeam(this.currentTeam, this.currentInstructor);
        }
        this.teamConformation = false; // Hide the popup after confirmation
    },
    cancelAddInstructor() {
        // Logic if the user cancels the action
        this.teamConformation = false; // Hide the popup
    },
    editSectionInfo(){
        if(this.newSectionName == "" || this.newSectionName == " "){
            alert("Please enter a section name")
            return
        }
        this.isLoading = true;
        apiClient.post(`http://localhost:80/api/v1/section/save`, {
            id: storeSection.selectedSectionId,
            name: this.newSectionName,
            instructorId: storeUser.userID,

        })
        .then(response => {
            console.log(response)
            this.isLoading = false;
            this.hasUpdatedSection = true;

        });
    },

    
    addInstructorToTeam(team, instructor){
        const dto = {
            id : instructor.id
        }
        team.assistantInstructorDTO = dto
        var newTeam = [team]

        apiClient.post(`http://localhost:80/api/v1/team/assignInstructors`, newTeam
        ).then(response => {
            console.log(response)
            this.getTeams()
        }).catch(error => {
            console.log(error)
        })
        // this.getTeams()

    },

    addInstructorToSection(instructorVar){
        if(this.selectedSectionInfo.assistantInstructorDTOs == null){
            this.selectedSectionInfo.assistantInstructorDTOs = []
        }
        else{
            for(var instructor of this.selectedSectionInfo.assistantInstructorDTOs){
            if(instructor.id == instructorVar.id){
                alert("Instructor already assigned to section")
                return
            }
        }
        }
        
        
        this.selectedSectionInfo.assistantInstructorDTOs.push(instructorVar)


        apiClient.post(`http://localhost:80/api/v1/section/editInstructors`, 
            this.selectedSectionInfo
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        
    },

    removeInstructorFromTeam(team, instructor){
        const dto = {
            id : instructor.id
        }
        team.assistantInstructorDTO = dto
        

        apiClient.post(`http://localhost:80/api/v1/team/removeInstructor`, team
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        team.assistantInstructorDTO = null;

    },

    setCurrentSection(){
        this.isLoading = true;
        this.hasSetActiveSection = false;
         apiClient.post(`http://localhost:80/api/v1/section/setCurrentSection`, {
            id : storeSection.selectedSectionId
         })
         .then(res => {
            console.log(res)
            this.isLoading = false;
            this.hasSetActiveSection = true;
            localStorage.setItem('storeSection', JSON.stringify(storeSection))

         });
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
    
    getActiveAssistantInstructors(){
        this.activeInstructors = []
            this.isLoading = true
            apiClient.get(`http://localhost:80/api/v1/assistantInstructor/getAllInstructors`, {

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


    toggleStudentOnTeam(student, team){
        if(this.selectedTeamId === null){
            alert("Please select a team to remove a student from")
            return
        }
        const index = team.students.indexOf(student);
        team.students.splice(index, 1);

        
        this.students.push(student);
        
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
    this.getActiveAssistantInstructors()
   },
}

</script>

<style scoped>
.team-name-input {
    margin-left: auto;
    margin-right: auto;
    width: 50%; 
   height: 20px; 
   border-radius: 20px; 
   border: 1px solid #cccccc; 
   margin-bottom: 10px; 
   font-size: 1rem; 
   color: #333; 
   background-color: #fff; 
}

.conformation-popup{
    
    display: flex;
    flex-direction: column;
    z-index: 1000;
    color: white;
    background-color: #743ae1;
    padding: 50px;
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
.button-group {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between;
    width: 100%; */
}
.small-button {
   width: 250px; 
   height: 50px;
   font-size: 1rem; 
   margin: 1px; 
   border-radius: 4px;
   margin: 0 10px; /* Adjust the margin as needed */
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