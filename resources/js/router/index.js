// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import LeadsView from '../views/LeadsView.vue'
import ActivityLogView from '../views/ActivityLogView.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { guest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/leads',
    name: 'Leads',
    component: LeadsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/activity-logs',
    name: 'ActivityLogs',
    component: ActivityLogView,
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
