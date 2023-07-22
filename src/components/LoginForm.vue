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
  width: 570px;
  // min-height: 492px;
  border-radius: 5px;
  border: 1px solid #e6eaf2;
  background: #fff;
  padding: 28px 30px;
  margin-top: 30px;

  label {
    display: block;
    margin-left: 2px;
  }

  input,
  button {
    width: 100%;
    padding: 24px 16px;
    //   margin: 0 auto;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid rgba(81, 93, 116, 0.5);
    background: #fff;
  }

  button {
    outline: none;
    border: none;
  }

  input::placeholder,
  textarea::placeholder {
    color: inherit;
  }

  button {
    background: $color-highlight;
    color: #fff;
    text-transform: uppercase;
  }
}
</style>
