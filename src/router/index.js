import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/LoginView.vue"
import Signup from "../views/SignupView.vue"
import test from "../views/TestView.vue"
import DocumentList from "../components/DocumentList.vue"
import DocumentDetail from "../components/DocumentDetail.vue"
import Upload from "../components/Upload.vue"

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/docdetail",
    component: DocumentDetail
  },
  {
    path: "/doclist",
    component: DocumentList
  },
  {
    path: "/upload",
    component: Upload
  },
  {
    path: "/signup",
    component: Signup
  },
  {
    path: "/test",
    component: test
  },
  {
    path: '/favorites',
    component: () => import('../components/FavoriteList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router