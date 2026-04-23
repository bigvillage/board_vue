<template>
  <div class="input-group">
    <el-input v-model="input" placeholder="검색어를 입력하세요 (2글자 이상)" clearable :style="{ width: '500px' }"
      @keyup.enter="handleSearch">
      <template #append>
        <el-button icon="Search" @click="handleSearch" />
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const input = ref('')

// 부모로 전달
const emit = defineEmits(['search'])

const lastKeyword = ref('')

const handleSearch = () => {
  const keyword = input.value.trim()

  if (keyword.length < 2) {
    ElMessage.warning('검색어는 2글자 이상 입력하세요')
    return
  }

  // ⭐ .value 꼭 써야 함
  if (keyword === lastKeyword.value) return

  lastKeyword.value = keyword

  emit('search', keyword)
}
</script>