import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useListStore = defineStore('list', () => {
  const documents = ref([])
  const total = ref(0)

  // 문서 리스트 조회
  const fetchDocuments = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/list?page=${page}&limit=5`
      )

      console.log(response.data)

      // 총 개수
      total.value = response.data.total

      // 문서 데이터
      documents.value = response.data.documents.map(post => ({
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
    }
  }

  // 즐겨찾기
  const toggleFavorite = async (id, current) => {
    try {
      const newValue = !current

      await axios.patch(
        `http://localhost:3000/api/documents/${id}/favorite`,
        { isFavorite: newValue }
      )

      const target = documents.value.find(doc => doc.id === id)

      if (target) {
        target.isFavorite = newValue
      }

      if (!newValue) {
        documents.value = documents.value.filter(doc => doc.id !== id)
      }

    } catch (e) {
      console.error('즐겨찾기 변경 실패:', e)
    }
  }

  // 즐겨찾기 목록
  const fetchFavoriteDocuments = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/favorites'
      )

      documents.value = response.data.map(post => ({
        id: post._id,
        title: post.title,
        author: '익명',
        date: new Date(post.createdAt).toLocaleDateString(),
        type: post.files?.[0]?.type?.split('/')[1]?.toUpperCase() || 'FILE',
        content: post.content,
        isFavorite: post.isFavorite,

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

  // 검색
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
          size: file.size
            ? (file.size / 1024).toFixed(1) + 'KB'
            : '',
          ext: file.originalName?.split('.').pop()?.toLowerCase() || '',
          url: file.fileUrl,
          fileKey: file.fileKey
        })) || []
      }))

      total.value = documents.value.length

    } catch (e) {
      console.error('검색 실패:', e)
    }
  }

  return {
    documents,
    total,
    fetchDocuments,
    toggleFavorite,
    fetchFavoriteDocuments,
    searchDocuments
  }
})