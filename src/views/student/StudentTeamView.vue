<template>
   <div class="student-team-view">
      
      <div>
         <ErrorPopUp
            v-if="errorFlag"
            :responseFlag="responseFlag"
            :errorMessageProp="errorMessage"/>

      </div>
      <WarTeamTable v-if='(!isFutureWeek)' :teamProp="team"></WarTeamTable>
      <div v-if="isFutureWeek">
         <p>Come back during {{ storeWeek.selectedWeek.start}} to {{ storeWeek.selectedWeek.end }} to complete WAR</p>
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
         team: [
            
         ],
        
         selectedWeek: ref(null),
         isFutureWeek: false,
         isPastWeek: false,
         hasEntry: false,
         storeWeek,
      }
   },
   methods: {
      getTeamMatesWar(){
         axios.get(`http://localhost:80/api/v1/war/get`,
         {
            params: {
               teamId: storeUser.teamId,
               weekId: storeWeek.selectedWeekId,
            },
            withCredentials: true,
         }).then(response => {
            this.formatActivities(response.data.data.activities)
         }).catch(error => {
            console.log(error)
            if(error.response.data.status == 500){
               
            }
         })
      },
      setWARVisibility(currentWeekId, selectedWeekId) {
         //Sets the visibility of the peer eval table and is used in
         //getPeerEvalEntriesForWeek() and createNewPeerEvalEntry() to
         //determine if the table should be displayed/editable

         if (currentWeekId == selectedWeekId) {
            this.hasEntry = true
            this.isPastWeek = false
            this.isFutureWeek = false
         } else if (currentWeekId < selectedWeekId) {
            this.hasEntry = false
            this.isFutureWeek = true
            this.isPastWeek = false
         } else {
            this.hasEntry = true
            this.isPastWeek = true
            this.isFutureWeek = false
         }
      },
      formatActivities(activities){
         const team = [];
         
         console.log("START")
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
                  console.log(student.tasks)
                  continue;
               }
            }
            console.log(student)
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
         console.log(`currentWeekId changed from ${oldVal} to ${newVal}`);
         // Call your function here
         
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
