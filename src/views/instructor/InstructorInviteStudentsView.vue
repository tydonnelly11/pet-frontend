<template>
    <div class="invite-students-container">
        <div class="invite-students-header">
            <h1>Invite Students</h1>
            <h2>Enter the Students First Name, Last Name and Email</h2>
        </div>
        <div class="form">
            <div class="input-field">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="firstName" required />
            </div>
            <div class="input-field">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="lastName" required />
            </div>
            <div class="input-field">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <button type="submit" @click="inviteStudent">Add Student</button>
        </div>
        
        <div class="list-of-students">
            <h2>List of Students</h2>
            <div class="student" v-for="student in listOfStudents">
                <p>First Name: {{ student.firstName }}</p>
                <p>Last Name: {{ student.lastName }}</p>
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
            firstName: "",
            lastName: "",
            email: "",
            listOfStudents: [],
            storeUser,
            isLoading: false,
            hasSubmittedStudents: false,
      }
   },
   methods: {
        inviteStudent() {
             this.listOfStudents.push({
                firstName: this.firstName,
                middleName: "",
                lastName: this.lastName,
                email: this.email,
                sectionId : storeUser.sectionId,
                password: null,
                roles : "user"
             })
             console.log(this.listOfStudents)
        },
        submitStudents() {
            this.isLoading = true
            axios.post(`/api/v1/auth/register/student/inviteStudents`, 
                
                    this.listOfStudents
            ,{
                withCredentials: true,
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