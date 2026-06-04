<script setup>
import jsonDataMixin from '@/mixins/jsonDataMixin'
import PlansGallery from '../components/PlansGallery.vue'
</script>

<template>
  <main
    v-if="textData"
    class="container PlansPage justify-content-center align-items-center text-center py-5"
  >
    <div class="row mb-3">
      <div class="col">
        <router-link to="/login" title="Voltar para o Login">
          <img :src="`/img/${logoFile}`" alt="Logo LokaWeb" style="cursor: pointer; max-height: 60px;" />
        </router-link>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <router-link to="/login" class="already-have-account text-decoration-none">
          Já tem uma conta? <span class="highlight-link font-weight-bold">Fazer login</span>
        </router-link>
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
        <p class="text-secondary">{{ textData.RegisterFirst.subtitle }}</p>
      </div>
    </div>

    <PlansGallery :textData="textData" class="mt-4" />
  </main>
</template>

<script>
export default {
  name: 'PlansPage',
  mixins: [jsonDataMixin],
  components: { PlansGallery }
}
</script>

<style lang="scss" scoped>
.already-have-account {
  color: $color-text-secondary;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: $color-text;
  }
}

.highlight-link {
  color: $color-highlight;
  text-decoration: underline;
}
</style>
