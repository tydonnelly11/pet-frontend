<template>
    <div class="registration-container">
        <div class="registration-header">
            <h1>Register</h1>
        </div>
        <div class="student-info">
           <p> {{ studentInfo.email }} </p> 
           <p> {{ studentInfo.name }} </p> 
        </div>

        <input type="text" v-model="password2" placeholder="Enter your Password"/>
        <input type="text" v-model="password1" placeholder="Enter your Password"/>

        <button @click="registerStrudent">Register</button>
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
            name: "",
        }
        

    }
   },
   methods: {
        async getRegistrationInfo(){
            
            axios.get(`http://localhost:8080//api/v1/auth/register/student/getStudentRegistrationTokenInfo/${this.token}`, {
                headers: {
                 
                },
                
            }).then(response => {
                this.studentInfo.email = response.data.data.email
                this.studentInfo.name = response.data.data.name
                
            }).catch(error => {
                console.log(error)
            })
            
            
        },
        registerStrudent(){
            axios.post(`http://localhost:8080//api/v1/auth/register/student/${this.token}`, {
                headers: {
                 
                },
                
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