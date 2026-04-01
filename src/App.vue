<template>
  <Sidebar />

  <div class="main">
    <router-view />
  </div>
</template>

<script setup>
import Sidebar from './components/SideBar.vue'
</script>

<style>
.main {
  margin-left: 230px;
  /* padding: 30px;  <-- 이 부분을 제거하거나, 개별 페이지(대시보드 등) 내부로 옮기는 것이 좋습니다. */
  min-height: 100vh;
  /* 전체 높이를 확보하세요 */
  background-color: #f3f4f6;
  /* 회색 배경을 아예 여기서 지정하면 더 안전합니다. */
}
</style>