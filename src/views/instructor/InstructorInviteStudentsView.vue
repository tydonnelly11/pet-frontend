<template>
    <div class="invite-students-container">
        <div class="invite-students-header">
            <h1>Invite Students</h1>
            <h2>Enter the Students First Name, Last Name and Email</h2>
        </div>
        <div class="form">
            <div class="input-field">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="this.emails" required />
            </div>
            <button type="submit" @click="inviteStudent">Add Student</button>
        </div>
        
        <div class="list-of-students">
            <h2>List of Students</h2>
            <div class="student" v-for="student in listOfStudents">
                <p>Email: {{ student.email }}</p>
            </div>
        </div>
        <button type="submit" @click="submitStudents">Invite Students</button>
        <div class="loading">
            <p v-if="isLoading">Request being processed...</p>
        </div>
        <div class="success">
            <p v-if="hasSubmittedStudents">Students Succesfully Invited!</p>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import { storeUser } from '@/stores/store.js'

export default {
   name: 'InstructorInviteStudentsView',
   components: {},
   data() {
      return {
            emails: "",
            firstName: "",
            lastName: "",
            email: "",
            listOfStudents: [],
            storeUser,
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
                sectionId : storeUser.sectionId,
                password: null,
                roles : "user"
             })
            }
             
             console.log(this.listOfStudents)
        },
        submitStudents() {
            this.isLoading = true
            const auth = localStorage.getItem('auth')
            

            axios.post(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/auth/register/student/inviteStudents`, 
                
                    this.listOfStudents
            ,{
                headers: { 'Authorization': `Basic ${auth}` }
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