<!-- layouts/PublicLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-white to-purple-50/50">

    <!-- Navbar -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          LeadsApp
        </h1>

        <div class="space-x-4">
          <router-link
            to="/login"
            class="bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition font-medium shadow-sm"
          >
            Login
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="flex-grow flex flex-col">
      <slot />
    </main>

  </div>
</template>

<script setup>
</script>
