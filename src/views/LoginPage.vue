<script setup>
import { useStore } from '@/stores/store'
import axios from 'axios'
</script>

<template>
  <main class="container LoginPage">
    <div class="row justify-content-center align-items-center">
      <div class="col text-center">
        <img class="logo--default" :src="`/public/img/${logoFile}`" alt="Logo LocaWeb" />
      </div>
    </div>

    <form class="container Form" @submit.prevent="submitForm">
      <div class="row justify-content-center align-items-center">
        <div class="col">
          <h3>{{ textData.title }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>{{ textData.subtitle }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label for="email">{{ textData.email.title }}</label>
          <input
            type="email"
            :placeholder="textData.email.placeholder"
            v-model="email"
            id="email"
            name="email"
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

      <div class="row text-end">
        <div class="col">
          <a href="#" target="_blank">{{ textData.forgotPass }}</a>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <button type="submit">{{ textData.login }}</button>
        </div>
      </div>
    </form>

    <div class="row justify-content-center align-items-center text-center">
      <div class="col">
        <a href="#" target="_blank">
          {{ textData.notMember }} <em>{{ textData.signin }}</em>
        </a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  computed: {
    textData() {
      const store = useStore()
      return store.jsonData.Login
    },
    logoFile() {
      const store = useStore()
      return store.jsonData.Global.logoFile
    }
  },
  methods: {
    submitForm() {
      const loginData = {
        username: this.email,
        password: this.password
      }
      axios
        .post('https://fakestoreapi.com/auth/login', loginData)
        .then((response) => {
        useStore().switchUserLogin()
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginPage {
  margin: 0 auto;
  margin-top: 18.26vh;
  em {
    color: $color-highlight !important;
  }

  a {
    color: #515d74;
    text-decoration: none;
  }

  h3 {
    font-weight: bold;
  }
  .Form {
    width: 617px;
    min-height: 492px;
    border-radius: 5px;
    border: 1px solid #e6eaf2;
    background: #fff;
    padding: 28px 30px;
    margin-top: 32px;

    label {
      display: block;
    }

    input,
    button {
      width: 100%;
      padding: 20px 16px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid rgba(81, 93, 116, 0.5);
      background: #fff;
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
}
</style>
