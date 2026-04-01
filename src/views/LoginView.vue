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

        <button type="submit" class="login-btn">로그인</button>
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

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  // 실제 로그인 로직 (API 호출 등)이 들어갈 자리입니다.
  console.log('Login attempt:', email.value)
  // 로그인 성공 시 대시보드로 이동 예시
  router.push('/')
}

// 회원가입 페이지로 이동하는 함수 추가
const goToSignup = () => {
  router.push('/signup') // router/index.js에 설정된 path를 넣으세요
}
</script>

<style scoped>
@import '@/assets/auth.css';
</style>