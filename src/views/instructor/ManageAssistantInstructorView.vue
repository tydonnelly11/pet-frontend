<template>
    <h2>Active Instructors</h2>
    <div class="instructor" v-if="activeInstructors.length != 0" v-for="instructor in activeInstructors">
        <button @click="viewInstructor(instructor)">{{ instructor.firstName }} {{ instructor.lastName }}</button>
        <button @click="deactivateInstructor(instructor)">Deactivate</button>
        <!-- <div v-if="instructor." -->


    </div>
    <div v-else>
        <p>No Active Instructors</p>
    </div>
    

    <h2>Inactive Instructors</h2>
    <div v-if="inactiveInstructors.length != 0" v-for="instructor in inactiveInstructors">
        <label>{{ instructor.firstName }} {{ instructor.lastName }}</label>
        <button @click="activateInstructor(instructor)">Activate</button>
    </div>
    <div v-else>
        <p>No Inactive Instructors</p>
    </div>


</template>

<script>
import apiClient from '../../axios-setup';

export default {
    name: 'ManageAssistantInstructorView',
    data() {
        return {
            activeInstructors: [],
            inactiveInstructors: [],
            isLoading: false
        }
    },
    props: {
        
    },
    computed: {
        
    },
    
    methods: {
        getAllInstructors(){
            this.inactiveInstructors = []
            this.activeInstructors = []
            this.isLoading = true
            apiClient.get(`${this.$baseURL}/api/v1/assistantInstructor/getAllInstructors`, {

            })
            .then(response => {
                console.log(response)
                if(response.data.data == null){
                    this.isLoading = false
                    return
                }
                else{
                    for(const instructor of response.data.data){
                    if(instructor.isActive){
                        this.activeInstructors.push(instructor)
                    }
                    else{
                        this.inactiveInstructors.push(instructor)
                    
                    }
                }
                }
                
                this.isLoading = false
            })
            .catch(error => {
                console.log(error)
                this.isLoading = false
            })
        },

        activateInstructor(instructor){
            this.isLoading = true
            apiClient.post(`${this.$baseURL}/api/v1/assistantInstructor/activate`,{
                id : instructor.id

            }).then(response => {
                console.log(response)
                this.isLoading = false
                this.getAllInstructors();

            }).catch(error => {
                console.log(error)
                this.isLoading = false
            })

        },
        deactivateInstructor(instructor){
            this.isLoading = true
            apiClient.post(`${this.$baseURL}/api/v1/assistantInstructor/deactivate`,{
                id: instructor.id

            }).then(response => {
                console.log(response)
                this.isLoading = false
                this.getAllInstructors();


            }).catch(error => {
                console.log(error)
                this.isLoading = false
            })
        }
        
    },
    created() {
        this.getAllInstructors();
    }
}

</script>

<style>
.instructor {
   display: flex;
   flex-direction: row;
}

</style>