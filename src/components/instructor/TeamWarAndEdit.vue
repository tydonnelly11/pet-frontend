<template>
    <button @click="this.$router.back()">Previous page</button>
    <p>Select dates to get WAR for {{ teamname }}</p>
    <label for="start-date">Start Date:</label>
    <input type="date" id="start-date" v-model="startDate" />

    <label for="end-date">End Date:</label>
    <input type="date" id="end-date" v-model="endDate" />

    <button @click="getWar">Get WAR</button>
    <!-- <button @click="getPeerEvaluationReport">Get Peer Evaluation</button> -->

    <div v-if="this.hasEntry" v-for="(team, index) in teamList">
        <p>War for {{ weeksSelected[index].start }} - {{ weeksSelected[index].end }}</p>
        <WarTeamTable :teamProp="team"/>
    </div>

    <button @click="removeTeam">Delete Team</button>
    <button @click="editTeamName = true;">Edit Team name</button>
    <div v-if="editTeamName">
        <label>Enter New Team name: </label>
        <input type="text" v-model="newTeamName"/>
        <button @click="editTeamName = false;">Cancel</button>
        <button @click="editTeam();">Save</button>
    </div>

    <div v-if="hasChangedName" class="popup-overlay">
        <div class="success">
            <p>Team Name changed!</p>
            <button @click="hasChangedName = false; editTeamName = false">Close</button>
        </div>
    </div>

    <div v-if="hasDeletedTeam" class="popup-overlay">
        <div class="success">
            <p>Team Succesfully Deleted!</p>
            <button @click="hasDeletedTeam = false; this.$router.push('/instructorhome/editteams')">Close</button>
        </div>
    </div>

</template>

<script>
import apiClient from '@/axios-setup.js'
import WarList from '@/components/WarList.vue'
import WarTeamTable from '@/components/WarTeamTable.vue'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeSection } from '@/stores/storeSection'
import { storeTeam } from '@/stores/storeTeam'

export default{
    name: 'TeamWarAndEdit',
    data(){
        return{
            team: [

            ],
            teamList: [],
            hasDeletedTeam: false,
            isLoading: false,
            newTeamName: "",
            editTeamName: false,
            teamOBJ: {
                id: this.teamid,
                name: this.teamname,
                sectionId: this.sectionId
            },
            hasEntry: false,
            hasChangedName: false,

        }
    },
    props: {
        teamid: String,
        teamname: String,
        sectionId: String
    },
    components: {
        WarList,
        WarTeamTable
    },
    methods: {
        formatDate(date) {
        //Formats date for display on week dropdown
            const year = date.split("-")[0]
            const month = date.split("-")[1]
            const day = date.split("-")[2]

            return `${month}-${day}-${year}`
        },
        getWeeks(){
            this.weeksSelected = []
            let end = this.formatDate(this.endDate)
            let start = this.formatDate(this.startDate)
            for(const week of storeWeek.weeksForSemester){
                
                if(week.start >= start && week.end <= end || week.start <= start && week.end >= end || week.start <= start && week.end >= start || week.start <= end && week.end >= end){
                    this.weeksSelected.push(week)
                }
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
      },
      editTeam(){
    
            if(this.newTeamName == "" || this.newTeamName == null){
                this.newTeamName = this.teamOBJ.name
            }
            const auth = localStorage.getItem('auth')
            
            this.isLoading = true;
            apiClient.post(`http://localhost:80/api/v1/team/edit`,
            {
                id: this.teamOBJ.id,
                name: this.newTeamName,
                sectionId: this.teamOBJ.sectionId,
                students: this.teamMembers,
                assistantInstructorDTO: null
            },
            {  headers: { 'Authorization': `Bearer ${auth}` }}
            ).then(response => {
                this.isLoading = false;
                this.hasChangedName = true;
                console.log(response)

                
            }).catch(error => {
                console.log(error)
            })
    },
      async getWar(){
        this.getWeeks()
        this.isLoading = true
        this.teamList = []

        for(const week of this.weeksSelected){
         this.isLoading = true
         try {
            const response = await apiClient.get(`http://localhost:80/api/v1/war/get`,
            {
                params: {
                teamId: this.teamid,
                weekId: week.id,
                },
         })
            this.isLoading = false
            this.formatActivities(response.data.data.activities)
        }
        catch(error){
            this.isLoading = false
            console.log(error.response.data.code)
            // if(error.response.data.code == 500){
            //    // this.formatActivities([])
            //    this.hasEntry = false
            // }
            // else if(error.response.data.code == 404){
               
            //    this.hasEntry = false


            // }
        }
        this.teamList.push(this.team)
        this.team = []

        
        }
        this.hasEntry = true
      },
      removeTeam(){
            this.isLoading = true
            apiClient.post(`http://localhost:80/api/v1/team/delete`,
            
            {
                id: this.teamid,
                sectionId: this.sectionId,
                name: this.teamname,
                students: null,
                assistantInstructorDTO: null
            },
            ).then(response => {
                this.isLoading = false
                this.hasDeletedTeam = true
                
            }).catch(error => {
                this.isLoading = false
            })
        },
        
      
    },
    mounted(){
        this.teamMembers = storeTeam.teamMembers
    }
}
</script>

<style>

</style>