<template>
  <div v-if="active" class="onboarding-overlay">
    <!-- SVG Overlay with mask for highlighting target -->
    <svg class="onboarding-mask" width="100%" height="100%">
      <defs>
        <mask id="overlay-mask">
          <rect width="100%" height="100%" fill="white" />
          <!-- The highlighted cutout -->
          <rect
            v-if="highlightRect"
            :x="highlightRect.left - 6"
            :y="highlightRect.top - 6"
            :width="highlightRect.width + 12"
            :height="highlightRect.height + 12"
            rx="8"
            ry="8"
            fill="black"
          />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.7)" mask="url(#overlay-mask)" />
    </svg>

    <!-- Floating Popover Card -->
    <div
      v-if="currentStepData"
      class="onboarding-card shadow-lg"
      :style="cardStyle"
      ref="cardElement"
    >
      <div class="card-header-bar d-flex justify-content-between align-items-center mb-2">
        <span class="step-badge">Passo {{ step }} de {{ totalSteps }}</span>
        <button class="btn-skip-tour" @click="skipTour">Pular Tour</button>
      </div>

      <h4 class="step-title bold mb-2">{{ currentStepData.title }}</h4>
      <p class="step-text mb-3">{{ currentStepData.description }}</p>

      <div class="d-flex justify-content-between align-items-center">
        <!-- Step Indicators Dots -->
        <div class="step-dots d-flex">
          <span
            v-for="s in totalSteps"
            :key="s"
            class="dot"
            :class="{ active: s === step }"
          ></span>
        </div>

        <!-- Controls -->
        <div class="step-buttons">
          <button
            v-if="step > 1"
            class="btn btn-outline-secondary-custom me-2 btn-sm px-3"
            @click="prevStep"
          >
            Anterior
          </button>
          <button
            class="btn btn-primary-custom btn-sm px-4"
            @click="nextStep"
          >
            {{ step === totalSteps ? 'Concluir' : 'Próximo' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store'

export default {
  name: 'OnboardingStepper',
  data() {
    return {
      highlightRect: null,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      resizeObserver: null
    }
  },
  computed: {
    store() {
      return useStore()
    },
    active() {
      return this.store.onboardingActive
    },
    step() {
      return this.store.onboardingStep
    },
    totalSteps() {
      return this.steps.length
    },
    isMobile() {
      return this.windowWidth <= 768
    },
    steps() {
      const isMobile = this.isMobile
      return [
        {
          title: 'Acesse sua Conta',
          description: isMobile
            ? 'Esta é a página de login. Dica: Toque no botão de informações (i) ao lado do campo "Usuário" para visualizar e preencher as credenciais de teste.'
            : 'Esta é a página de login. Dica: Pressione a tecla "Tab" no campo Usuário para preencher os dados de teste automaticamente, ou use o botão de informações (i).',
          selector: 'form.Form',
          route: '/login',
          action: () => {}
        },
        {
          title: 'Escolha um Plano',
          description: 'Nesta galeria você encontra todos os planos. Clique em "Escolher este plano" no plano grátis (Hospedagem 1) para prosseguir com a simulação.',
          selector: '.PlansGallery',
          route: '/plans',
          action: () => {
            const store = useStore()
            const plan = store.jsonData.Plans[0]
            store.setChoosedPlan(plan)
            this.$router.push('/signin')
          }
        },
        {
          title: 'Dados Cadastrais',
          description: 'Preencha os campos para finalizar seu cadastro. O plano escolhido aparece destacado na barra lateral. Se desejar, pode trocar o plano a qualquer momento.',
          selector: '.SigninMain',
          route: '/signin',
          action: () => {
            const store = useStore()
            const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR'
            store.setUserLogin(true, fakeToken, 'LokaWeb Tester')
            this.$router.push('/user/LokaWeb Tester')
          }
        },
        {
          title: 'Aprenda sobre GitHub',
          description: 'Aqui está seu dashboard padrão com artigos da LokaWeb encerrando a simulação de uma tela de login / cadastro.',
          selector: '.youtubeVideo',
          route: '/user',
          action: () => {
            const store = useStore()
            store.stopOnboarding(true)
          }
        }
      ]
    },
    currentStepData() {
      if (this.step < 1 || this.step > this.totalSteps) return null
      return this.steps[this.step - 1]
    },
    cardStyle() {
      if (!this.highlightRect) {
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'fixed'
        }
      }

      const rect = this.highlightRect
      const cardWidth = 320
      const cardHeight = 200

      let top = rect.bottom + 15
      let left = rect.left + rect.width / 2 - cardWidth / 2

      // Check boundary limits
      if (top + cardHeight > this.windowHeight) {
        top = rect.top - cardHeight - 15
      }
      if (left + cardWidth > this.windowWidth) {
        left = this.windowWidth - cardWidth - 20
      }
      if (left < 10) {
        left = 10
      }

      return {
        top: `${top}px`,
        left: `${left}px`,
        position: 'absolute'
      }
    }
  },
  watch: {
    step() {
      this.updateHighlight()
    },
    active(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
        this.updateHighlight()
      } else {
        document.body.style.overflow = ''
        this.highlightRect = null
      }
    },
    '$route.path'() {
      setTimeout(() => {
        this.updateHighlight()
      }, 300)
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.resizeObserver = new ResizeObserver(() => {
      this.updateHighlight()
    })
    this.resizeObserver.observe(document.body)
    if (this.active) {
      document.body.style.overflow = 'hidden'
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
    document.body.style.overflow = ''
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.updateHighlight()
    },
    updateHighlight() {
      if (!this.active || !this.currentStepData) {
        this.highlightRect = null
        return
      }

      const currentPath = this.$route.path
      const reqPath = this.currentStepData.route

      if (reqPath === '/user') {
        if (!currentPath.startsWith('/user/')) {
          this.highlightRect = null
          return
        }
      } else if (currentPath !== reqPath) {
        this.$router.push(reqPath)
        return
      }

      this.$nextTick(() => {
        setTimeout(() => {
          const el = document.querySelector(this.currentStepData.selector)
          if (el) {
            const r = el.getBoundingClientRect()
            this.highlightRect = {
              top: r.top + window.scrollY,
              left: r.left + window.scrollX,
              width: r.width,
              height: r.height
            }
          } else {
            this.highlightRect = null
          }
        }, 150)
      })
    },
    nextStep() {
      if (this.step < this.totalSteps) {
        if (this.currentStepData.action) {
          this.currentStepData.action()
        }
        this.store.nextOnboardingStep()
      } else {
        this.store.stopOnboarding(true)
      }
    },
    prevStep() {
      this.store.prevOnboardingStep()
      const prevStepData = this.steps[this.store.onboardingStep - 1]
      if (prevStepData && this.$route.path !== prevStepData.route) {
        if (prevStepData.route === '/user') {
          this.$router.push(`/user/${this.store.username || 'user'}`)
        } else {
          this.$router.push(prevStepData.route)
        }
      }
    },
    skipTour() {
      this.store.stopOnboarding(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.onboarding-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  pointer-events: none;
}

.onboarding-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2001;
  pointer-events: auto;
}

.onboarding-card {
  width: 320px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  z-index: 2002;
  pointer-events: auto;
  animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid #e2e8f0;

  .card-header-bar {
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 6px;
  }

  .step-badge {
    font-size: 11px;
    font-weight: bold;
    color: $color-highlight;
    text-transform: uppercase;
  }

  .btn-skip-tour {
    background: none;
    border: none;
    font-size: 11px;
    color: #64748b;
    font-weight: bold;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: $color-highlight;
    }
  }

  .step-title {
    font-size: 15px;
    color: #0f172a;
  }

  .step-text {
    font-size: 12px;
    color: #475569;
    line-height: 18px;
  }

  .step-dots {
    gap: 4px;
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #cbd5e1;
      &.active {
        background: $color-highlight;
      }
    }
  }

  .btn-primary-custom {
    background: $color-highlight;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    font-size: 11px;
    padding: 6px 12px;
    text-transform: none;
    width: auto;

    &:hover {
      background: darken($color-highlight, 5%);
    }
  }

  .btn-outline-secondary-custom {
    background: none;
    color: #64748b;
    border: 1px solid #cbd5e1;
    font-weight: bold;
    border-radius: 6px;
    font-size: 11px;
    padding: 6px 12px;
    text-transform: none;
    width: auto;

    &:hover {
      background: #f1f5f9;
      color: #334155;
    }
  }
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
