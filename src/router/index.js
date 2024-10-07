import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/general/HomeView.vue"),
    },
    {
      path: "/route",
      name: "route",
      component: () => import("../views/general/RouteView.vue"),
    },
    {
      path: "/station",
      name: "station",
      component: () => import("../views/general/StationView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/general/ProfileView.vue"),
    },
  ],
});

export default router;
