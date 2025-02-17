import AboutView from "@/pages/About.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/about",
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { title: 'About Page' }
  },
  {
    path: "/projects",
    name: "project",
    component: () => import("@/pages/Projects.vue"),
    meta: { title: 'Projects Page' }
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/pages/ContactMe.vue"),
    meta: { title: 'Contact Page' }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      resolve({ left: 0, top: 0 });
    });
  },
});

export default router;
