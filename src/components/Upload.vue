<script setup>
</script>

<template>
  <div class="page">

    <h1>문서 업로드</h1>

    <div class="form">

      <input type="text" placeholder="제목" />

      <textarea placeholder="내용"></textarea>

      <input type="text" placeholder="태그 (예: vue,node)" />

      <button>저장</button>

    </div>

  </div>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  height: 200px;
}
</style>