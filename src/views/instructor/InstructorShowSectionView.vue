<template>
    <div class="sections-container" style="margin-top: 40px;">
        <div v-for="section in storeSection.sections" :key="section.name" class="section-tile" @click="viewSection(section)">
          <h2>
            {{ section.name }}
          </h2>
        </div>
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
            localStorage.setItem('storeSection', JSON.stringify(storeSection))
            this.$router.push('/instructorhome/editteams')
        },
        
        getWeeksForSection(sectionId)
        {
        apiClient.get(`${this.$baseURL}api/v1/section/getWeeks/${sectionId}`, {

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

<style>
.sections-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px; /* adjust the space between tiles */
  padding: 10px; /* space around the container */
}

.section-tile {
  /* ... other styles ... */
  flex: 0 0 auto;  /* Increased flex-basis */
  max-width: 50%; /* Increased max-width */
  max-height: 50%;
  padding: 20px;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background-color: #4E2A84;
  color: aliceblue;
  border-radius: 4px;
}

/* Hover effect */
.section-tile:hover {
  transform: translateY(-5px); /* lift tile up */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* shadow effect */
  cursor: pointer;
}

@media (min-width: 600px) {
  .sections-container {
    justify-content: space-between;
  }
}

/* Responsive adjustments for smaller screens */
@media (max-width: 600px) {
  .section-tile {
    flex-basis: calc(50% - 10px); /* adjust for smaller screens */
    max-width: calc(50% - 10px); /* adjust for smaller screens */
  }
}
.section-tile h2 {
  font-size: 1.2em; /* Adjust the font size as needed */
  white-space: nowrap; /* Keep the text on one line */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflow */
  max-width: 100%; /* Set max width to 100% of the parent container */
  margin: 0 0 10px; /* Adjust margins as needed */
  word-wrap: break-word; /* Break the word to the next line if it's too long */
}
</style>