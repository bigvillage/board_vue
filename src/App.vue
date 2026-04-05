<template>
  <div class="app-layout">
    <Sidebar />

    <div class="main-container">
      <HomeHeader />

      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/SideBar.vue'
import HomeHeader from './components/home/HomeHeader.vue'
</script>

<style>
/* 브라우저 기본 여백 제거 및 폰트 설정 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-container {
  flex: 1;
  margin-left: 230px;
  /* 사이드바 고정 너비 */
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  /* 콘텐츠가 길어질 경우 내부 스크롤 */
}
</style>