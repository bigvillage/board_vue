<template>
    <div class="pagination-wrapper">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
            :current-page="currentPage" @current-change="handlePageChange" />
    </div>
</template>

<script setup>
const props = defineProps({
    total: {
        type: Number,
        default: 0
    },
    pageSize: {
        type: Number,
        default: 20
    },
    currentPage: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['page-change'])

const handlePageChange = (page) => {
    emit('page-change', page)
}
</script>

<style scoped>
.pagination-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
</style>