<template>
    <div class="settings-container">
        <h1 class="title">⚙️ 설정</h1>

        <el-card class="setting-card">
            <template #header>
                <span>사용자 설정</span>
            </template>

            <el-form label-width="120px" class="form">
                <!-- 이름 -->
                <el-form-item label="이름">
                    <el-input v-model="form.name" placeholder="이름 입력" />
                </el-form-item>

                <!-- 이메일 -->
                <el-form-item label="이메일">
                    <el-input v-model="form.email" placeholder="이메일 입력" />
                </el-form-item>

                <!-- 다크모드 -->
                <el-form-item label="다크 모드">
                    <el-switch v-model="form.darkMode" />
                </el-form-item>

                <!-- 알림 -->
                <el-form-item label="알림 받기">
                    <el-switch v-model="form.notification" />
                </el-form-item>

                <!-- 버튼 -->
                <el-form-item>
                    <el-button type="primary" @click="saveSettings">저장</el-button>
                    <el-button @click="resetSettings">초기화</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 상태
const form = reactive({
    name: '',
    email: '',
    darkMode: false,
    notification: true
})

// 저장
const saveSettings = () => {
    localStorage.setItem('settings', JSON.stringify(form))
    ElMessage.success('설정이 저장되었습니다')
}

// 초기화
const resetSettings = () => {
    form.name = ''
    form.email = ''
    form.darkMode = false
    form.notification = true
    ElMessage.success('초기화 완료')
}

// 로드
const saved = localStorage.getItem('settings')
if (saved) {
    Object.assign(form, JSON.parse(saved))
}
</script>

<style scoped>
.settings-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
}

.title {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 20px;
}

.setting-card {
    border-radius: 12px;
}

.form {
    margin-top: 10px;
}
</style>