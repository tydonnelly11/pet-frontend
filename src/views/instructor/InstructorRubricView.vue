<template>
   <SectionDropdown :style="'position : relative; top : 50px;'"/>
   <div class="rubric-container">
   <div v-if="isLoading" class="popup-overlay">
      <img src="/img/loading-gif.gif" />
   </div>
   <table v-if="hasLoaded">
      <thead>
         <tr>
            <th scope="col">Criteria Name</th>
            <th scope="col">Description</th>
            <th scope="col">Max Score</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="criterion of this.rubric">
            <td scope="col">{{ criterion.criterionName }}</td>
            <td scope="col">{{ criterion.criterionDesc }}</td>
            <td scope="col">{{ criterion.maxScore }}</td>
         </tr>
      </tbody>
   </table>
   </div>
</template>

<script>
import { storeSection } from '../../stores/storeSection'
import SectionDropdown from '@/components/instructor/SectionDropdown.vue'
import apiClient from '@/axios-setup.js'

export default {
   name: 'InstructorRubricView',
   components: {
      SectionDropdown,
   },
   data() {
      return {
         storeSection,
         rubric: null,
         isLoading: false,
         hasLoaded: false,
      }
   },
   methods: {
      getRubric() {
         this.isLoading = true
         this.hasLoaded = false
         const auth = localStorage.getItem('auth')

         apiClient
            .get(
               `${this.$baseURL}/api/v1/section/getRubric/${storeSection.selectedSectionId}`,
               {
                  headers: { Authorization: `Bearer ${auth}` },
               }
            )
            .then((response) => {
               this.isLoading = false
               this.hasLoaded = true

               this.rubric = response.data.data.criteria
            })
      },
   },
   computed: {},
   watch: {
      'storeSection.selectedSectionId': function (newVal, oldVal) {
         // Call your function here
         this.getRubric()
      },
   },
   created() {
      this.getRubric()
   },
}
</script>

<style scoped>
.rubric-container{
   position: relative;
   top: 15%;
}

td{
   font-size: 1.25rem;
   padding: 10px;
}
th{
   font-size: 1.5rem;
   padding: 25px;

}
</style>
