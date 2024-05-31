import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/auth/Auth.vue'
import Layout from '@/layout/Layout.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/',
      name: 'dashboard',
      component: Layout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },
      ]
    },
  ]
})

export default router
