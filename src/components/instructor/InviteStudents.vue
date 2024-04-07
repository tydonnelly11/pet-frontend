<template>
    <!-- <SectionDropdown/> -->
    <div class="invite-students-container">
        <div class="invite-students-header">
            <h1>Invite Students to {{ storeSection.selectedSectionName }}</h1>
            <h2>Enter students' emails seperated by semi-colons</h2>
        </div>
        <div class="form">
            <div class="input-field">
                <label for="email">Email:</label>
                <input class="team-name-input" type="email" id="email" v-model="this.emails" required />
            </div>
            <button class="small-button" type="submit" @click="inviteStudent">Add Student</button>
        </div>
        
        <div class="list-of-students">
            <h2>List of Students</h2>
            <div class="student" v-for="student in listOfStudents">
                <p>Email: {{ student.email }}</p>
            </div>
        </div>
        <button class="small-button" style="max-width: 250px;" type="submit" @click="submitStudents">Invite Students</button>
        <div v-if="isLoading" class="popup-overlay">
            <img src="/img/loading-gif.gif">
        </div>
        <div v-if="hasSubmittedStudents" class="popup-overlay">
            <div class="success">
            <p>Students Succesfully Invited!</p>
            <button class="small-button" @click="hasSubmittedStudents = false">Close</button>
        </div>

        </div>
    </div>

</template>

<script>
import apiClient from  '@/axios-setup.js'
import { storeUser } from '@/stores/store.js'
import { storeSection } from '../../stores/storeSection'
import SectionDropdown from '@/components/instructor/SectionDropdown.vue'


export default {
   name: 'InstructorInviteStudents',
   components: { SectionDropdown },
   data() {
      return {
            emails: "",

            firstName: "",
            lastName: "",
            email: "",
            listOfStudents: [],
            storeUser,storeSection,
            isLoading: false,
            hasSubmittedStudents: false,
            listOfEmails: [],
            
      }
   },
   methods: {
        inviteStudent() {
            this.listOfEmails = this.emails.split(';');
            for(const item of this.listOfEmails){
                if(item.trimStart() === ""){
                    continue
                }
                
                this.listOfStudents.push({
                firstName: "",
                middleName: "",
                lastName: "",
                email: item.trimStart(),
                sectionId : storeSection.selectedSectionId,
                password: null,
                roles : "user"
             })
            }
            this.emails = ""
        },
        submitStudents() {
            this.isLoading = true
            const auth = localStorage.getItem('auth')
            

            apiClient.post(`https://www.peerevaltool.xyz/api/v1/auth/register/student/inviteStudents`, 
                
                    this.listOfStudents
            ,{
                headers: { 'Authorization': `Bearer ${auth}` }
            }
            ).then(response => {
                console.log(response)
                this.isLoading = false
                this.hasSubmittedStudents = true
            }).catch(error => {
                console.log(error)
                this.isLoading = false
                this.hasError = true
            })
            this.listOfStudents = [];
            
        },
     },
     watch: {
        'storeSection.selectedSectionId': function(newVal, oldVal) {
         
    }
     }
   }


</script>

<style scoped>
.invite-students-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 50px;
    height: 80%;
}
.invite-students-header {
    
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}

.input-field {
    
}

.list-of-students {
    display: flex;
    flex-direction: column;
    width: 100%;
    
}

.student{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

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
.team-name-input:focus {
   outline: none; 
   border: 1px solid #6f42c1;
   box-shadow: 0 0 0 2px rgba(111, 66, 193, 0.25);
}

</style>