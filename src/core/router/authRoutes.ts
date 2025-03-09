import type {RouteRecordRaw} from "vue-router";
import LoginView from "@/views/public/LoginView.vue";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/public/RegisterView.vue")
  },
]

export default authRoutes
