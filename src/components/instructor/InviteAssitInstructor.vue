<template>
    <div class="invite-students-container">
        <div class="invite-students-header">
            <h1>Invite Instructors to {{ storeSection.selectedSectionName }}</h1>
            <h2>Enter the Instructors Email</h2>
        </div>
        <div class="form">
            <div class="input-field">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="this.emails" required />
            </div>
            <button type="submit" @click="inviteInstructor">Add Instructor</button>
        </div>
        
        <div class="list-of-students">
            <h2>List of Instructors</h2>
            <div class="student" v-for="student in listOfStudents">
                <p>Email: {{ student.email }}</p>
            </div>
        </div>
        <button type="submit" @click="submitInstructor">Invite Instructors</button>
        <div v-if="isLoading" class="popup-overlay">
            <img src="/img/loading-gif.gif">
        </div>
        <div v-if="hasSubmittedStudents" class="popup-overlay">
            <div class="success">
            <p>Instructor Succesfully Invited!</p>
            <button @click="hasSubmittedStudents = false">Close</button>
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
        inviteInstructor() {
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
             
        },
        submitInstructor() {
            this.isLoading = true
            const auth = localStorage.getItem('auth')
            

            apiClient.post(`https://www.peerevaltool.xyz/api/v1/auth/register/assistantInstructor/inviteInstructors`, 
                
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

</style>