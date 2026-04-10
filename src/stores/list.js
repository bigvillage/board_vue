import { defineStore } from 'pinia'
import axios from 'axios'

export const useListStore = defineStore('list', {
  state: () => ({
    documents: []
  }),

  actions: {
    async fetchDocuments() {
      try {
        const response = await axios.get('http://localhost:3000/api/list')

        // 🔥 Mongo → Vue 구조 변환
        this.documents = response.data.map(post => ({
          id: post._id,
          title: post.title,
          author: '익명',
          date: new Date(post.createdAt).toLocaleDateString(),
          type: post.files?.[0]?.type?.split('/')[1]?.toUpperCase() || 'FILE',
          content: post.content,

          attachments: post.files?.map(file => ({
            name: file.originalName,
            size: (file.size / 1024).toFixed(1) + 'KB',
            // ext: file.type.split('/')[1],
            url: file.fileUrl
          })) || []
        }))

      } catch (error) {
        console.error('리스트 불러오기 에러:', error)
        throw error
      }
    }
  }
})