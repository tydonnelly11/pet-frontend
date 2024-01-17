<template>
   <div class="sidebar-container">
      <img src="/img/logo.png" alt="Logo" class="logo">
      <ul class="nav nav-pills flex-column justify-content">
         <li class="nav-item">
            <router-link to="/studenthome/team">Team</router-link>
         </li>
         <li class="nav-item">
            <router-link to="/studenthome/studentpeereval">PeerEval</router-link>
         </li>
         <li class="nav-item">
            <router-link to="/studenthome/studentwar">War</router-link>
         </li>
         <li class="nav-item flex-end">
            <router-link to="/">Logout</router-link>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   name: 'NavbarSide',
}
</script>

<style scoped>
.sidebar-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   height: 100vh;
   justify-content: space-around;
   font-size: 1.25rem;
}

.logo {
   width: 100%; /* Adjust the width of the logo as needed */
}

.nav {
   width: 100%;
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
    bottom: 20%;
}
a{
   text-decoration: none;
   font-weight: 550;
   font-size: 1.5em;
}

.nav-item {
   width: 100%;
   margin-bottom: 10px; /* Add margin between navigation links */
}
</style>
