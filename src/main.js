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
