<template>
    <ul class="nav nav-pills flex-column justify-content">
        <li class="nav-item">
            <router-link to="/StudentTeam">Team</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/StudentPeerEval">PeerEval</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/studenthome/studentwar">War</router-link>
        </li>
        <li class="nav-item flex-end">
            <router-link to="/">Logout</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'NavbarSide',
}
</script>

<style scoped>
.nav {
    height: 100vh;
    justify-content: space-around;
    font-size: 1.25rem;
}
.nav-item {
    width: 75%;
}
</style>
