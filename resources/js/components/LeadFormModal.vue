<!-- components/LeadFormModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click.self="handleClose"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input
            v-model="localForm.name"
            type="text"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="localForm.email"
            type="email"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
          <input
            v-model="localForm.whatsapp_number"
            type="text"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lembaga</label>
          <input
            v-model="localForm.institution_name"
            type="text"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="handleClose"
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
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Edit Lead'
  },
  formData: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      email: '',
      whatsapp_number: '',
      institution_name: ''
    })
  }
})

const emit = defineEmits(['close', 'submit'])

const localForm = ref({ ...props.formData })

watch(() => props.formData, (newData) => {
  localForm.value = { ...newData }
}, { deep: true })

const handleClose = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...localForm.value })
}
</script>
