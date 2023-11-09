<template>
   <div class="dropdown-center">
      <a
         class="btn btn-primary dropdown-toggle"
         href="#"
         role="button"
         data-bs-toggle="dropdown"
         aria-expanded="false"
         :style="'width: 30%;'"
      >
         {{ hasSelectedWeek ? this.selectWeek : this.currentWeek }}
      </a>

      <ul class="dropdown-menu" :style="'columns : 3;'">
         <li
            v-for="week in weeks"
            :value="week.value"
            @click="$emit('selectWeek', week)"
         >
            <!--Sends week to parent-->
            <a class="dropdown-item" href="#">{{ week }}</a>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   name: 'WeekDropdown',
   props: {
      weeks: Array,
      selectWeek: String,
      currentWeek: String,
   },
   data() {
      return {
         hasSelectedWeek: hasSelectedWeek(),
      }
   },
   methods: {
      selectWeek(week) {
         return week
      },
      getCurrentWeek() {
         var today = new Date()
         var dd = String(today.getDate()).padStart(2, '0')
         var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
         var yyyy = today.getFullYear()
         today = yyyy + '-' + mm + '-' + dd
         var currentWeek = this.weeks.find((week) => {
            var weekStart = week.split(' ')[0]
            var weekEnd = week.split(' ')[2]
            return today >= weekStart && today <= weekEnd
         })
         return currentWeek
      },
   },
   computed: {
      hasSelectedWeek() {
         return this.selectWeek ? true : false
      },
   },

   //Note for future self while doing visual only, so i think I
   //should try to emit event to warList which I think will handle what week is
   //in the little row as well as adding rows
   //also look at bootstrap docs
}
</script>

<style scoped></style>
