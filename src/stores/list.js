import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useListStore = defineStore('list', () => {
  const documents = ref([])
  const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/list')

        // Mongo 데이터 추출
        documents.value = response.data.map(post => ({
          id: post._id,
          title: post.title,
          author: '익명',
          date: new Date(post.createdAt).toLocaleDateString(),
          type: post.files?.[0]?.type?.split('/')[1]?.toUpperCase() || 'FILE',
          content: post.content,

          attachments: post.files?.map(file => ({
            name: file.originalName,
            size: (file.size / 1024).toFixed(1) + 'KB',
            ext: file.originalName?.split('.').pop()?.toLowerCase() || '',
            url: file.fileUrl,
            fileKey: file.fileKey
          })) || []
        }))

      } catch (error) {
        console.error('리스트 불러오기 에러:', error)
        throw error
      }
    }
    
  
  return { fetchDocuments, documents }
  
})

