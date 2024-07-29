import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "landing", component: () => import("../views/index.vue") },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/draw",
    name: "draw",
    component: () => import("../views/draw.vue"),
  },
  {
    path: "/results",
    name: "results",
    component: () => import("../views/results.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
