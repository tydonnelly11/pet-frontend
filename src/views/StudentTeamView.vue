<template>
    <div class="container">
      <div class="profile">Team Profile</div>
      <div class="team-members">
        <div class="team-member">
          <img src="src/img/detective.jpg" alt="Member 1" class="avatar" />
          <div class="name">John Doe</div>
        </div>
  
        <div class="team-member">
          <img src="path-to-profile-pic2.jpg" alt="Member 2" class="avatar" />
          <div class="name">Jane Smith</div>
        </div>
  
        <!-- Add more team members as needed -->
    </div>
      <!-- <TeamCarousel /> -->
      <!-- <WarList /> -->
    </div>
  </template>
  
  <script>
  import NavbarSide from '../components/NavbarSide.vue'
  // import TeamCarousel from '../components/TeamCarosel.vue'
  export default {
    name: 'StudentTeamView',
    components: {
      NavbarSide,
      // TeamCarousel,
    },
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .profile {
    font-size: 24px;
    margin-bottom: 20px;
    border-radius: 50%;
    padding: 10px;
    background-color: #f0f0f0;
    /* Add any other styles as needed */
  }
  
  .team-members {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .team-member {
    text-align: center;
    margin: 10px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 8px;
  }
  
  .name {
    font-size: 16px;
  }
  </style>
  