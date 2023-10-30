<template>
<ul class="nav nav-pills flex-column justify-content">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Team</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#">Peer Eval</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#">War</a>
  </li>
  <li class="nav-item flex-end" >
    <a class="nav-link active" aria-disabled="true">Log out</a>
  </li>
</ul>
</template>

<script>
export default{
    name: 'NavbarSide',
}

</script>

<style scoped>
.nav{
    height: 100vh;
    justify-content: space-around;
    font-size: 1.25rem;
}
.nav-item{
    width:75%;
}



</style>