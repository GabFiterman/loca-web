<script setup>
import { useStore } from '@/stores/store'
import jsonDataMixin from '@/mixins/jsonDataMixin'
import PlansGallery from '../components/PlansGallery.vue'
</script>

<template>
  <main
    v-if="textData"
    class="container PlansPage justify-content-center align-items-center text-center"
  >
    <div class="row">
      <div class="col">
        <img :src="`/img/${logoFile}`" alt="" />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-2"></div>
      <div class="col-8">
        <div v-html="textData.RegisterFirst.title"></div>
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <p>{{ textData.RegisterFirst.subtitle }}</p>
      </div>
    </div>

    <PlansGallery :textData="textData" />
  </main>
</template>

<script>
export default {
  name: 'PlansPage',
  mixins: [jsonDataMixin],
  beforeCreate() {
    useStore().fetchJsonData()
  },
  components: { PlansGallery }
}
</script>

<style lang="scss" scoped></style>
