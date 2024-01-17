<template>
   <div class="login-container">
      <div class="logo-container">
         <img src="img/logo.png" alt="Logo">
      </div>
      <h1>Login</h1>
      <div @submit.prevent="">
         <div class="form-container">
            <div class="input-field">
               <label for="email">Email:</label>
               <input type="email" id="email" v-model="email" required />
            </div>
            <div class="input-field">
               <label for="password">Password:</label>
               <input
                  type="password"
                  id="password"
                  v-model="password"
                  required
               />
            </div>
            <button type="submit" @click="loginStudent()">Login Student</button>
            <button type="submit2" @click=loginInstructor()>Login Instructor</button>


            
         </div>
      </div>
      <!-- <button type="submit2" @click=pushInstructor()>Instructor</button> -->
   </div>
</template>

<script>
import { storeUser } from '../stores/store.js'
import axios from 'axios'
export default {
   // Will need to be changed - Ty Donnelly
   name: 'LoginPageView',
   data() {
      return {
         storeUser,
         email: "",
         password: "",
         
      }
   },
   methods: {
      loginInstructor() 
      {
         axios.post('http://localhost:80/api/v1/auth/login/instructor', {
            firstName: "",
            middleName: "",
            lastName: "",
            id: "",
            email: this.email,
            password: this.password,
            roles: "",
            sections: [],
         })
         .then((response) => {
            console.log(response)

            storeUser.updateLoginStatus(response.data.data.id, true)
            console.log(storeUser.isLoggedIn)
            console.log(storeUser.studentId)
            this.$router.push('/instructorhome')
         }, (error) => {
            console.log(error)
         })
         
// UNCOMMENT THIS CODE 

         // storeUser.updateLoginStatus("1", true)
         // console.log(storeUser.isLoggedIn)
         // console.log(storeUser.studentId)
         // this.$router.push('/instructorhome')

         //         if (isAuthenticated) {
         //             this.$router.push('/dashboard')
         //         } else
         //         {
         //             this.$router.push('/login')
         //   }
      },
      loginStudent()
      {

      },
      pushInstructor()
      {
         this.$router.push('/instructorhome')
      },
      
   },
}
</script>

<style scoped>
.login-container {
   display: flex;
   width: 50%;
   flex-direction: column;
   flex-direction: column;
   width: 50%;
   margin-top: -10px;
}
.form-container {
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   height: 25vh;
}

button {
   padding: 0;
   border-color: black;
}

.input-field {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
}
.login-container{
   margin-bottom: -175px;
   margin-top: -300px;
}
</style>
