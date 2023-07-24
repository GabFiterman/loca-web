import { defineStore } from 'pinia'

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
        const jsonFiles = import.meta.glob('../data/locaWeb_textData.json')
    
        for (const path in jsonFiles) {
          const response = await import(path)
          this.jsonData = response.default
        }
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
