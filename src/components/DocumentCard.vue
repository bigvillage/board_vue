<script setup>
</script>

<template>
  <div class="card">

    <h3>문서 제목</h3>

    <p>
      문서 내용 일부 미리보기
    </p>

    <div class="meta">
      <span>태그</span>
      <span>조회수</span>
    </div>

  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

.meta {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: gray;
}
</style>