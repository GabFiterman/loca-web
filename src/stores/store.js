import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
  state: () => ({
    jsonData: null,
    isUserLogged: false,
    userToken: null
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
    switchUserLogin(token) {
      this.isUserLogged = !this.isUserLogged
      this.userToken = token
    }
  }
})
