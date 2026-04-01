import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  actions: {
    async signup(payload) {
      this.loading = true
      this.error = null
      try {
        // Node.js 서버 주소에 맞게 수정하세요 (예: http://localhost:3000/api/signup)
        const response = await axios.post('/api/signup', payload)
        this.user = response.data
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    }
  }
})