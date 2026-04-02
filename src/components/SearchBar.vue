<template>
  <div class="input-group">
    <el-input v-model="input" placeholder="검색어를 입력하세요" clearable :style="{ 'width': '500px' }">
      <template #append>
        <el-button icon="Search" @click="handleSearch" />
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// main.js에 전역등록 하셨으므로 Search 아이콘을 따로 import 안 해도 됩니다.

const input = ref('')

const handleSearch = () => {
  alert('검색어: ' + input.value)
}
</script>