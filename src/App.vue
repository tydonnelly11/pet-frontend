<script setup>
import LoginPageView from './views/LoginPageView.vue'
import StudentWarView from './views/StudentWarView.vue';
import NavbarSide from './components/NavbarSide.vue';
</script>

<template>
  <div class="app-container">
      <router-view> </router-view>
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