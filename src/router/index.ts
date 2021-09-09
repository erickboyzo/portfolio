import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: { index: 0 },
    redirect: { name: 'About' },
  },
  {
    path: '/about',
    name: 'About',
    meta: { index: 0 },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    meta: { index: 1 },
    component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue'),
  },
  {
    path: '/contact',
    name: 'ContactMe',
    meta: { index: 2 },
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactMe.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

export default router;
