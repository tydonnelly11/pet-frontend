import { reactive } from 'vue'

export const storeUser = reactive({
  userID: null,
  isLoggedIn: false,
  userFullName: null,
  sectionId: null,
  teamId: null,
  // Method to update the store
  updateLoginStatus(id, status) {
      this.userID = id;
      this.isLoggedIn = status;
  },
  setSectionId(id) {
      this.sectionId = id;
  },
  setTeamId(id) {
      this.teamId = id;
  },
  setName(first,last)
  {
      this.userFullName = first + " " + last;
  }
});