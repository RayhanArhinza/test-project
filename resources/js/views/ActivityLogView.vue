<!-- views/ActivityLogView.vue -->
<template>
  <AdminLayout>
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Activity Log</h1>
        <p class="text-sm text-gray-500 mt-1">Riwayat aktivitas admin</p>
      </div>

      <!-- Activity Timeline -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-6">
          <div class="space-y-6">
            <div
              v-for="log in logs.data"
              :key="log.id"
              class="relative pl-8 pb-6 last:pb-0"
            >
              <!-- Timeline line -->
              <div
                v-if="log !== logs.data[logs.data.length - 1]"
                class="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"
              ></div>

              <!-- Timeline dot -->
              <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gray-900 border-4 border-white ring-2 ring-gray-200"></div>

              <!-- Content -->
              <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">
                      <span class="font-medium">{{ log.admin?.name || 'Admin' }}</span>
                      <span class="text-gray-600"> {{ log.description }}</span>
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ formatDate(log.created_at) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="logs.data.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <p class="mt-2 text-sm text-gray-500">Belum ada aktivitas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import { useActivityLogs } from '../composables/useActivityLogs'
import { useDateFormatter } from '../composables/useDateFormatter'

const { logs, fetchLogs } = useActivityLogs()
const { formatDate } = useDateFormatter()

onMounted(() => {
  fetchLogs()
})
</script>
