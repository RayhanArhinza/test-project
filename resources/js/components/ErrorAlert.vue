<!-- components/ErrorAlert.vue -->
<template>
  <div v-if="message" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
    <div class="flex items-start gap-3">
      <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-sm text-red-800">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: null
  }
})
</script>
