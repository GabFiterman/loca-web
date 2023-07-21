import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
  state: () => ({
    jsonData: null
  }),
  actions: {
    async fetchJsonData() {
      try {
        const response = await axios.get('/src/data/locaWeb_textData.json');
        this.jsonData = response.data;
        console.log('Busca dos dados do JSON com SUCESSO!');
      } catch (error) {
        console.error('Erro ao buscar os dados do JSON:', error);
        throw error;
      }
    }
  }
})
