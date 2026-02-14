<!-- views/LandingView.vue -->
<template>
  <PublicLayout>
    <div class="bg-gradient-to-b from-indigo-50 via-white to-purple-50/30 min-h-screen">

      <!-- Hero Section -->
      <section class="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <!-- Background blobs -->
        <div class="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div class="absolute -top-40 -left-40 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-blob-slow"></div>
          <div class="absolute top-20 right-10 w-80 h-80 bg-indigo-300 rounded-full blur-3xl animate-blob animation-delay-3000"></div>
          <div class="absolute -bottom-20 left-1/3 w-96 h-96 bg-pink-200 rounded-full blur-3xl animate-blob animation-delay-6000"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Temukan Solusi Terbaik
            </span>
            <br class="hidden sm:block" />
            <span class="text-3xl md:text-4xl lg:text-5xl mt-3 block text-gray-800">
              untuk Lembaga Anda
            </span>
          </h1>

          <p class="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan lembaga pendidikan, bisnis, dan komunitas yang telah mempercayakan pengelolaan data dan pertumbuhan mereka kepada kami. Gratis & tanpa komitmen.
          </p>

          <div class="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#form-section" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-lg">
              Daftar Sekarang — Gratis
              <svg class="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <!-- Trust badges -->
          <div class="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Data Aman & Terenkripsi
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Tanpa Spam
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Respon Cepat
            </div>
          </div>
        </div>
      </section>

      <!-- Informasi Lembaga / Keunggulan -->
      <section class="py-16 md:py-24 bg-white/60 backdrop-blur-sm border-t border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Mengapa Lembaga Lain Memilih Kami?
          </h2>

          <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-800">Keamanan Terjamin</h3>
              <p class="text-gray-600">Data dienkripsi end-to-end dan kami mematuhi standar privasi terkini.</p>
            </div>

            <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-800">Pertumbuhan Cepat</h3>
              <p class="text-gray-600">Ribuan lembaga telah meningkatkan konversi dan engagement mereka bersama kami.</p>
            </div>

            <div class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div class="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-800">Support 24/7</h3>
              <p class="text-gray-600">Tim kami siap membantu kapan saja via WhatsApp atau email.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Form Section -->
      <section id="form-section" class="py-20 md:py-28">
        <div class="max-w-lg mx-auto px-6">
          <div class="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100/50">

            <div class="text-center mb-8">
              <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mulai Sekarang
              </h2>
              <p class="mt-3 text-gray-600">Isi data di bawah ini, kami akan segera menghubungi Anda.</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">

              <div>
                <label class="block mb-2 font-medium text-gray-700">Nama Lengkap</label>
                <input v-model="form.name" type="text" required placeholder="Contoh: Rayhan Pratama" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all" />
              </div>

              <div>
                <label class="block mb-2 font-medium text-gray-700">Nomor WhatsApp</label>
                <input v-model="form.whatsapp_number" type="tel" required placeholder="0812-3456-7890" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all" />
              </div>

              <div>
                <label class="block mb-2 font-medium text-gray-700">Email</label>
                <input v-model="form.email" type="email" required placeholder="contoh@email.com" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all" />
              </div>

              <div>
                <label class="block mb-2 font-medium text-gray-700">Nama Lembaga / Instansi</label>
                <input v-model="form.institution_name" type="text" required placeholder="SMA Negeri 1 Surabaya / PT Maju Jaya" class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all" />
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-3 text-lg"
              >
                <svg v-if="loading" class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span v-if="loading">Mengirim...</span>
                <span v-else>Daftar Gratis →</span>
              </button>
            </form>

            <SuccessMessage :message="successMessage" />
            <ErrorAlert v-if="errorMessage" :message="errorMessage" />

            <p class="mt-8 text-center text-sm text-gray-500">
              Data Anda 100% aman dan tidak akan dibagikan kepada pihak ketiga 🔒
            </p>
          </div>
        </div>
      </section>

      <!-- Simple Testimonial / Social Proof -->
      <section class="py-16 bg-gradient-to-b from-purple-50/30 to-white">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-10 text-gray-800">Sudah Dipercaya oleh Banyak Lembaga</h2>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <p class="text-gray-700 italic mb-4">"Prosesnya sangat cepat dan tim support sangat responsif. Rekomendasi!"</p>
              <p class="font-semibold text-indigo-700">– Kepala Sekolah SMA Nusantara</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <p class="text-gray-700 italic mb-4">"Konversi lead naik signifikan setelah bergabung. Terima kasih!"</p>
              <p class="font-semibold text-indigo-700">– Direktur PT Maju Bersama</p>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h3 class="text-2xl font-bold mb-4">LeadsApp</h3>
        <p class="mb-6 opacity-80">Membangun masa depan lembaga Anda dengan data yang lebih baik.</p>

        <div class="flex justify-center gap-8 mb-8">
          <a href="#" class="hover:text-indigo-300 transition">Tentang Kami</a>
          <a href="#" class="hover:text-indigo-300 transition">Privasi</a>
          <a href="#" class="hover:text-indigo-300 transition">Syarat & Ketentuan</a>
        </div>

        <p class="text-sm opacity-70">
          © {{ new Date().getFullYear() }} LeadsApp. All rights reserved.
        </p>
      </div>
    </footer>
  </PublicLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import PublicLayout from '../layouts/PublicLayout.vue'
import SuccessMessage from '../components/SuccessMessage.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import { useLeads } from '../composables/useLeads'

const { loading, createLead } = useLeads()

const form = reactive({
  name: '',
  whatsapp_number: '',
  email: '',
  institution_name: ''
})

const successMessage = ref(null)
const errorMessage = ref(null)

const resetForm = () => {
  Object.assign(form, { name: '', whatsapp_number: '', email: '', institution_name: '' })
}

const handleSubmit = async () => {
  successMessage.value = null
  errorMessage.value = null

  const result = await createLead(form)

  if (result.success) {
    successMessage.value = 'Data berhasil dikirim! Kami akan segera menghubungi Anda.'
    resetForm()
  } else {
    errorMessage.value = result.error
  }
}
</script>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(80px, -60px) scale(1.15); }
  66% { transform: translate(-60px, 80px) scale(0.9); }
}

.animate-blob {
  animation: blob 18s infinite ease-in-out;
}

.animate-blob-slow {
  animation: blob 25s infinite ease-in-out;
}

.animation-delay-3000 { animation-delay: 3s; }
.animation-delay-6000 { animation-delay: 6s; }
</style>
