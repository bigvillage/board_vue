<template>
    <div class="page-container">
        <h1>⭐ 즐겨찾기 문서</h1>

        <div v-if="documents.length === 0">
            <el-empty description="즐겨찾기 문서가 없습니다." />
        </div>

        <div v-else class="document-list">
            <DocumentListItem v-for="doc in documents" :key="doc.id" :document="doc" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'
import DocumentListItem from '@/components/DocumentListItem.vue'

const listStore = useListStore()
const { documents } = storeToRefs(listStore)

onMounted(() => {
    listStore.fetchFavoriteDocuments() // ⭐ 여기 핵심
})
</script>