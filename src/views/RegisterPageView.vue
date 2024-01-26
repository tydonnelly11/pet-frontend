<template>
    <div class="registration-container">
        <div class="registration-header">
            <h1>Register</h1>
        </div>
        <div class="student-info">
           <p> {{ studentInfo.email }} </p> 
          
           <p> Confirm the above email is yours and then enter in your name and a passowrd. DO NOT USE your TCU password</p>
        </div>
        
        <input type="text" v-model="studentInfo.firstName" placeholder="Enter your First Name"/>
        <input type="text" v-model="studentInfo.middleName" placeholder="Enter your Middle Intial"/>
        <input type="text" v-model="studentInfo.lastName" placeholder="Enter your Last Name"/>
        <input type="text" v-model="password2" placeholder="Enter your Password"/>
        <input type="text" v-model="password1" placeholder="Enter your Password"/>

        <button @click="registerStrudent">Register</button>
        <div v-if="isLoading" class="loading">
            <p >Request being processed...DO NOT REFRESH</p>
        </div>
        <div v-if="hasSubmittedStudents" class="success">
            <p >Succesfully Registered</p>
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

            
            axios.get(`http://localhost:80/api/v1/auth/register/student/getStudentRegistrationTokenInfo/${this.token}`, {
                
            }).then(response => {
                console.log(response)
                this.studentInfo.email = response.data.data.studentEmail
                
                this.studentInfo.sectionId = response.data.data.studentSectionId
                
            }).catch(error => {
                console.log(error)
            })
            
            
        },
        
        registerStrudent(){
            if(this.password1 != this.password2){
                alert("Passwords do not match")
                return
            }
            this.isLoading = true
            this.hasSubmittedStudents = false
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
            ).then((response) => {
                console.log(response)
                this.isLoading = false
                this.hasSubmittedStudents = true
                console.log(this.hasSubmittedStudents)
                console.log(this.isLoading)
            }).catch((error) => {
                console.log(error)
                this.isLoading = false
                
            })
        },
        goToLogin(){
            this.$router.push('/login')
        }
   },
    created(){
        this.getRegistrationInfo()
        this.isLoading = false
        this.hasSubmittedStudents = false
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