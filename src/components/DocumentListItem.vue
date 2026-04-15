<template>
    <div class="document-item-wrapper">
        <div class="list-item" @click="showModal = true">
            <div class="info-side">
                <img :src="`/src/assets/icons/icon_${document.attachments[0]?.ext?.toLowerCase()}.png`"
                    class="file-icon" />
                <div class="text-group">
                    <h3 class="title">{{ document.title }}</h3>
                    <span class="author">{{ document.author }}</span>
                </div>
            </div>

            <div class="meta-side">
                <span class="date">{{ document.date }}</span>

                <el-dropdown @command="handleCommand">
                    <el-button size="small" circle @click.stop>
                        <el-icon>
                            <MoreFilled />
                        </el-icon>
                    </el-button>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="edit">수정</el-dropdown-item>
                            <el-dropdown-item command="delete" divided>
                                삭제
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>

        <!-- 상세 모달 -->
        <DocumentDetail v-model="showModal" :document="document" @download="downloadFile" />

        <!-- 수정 모달 -->
        <EditList v-model="showEditModal" :document="document" @submit="handleEditSubmit" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import DocumentDetail from './DocumentDetail.vue'
import EditList from './EditList.vue'
import { useUploadStore } from '@/stores/upload'
import { useListStore } from '@/stores/list'

// ✅ props를 변수로 받는다 (핵심)
const props = defineProps({
    document: {
        type: Object,
        default: () => ({
            attachments: []
        })
    }
})

const uploadStore = useUploadStore()
const listStore = useListStore()

// 모달 상태
const showModal = ref(false)
const showEditModal = ref(false)

// 다운로드
const downloadFile = (file) => {
    window.open(
        `http://localhost:3000/api/download?url=${encodeURIComponent(file.url)}&name=${file.name}`
    )
}

// 🔥 수정 submit (핵심)
const handleEditSubmit = async (formData) => {
    try {
        console.log("handleEditSubmit 진입")

        // ✅ props.document 사용
        await uploadStore.editDocument(props.document.id, formData)

        await listStore.fetchDocuments()

        showEditModal.value = false

        ElMessage.success('수정 완료')
    } catch (e) {
        console.error(e)
        ElMessage.error('수정 실패')
    }
}

// 드롭다운 명령 처리
const handleCommand = (command) => {
    if (command === 'edit') {
        showEditModal.value = true
        console.log('수정 클릭')
    }

    if (command === 'delete') {
        console.log('삭제 클릭')
        // TODO: delete API 연결
    }
}
</script>

<style scoped>
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
</style>