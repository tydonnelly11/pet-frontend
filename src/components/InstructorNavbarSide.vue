<template>
   <ul class="nav nav-pills flex-column justify-content">
      <li class="nav-item">
         <router-link to="/instructorhome/instructorpeereval"
            >Instructor Peer Evaluation</router-link
         >
      </li>
      <li class="nav-item">
         <!-- Placeholder link for Instructor WAR page -->
         <router-link to="/instructorwar">Instructor WAR</router-link>
      </li>
      <!-- Add other instructor-specific links here if needed -->
   </ul>
</template>

<script>
export default {
   name: 'InstructorNavbarSide',
}
</script>

<style scoped>
.nav {
   height: 100vh;
   justify-content: space-around;
   font-size: 1.25rem;
}
.nav-item {
   width: 75%;
}
</style>
