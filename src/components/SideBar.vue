<template>
    <div class="sidebar">
        <div class="logo">

            DocSearch
        </div>

        <ul class="menu">
            <li @click="go('/')">🏠 대시보드</li>
            <li @click="go('/search')">🔎 문서 검색</li>
            <li @click="go('/doclist')">📄 문서 관리</li>
            <li @click="go('/favorites')">⭐ 즐겨찾기</li>
            <li @click="go('/settings')">⚙ 설정</li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const go = (path) => {
    router.push(path)
}
</script>

<style scoped>
.sidebar {
    width: 230px;
    height: 100vh;
    background: #1f2937;
    color: white;
    position: fixed;
    left: 0;
    top: 0;
}

.logo {
    font-size: 22px;
    font-weight: bold;
    padding: 20px;
    border-bottom: 1px solid #374151;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu li {
    padding: 15px 20px;
    cursor: pointer;
    transition: 0.2s;
}

.menu li:hover {
    background: #374151;
}
</style>