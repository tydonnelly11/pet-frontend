<template>
    <div class="section-info">
    <h1>Information For {{ storeSection.selectedSectionName }}</h1>
    <h3 v-if="isActiveSection">Active Section</h3>
    <h3 v-else>Inactive Section</h3>
    </div>
    <div class="section-btn">
        <button class="small-button" @click="inviteStudentPressed = true">Invite Students</button>
        <button class="small-button" @click="inviteInstructorPressed = true">Invite Instructors</button>
        <button class="small-button" @click="editSection = true">Edit Section</button>
        <button class="small-button" @click="selectInviteTeam = true">Invite Teams</button>
        <button class="small-button" @click="setCurrentSection">Click to set Section as Active</button>


    </div>
    

    <div v-if="editSection" style="margin-bottom: 20px;">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
            <label style="color:#4E2A84;">
                <h5>
                    Enter New Section Name
                </h5>
            </label>
            <input class="team-name-input" v-model="newSectionName" type="text" />
            <label></label>
        </div>
        
        <button class="small-button" 
        style ="max-width: 200px;" 
        @click="editSectionInfo()">
            Update Section
        </button>
        <button class="small-button" 
        style ="max-width: 200px;" 
        @click="editSection = false">
                Cancel
        </button>
    </div>

    
    <div class="popup-overlay" v-if="inviteStudentPressed">
        <InstructorInviteStudents />
        <button class="small-button" 
        style="max-width: 250px; margin-right: 10px;" 
        @click="inviteStudentPressed = false">Done</button>
    </div>
    <div class="popup-overlay" v-if="inviteInstructorPressed">
        <InviteAssitInstructor />
        <button class="small-button" 
        style="max-width: 250px; margin-right: 10px;"
        @click="inviteInstructorPressed = false">Done</button>
    </div>
<div v-if="selectInviteTeam" class="popup-overlay">
    <h2> Add Teams To {{ storeSection.selectedSectionName }}</h2>
    <div>
      <!-- Add Teams for Section: {{sectionName}} -->
      <div class="input-field">
         <label>
            <h5 :style="'color: white;'">
                Team Name
            </h5>
         </label>
         <input type="text" id="sectionName" 
         v-model="this.teamName" 
         required class="team-name-input"/>
      </div>
      <button type="submit" class="small-button" style="max-width: 250px; margin-bottom: 20px;" @click="createTeams()">Create Team</button>
      <button type="submit" class="small-button" style="max-width: 250px; margin-bottom: 20px;" @click="selectInviteTeam = false">Cancel</button>

      </div>
</div>
   <div v-if="hasCreatedTeams" class="popup-overlay">
      <div class="success">
         <p>Team Successfully Created!</p>
         <!-- Add a button or a way to close the overlay -->
         <button @click="hasCreatedTeams = false; selectInviteTeam = false;">Close</button>
      </div>
      </div>
    <div v-if="teamCreationFailed" class="popup-overlay">
        <div class="success">
            <p>Team creation failed either because a team with this name already exists or a server error occured.</p>
            <button @click="teamCreationFailed = false">Close</button>
        </div>
    </div>
    <div v-if="isProcessingTeamCreation" class="popup-overlay">
         <img src="/img/loading-gif.gif">
      </div>
    


   <div v-if="(students.length > 0)" class="centered-text">
  To add students to a team, please select a team, then select all the students you wish to add to that team and click the save button.
    </div>

    <!--<h3>To add students to a team, please select a team, 
            then select all the students you wish to add to that team 
            and click the save button.
        </h3>
    -->
    <div v-if="hasLoaded" class="page">
  <!-- Teams Section -->
  <div class="teams">
    <div class="teams-container">
      <h2 class="teams-header">Teams</h2>
      <div class="team-card" v-for="team in teams" :key="team.id">
        <div class="team-name-checkbox">   
            <div>
                <button class="view-team-btn" @click="openTeam(team.name, team.id, team.students)">
                   <h3> {{ team.name }} </h3>
                </button>
            </div>
            <input type="checkbox"
            class="team-checkbox"
            :value="team.id" 
            :checked="team.id === selectedTeamId" 
            @change="selectTeam(team)"
            >
        </div>
        <!-- <button class="view-team-btn" v-if="team.students.length > 0" 
            @click="openTeam(team.name, team.id, team.students)">
            View Team
        </button> -->
        <div v-if="team.students.length  == 0">
            No students assigned 
        </div>

        <div :style="'width : 100%;'" class='student-in-team-container' v-for="student in team.students" :key="student.id">
          <!-- <div style="margin-top: 20px;">
          </div> -->
          <button class="view-team-btn" 
          v-if="student.teamId" 
          @click="openWARAndEval(student, team)">{{ student.firstName }} {{ student.lastName }}</button>
          <p class='view-team-btn' v-else>{{ student.firstName }} {{ student.lastName }}</p>
          <button class="remove-btn"
          :style="'width: 50px;'"
          @click="removeStudentOnTeam(student, team)">X</button>
        </div>
        <div style="margin-top: 20px;">
            <h2>Assistant Instructor</h2>
            <div v-if="team.assistantInstructorDTO == null">
                No Assistant Instructor assigned
            </div>
            <div v-else>    
                <div>
                    <h3>
                        {{ team.assistantInstructorDTO.firstName }} {{ team.assistantInstructorDTO.lastName }}
                    </h3>
                </div>
                <button class="remove-btn" 
                @click="removeInstructorFromTeam(team, team.assistantInstructorDTO)">
                    Remove Instructor
                </button>
            </div>
        </div>
        
      </div>
    </div>
  <!-- Students Section -->
        <div v-if="students.length > 0" class="students-container">
            <h2 class="teams-header">Students</h2>
            <div class="student-entry" v-for="student in students" :key="student.id">
                <div class="student-name-checkbox">
                    <input style="margin-bottom: 5px;" 
                    type="checkbox" 
                    class="team-checkbox" 
                    :value="student.id" 
                    @change="toggleStudent(student)">
                    <label class="student-name">
                        <h4>{{ student.firstName }} {{ student.lastName }}</h4>
                    </label>
                    <button class="remove-btn" 
                    @click="this.studentIDToDelete = student.id; 
                    this.hasSelectedDeleteStudent = true;">Delete Student</button>
                </div>
            </div>
        </div>
    </div>
</div>

    <div v-if="hasSelectedDeleteStudent" class="popup-overlay">
      <div class="success">
            <p :style="'color: black;'">Are you sure you want to delete this student?</p>
         <button @click="hasSelectedDeleteStudent = false">Cancel</button>
         <button @click="deleteStudent(this.studentIDToDelete); hasSelectedDeleteStudent = false; hasDeletedStudent = true; ">Delete</button>
      </div>
    </div>    

    <div v-if="hasDeletedStudent" class="popup-overlay">
        <div class="success">
            <p>Student Succesfully Deleted!</p>
            <button @click="hasDeletedStudent = false; this.resetInfo()">Close</button>
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


    <button type="submit" class="small-button" style="max-width: 400px; margin-top: 20px;" @click="saveAllTeams()" >Save All Teams</button>
    <div v-if="hasSavedTeam" class="popup-overlay">
      <div class="success">
         <p>Teams successfully saved!</p>
         <button @click="hasSavedTeam = false">Close</button>
      </div>
    </div>
    <div v-if="isProcessingTeamSave" class="popup-overlay">
         <img src="/img/loading-gif.gif">
      </div>
      <button type="submit" class="small-button" style="max-width: 400px; margin-top: 20px;" @click="clearSelection()">Clear Selection</button>

      <div style="margin-top: 20px;">
        <h3>Assistant Instructors</h3>
        <div v-for="instructor in activeInstructors">
            <label style="margin-bottom: 20px; margin-top: 20px;">
                <h4>
                    {{ instructor.firstName }} {{ instructor.lastName }}
                </h4>
            </label>
            <div v-for="team in teams">
                <button class="small-button" 
                style="max-width: 400px;" 
                v-if="(team.assistantInstructorDTO == null || instructor.id != team.assistantInstructorDTO.id) && team.name != null" 
                @click="showConfirmationPopup(team, instructor)">Assign instructor to {{ team.name }}</button>
                
            </div>
            
            <!-- <button v-if="instructor.id != team.assistantInstructorDTO.id" @click="addInstructorToTeam(team, instructor)">{{ team.name }}</button> -->
            <button class="small-button" 
            style="max-width: 400px; margin-right: 10px;" 
            @click="addInstructorToSection(instructor)">Assign to {{this.selectedSectionInfo.name}}</button>
        </div>
    </div>
    <div v-if="teamConformation" class="popup-overlay">
        <div class="conformation-popup">
        <p>Do you want to add {{ this.currentInstructor.firstName }} {{ this.currentInstructor.lastName }} to {{ this.currentTeam.name }}?</p>
        <div class="button-group">
            <button :style="'border: 1px solid black;'" 
            @click="confirmAddInstructor">Yes</button>
            <button :style="'border: 1px solid black;'" 
            @click="cancelAddInstructor">No</button>
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

    deleteStudent(id){
            this.hasDeletedStudent = true;
            apiClient.post(`${this.$baseURL}/api/v1/section/deleteStudent`, {
                id: id
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        
        },
    editSectionInfo(){
        if(this.newSectionName == "" || this.newSectionName == " "){
            alert("Please enter a section name")
            return
        }
        this.isLoading = true;
        
        apiClient.post(`${this.$baseURL}/api/v1/section/save`, {
            id: storeSection.selectedSectionId,
            name: this.newSectionName,
            instructorId: storeUser.userID,

        })
        .then(response => {
            storeSection.selectedSectionName = this.newSectionName;
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


        var newTeam = JSON.parse(JSON.stringify([team]));
        newTeam = newTeam.map(team => ({ ...team, students: [] }));

        apiClient.post(`${this.$baseURL}/api/v1/team/assignInstructors`, newTeam
        ).then(response => {
            console.log(response)
            this.getTeams()
        }).catch(error => {
            console.log(error)
        })
        this.getTeams()

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


        apiClient.post(`${this.$baseURL}/api/v1/section/editInstructors`, 
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
        
        var newTeam = JSON.parse(JSON.stringify(team));
        newTeam.students = []
        apiClient.post(`${this.$baseURL}/api/v1/team/removeInstructor`, newTeam
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
         apiClient.post(`${this.$baseURL}/api/v1/section/setCurrentSection`, {
            id : storeSection.selectedSectionId
         })
         .then(res => {
            console.log(res)
            this.isLoading = false;
            this.hasSetActiveSection = true;
            this.isActiveSection = true;
            storeSection.activeSection = storeSection.selectedSection
            localStorage.setItem('storeSection', JSON.stringify(storeSection))

         });
      },
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


    removeStudentOnTeam(student, team){
        //This line finds the team in this.teams then removes the student from it
        this.teams.find(item => item.id === team.id).students = this.teams.find(item => item.id === team.id).students.filter(stu => student.id !== stu.id)

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
        
    },
    selectTeam(teamProp) {
        if (this.selectedTeamId === teamProp.id) {
            this.selectedTeamId = null;
        } else {
        // Otherwise, select the new team and deselect others
            this.selectedTeamId = teamProp.id;
            if(this.selectedStudent.length === 0){
                this.selectedTeamId = teamProp.id
                this.selectedStudent = [];

            }
            else{
                for(const student of this.selectedStudent){
                    teamProp.students.push(student)
                    this.students = this.students.filter(stu => student.id !== stu.id)
                }
                this.selectedStudent = [];
            }
            // this.updatedTeam.id = team.id;
            // this.updatedTeam.name = team.name;
            // this.updatedTeam.students = team.students;
        }
        
        // var team  = this.teams.find(item => item.id === this.selectedTeamId)
       
        // }
          
      },

      // Method to add/remove a student from the updatedTeam.students array
      toggleStudent(student) {
      if(this.selectedTeamId === null){
        if(!(this.selectedStudent.includes(student))){
            this.selectedStudent.push(student)
        }
       
          
      }
      else{
        this.teams.find(team => team.id === this.selectedTeamId).students.push(student)
        this.students = this.students.filter(stu => student.id !== stu.id)
      }
         
      },
   
   saveAllTeams(){
    
    this.hasSavedTeam = false
    this.isProcessingTeamSave = true
    for(const team of this.teams){
        console.log(team);
        for(const student of team.students){
        
        if(student.weeks != null){
            student.weeks = null
        }

    }
    apiClient.post(`${this.$baseURL}/api/v1/team/edit`,
    {
        id: team.id,
        name: team.name,
        sectionId: team.sectionId,
        students: team.students,
    },
    ).then(response => {
        
        console.log(response)
        this.getStudents();
        this.getTeams();
        

        
    }).catch(error => {
        // this.isProcessingTeamSave = false
        console.log(error)
    })
    this.hasSavedTeam = true
    this.isProcessingTeamSave = false
    


    }
    

    
    
   
    // apiClient.post(`${this.$baseURL}/api/v1/team/edit`,
    // {
    //     id: this.updatedTeam.id,
    //     name: this.updatedTeam.name,
    //     sectionId: this.updatedTeam.sectionId,
    //     students: this.updatedTeam.students,
    // },
    // ).then(response => {
    //     this.hasSavedTeam = true
    //     this.isProcessingTeamSave = false
    //     console.log(response)
    //     this.getStudents()
    //     this.getTeams()

        
    // }).catch(error => {
    //     this.isProcessingTeamSave = false
    //     console.log(error)
    // })
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

         apiClient.post(`${this.$baseURL}/api/v1/team/save`, {
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
               this.teamName = ''
               this.hasCreatedTeams = true
            })
            .catch(err => {
               this.isProcessingTeamCreation = false;
               this.teamCreationFailed = true;
               this.hasCreatedTeams = false;
               console.log(err)
            })
      },
      resetInfo(){
        this.getStudents()
        this.getTeams()
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
    if(storeSection.activeSection.id == storeSection.selectedSectionId){
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
.small-button:not(:first-child) {
   margin-left: 10px;
}
.team-name-input {
    width: 100%;
    max-width: 700px; /* Maximum width of the element */
    height: 40px;
    border-radius: 8px;
    border: none;
    margin-bottom: 5px;
    font-size: 1.2rem;
    padding: 10px 20px; /* Padding for top/bottom and left/right */
    color: #333;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-left: auto; /* Centers the element along the horizontal axis */
    margin-right: auto; /* Centers the element along the horizontal axis */
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

.conformation-popup{
    display: flex;
    flex-direction: column;
    z-index: 1000;
    color: white;
    background-color: #4E2A84; /* Adjusted to TCU purple */
    padding: 30px; /* Adjust padding for better spacing */
    border-radius: 8px; /* Add rounded corners */
    align-items: center; /* Center the items horizontally */
}


.team-name-input:focus {
   outline: none; 
   border: 1px solid #6f42c1;
   box-shadow: 0 0 0 2px rgba(111, 66, 193, 0.25);
}

.page {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; /* Wrap items on smaller screens */
}

.teams, .students {
    width: 100%; /* Take full width of the container */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Create a responsive grid */
    gap: 10px; /* Space between tiles */
}

.team, .student {
    text-align: center;
    border: none;
    border-radius: 4px; /* Rounded corners for tiles */
    padding: 15px; /* Padding inside tiles */
    background-color: #4E2A84; /* TCU purple background */
    color: white; /* White text */
    cursor: pointer; /* Indicate clickable */
    transition: transform 0.3s, box-shadow 0.3s; /* Smooth transitions for interactions */
}

.team:hover, .student:hover {
    transform: translateY(-3px); /* Slight lift effect on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow effect for depth */
}

.small-button {
    padding: 10px 15px; /* Ample padding for tap targets */
    font-size: 1rem; 
    border-radius: 20px;
    background-color: #5C4B93; /* A slightly different purple shade for contrast */
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;
}

.small-button:hover {
    background-color: #6f42c1; /* Lighter purple on hover for interaction feedback */
}

.centered-text {
   text-align: center;
   font-size: 1.5rem; /* Larger font size for readability */
   margin-bottom: 30px; /* More space below the heading */
}
.teams-header {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px; /* Adjust as needed */
  color: #4E2A84; /* TCU purple or any other color that fits the theme */
}

/* Style for the overall Teams container */
.teams-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Style for the team cards */
.team-card {
  background-color: #4E2A84; /* TCU purple */
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 80%; /* Adjust the width as per your layout */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
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

.remove-btn {
  background-color: #FF4136; /* Bright red for remove buttons */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  margin-top: 5px;
  cursor: pointer;
  max-width: 200px;
  margin-left: 5px;
  margin-right: 8px;
}

/* Hover effects for buttons */
.view-team-btn:hover,
.remove-btn:hover {
  opacity: 0.9;
}

/* Media query for responsive design */
@media (max-width: 768px) {
  .team-card {
    width: 90%; /* Full width on smaller screens */
  }
}
.students-container {
  /* Use a percentage width for fluid responsiveness and max-width to cap the size */
  width: 90%;
  max-width: 700px; /* You can adjust this to what you feel is best for content */
  margin: auto; /* This centers the container */
  
  /* Rest of the styles */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  
  background-color: #EDEDED;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



.students-header {
  text-align: center;
  color: #4E2A84; /* TCU purple */
  font-size: 2rem; /* Large, readable text */
  margin-bottom: 20px; /* Space below the header */
}

.student-entry {
  display: flex;
  align-items: center; /* Vertical alignment */
  justify-content: space-between; /* Space between name and checkbox */
  padding: 10px 0; /* Padding for each entry */
  width: 100%;
  border-bottom: 1px solid #EEE; /* Separator between entries */
}

.student-name {
  margin-right: 5px; /* Space between name and checkbox */
}

.student-checkbox {
  cursor: pointer;
  /* Add custom styles or use a library like 'pretty-checkbox' for better styling */
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .students-container {
    width: 95%; /* More width on small screens */
    margin: 10px; /* Less margin on small screens */
    padding: 10px; /* Less padding on small screens */
  }
}

.team-checkbox{
width: 50px; /* New width */
  height: 20px; /* New height */
}

.team-name-checkbox {
  display: flex; /* This will place child elements in a row */
  align-items: center; /* This will vertically center the items in the container */
  justify-content: center;
}

.student-name-checkbox {
  display: flex; /* This will place child elements in a row */
  align-items: flex-start; /* This will vertically center the items in the container */
  justify-content: center;
  width: 100%;
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
.section-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-bottom: 20px;
}
.section-btn > *:not(:last-child) {
    margin-right: 10px;
}

.popup-overlay{
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding-left: 20%;
    padding-right: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.90);
    z-index: 1000;
    flex-direction: column;
}
</style>