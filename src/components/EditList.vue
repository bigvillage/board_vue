<template>
    <el-dialog v-model="visible" title="문서 수정" width="80%" style="max-width: 900px;" append-to-body>
        <!-- 🔥 UploadPage 스타일 그대로 -->
        <el-card class="upload-card" shadow="never">
            <el-form :model="form" label-position="top" size="large">

                <el-form-item label="문서 제목">
                    <el-input v-model="form.title" clearable />
                </el-form-item>

                <el-form-item label="상세 내용">
                    <el-input v-model="form.content" type="textarea" :rows="8" />
                </el-form-item>

                <el-form-item label="태그 설정">
                    <el-input v-model="form.tags" placeholder="쉼표로 구분">
                        <template #prefix>
                            <el-icon>
                                <PriceTag />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="파일 첨부">
                    <el-upload class="upload-dragger" drag multiple :auto-upload="false" :file-list="fileList"
                        :on-change="handleChange" :on-remove="handleRemove">
                        <el-icon class="el-icon--upload">
                            <UploadFilled />
                        </el-icon>
                        <div class="el-upload__text">
                            파일을 드래그하거나 <em>클릭하여 업로드</em>
                        </div>
                    </el-upload>
                </el-form-item>

                <div class="form-actions">
                    <el-button size="large" @click="close">취소</el-button>
                    <el-button type="primary" size="large" class="submit-btn" @click="handleSubmit">
                        수정하기
                    </el-button>
                </div>

            </el-form>
        </el-card>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { UploadFilled, PriceTag } from '@element-plus/icons-vue'

const props = defineProps({
    modelValue: Boolean,
    document: Object
})

const emit = defineEmits(['update:modelValue', 'submit'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const close = () => {
    emit('update:modelValue', false)
}

const form = reactive({
    title: '',
    content: '',
    tags: ''
})

const fileList = ref([])

watch(
    () => props.document,
    (doc) => {
        if (!doc) return

        form.title = doc.title || ''
        form.content = doc.content || ''
        form.tags = doc.tags?.join(', ') || ''

        fileList.value = doc.attachments?.map(file => ({
            name: file.name,
            url: file.url
        })) || []
    },
    { immediate: true }
)

const handleChange = (file, files) => {
    fileList.value = files
}

const handleRemove = (file, files) => {
    fileList.value = files
}

const handleSubmit = () => {
    const formData = new FormData()

    formData.append('title', form.title)
    formData.append('content', form.content)

    const tagArray = form.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t)

    formData.append('tags', JSON.stringify(tagArray))

    fileList.value.forEach(file => {
        if (file.raw) {
            formData.append('files', file.raw)
        }
    })

    emit('submit', formData)
    close()
}
</script>

<style scoped>
/* 🔥 UploadPage 스타일 그대로 복붙 */
.upload-card {
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    padding: 20px;
}

:deep(.el-form-item__label) {
    font-weight: 700;
    color: #333;
    padding-bottom: 8px;
}

.upload-dragger {
    width: 100%;
}

:deep(.el-upload) {
    width: 100%;
}

:deep(.el-upload-dragger) {
    width: 100%;
    border-radius: 12px;
    padding: 40px 20px;
    background-color: #fcfcfc;
    transition: all 0.2s;
}

:deep(.el-upload-dragger:hover) {
    border-color: #409EFF;
    background-color: #f5faff;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.submit-btn {
    padding: 0 40px;
    font-weight: 700;
    border-radius: 8px;
}
</style>