// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap'
// 1. Element Plus 라이브러리와 스타일 가져오기
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 아래 스타일을 추가하여 브라우저 기본 여백을 0으로 만듭니다.
const style = document.createElement('style')
style.innerHTML = `
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* 가로 스크롤 방지 */
  }
  #app {
    font-family: 'Inter', sans-serif; /* 폰트 일관성 */
  }
`
document.head.appendChild(style)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// ... (위의 app 선언 코드 이후)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
