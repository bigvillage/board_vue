<template>
  <div class="card">
    <div class="card-header">
      <img :src="fileIconUrl" alt="file type icon" class="file-icon" />
      <h3>{{ document.title }}</h3>
    </div>

    <el-tooltip class="box-item" effect="light" :content="document.content" placement="top" :show-after="300"
      raw-content>
      <p class="content-preview">
        {{ document.content
        }}contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
      </p>
    </el-tooltip>

    <div class="meta">
      <div class="tag-group">
        <span v-for="tag in document.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
      <span class="views">조회수 {{ document.views }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  document: {
    type: Object,
    default: () => ({
      title: '제목 없음',
      content: '내용이 없습니다.',
      extension: 'txt',
      tags: ['태그'],
      views: 0
    })
  }
})

const fileIconUrl = computed(() => {
  const ext = props.document.extension?.toLowerCase()
  switch (ext) {
    case 'pdf': return '/icons/icon_pdf.png'
    case 'hwp': return '/icons/icon_hwp.png'
    case 'txt': return '/icons/icon_txt.png'
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

/* --- [핵심: 툴팁이 적용될 텍스트 영역] --- */
.content-preview {
  color: #606266;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 10px 0;
  cursor: pointer;
  /* 클릭할 수 있는 느낌 부여 */

  /* 2줄 말줄임표 처리 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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