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

    <!-- Sidebar Component -->
    <SidebarNav :sidebar-open="sidebarOpen" />

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
import SidebarNav from '../components/SidebarNav.vue'

const sidebarOpen = ref(false)
</script>
