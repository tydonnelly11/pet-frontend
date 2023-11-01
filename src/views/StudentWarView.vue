<template>
    <div class="container">
        <div class="profile">Profile</div>
        <TeamCarousel />
        <!--This might be moved to team page depending on how we want to do it, just can option for now-->
        <!--Could also be made a dropdown but idk-->
        <WarList />
    </div>
</template>

<script>
import WarList from '../components/WarList.vue'
import NavbarSide from '../components/NavbarSide.vue'
import TeamCarousel from '../components/TeamCarosel.vue'
export default {
    name: 'StudentWarView',
    components: {
        WarList,
        NavbarSide,
        TeamCarousel,
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}

.profile {
    position: relative;
    top: -25px;
    margin-bottom: -150px;
    left: 80%;
    width: 10%;
    border: 2px solid black;
}
</style>
