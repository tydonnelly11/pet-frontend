<script setup>
import LoginPageView from './views/LoginPageView.vue'
import StudentWarView from './views/StudentWarView.vue'
import NavbarSide from './components/NavbarSide.vue'
</script>

<template>
    <router-view></router-view>
</template>

<style scoped>
.app-container {
    display: flex;
    justify-content: space-between;
}
</style>
