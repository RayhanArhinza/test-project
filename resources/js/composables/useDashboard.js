// composables/useDashboard.js
import { ref } from 'vue'
import api from '../services/api'

export function useDashboard() {
  const loading = ref(true)
  const error = ref(null)

  const stats = ref({
    total_leads: 0,
    leads_today: 0,
    leads_this_week: 0,
    leads_this_month: 0,
    growth_percentage: 0,
  })

  const topInstitutions = ref([])
  const recentLeads = ref([])
  const recentActivities = ref([])

  const fetchDashboardData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/admin/dashboard/stats')

      if (response.data) {
        stats.value = response.data.stats || stats.value
        topInstitutions.value = response.data.top_institutions || []
        recentLeads.value = response.data.recent_leads || []
        recentActivities.value = response.data.recent_activities || []
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      error.value = 'Gagal memuat data dashboard. Silakan coba lagi.'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    stats,
    topInstitutions,
    recentLeads,
    recentActivities,
    fetchDashboardData
  }
}
