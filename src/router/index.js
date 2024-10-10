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
      path: "/route/:slug",
      name: "route.show",
      component: () => import("../views/userPortal/RouteDetailView.vue"),
      meta: { showTabBar: false },
    },
    {
      path: "/station",
      name: "station",
      component: () => import("../views/userPortal/StationView.vue"),
      meta: { showTabBar: true },
    },
    {
      path: "/station/:slug",
      name: "station.show",
      component: () => import("../views/userPortal/StationDetailView.vue"),
      meta: { showTabBar: false },
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
