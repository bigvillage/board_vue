<template>
    <div class="home-page">
        <HomeHeader />

        <div class="content-section">
            <!-- <div class="section-header">
                <h2>내 문서 보관함</h2>
                <router-link to="/upload" class="upload-btn">+ 업로드</router-link>
            </div> -->
            <DocumentList />
        </div>
    </div>
</template>

<script setup>
import HomeHeader from "@/components/home/HomeHeader.vue"
import SearchBar from "@/components/SearchBar.vue"
import DocumentList from "@/components/DocumentList.vue"
</script>