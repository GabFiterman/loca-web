import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
  state: () => ({
    jsonData: null,
    isUserLogged: false,
    userToken: null,
    username: null,
    choosedPlan: null
  }),
  actions: {
    async fetchJsonData() {
      try {
        const response = await axios.get('/src/data/locaWeb_textData.json')
        this.jsonData = response.data
      } catch (error) {
        console.error('Erro ao buscar os dados do JSON:', error)
        throw error
      }
    },
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
