import { reactive } from 'vue'

export const storeWeek = reactive({
    currentWeek: null,
    currentWeekId : null,
    selectedWeekId: "",
    selectedWeek: null,
    weeksForSemester: [],
    calcCurrentWeek() {
        
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        var yyyy = today.getFullYear()
        today = mm + '-' + dd + '-' + yyyy
        var previousWeek = undefined;
        let currentWeek = undefined;
        for (let week of this.weeksForSemester) {
            if (today >= week.start && today <= week.end) {
               currentWeek = week;
               break;
            } else if (today > week.end) {
               previousWeek = week; 
            }
         }
        
      
         if (currentWeek) {
            this.currentWeekId = currentWeek.id;
            this.currentWeek = currentWeek;
            this.selectedWeekId = String(currentWeek.id);
            this.selectedWeek = currentWeek;
            
        } else if (previousWeek) {
            // If no current week is found, and there's a previous week, set to the previous week
            this.currentWeekId = previousWeek.id;
            this.currentWeek = previousWeek;
            this.selectedWeekId = String(previousWeek.id);
            this.selectedWeek = previousWeek;
        } else {
            // If no current week is found, and there's no previous week, set to the first week
            this.currentWeekId = this.weeksForSemester[0].id;
            this.currentWeek = this.weeksForSemester[0];
            this.selectedWeekId = String(this.weeksForSemester[0].id);
            this.selectedWeek = this.weeksForSemester[0];
        }
        
        

    },

    setWeekList(weekList) {
      this.weeksForSemester = [];
      if(weekList == null || weekList.length == 0){

      }
      else{
         for(const week of weekList){
            this.weeksForSemester.push({
               id: week.id,
               start: this.formatDate(week.week.startDate.formattedDate),
               end: this.formatDate(week.week.endDate.formattedDate)
            
            })
         
         }
         this.weeksForSemester.sort((a, b) => a.id - b.id);
         this.calcCurrentWeek()
      }
      
      
   },

     formatDate(date) {
        //Formats date for display on week dropdown
        const year = date.split("-")[0]
        const month = date.split("-")[1]
        const day = date.split("-")[2]

        return `${month}-${day}-${year}`
     },
      updateSelectedWeek(week) {
        

         this.selectedWeekId = String(week.id)
         this.selectedWeek = week
       },

      convertWeekFormat(week) {
         var weekStart = week.start
         var weekEnd = week.end
         return weekStart + ' to ' + weekEnd
      },

      //ARCHIVE
      // setWeekList() {
      //    //Sets the week list for the dropdown menu
      //    //Will be removed probably
      //    const startDate = new Date('August 21, 2023') // Start date
      //    const endDate = new Date('May 6, 2024') // End date
      //    const weeks = []
 
      //    let currentDate = new Date(startDate)
 
      //    let weekId = 1
      //    while (currentDate <= endDate) {
      //       const startOfWeek = new Date(currentDate)
      //       const endOfWeek = new Date(currentDate)
      //       endOfWeek.setDate(endOfWeek.getDate() + 6)
 
      //       weeks.push({
      //          id: weekId,
      //          start: this.formatDate(startOfWeek),
      //          end: this.formatDate(endOfWeek),
      //       })
 
      //       currentDate.setDate(currentDate.getDate() + 7) // Move to the next week
      //       weekId++
      //    }
      //    this.weeksForSemester = weeks


});