<template>
   <!-- This is a comment -->
   <!-- <div class="InstructorSectionView">
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
   </div> -->
   <div class="create-section" style="margin-top: 20px">
      <h2 style="color: #5d5076">
         Enter Details below to create a new section
      </h2>
      <div class="input-field">
         <label
            style="font-weight: bold; font-size: 20px; margin-top: 10px"
         ></label>
         <input
            type="text"
            id="sectionName"
            v-model="sectionName"
            placeholder="Enter section name"
            required
         />
      </div>
      <div class="input-field">
         <div class="checkbox-container">
            <label style="font-weight: bold; font-size: 20px; margin-top: 10px"
               >Check to use last year's rubric:</label
            >
            <input
               type="checkbox"
               id="defaultRubric"
               v-model="isRubricDefault"
               @click="setCritera"
            />
         </div>
         

         
      </div>

      <div class="input-field">
         <button @click="makeOwnRubric = true; this.criteria = [];" style="border-radius: 12px">
            Click to make own rubric
         </button>
      </div>

      <div v-if="makeOwnRubric" style="flex-direction: column; background-color: rgba(256, 256, 256, 0.95);" class="popup-overlay">
         <h4>Enter Rubric Critera for Year</h4>
         <div class="input-field" :style="'width: 35%;'">
            <label>Criteria Name</label>
            <input
               type="text"
               id="criteriaName"
               v-model="criteriaName"
               required
            />
         </div>
         <div class="input-field" :style="'width: 35%;'">
            <label>Criteria Description</label>
            <input
               type="text"
               id="criteriaDesc"
               v-model="criteriaDesc"
               required
            />
         </div>
         <div class="input-field" :style="'width: 35%;'">
            <label>Criteria Max Score</label>
            <input type="text" id="maxScore" v-model="maxScore" required />
         </div>
         <button :style="'width : 50%;'" type="submit" @click="addRubric" style="border-radius: 12px">
            Add Criteria
         </button>

         <table :style="'margin: 25px 0'" v-if="this.criteria.length > 0">
            <thead>
               <tr>
                  <th scope="col">Criteria Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Max Score</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="criterion of this.criteria">
                  <td scope="col">{{ criterion.criterionName }}</td>
                  <td scope="col">{{ criterion.criterionDesc }}</td>
                  <td scope="col">{{ criterion.maxScore }}</td>
               </tr>
            </tbody>
         </table>
         <div class="button-group" :style="'margin-top: 50px;'">
         <button class="criteria-button" @click="resetRubric()" style="border-radius: 12px">
            Cancel rubric creation
         </button>
         <button class="criteria-button" @click="makeOwnRubric = false; hasCreatedRubric = true;" style="border-radius: 12px">
            Finish rubric
         </button>
         </div>
      </div>
      
      <div class="current-rubric" v-if="this.criteria.length > 0">
         <table>
            <thead>
               <tr>
                  <th scope="col">Criteria Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Max Score</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="criterion of this.criteria">
                  <td scope="col">{{ criterion.criterionName }}</td>
                  <td scope="col">{{ criterion.criterionDesc }}</td>
                  <td scope="col">{{ criterion.maxScore }}</td>
               </tr>
            </tbody>
         </table>
      </div>

      <div>
         <div class="date-container">
            <div class="date">
         <label
            for="start-date"
            style="
               font-weight: bold;
               font-size: 20px;
               margin-top: 10px;
               color: #5d5076;
               margin-bottom: 20px;
               margin-right: 25px;
            "
            >Start Date:</label
         >
         <input type="date" id="start-date" v-model="startDate" />
      </div>
      <div class="date">
         <label
            for="end-date"
            style="
               font-weight: bold;
               font-size: 20px;
               margin-top: 10px;
               color: #5d5076;
               margin-bottom: 20px;
               margin-left: 10px;
               margin-right: 25px;
            "
            >End Date:</label
         >
         <input type="date" id="end-date" v-model="endDate" />
      </div>
      </div>
         <button @click="generateWeekList" style="border-radius: 12px">
            Calculate Weeks
         </button>
         <div v-if="weeksCalculated" :style="'margin: 20px 0'">
            <h4>
               Check the boxes for weeks you want to exclude from a section
            </h4>
            <!-- <ul v-if="weeksForSemester.length > 0" class="week-list">
               <li v-for="(week, index) in weeksForSemester" :key="index">
                  <input type="checkbox" :id="'week-' + index" v-model="week.execlude">
                  <label :for="'week-' + index">{{ week.start }} - {{ week.end }}</label>
                  </li>
            </ul> -->
            <ul class="week-list" v-if="weeksForSemester.length > 0">
               <li v-for="(week, index) in weeksForSemester" :key="index">
                  <input
                     type="checkbox"
                     :id="'week-' + index"
                     v-model="week.execlude"
                  />
                  <label
                     :style="'flex-basis: 50%; display: flex;'"
                     :for="'week-' + index"
                     >{{ week.start }} - {{ week.end }}</label
                  >
               </li>
            </ul>
         </div>
      </div>

      <button
         type="submit"
         @click="this.sectionConfirmation = true"
         style="margin-top: 20px;border-radius: 12px"
      >
         Create Section
      </button>
      <div v-if="isLoading" class="popup-overlay">
         <img src="/img/loading-gif.gif" />
      </div>
      <div v-if="sectionConfirmation" class="popup-overlay">
         <div class="conformation-popup">
            <p>Do you want to create {{ this.sectionName }}</p>
            <div class="button-group">
               <button
                  class="confirmation-button"
                  @click="submitSection()"
                  style="width: 125px;"
               >
                  Yes
               </button>
               <button
                  class="confirmation-button"
                  @click="this.sectionConfirmation = false"
                  style="width: 125px;"
               >
                  No
               </button>
            </div>
         </div>
      </div>

      <div v-if="hasCreatedSection" class="popup-overlay">
         <div class="success">
            <p>Section Successfully Created!</p>
            <!-- Add a button or a way to close the overlay -->
            <button
               @click="hasCreatedSection = false; sectionConfirmation = false"
            >
               Close
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import { storeUser } from '@/stores/store.js'
import { storeSection } from '../../stores/storeSection'
import apiClient from '@/axios-setup.js'
import axios from 'axios'
import { storeWeek } from '@/stores/storeWeek.js'
import ErrorPopUp from '@/components/utilities/ErrorPopUp.vue'
export default {
   name: 'InstructorSectionView',
   components: {
      ErrorPopUp,
   },
   data() {
      return {
         listOfTeams: [],
         criteria: [],
         teamName: '',
         rubricName: '',
         maxScore: 0,
         criteriaName: '',
         criteriaDesc: '',
         sectionId: '',
         isLoading: false,
         isRubricDefault: false,
         hasCreatedSection: false,
         hasSubmittedInstructor: false,
         hasCreatedTeams: false,
         storeUser,
         storeSection,
         sectionName: '',
         firstName: '',
         middleName: '',
         lastName: '',
         email: '',
         password: '',
         hasError: false,
         weeksForSemester: [],
         weeksCalculated: false,
         makeOwnRubric: false,
         sectionConfirmation: false,
         startDate: '',
         endDate: '',
         activeSectionRubric : null
      }
   },
   methods: {
      setCurrentSection() {
         apiClient
            .post(`${this.$baseURL}/api/v1/section/setIsCurrentSection`, {
               id: storeSection.selectedSectionId,
            })
            .then((res) => {
               console.log(res)
               this.isLoading = false
               this.hasSetCurrentSection = true
               storeSection.selectedSection()
            })
      },

      resetRubric() {
         this.criteria = []
         this.makeOwnRubric = false
      },

      generateWeekList() {
         if (this.startDate === '' || this.endDate === '') {
            alert('Please enter a start and end date')
            return
         }
         const startDate1 = new Date(this.startDate) // Start date
         const endDate = new Date(this.endDate) // End date
         const weeks = []

         let currentDate = new Date(startDate1)

         let weekId = 1

         while (currentDate.getDay() !== 1) {
            currentDate.setDate(currentDate.getDate() + 1)
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
         this.weeksCalculated = true
      },
      formatDate(date) {
         //Formats date for display on week dropdown
         const day = String(date.getDate()).padStart(2, '0')
         const month = String(date.getMonth() + 1).padStart(2, '0')
         const year = date.getFullYear()

         return `${year}-${month}-${day}`
      },

      addRubric() {
         if(this.criteriaDesc == "" || this.criteriaName == ""){
            alert("Check criteron description/name for errors")
            return;
         }
         this.criteria.push({
            criterionName: this.criteriaName,
            criterionDesc: this.criteriaDesc,
            maxScore: this.maxScore,
         })
         this.maxScore = 0
         this.criteriaName = ''
         this.criteriaDesc = ''
         this.hasError = true
      },
      registerInstructor() {
         axios
            .post(`${this.$baseURL}/api/v1/auth/register/instructor`, {
               firstName: this.firstName,
               middleName: this.middleName,
               lastName: this.lastName,
               id: null,
               email: this.email,
               password: this.password,
               roles: 'admin user',
               sections: null,
            })
            .then((res) => {
               storeUser.updateLoginStatus(res.data.data, true)
               this.hasSubmittedInstructor = true
            })
            .catch((err) => {
               console.log(err)
            })
      },

      getActiveSectionsRubric(){
         var activeSectionId = storeSection.activeSection.id
         apiClient.get(
               `${this.$baseURL}/api/v1/section/getRubric/${activeSectionId}`,
               {}
            )
            .then((response) => {
               

               this.activeSectionRubric =  response.data.data.criteria;
               this.criteria = response.data.data.criteria;
            })
            .catch(error =>{
               console.log(error)
               this.activeSectionRubric = "NO ACTIVE SECTION"
            })
      },

      submitSection() {
         this.isLoading = true
         let rubric = null;
         if (this.isRubricDefault) {
            rubric = {criteria : this.activeSectionRubric};
         }
         else{
            rubric = {
               criteria: this.criteria,
            }
         }

         const dto = {
            id: null,
            name: this.sectionName,
            instructorId: storeUser.userID,
            rubric: this.criteria,
         }
         const weeksToExcludeVar = []
         for (const week of this.weeksForSemester) {
            if (week.execlude) {
               weeksToExcludeVar.push({
                  startDate: week.start,
                  endDate: week.end,
               })
            }
         }
         this.weeksForSemester = []

         const auth = localStorage.getItem('auth')

         apiClient
            .post(
               `${this.$baseURL}/api/v1/section/save`,
               {
                  id: null,
                  name: this.sectionName,
                  instructorId: storeUser.userID,
                  isRubricDefault: this.isRubricDefault,
                  rubric: rubric,
                  startDate: { date: this.startDate },
                  endDate: { date: this.endDate },
                  weeksToExclude: weeksToExcludeVar,
               },
               { headers: { Authorization: `Bearer ${auth}` } }
            )
            .then((res) => {
               console.log(res)
               console.log(res.data.data)
               this.sectionId = res.data.data
               this.hasCreatedSection = true
               this.isLoading = false
               var section = {
                  name: this.sectionName,
                  id: this.sectionId,
                  isCurrent: false,
               }
               storeUser.setSectionId(this.sectionId)
               storeSection.addSection(section)
               this.getWeeksForSection(this.sectionId)
            })
            .catch((err) => {
               console.log(err)
            })
      },
      getWeeksForSection(sectionId) {
         apiClient
            .get(`${this.$baseURL}/api/v1/section/getWeeks/${sectionId}`, {})
            .then((response) => {
               console.log(response)
               storeWeek.setWeekList(response.data.data)
               localStorage.setItem('storeWeek', JSON.stringify(storeWeek))
            })
            .catch((error) => {
               console.log(error)
            })
      },
      setCritera(){
         if(!this.isRubricDefault){
            this.criteria = this.activeSectionRubric
         }
         else{
            this.criteria = []
         }
      }
      
   },
   computed: {
      
   },
   watch: {
      'storeSection.selectedSectionId': function (newVal, oldVal) {},
   },
   created(){
      this.getActiveSectionsRubric();
   }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
   font-family: 'Poppins', sans-serif;
}

.button-group{
   display: flex;
   justify-content: space-evenly;
   width: 100%;
}



.criteria-button{
   width: 35%;
}

.current-rubric{
   margin-bottom: 5%;

}

.create-section{
   width: 60vw;
}

.date-container{
   display: flex;
   justify-content: space-between;
}

.week-list {
   list-style-type: none;
   display: flex;
   flex-direction: column;
}
.week-list li {
   display: flex;
   justify-content: space-around;
   align-items: center;
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
   background: #e4e9f7;
   border: 1px solid #000;
   border-radius: 4px;
   font-size: 14px;
   color: #333;
   margin-bottom: 15px;
   box-sizing: border-box;
}

.uniform-button {
   width: 250px;
   height: 50px;
   margin-top: 20px;
   border-radius: 4px;
   font-size: 16px;
   background: #743ae1;
   color: white;
   border: none;
   /* padding: 10px; */
   cursor: pointer;
   text-transform: uppercase;
   font-weight: bold;
   transition: background-color 0.3s;
   box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.uniform-button:hover {
   background: #5d5076;
}

.overlay {
   position: fixed;
   /* or absolute */
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: rgba(0, 0, 0, 0.5);
   /* Semi-transparent background */
   z-index: 1000;
   /* Ensure it's above other content */
}

.conformation-popup{
    display: flex;
    flex-direction: column;
    z-index: 1000;
    color: black;
    background-color: white; /* Adjusted to TCU purple */
    padding: 50px; /* Adjust padding for better spacing */
    border-radius: 8px; /* Add rounded corners */
    align-items: center; /* Center the items horizontally */
}

/* Style for the success message box */
.success {
   padding: 20px;
   background: white;
   border-radius: 8px;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   text-align: center;
   max-width: 400px;
   width: 80%;
   /* Responsive width */
   z-index: 1001;
   /* Above the overlay */
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
   box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}


button:hover {
   background: #11101d;
}

.checkbox-container {
   display: flex;
   align-items: center;
   /* Align label and checkbox vertically */
   color: #5d5076;
   /* Set color to default */
}

.checkbox-container input[type='checkbox'] {
   margin-left: 400px;
   margin-right: 8px;
   /* Adjust the margin between the checkbox and the text */
   /* Hide default checkbox appearance */
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
   /* Define custom checkbox appearance */
   width: 20px;
   height: 20px;
   border: 2px solid #5d5076;
   border-radius: 3px;
   cursor: pointer;
   outline: none;
   position: relative;
   /* Position relative for absolute positioning of the tick */
}

/* Custom checkbox checked state */
.checkbox-container input[type='checkbox']:checked {
   background-color: #5d5076;
}

/* Custom checkbox checked state icon (tick) */
.checkbox-container input[type='checkbox']:checked::after {
   content: '\2714';
   /* Unicode character for checkmark */
   display: block;
   text-align: center;
   color: white;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   /* Center the tick horizontally and vertically */
   font-size: 80%;
   /* Set the tick size relative to checkbox dimensions */
}

.week-list {
   list-style-type: none;
   /* Remove bullet points */
   padding: 0;
   /* Remove default padding */
}

.week-list li {
   display: flex;
   /* Use flexbox for horizontal alignment */
   align-items: center;
   /* Center items vertically */
   margin-bottom: 5px;
   /* Add some vertical spacing between list items */
}

.week-list li input[type='checkbox'] {
   margin-right: 10px;
   /* Add some spacing between checkbox and label */
}

.week-list li input[type='checkbox'] {
   margin-right: 10px;
   /* Add some spacing between checkbox and label */
   /* Custom checkbox styles */
   -webkit-appearance: none;
   /* Remove default styles */
   -moz-appearance: none;
   appearance: none;
   width: 20px;
   /* Set width and height for the checkbox */
   height: 20px;
   border: 2px solid #5d5076;
   /* Border color */
   border-radius: 4px;
   /* Rounded corners */
   outline: none;
   /* Remove outline */
   cursor: pointer;
   /* Show pointer cursor on hover */
}

.week-list li input[type='checkbox']:checked {
   background-color: #5d5076;
   /* Change background color when checked */
}

.week-list li input[type='checkbox']::before {
   content: '';
   /* Hide default checkbox */
   display: block;
   width: 12px;
   /* Set width and height for the checkmark */
   height: 7px;
   border-style: solid;
   border-width: 0 2px 2px 0;
   /* Create a diagonal checkmark */
   border-color: white;
   /* Checkmark color */
   transform: rotate(45deg);
   /* Rotate the checkmark */
   position: absolute;
   /* Position the checkmark */
   top: 4px;
   left: 6px;
   opacity: 0;
   /* Hide the checkmark by default */
}

.week-list li input[type='checkbox']:checked::before {
   opacity: 1;
   /* Show the checkmark when checked */
}
</style>
