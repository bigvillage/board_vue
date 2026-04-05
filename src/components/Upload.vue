<template>
  <div class="upload-page">
    <div class="upload-header">
      <el-button icon="ArrowLeft" circle @click="$router.back()" />
      <div class="header-text">
        <h1>새 문서 등록</h1>
        <p>보관함에 저장할 문서 정보를 입력하고 파일을 첨부해 주세요.</p>
      </div>
    </div>

    <el-card class="upload-card" shadow="never">
      <el-form :model="form" label-position="top" size="large">

        <el-form-item label="문서 제목">
          <el-input v-model="form.title" placeholder="문서의 제목을 입력하세요" clearable />
        </el-form-item>

        <el-form-item label="상세 내용">
          <el-input v-model="form.content" type="textarea" :rows="8"
            placeholder="문서에 대한 설명을 입력하세요 (내용은 팝업창에서 확인 가능합니다)" />
        </el-form-item>

        <el-form-item label="태그 설정">
          <el-input v-model="form.tags" placeholder="쉼표(,)로 구분하여 입력 (예: 기획, 2024, 중요)">
            <template #prefix>
              <el-icon>
                <PriceTag />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="파일 첨부">
          <el-upload class="upload-dragger" drag action="#" multiple :auto-upload="false">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              파일을 이 곳으로 드래그하거나 <em>클릭하여 업로드</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                PDF, DOCX, XLSX, PNG 등 문서 파일을 첨부할 수 있습니다 (최대 50MB)
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <div class="form-actions">
          <el-button size="large" @click="$router.back()">취소</el-button>
          <el-button type="primary" size="large" class="submit-btn" @click="handleSave">
            보관함에 저장하기
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ArrowLeft, UploadFilled, PriceTag } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  title: '',
  content: '',
  tags: ''
})

const handleSave = () => {
  if (!form.title) {
    ElMessage.warning('제목은 필수 입력 사항입니다.')
    return
  }
  ElMessage.success('문서가 성공적으로 저장되었습니다!')
  // 실제 저장 로직은 여기에 구현하세요.
}
</script>

<style scoped>
.upload-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.upload-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.header-text h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a1a;
}

.header-text p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 1rem;
}

/* 카드 및 폼 스타일 */
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

/* --- 드래그 업로드 영역 너비 100% 보정 --- */
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

/* 하단 버튼 영역 */
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