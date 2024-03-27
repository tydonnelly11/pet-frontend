<template>
   <div class="student-team-view">
      
      <div>
         <ErrorPopUp
            v-if="errorFlag"
            :responseFlag="responseFlag"
            :errorMessageProp="errorMessage"/>

      </div>
      <WarTeamTable v-if="hasEntry && (!isFutureWeek)" :teamProp="this.team"></WarTeamTable>
      <div v-if="!hasEntry && (!isFutureWeek)">
         <p>Team mates have not filled out any activities for {{ storeWeek.selectedWeek.start }} to {{ storeWeek.selectedWeek.end }}</p>
      </div>
      <div v-if="isLoading" class="popup-overlay">
         <img src="/img/loading-gif.gif">
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
import apiClient from  '@/axios-setup.js'
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
         apiClient.get(`http://localhost:80/api/v1/war/get`,
         {
            params: {
               teamId: storeUser.teamId,
               weekId: storeWeek.selectedWeekId,
            },
            headers: { 'Authorization': `Bearer ${auth}` }
         }).then(response => {
            this.isLoading = false
            this.formatActivities(response.data.data.activities)
         }).catch(error => {
            this.isLoading = false
            console.log(error.response.data.code)
            if(error.response.data.code == 500){
               // this.formatActivities([])
               this.hasEntry = false
            }
            else if(error.response.data.code == 404){
               
               this.hasEntry = false


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
            this.isLoading = false
         } else {
            this.isPastWeek = true
            this.isLoading = false
            this.isFutureWeek = false
            this.hasEntry = true
         }
      },
      formatActivities(activities){
         const team = [];
         
         for(const item of storeTeam.teamMembers){
            let student = {
               name: item.name,
               tasks: [],
               id: item.id,
               weekStart: storeWeek.selectedWeek.start,
               weekEnd: storeWeek.selectedWeek.end,
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
   mounted() {
      this.getTeamMatesWar();
      this.setWARVisibility(storeWeek.currentWeekId, storeWeek.selectedWeekId)
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
.overlay {
  position: fixed; /* or absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 1000; /* Ensure it's above other content */
}
</style>
