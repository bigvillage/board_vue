<template>
  <div class="page-container">
    <div class="header-section">
      <div class="title-group">
        <h1>문서 보관함</h1>
        <p class="subtitle">총 {{ documents.length }}개의 문서가 검색되었습니다.</p>
      </div>

      <router-link to="/upload">
        <el-button type="primary" size="large" class="upload-btn">
          <el-icon style="margin-right: 5px;">
            <Plus />
          </el-icon> 새 문서 업로드
        </el-button>
      </router-link>
    </div>

    <div class="search-section">
      <SearchBar />
    </div>

    <div class="document-list">
      <DocumentCard v-for="doc in documents" :key="doc.id" :document="doc" />
    </div>

    <div v-if="documents.length === 0" class="empty-state">
      <el-empty description="검색된 문서가 없습니다." />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from "../components/SearchBar.vue"
import DocumentCard from "../components/DocumentCard.vue"

// 샘플 데이터 (나중에 API 연동 시 이 부분을 fetch 데이터로 교체합니다)
const documents = ref([
  { id: 1, title: '2024년 프로젝트 기획서', author: '김철수', date: '2024-03-20', type: 'PDF' },
  { id: 2, title: '디자인 가이드라인_최종', author: '이영희', date: '2024-03-21', type: 'DOCX' },
  { id: 3, title: '서버 아키텍처 다이어그램', author: '박지민', date: '2024-03-22', type: 'PNG' },
  { id: 4, title: '연간 매출 보고서', author: '최팀장', date: '2024-03-15', type: 'XLSX' },
  { id: 5, title: '팀 회의록 (3월 4주차)', author: '정대리', date: '2024-03-25', type: 'DOCX' },
  { id: 6, title: '클라우드 서비스 계약서', author: '법무팀', date: '2024-03-10', type: 'PDF' },
])
</script>

<style scoped>
.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;
  background-color: #f8f9fa;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.title-group h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #6c757d;
  margin: 8px 0 0 0;
  font-size: 1rem;
}

.search-section {
  margin-bottom: 40px;
  width: 100%;
}

.document-list {
  display: grid;
  /* 카드 너비를 최소 320px로 설정하고 남는 공간을 꽉 채움 */
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
}

.empty-state {
  margin-top: 100px;
}

/* Element Plus 버튼을 썼을 경우의 스타일링 */
.upload-btn {
  border-radius: 12px;
  font-weight: 700;
  padding: 25px 30px;
  font-size: 1rem;
}
</style>