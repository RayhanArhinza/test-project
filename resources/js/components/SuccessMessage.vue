<!-- components/SuccessMessage.vue -->
<template>
  <transition name="fade-scale">
    <div v-if="message" class="mt-6 p-5 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-center flex items-center justify-center gap-3 shadow-sm">
      <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.4s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
