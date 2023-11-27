<template>
   <div class="sidebar">
      <InstructorNavbarSide/>
   </div>

   <div class="main-item">
      <router-view> </router-view>
   </div>
</template>

<script setup>

import InstructorNavbarSide from '../../components/InstructorNavbarSide.vue'

</script>

<script>
export default {
   name: 'InstructorHomePageView',
   components: {
      InstructorNavbarSide,
   },
   data() {
      return {}
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
