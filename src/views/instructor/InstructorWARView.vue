<template>
   <div class="dropdowns">
      <div class="week-dropdown-container">
          <WeekDropdown/>
      </div>
  </div>
  <h2>WAR for {{ storeSection.selectedSectionName }}</h2>
   <div class="container">
      <div class="grid-container">
         <button v-for="team in this.teams" :class="{ 'selected-item': selectedTeam && team.id === selectedTeam.id }"
            :key="team.id" @click="getTeamWar(team)" type="button" class="team-tile">
            <p class="team">{{ team.name }}</p>
         </button>
      </div>

   </div>
   <!---->
   <WarTeamTable :teamProp="this.teamFormated" v-if="this.hasSelectedTeam" />

</template>

<script>
import SectionDropdown from '../../components/instructor/SectionDropdown.vue';
import { storeSection } from '../../stores/storeSection'
import { storeUser } from '../../stores/store.js'
import WeekDropdown from '../../components/WeekDropdown.vue';
import WarTeamTable from '@/components/WarTeamTable.vue'
import { storeWeek } from '../../stores/storeWeek'
import apiClient from '@/axios-setup.js'
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
         storeWeek, storeSection
      }
   },
   methods: {
    getTeamWar(team){
        this.selectedTeam = team
        this.hasSelectedTeam = false;
        const auth = localStorage.getItem('auth')

        apiClient.get(`${this.$baseURL}/api/v1/war/get`,
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
            console.log(error.response.data.code)
            if(error.response.data.code == 500){
               this.formatActivities([])
               this.hasSelectedTeam = true
            }}).catch(error => {
               this.isLoading = false
               console.log(error.response.data.code)
               if (error.response.data.code == 500) {
                  this.formatActivities([])
                  this.hasSelectedTeam = true
               }
            })

      },
      formatActivities(activities) {
         const team = [];

         for (const item of this.selectedTeam.students) {
            let student = {
               name: item.firstName + " " + item.lastName,
               tasks: [],
               id: item.id,
               weekStart: storeWeek.selectedWeek.start,
               weekEnd: storeWeek.selectedWeek.end
            }

            for (const activity of activities) {
               if (activity.studentId == student.id) {

                  student.tasks.push(activity)
               }
               else {
                  continue;
               }
            }
            team.push(student)
         }
         this.teamFormated = team
      },
      getTeams() {
         this.isLoading = true
         this.teams = []
         
         apiClient.get(`${this.$baseURL}/api/v1/section/getAllTeams/${storeSection.selectedSectionId}`,)
        .then(response => {
            this.teams = response.data.data
            this.hasLoaded = true

        })
        .catch(error => {
            console.log(error)
            if(error.response.data.code == 500){
            }})
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
         this.getTeams();
         this.hasSelectedTeam = false
      },
      watchedWeekId(newVal, oldVal) {
         if (this.hasSelectedTeam) {
            this.getTeamWar(this.selectedTeam);
            // this.hasSelectedTeam = false
         }
         // this.getTeamWar(this.selectedTeam);
         // this.hasSelectedTeam = false
      }
   },
   created() {
      this.getTeams()
   }
}

</script>

<style scoped>
.team {
   text-align: center;
   margin: 0;
}

.team-tile .team {
   color: white;
}

.button {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 10px 20px;
   white-space: nowrap;
   border-radius: 12px;
   cursor: pointer;
   min-width: 100px;
   max-width: 200px;
   margin: 5px;
}

.dropdowns {
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   justify-content: center; /* Center vertically */
   align-items: center; /* Center horizontally */
   margin-bottom: 20px;
}

.section-dropdown-container,
.week-dropdown-container {
   display: flex;
   justify-content: center; /* Center horizontally */
   align-items: center; /* Center vertically */
   width: 100%; /* Ensure the containers take up full width */
}

.grid-container {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
   gap: 10px;
   padding-bottom: 15px;
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
   border: 4px solid red;
   /* Adjust the color and border size as needed */
}

.team-tile {
   /* ... other styles ... */
   flex: 0 0 auto;  /* Increased flex-basis */
   max-width: 100%; /* Increased max-width */
   max-height: 50%;
   padding: 20px;
   box-sizing: border-box;
   word-wrap: break-word;
   overflow-wrap: break-word;
   font-size: 1em;
   overflow: hidden;
   text-overflow: ellipsis;
   display: flex;
   align-items: center;
   justify-content: center;
   min-height: 100px;
   background-color: #4E2A84;
   color: aliceblue;
   border-radius: 4px;
 }
 
 /* Hover effect */
 .team-tile:hover {
   transform: translateY(-5px); /* lift tile up */
   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* shadow effect */
   cursor: pointer;
 }
</style>