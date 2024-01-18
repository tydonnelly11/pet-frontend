<template>
    <h3>To add students to a team, please select a team, 
            then select all the students you wish to add to that team 
            and click the save button.
        </h3>
    <div class="page">
        <!-- Teams Section -->
        
        <div class="teams">
            <h2>Teams</h2>
            <div class="team" v-for="team in teams" :key="team.id">
                {{ team.name }}
                <input type="radio" :value="team.id" v-model="updatedTeam.id" @change="selectTeam(team)">
            </div>
        </div>

        <!-- Students Section -->
        <div class="students">
            <h2>Students</h2>
            <div class="student" v-for="student in students" :key="student.id">
                <label>{{ student.firstName }} {{ student.lastName }}</label>
                <input type="checkbox" :value="student.id" @change="toggleStudent(student)">
            </div>
        </div>

    </div>
    <button type="submit" @click="saveTeam()">Save Team</button>
    <button type="submit" @click="clearSelection()">Clear Selection</button>
</template>

<script>
import axios from 'axios'
import { storeUser } from '@/stores/store.js'

export default {
   name: 'InstructorTeamEditView',
   components: {
    

   },
   data() {
      return {
        students: [],
        teams: [],
        updatedTeam: {
            id: "",
            name: "",
            sectionId: storeUser.sectionId,
            students: [],
        }
         
      }
   },
   methods: {
    getStudents(){
        axios.get(`http://localhost:80/api/v1/section/getAllStudents/${storeUser.sectionId}`,
        {
            withCredentials: true,
        })
        .then(response => {
            this.students = response.data.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getTeams(){
        axios.get(`http://localhost:80/api/v1/section/getAllTeams/${storeUser.sectionId}`,
        {
            withCredentials: true,
        })
        .then(response => {
            this.teams = response.data.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    selectTeam(team) {
          this.updatedTeam.id = team.id;
          this.updatedTeam.name = team.name;
          // Clear the students array when a new team is selected
          this.updatedTeam.students = [];
      },

      // Method to add/remove a student from the updatedTeam.students array
      toggleStudent(student) {
          const index = this.updatedTeam.students.indexOf(student.id);
          if (index > -1) {
              // Student is already in the array, remove them
              this.updatedTeam.students.splice(index, 1);
          } else {
              // Add the student to the array
              this.updatedTeam.students.push(student);
          }
      },
   
   saveTeam(){
    axios.post(`http://localhost:80/api/v1/team/edit`,
    {
        id: this.updatedTeam.id,
        name: this.updatedTeam.name,
        sectionId: this.updatedTeam.sectionId,
        students: this.updatedTeam.students,
    },
    {
        withCredentials: true,
    }).then(response => {
        console.log(response)
        
    }).catch(error => {
        console.log(error)
    })
   }
},
   computed: {},
   created() {
    this.getStudents()
    this.getTeams()
   },
}

</script>

<style scoped>
.page{
    display: flex;
    flex-direction: row;
    width: 100%;
}
.teams{
    display: flex;
    flex-direction: column;
    flex : 0 0 50%;
}

.team{
    flex : 0 0 10%;
    height: 150px;
    text-align: center;
}

.students{
    display: flex;
    flex-direction: column;
    flex : 0 0 50%;
}

</style>