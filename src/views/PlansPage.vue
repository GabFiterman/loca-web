<script setup>
import { useStore } from '@/stores/store'
</script>

<template>
  <main class="container PlansPage">
    <div class="row">
      <div class="col">
        <img :src="`/img/${logoFile}`" alt="" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-html="textData.title"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>{{ textData.subtitle }}</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'PlansPage',
  computed: {
    textData() {
      const store = useStore()
      if (!store.jsonData) return ''
      const jsonString = JSON.stringify(store.jsonData)
      const jsonObject = JSON.parse(jsonString)

      return jsonObject.RegisterFirst
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
</script>

<style lang="scss" scoped></style>
