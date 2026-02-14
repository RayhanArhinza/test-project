// composables/useDateFormatter.js
export function useDateFormatter() {
  const formatDate = (dateString) => {
    if (!dateString) return '-'

    try {
      const date = new Date(dateString)
      const now = new Date()
      const diff = now - date
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      if (days > 0) return `${days} hari yang lalu`
      if (hours > 0) return `${hours} jam yang lalu`
      if (minutes > 0) return `${minutes} menit yang lalu`
      return 'Baru saja'
    } catch (e) {
      return '-'
    }
  }

  const formatFullDate = (dateString) => {
    if (!dateString) return '-'

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (e) {
      return '-'
    }
  }

  return {
    formatDate,
    formatFullDate
  }
}
