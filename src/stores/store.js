import { defineStore } from 'pinia' 
import textData from '@/data/locaWeb_textData.json'

export const useStore = defineStore('store', {
  state: () => ({
    jsonData: textData,
    isUserLogged: false,
    userToken: null,
    username: null,
    choosedPlan: null
  }),
  actions: {
    setUserLogin(state, token, username) {
      this.isUserLogged = state
      this.userToken = token
      this.username = username

      if (state) {
        localStorage.setItem('userToken', token)
        localStorage.setItem('userName', username)
      } else {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userName')
      }
    },
    setChoosedPlan(plan) {
      this.choosedPlan = plan
    }
  }
})
