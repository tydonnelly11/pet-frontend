<template>
   <div class="login-container">
      <div class="logo-container">
         <img src="img/logo.png" alt="Logo">
      </div>
      <h1>Login</h1>
      <form @submit.prevent="login">
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
            <button type="submit">Login</button>

            
         </div>
      </form>
      <button type="submit2" @click=pushInstructor()>Instructor</button>
   </div>
</template>

<script>
import { storeUser } from '../stores/store.js'
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
      login() 
      {
         // axios.post('http://localhost:8080/api/v2/auth/login/student', {
         //    headers: {
              
         //    }
         // })
         storeUser.updateLoginStatus("1", true)
         console.log(storeUser.isLoggedIn)
         console.log(storeUser.studentId)
         this.$router.push('/studenthome')

         //         if (isAuthenticated) {
         //             this.$router.push('/dashboard')
         //         } else
         //         {
         //             this.$router.push('/login')
         //   }
      },
      pushInstructor()
      {
         this.$router.push('/instructorhome')
      },
      async loginAsInstructor() {
            try {
                console.log(this.username);
                console.log(this.password);
                const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
                console.log(basicAuth);
                const response = await axios.post('http://localhost:8080/api/users/login', {}, {
                    headers: {
                        Authorization: basicAuth
                    }
                });
                console.log(response.data);
                const token = response.data.data.token;
                localStorage.setItem('token',token);
                console.log(token);
                // redirect to a new page after successful login
                this.$router.push('/admin');
            } catch (error) {
                console.error(error);
                this.errorMessage = error.response.data.message;
            }
        },

        async loginAsStudent() {
            try {
                console.log(this.username);
                console.log(this.password);
                const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
                console.log(basicAuth);
                const response = await axios.post('http://localhost:8080/api/users/login', {}, {
                    headers: {
                        Authorization: basicAuth
                    }
                });
                console.log(response.data);
                const token = response.data.data.token;
                const superfrogEmail = response.data.data.userInfo.username;
                localStorage.setItem('token',token);
                console.log(token);
                localStorage.setItem('superfrogEmail', superfrogEmail);
                console.log(superfrogEmail);
                // redirect to a new page after successful login
                this.$router.push('/superfrog');
            } catch (error) {
                console.error(error);
                this.errorMessage = error.response.data.message;
            }
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
