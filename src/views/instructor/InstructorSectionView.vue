<template>
   <div class="InstructorSectionView">
     <h1>Instructor Section View</h1>
     <div class="register-instructor">
       <div class="input-field">
         <label for="firstName">First Name</label>
         <input type="text" id="firstName" class="input" v-model="firstName" required />
       </div>
       <div class="input-field">
         <label for="middleName">Middle Name</label>
         <input type="text" id="middleName" class="input" v-model="middleName" required />
       </div>
       <div class="input-field">
         <label for="lastName">Last Name</label>
         <input type="text" id="lastName" class="input" v-model="lastName" required />
       </div>
       <div class="input-field">
         <label for="email">Email</label>
         <input type="email" id="email" class="input" v-model="email" required />
       </div>
       <div class="input-field">
         <label for="password">Password</label>
         <input type="password" id="password" class="input" v-model="password" required />
       </div>
       <button type="submit" @click="registerInstructor">Register Instructor</button>
     </div>
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
   



</template>

<script>
import { storeUser } from '@/stores/store.js'
import { storeSection } from '../../stores/storeSection'
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
      
      addRubric() {
         this.criteria.push({
            criterionName: this.criteriaName,
            criterionDesc: this.criteriaDesc,
            maxScore: this.maxScore,
         })
         console.log(this.criteria)
         this.maxScore = 0
         this.criteriaName = ""
         this.criteriaDesc = ""
         this.hasError = true
      },
      registerInstructor() {
         axios.post(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/auth/register/instructor`, {
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
         const auth = localStorage.getItem('auth')
         
         axios.post(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/section/save`, {
            id : null,
            name: this.sectionName,
            instructorId: storeUser.userID,
            rubric: rubric,
         },
         {  headers: { 'Authorization': `Bearer ${auth}` }}
         )
            .then(res => {
               console.log(res)
               console.log(res.data.data)
               this.sectionId = res.data.data
               this.hasCreatedSection = true
               var section = {
                  name: this.sectionName,
                  id: this.sectionId
               }
               storeUser.setSectionId(this.sectionId)
               storeSection.setSections(section)

            })
            .catch(err => {
               console.log(err)
            })
      },
      createTeams() {
         const auth = localStorage.getItem('auth')
         const config = {
            headers: { 'Authorization': `Bearer ${auth}` }
         };
         axios.post(`https://yellow-river-028915c10.4.azurestaticapps.net/api/v1/team/save`, {
            id : null,
            name: this.teamName,
            sectionId: this.sectionId,
            students: null,
         },
         {  headers: { 'Authorization': `Bearer ${auth}` }}
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
   watch: {
      'storeSection.selectedSectionId': function(newVal, oldVal) {
         
      }
   }
}

</script>
<style scooped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.InstructorSectionView {
  padding: 20px;
}

.input-field {
  position: relative;
  margin-bottom: 30px;
}

.input-field label {
  display: block;
  margin-bottom: 5px;
  color: #5d5076; 
}
.input-field input {
  width: 100%;
  padding: 15px;
  background: #E4E9F7;
  border: 1px solid #000; 
  border-radius: 4px; 
  font-size: 14px; 
  color: #333; 
  margin-bottom: 15px; 
  box-sizing: border-box; 
}

.input-field input::placeholder {
  color: #aaa; 
}

button {
  background: #743ae1; 
  color: white;
  border: none;
  padding: 14px 20px;
  cursor: pointer;
  border-radius: 4px; 
  text-transform: uppercase; 
  font-weight: bold;
  transition: background-color 0.3s;
  width: 100%; 
  margin-top: 20px; 
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2); 
}

button:hover {
  background: #11101D; 
}

</style>