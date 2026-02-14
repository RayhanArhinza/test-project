<!-- views/LoginView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Login Admin</h2>
        <p class="text-sm text-gray-500 mt-2">Masukkan kredensial Anda untuk melanjutkan</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            v-model="credentials.email"
            type="email"
            placeholder="admin@example.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="credentials.password"
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
      <ErrorAlert v-if="error" :message="error" class="mt-4" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import ErrorAlert from '../components/ErrorAlert.vue'

const router = useRouter()
const { loading, error, isAuthenticated, login } = useAuth()

const credentials = reactive({
  email: '',
  password: ''
})

// Check jika sudah login
onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/dashboard')
  }
})

const handleLogin = async () => {
  await login(credentials)
}
</script>
