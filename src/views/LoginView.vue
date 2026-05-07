<template>
  <div class="mypage-container">
    <h1 class="title">마이페이지</h1>

    <!-- 사용자 정보 -->
    <el-card class="card">
      <template #header>
        <span>계정 정보</span>
      </template>

      <div class="user-info">
        <p><strong>이메일:</strong> {{ authStore.user?.email }}</p>
        <p><strong>이름:</strong> {{ authStore.user?.name }}</p>
        <p class="pw-info">
          비밀번호 마지막 변경: {{ passwordAgeText }}
        </p>
      </div>

      <el-button type="primary" @click="showChangeForm = !showChangeForm">
        비밀번호 변경
      </el-button>
    </el-card>

    <!-- 비밀번호 변경 -->
    <el-card v-if="showChangeForm" class="card">
      <template #header>
        <span>비밀번호 변경</span>
      </template>

      <el-form label-width="120px">
        <el-form-item label="현재 비밀번호">
          <el-input v-model="currentPassword" type="password" show-password />
        </el-form-item>

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
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const showChangeForm = ref(false)

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// 🔥 비밀번호 변경일 (임시: localStorage)
const passwordChangedAt = ref(localStorage.getItem('pw_changed_at') || Date.now())

// 날짜 계산
const passwordAgeText = computed(() => {
  const diff = Date.now() - passwordChangedAt.value
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return `${days}일 전`
})

// 🔥 페이지 진입 시 로그인 체크
onMounted(async () => {
  const result = await authStore.fetchMe()

  if (!result.success) {
    ElMessage.error('로그인이 필요합니다')
    window.location.href = '/login'
  }
})

// 비밀번호 변경
const changePassword = async () => {
  if (!currentPassword.value) {
    return ElMessage.warning('현재 비밀번호 입력하세요')
  }

  const verify = await authStore.verifyPassword(currentPassword.value)

  if (!verify.success) {
    return ElMessage.error('현재 비밀번호가 틀렸습니다')
  }

  if (!newPassword.value || !confirmPassword.value) {
    return ElMessage.warning('새 비밀번호 입력하세요')
  }

  if (newPassword.value !== confirmPassword.value) {
    return ElMessage.error('비밀번호가 일치하지 않습니다')
  }

  const result = await authStore.changePassword(newPassword.value)

  if (result.success) {
    ElMessage.success('비밀번호 변경 완료')

    // 변경일 저장 (임시)
    passwordChangedAt.value = Date.now()
    localStorage.setItem('pw_changed_at', passwordChangedAt.value)

    showChangeForm.value = false
    currentPassword.value = ''
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

.mypage-container2 {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
}

.mypage-container3 {
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

.user-info p {
  margin: 5px 0;
}

.pw-info {
  font-size: 12px;
  color: gray;
}
</style>