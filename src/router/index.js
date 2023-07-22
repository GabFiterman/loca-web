import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import { useStore } from '../stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      beforeEnter: () => {
        const store = useStore()
        store.setUserLogin(false)
      }
    },
    {
      path: '/user/:username',
      name: 'UserIndex',
      meta: { requiresAuth: true },
      component: () => import('../views/UserIndex.vue'),
      beforeEnter: (to, from, next) => {
        const store = useStore()
        if (store.isUserLogged && to.params.username === store.username) {
          // NOTE: The user is logged in and accessing the dashboard itself
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/plans',
      name: 'Plans',
      component: () => import('../views/PlansPage.vue')
    }
  ]
})

// NOTE: Checks that the user is logged in before each route transition that requires authentication
router.beforeEach((to, from, next) => {
  const store = useStore()
  if (to.meta.requiresAuth && !store.isUserLogged) {
    // NOTE: If route requires authentication and user is not logged in, redirect to login page
    next('/login')
  } else {
    next()
  }
})

export default router
