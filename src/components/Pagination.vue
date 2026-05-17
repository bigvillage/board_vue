<template>
    <div class="pagination-wrapper">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
            :current-page="currentPage" @current-change="changePage" />
    </div>
</template>

<script setup>
const props = defineProps({
    total: Number,
    pageSize: Number,
    currentPage: Number
})

const emit = defineEmits(['change'])

const changePage = (page) => {
    emit('change', page)
}
</script>

<style scoped>
.pagination-wrapper {
    margin-top: 40px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
}
</style>