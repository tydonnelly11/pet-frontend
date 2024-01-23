<template>
    <div class="registration-container">
        <div class="registration-header">
            <h1>Register</h1>
        </div>
        <div class="student-info">
           <p> {{ studentInfo.email }} </p> 
           <p> {{ studentInfo.firstName + studentInfo.lastName }} </p> 
        </div>

        <input type="text" v-model="password2" placeholder="Enter your Password"/>
        <input type="text" v-model="password1" placeholder="Enter your Password"/>

        <button @click="registerStrudent">Register</button>
        <div class="loading">
            <p v-if="isLoading">Request being processed...DO NOT REFRESH</p>
        </div>
        <div class="success">
            <p v-if="hasSubmittedStudents">Succesfully Registered</p>
            <button @click="goToLogin">Go to Login</button>
        </div>
    </div>


</template>

<script>
import axios from 'axios'
export default {
   name: 'RegisterPageView',
   props: {
      
   },
   data() {
      return {
        token : this.$route.params.token,
        studentInfo:{
            email: "",
            password: "",
            firstName: "",
            middleName: "",
            lastName: "",
            sectionId: "",
            isLoading: false,
            hasSubmittedStudents: false,

        }
        

    }
   },
   methods: {
        getRegistrationInfo(){
            console.log("here")
            
            axios.get(`http://localhost:80/api/v1/auth/register/student/getStudentRegistrationTokenInfo/${this.token}`, {
                
            }).then(response => {
                console.log(response)
                this.studentInfo.email = response.data.data.studentEmail
                this.studentInfo.firstName = response.data.data.studentFirstName 
                this.studentInfo.lastName = response.data.data.studentLastName
                this.studentInfo.middleName = response.data.data.studentMiddleName
                this.studentInfo.sectionId = response.data.data.studentSectionId
                
            }).catch(error => {
                console.log(error)
            })
            
            
        },
        registerStrudent(){
            axios.post(`http://localhost:80/api/v1/auth/register/student`, {
                firstName: this.studentInfo.firstName,
                middleName: this.studentInfo.middleName,
                lastName: this.studentInfo.lastName,
                email: this.studentInfo.email,
                sectionId : this.studentInfo.sectionId,
                password: this.password1,
                roles : "user"
                
            },
            {
                withCredentials: true,
            }
            ).then(response => {
                console.log(response)
                this.isLoading = false
                this.hasSubmittedStudents = true
            }).catch(error => {
                console.log(error)
                this.isLoading = false
                
            })
        }
   },
    created(){
        this.getRegistrationInfo()
    }
}

</script>

<style scoped>
.registration-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
}

</style>