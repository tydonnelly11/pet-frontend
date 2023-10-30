<script setup>
import StudentWarView from './views/StudentWarView.vue';
import NavbarSide from './components/NavbarSide.vue';
</script>

<template>
  <div class="app-container">
    <div class="sidebar"><NavbarSide/></div>
    <div class="main-item">
      <StudentWarView/>

    </div>
</div>
</template>

<style scoped>

.app-container{
  display: flex;
}

.sidebar{
  width: 25%;
    margin-left: 3.5%;

}

.main-item{
  width: 100%;
  display: flex;
  flex-direction: column;
  }
</style>
