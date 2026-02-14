// composables/useActivityLogs.js
import { ref } from 'vue'
import api from '../services/api'

export function useActivityLogs() {
  const logs = ref({ data: [] })
  const loading = ref(false)
  const error = ref(null)

  const fetchLogs = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/admin/activity-logs')
      logs.value = response.data
    } catch (err) {
      console.error('Error fetching activity logs:', err)
      error.value = 'Gagal memuat activity logs'
    } finally {
      loading.value = false
    }
  }

  return {
    logs,
    loading,
    error,
    fetchLogs
  }
}
