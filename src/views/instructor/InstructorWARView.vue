<template>
    <div class="dropdowns">
        <SectionDropdown :style="'width:50%'"/>
        <WeekDropdown :style="'width:50%'"
        
      />
    </div>

    <div class="container">
        <div class="grid-container">
            <div 
            v-for="team in teams" 
            :class="{'selected-item': selectedTeam && team.id === selectedTeam.id}"
            :key="team.id"
            @click="getTeamWar(team)">
            <p>{{ team.name }}</p>
            
            </div>
        </div>
        
    </div>
    <WarTeamTable :teamProp="this.teamFormated" v-if="this.hasSelectedTeam"/>

</template>

<script>
import SectionDropdown from '@/components/instructor/SectionDropdown.vue';
import { storeSection } from '../../stores/storeSection'
import { storeUser } from '../../stores/store.js'
import WeekDropdown from '../../components/WeekDropdown.vue';
import WarTeamTable from '@/components/WarTeamTable.vue'
import { storeWeek } from '../../stores/storeWeek'
import axios from 'axios'
export default {
   name: 'InstructorWARView',
   components: {
    SectionDropdown,
    WarTeamTable,
    WeekDropdown,
},
   data() {
      return {
         teams: [],
         selectedTeam: null,
         hasSelectedTeam: false,
         teamFormated: [],
         storeWeek
      }
   },
   methods: {
    getTeamWar(team){
        this.selectedTeam = team
        this.hasSelectedTeam = false;
        const auth = localStorage.getItem('auth')

        axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/war/get`,
         {
            params: {
               teamId: team.id,
               weekId: storeWeek.selectedWeekId,
            },
            headers: { 'Authorization': `Bearer ${auth}` }
         }).then(response => {
            this.isLoading = false
            
            console.log(response.data.data.activities)
            this.formatActivities(response.data.data.activities)
            this.hasSelectedTeam = true
         }).catch(error => {
            this.isLoading = false
            console.log(error)
            if(error.response.data.status == 500){
               this.formatActivities([])
               this.hasSelectedTeam = true
            }
         })

    },
    formatActivities(activities){
         const team = [];
         
         for(const item of this.selectedTeam.students){
            let student = {
               name: item.firstName + item.lastName,
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
         this.teamFormated = team
         console.log(this.team)
      },

    getTeams(){
        this.isLoading = true
        this.teams = []
        const auth = localStorage.getItem('auth')
         const config = {
            headers: { 'Authorization': `Bearer ${auth}` }
         };
        axios.get(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/section/getAllTeams/${storeSection.selectedSectionId}`,
        {  headers: { 'Authorization': `Bearer ${auth}` }}
        )
        .then(response => {
            this.teams = response.data.data
            this.hasLoaded = true
            console.log(this.teams)

        })
        .catch(error => {
            console.log(error)
            if(error.response.data.code == 500){

            }
        })
    },
      
   },
   computed: {
        watchedSectionId() {
            return storeSection.selectedSectionId;
        },
        watchedWeekId() {
            return storeWeek.selectedWeekId;
        }
    },
    watch: {
        watchedSectionId(newVal, oldVal) {
            console.log(`sectionID changed from ${oldVal} to ${newVal}`);
            this.getTeams();
            this.hasSelectedTeam = false
        },
        watchedWeekId(newVal, oldVal) {
            console.log(`weekID changed from ${oldVal} to ${newVal}`);
            this.getTeamWar(this.selectedTeam);
            this.hasSelectedTeam = false
        }
    },
   created() {
      this.getTeams()
   }
}

</script>

<style scoped>
.dropdowns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}
.grid-item {
  padding: 10px;
  height: 100px;
  text-align: center;
  width: 100px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.selected-item {
  border: 4px solid blue; /* Adjust the color and border size as needed */
}
</style>