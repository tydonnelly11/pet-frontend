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

      <div v-if="hasSubmittedInstructor" class="popup-overlay">
         <div class="success">
         <p>Instructor Succesfully Added!</p>
         <button @click="hasSubmittedInstructor = false">Close</button>
         </div>
      </div>
   </div>


   <div class="create-section">
      <h2>Enter Details below to create a new section</h2>
      <div class="input-field">
         <label>Section Name</label>
         <input type="text" id="sectionName" v-model="sectionName" required /> 

      </div>
      <div class="input-field">
         <label>Check to use default rubric</label>
         <input type="checkbox" id="defaultRubric" v-model="isRubricDefault"  />
      </div>

      <div class="input-field">
         <button @click="makeOwnRubric = true">Click to make own rubric</button>
      </div>

      
      <div v-if="makeOwnRubric">
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
      <button @click="resetRubric()">Cancel rubric creation</button>
      </div>

        <div>
         <label for="start-date">Start Date:</label>
         <input type="date" id="start-date" v-model="startDate" />

         <label for="end-date">End Date:</label>
         <input type="date" id="end-date" v-model="endDate" />

         <button @click="generateWeekList">Calculate Weeks</button>
         <div v-if="weeksCalculated">
            <h4>Check the boxes for weeks you want to exclude from a section</h4>
            <ul v-if="weeksForSemester.length > 0">
               <li v-for="(week, index) in weeksForSemester" :key="index">
               <input type="checkbox" :id="'week-' + index" v-model="week.execlude">
               <label :for="'week-' + index">{{ week.start }} - {{ week.end }}</label>
               </li>
            </ul>
         </div>
         
      </div>

      

      <button type="submit" @click="this.sectionConfirmation = true">Create Section</button>
      <div v-if="isLoading" class="popup-overlay">
         <img src="/img/loading-gif.gif">
      </div>
      <div v-if="sectionConfirmation" class="popup-overlay">
        <div class="conformation-popup">
        <p>Do you want to create {{ this.sectionName }}</p>
        <div class="button-group">
            <button :style="'border: 1px solid black;'" @click="submitSection()">Yes</button>
            <button :style="'border: 1px solid black;'" @click="this.sectionConfirmation = false">No</button>
        </div>
        </div>
      </div>



      <div v-if="hasCreatedSection" class="popup-overlay">
      <div class="success">
         <p>Section Successfully Created!</p>
         <!-- Add a button or a way to close the overlay -->
         <button @click="hasCreatedSection = false">Close</button>
      </div>
      </div>
   </div>
   



</template>

<script>
import { storeUser } from '@/stores/store.js'
import { storeSection } from '../../stores/storeSection'
import apiClient from  '@/axios-setup.js'
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
         isLoading: false,
         isRubricDefault: false,
         hasCreatedSection: false,
         hasSubmittedInstructor: false,
         hasCreatedTeams: false,
         storeUser, storeSection,
         sectionName: "",
         firstName: "",
         middleName: "",
         lastName: "",
         email: "",
         password: "",
         hasError: false,
         weeksForSemester: [],
         weeksCalculated: false,
         makeOwnRubric: false,



         

      }
   },
   methods: {

      setCurrentSection(){
         apiClient.post(`https://www.peerevaltool.xyz/api/v1/section/setIsCurrentSection`, {
            id : storeSection.selectedSectionId
         })
         .then(res => {
            console.log(res)
            this.isLoading = false
            this.hasSetCurrentSection = true
            storeSection.selectedSection()
         });
      },

      resetRubric(){
         this.criteria = []
         this.makeOwnRubric = false
      },
      

      generateWeekList(){
         if(this.startDate === "" || this.endDate === ""){
            alert("Please enter a start and end date")
            return
         }
        const startDate1 = new Date(this.startDate) // Start date
        const endDate = new Date(this.endDate) // End date
        const weeks = []

        let currentDate = new Date(startDate1)

        let weekId = 1

        while (currentDate.getDay() !== 1) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        while (currentDate <= endDate) {
           const startOfWeek = new Date(currentDate)
           const endOfWeek = new Date(currentDate)
           
           endOfWeek.setDate(endOfWeek.getDate() + 6)

           weeks.push({
              id: weekId,
              start: this.formatDate(startOfWeek),
              end: this.formatDate(endOfWeek),
              execlude: false,
           })

           currentDate.setDate(currentDate.getDate() + 7) // Move to the next week
           weekId++
        }
        this.weeksForSemester = weeks
        this.weeksCalculated = true;
      },
      formatDate(date) {
        //Formats date for display on week dropdown
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${year}-${month}-${day}`
     },
      
      addRubric() {
         this.criteria.push({
            criterionName: this.criteriaName,
            criterionDesc: this.criteriaDesc,
            maxScore: this.maxScore,
         })
         this.maxScore = 0
         this.criteriaName = ""
         this.criteriaDesc = ""
         this.hasError = true
      },
      registerInstructor() {
         axios.post(`https://www.peerevaltool.xyz/api/v1/auth/register/instructor`, {
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
               storeUser.updateLoginStatus(res.data.data, true)
               this.hasSubmittedInstructor = true
               
            })
            .catch(err => {
               console.log(err)
            })
      },
      submitSection() {
         this.isLoading = true
         let rubric = {
            criteria : this.criteria
            
         }
         if(this.isRubricDefault){
            rubric = null;
         }
         
         
         const dto ={
            id : null,
            name: this.sectionName,
            instructorId: storeUser.userID,
            rubric: this.criteria ,
         }
         const weeksToExcludeVar = []
         for(const week of this.weeksForSemester){
            if(week.execlude){
               weeksToExcludeVar.push({
                  startDate : week.start,
                  endDate : week.end
               })  
            }


            
         }
         this.weeksForSemester = []

         const auth = localStorage.getItem('auth')

         
         apiClient.post(`https://www.peerevaltool.xyz/api/v1/section/save`, {
            id : null,
            name: this.sectionName,
            instructorId: storeUser.userID,
            isRubricDefault: this.isRubricDefault,
            rubric: rubric,
            startDate: {date :this.startDate} ,
            endDate: {date : this.endDate},
            weeksToExclude: weeksToExcludeVar,
         },
         {  headers: { 'Authorization': `Bearer ${auth}` }}
         )
            .then(res => {
               console.log(res)
               console.log(res.data.data)
               this.sectionId = res.data.data
               this.hasCreatedSection = true
               this.isLoading = false
               var section = {
                  name: this.sectionName,
                  id: this.sectionId
               }
               storeUser.setSectionId(this.sectionId)
               storeSection.addSection(section)

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

.overlay {
  position: fixed; /* or absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 1000; /* Ensure it's above other content */
}

/* Style for the success message box */
.success {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 80%; /* Responsive width */
  z-index: 1001; /* Above the overlay */
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