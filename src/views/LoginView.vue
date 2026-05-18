<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>로그인</h2>
        <p>DocSearch 서비스 이용을 위해 로그인해주세요.</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" placeholder="example@docsearch.com" required />
        </div>

        <div class="input-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" required />
        </div>

        <button type="submit" class="login-btn" :disabled="authStore.loading">
          <span v-if="authStore.loading">로그인 중...</span>
          <span v-else>로그인</span>
        </button>
      </form>

      <div class="login-footer">
        <span>계정이 없으신가요?</span>
        <a href="#" @click.prevent="goToSignup">회원가입</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // 1. 스토어 가져오기 필수!

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore() // 2. 스토어 인스턴스 생성 필수!

const handleLogin = async () => {
  // 3. 실제 로그인 요청 실행
  const result = await authStore.login({
    email: email.value,
    password: password.value
  })

  if (result.success) {
    alert('로그인 성공!')
    router.push('/')
  } else {
    // 서버에서 보내주는 "가입되지 않은 이메일입니다" 등의 메시지가 뜹니다.
    alert(result.message)
  }
}

const goToSignup = () => {
  router.push('/signup')
}
</script>

<style scoped>
@import '@/assets/auth.css';

/* 💡 버튼이 비활성화(로딩 중)일 때 스타일 추가 */
.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>