<script setup>
import { useStore } from '@/stores/store'
</script>

<template>
  <div class="container PlanCard">
    <div class="row highlight align-items-center justify-content-center">
      <div v-if="textCard.highlight" class="col-7">
        <p>Mais usado</p>
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
    }
  },
  computed: {
    handleValue() {
      return this.textCard.value
        ? `<h4><label>R$</label><b class="price">${this.textCard.value}</b><label>/mês</label></h4>`
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
  button {
    background: $color-highlight;
    color: $color-text-inverted;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    padding: 20px 24px;
    text-transform: uppercase;
  }

  .highlight {
    min-height: 8vh;
    p {
      background-color: $color-elevate;
      color: $color-text-inverted;
      border-radius: 0.5em;
      text-transform: uppercase;
      padding: 4px 6px;
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
