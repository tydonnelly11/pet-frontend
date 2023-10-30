<template>
      <div class="sidebar">
        <NavbarSide/></div>
      
      <div class="main-item">
      <router-view>
          
      </router-view>
      </div>
</template>

<script>
import NavbarSide from '../components/NavbarSide.vue';
export default{
    name: 'HomePage',
    components: {
        NavbarSide
    }
}

</script>

<style scoped></style>