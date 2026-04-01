<script setup>
</script>

<template>
  <div class="page">

    <h1>문서 제목</h1>

    <div class="meta">
      <span>작성자</span>
      <span>조회수</span>
      <span>작성일</span>
    </div>

    <div class="content">
      문서 내용이 표시됩니다
    </div>

  </div>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: auto;
}

.meta {
  display: flex;
  gap: 10px;
  color: gray;
  margin-bottom: 20px;
}

.content {
  line-height: 1.6;
}
</style>