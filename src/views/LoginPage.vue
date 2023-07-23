<script setup>
import { useStore } from '@/stores/store'
import axios from 'axios'
import LoginForm from '../components/LoginForm.vue'
import jsonDataMixin from '@/mixins/jsonDataMixin'
</script>

<template>
  <main v-if="textData" class="container LoginPage">
    <div v-if="logoFile" class="row justify-content-center align-items-center">
      <div class="col text-center">
        <img class="logo--default" :src="`/img/${logoFile}`" alt="Logo LocaWeb" />
      </div>
    </div>

    <LoginForm :textData="textData.Login" @submitForm="onSubmitForm" :hasError="hasError" />

    <div class="row justify-content-center align-items-center text-center">
      <div class="col">
        <router-link to="/plans" class="subtitle">
          {{ textData.Login.notMember }} <em>{{ textData.Login.signin }}</em>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'LoginPage',
  mixins: [jsonDataMixin],
  data() {
    return {
      hasError: false
    }
  },
  methods: {
    onSubmitForm(loginData) {
      const store = useStore()
      axios
        .post('https://fakestoreapi.com/auth/login', loginData)
        .then((res) => {
          store.setUserLogin(true, res.data.token, loginData.username)
          this.hasError = false
          this.$router.push(`/user/${loginData.username}`)
        })
        .catch((error) => {
          this.hasError = true
          console.error(error)
        })
    }
  },
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
.LoginPage {
  margin-top: 150px;

  .secondaryTitle {
    line-height: 16px;
  }

  em {
    color: $color-highlight !important;
    font-style: normal;
  }

  .subtitle {
    color: $color-text;
  }
  a {
    color: $color-text-hidden;
    text-decoration: none;
  }

  h3 {
    font-weight: bold;
  }
}
</style>
