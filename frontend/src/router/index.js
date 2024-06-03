import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/auth/Auth.vue'
import Layout from '@/layout/Layout.vue'

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
      name: 'home',
      component: Layout,
      // meta: { requiresAuth: true },
      children: [
          {
              path: 'home/overview',
              name: 'dashboard',
              component: () => import('../views/Dashboard.vue')
          },
          {
              path: 'pages/students',
              name: 'students',
              component: () => import('../views/pages/Students.vue')
          },
          {
              path: 'pages/attendance',
              name: 'attendance',
              component: () => import('../views/pages/Attendance.vue')
          },
          {
              path: 'pages/request',
              name: 'request',
              component: () => import('../views/pages/Request.vue')
          },
          {
              path: 'pages/accounts',
              name: 'accounts',
              component: () => import('../views/pages/Accounts.vue')
          },
          {
              path: 'pages/setting',
              name: 'setting',
              component: () => import('../views/pages/Setting.vue')
          },
      ]
    },
  ]
})

export default router
