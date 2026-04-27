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
            </el-icon>
            새 문서 업로드
          </el-button>
        </router-link>
      </div>
    </div>

    <!-- 검색 + 필터 -->
    <div class="search-section">
      <div class="search-filter-row">
        <SearchBar @search="handleSearch" />

        <div class="filter-box">
          <!-- 정렬 기준 -->
          <el-select v-model="sortKey" placeholder="정렬" size="large" style="width: 130px">
            <el-option label="제목순" value="title" />
            <el-option label="날짜순" value="date" />
          </el-select>

          <!-- 오름/내림 -->
          <el-select v-model="sortOrder" size="large" style="width: 120px">
            <el-option label="오름차순" value="asc" />
            <el-option label="내림차순" value="desc" />
          </el-select>
        </div>
      </div>
    </div>

    <!-- 리스트 -->
    <div :class="viewMode === 'grid' ? 'document-grid' : 'document-list'">
      <template v-if="viewMode === 'grid'">
        <DocumentCard v-for="doc in sortedDocuments" :key="'grid-' + doc.id" :document="doc" />
      </template>
      <template v-else>
        <DocumentListItem v-for="doc in sortedDocuments" :key="'list-' + doc.id" :document="doc" />
      </template>
    </div>

    <div v-if="documents.length === 0" class="empty-state">
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

const viewMode = ref('grid')

// 정렬 상태
const sortKey = ref('date')   // title | date
const sortOrder = ref('desc') // asc | desc

const listStore = useListStore()
const { documents } = storeToRefs(listStore)

// 검색
const handleSearch = (keyword) => {
  listStore.searchDocuments(keyword)
}

// 정렬 로직
const sortedDocuments = computed(() => {
  const copied = [...documents.value]

  return copied.sort((a, b) => {
    let result = 0

    if (sortKey.value === 'title') {
      result = a.title.localeCompare(b.title)
    } else if (sortKey.value === 'date') {
      result = new Date(a.date) - new Date(b.date)
    }

    return sortOrder.value === 'asc' ? result : -result
  })
})

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
  margin-top: 4px;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-section {
  width: 100%;
  margin-bottom: 30px;
}

/* 핵심: 검색 + 필터 한 줄 */
.search-filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 오른쪽 필터 */
.filter-box {
  display: flex;
  gap: 8px;
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

.upload-btn {
  border-radius: 10px;
  font-weight: 700;
  padding: 12px 20px;
}

.empty-state {
  margin-top: 50px;
  text-align: center;
}
</style>