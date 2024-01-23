<template>
   <div class="InstructorSectionView">
      <h1>InstructorSectionView</h1>
   </div>
   <!-- <div class="error-popup">
      <ErrorPopUp v-if="hasError" :errorMessage="errorMessage" />
   </div> -->

   <div class="register-instructor">
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
      <div v-if="hasSubmittedInstructor" class="success">
         <p>Instructor Succesfully Added!</p>
      </div>
   </div>


   <div class="create-section">
      <h2>Enter Details below to create a new section</h2>
      <div class="input-field">
         <label>Section Name</label>
         <input type="text" id="sectionName" v-model="sectionName" required /> 

      </div>
      <h4>Enter Rubric Critera for Year</h4>
         <div class="input-field">
            <label>Criteria Name</label>
            <input type="text" id="criteriaName" v-model="criteriaName" required />
         </div>
         <div class="input-field">
            <label>Criteria Description</label>
            <input type="text" id="criteriaDesc" v-model="criteriaDesc" required />
         </div>
      <div class="input-field">
            <label>Criteria Max Score</label>
            <input type="text" id="maxScore" v-model="maxScore" required />
         </div>
         <button type="submit" @click="addRubric">Add Criteria</button>

      <div class="list-of-rubrics">
            <h2>List of Criteria</h2>
            <div class="rubric" v-for="rubric in criteria">
               <p>Name: {{ rubric.criterionName }}</p>
                <p>Description: {{ rubric.criterionDesc }}</p>
                <p>Max Score: {{ rubric.maxScore }}</p>
                
            </div>
        </div>
      <button type="submit" @click="submitSection">Create Section</button>
      <div class="success" v-if="hasCreatedSection">
         <p>Section Succesfully Created!</p>

      </div>
   </div>
   <div v-if="hasCreatedSection">
      Add Teams for Section: {{sectionName}}
      <div class="input-field">
         <label>Team Name</label>
         <input type="text" id="sectionName" v-model="teamName" required />
      </div>

      <!-- <div>
         Created Teams for Section: {{sectionId}}
         <div class="team" v-for="team in listOfTeams">

            <p>Team Name: {{ team.teamName }}</p>
         </div>
      </div> -->

   <button type="submit" @click="createTeams()">Create Team</button>


   </div>

</template>

<script>
import { storeUser } from '@/stores/store.js'
import axios from 'axios'
import ErrorPopUp from '@/components/utilities/ErrorPopUp.vue'
export default {
   name: 'InstructorSectionView',
   components: {
      ErrorPopUp
   },
   data() {
      return {
         listOfTeams: [],
         criteria: [],
         teamName: "",
         rubricName: "",
         maxScore: 0,
         criteriaName: "",
         criteriaDesc: "",
         sectionId: "",
         hasCreatedSection: false,
         hasSubmittedInstructor: false,
         hasCreatedTeams: false,
         storeUser,
         sectionName: "",
         firstName: "",
         middleName: "",
         lastName: "",
         email: "",
         password: "",
         hasError: false,



         

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
            criterionName: this.criteriaName,
            criterionDesc: this.criteriaDesc,
            maxScore: this.maxScore,
         })
         console.log(this.criteria)
         this.maxScore = 0
         this.criteriaName = ""
         this.hasError = true
      },
      registerInstructor() {
         axios.post(`/api/v1/auth/register/instructor`, {
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
               console.log(storeUser.userID)
               this.hasSubmittedInstructor = true
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
            instructorId: storeUser.userID,
            rubric: this.criteria ,
         }
         axios.post(`/api/v1/section/save`, {
            id : null,
            name: this.sectionName,
            instructorId: storeUser.userID,
            rubric: rubric,
         },
         { 
            withCredentials: true
         }
         )
            .then(res => {
               console.log(res)
               console.log(res.data.data)
               this.sectionId = res.data.data
               this.hasCreatedSection = true
            })
            .catch(err => {
               console.log(err)
            })
      },
      createTeams() {
         axios.post(`/api/v1/team/save`, {
            id : null,
            name: this.teamName,
            sectionId: this.sectionId,
            students: null,
         },
         { 
            withCredentials: true
         }
         )
            .then(res => {
               console.log(res)
               console.log(res.data.data)
               this.hasCreatedTeams = true
               
               
            })
            .catch(err => {
               console.log(err)
            })
      },
   },
   computed: {},
}

</script>

<style scoped>
.register-instructor {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-evenly;
   margin-top: 50px;
   height: 80%;
}

.create-section{
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-evenly;
   margin-top: 50px;
   height: 80%;

}
.input-field {
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-evenly;
   width: 90%;

}
label{
   display: flex;
   flex: 0 0 50%;
}

input{
   flex: 0 0 50%;
}
.list-of-rubrics{
   width: 100%
}

.rubric{
   display: flex;
   flex-direction: row;
   justify-content: space-evenly;
   width: 100%;
}
.error-popup {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 1000;
   background-color: white;

   ;
   /* Add more styles for background, padding, etc. */
}

.rubric > p{
   flex: 0 0 33%;
}
</style>