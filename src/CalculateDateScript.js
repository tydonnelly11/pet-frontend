export const getCurrentWeek = () => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd
    var currentWeek = this.displayedWeeks.findIndex(week => {
       var weekStart = week.start
       var weekEnd = week.end
       return today >= weekStart && today <= weekEnd
    })
    if(currentWeek == -1){
       
       currentWeek = this.defaultCurrentWeek.id
    }
    
    return currentWeek
}