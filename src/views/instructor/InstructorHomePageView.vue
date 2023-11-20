<template>
   <div class="sidebar">
      <NavbarSide />
   </div>

   <div class="main-item">
      <router-view> </router-view>
   </div>
</template>

<script setup>
import NavbarSide from '../components/student/NavbarSide.vue'
</script>

<script>
export default {
   name: 'InstructorHomePageView',
   components: {
      NavbarSide,
   },
   data() {
      return{}
   },
   methods: {},
   computed: {},
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
