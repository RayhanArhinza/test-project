<!-- views/DashboardView.vue -->
<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-1">Selamat datang kembali, Admin</p>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="loading" />

      <!-- Error State -->
      <ErrorAlert v-else-if="error" :message="error" />

      <!-- Dashboard Content -->
      <div v-else>
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Leads -->
          <StatCard title="Total Leads" :value="stats.total_leads">
            <template #icon>
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </template>
          </StatCard>

          <!-- Leads Hari Ini -->
          <StatCard title="Hari Ini" :value="stats.leads_today">
            <template #icon>
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </template>
          </StatCard>

          <!-- Leads Minggu Ini -->
          <StatCard title="Minggu Ini" :value="stats.leads_this_week">
            <template #icon>
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </template>
          </StatCard>

          <!-- Bulan Ini + Growth -->
          <StatCard
            title="Bulan Ini"
            :value="stats.leads_this_month"
            :growth="stats.growth_percentage"
            growth-label="vs bulan lalu"
          >
            <template #icon>
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </template>
          </StatCard>
        </div>

        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Top Institusi -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Top Institusi</h2>
            <div class="space-y-3">
              <div
                v-for="(institution, index) in topInstitutions"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                    {{ index + 1 }}
                  </div>
                  <span class="font-medium text-gray-900">{{ institution.institution_name }}</span>
                </div>
                <span class="text-sm font-bold text-gray-600">{{ institution.total }} leads</span>
              </div>

              <div v-if="topInstitutions.length === 0" class="text-center py-8">
                <p class="text-sm text-gray-500">Belum ada data institusi</p>
              </div>
            </div>
          </div>

          <!-- Recent Activities -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h2>
            <div class="space-y-3">
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div class="w-2 h-2 rounded-full bg-gray-900 mt-2"></div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900">
                    <span class="font-medium">{{ activity.admin?.name || 'Admin' }}</span>
                    <span class="text-gray-600"> {{ activity.description }}</span>
                  </p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.created_at) }}</p>
                </div>
              </div>

              <div v-if="recentActivities.length === 0" class="text-center py-8">
                <p class="text-sm text-gray-500">Belum ada aktivitas</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Leads -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold text-gray-900">Leads Terbaru</h2>
              <router-link
                to="/leads"
                class="text-sm text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Lihat Semua →
              </router-link>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">WhatsApp</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lembaga</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="lead in recentLeads"
                  :key="lead.id"
                  class="hover:bg-gray-50 transition"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">{{ lead.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ lead.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ lead.whatsapp_number }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ lead.institution_name || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {{ formatDate(lead.created_at) }}
                  </td>
                </tr>

                <tr v-if="recentLeads.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-sm text-gray-500">
                    Belum ada leads
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import StatCard from '../components/StatCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import { useDashboard } from '../composables/useDashboard'
import { useDateFormatter } from '../composables/useDateFormatter'

const {
  loading,
  error,
  stats,
  topInstitutions,
  recentLeads,
  recentActivities,
  fetchDashboardData
} = useDashboard()

const { formatDate } = useDateFormatter()

onMounted(() => {
  fetchDashboardData()
})
</script>
