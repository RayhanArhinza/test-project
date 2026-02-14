<!-- views/LeadsView.vue -->
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
            v-model="searchQuery"
            @input="handleSearch"
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
                      @click="handleEdit(lead)"
                      class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>

                    <button
                      @click="handleDelete(lead.id)"
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
    <LeadFormModal
      :show="showModal"
      :form-data="editFormData"
      @close="showModal = false"
      @submit="handleUpdate"
    />
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import LeadFormModal from '../components/LeadFormModal.vue'
import { useLeads } from '../composables/useLeads'

const { leads, fetchLeads, updateLead, deleteLead } = useLeads()

const searchQuery = ref('')
const showModal = ref(false)
const editFormData = ref({
  id: null,
  name: '',
  whatsapp_number: '',
  email: '',
  institution_name: ''
})

const handleSearch = () => {
  fetchLeads(searchQuery.value)
}

const handleEdit = (lead) => {
  editFormData.value = {
    id: lead.id,
    name: lead.name,
    whatsapp_number: lead.whatsapp_number,
    email: lead.email,
    institution_name: lead.institution_name
  }
  showModal.value = true
}

const handleUpdate = async (formData) => {
  const result = await updateLead(formData.id, formData)
  if (result.success) {
    showModal.value = false
    fetchLeads(searchQuery.value)
  } else {
    alert(result.error)
  }
}

const handleDelete = async (id) => {
  if (confirm("Yakin ingin menghapus data ini?")) {
    const result = await deleteLead(id)
    if (result.success) {
      fetchLeads(searchQuery.value)
    } else {
      alert(result.error)
    }
  }
}

onMounted(() => {
  fetchLeads()
})
</script>
