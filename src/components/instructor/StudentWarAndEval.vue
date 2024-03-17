<template>
    <p>Select dates to get WAR/Peer Evaluation for {{ student.studentId }}</p>
    <label for="start-date">Start Date:</label>
    <input type="date" id="start-date" v-model="startDate" />

    <label for="end-date">End Date:</label>
    <input type="date" id="end-date" v-model="endDate" />

    <button @click="getWarAndEval">Get WAR and Evals</button>

    <div v-if="this.hasEntry" v-for="student in studentList">
        <p>War for {{ student.weekStart }} - {{ student.weekEnd }}</p>
        <WarList :isTeamWar="false" :studentTasks="student"/>

    </div>



    
    


</template>

<script>
import apiClient from '@/axios-setup.js'
import WarList from '@/components/WarList.vue'
import WarTeamTable from '@/components/WarTeamTable.vue'
import { storeWeek } from '@/stores/storeWeek.js'


export default{
    name: 'StudentWarAndEval',
    data(){
        return{
            studentList: [],
            student : {
                teamId: this.$route.params.teamid,
                studentId: this.$route.params.studentid,
                weekEnd: "",
                weekStart: "",
                tasks: []
            },
            weeksSelected: [],
            storeWeek,
            hasEntry: false,
        }
            
    },
    components: {
        WarList,
        WarTeamTable
    },
    props: {
        teamid: String,
        studentid: String,

    },
    computed: {
        
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
            console.log(storeWeek.weeksForSemester)
            let end = this.formatDate(this.endDate)
            let start = this.formatDate(this.startDate)
            for(const week of storeWeek.weeksForSemester){
                
                if(week.start >= start && week.end <= end || week.start <= start && week.end >= end || week.start <= start && week.end >= start || week.start <= end && week.end >= end){
                    this.weeksSelected.push(week)
                }
            }

        },
        async getWarAndEval(){
            this.getWeeks()
            this.studentList = []
            const auth = localStorage.getItem('auth')

            for (const week of this.weeksSelected) {
            try {
                const response = await apiClient.get(`http://localhost:80/api/v1/war/get`, {
                    params: {
                        teamId: this.$route.params.teamid,
                        weekId: week.id
                    },
                    headers: { 'Authorization': `Bearer ${auth}` }
                });

                console.log(response.data);
                this.student.weekEnd = week.end;
                this.student.weekStart = week.start;

                for (const activity of response.data.data.activities) {
                    if (activity.studentId == this.student.studentId) {
                        this.student.tasks.push(activity);
                    }
                }

                this.studentList.push(this.student);
                // Resetting student for next iteration
                this.student = {
                    teamId: this.$route.params.teamid,
                    studentId: this.$route.params.studentid,
                    weekEnd: "",
                    weekStart: "",
                    tasks: []
                };
            } catch (error) {
            // Error handling
                console.error(error);
                this.student.weekEnd = week.end;
                this.student.weekStart = week.start;
                this.studentList.push(this.student);
                // Resetting student for next iteration
                this.student = {
                    teamId: this.$route.params.teamid,
                    studentId: this.$route.params.studentid,
                    weekEnd: "",
                    weekStart: "",
                    tasks: []
                };
            }
        }
        this.hasEntry = true;
        }

    },
    mounted(){
        console.log(this.$route.params)
        this.student.teamId = this.$route.params.teamid
        this.student.studentId = this.$route.params.studentid

    }

}

</script>

<style>

</style>