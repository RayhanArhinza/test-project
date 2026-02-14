<!-- components/StatCard.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>

        <!-- Growth indicator -->
        <div v-if="growth !== undefined" class="flex items-center gap-1 mt-2">
          <svg
            v-if="growth >= 0"
            class="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
          <svg
            v-else
            class="w-4 h-4 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
          <span
            :class="growth >= 0 ? 'text-green-600' : 'text-red-600'"
            class="text-sm font-medium"
          >
            {{ Math.abs(growth) }}%
          </span>
          <span class="text-xs text-gray-500">{{ growthLabel }}</span>
        </div>
      </div>

      <div class="p-3 bg-gray-100 rounded-lg">
        <slot name="icon">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
          </svg>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  growth: {
    type: Number,
    default: undefined
  },
  growthLabel: {
    type: String,
    default: 'vs bulan lalu'
  }
})
</script>
