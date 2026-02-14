// composables/useAuth.js
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => {
    return !!localStorage.getItem('admin_token')
  })

  const currentUser = computed(() => {
    const user = localStorage.getItem('admin_user')
    return user ? JSON.parse(user) : null
  })

  const login = async (credentials) => {
    error.value = null
    loading.value = true

    try {
      const response = await api.post('/admin/login', credentials)

      if (response.data.admin) {
        localStorage.setItem('admin_user', JSON.stringify(response.data.admin))

        if (response.data.token) {
          localStorage.setItem('admin_token', response.data.token)
        } else {
          localStorage.setItem('admin_token', 'session-authenticated')
        }

        router.push('/dashboard')
        return { success: true }
      } else {
        throw new Error('Response tidak valid dari server')
      }
    } catch (err) {
      console.error('Login error:', err)

      if (err.response) {
        switch (err.response.status) {
          case 401:
            error.value = err.response.data.message || 'Email atau password salah'
            break
          case 419:
            error.value = 'Session expired. Silakan refresh halaman.'
            setTimeout(() => window.location.reload(), 2000)
            break
          case 422:
            error.value = 'Data yang dimasukkan tidak valid'
            break
          case 500:
            error.value = 'Terjadi kesalahan di server. Silakan coba lagi.'
            break
          default:
            error.value = err.response.data.message || 'Login gagal. Silakan coba lagi.'
        }
      } else if (err.request) {
        error.value = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
      } else {
        error.value = 'Terjadi kesalahan. Silakan coba lagi.'
      }

      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await api.post('/admin/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      router.push('/login')
    }
  }

  return {
    loading,
    error,
    isAuthenticated,
    currentUser,
    login,
    logout
  }
}
