<template>
    <div v-for="section in storeSection.sections">
        <button @click="viewSection(section)">{{ section.name }}</button>

    </div>

</template>

<script>
import { storeSection } from '@/stores/storeSection.js';
import { storeWeek } from '@/stores/storeWeek.js';
import apiClient from '../../axios-setup';
export default {
    name: 'InstructorShowSectionView',
    data() {
        return {
            storeSection,storeWeek
        }
    },
    props: {
        
    },
    computed: {
        
    },
    
    methods: {
        viewSection(section){
            
            storeSection.setSelectedSection(section)
            this.getWeeksForSection(section.id)
            
            localStorage.setItem('storeWeek', JSON.stringify(storeWeek))
            this.$router.push('/instructorhome/editteams')
        },
        
        getWeeksForSection(sectionId)
        {
        apiClient.get(`https://www.peerevaltool.xyz/api/v1/section/getWeeks/${sectionId}`, {

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
        
    },
    created() {
        
    }
}

</script>

<style scoped>

</style>