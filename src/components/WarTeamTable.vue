<template>
   <div class="war-table-container">
      <WarList
         :isTeamWar="true"
         v-for="student in this.teamProp"
         :studentTasks="student"
      />
   </div>
</template>

<script>
/*
This component is responsible for holding multiple wars for
the team view this
may be changed and some of the logic may be moved to the view
if it is easier
 */
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
      //Method for getting teams info using current weekvar
      //Might put currentweek in localStore
   },
   computed: {},
   created() {
      console.log(this.team)
   },
}
</script>

<style scoped>
.war-table-container {
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   width: 100%;
   height: 100%;
}
</style>
