<template>
    <ul class="nav nav-pills flex-column justify-content">
       <li class="nav-item">
        <router-link class="nav-link" to="/instructorhome/">Instructor Peer Evaluation</router-link>
       </li>
       <!-- <li class="nav-item">
          <router-link class="nav-link" to="/instructorwar">Instructor WAR</router-link>
       </li>
       <li class="nav-item">
        <button class="nav-link dropdown-toggle" @click="toggleTeamsDropdown">
            Teams <span v-if="showTeamsDropdown">▲</span><span v-else>▼</span>
          </button>
          <ul v-if="showTeamsDropdown" class="dropdown">
             <li v-for="team in teams" :key="team.id" class="dropdown-item">
                <router-link :to="`/instructorhome/team/${team.id}`">{{ team.name }}</router-link>
             </li>
          </ul>
       </li> -->
         <li class="nav-item flex-end">
            <router-link class="nav-link" to="/instructorhome/section">Section</router-link>
         </li>
         <li class="nav-item flex-end">
            <router-link class="nav-link" to="/instructorhome/invite">Invite Students</router-link>
         </li>
         <li class="nav-item flex-end">
            <router-link class="nav-link" to="/instructorhome/editteams">Add/edit teams</router-link>
         </li>
    </ul>
 </template>
 
 <script>
 export default {
    name: 'InstructorNavbarSide',
    data() {
       return {
          showTeamsDropdown: false,
          teams: [
             { id: 1, name: 'Team 1' },
             { id: 2, name: 'Team 2' },
             { id: 3, name: 'Team 3' },
             { id: 4, name: 'Team 4' },
             // other teams
          ],
       };
    },
    methods: {
       toggleTeamsDropdown() {
          this.showTeamsDropdown = !this.showTeamsDropdown;
          console.log('Dropdown state is now:', this.showTeamsDropdown);
       },
    },
 };
 </script>
 
 <style scoped>
 .nav {
    height: 100vh;
    justify-content: space-around;
    font-size: 1.25rem;
 }
 .nav-item {
    width: 75%;
    position: relative;
 }
 .nav-link {
   background-color: white; /* Black background */
   color: blue; /* White text color */
   padding: 10px 15px; /* Padding inside the box */
   margin-bottom: 10px; /* Space between the items */
   display: block; /* Make sure the link takes the full width available */
   text-decoration: none; /* Remove underline from links */
   border-radius: 5px; /* Rounded corners */
}



.dropdown-toggle {
   cursor: pointer; /* Changes the mouse cursor to a pointer */
}

.dropdown {
    display: block; /* This should be set by Vue automatically */
  position: absolute;
  z-index: 100; /* Ensure it's on top of other elements */
  top: 100%; /* Position it right below the toggle button */
  left: 0;
}

.dropdown-item {
   margin-top: 0.5rem; /* Adds some space between dropdown items */
}

.dropdown-item:not(:last-child) {
   margin-bottom: 0.5rem; /* Adds some space between dropdown items except the last one */
}
 </style>