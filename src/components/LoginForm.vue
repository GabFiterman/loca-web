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
      <div class="col position-relative">
        <div class="d-flex align-items-center mb-1">
          <label for="username" class="mb-0">{{ textData.username.title }}</label>
          <button type="button" class="btn-info-badge ms-2" @click.stop="toggleInfo" title="Ver contas de teste">
            i
          </button>
        </div>
        
        <input
          type="text"
          :placeholder="usernamePlaceholder"
          v-model="username"
          id="username"
          name="username"
          @keydown.tab="handleTabAutofill"
          required
        />

        <!-- Predefined Logins Popover -->
        <transition name="fade">
          <div v-if="showInfo" class="info-popover shadow" v-click-outside="closeInfo">
            <div class="popover-header-title d-flex justify-content-between align-items-center">
              <span class="title-text">Contas de Teste</span>
              <button type="button" class="btn-close-popover" @click="closeInfo">&times;</button>
            </div>
            <div class="popover-body-content">
              <div 
                class="test-account-row d-flex justify-content-between align-items-center"
                @click="selectAccount('johnd', 'm38rmF$')"
              >
                <div>
                  <span class="user-pill">johnd</span>
                  <span class="pass-label">m38rmF$</span>
                </div>
                <span class="fill-action">Preencher</span>
              </div>
              <div 
                class="test-account-row d-flex justify-content-between align-items-center"
                @click="selectAccount('donero', 'ewedon')"
              >
                <div>
                  <span class="user-pill">donero</span>
                  <span class="pass-label">ewedon</span>
                </div>
                <span class="fill-action">Preencher</span>
              </div>
              <div v-if="customUsers.length > 0" class="custom-users-divider">
                <span>Contas Cadastradas</span>
              </div>
              <div 
                v-for="user in customUsers" 
                :key="user.email"
                class="test-account-row d-flex justify-content-between align-items-center"
                @click="selectAccount(user.username, user.password)"
              >
                <div>
                  <span class="user-pill custom">{{ user.username }}</span>
                  <span class="pass-label">******</span>
                </div>
                <span class="fill-action">Preencher</span>
              </div>
            </div>
          </div>
        </transition>
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
          ref="passwordInput"
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
        <a href="#" @click.prevent="handleForgotPassword">{{ textData.forgotPass }}</a>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <button type="submit">{{ textData.login }}</button>
      </div>
    </div>
  </form>

  <!-- Forgot Password Modal -->
  <transition name="fade">
    <div v-if="showForgotModal" class="forgot-modal-backdrop d-flex align-items-center justify-content-center" @click="showForgotModal = false">
      <div class="forgot-modal-content p-4 shadow" @click.stop>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="mb-0 bold text-dark title-text">Recuperação de Senha</h4>
          <button class="btn-close-modal" @click="showForgotModal = false">&times;</button>
        </div>
        <p class="mb-3 text-secondary text-start">
          Esta é uma simulação de recuperação de senha. Por ser um ambiente simulado de testes, utilize as credenciais fornecidas no botão <strong>(i)</strong> ao lado do campo "Usuário", ou cadastre uma nova conta.
        </p>
        <div class="text-end">
          <button class="btn btn-secondary-custom px-4" @click="showForgotModal = false">Fechar</button>
        </div>
      </div>
    </div>
  </transition>
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
  directives: {
    clickOutside: {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      showInfo: false,
      showForgotModal: false,
      customUsers: [],
      windowWidth: window.innerWidth
    }
  },
  mounted() {
    this.loadCustomUsers()
    window.addEventListener('resize', this.updateWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWidth)
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 768
    },
    usernamePlaceholder() {
      const base = this.textData.username.placeholder
      return this.isMobile ? `${base} (Toque no botão 'i' para contas)` : `${base} (Pressione Tab para preencher)`
    }
  },
  methods: {
    updateWidth() {
      this.windowWidth = window.innerWidth
    },
    loadCustomUsers() {
      try {
        const stored = localStorage.getItem('registered_users')
        if (stored) {
          this.customUsers = JSON.parse(stored)
        }
      } catch (err) {
        console.error('Failed to load custom users', err)
      }
    },
    emitSubmitForm() {
      const loginData = {
        username: this.username,
        password: this.password
      }
      this.$emit('submitForm', loginData)
    },
    toggleInfo() {
      this.showInfo = !this.showInfo
    },
    closeInfo() {
      this.showInfo = false
    },
    selectAccount(user, pass) {
      this.username = user
      this.password = pass
      this.showInfo = false
      this.$refs.passwordInput.focus()
    },
    handleTabAutofill(e) {
      if (!this.username) {
        e.preventDefault()
        this.selectAccount('johnd', 'm38rmF$')
      }
    },
    handleForgotPassword() {
      this.showForgotModal = true
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
  width: 100%;
  max-width: 570px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  label {
    display: block;
  }

  input::placeholder,
  textarea::placeholder {
    color: #999;
    font-size: 13px;
  }
}

.btn-info-badge {
  background: $color-borders-light;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: bold;
  color: $color-text-hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: $color-highlight;
    color: white;
  }
}

.info-popover {
  position: absolute;
  top: 75px;
  left: 30px;
  right: 30px;
  background: white;
  border: 1px solid $color-borders-light;
  border-radius: 8px;
  z-index: 100;
  padding: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;

  .popover-header-title {
    font-weight: bold;
    font-size: 15px;
    color: $color-text;
    border-bottom: 1px solid $color-borders-light;
    padding-bottom: 8px;
    margin-bottom: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .title-text {
      white-space: nowrap;
    }
  }

  .btn-close-popover {
    background: none;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: #aaa;
    cursor: pointer;
    line-height: 1;
    margin-left: auto;
    
    &:hover {
      color: $color-highlight;
    }
  }

  .test-account-row {
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s ease;

    &:hover {
      background: #f7f9fc;
      .fill-action {
        color: $color-highlight;
      }
    }

    .user-pill {
      background: #eef2f6;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: bold;
      color: $color-text-hidden;
      margin-right: 8px;

      &.custom {
        background: #e8f5e9;
        color: #2e7d32;
      }
    }

    .pass-label {
      color: $color-text-secondary;
      font-family: monospace;
    }

    .fill-action {
      font-size: 11px;
      color: #999;
      font-weight: bold;
    }
  }

  .custom-users-divider {
    font-size: 11px;
    color: #aaa;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 4px;
    border-top: 1px dashed $color-borders-light;
    padding-top: 6px;
    text-align: center;
  }
}

.forgot-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1050;
}

.forgot-modal-content {
  background: white;
  border-radius: 8px;
  max-width: 480px;
  width: 90%;
  animation: modalIn 0.3s ease;

  .title-text {
    white-space: nowrap;
  }

  .btn-close-modal {
    background: none;
    border: none;
    font-size: 24px;
    font-weight: bold;
    color: #aaa;
    cursor: pointer;
    line-height: 1;
    margin-left: auto;
    
    &:hover {
      color: $color-highlight;
    }
  }

  .btn-secondary-custom {
    background: #eef2f6;
    color: $color-text;
    border: 1px solid $color-borders-light;
    padding: 10px 20px;
    text-transform: none;
    width: auto;
    font-weight: bold;

    &:hover {
      background: $color-borders-light;
    }
  }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .Form {
    width: 100%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
  }

  .info-popover {
    left: 10px;
    right: 10px;
    padding: 10px;
  }
}
</style>
