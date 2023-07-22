<template>
  <div v-if="textData" class="container PlansGallery">
    <div class="row">
      <div v-for="plan in plans" :key="plan.id" class="col">
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
  max-width: 70vw;
}
</style>
