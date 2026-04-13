<template>
    <div class="document-item-wrapper">
        <div class="list-item" @click="showModal = true">
            <div class="info-side">
                <img :src="`/src/assets/icons/icon_${document.attachments[0].ext.toLowerCase()}.png`"
                    class="file-icon" />
                <div class="text-group">
                    <h3 class="title">{{ document.title }}</h3>
                    <span class="author">{{ document.author }}</span>
                </div>
            </div>

            <div class="meta-side">
                <span class="date">{{ document.date }}</span>
                <el-button size="small" circle icon="MoreFilled" @click.stop />
            </div>
        </div>

        <DocumentDetail v-model="showModal" :document="document" @download="downloadFile" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { MoreFilled, Download } from '@element-plus/icons-vue'
import DocumentDetail from './DocumentDetail.vue'

defineProps({
    document: {
        type: Object,
        default: () => ({
            attachments: [] // 기본값 빈 배열
        })
    }
})

const downloadFile = (file) => {
    window.open(
        `http://localhost:3000/api/download?url=${encodeURIComponent(file.url)}&name=${file.name}`
    )
    // const link = document.createElement('a')
    // console.log("file.url => ", file.url)
    // link.href = file.url
    // link.download = file.name || 'download'
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
}

const showModal = ref(false)
</script>

<style scoped>
/* --- 리스트 스타일 --- */
.document-item-wrapper {
    margin-bottom: 12px;
}

.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    transition: all 0.2s;
    cursor: pointer;
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
    font-weight: 600;
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

/* --- 모달 디자인 --- */
</style>