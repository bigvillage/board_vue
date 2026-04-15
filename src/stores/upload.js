import { defineStore } from 'pinia'
import {ref, computed} from 'vue'
import axios from 'axios'

export const useUploadStore = defineStore('upload', () => {
  const uploadDocument = async (formData) => {
      try {
        console.log("formData ==> ", formData);
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

  const editDocument = async (id, formData) => {
    console.log("editDocument 진입")
    try {
      console.log("id ==> ", id)
      console.log("formData ==> ", formData)
      await axios.put(`http://localhost:3000/api/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.error('수정 에러:', error)
      throw error
    }
  }

  return {uploadDocument, editDocument}
})