import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/userPortal/HomeView.vue"),
      meta: { showTabBar: true },
    },
    {
      path: "/route",
      name: "route",
      component: () => import("../views/userPortal/RouteView.vue"),
      meta: { showTabBar: true },
    },
    {
      path: "/station",
      name: "station",
      component: () => import("../views/userPortal/StationView.vue"),
      meta: { showTabBar: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/userPortal/ProfileView.vue"),
      meta: { showTabBar: true },
    },
  ],
});

export default router;
