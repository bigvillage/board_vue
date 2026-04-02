<template>
  <div class="page-container">
    <div class="header-section">
      <div class="title-group">
        <h1>문서 보관함</h1>
        <p class="subtitle">총 128개의 문서가 검색되었습니다.</p>
      </div>

      <router-link to="/upload">
        <button class="upload-btn">+ 새 문서 업로드</button>
      </router-link>
    </div>

    <div class="search-section">
      <SearchBar />
    </div>

    <div class="document-list">
      <DocumentCard v-for="n in 6" :key="n" />
    </div>
  </div>
</template>

<style scoped>
/* 1. 전체 컨테이너: 너비 제한 해제 */
.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  /* 사방에 적절한 여백 */
  box-sizing: border-box;
  background-color: #f8f9fa;
  /* 연한 배경색으로 고급스럽게 */
}

/* 2. 헤더 섹션: 양 끝으로 배치 */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
}

.title-group h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.subtitle {
  color: #7f8c8d;
  margin: 5px 0 0 0;
  font-size: 0.9rem;
}

/* 3. 검색바 섹션: 가로로 길게 사용 */
.search-section {
  margin-bottom: 30px;
  width: 100%;
}

/* 4. 문서 리스트: 전체 화면일 때 그리드 배치 (반응형) */
.document-list {
  display: grid;
  /* 화면이 넓어질수록 카드가 옆으로 붙도록 설정 */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* 버튼 스타일 살짝 추가 */
.upload-btn {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.upload-btn:hover {
  background-color: #357abd;
}
</style>