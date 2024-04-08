<template>
  <div class="sidebar" :class="{ 'open': isSidebarOpen }">
    <div class="logo-details" @click="toggleSidebar">
      <!-- Hamburger icon created with divs -->
      <div class="icon" :class="{ 'open': isSidebarOpen }">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <ul class="nav-links">
      <li class="nav-item">
        <router-link @click="toggleSidebar" class="nav-link" to="/instructorhome/">
          <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'house']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
          <span class="link-text">Instructor Peer Evaluation</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link @click="toggleSidebar" class="nav-link" to="/instructorhome/war">
          <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'list-check']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
          <span class="link-text">Instructor War</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link @click="toggleSidebar" class="nav-link" to="/instructorhome/rubric">
          <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'table-cells']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
          <span class="link-text">Rubric</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link @click="toggleSidebar" class="nav-link" to="/instructorhome/section">
          <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'section']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
          <span class="link-text">Create a Section</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link @click="toggleSidebar" class="nav-link" to="/instructorhome/showsection">
          <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'magnifying-glass']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
          <span class="link-text">View All Sections</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link @click="toggleSidebar" class="nav-link" to="/instructorhome/manageassistant">
          <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'chalkboard-user']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
          <span class="link-text">View All Assistant Instructors</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link @click="toggleSidebar" class="nav-link" to="/instructorhome/editteams">
          <font-awesome-icon v-if="isSidebarOpen" :icon="['fas', 'circle-info']" @click="logout" class="mr-2" style="padding-left: 10px;"/>
          <span class="link-text">Section Information</span>
        </router-link>
      </li>
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
import { storeSection } from '../stores/storeSection';

export default {
  name: 'InstructorNavbarSide',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.$emit('update:sidebarState', this.isSidebarOpen);
    },
    logout() {
      storeSection.resetSection();
      localStorage.removeItem('auth');
      localStorage.removeItem('logginstatus');
      localStorage.removeItem('storeUser');
      localStorage.removeItem('storeSection');
      localStorage.removeItem('storeWeek');
      localStorage.removeItem('storeTeam');
      this.$router.push('/');
    },
  },
};
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

/* Adjustments for X icon */
.sidebar.open .icon .line:nth-child(1) {
  transform: translateY(-50%) rotate(-45deg);
  top: 0;
}

.sidebar.open .icon .line:nth-child(2) {
  opacity: 0;
}

.sidebar.open .icon .line:nth-child(3) {
  transform: translateY(-50%) rotate(45deg);
  bottom: 0;
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
</style>
