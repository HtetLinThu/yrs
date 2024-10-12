import { createRouter, createWebHistory } from "vue-router";
import { useGeneralStore } from "@/stores/generalStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { showTabBar: true },
    },
    {
      path: "/route",
      name: "route",
      component: () => import("../views/RouteView.vue"),
      meta: { showTabBar: true },
    },
    {
      path: "/route/:slug",
      name: "route.show",
      component: () => import("../views/RouteDetailView.vue"),
      meta: { showTabBar: false },
    },
    {
      path: "/station",
      name: "station",
      component: () => import("../views/StationView.vue"),
      meta: { showTabBar: true },
    },
    {
      path: "/station/:slug",
      name: "station.show",
      component: () => import("../views/StationDetailView.vue"),
      meta: { showTabBar: false },
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: { showTabBar: false },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { showTabBar: false },
    },
    {
      path: "/two-step-verification",
      name: "two-step-verification",
      component: () => import("../views/TwoStepVerificationView.vue"),
      meta: { showTabBar: false },
    },

    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { showTabBar: true },
    },

    {
      path: "/change-password",
      name: "change-password",
      component: () => import("../views/ProfileView.vue"),
      meta: { showTabBar: true, requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const generalStore = useGeneralStore();

  generalStore.setIsAuthenticated(ls.get("__access-token") ? true : false);

  if (to.meta.requiresAuth && !generalStore.getIsAuthenticated) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
