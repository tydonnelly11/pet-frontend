<template>
   <div class="student-team-view">
      
      <div>

      </div>
      <WarTeamTable :teamProp="team"></WarTeamTable>
   </div>
</template>

<script>
import NavbarSide from '@/components/student/NavbarSide.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import WarTeamTable from '@/components/WarTeamTable.vue'
import { ref } from 'vue'
import axios from 'axios'
import { storeUser } from '@/stores/store.js'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeTeam } from '../../stores/storeTeam'
export default {
   name: 'StudentTeamView',
   props: {
      selectWeek: String,
      currentWeek: String,
   },
   components: {
      NavbarSide,
      WeekDropdown,
      WarTeamTable,
   },
   data() {
      return {
         team: [
            
         ],
         selectedWeekId: null,
         currentWeekId: null,
         selectedWeek: ref(null),
      }
   },
   methods: {
      getTeamMatesWar(){
         axios.get(`baseurl/api/v1/war/get`,
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
         })
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
      }

      
   },
   computed: {
      
   },
   watch: {
      'storeWeek.selectedWeekId': function(newVal, oldVal) {
         console.log(`currentWeekId changed from ${oldVal} to ${newVal}`);
         // Call your function here
         this.getWarTeamEntries();
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
