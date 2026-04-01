<script setup>
import SearchBar from "../components/SearchBar.vue"
import DocumentCard from "../components/DocumentCard.vue"
</script>

<template>
  <div class="page">

    <div class="header">
      <h1>문서 목록</h1>

      <router-link to="/upload">
        <button>문서 업로드</button>
      </router-link>
    </div>

    <SearchBar />

    <div class="document-list">
      <!-- 문서 리스트 -->
      <DocumentCard />
      <DocumentCard />
      <DocumentCard />
    </div>

  </div>
</template>

<style scoped>
.page {
  max-width: 1000px;
  margin: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.document-list {
  margin-top: 20px;
  display: grid;
  gap: 10px;
}
</style>