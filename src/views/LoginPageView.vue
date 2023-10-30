<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="form-container">
            <div class="input-field">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="input-field">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
        </div>
        </form>
    </div>
</template>

<script>
export default {
    // Will need to be changed - Ty Donnelly
    name: 'LoginPageView',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            // Perform login logic here - Ty Donnelly
            console.log('Logging in with email:', this.email, 'and password:', this.password);
        }
    }
}
</script>

<style scoped>
.login-container{

}
.form-container{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 25vh;
}   

button{
    padding: 0;
    border-color: black;
}

.input-field{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

</style>
