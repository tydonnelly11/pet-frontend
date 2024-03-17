<template>
    <div v-for="section in storeSection.sections">
        <button @click="viewSection(section)">{{ section.name }}</button>

    </div>

</template>

<script>
import { storeSection } from '@/stores/storeSection.js';
import { storeWeek } from '@/stores/storeWeek.js';
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
            console.log(section)
            storeSection.setSelectedSection(section)
            let id = 1;
            for(const week of section.weeks){
                week.id = id;
                id++;

            }
            storeWeek.setWeekList(section.weeks)
            localStorage.setItem('storeWeek', JSON.stringify(storeWeek))
            this.$router.push('/instructorhome/editteams')
        }
        
    },
    created() {
        
    }
}

</script>

<style scoped>

</style>