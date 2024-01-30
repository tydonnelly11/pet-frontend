import { reactive } from 'vue'

export const storeUser = reactive({
  userID: null,
  isLoggedIn: false,
  userFullName: null,
  sectionId: null,
  teamId: null,
  firstName: null,
  lastName: null,
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
    this.firstName = first;
    this.lastName = last;
      this.userFullName = first + " " + last;
  },
  logoutUser(){
        this.userID = null;
        this.isLoggedIn = false;
        this.userFullName = null;
        this.sectionId = null;
        this.teamId = null;
  }
});