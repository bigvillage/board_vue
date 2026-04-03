<script setup>
import { computed } from 'vue'

// 1. 부모 컴포넌트에서 넘겨준 문서 데이터를 props로 정의합니다.
const props = defineProps({
  document: {
    type: Object,
    default: () => ({
      title: '제목 없음',
      content: '내용이 없습니다.',
      extension: 'txt', // 기본 확장자
      tags: ['태그'],
      views: 0
    })
  }
})

// 2. 확장자에 따라 미리 준비한 아이콘 이미지 경로를 결정하는 계산된 속성
// (반드시 해당 경로에 아이콘 파일이 존재해야 합니다.)
const fileIconUrl = computed(() => {
  const ext = props.document.extension?.toLowerCase()

  switch (ext) {
    case 'pdf': return '/icons/icon_pdf.png'    // 예시 경로
    case 'hwp': return '/icons/icon_hwp.png'    // 예시 경로
    case 'txt': return '/icons/icon_txt.png'    // 예시 경로
    // 더 많은 확장자를 추가할 수 있습니다.
    default: return '/icons/icon_default.png'   // 기본 아이콘
  }
})
</script>

<template>
  <div class="card">

    <div class="card-header">
      <img :src="fileIconUrl" alt="file type icon" class="file-icon" />
      <h3>{{ document.title }}</h3>
    </div>

    <p>
      {{ document.content }}
    </p>

    <div class="meta">
      <span v-for="tag in document.tags" :key="tag">
        {{ tag }}
      </span>
      <span>조회수 {{ document.views }}</span>
    </div>

  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  /* (선택사항) 카드에 호버 효과 추가 */
  transition: box-shadow 0.2s;
  background-color: white;
}

/* (선택사항) 카드 호버 시 그림자 추가 */
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 4. 제목과 아이콘을 가로로 정렬하기 위한 스타일 */
.card-header {
  display: flex;
  align-items: center;
  /* 세로 중앙 정렬 */
  gap: 10px;
  /* 아이콘과 제목 사이 간격 */
  margin-bottom: 10px;
  /* 제목 아래 간격 */
}

/* 5. 아이콘 이미지 스타일 정의 */
.file-icon {
  width: 24px;
  /* 아이콘 크기 조절 */
  height: 24px;
  object-fit: contain;
  /* 이미지 비율 유지 */
}

/* 기존 h3 스타일 수정: margin 제거 */
.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #303133;
}

/* 기존 p 스타일 수정: 가독성 높임 */
.card-header+p {
  color: #606266;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 10px 0;
}

.meta {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: gray;
}
</style>