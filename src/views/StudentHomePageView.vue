<template>
   <div class="sidebar">
      <NavbarSide />
   </div>

   <div class="main-item">
      <router-view> </router-view>
   </div>
</template>

<script>
import NavbarSide from '../components/NavbarSide.vue'
export default {
   name: 'StudentHomePageView',
   components: {
      NavbarSide,
   },
}
</script>

<style scoped>
.sidebar {
   width: 20%;
   margin-left: 3.5%;
}

.main-item {
   width: 100%;
   display: flex;
   flex-direction: column;
}
</style>
