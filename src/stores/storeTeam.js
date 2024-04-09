import { reactive } from 'vue'
import { storeUser } from './store.js'

export const storeTeam = reactive({
   teamMembers: [],
   student: {
      name: 'null',
      id: 'null',
   },
   setTeamMembers(members) {
      const team = []
      for (const item of members) {
         const student = {
            name: item.firstName + ' ' + item.lastName,
            id: item.id,
            lastName: item.lastName,
            firstName: item.firstName,
         }
         if (item.id == storeUser.userID) {
            continue
         } else {
            team.push(student)
         }
      }
      this.teamMembers = team
   },
})
