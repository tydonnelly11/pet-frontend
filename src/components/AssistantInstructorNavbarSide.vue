<template>
   <div class="sidebar" :class="{ open: isSidebarOpen }">
      <div class="logo-details" @click="toggleSidebar">
         <!-- Hamburger icon created with divs -->
         <div class="hamburger" :class="{ 'open': isSidebarOpen }">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
         </div>
      </div>
      <ul class="nav-links">
         <li class="nav-item">
            <router-link @click="toggleSidebar" class="nav-link" to="/assistantinstructorhome/showsection">
               <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'house']" @click="logout" class="mr-2"
                  style="padding-left: 10px;" />
               <span class="link-text">Homepage</span>
            </router-link>
         </li>
         <li class="nav-item">
            <router-link @click="toggleSidebar" class="nav-link" to="/assistantinstructorhome/">
               <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'fa-table']" @click="logout" class="mr-2"
                  style="padding-left: 10px;" />
               <span class="link-text">Peer Evaluation</span>
            </router-link>
         </li>
         <li class="nav-item">
            <router-link @click="toggleSidebar" class="nav-link" to="/assistantinstructorhome/war">
               <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'list-check']" @click="logout" class="mr-2"
                  style="padding-left: 10px;" />
               <span class="link-text">Weekly Activity Reports (WAR)</span>
            </router-link>
         </li>
         <!-- <li class="nav-item">
            <router-link @click="toggleSidebar" class="nav-link" to="/assistantinstructorhome/rubric">
               <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'table-cells']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
               <span class="link-text">Rubric</span>
            </router-link>
         </li> -->



         <!-- <li class="nav-item">
          <router-link class="nav-link" to="/instructorhome/section">
            <span class="link-text">Section</span>
          </router-link>
        </li>  -->


         <!-- <li class="nav-item">
          <router-link class="nav-link" to="/assistantinstructorhome/editteams">
            <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'circle-info']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
            <span class="link-text">Section Information</span>
          </router-link>
        </li> -->

         <li class="nav-item" style="margin-top: auto;">
            <router-link class="nav-link" to="/">
               <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'sign-out-alt']" @click="logout" class="mr-2"
                  style="padding-left: 10px;" />
               <span @click="logout" class="link-text">Logout</span>
            </router-link>
         </li>
      </ul>
   </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { storeSection } from '../stores/storeSection'

export default {
   name: 'AssistantInstructorNavbarSide',
   data() {
      return {
         isSidebarOpen: false,
      }
   },
   methods: {
      toggleSidebar() {
         this.isSidebarOpen = !this.isSidebarOpen
         this.$emit('update:sidebarState', this.isSidebarOpen)
      },
      logout() {
         storeSection.resetSection()
         localStorage.removeItem('auth')
         localStorage.removeItem('logginstatus')
         localStorage.removeItem('storeUser')
         localStorage.removeItem('storeSection')
         localStorage.removeItem('storeWeek')
         localStorage.removeItem('storeTeam')
         this.$router.push('/')
      },
   },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');


*,
*::before,
*::after {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

html,
body {
   width: 100%;
   height: 100%;
   overflow: hidden;
   font-family: 'Poppins', sans-serif;
}

.sidebar {
   position: fixed;
   left: 0;
   top: 0;
   height: 100vh;
   width: 78px;
   background: #11101D;
   transition: top 300ms ease-in-out 300ms;
   overflow-x: hidden;
   z-index: 10000;
}


.sidebar.open {
   width: 400px;
}

.logo-details {
   height: 50px;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   position: relative;
   z-index: 2;
}

.icon {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 24px;
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   z-index: 1;
}

.line {
   width: 30px;
   height: 4px;
   background: #fff;
   transition: transform 0.3s ease, opacity 0.3s ease;
}



.nav-links {
   list-style: none;
   padding-top: 70px;
   margin-top: 0;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   height: 90%;

}

.nav-item {
   width: 100%;
   margin: 0;
   display: flex;
   align-items: center;
   height: 60px;
   /* Set a fixed height for each navbar item */
}


.nav-link {
   display: flex;
   align-items: center;
   height: 40px;
   color: #fff;
   text-decoration: none;
   transition: background-color 0.3s;
   font-weight: bold;
   font-size: 20px;
   width: 100%;
   /* Ensure links take up the full width */
   padding: 0 20px;
   /* Adjust padding as needed */
}

.nav-link:hover {
   background-color: #575757;
}

.link-text {
   display: none;
   margin-left: 10px;
}

.sidebar.open .link-text {
   display: initial;
}

.content {
   transition: margin-left 0.5s;
   padding-left: 78px;
   /* Initial padding equal to the sidebar width */
}

.content.shifted {
   padding-left: 250px;
   /* Padding equal to the expanded sidebar width */
}

.nav-link font-awesome-icon {
   padding-right: 100px;
   /* Adjust this value as needed */
}

.hamburger {
   width: 30px;
   height: 24px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   cursor: pointer;
}

.line {
   width: 30px;
   height: 4px;
   background: #fff;
   transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Adjustments for X icon */
.hamburger.open .line:nth-child(1) {
   transform: translateY(9.7px) rotate(45deg);
}

.hamburger.open .line:nth-child(2) {
   opacity: 0;
}

.hamburger.open .line:nth-child(3) {
   transform: translateY(-9.7px) rotate(-45deg);
}

@media (max-width: 768px) {
   body {
      overflow-x: hidden; /* Prevent horizontal scrolling */
   }

   /* Adjustments for the sidebar */
   .sidebar {
      width: 100%; /* Sidebar covers the whole width */
      height: 0; /* Initial height set to 0 */
      top: 0; /* Start from the top */
      left: 0; /* Align to the left */
      position: fixed; /* Fixed position to cover the viewport */
      background: #11101D; /* Background color of the sidebar */
      overflow-y: hidden; /* No vertical scroll when closed */
      z-index: 10000; /* High z-index to stay on top */
      transition: height 0.3s; /* Smooth transition for the height */
   }

   /* Sidebar opens downwards from the top */
   .sidebar.open {
      height: 100vh; /* Full viewport height */
      width: 100%;
      /* overflow-y: auto; */
   }

   /* Style adjustments for the hamburger icon */
   .hamburger {
      position: fixed; /* Fixed position to stay in place */
      top: 0; /* Align to the top */
      left: 0; /* Align to the left */
      z-index: 10001; /* Above the sidebar */
      cursor: pointer; /* Indicates it's clickable */

      width: 100%; /* Full width */
      height: auto; /* Height to fit content */
      background-color: rgba(77, 25, 121, 0.5);
      padding: 10px; /* Padding around the icon */
      box-sizing: border-box; /* Include padding in width and height */
      display: flex; /* Use flexbox for centering */
      justify-content: flex-start; /* Align hamburger lines to the start */
      align-items: center; /* Center items vertically */
   }

   .line {
      width: 30px; /* Width of the hamburger lines */
      height: 3px; /* Height of the hamburger lines */
      background: #fff; /* Color of the hamburger lines */
      transition: transform 0.3s ease, opacity 0.3s ease; /* Transition for animations */
      margin: 5px 0; /* Space between lines */
   }

   /* Adjustments for X icon */
.hamburger.open .line:nth-child(1) {
   transform: translateY(13px) rotate(45deg);
}

.hamburger.open .line:nth-child(2) {
   opacity: 0;
}

.hamburger.open .line:nth-child(3) {
   transform: translateY(-13px) rotate(-45deg);
}
}
</style>