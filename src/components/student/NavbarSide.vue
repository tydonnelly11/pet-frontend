<template>
   <div :class="['sidebar-container', { 'open': isSidebarOpen }]">
     <div class="logo-details" @click="toggleSidebar">
      <div class="icon" :class="isSidebarOpen ? 'close' : ''"> </div>
     </div>
     <ul class="nav nav-pills flex-column justify-content" v-if="isSidebarOpen">
       <li class="nav-item">
         <router-link to="/studenthome/team">Team</router-link>
       </li>
       <li class="nav-item">
         <router-link to="/studenthome/studentpeereval">PeerEval</router-link>
       </li>
       <li class="nav-item">
         <router-link to="/studenthome/studentwar">War</router-link>
       </li>
       <li class="nav-item">
         <router-link to="/">Logout</router-link>
       </li>
     </ul>
   </div>
 </template>
 
 <script>
 export default {
   name: 'NavbarSide',
   data() {
     return {
       isSidebarOpen: false,
     };
   },
   methods: {
     toggleSidebar() {
       this.isSidebarOpen = !this.isSidebarOpen;
     },
   },
 };
 </script>
 
 <style scoped>
.sidebar-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 78px; 
  height: 100vh;
  background: #11101D;
  transition: width 0.5s;
  z-index: 1000;
  overflow-x: hidden;
}

.sidebar-container.open {
  width: 300px; 
}

.logo-details {
  width: 78px;
  height: 50px; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.logo-details .icon {
  width: 30px; 
  height: 2px;
  background-color: #fff; 
  position: relative;
  transition: all 0.3s ease;
}

.logo-details .icon::before,
.logo-details .icon::after {
  content: '';
  position: absolute;
  left: 50%; 
  width: 30px; 
  height: 2px; 
  background-color: #fff; 
  transition: all 0.3s ease;
  transform: translateX(-50%); 
}

.logo-details .icon::before {
  top: -10px;
}

.logo-details .icon::after {
  bottom: -10px;
}

.logo-details .icon.close {
  background-color: transparent; 
}

.logo-details .icon.close::before {
  transform: translateX(-50%) rotate(45deg);
  top: 0;
}

.logo-details .icon.close::after {
  transform: translateX(-50%) rotate(-45deg); 
  bottom: 0;
}

 .nav {
   list-style: none;
   padding: 0;
   margin: 0;
   width: 100%;
 }
 
 .nav-item {
   margin: 10px 0;
 }
 
 .nav-item a {
   color: #fff;
   text-decoration: none;
   display: block;
   padding: 10px 20px;
   transition: background-color 0.3s;
 }
 
 .nav-item a:hover {
   background-color: #575757;
 }
 </style>