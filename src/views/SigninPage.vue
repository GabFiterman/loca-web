<script setup>
import jsonDataMixin from '@/mixins/jsonDataMixin'
import PlanCard from '@/components/PlanCard.vue'
import { useStore } from '@/stores/store'
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

            <div class="row SigninMain__subtitle">
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
                <br />
                <input
                  :type="inputItem.type"
                  :placeholder="inputItem.type !== 'password' ? inputItem.placeholder : ''"
                  v-model="formData[inputItem.name]"
                />
              </div>
            </div>
            <div class="row SinginPage__form">
              <div class="col">
                <label>Confirme sua senha</label>
                <br />
                <input type="password" v-model="passwordConfirm" />
                <p v-if="showPasswordError">* Senhas não coincidem</p>
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
              <br />
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
              <input class="form-check-input check" type="checkbox" v-model="agreePrivacyTerms" />
            </div>
            <div class="col">
              <div v-html="textData.RegisterSecond.privacyTerms"></div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button class="">{{ textData.RegisterSecond.createAccount }}</button>
            </div>
          </div>
        </main>
      </div>

      <!-- TODO: Card do plano atual  -->
      <div class="col-4" v-if="choosedPlan">
        <div class="row">
          <div class="col-12">
            <div class="ActualPlan_container">
              <div class="ActualPlan__PlanCard text-center">
                <PlanCard :textCard="choosedPlan" :hideButton="true" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button class="switchPlan" @click="handleSwitchPlan">Trocar Plano</button>
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
      if (!this.passwordConfirm || this.passwordConfirm == this.textForm.password) return false
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
    }
  },
  components: [PlanCard]
}
</script>

<style lang="scss" scoped>
.SigninPage {
  padding: 0 8vw;

  .SigninPage__title {
    padding: 0 10vw;
    line-height: 2rem;
  }

  .SigninMain__subtitle {
    margin-bottom: -1rem;
  }

  label {
    font-size: $font-size-xsm;
    margin-bottom: 0.25rem;
    margin-top: 1rem;
  }

  button {
    background: $color-highlight;
    border-radius: 5px;
    border: none;
    color: $color-text-inverted;
    font-size: $font-size-xsm;
    font-weight: 400;
    letter-spacing: 1px;
    padding: 20px 24px;
    text-transform: uppercase;
    width: 100%;
  }

  .ActualPlan__PlanCard {
    max-height: 58em;
    overflow-y: scroll;
  }
  scrollbar-width: thin;
  scrollbar-color: $color-borders-light $color-text-inverted;

  /* Estilos para a barra de rolagem */
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: $color-borders-light; /* Cor do botão de rolagem */
    border-radius: 5px; /* Bordas arredondadas */
  }
  ::-webkit-scrollbar-track {
    background-color: $color-text-inverted; /* Cor da trilha de rolagem */
  }

  .switchPlan {
    background-color: #fff;
    color: black;
    outline: black 1px solid;
    box-shadow: -1px -42px 36px 28px rgba(255, 255, 255, 0.83);
    -webkit-box-shadow: -1px -42px 36px 28px rgba(255, 255, 255, 0.83);
    -moz-box-shadow: -1px -42px 36px 28px rgba(255, 255, 255, 0.83);
  }
}
.check {
  width: 15px;
  height: 22px;
  padding: 0 !important;

  &:checked {
    background-color: $color-highlight;
    border-color: $color-text-inverted;
  }
}

.SigninMain {
  background-color: $color-text-inverted;
  border-radius: 5px;
  outline: $color-borders-light 1px solid;
  padding: 1.75em 1.5em;
  width: 95%;

  input {
    background: #fff;
    border-radius: 5px;
    border: 1px solid $color-borders-main;
    font-size: 16px;
    padding: 16px 20px;
    width: 100%;
  }

  .SinginPage__form {
    input {
      width: 104.75%;
    }
  }
}
</style>
