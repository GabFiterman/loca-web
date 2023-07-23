<script setup>
import jsonDataMixin from '@/mixins/jsonDataMixin'
import PlanCard from '@/components/PlanCard.vue'
import { useStore } from '@/stores/store'
import axios from 'axios'
</script>

<template>
  <div v-if="textData" class="container SigninPage">
    <div class="row text-center mt-3">
      <div class="col">
        <img class="logo--default" :src="`/img/${logoFile}`" alt="Logo Locaweb" />
      </div>
    </div>

    <div class="row text-center my-4">
      <div class="col">
        <div class="secondaryTitle SigninPage__title" v-html="textData.RegisterSecond.title"></div>
      </div>
    </div>

    <div class="row">
      <!-- NOTE: Dados pessoais -->
      <div class="col-8">
        <main class="container SigninMain">
          <div class="row">
            <div class="col">
              <h3 class="bold">{{ textForm.title }}</h3>
            </div>

            <div class="row subtitle SigninMain__subtitle">
              <div class="col">
                <p>{{ textForm.subtitle }}</p>
              </div>
            </div>

            <!-- NOTE: Formulário principal -->
            <div
              class="row SinginPage__form"
              v-for="inputItem in textForm.inputs"
              :key="inputItem.name"
            >
              <div class="col">
                <label>{{ inputItem.title }}</label>
                <input
                  :type="inputItem.type"
                  :placeholder="inputItem.type !== 'password' ? inputItem.placeholder : ''"
                  v-model="formData[inputItem.name]"
                />
                <p class="SigninPage__form--instructions" v-if="inputItem.observation">
                  {{ inputItem.observation }}
                </p>
              </div>
            </div>
            <div class="row SinginPage__form">
              <div class="col">
                <label>Confirme sua senha</label>
                <input type="password" v-model="passwordConfirm" />
                <p class="error" v-if="showPasswordError">
                  {{ textData.RegisterSecond.errorPassword }}
                </p>
              </div>
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="col">
              <h3 class="bold">{{ textFormProfessional.title }}</h3>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label>{{ textFormProfessional.inputs[0].title }}</label>
              <input
                :type="textFormProfessional.inputs[0].type"
                :placeholder="textFormProfessional.inputs[0].placeholder"
                v-model="siteName"
              />
              <span>{{ textFormProfessional.inputs[0].observation }}</span>
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="col-1">
              <input
                class="form-check-input SinginMain__input--check"
                type="checkbox"
                v-model="agreePrivacyTerms"
              />
            </div>
            <div class="col">
              <div v-html="textData.RegisterSecond.privacyTerms"></div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button @click="handleCreateAccount">
                {{ textData.RegisterSecond.createAccount }}
              </button>
            </div>
          </div>
        </main>
      </div>

      <!-- TODO: Card do plano atual  -->
      <div class="col-4" v-if="choosedPlan">
        <div class="row">
          <div class="col-12">
            <div class="ActualPlan__PlanCard text-center">
              <PlanCard :textCard="choosedPlan" :hideButton="true" :selectedPlan="true" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button class="ActualPlan__switchPlan" @click="handleSwitchPlan">Trocar Plano</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SigninPage',
  mixins: [jsonDataMixin],
  data() {
    return {
      formData: {},
      passwordConfirm: null,
      siteName: null,
      agreePrivacyTerms: false
    }
  },
  computed: {
    textForm() {
      return this.textData.RegisterSecond.formPersonal
    },
    textFormProfessional() {
      return this.textData.RegisterSecond.formProfessional
    },
    showPasswordError() {
      if (!this.passwordConfirm || this.passwordConfirm == this.formData.password) return false
      else return true
    },
    choosedPlan() {
      const store = useStore()
      return store.choosedPlan
    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.path === '/signin' && !to.path.includes('/user')) {
      if (window.confirm('Deseja mesmo sair? As alterações não serão salvas.')) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  methods: {
    handleSwitchPlan() {
      this.$router.push('/plans')
    },
    handleCreateAccount() {
      const { name, phone, email, password } = this.formData
      const passwordConfirm = this.passwordConfirm
      const siteName = this.siteName

      if (name && phone && email && password && passwordConfirm && siteName) {
        if (this.agreePrivacyTerms) {
          if (password === passwordConfirm) {
            const userInfo = {
              username: name,
              email: email,
              password: password
            }
            const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR'

            const store = useStore()
            axios
              .post('https://fakestoreapi.com/users', userInfo)
              .then(() => {
                store.setUserLogin(true, fakeToken, name)
                this.$router.push(`/user/${name}`)
              })
              .catch((error) => {
                console.error(error)
              })
          } else {
            alert('Senhas não coincidem!')
          }
        } else {
          alert(
            'Você precisa concordar com os termos de uso e políticas de privacidade para criar uma conta!'
          )
        }
      } else {
        alert('Por favor, preencha todos os campos')
      }
    }
  },
  components: [PlanCard]
}
</script>

<style lang="scss" scoped>
.SigninPage {
  padding: 0 8vw;
  label,
  span {
    font-size: $font-size-xsm;
    margin-top: 1rem;
  }

  button {
    font-weight: 400;
    letter-spacing: 1px;
  }

  span {
    color: $color-text-secondary;
  }

  input {
    padding: 1em;
  }

  .SigninPage__title {
    line-height: 2rem;
    padding: 0 10vw;
  }

  /* Start Scrollbar */
  scrollbar-color: $color-borders-light $color-text-inverted;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: $color-borders-light;
    border-radius: $border-radius-main;
  }
  ::-webkit-scrollbar-track {
    background-color: $color-text-inverted;
  }
  /* End scrollbar */

  .SigninMain {
    background-color: $color-text-inverted;
    border-radius: $border-radius-main;
    outline: $color-borders-light 1px solid;
    padding: 1.75em 2em;
    width: 95%;

    .SigninMain__subtitle {
      margin-bottom: -1rem;
    }

    .SinginPage__form {
      input {
        width: 104.75%;
      }
      .SigninPage__form--instructions {
        color: $color-text-secondary;
        font-size: $font-size-xsm;
        margin-top: 0.25em;
      }
    }

    .SinginMain__input--check {
      height: 18px;
      padding: 0 !important;
      width: 15px;
      border-color: $color-highlight;

      &:checked {
        background-color: $color-highlight;
        border-color: $color-text-inverted;
      }
    }
  }
  .ActualPlan__PlanCard {
    max-height: 58em;
    overflow-y: scroll;
  }
  .ActualPlan__switchPlan {
    background-color: #fff;
    box-shadow: -1px -42px 36px 28px rgba(255, 255, 255, 0.83);
    -webkit-box-shadow: -1px -42px 36px 28px rgba(255, 255, 255, 0.83);
    -moz-box-shadow: -1px -42px 36px 28px rgba(255, 255, 255, 0.83);
    color: black;
    outline: black 1px solid;
  }
}
</style>
