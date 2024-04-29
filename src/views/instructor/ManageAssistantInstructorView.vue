<template>
   <div class="assist-instructors-container">
      <div class="active-ins">
   <h2>Active Instructors</h2>
   <div
      class="instructor"
      v-if="activeInstructors.length != 0"
      v-for="instructor in activeInstructors"
   >
      <p class="instructor-label" @click="viewInstructor(instructor)">
         {{ instructor.firstName }} {{ instructor.lastName }}
      </p>
      <button class="remove-btn" @click="deactivateInstructor(instructor)">Deactivate</button>
      <!-- <div v-if="instructor." -->
   </div>
   
   <div v-else>
      <p>No Active Instructors</p>
   </div>
</div>


<div class="inactive-ins">

   <h2>Inactive Instructors</h2>
   <div class="instructor"
      v-if="inactiveInstructors.length != 0"
      v-for="instructor in inactiveInstructors"
   >
      <label class="instructor-label">{{ instructor.firstName }} {{ instructor.lastName }}</label>
      <button class="add-btn" @click="activateInstructor(instructor)">Activate</button>
   </div>
   <div v-else>
      <p>No Inactive Instructors</p>
   </div>
</div>
</div>
</template>

<script>
import apiClient from '../../axios-setup'

export default {
   name: 'ManageAssistantInstructorView',
   data() {
      return {
         activeInstructors: [],
         inactiveInstructors: [],
         isLoading: false,
      }
   },
   props: {},
   computed: {},

   methods: {
      getAllInstructors() {
         this.inactiveInstructors = []
         this.activeInstructors = []
         this.isLoading = true
         apiClient
            .get(
               `${this.$baseURL}/api/v1/assistantInstructor/getAllInstructors`,
               {}
            )
            .then((response) => {
               console.log(response)
               if (response.data.data == null) {
                  this.isLoading = false
                  return
               } else {
                  for (const instructor of response.data.data) {
                     if (instructor.isActive) {
                        this.activeInstructors.push(instructor)
                     } else {
                        this.inactiveInstructors.push(instructor)
                     }
                  }
               }

               this.isLoading = false
            })
            .catch((error) => {
               console.log(error)
               this.isLoading = false
            })
      },

      activateInstructor(instructor) {
         this.isLoading = true
         apiClient
            .post(`${this.$baseURL}/api/v1/assistantInstructor/activate`, {
               id: instructor.id,
            })
            .then((response) => {
               console.log(response)
               this.isLoading = false
               this.getAllInstructors()
            })
            .catch((error) => {
               console.log(error)
               this.isLoading = false
            })
      },
      deactivateInstructor(instructor) {
         this.isLoading = true
         apiClient
            .post(`${this.$baseURL}/api/v1/assistantInstructor/deactivate`, {
               id: instructor.id,
            })
            .then((response) => {
               console.log(response)
               this.isLoading = false
               this.getAllInstructors()
            })
            .catch((error) => {
               console.log(error)
               this.isLoading = false
            })
      },
   },
   created() {
      this.getAllInstructors()
   },
}
</script>

<style scoped>

.assist-instructors-container{
   position: relative;
   top: 25%;
   display: flex;
   flex-direction: column;
   height: 25vh;
   justify-content: space-around;
}
.instructor {
   display: flex;
   flex-direction: row;
   gap: 20px;
}

.instructor-label{
   background-color: #4E2A84;
   font-size: 1.5em;
   font-weight: 500;
    color: white;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    width: 80%;
    height: 75px;
    text-align: center;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.remove-btn {
  background-color: #FF4136; /* Bright red for remove buttons */
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  max-width: 200px;
  height: 75px;
  padding: 0;
  width: 100px;
}

.add-btn{
  background-color: #28a745; /* Bright red for remove buttons */
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  max-width: 200px;
  height: 75px;
  width: 100px;
  padding: 0;
}
</style>
