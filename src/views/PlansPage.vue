<script setup>
import { useStore } from '@/stores/store'
import jsonDataMixin from '@/mixins/jsonDataMixin'
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
        <div v-html="textData.RegisterFirst.title"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>{{ textData.RegisterFirst.subtitle }}</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'PlansPage',
  mixins: [jsonDataMixin],
  beforeCreate() {
    useStore().fetchJsonData()
  }
}
</script>

<style lang="scss" scoped></style>
