<template>
   <div class="student-pe-container">
      <WeekDropdown
         :currentWeek="currentWeekVar"
         :selectWeek="this.selectedWeek"
         :displayedWeeks="weeks"
         @select-week="setSelectedWeek"
      />
      <!--@select-week is the emit from child component with week as first arg of the func-->

      <PeerEvalTable :peerEval="evaluationData" />
   </div>
</template>

<script>
import axios from 'axios'
import PeerEvalTable from '../components/student/PeerEvalTable.vue'
import WeekDropdown from '../components/WeekDropdown.vue'
import { ref } from 'vue'
export default {
   name: 'StudentPeerEvalView',
   props: {},
   data() {
      return {
         weeks: [
            '2023-09-01 to 2023-09-03',
            '2023-09-04 to 2023-09-10',
            '2023-09-11 to 2023-09-17',
            '2023-09-18 to 2023-09-24',
            '2023-09-25 to 2023-10-01',
            '2023-10-02 to 2023-10-08',
            '2023-10-09 to 2023-10-15',
            '2023-10-16 to 2023-10-22', //This will prolly be
            '2023-10-23 to 2023-10-29',
            '2023-10-30 to 2023-11-05',
            '2023-11-06 to 2023-11-12',
            '2023-11-13 to 2023-11-19',
            '2023-11-20 to 2023-11-26',
            '2023-11-27 to 2023-12-03',
            '2023-12-04 to 2023-12-10',
            '2023-12-11 to 2023-12-15',
         ],
         selectedWeek: ref(null),
         evaluationData: [
         {
         evaluateeFirstName: "Jonathan",
         evaluateeMiddleName: null,
         evaluateeLastName: "Doe",
         week: "week1",
         comment: "Great teamwork and communication.",
         ratings: [
            {
               score: 5,
               criterion: {
               criterionDesc: "Teamwork",
               maxScore: 5
               }
            },
            {
               score: 5,
               criterion: {
               criterionDesc: "Communication",
               maxScore: 5
               }
            }
         ]
         }
      ]
   }
},
   /*
                                Logic for this container might be to have weeks as dropdown, 
                                when you select Week, it will load the PeerEvalTable component for 
                                that week, and then you can submit the form for that week.

                                Unsure if I want this component handling sending data
                                 or if i want the PeerEvalTable component to handle sending data
                                */
   components: {
      PeerEvalTable,
      WeekDropdown,
   },
   methods: {
      getPeerEvalEntriesForWeek(week) {
         axios
            .get('http://localhost:3000/peer-eval-entries', {
               params: {
                  week: week,
               },
            })
            .then((response) => {
               this.peerEvalEntriesForWeek = response.data
            })
            .catch((error) => {
               console.log(error)
            })
         },
      setSelectedWeek(week) {
         if (this.selectedWeek == null) {
            this.selectedWeek = this.getCurrentWeek()
         } else {
            this.selectedWeek = week
         }

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
      currentWeekVar() {
         return this.getCurrentWeek()
      },
   },
   mounted() {
      this.setSelectedWeek()
   },
}
</script>

<style scoped>
.student-pe-container {
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin-top: 5%;
}
</style>
