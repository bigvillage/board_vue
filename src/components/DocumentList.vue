<template>
  <div class="page-container">
    <div class="header-section">
      <div class="title-group">
        <h1>문서 보관함</h1>
        <p class="subtitle">총 {{ documents.length }}개의 문서가 검색되었습니다.</p>
      </div>

      <div class="action-group">
        <el-button-group class="view-toggle">
          <el-button :type="viewMode === 'grid' ? 'primary' : ''" @click="viewMode = 'grid'">
            <el-icon>
              <Grid />
            </el-icon>
          </el-button>
          <el-button :type="viewMode === 'list' ? 'primary' : ''" @click="viewMode = 'list'">
            <el-icon>
              <List />
            </el-icon>
          </el-button>
        </el-button-group>

        <router-link to="/upload">
          <el-button type="primary" size="large" class="upload-btn">
            <el-icon style="margin-right: 5px;">
              <Plus />
            </el-icon> 새 문서 업로드
          </el-button>
        </router-link>
      </div>
    </div>

    <div class="search-section">
      <SearchBar @search="handleSearch" />
    </div>

    <div :class="viewMode === 'grid' ? 'document-grid' : 'document-list'">
      <template v-if="viewMode === 'grid'">
        <DocumentCard v-for="doc in documents" :key="'grid-' + doc.id" :document="doc" />
      </template>
      <template v-else>
        <DocumentListItem v-for="doc in documents" :key="'list-' + doc.id" :document="doc" />
      </template>
    </div>

    <div v-if="documents.length === 0" class="empty-state">
      <el-empty description="검색된 문서가 없습니다." />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'

import { Grid, List, Plus } from '@element-plus/icons-vue'
import SearchBar from "../components/SearchBar.vue"
import DocumentCard from "../components/DocumentCard.vue"
import DocumentListItem from "../components/DocumentListItem.vue"

const handleSearch = (keyword) => {
  listStore.searchDocuments(keyword)
}
// 뷰 모드
const viewMode = ref('grid')

// 🔥 store 연결
const listStore = useListStore()

// 🔥 핵심: store state를 반응형으로 가져오기
const { documents } = storeToRefs(listStore)
console.log("documents ==> ", documents.value);

// 🔥 마운트 시 데이터 불러오기
onMounted(() => {
  listStore.fetchDocuments()
})
</script>

<style scoped>
/* 1. 전체 레이아웃 컨테이너 */
.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 30px 40px;
  /* 상하 30px, 좌우 40px로 적당한 긴장감 유지 */
  box-sizing: border-box;
  background-color: #f8f9fa;
  /* 부드러운 연회색 배경 */
}

/* 2. 헤더 섹션 (제목 + 버튼들) */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 제목과 버튼들의 세로 중앙 정렬 */
  margin-bottom: 25px;
  /* 검색바와의 간격 (가깝게 조정) */
}

.title-group h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #6c757d;
  margin: 4px 0 0 0;
  font-size: 0.9rem;
}

/* 3. 우측 액션 버튼 그룹 (뷰 전환 + 업로드) */
.action-group {
  display: flex;
  align-items: center;
  gap: 12px;
  /* 버튼들 사이의 좁은 간격 */
}

/* 뷰 전환 버튼 그룹 스타일 */
.view-toggle :deep(.el-button) {
  padding: 8px 12px;
}

/* 4. 검색 섹션 */
.search-section {
  width: 100%;
  margin-bottom: 30px;
  /* 검색바와 리스트 사이의 간격 */
}

/* 5. 문서 리스트 레이아웃 (그리드/리스트 공통) */
.document-container {
  width: 100%;
}

/* 그리드(카드) 모드일 때 */
.document-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  /* 카드 사이의 촘촘한 간격 */
}

/* 리스트 모드일 때 */
.document-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* 리스트 아이템 사이의 좁은 간격 */
}

/* 6. 컴포넌트 내부 요소 스타일 보정 */
.upload-btn {
  border-radius: 10px;
  font-weight: 700;
  padding: 12px 20px;
  font-size: 0.95rem;
  height: auto;
  /* Element Plus 기본 높이 무시 */
}

/* 비어있을 때의 상태 */
.empty-state {
  margin-top: 50px;
  text-align: center;
}

/* 반응형 대응 (모바일) */
@media (max-width: 768px) {
  .page-container {
    padding: 20px;
  }

  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .action-group {
    width: 100%;
    justify-content: space-between;
  }
}
</style>