<template>
    <div class="mypage-container">
        <h1 class="title">마이페이지</h1>

        <!-- 1단계: 비밀번호 확인 -->
        <el-card v-if="!verified" class="card">
            <template #header>
                <span>비밀번호 확인</span>
            </template>

            <el-input v-model="password" type="password" placeholder="현재 비밀번호 입력" show-password />

            <el-button type="primary" class="btn" @click="verifyPassword">
                확인
            </el-button>
        </el-card>

        <!-- 2단계: 비밀번호 변경 -->
        <el-card v-else class="card">
            <template #header>
                <span>비밀번호 변경</span>
            </template>

            <el-form label-width="120px">
                <el-form-item label="새 비밀번호">
                    <el-input v-model="newPassword" type="password" show-password />
                </el-form-item>

                <el-form-item label="비밀번호 확인">
                    <el-input v-model="confirmPassword" type="password" show-password />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="changePassword">
                        변경하기
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// 상태
const password = ref('')
const verified = ref(false)

const newPassword = ref('')
const confirmPassword = ref('')

// 1. 비밀번호 확인
const verifyPassword = async () => {
    const result = await authStore.verifyPassword(password.value)

    if (result.success) {
        verified.value = true
        ElMessage.success('확인되었습니다')
    } else {
        ElMessage.error(result.message)
    }
}

// 2. 비밀번호 변경
const changePassword = async () => {
    if (!newPassword.value || !confirmPassword.value) {
        return ElMessage.warning('비밀번호를 입력하세요')
    }

    if (newPassword.value !== confirmPassword.value) {
        return ElMessage.error('비밀번호가 일치하지 않습니다')
    }

    const result = await authStore.changePassword(newPassword.value)

    if (result.success) {
        ElMessage.success('비밀번호가 변경되었습니다')
        verified.value = false
        password.value = ''
        newPassword.value = ''
        confirmPassword.value = ''
    } else {
        ElMessage.error(result.message)
    }
}
</script>

<style scoped>
.mypage-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
}

.title {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 20px;
}

.card {
    margin-bottom: 20px;
    border-radius: 12px;
}

.btn {
    margin-top: 15px;
    width: 100%;
}
</style>