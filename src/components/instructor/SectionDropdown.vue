<template>
   <div class="dropdown-center">
      <a
         class="btn btn-custom-color dropdown-toggle"
         href="#"
         role="button"
         data-bs-toggle="dropdown"
         aria-expanded="false"
      >
         {{ storeSection.selectedSectionName }}
      </a>

      <ul class="dropdown-menu" :style="'columns : 3;'">
         <li
            v-for="section in storeSection.sections"
            :value="section.id"
            @click="storeSection.setSelectedSection(section)"
         >
            <!--@Click Sends week to parent-->

            <a class="dropdown-item" href="#">{{ section.name }}</a>
         </li>
      </ul>
   </div>
</template>

<script>
import { ref, toRaw } from 'vue'
import { storeSection } from '../../stores/storeSection'
export default {
   name: 'SectionDropdown',
   props: {},
   data() {
      return {
         storeSection,
      }
   },
   methods: {
      convertWeekFormat(week) {
         var weekStart = week.start
         var weekEnd = week.end
         return weekStart + ' to ' + weekEnd
      },
   },
   computed: {},
   mounted() {},

   //Note for future self while doing visual only, so i think I
   //should try to emit event to warList which I think will handle what week is
   //in the little row as well as adding rows
   //also look at bootstrap docs
}
</script>

<style scoped>

.btn-custom-color {
    background-color: #743ae1; /* Custom background color */
    color: white; /* Text color */
}

.btn-custom-color:hover, .btn-custom-color:focus {
    background-color: #743ae1;
    color: white; /* Darker shade for hover/focus */
}

</style>
