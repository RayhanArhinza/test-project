// composables/useLeads.js
import { ref } from 'vue'
import axios from 'axios'

// Buat instance axios terpisah untuk public endpoint (tanpa interceptor redirect)
const publicApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Import api yang ada interceptor untuk protected endpoints
import api from '../services/api'

export function useLeads() {
  const leads = ref({ data: [] })
  const loading = ref(false)
  const error = ref(null)

  const fetchLeads = async (search = '') => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/admin/leads', {
        params: { search }
      })
      leads.value = response.data
    } catch (err) {
      console.error('Error fetching leads:', err)
      error.value = 'Gagal memuat data leads'
    } finally {
      loading.value = false
    }
  }

  const createLead = async (leadData) => {
    loading.value = true
    error.value = null

    try {
      // Gunakan publicApi untuk create lead (tidak perlu auth)
      await publicApi.post('/api/admin/leads', leadData)
      return { success: true }
    } catch (err) {
      console.error('Error creating lead:', err)
      error.value = err.response?.data?.message || 'Terjadi kesalahan. Coba beberapa saat lagi.'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateLead = async (id, leadData) => {
    loading.value = true
    error.value = null

    try {
      await api.put(`/admin/leads/${id}`, leadData)
      return { success: true }
    } catch (err) {
      console.error('Error updating lead:', err)
      error.value = 'Gagal mengupdate data'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteLead = async (id) => {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/admin/leads/${id}`)
      return { success: true }
    } catch (err) {
      console.error('Error deleting lead:', err)
      error.value = 'Gagal menghapus data'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead
  }
}
