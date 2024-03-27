<template>
   <div class="war-table-container">
      <WarList
         :isTeamWar="true"
         v-for="student in teamProp"
         :studentTasks="student"
      />
   </div>
</template>

<script>

import WarList from './WarList.vue'
export default {
   name: 'WarTeamTable',
   components: {
      WarList,
   },
   props: {
      teamProp: Array,
   },
   data() {
      return {
        
        
      }
   },
   methods: {
      
   },
   computed: {},
   created() {
      
   },
}
</script>

<style scoped>
.war-table-container {
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   width: 100%;
}
</style>
