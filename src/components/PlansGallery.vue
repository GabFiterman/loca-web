<template>
  <div v-if="textData" class="container PlansGallery">
    <div class="row justify-content-center">
      <div v-for="plan in plans" :key="plan.id" class="col-12 col-md-4 mb-4">
        <PlanCard :textCard="plan" />
      </div>
    </div>
  </div>
</template>

<script>
import PlanCard from './PlanCard.vue'

export default {
  name: 'PlansGallery',
  props: {
    textData: {
      type: Object,
      required: true
    }
  },
  computed: {
    plans() {
      return this.textData.Plans
    }
  },
  components: { PlanCard }
}
</script>

<style lang="scss" scoped>
.PlansGallery {
  width: 100%;
  max-width: 95vw;

  @media (min-width: 768px) {
    max-width: 80vw;
  }
}
</style>
