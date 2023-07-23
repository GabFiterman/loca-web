import { useStore } from '@/stores/store'

export default {
  computed: {
    textData() {
      const store = useStore()
      if (!store.jsonData) return ''
      const jsonString = JSON.stringify(store.jsonData)
      const jsonObject = JSON.parse(jsonString)
      return jsonObject
    },
    logoFile() {
      const store = useStore()
      if (!store.jsonData) return ''
      const jsonString = JSON.stringify(store.jsonData)
      const jsonObject = JSON.parse(jsonString)
      return jsonObject.Global.logoFile
    }
  },
  beforeCreate() {
    useStore().fetchJsonData()
  }
}
