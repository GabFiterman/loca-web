<template>
  <form class="container Form" @submit.prevent="emitSubmitForm">
    <div class="row justify-content-center align-items-center">
      <div class="col">
        <h3 class="secondaryTitle bold">{{ textData.title }}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="subtitle">{{ textData.subtitle }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label for="username">{{ textData.username.title }}</label>
        <input
          type="text"
          :placeholder="textData.username.placeholder"
          v-model="username"
          id="username"
          name="username"
          required
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <label for="password">{{ textData.password.title }}</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          :placeholder="textData.password.placeholder"
          required
        />
      </div>
    </div>

    <div v-if="hasError" class="row justify-content-center align-items-center text-center">
      <div class="col">
        <p class="error">{{ textData.error }}</p>
      </div>
    </div>

    <div class="row text-end">
      <div class="col">
        <a href="#" target="_blank">{{ textData.forgotPass }}</a>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <button type="submit">{{ textData.login }}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    textData: {
      type: Object,
      required: true
    },
    hasError: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    emitSubmitForm() {
      const loginData = {
        username: this.username,
        password: this.password
      }
      this.$emit('submitForm', loginData)
    }
  }
}
</script>

<style lang="scss" scoped>
.Form {
  background: #fff;
  border-radius: $border-radius-main;
  border: 1px solid $color-borders-light;
  margin-top: 30px;
  padding: 28px 30px;
  width: 570px;

  label {
    display: block;
  }

  input::placeholder,
  textarea::placeholder {
    color: inherit;
  }
}
</style>
