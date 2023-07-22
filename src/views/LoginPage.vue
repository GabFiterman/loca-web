<script setup>
import { useStore } from '@/stores/store'
import axios from 'axios'
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <main v-if="textData" class="container LoginPage">
    <div v-if="logoFile" class="row justify-content-center align-items-center">
      <div class="col text-center">
        <img class="logo--default" :src="`/img/${logoFile}`" alt="Logo LocaWeb" />
      </div>
    </div>

    <LoginForm :textData="textData" @submitForm="onSubmitForm" :hasError="hasError" />

    <div class="row justify-content-center align-items-center text-center">
      <div class="col">
        <a class="subtitle" href="#" target="_blank">
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
      hasError: false
    }
  },
  computed: {
    textData() {
      const store = useStore()
      if (!store.jsonData) return ''
      const jsonString = JSON.stringify(store.jsonData)
      const jsonObject = JSON.parse(jsonString)

      return jsonObject.Login
    },
    logoFile() {
      const store = useStore()
      if (!store.jsonData) return ''
      const jsonString = JSON.stringify(store.jsonData)
      const jsonObject = JSON.parse(jsonString)

      return jsonObject.Global.logoFile
    }
  },
  methods: {
    onSubmitForm(loginData) {
      const store = useStore()
      axios
        .post('https://fakestoreapi.com/auth/login', loginData)
        .then(() => {
          store.switchUserLogin()
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
  },
  beforeCreate() {
    useStore().fetchJsonData()
  }
}
</script>

<style lang="scss" scoped>
.LoginPage {
  margin-top: 150px;

  .logo--default {
    height: 62px;
    width: auto;
  }

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
    color: #515d74;
    text-decoration: none;
  }

  h3 {
    font-weight: bold;
  }
}
</style>
