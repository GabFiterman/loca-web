<script setup>
import { RouterView } from 'vue-router'
import OnboardingStepper from '@/components/OnboardingStepper.vue'
import { useStore } from '@/stores/store'
import { onMounted } from 'vue'

const store = useStore()

onMounted(() => {
  if (window.Cypress) return
  // Automatically trigger onboarding on first load
  setTimeout(() => {
    store.startOnboarding(false)
  }, 1000)
})

const startTour = () => {
  store.startOnboarding(true)
}
</script>

<template>
  <RouterView />
  <OnboardingStepper />
  
  <!-- Floating Help/Tutorial FAB -->
  <button 
    class="tutorial-fab shadow-lg d-flex align-items-center justify-content-center" 
    @click="startTour" 
    title="Iniciar Tour de Ajuda"
    v-if="!store.onboardingActive"
  >
    <span>✨ Tour</span>
  </button>
</template>

<style lang="scss">
.tutorial-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: $color-highlight;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: bold;
  z-index: 1000;
  cursor: pointer;
  width: auto;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 25px rgba(243, 1, 104, 0.3) !important;

  &:hover {
    transform: translateY(-4px) scale(1.05);
    background: darken($color-highlight, 5%);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
}
</style>
