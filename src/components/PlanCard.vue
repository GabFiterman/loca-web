<script setup>
import { useStore } from '@/stores/store'
</script>

<template>
  <div class="container PlanCard" :class="{ 'highlighted-card': textCard.highlight && !selectedPlan }">
    <div class="row highlight align-items-center justify-content-center">
      <div v-if="textCard.highlight && !selectedPlan" class="col-7">
        <p>Mais usado</p>
      </div>
    </div>

    <div class="row choosedPlan align-items-center justify-content-center">
      <div v-if="selectedPlan" class="col-9">
        <p>Plano Escolhido</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <h3 class="secondaryTitle bold">{{ textCard.name }}</h3>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <div class="value" v-html="handleValue"></div>
      </div>
    </div>

    <div class="row mt-2 align-items-center justify-content-center">
      <div class="col">
        <ul class="paymentConditions__list">
          <li v-for="(item, index) in textCard.paymentConditions" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>

    <hr />

    <div class="row align-items-center justify-content-center mt-4">
      <div class="col-1"></div>
      <div class="col-9">
        <p class="recomendation">{{ textCard.recomendation }}</p>
      </div>
      <div class="col-1"></div>
    </div>

    <hr />

    <div v-if="!hideButton" class="row mt-4">
      <div class="col">
        <router-link to="/signin">
          <button @click="handleChoosedPlan">{{ textCard.btnText }}</button>
        </router-link>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col">
        <div v-for="(item, index) in textCard.beneficts" :key="index" v-html="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanCard',
  props: {
    textCard: {
      type: Object,
      required: true
    },
    hideButton: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedPlan: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    handleValue() {
      return this.textCard.value
        ? `<h4><span>R$</span><b class="price">${this.textCard.value}</b><span>/mês</span></h4>`
        : '<h4 class="price bold">Grátis</h4>'
    }
  },
  methods: {
    handleChoosedPlan() {
      const store = useStore()
      store.setChoosedPlan(this.textCard)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlanCard {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  min-height: 100%;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  &.highlighted-card {
    background: rgba(243, 1, 104, 0.03) !important;
    border: 1px solid rgba(243, 1, 104, 0.25) !important;
  }

  .secondaryTitle {
    color: $color-text-secondary;
  }
  .value {
    color: $color-highlight;
    font-size: $font-size-subtitle;
  }

  .paymentConditions__list {
    li {
      list-style: none;
      font-size: $font-size-xsm;
      color: $color-text-secondary;
      margin-left: -2em;
    }
  }
  .recomendation {
    color: $color-text-secondary;
  }

  .highlight,
  .choosedPlan {
    min-height: 8vh;
    p {
      background-color: $color-elevate;
      border-radius: 0.5em;
      color: $color-text-inverted;
      padding: 4px 6px;
      text-transform: uppercase;
      font-size: 11px;
      font-weight: bold;
    }
  }

  .choosedPlan {
    margin-top: -3em;
    p {
      background-color: black;
      color: white;
      font-size: 0.75em;
    }
  }
}
</style>

<style lang="scss">
.price {
  font-size: $font-size-xl;
}

.Register__beneficts--default::before {
  content: '\2714';
  margin-right: 0.3rem;
}

.Register__beneficts--default,
.Register__beneficts--bold {
  text-align: left;
}

.Register__beneficts--bold {
  font-weight: bold;
}
</style>
