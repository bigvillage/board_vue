<template>
  <div class="page-container">
    <div class="header-section">
      <div class="title-group">
        <h1>문서 보관함</h1>
        <p class="subtitle">총 {{ filteredDocuments.length }}개의 문서가 검색되었습니다.</p>
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
            </el-icon>
            새 문서 업로드
          </el-button>
        </router-link>
      </div>
    </div>

    <!-- 🔥 필터 영역 -->
    <div class="filter-section">
      <el-select v-model="filterType" style="width: 150px;">
        <el-option label="최신순" value="latest" />
        <el-option label="오래된순" value="oldest" />
        <el-option label="제목순" value="title" />
      </el-select>
    </div>

    <div class="search-section">
      <SearchBar @search="handleSearch" />
    </div>

    <div :class="viewMode === 'grid' ? 'document-grid' : 'document-list'">
      <template v-if="viewMode === 'grid'">
        <DocumentCard v-for="doc in filteredDocuments" :key="'grid-' + doc.id" :document="doc" />
      </template>

      <template v-else>
        <DocumentListItem v-for="doc in filteredDocuments" :key="'list-' + doc.id" :document="doc" />
      </template>
    </div>

    <div v-if="filteredDocuments.length === 0" class="empty-state">
      <el-empty description="검색된 문서가 없습니다." />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'

import { Grid, List, Plus } from '@element-plus/icons-vue'
import SearchBar from "../components/SearchBar.vue"
import DocumentCard from "../components/DocumentCard.vue"
import DocumentListItem from "../components/DocumentListItem.vue"

// 상태
const viewMode = ref('grid')
const filterType = ref('latest')
const keyword = ref('')

// store
const listStore = useListStore()
const { documents } = storeToRefs(listStore)

// 검색
const handleSearch = (k) => {
  keyword.value = k.toLowerCase()
}

// 필터 + 검색 적용
const filteredDocuments = computed(() => {
  let result = [...documents.value]

  // 검색 필터 (제목 기준)
  if (keyword.value) {
    result = result.filter(doc =>
      doc.title?.toLowerCase().includes(keyword.value)
    )
  }

  // 정렬
  if (filterType.value === 'latest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  if (filterType.value === 'oldest') {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }

  if (filterType.value === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

// 초기 데이터
onMounted(() => {
  listStore.fetchDocuments()
})
</script>

<style scoped>
.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 30px 40px;
  box-sizing: border-box;
  background-color: #f8f9fa;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.title-group h1 {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
}

.subtitle {
  color: #6c757d;
  margin-top: 5px;
}

/* 필터 영역 */
.filter-section {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}

.search-section {
  margin-bottom: 20px;
}

.document-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.document-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-state {
  margin-top: 50px;
}
</style>