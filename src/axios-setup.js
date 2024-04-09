import axios from 'axios'
import router from '@/router/router.js'
let auth = localStorage.getItem('auth')
/*
This is a axios instance thats used to send users 
back to login if there token exires as well as being able to refresh page and
stay logged in
*/
const apiClient = axios.create({
   baseURL: '${this.$baseURL}/',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
})

const savedState5 = localStorage.getItem('auth')

if (savedState5) {
   auth = savedState5
}

export function setAuthHeader(token) {
   apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

apiClient.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      if (error.response.status === 401) {
         router.push('/login')
         localStorage.removeItem('logginstatus')
         localStorage.removeItem('auth')
         localStorage.removeItem('storeUser')
         localStorage.removeItem('storeSection')
         localStorage.removeItem('storeWeek')
         localStorage.removeItem('storeTeam')
      }
      return Promise.reject(error)
   }
)

export default apiClient
