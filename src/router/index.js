import { createRouter, createWebHistory } from "vue-router";
import homeView from "@/views/homeView.vue";
import loginView from "@/views/loginView.vue";
import CartView from "@/views/cartView.vue";
import editProduct from "@/views/editProduct.vue";
import { useAuthStore } from "@/stores/userAuth";
import PaymentView from "@/views/paymentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: homeView,
    },
    {
      path: "/login",
      component: loginView,
    },
    {
      path: "/cart",
      component: CartView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/cart/payment",
      component: PaymentView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit",
      component: editProduct,
      meta: {
        requiresAuth: true,
        role: "admin",
      },
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useAuthStore();
  if (to.path === "/edit") {
    if (!userStore.currentUser) {
      return "/login";
    }

    if (userStore.role !== "admin") {
      return "/";
    }
  }

  if (to.meta.requiresAuth && !userStore.currentUser) {
    return "/login";
  }

  if (to.meta.role && userStore.role !== to.meta.role) {
    return "/";
  }

  return true;
});

export default router;
