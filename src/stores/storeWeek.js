import { reactive } from 'vue'

export const storeWeek = reactive({
   currentWeek: null,
   currentWeekId: null,
   selectedWeekId: '',
   selectedWeek: null,
   weeksForSemester: [],
   calcCurrentWeek() {
      this.setWeekList()

      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = today.getFullYear()
      today = mm + '-' + dd + '-' + yyyy
      var currentWeek = this.weeksForSemester.find((week) => {
         var weekStart = week.start
         var weekEnd = week.end

         return today >= weekStart && today <= weekEnd
      })
      this.currentWeekId = currentWeek.id
      this.currentWeek = currentWeek
      if (this.selectedWeekId == '') {
         this.selectedWeekId = String(currentWeek.id)
         this.selectedWeek = currentWeek
      }
   },

   setWeekList() {
      //Sets the week list for the dropdown menu
      //Will be removed probably
      const startDate = new Date('August 21, 2023') // Start date
      const endDate = new Date('May 6, 2024') // End date
      const weeks = []

      let currentDate = new Date(startDate)

      let weekId = 1
      while (currentDate <= endDate) {
         const startOfWeek = new Date(currentDate)
         const endOfWeek = new Date(currentDate)
         endOfWeek.setDate(endOfWeek.getDate() + 6)

         weeks.push({
            id: weekId,
            start: this.formatDate(startOfWeek),
            end: this.formatDate(endOfWeek),
         })

         currentDate.setDate(currentDate.getDate() + 7) // Move to the next week
         weekId++
      }
      this.weeksForSemester = weeks
   },
   formatDate(date) {
      //Formats date for display on week dropdown
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      return `${month}-${day}-${year}`
   },
   updateSelectedWeek(week) {
      console.log(week)
      console.log('CHANGING WEEK')

      this.selectedWeekId = String(week.id)
      this.selectedWeek = week
      console.log(this.selectedWeekId)
   },

   convertWeekFormat(week) {
      var weekStart = week.start
      var weekEnd = week.end
      return weekStart + ' to ' + weekEnd
   },
})
