import {createRouter, createWebHistory} from 'vue-router'
import AppLayout from "@/shared/layouts/app/AppLayout.vue";
import LandingView from "@/views/public/LandingView.vue";
import PublicLayout from "@/shared/layouts/public/PublicLayout.vue";
import LoginView from "@/views/public/LoginView.vue";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {watch, watchEffect} from "vue";
import {storeToRefs} from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: "/",
      component: PublicLayout,
      children: [
        {
          path: "/",
          name: "landing",
          component: LandingView
        },
      ]
    },
    {
      path: '/app',
      component: AppLayout,
      meta: {requiresAuth: true},
      children: [
        {
          path: "",
          name: "app-home",
          component: () => import("@/views/app/home/HomeView.vue")
        }
      ]
    },
  ],
})

export default router

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const { loading, isAuth } = storeToRefs(authStore);

  // Esperar a que el estado de carga termine antes de continuar con la navegación
  if (loading.value) {
    await new Promise(resolve => {
      watch(loading, (newValue) => {
        if (!newValue) resolve(true);
      }, { once: true });
    });
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir al login
  if (to.meta.requiresAuth && !isAuth.value) {
    return { name: "login" };
  }
});
