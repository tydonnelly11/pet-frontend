<template>
   <div class="container">
      <div class="profile">Team Profile</div>
      <div class="team-members">
         <div class="team-member">
            <img src="/img/detective.jpg" alt="Member 1" class="avatar" />
            <div class="name">John Doe</div>
         </div>

         <div class="team-member">
            <img src="/img/detective.jpg" alt="Member 1" class="avatar" />
            <div class="name">Darth Vader</div>
         </div>

         <div class="team-member">
            <img src="/img/detective.jpg" alt="Member 1" class="avatar" />
            <div class="name">Batman</div>
         </div>

         <div class="team-member">
            <img src="/img/detective.jpg" alt="Member 1" class="avatar" />
            <div class="name">Iron Man</div>
         </div>

         <div class="team-member">
            <img src="/img/detective.jpg" alt="Member 1" class="avatar" />
            <div class="name">Spiderman</div>
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

<!-- 
  For when backend is ready:
  <template>
  <div class="container">
    <div class="profile">Team Profile</div>
    <div class="team-members">
      <div v-for="member in teamMembers" :key="member.id" class="team-member">
        <img :src="member.avatar" :alt="member.name" class="avatar">
        <div class="name">{{ member.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarSide from '../components/NavbarSide.vue';

export default {
  name: 'StudentTeamView',
  components: {
    NavbarSide,
  },
  data() {
    return {
      teamMembers: [],
    };
  },
  mounted() {
    
    fetch('https://team.member.url')
      .then(response => response.json())
      .then(data => {
        this.teamMembers = data;
      })
      .catch(error => {
        console.error('Error fetching team members:', error);
      });
  },
};
</script>

<style scoped>
existing styles
</style>

 -->
