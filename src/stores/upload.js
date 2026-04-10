import { defineStore } from 'pinia'
import axios from 'axios'

export const useUploadStore = defineStore('upload', {
  actions: {
    async uploadDocument(formData) {
      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // 파일 전송 시 필수 설정
          }
        })
        return response.data
      } catch (error) {
        console.error('업로드 스토어 에러:', error)
        throw error
      }
    }
  }
})