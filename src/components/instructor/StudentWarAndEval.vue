<template>
    <button class="small-button-1" style="max-width: 200px;" @click="this.$router.back()">Back</button>
    <p class="student-text" :style="'margin-top : 75px;'"> 
        Select dates to get WAR/Peer Evaluation for <h3>{{ studentName }}</h3>
    </p>
    <div style="margin-bottom: 20px;">
        <label for="start-date" style="margin-right: 5px;">Start Date:</label>
        <input style="margin-right: 10px;" type="date" id="start-date" v-model="startDate" />

        <label for="end-date" style="margin-right: 5px;">End Date:  </label>
        <input type="date" id="end-date" v-model="endDate" />
    </div>
    
    <div class="button-group">
        <button class="small-button" @click="getWarAndEval">Get WAR</button>
        <button class="small-button" @click="getPeerEvaluationReport">Get Peer Evaluation</button>
    </div>
    
    <div v-if="this.hasEntry" v-for="student in studentList">
        <p>War for {{ student.weekStart }} - {{ student.weekEnd }}</p>
        <WarList :isTeamWar="false" :studentTasks="student"/>

    </div>

    <div v-if="this.hasPeerEntry" v-for="student in studentListPeer">
        <h4>Peer Evaluation for {{ student[0].weekStart + " - " + student[0].weekEnd}} </h4>
        <div >
            <div v-if="student[0].averageScore == 'N/A'">
                <p>No Peer Eval submited</p>
            </div>

            <div class="table" v-else>
                <PeerEvalTable :isEvalatorView="true" :isPastWeek="true" :peerEvalProp="student" :rubricProp="this.rubric"/>
            </div>
            <!-- <div class="table" v-else>
                <p>Student: {{ student.firstName }} {{ student.lastName}}</p>
                <p>Grade: {{ student.averageScore }} / {{ this.totalScore }}</p>
                <div class="comments-box">
                    <p>Private Comments</p>
                    <CommentTable :comments="student.privateComments"/>
                </div>
                <div class="comments-box">
                    <p>Public Comments</p>
                    <CommentTable :comments="student.publicComments"/>
                </div>
            

            </div> -->
            
            
        </div>


    </div>
    <div v-if="isLoading" class="popup-overlay">
            <img src="/img/loading-gif.gif">
    </div>

    <div v-if="hasSelectedDeleteStudent" class="popup-overlay">
      <div class="success">
            <p :style="'color: black;'">Are you sure you want to delete this student?</p>
            <button @click="removeStudent(this.student.studentId);">Delete</button>
         <button @click="hasSelectedDeleteStudent = false">Cancel</button>
      </div>
    </div>    

    <button class="remove-btn" @click="hasSelectedDeleteStudent = true;">Delete Student</button>
    <div v-if="hasDeletedStudent" class="popup-overlay">
        <div class="success">
            <p>Student Succesfully Deleted!</p>
            <button @click="hasDeletedStudent = false;">Close</button>
        </div>
    </div>


    
    


</template>

<script>
import apiClient from '@/axios-setup.js'
import WarList from '@/components/WarList.vue'
import WarTeamTable from '@/components/WarTeamTable.vue'
import { storeWeek } from '@/stores/storeWeek.js'
import { storeSection } from '@/stores/storeSection'
import CommentTable from './CommentTable.vue'
import PeerEvalTable from '@/components/student/PeerEvalTable.vue'


export default{
    name: 'StudentWarAndEval',
    data(){
        return{
            studentList: [],
            studentListPeer: [],
            student : {
                teamId: this.$route.params.teamid,
                studentId: this.$route.params.studentid,
                studentName: this.studentName,
                weekEnd: "",
                weekStart: "",
                tasks: []
            },
            weeksSelected: [],
            storeWeek, storeSection,
            hasEntry: false,
            hasDeletedStudent: false,
            hasPeerEntry: false,
            hasSelectedDeleteStudent: false,
            rubric : [],
        }
            
    },
    components: {
        WarList,
        WarTeamTable,
        CommentTable,
        PeerEvalTable
    },
    props: {
        teamid: String,
        studentid: String,
        studentName: String

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
            if(this.startDate == null || this.endDate == null){
                
                alert("Please select a start and end date")
                return
            }
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
            this.isLoading = true;
            for (const week of this.weeksSelected) {
            try {
                const response = await apiClient.get(`${this.$baseURL}/api/v1/war/get`, {
                    params: {
                        teamId: this.$route.params.teamid,
                        weekId: week.id
                    },
                });

                this.student.weekEnd = week.end;
                this.student.weekStart = week.start;

                for (const activity of response.data.data.activities) {
                    if (activity.studentId == this.student.studentId) {
                        
                        this.student.tasks.push(activity);
                    }
                }
                this.student.name = this.studentName;
                this.studentList.push(this.student);
                // Resetting student for next iteration
                this.student = {
                    name: this.studentName,
                    teamId: this.$route.params.teamid,
                    studentId: this.$route.params.studentid,
                    weekEnd: "",
                    weekStart: "",
                    tasks: []
                };
            } catch (error) {
            // Error handling
                this.student.weekEnd = week.end;
                this.student.weekStart = week.start;
                this.studentList.push(this.student);
                // Resetting student for next iteration
                this.student = {
                    studentName: this.studentName,
                    teamId: this.$route.params.teamid,
                    studentId: this.$route.params.studentid,
                    weekEnd: "",
                    weekStart: "",
                    tasks: []
                };
            }
        }
        this.hasEntry = true;
        this.isLoading = false;
        },
        async getPeerEvaluationReport(){
            this.hasPeerEntry = false;
            this.isLoading = true
            this.getWeeks()
            this.studentListPeer = []
            for (const week of this.weeksSelected) {
                try {
                    const response = await apiClient.get(`${this.$baseURL}/api/v1/peerEvaluation/getDetailedScore/${this.student.studentId}/${week.id}`, {
                        // params: {
                        //     week: week.id,
                        //     studentId: this.student.studentId,
                        // },
                    });

                   

                    if(response.data.code == 200){
                        const evaluations = [];
                        console.log(response.data.data)
                        for(const evaluation of response.data.data){
                            evaluation.weekStart = week.start
                            evaluation.weekEnd = week.end
                            evaluations.push(evaluation);
                        }
                        this.studentListPeer.push(evaluations);
                        console.log(this.studentListPeer)
                    }
                    
                   
                    
                } catch (error) {
                    console.error(error);
                    const evaluations = [];
                    evaluations.push({
                            weekStart: week.start,
                            weekEnd: week.end,
                            firstName: this.$route.params.studentName,
                            lastName: "",
                            averageScore: "N/A",
                            privateComments: [],
                            publicComments: []
                        });
                    
                    evaluations.push({weekStart : week.start, weekEnd : week.end})
                    this.studentListPeer.push(evaluations)
                }
            }
            this.hasPeerEntry = true;
            this.isLoading = false
        },

        removeStudent(){
            this.hasDeletedStudent = true;
            this.hasSelectedDeleteStudent = false;
            apiClient.post(`${this.$baseURL}/api/v1/section/deleteStudent`, {
                id: this.$route.params.studentid 
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })

        
        },
        getRubric() {
         let rubric = null;
         
         apiClient.get(`${this.$baseURL}/api/v1/section/getRubric/${storeSection.selectedSectionId}`, 
         
         )
         .then((response) => {
            
            let total = 0
            for(const criteria of response.data.data.criteria){
                total = total + criteria.maxScore
                this.rubric.push(criteria);
            }
            this.totalScore = total
         })
         
            let total = 0
            for(const criteria in rubric){
                total = total + criteria.maxScore
            }
            this.totalScore = total
        },
            

    },
    mounted(){
        this.student.teamId = this.$route.params.teamid
        this.student.studentId = this.$route.params.studentid
        this.getRubric()
        

    }

}

</script>

<style scoped>
.small-button {
    padding: 10px 15px; /* Ample padding for tap targets */
    font-size: 1rem; 
    border-radius: 20px;
    background-color: #5C4B93; /* A slightly different purple shade for contrast */
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;
}

.small-button:hover {
    background-color: #6f42c1; /* Lighter purple on hover for interaction feedback */
}

.small-button-1 {
    /* Ample padding for tap targets */
    font-size: 1rem;
    border-radius: 20px;
    background-color: #5C4B93;
    /* A slightly different purple shade for contrast */
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;
    margin-top: 20px;
    width: 100px;
    position: absolute;
    left: 6.5%;
    top : 0px;
}

.small-button-1:hover {
    background-color: #6f42c1;
    /* Lighter purple on hover for interaction feedback */
}

.small-button:not(:first-child) {
   margin-left: 10px;
}

.table{
    display: flex;
    flex-direction: row;
}

.comments-box{
    border: solid 1px blueviolet;
}

.remove-btn {
  background-color: #FF4136; /* Bright red for remove buttons */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  margin-top: 5px;
  cursor: pointer;
  max-width: 200px;
  margin-left: 5px;
  margin-right: 8px;
  position: absolute;
  right: 50px;
  top : 20px
}

.remove-btn:hover {
  background-color: #c3352d;
}

@media (max-width: 768px) {
    .date-inputs {
        flex-direction: column;
    }

    .small-button,
    .remove-btn {
        font-size: 15px;
        margin-left: -70px;
    }

    .small-button-1 {
        margin-left: -70px;
        margin-top: 60px;
    }

    .student-text {
        margin-left: -70px;
        margin-top: 12px;
    }

    .dates {
        margin-left: -14px;
        margin-bottom: 10px;
    }
    
    .start {
        margin-bottom: 10px;
    }

    .date-input {
        margin-left: 0px;
    }
}
</style>