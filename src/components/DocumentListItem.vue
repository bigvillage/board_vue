<template>
    <div class="list-item">
        <div class="info-side">
            <img :src="`/icons/icon_${document.type?.toLowerCase()}.png`" class="file-icon" />
            <div class="text-group">
                <h3 class="title">{{ document.title }}</h3>
                <span class="author">{{ document.author }}</span>
            </div>
        </div>

        <div class="meta-side">
            <span class="date">{{ document.date }}</span>
            <el-tag size="small" type="info">{{ document.type }}</el-tag>
            <el-button size="small" circle icon="MoreFilled" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    document: Object
})
</script>

<style scoped>
.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    margin-bottom: 10px;
    transition: all 0.2s;
}

.list-item:hover {
    border-color: #409EFF;
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.info-side {
    display: flex;
    align-items: center;
    gap: 15px;
}

.file-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

.title {
    margin: 0;
    font-size: 1rem;
    color: #333;
}

.author {
    font-size: 0.85rem;
    color: #999;
}

.meta-side {
    display: flex;
    align-items: center;
    gap: 20px;
}

.date {
    font-size: 0.9rem;
    color: #666;
}
</style>