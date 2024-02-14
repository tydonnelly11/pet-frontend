<template>
   <div class="full-page">
   <div class="main">
      <div class="row g-0">
         <!-- Side Image -->
         <div class="side-image col-md-6 d-flex align-items-center justify-content-center">
         </div>

   <!-- Right Side (Login Form) -->
   <div class="right col-md-6">
     <div class="input-box">
       <header>Login</header>
       <form @submit.prevent="loginStudent">
         <div class="input-field">
           <input type="email" id="email" class="input" v-model="email" required>
           <label for="email">Email</label>
         </div>
         <div class="input-field">
           <input type="password" id="password" class="input" v-model="password" required>
           <label for="password">Password</label>
         </div>
       <!-- <button type="button" class="submit" @click="loginInstructor">Login Instructor</button> -->
       </form>
       <button @click="loginStudent" type="submit" class="submit">Login Student</button>
       <button @click="loginInstructor" type="submit" class="submit">Login Instructor</button>
       <div v-if="this.isLoading" class="loading">
         <h1>Logging In...</h1>
      </div>
       <div class="signin">
  
         <div>
          <a href="#" @click="pushInstructor">Login bypass to make first Instructor</a>
         </div>
          <div>
          <a href="#" @click="pushInstructor2">Login bypass to get to students</a>
         </div>
      </div>
     </div>
   </div>
</div>
 </div>
</div>
</template>



<script>
import { storeUser } from '../stores/store.js'
import axios from 'axios'
import { storeSection } from '../stores/storeSection';
export default {
name: 'LoginPageView',
data() {
return {
   storeUser,
   email: "",
   password: "",
   isLoading: false,
   
}
},
methods: {
encodeCredentials(email, password) {
   return btoa(`${email}:${password}`);
},
loginInstructor() 
{
   
   this.isLoading = true
   let creds = this.encodeCredentials(this.email, this.password)
   axios.post('https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/auth/login/instructor', {},{
      headers: {
         'Authorization': `Basic ${creds}`
      }
   })
   .then((response) => {
      console.log(response)
      this.isLoading = false
      storeUser.updateLoginStatus(response.data.data.userInfo.id, true)
      localStorage.setItem('auth', response.data.data.token);
      localStorage.setItem('logginstatus', true)


      // storeUser.setSectionId(response.data.data.sections[0].id)
      
      // storeUser.setSectionId(response.data.data.sections[0].id)
      storeSection.setSections(response.data.data.userInfo.sections)

      
      storeUser.setName(response.data.data.userInfo.firstName,response.data.data.userInfo.lastName)
      localStorage.setItem('storeUser', JSON.stringify(storeUser));
      localStorage.setItem('storeSection', JSON.stringify(storeSection));
      this.$router.push('/instructorhome')
   }, (error) => {
      console.log(error)
   })
   

          
},
loginStudent()
{
   this.isLoading = true
   let creds = this.encodeCredentials(this.email, this.password)
   axios.post('https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/auth/login/student', {}, {
      headers: {
         Authorization: `Basic ${creds}`
      }
   })
   .then((response) => {
      console.log(response)
      this.isLoading = false
      storeUser.updateLoginStatus(response.data.data.userInfo.id, true)
      
      storeUser.setTeamId(response.data.data.userInfo.teamId)
      storeUser.setName(response.data.data.firstName,response.data.data.userInfo.lastName)
      storeUser.setSectionId(response.data.data.userInfo.sectionId)
      localStorage.setItem('auth', response.data.data.token);
      localStorage.setItem('logginstatus', true)
      localStorage.setItem('storeUser', JSON.stringify(storeUser));

      if(storeUser.teamId == null)
      {
         this.$router.push('/waitingroom')
      }
      else
      {
         this.$router.push('/studenthome')
      }
   }, (error) => {
      console.log(error)
      this.isLoading = false
   })
},
pushInstructor()
{
   storeUser.updateLoginStatus("1", true)
   console.log(storeUser.isLoggedIn)
   console.log(storeUser.userID)
   localStorage.setItem('auth', this.encodeCredentials(this.email, this.password));
   this.$router.push('/instructorhome/section')
   localStorage.setItem('logginstatus', true)

   localStorage.setItem('storeUser', JSON.stringify(storeUser));


},
pushInstructor2()
{
   storeUser.updateLoginStatus("1", true)
   console.log(storeUser.isLoggedIn)
   console.log(storeUser.userID)
   this.$router.push('/studenthome')
},

},
}
</script>

<style scooped>
/* POPPINS FONT */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

*{
font-family: 'Poppins', sans-serif;
}

.full-page {
min-height: 100vh; 
width: 100vw; 
background-color: #11101D; 
display: flex;
justify-content: center;
align-items: center;
padding: 20px; 
}

.main{
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
}

.side-image{
background-image: url("/img/logo.png");
background-position: center;
background-size: cover;
background-repeat: no-repeat;
border-radius: 10px 0 0 10px;
position: relative;
max-width: 300px;
}

.row{
width:  900px;
height:550px;
border-radius: 10px;
background: #E4E9F7;
padding: 0px;
box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.2);
}

.text{
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}

.text p{
color: #000;
font-size: 20px; 
}

i{
font-weight: 400;
font-size: 15px;
}

.right{
display: flex;
justify-content: center;
align-items: center;
position: relative;
}

.input-box{
width: 330px;
box-sizing: border-box;
color: #000;
}

img{
width: 100px;
position: static;
top: 30px;
left: 30px;
}

.input-box header{
font-weight: 700;
text-align: center;
margin-bottom: 45px;
}

.input-field{
display: flex;
flex-direction: column;
position: relative;
padding: 0 10px 0 10px;
}

.input{
height: 45px;
width: 100%;
background: transparent;
border: none;
border-bottom: 1px solid rgba(0, 0, 0, 0.2);
outline: none;
margin-bottom: 20px;
color: #40414a;
}

.input-box .input-field label{
position: absolute;
top: 10px;
left: 10px;
pointer-events: none;
transition: .5s;
}

.input-field input:focus ~ label
{
top: -10px;
font-size: 13px;
}

.input-field input:valid ~ label
{
top: -10px;
font-size: 13px;
color: #5d5076;
}

.input-field .input:focus, .input-field .input:valid{
border-bottom: 1px solid #743ae1;
}

.submit{
border: none;
outline: none;
height: 45px;
background: #386ca4; 
border-radius: 5px;
transition: .4s;
color: #fff;
margin: 10px 0;
}

.submit:hover{
background:  #11101D;
color: #fff;
}

.signin{
text-align: center;
font-size: small;
margin-top: 25px;
}

span a{
text-decoration: none;
font-weight: 700;
color: #000;
transition: .5s;
}

span a:hover{
text-decoration: underline;
color: #000;
}

@media only screen and (max-width: 768px){
.side-image{
  border-radius: 10px 10px 0 0;
}
img{
  width: 35px;
  position: absolute;
  top: 20px;
  left: 47%;
}
.text{
  position: absolute;
  top: 70%;
  text-align: center;
}
.text p, i{
  font-size: 16px;
}
.row{
  max-width:420px;
  width: 100%;
}

.logo {
max-width: 200px;
height: auto;
}

.signin div{
margin-top: 10px;
}

.side-image {
display: flex;
justify-content: center;
align-items: center;
}
}

</style>