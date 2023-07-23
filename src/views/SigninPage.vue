<script setup>
import jsonDataMixin from '@/mixins/jsonDataMixin'
</script>

<template>
  <main v-if="textData" class="container SigninPage">
    <div class="row">
      <div class="col">
        <img class="logo--default" :src="`/img/${logoFile}`" alt="Logo Locaweb" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'SigninPage',
  mixins: [jsonDataMixin],
}
</script>

<style></style>
