import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, reactive } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const signup = async (payload) => {
    console.log("payload ==> ", payload);
    loading.value = true
    error.value = null
    try {
      // Node.js 서버 주소에 맞게 수정하세요 (예: http://localhost:3000/api/signup)
      const response = await axios.post('http://127.0.0.1:3000/auth/signup', payload)
      user.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
      return { success: false, message: this.error }
    } finally {
      loading.value = false
    }
  }

  const login = async (payload) => {
      loading.value = true
      try {
          const response = await axios.post('http://localhost:3000/auth/login', payload)
          if (response.data.success) {
              user.value = response.data.user
              return { success: true }
          } else {
              return { success: false, message: response.data.message }
          }
      } catch (err) {
          return { success: false, message: '서버 통신 오류' }
      } finally {
          loading.value = false
      }
  }

  const checkPassword = async (payload) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/check-password', payload)

      return response.data

    } catch (err) {
      return { success: false, message: '서버 통신 오류' }
    }
  }  
    
  return {
    user,
    loading,
    error,
    signup,
    login,
    checkPassword
  }
})