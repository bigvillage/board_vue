<template>
  <div class="card" @click="showModal = true">
    <div class="card-header">
      <img :src="fileIconUrl" alt="file type icon" class="file-icon" />
      <h3>{{ document.title }}</h3>
    </div>

    <el-tooltip effect="light" :content="document.content" placement="top" :show-after="300" raw-content>
      <p class="content-preview">
        {{ document.content }}
      </p>
    </el-tooltip>

    <div class="meta">
      <div class="tag-group">
        <span v-for="tag in document.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
      <span class="views">조회수 {{ document.views || 0 }}</span>
    </div>
  </div>

  <!-- 🔥 상세 모달 -->
  <DocumentDetail v-model="showModal" :document="document" @download="downloadFile" />
</template>

<script setup>
import { ref, computed } from 'vue'
import DocumentDetail from './DocumentDetail.vue'

// props
const props = defineProps({
  document: {
    type: Object,
    default: () => ({
      attachments: []
    })
  }
})

// 모달 상태
const showModal = ref(false)

// 다운로드
const downloadFile = (file) => {
  window.open(
    `http://localhost:3000/api/download?url=${encodeURIComponent(file.url)}&name=${file.name}`
  )
}

// 아이콘 처리 (attachments 기준으로 변경 🔥)
const fileIconUrl = computed(() => {
  const ext = props.document.attachments?.[0]?.ext?.toLowerCase()

  switch (ext) {
    case 'pdf': return '/icons/icon_pdf.png'
    case 'hwp': return '/icons/icon_hwp.png'
    case 'txt': return '/icons/icon_txt.png'
    case 'png': return '/icons/icon_png.png'
    case 'jpg': return '/icons/icon_jpg.png'
    default: return '/icons/icon_default.png'
  }
})
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  transition: all 0.2s;
  cursor: pointer;
  /* 🔥 클릭 가능 */
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #409EFF;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.file-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #303133;
}

.content-preview {
  color: #606266;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 10px 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  color: gray;
}

.tag {
  background: #f0f2f5;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 5px;
}
</style>