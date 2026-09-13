import type { SkeletonConfig } from '@/interfaces/skeleton-config';
import { createRouter, createWebHistory } from 'vue-router';
import { skeletonConfigs } from '@/config/skeleton-configs';
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/about',
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
    meta: {
      title: 'About Page',
      skeletonConfig: skeletonConfigs.about as SkeletonConfig,
    },
  },
  {
    path: '/projects',
    name: 'project',
    component: () => import('@/pages/Projects.vue'),
    meta: {
      title: 'Projects Page',
      skeletonConfig: skeletonConfigs.projects as SkeletonConfig,
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/Contact.vue'),
    meta: {
      title: 'Contact Page',
      skeletonConfig: skeletonConfigs.contact as SkeletonConfig,
    },
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
