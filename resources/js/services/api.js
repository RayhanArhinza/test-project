// resources/js/services/api.js
import axios from 'axios'


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

api.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response || error)
        if (error.response?.status === 401) {
            localStorage.removeItem('admin_token')
            localStorage.removeItem('admin_user')
            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)
export default api
