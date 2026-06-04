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
        <router-link to="/login" title="Voltar para o Login">
          <img class="logo--default" :src="`/img/${logoFile}`" alt="Logo LokaWeb" style="cursor: pointer;" />
        </router-link>
      </div>
    </div>

    <div class="row text-center my-4">
      <div class="col">
        <div class="secondaryTitle SigninPage__title" v-html="textData.RegisterSecond.title"></div>
        <div class="mt-2">
          <router-link to="/login" class="already-have-account text-decoration-none">
            Já tem uma conta? <span class="highlight-link font-weight-bold">Fazer login</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="invertedRow">
      <!-- NOTE: Dados pessoais -->
      <div class="col-lg-8 col-sm-12 order-md-first order-sm-last">
        <main class="container SigninMain shadow-sm">
          <!-- Main validation summary banner -->
          <div v-if="globalError" class="alert alert-danger py-2 px-3 mb-4 rounded text-sm d-flex align-items-center">
            <span class="me-2">⚠️</span>
            <span>{{ globalError }}</span>
          </div>

          <div class="row">
            <div class="col">
              <h3 class="bold text-dark">{{ textForm.title }}</h3>
            </div>

            <div class="row subtitle SigninMain__subtitle">
              <div class="col">
                <p>{{ textForm.subtitle }}</p>
              </div>
            </div>

            <!-- NOTE: Formulário principal -->
            <div
              class="row SinginPage__form mb-3"
              v-for="inputItem in textForm.inputs"
              :key="inputItem.name"
            >
              <div class="col">
                <label class="font-weight-bold mb-1">{{ inputItem.title }}</label>
                <input
                  :type="inputItem.type"
                  :name="inputItem.name"
                  :placeholder="inputItem.type !== 'password' ? inputItem.placeholder : ''"
                  v-model="formData[inputItem.name]"
                  :class="{ 'border-danger': validationErrors[inputItem.name] }"
                  @input="clearError(inputItem.name)"
                />
                <p class="error text-danger text-xs mt-1 mb-0" v-if="validationErrors[inputItem.name]">
                  {{ validationErrors[inputItem.name] }}
                </p>
                <p class="SigninPage__form--instructions" v-if="inputItem.observation">
                  {{ inputItem.observation }}
                </p>
              </div>
            </div>
            <div class="row SinginPage__form mb-3">
              <div class="col">
                <label class="font-weight-bold mb-1">Confirme sua senha</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  v-model="passwordConfirm" 
                  :class="{ 'border-danger': validationErrors.confirmPassword }"
                  @input="clearError('confirmPassword')"
                />
                <p class="error text-danger text-xs mt-1 mb-0" v-if="validationErrors.confirmPassword || showPasswordError">
                  {{ validationErrors.confirmPassword || textData.RegisterSecond.errorPassword }}
                </p>
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <div class="row">
            <div class="col">
              <h3 class="bold text-dark">{{ textFormProfessional.title }}</h3>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label class="font-weight-bold mb-1">{{ textFormProfessional.inputs[0].title }}</label>
              <input
                :type="textFormProfessional.inputs[0].type"
                :placeholder="textFormProfessional.inputs[0].placeholder"
                v-model="siteName"
                name="companyName"
                :class="{ 'border-danger': validationErrors.siteName }"
                @input="clearError('siteName')"
              />
              <p class="error text-danger text-xs mt-1 mb-0" v-if="validationErrors.siteName">
                {{ validationErrors.siteName }}
              </p>
              <span class="d-block text-muted text-xs mt-1">{{ textFormProfessional.inputs[0].observation }}</span>
            </div>
          </div>

          <hr class="my-4" />

          <div class="row mb-3 align-items-start">
            <div class="col-auto pt-1">
              <input
                class="form-check-input SinginMain__input--check cursor-pointer"
                type="checkbox"
                v-model="agreePrivacyTerms"
                @change="clearError('agreeTerms')"
              />
            </div>
            <div class="col">
              <div v-html="textData.RegisterSecond.privacyTerms"></div>
              <p class="error text-danger text-xs mt-1 mb-0" v-if="validationErrors.agreeTerms">
                {{ validationErrors.agreeTerms }}
              </p>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col">
              <button class="btn btn-primary w-100 py-3 text-uppercase font-weight-bold" @click="handleCreateAccount">
                {{ textData.RegisterSecond.createAccount }}
              </button>
            </div>
          </div>
        </main>
      </div>

      <!-- TODO: Card do plano atual  -->
      <div class="col-lg-4 col-sm-12 order-md-last order-sm-first" v-if="choosedPlan">
        <div class="row">
          <div class="col-12">
            <div class="ActualPlan__PlanCard text-center border rounded p-3 bg-white mb-3">
              <PlanCard :textCard="choosedPlan" :hideButton="true" :selectedPlan="true" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button class="ActualPlan__switchPlan btn w-100 py-3 mb-4 rounded-3 text-uppercase font-weight-bold" @click="handleSwitchPlan">
              Trocar Plano
            </button>
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
      formData: {
        name: '',
        phone: '',
        email: '',
        password: ''
      },
      passwordConfirm: '',
      siteName: '',
      agreePrivacyTerms: false,
      validationErrors: {},
      globalError: ''
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
      if (!this.passwordConfirm || this.passwordConfirm === this.formData.password) return false
      else return true
    },
    choosedPlan() {
      const store = useStore()
      return store.choosedPlan
    },
    isFormTouched() {
      return (
        !!this.formData.name ||
        !!this.formData.phone ||
        !!this.formData.email ||
        !!this.formData.password ||
        !!this.passwordConfirm ||
        !!this.siteName
      )
    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.path === '/signin' && !to.path.includes('/user') && this.isFormTouched) {
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
    clearError(field) {
      if (this.validationErrors[field]) {
        this.validationErrors[field] = ''
      }
      this.globalError = ''
    },
    validateForm() {
      const errors = {}
      const { name, phone, email, password } = this.formData

      if (!name.trim()) errors.name = 'O nome completo é obrigatório.'
      if (!phone.trim()) errors.phone = 'O celular é obrigatório.'
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.trim()) {
        errors.email = 'O e-mail é obrigatório.'
      } else if (!emailRegex.test(email)) {
        errors.email = 'Por favor, insira um e-mail válido.'
      }

      if (!password) {
        errors.password = 'A senha é obrigatória.'
      } else if (password.length < 8) {
        errors.password = 'A senha deve ter no mínimo 8 caracteres.'
      }

      if (!this.passwordConfirm) {
        errors.confirmPassword = 'A confirmação de senha é obrigatória.'
      } else if (password !== this.passwordConfirm) {
        errors.confirmPassword = 'As senhas não coincidem.'
      }

      if (!this.siteName.trim()) {
        errors.siteName = 'O nome do site é obrigatório.'
      }

      if (!this.agreePrivacyTerms) {
        errors.agreeTerms = 'Você precisa aceitar os Termos de Uso.'
      }

      this.validationErrors = errors
      return Object.keys(errors).length === 0
    },
    handleCreateAccount() {
      this.globalError = ''
      
      if (!this.validateForm()) {
        this.globalError = 'Por favor, corrija os erros do formulário antes de continuar.'
        return
      }

      const { name, phone, email, password } = this.formData
      const siteName = this.siteName

      const userInfo = {
        username: name,
        email: email,
        password: password,
        phone: phone,
        siteName: siteName
      }
      
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR'
      const store = useStore()

      try {
        const registered = JSON.parse(localStorage.getItem('registered_users') || '[]')
        registered.push(userInfo)
        localStorage.setItem('registered_users', JSON.stringify(registered))
      } catch (err) {
        console.error('LocalStorage save error', err)
      }

      axios
        .post('https://fakestoreapi.com/users', {
          username: name.toLowerCase().replace(/\s+/g, ''),
          email: email,
          password: password
        })
        .then(() => {
          store.setUserLogin(true, fakeToken, name)
          this.$router.push(`/user/${name}`)
        })
        .catch((error) => {
          console.warn('Fake API registration failed/timed out, falling back to local login setup', error)
          store.setUserLogin(true, fakeToken, name)
          this.$router.push(`/user/${name}`)
        })
    }
  },
  components: {
    PlanCard
  }
}
</script>

<style lang="scss" scoped>
.SigninPage {
  .invertedRow {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-0.5 * var(--bs-gutter-x));
    margin-left: calc(-0.5 * var(--bs-gutter-x));
  }

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
    &.border-danger {
      border: 1px solid red !important;
      outline: none;
    }
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
        width: 100%;
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
    width: 100%;

    &:hover {
      background-color: #f8f9fa;
    }
  }

  .already-have-account {
    color: $color-text-secondary;
    font-size: 14px;
    transition: color 0.2s ease;

    &:hover {
      color: $color-text;
    }
  }

  .highlight-link {
    color: $color-highlight;
    text-decoration: underline;
  }
}

.cursor-pointer {
  cursor: pointer;
}

.text-xs {
  font-size: 12px;
}

@media (max-width: 450px) {
  .container {
    padding: 0 !important;
  }
}
@media (max-width: 768px) {
  .invertedRow {
    flex-direction: column-reverse;
  }

  .ActualPlan__PlanCard {
    max-height: 20em !important;
  }

  .ActualPlan__switchPlan {
    margin-bottom: 2em;
  }
  
  .SigninMain {
    width: 100%;
  }
}
</style>
