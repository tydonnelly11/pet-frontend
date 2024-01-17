import { reactive } from 'vue'

export const storeUser = reactive({
  studentId: null,
  isLoggedIn: false,
  studentName: null,
  // Method to update the store
  updateLoginStatus(id, status) {
      this.studentId = id;
      this.isLoggedIn = status;
  }
});