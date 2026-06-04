import { defineStore } from 'pinia' 
import textData from '@/data/locaWeb_textData.json'

export const useStore = defineStore('store', {
  state: () => ({
    jsonData: textData,
    isUserLogged: false,
    userToken: null,
    username: null,
    choosedPlan: null,
    onboardingActive: false,
    onboardingStep: 0
  }),
  actions: {
    setUserLogin(state, token, username) {
      this.isUserLogged = state
      this.userToken = token
      this.username = username

      if (state) {
        localStorage.setItem('userToken', token)
        localStorage.setItem('userName', username)
      } else {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userName')
      }
    },
    setChoosedPlan(plan) {
      this.choosedPlan = plan
    },
    startOnboarding(force = false) {
      if (!force) {
        const completed = localStorage.getItem('onboarding_completed') === 'true'
        const skips = parseInt(localStorage.getItem('onboarding_skips') || '0', 10)
        if (completed || skips >= 2) {
          return // do not trigger automatically
        }
      }
      this.onboardingActive = true
      this.onboardingStep = 1
    },
    nextOnboardingStep() {
      this.onboardingStep++
    },
    prevOnboardingStep() {
      if (this.onboardingStep > 1) {
        this.onboardingStep--
      }
    },
    stopOnboarding(completed = false) {
      this.onboardingActive = false
      this.onboardingStep = 0
      if (completed) {
        localStorage.setItem('onboarding_completed', 'true')
      } else {
        const skips = parseInt(localStorage.getItem('onboarding_skips') || '0', 10)
        localStorage.setItem('onboarding_skips', (skips + 1).toString())
      }
    }
  }
})
