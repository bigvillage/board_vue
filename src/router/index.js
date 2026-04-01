import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/LoginView.vue"
import Signup from "../views/SignupView.vue"
import DocumentList from "../components/DocumentList.vue"
import DocumentDetail from "../components/DocumentDetail.vue"
import Upload from "../components/Upload.vue"

const routes = [
  {
    path: "/",
    component: DocumentList
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/documents/:id",
    component: DocumentDetail
  },
  {
    path: "/upload",
    component: Upload
  },
  {
    path: "/signup",
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router