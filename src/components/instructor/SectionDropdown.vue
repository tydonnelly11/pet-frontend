<template>
    <div class="dropdown-center">
      <a
         class="btn btn-primary dropdown-toggle"
         href="#"
         role="button"
         data-bs-toggle="dropdown"
         aria-expanded="false"
         :style="'width: 50%;'"
      >
         {{
            storeSection.selectedSectionName
         }}
      </a>

      <ul class="dropdown-menu" :style="'columns : 3;'">
         <li
            v-for="section in storeSection.sections"
            :value="section.id"
            @click="storeSection.setSpecificSection(section)"
         >
            <!--@Click Sends week to parent-->

            <a class="dropdown-item" href="#">{{ section.name }}</a>
         </li>
      </ul>
   </div>
</template>

<script>
import { storeUser } from '@/stores/store';
import { storeSection } from '../../stores/storeSection';
export default {
    name: 'SectionDropdown',
    props: {
       
    },
    data() {
       return {
          storeSection,
          storeUser

       }
    },
}

</script>

<style scoped>

</style>