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
          isFavorite: post.isFavorite || false,

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

    const toggleFavorite = async (id, current) => {
      try {
        const newValue = !current

        await axios.patch(
          `http://localhost:3000/api/documents/${id}/favorite`,
          { isFavorite: newValue }
        )

        // ⭐ 1. 상태 업데이트
        const target = documents.value.find(doc => doc.id === id)
        if (target) {
          target.isFavorite = newValue
        }

        // ⭐ 2. 즐겨찾기 페이지면 제거
        if (!newValue) {
          documents.value = documents.value.filter(doc => doc.id !== id)
        }

      } catch (e) {
        console.error('즐겨찾기 변경 실패:', e)
      }
    }

    const fetchFavoriteDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/favorites')

        documents.value = response.data.map(post => ({
          id: post._id,
          title: post.title,
          author: '익명',
          date: new Date(post.createdAt).toLocaleDateString(),
          type: post.files?.[0]?.type?.split('/')[1]?.toUpperCase() || 'FILE',
          content: post.content,
          isFavorite: post.isFavorite, // ⭐ 중요

          attachments: post.files?.map(file => ({
            name: file.originalName,
            size: (file.size / 1024).toFixed(1) + 'KB',
            ext: file.originalName?.split('.').pop()?.toLowerCase() || '',
            url: file.fileUrl,
            fileKey: file.fileKey
          })) || []
        }))

      } catch (error) {
        console.error('즐겨찾기 불러오기 에러:', error)
      }
    }

    // 리스트 검색
    const searchDocuments = async (keyword) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/search?q=${keyword}`
        )

        documents.value = response.data.map(post => ({
          id: post._id,
          title: post.title,
          author: '익명',
          date: new Date(post.createdAt).toLocaleDateString(),
          type: post.files?.[0]?.type?.split('/')[1]?.toUpperCase() || 'FILE',
          content: post.content,
          isFavorite: post.isFavorite || false,

          attachments: post.files?.map(file => ({
            name: file.originalName,
            size: file.size ? (file.size / 1024).toFixed(1) + 'KB' : '',
            ext: file.originalName?.split('.').pop()?.toLowerCase() || '',
            url: file.fileUrl,
            fileKey: file.fileKey
          })) || []
        }))

      } catch (e) {
        console.error('검색 실패:', e)
      }
    }
    
  
  return { fetchDocuments, documents, toggleFavorite, fetchFavoriteDocuments, searchDocuments }
  
})

