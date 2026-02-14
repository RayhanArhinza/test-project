// resources/js/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import LeadPage from '../pages/LeadPage.vue'
import ActivityLogPage from '../pages/ActivityLogPage.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { guest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/leads',
    name: 'Leads',
    component: LeadPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/activity-logs',
    name: 'ActivityLogs',
    component: ActivityLogPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('admin_token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  else if (to.meta.guest && isAuthenticated) {
    next('/dashboard')
  }
  else {
    next()
  }
})

export default router
