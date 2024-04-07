<template>
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
   <div class="create-section" style="margin-top: 20px;">
      <h2 style="color: #5d5076;">Enter Details below to create a new section</h2>
      <div class="input-field">
         <label style="font-weight: bold; font-size: 20px; margin-top: 10px;"></label>
         <input type="text" id="sectionName" v-model="sectionName" placeholder="Enter section name" required />

      </div>
      <div class="input-field">
         <div class="checkbox-container">
            <label style="font-weight: bold; font-size: 20px; margin-top: 10px;">Check to use last year's
               rubric:</label>
            <input type="checkbox" id="defaultRubric" v-model="isRubricDefault" />
         </div>
      </div>

      <div class="input-field">
         <button @click="makeOwnRubric = true" style="border-radius: 12px">Click to make own rubric</button>
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
         <button type="submit" @click="addRubric" style="border-radius: 12px">Add Criteria</button>

         <div class="list-of-rubrics">
            <h2>List of Criteria</h2>
            <div class="rubric" v-for="rubric in criteria">
               <p>Name: {{ rubric.criterionName }}</p>
               <p>Description: {{ rubric.criterionDesc }}</p>
               <p>Max Score: {{ rubric.maxScore }}</p>

            </div>
         </div>
         <button @click="resetRubric()" style="border-radius: 12px">Cancel rubric creation</button>
      </div>

      <div>
         <label for="start-date"
            style="font-weight: bold; font-size: 20px; margin-top: 10px; color: #5d5076; margin-bottom: 10px;">Start
            Date:</label>
         <input type="date" id="start-date" v-model="startDate" />

         <label for="end-date"
            style="font-weight: bold; font-size: 20px; margin-top: 10px; color: #5d5076; margin-bottom: 10px; margin-left: 10px;">End
            Date:</label>
         <input type="date" id="end-date" v-model="endDate" />

         <button @click="generateWeekList" style="border-radius: 12px">Calculate Weeks</button>
         <div v-if="weeksCalculated">
            <h4>Check the boxes for weeks you want to exclude from a section</h4>
 css-fixes-final
            <ul v-if="weeksForSemester.length > 0" class="week-list">
               <li v-for="(week, index) in weeksForSemester" :key="index">
                  <input type="checkbox" :id="'week-' + index" v-model="week.execlude">
                  <label :for="'week-' + index">{{ week.start }} - {{ week.end }}</label>

            <ul class="week-list" v-if="weeksForSemester.length > 0">
               <li v-for="(week, index) in weeksForSemester" :key="index">
               <input type="checkbox" :id="'week-' + index" v-model="week.execlude">
               <label :style="'flex-basis: 50%; display: flex;'" :for="'week-' + index">{{ week.start }} - {{ week.end }}</label>
 main
               </li>
            </ul>
         </div>


      </div>



      <button type="submit" @click="this.sectionConfirmation = true"
         style="margin-top: 40px; border-radius: 12px">Create Section</button>
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
            <button @click="hasCreatedSection = false; sectionConfirmation = false;">Close</button>
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
         sectionConfirmation: false,





      }
   },
   methods: {

 css-fixes-final
      setCurrentSection() {
         apiClient.post(`${this.$baseURL}/api/v1/section/setIsCurrentSection`, {
            id: storeSection.selectedSectionId

      setCurrentSection(){
         apiClient.post(`${this.$baseURL}/api/v1/section/setIsCurrentSection`, {
            id : storeSection.selectedSectionId
 main
         })
            .then(res => {
               console.log(res)
               this.isLoading = false
               this.hasSetCurrentSection = true
               storeSection.selectedSection()
            });
      },

      resetRubric() {
         this.criteria = []
         this.makeOwnRubric = false
      },


      generateWeekList() {
         if (this.startDate === "" || this.endDate === "") {
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
         axios.post(`${this.$baseURL}/api/v1/auth/register/instructor`, {
 css-fixes-final
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            id: null,
            email: this.email,
            password: this.password,
            roles: "admin user",
            sections: null,
         })

               firstName: this.firstName,
               middleName: this.middleName,
               lastName: this.lastName,
               id: null,
               email: this.email,
               password: this.password,
               roles : "admin user",
               sections : null,
            })
 main
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
            criteria: this.criteria

         }
         if (this.isRubricDefault) {
            rubric = null;
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
                  endDate: week.end
               })
            }



         }
         this.weeksForSemester = []

         const auth = localStorage.getItem('auth')

 css-fixes-final

         apiClient.post(`${this.$baseURL}/api/v1/section/save`, {
            id: null,

         
         apiClient.post(`${this.$baseURL}/api/v1/section/save`, {
            id : null,
 main
            name: this.sectionName,
            instructorId: storeUser.userID,
            isRubricDefault: this.isRubricDefault,
            rubric: rubric,
            startDate: { date: this.startDate },
            endDate: { date: this.endDate },
            weeksToExclude: weeksToExcludeVar,
         },
            { headers: { 'Authorization': `Bearer ${auth}` } }
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
               this.getWeeksForSection(this.sectionId)

            })
            .catch(err => {
               console.log(err)
            })
      },
 css-fixes-final


      getWeeksForSection(sectionId)
        {
        apiClient.get(`http://localhost:80/api/v1/section/getWeeks/${sectionId}`, {

        })
        .then(response => {
            console.log(response)
            storeWeek.setWeekList(response.data.data)
            localStorage.setItem('storeWeek', JSON.stringify(storeWeek));
        })
        .catch(error => {
            console.log(error)
        })
        }
      
 main
   },
   computed: {},
   watch: {
      'storeSection.selectedSectionId': function (newVal, oldVal) {

      }
   }
}

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
   font-family: 'Poppins', sans-serif;
}

.week-list{
   list-style-type: none;
   display: flex;
   flex-direction: column;
}
.week-list li{
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
   background: #E4E9F7;
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
   padding: 10px;
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
   margin-top: 20px;
   box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

button:hover {
   background: #11101D;
}

.checkbox-container {
   display: flex;
   align-items: center;
   /* Align label and checkbox vertically */
   color: #5d5076;
   /* Set color to default */
}

.checkbox-container input[type="checkbox"] {
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
.checkbox-container input[type="checkbox"]:checked {
   background-color: #5d5076;
}

/* Custom checkbox checked state icon (tick) */
.checkbox-container input[type="checkbox"]:checked::after {
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

.week-list li input[type="checkbox"] {
   margin-right: 10px;
   /* Add some spacing between checkbox and label */

}

.week-list li input[type="checkbox"] {
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

.week-list li input[type="checkbox"]:checked {
   background-color: #5d5076;
   /* Change background color when checked */
}

.week-list li input[type="checkbox"]::before {
   content: "";
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

.week-list li input[type="checkbox"]:checked::before {
   opacity: 1;
   /* Show the checkmark when checked */
}
</style>