<!-- pages/LeadPage.vue -->
<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Leads</h1>
          <p class="text-sm text-gray-500 mt-1">Kelola data leads Anda</p>
        </div>

        <div class="relative">
          <input
            v-model="search"
            @input="fetchLeads"
            type="text"
            placeholder="Cari nama, email, atau lembaga..."
            class="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
          />
          <svg class="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 bg-gray-50">
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  WhatsApp
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lembaga
                </th>
                <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="lead in leads.data"
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
                  {{ lead.institution_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="openEdit(lead)"
                      class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>

                    <button
                      @click="deleteLead(lead.id)"
                      class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!leads.data || leads.data.length === 0">

                <td colspan="5" class="px-6 py-12 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500">Tidak ada data ditemukan</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Edit Lead</h2>
        </div>

        <form @submit.prevent="updateLead" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              v-model="editForm.name"
              type="text"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="editForm.email"
              type="email"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input
              v-model="editForm.whatsapp_number"
              type="text"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lembaga</label>
            <input
              v-model="editForm.institution_name"
              type="text"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              required
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../services/api'
import AdminLayout from '../layouts/AdminLayout.vue'

const leads = ref({ data: [] })
const search = ref('')
const showModal = ref(false)

const editForm = reactive({
  id: null,
  name: '',
  whatsapp_number: '',
  email: '',
  institution_name: ''
})

const fetchLeads = async () => {
  try {
    const response = await api.get('/admin/leads', {
      params: { search: search.value }
    })

    console.log("FULL RESPONSE:", response)
    console.log("RESPONSE.DATA:", response.data)
    console.log("RESPONSE.DATA.DATA:", response.data.data)

    leads.value = response.data

  } catch (error) {
    console.error('Error fetching leads:', error)
  }
}


const deleteLead = async (id) => {
  if (confirm("Yakin ingin menghapus data ini?")) {
    try {
      await api.delete(`/admin/leads/${id}`)
      fetchLeads()
    } catch (error) {
      console.error('Error deleting lead:', error)
      alert('Gagal menghapus data')
    }
  }
}

const openEdit = (lead) => {
  editForm.id = lead.id
  editForm.name = lead.name
  editForm.whatsapp_number = lead.whatsapp_number
  editForm.email = lead.email
  editForm.institution_name = lead.institution_name
  showModal.value = true
}

const updateLead = async () => {
  try {
    await api.put(`/admin/leads/${editForm.id}`, editForm)
    showModal.value = false
    fetchLeads()
  } catch (error) {
    console.error('Error updating lead:', error)
    alert('Gagal mengupdate data')
  }
}

onMounted(fetchLeads)
</script>
