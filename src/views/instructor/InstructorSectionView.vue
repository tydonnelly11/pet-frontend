<template>
   <div class="InstructorSectionView">
      <h1>InstructorSectionView</h1>
   </div>

   <div>
      <div class="input-field">
         <label>First Name</label>
         <input type="text"  v-model="firstName" required />
      </div>
      <div class="input-field">
         <label>Middle Name</label>
         <input type="text"  v-model="middleName" required />
      </div>
      <div class="input-field">
         <label>Last Name</label>
         <input type="text" v-model="lastName" required />
      </div>
      <div class="input-field">
         <label>Email</label>
         <input type="text"  v-model="email" required />
      </div>
      <div class="input-field">
         <label>Password</label>
         <input type="text"  v-model="password" required />
      </div>
      <button type="submit" @click="registerInstructor">Register Instructor</button>
   </div>


   <div>
      <div class="input-field">
         <label>Section Name</label>
         <input type="text" id="sectionName" v-model="sectionName" required /> 

      </div>
      <h1>Enter Rubric Critera for Year</h1>
      <div class="container">
         <div class="input-field">
            <label>Criteria Name</label>
            <input type="text" id="criteriaName" v-model="criteriaName" required />
         </div>
      <div class="input-field">
            <label>Criteria Max Score</label>
            <input type="text" id="maxScore" v-model="maxScore" required />
         </div>
         <button type="submit" @click="addRubric">Add Criteria</button>

      </div>
      <div class="list-of-rubrics">
            <h2>List of Criteria</h2>
            <div class="rubric" v-for="rubric in criteria">
                <p>Description: {{ rubric.criterionDesc }}</p>
                <p>Max Score: {{ rubric.maxScore }}</p>
                
            </div>
        </div>
      <button type="submit" @click="submitSection">Create Section</button>

      </div>
   <div v-if="hasCreatedSection">
      Add Teams for Section: {{sectionName}}
      <div class="input-field">
         <label>Team Name</label>
         <input type="text" id="sectionName" v-model="teamName" required />
      </div>
      <button type="submit" @click="addTeam">Add Team</button>

      <div>
         Created Teams for Section: {{sectionId}}
         <div class="team" v-for="team in listOfTeams">

            <p>Team Name: {{ team.teamName }}</p>
         </div>
      </div>

   <button type="submit" @click="createTeams()">Create Teams</button>


   </div>


</template>

<script>
import { storeUser } from '@/stores/store.js'
import axios from 'axios'
export default {
   name: 'InstructorSectionView',
   components: {},
   data() {
      return {
         listOfTeams: [],
         criteria: [],
         teamName: "",
         rubricName: "",
         maxScore: "",
         criteriaName: "",
         sectionId: "",
         hasCreatedSection: false,
         storeUser,
         sectionName: "",
         firstName: "",
         middleName: "",
         lastName: "",
         email: "",
         password: "",


         

      }
   },
   methods: {
      addTeam() {
         this.listOfTeams.push({
            teamName: this.teamName,
         })
         console.log(this.listOfTeams)
      },
      addRubric() {
         this.criteria.push({
            criterionDesc: this.criteriaName,
            maxScore: this.maxScore,
         })
         console.log(this.criteria)
         this.maxScore = ""
         this.criteriaName = ""
      },
      registerInstructor() {
         axios.post(`http://localhost:80/api/v1/auth/register/instructor`, {
               firstName: this.firstName,
               middleName: this.middleName,
               lastName: this.lastName,
               id: null,
               email: this.email,
               password: this.password,
               roles : "admin user",
               sections : null,
            })
            .then(res => {
               console.log(res.data)
               storeUser.updateLoginStatus(res.data.data, true)
               console.log(storeUser.studentId)
            })
            .catch(err => {
               console.log(err)
            })
      },
      submitSection() {
         const rubric = {
            criteria : this.criteria
            
         }
         const dto ={
            id : null,
            name: this.sectionName,
            instructorId: storeUser.studentId,
            rubric: this.criteria ,
         }
         axios.post(`http://localhost:80/api/v1/section/save`, {
            id : null,
            name: this.sectionName,
            instructorId: storeUser.studentId,
            rubric: this.criteria,
         })
            .then(res => {
               console.log(res.data.data)
               this.sectionId = res.data.data
               this.hasCreatedSection = true
            })
            .catch(err => {
               console.log(err)
            })
      }
   },
   computed: {},
}

</script>

<style scoped>

</style>