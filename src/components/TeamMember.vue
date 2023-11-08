<template>
    <div class="team-member">
      <img :src="require(`@/assets/${avatar}`)" alt="Profile Picture" class="avatar" />
      <div class="name">{{ name }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: String,
      avatar: String,
    },
  };
  </script>
  
  <style scoped>
  .team-member {
    text-align: center;
    margin: 10px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 8px;
  }
  
  .name {
    font-size: 16px;
  }
  </style>
  