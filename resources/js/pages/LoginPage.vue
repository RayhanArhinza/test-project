<!-- pages/LoginPage.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Login Admin</h2>
        <p class="text-sm text-gray-500 mt-2">Masukkan kredensial Anda untuk melanjutkan</p>
      </div>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="admin@example.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses...
          </span>
          <span v-else>Login</span>
        </button>
      </form>

      <!-- Error Alert -->
      <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const error = ref(null)
const loading = ref(false)

// Check jika sudah login
onMounted(() => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    router.push('/dashboard')
  }
})

const login = async () => {
  error.value = null
  loading.value = true

  try {
    const response = await api.post('/admin/login', form)

    if (response.data.admin) {
      // Simpan data admin
      localStorage.setItem('admin_user', JSON.stringify(response.data.admin))

      // Simpan token/flag auth
      if (response.data.token) {
        // Jika pakai token-based (Sanctum/Passport)
        localStorage.setItem('admin_token', response.data.token)
      } else {
        // Jika pakai session-based
        localStorage.setItem('admin_token', 'session-authenticated')
      }

      // Redirect ke dashboard
      router.push('/dashboard')
    } else {
      error.value = 'Response tidak valid dari server'
    }
  } catch (err) {
    console.error('Login error:', err)

    // Handle different error types
    if (err.response) {
      switch (err.response.status) {
        case 401:
          error.value = err.response.data.message || 'Email atau password salah'
          break
        case 419:
          error.value = 'Session expired. Silakan refresh halaman.'
          setTimeout(() => {
            window.location.reload()
          }, 2000)
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
  } finally {
    loading.value = false
  }
}
</script>
