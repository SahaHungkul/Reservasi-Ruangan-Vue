import { defineStore } from 'pinia'
import api from '@/services/axios' // <— pakai axiosInstance

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    init() {
      if (this.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    },

    async login(email, password) {
      try {
        const { data } = await api.post('/auth/login', { email, password })

        this.user = data.user || data.data?.user
        this.role = this.user?.role || data.role
        this.token = data.token || data.data?.token

        if (!this.token) throw new Error('Token tidak ditemukan')

        localStorage.setItem('token', this.token)
        localStorage.setItem('role', this.role)

        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        return this.role
      } catch (err) {
        console.error('Login error:', err.response?.data || err.message)
        throw new Error(err.response?.data?.message || 'Login gagal')
      }
    },

    logout() {
      this.user = null
      this.role = null
      this.token = null
      localStorage.clear()
    },
  },
})
