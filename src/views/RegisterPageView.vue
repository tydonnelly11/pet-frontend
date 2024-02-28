<template>
    <div class="full-page">
      <div class="registration-container">
        <div class="registration-box">
          <div class="registration-header">
            <h1>REGISTER</h1>
          </div>
          <div class="student-info">
            <p>Confirm the email is you and then enter in a password. DO NOT USE your TCU password : {{ this.studentInfo.email }}</p>
          </div>

          <div class="input-box">
            <input type="text" id="firstname" v-model="studentInfo.firstName" placeholder="Enter your First Name"/>
        </div>
        <div class="input-box">
            <input type="text" id="middleInitial" v-model="studentInfo.middleName" placeholder="Enter your Middle Initial"/>
        </div>
        <div class="input-box">
            <input type="text" id="lastname" v-model="studentInfo.lastName" placeholder="Enter your Last Name"/>
        </div>
        <div class="input-box">
            <input type="password" id="password" v-model="password2" placeholder="Enter your Password"/>
        </div>
        <div class="input-box">
            <input type="password" id="confirmPassword" v-model="password1" placeholder="Re-Enter your Password"/>
        </div>
          <button @click="registerStudent">Register</button>
          <div class="loading" v-if="this.isLoading">
            <p>Request being processed...DO NOT REFRESH <img src="/img/loading-gif.gif"></p>
          </div>
          <div class="success" v-if="this.hasRegistered">
            <p>Succesfully Registered</p>
            <button @click="goToLogin">Go to Login</button>
          </div>
        </div>
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
            

        },
        isLoading: false,
        hasRegistered: false,
        

    }
   },
   methods: {
        getRegistrationInfo(){

            
            axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/auth/register/student/getStudentRegistrationTokenInfo/${this.token}`, {
                
            }).then(response => {
                console.log(response)
                this.studentInfo.email = response.data.data.studentEmail
                
                this.studentInfo.sectionId = response.data.data.studentSectionId
                
            }).catch(error => {
                console.log(error)
            })
            
            
        },
        
        registerStudent(){
            if(this.password1 != this.password2){
                alert("Passwords do not match")
                return
            }
            this.isLoading = true
            this.hasRegistered = false
            axios.post(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/auth/register/student`, {
                
                firstName: this.studentInfo.firstName,
                middleName: this.studentInfo.middleName,
                lastName: this.studentInfo.lastName,
                email: this.studentInfo.email,
                sectionId : this.studentInfo.sectionId,
                password: this.password1,
                roles : "user"
                
            },
            {
                params: {
                    token: this.token
                },
            }
            ).then((response) => {
                console.log(response)
                this.isLoading = false
                this.hasRegistered = true
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
        this.hasRegistered = false
    }
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.full-page {
  min-height: 100vh;
  width: 100vw;
  background-color: #11101D;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #11101D;
  color: #E4E9F7;
  font-family: 'Poppins', sans-serif;
}

.registration-box {
  width: 900px;
  /* Adjust the height to auto to accommodate all children */
  height: auto;
  background-color: #E4E9F7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* Adjust padding as needed, giving enough space for the button */
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Add some space at the bottom to prevent elements from sticking to the edge */
  padding-bottom: 60px;
}

.registration-header h1 {
  color: #11101D;
  margin-bottom: 20px;
}

.student-info p, .loading p, .success p {
  color: #11101D;
  margin-bottom: 20px;
  text-align: center;
}

.input-box {
  width: 80%; /* or any other percentage or fixed width depending on design */
  margin-bottom: 10px; /* Adjust space between input boxes */
}

.input-box input[type="text"],
.input-box input[type="password"] {
  width: 100%;
  padding: 10px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px; /* Adjust if needed */
}

.input-box input[type="text"]::placeholder,
.input-box input[type="password"]::placeholder {
  color: #aaa;
  font-weight: 500;
}

.input-box input[type="text"]:focus,
.input-box input[type="password"]:focus {
  border-bottom: 2px solid #646cff;
}
.input-box:last-child input[type="password"] {
  margin-bottom: 10px; /* Less space after the last input box */
}

.input-box:last-child {
  margin-bottom: 5px; /* Less space after the last input box */
}

.label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 10px;
}

input[type="password"] {
  width: 100%;
  padding: 10px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 16px;
  color: #333;
  margin-bottom: 30px;
}

input[type="password"]::placeholder {
  color: #aaa;
  font-weight: 500;
}

input[type="password"]:focus {
  border-bottom: 2px solid #646cff;
}


button {
  padding: 15px 0;
  margin-top: 20px; /* Add margin on top of the button */
  width: 80%; /* Match the width of input boxes */
  background-color: #646cff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #535bf2;
}

button:focus {
  outline: none;
}

@media only screen and (max-width: 768px) {
  .registration-box {
    width: 100%;
    height: auto;
    padding: 20px;
  }
}
</style>