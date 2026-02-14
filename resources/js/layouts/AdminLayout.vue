<!-- layouts/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Menu Button -->
    <button
      @click="sidebarOpen = !sidebarOpen"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50 transition"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'w-64'
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Logo/Brand -->
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-800">CRM Admin</h2>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1">
          <router-link
            to="/dashboard"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-medium"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Dashboard
          </router-link>

          <router-link
            to="/leads"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-medium"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Leads
          </router-link>

          <router-link
            to="/activity-logs"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-medium"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Activity Log
          </router-link>
        </nav>

        <!-- User Section -->
        <div class="p-4 border-t border-gray-200">
          <button
            @click="logout"
            class="flex items-center gap-3 w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="lg:ml-64 min-h-screen">
      <div class="p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const sidebarOpen = ref(false)
const router = useRouter()

const logout = async () => {
  try {
    // Call logout API
    await api.post('/admin/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    // Clear all auth data
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')

    // Redirect to login
    router.push('/login')
  }
}
</script>
