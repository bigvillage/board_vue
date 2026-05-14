import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useListStore = defineStore('list', () => {
  const documents = ref([])
  const total = ref(0)
  const API_URL = 'http://localhost:3000/api/documents/list'

  // 문서 리스트 조회
  const fetchDocuments = async (page = 1) => {
    try {
      // 주소 변경 및 쿼리 파라미터 전달
      const response = await axios.get(`${API_URL}?page=${page}&limit=5`, {withCredentials: true})
      
      // 백엔드 util.writeSuccess 규격에 따라 response.data.data 사용
      const resData = response.data.data || response.data;
      total.value = resData.total

      // 데이터 매핑
      documents.value = resData.documents.map(post => ({
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

  // 즐겨찾기 토글 (이제 PATCH /api/documents/upload 사용)
  const toggleFavorite = async (id, current) => {
    try {
      const newValue = !current
      // 백엔드 통합 주소로 PATCH 요청
      await axios.patch('http://localhost:3000/api/documents/upload', { 
        id, 
        isFavorite: newValue 
      })

      const target = documents.value.find(doc => doc.id === id)
      if (target) target.isFavorite = newValue
      
      // 즐겨찾기 해제 시 목록에서 제거 로직 유지
      if (!newValue) {
        documents.value = documents.value.filter(doc => doc.id !== id)
      }
    } catch (e) {
      console.error('즐겨찾기 변경 실패:', e)
    }
  }

  // 즐겨찾기 목록 조회 (GET /api/documents/list?isFavorite=true)
  const fetchFavoriteDocuments = async () => {
    try {
      const response = await axios.get(`${API_URL}?isFavorite=true`)
      const resData = response.data.data.documents // 통합 구조 반영

      documents.value = resData.map(post => ({
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

  // 검색 (POST /api/documents/list)
  const searchDocuments = async (keyword) => {
    try {
      // 전문 검색은 POST 메서드로 keyword를 보냄
      const response = await axios.post(API_URL, { q: keyword })
      const resData = response.data.data // 통합 구조 반영

      documents.value = resData.map(post => ({
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
      total.value = documents.value.length
    } catch (e) {
      console.error('검색 실패:', e)
    }
  }

  return { documents, total, fetchDocuments, toggleFavorite, fetchFavoriteDocuments, searchDocuments }
})