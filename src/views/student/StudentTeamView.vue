<template>
   <div class="student-team-view">
      
      <div>
         <ErrorPopUp
            v-if="errorFlag"
            :responseFlag="responseFlag"
            :errorMessageProp="errorMessage"/>

      </div>
      <WarTeamTable v-if="hasEntry && !isFutureWeek" :teamProp="team"></WarTeamTable>
      <div v-if="isLoading">
         <h1>Loading...</h1>
      </div>
      <div v-if="isFutureWeek">
         <p>Come back during {{ storeWeek.selectedWeek.start}} to {{ storeWeek.selectedWeek.end }} to view your team mates activities</p>
      </div>
   </div>
</template>

<script>
import NavbarSide from '@/components/student/NavbarSide.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import WarTeamTable from '@/components/WarTeamTable.vue'
import ErrorPopUp from '@/components/utilities/ErrorPopUp.vue'
import { ref } from 'vue'
import axios from 'axios'
import { storeUser } from '@/stores/store.js'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeTeam } from '../../stores/storeTeam'
export default {
   name: 'StudentTeamView',
  
   components: {
      NavbarSide,
      WeekDropdown,
      WarTeamTable,
      ErrorPopUp,
   },
   data() {
      return {
         team: [],
         isFutureWeek: false,
         isPastWeek: false,
         hasEntry: false,
         storeWeek,
         storeTeam,
      }
   },
   methods: {
      getTeamMatesWar(){
         this.isLoading = true
         const auth = localStorage.getItem('auth')
         axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/war/get`,
         {
            params: {
               teamId: storeUser.teamId,
               weekId: storeWeek.selectedWeekId,
            },
            headers: { 'Authorization': `Basic ${auth}` }
         }).then(response => {
            this.isLoading = false
            this.formatActivities(response.data.data.activities)
         }).catch(error => {
            this.isLoading = false
            console.log(error)
            if(error.response.data.status == 500){
               this.formatActivities([])
               this.hasEntry = true
            }
         })
         this.setWARVisibility(storeWeek.currentWeekId, storeWeek.selectedWeekId)
      },
      setWARVisibility(currentWeekId, selectedWeekId) {
         //Sets the visibility of the peer eval table and is used in
         //getPeerEvalEntriesForWeek() and createNewPeerEvalEntry() to
         //determine if the table should be displayed/editable

         if (currentWeekId == selectedWeekId) {
            this.isPastWeek = false
            this.isFutureWeek = false
            this.hasEntry = true
         } else if (currentWeekId < selectedWeekId) {
            this.isFutureWeek = true
            this.isPastWeek = false
         } else {
            this.isPastWeek = true
            this.isFutureWeek = false
         }
      },
      formatActivities(activities){
         const team = [];
         
         for(const item of storeTeam.teamMembers){
            let student = {
               name: item.name,
               tasks: [],
               id: item.id,
            }
           
            for(const activity of activities){
               if(activity.studentId == student.id){
                  
                  student.tasks.push(activity)
               }
               else{
                  continue;
               }
            }
            team.push(student)
         }
         this.team = team
         console.log(this.team)
      }

      
   },
   computed: {
      
   },
   watch: {
      'storeWeek.selectedWeekId': function(newVal, oldVal) {
         
         this.getTeamMatesWar();
         this.setWARVisibility(storeWeek.currentWeekId, storeWeek.selectedWeekId)
    }
     
   },
   created() {
      this.getTeamMatesWar();
   },
}
</script>

<style scoped>
.student-team-view {
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin-top: 5%;
}
</style>
