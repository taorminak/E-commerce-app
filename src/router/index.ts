import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/components/layout/TheMainPage.vue'),
    children: [
      {
        path: '/',
        redirect: 'home',
      },
      {
        path: 'profile-settings',
        name: 'userProfile',
        component: () => import('@/views/user-page/UserPage.vue'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: 'catalog',
        name: 'catalog',
        component: () => import('../views/CatalogView.vue'),
      },
      {
        path: 'product:prodId',
        name: 'product',
        component: () => import('../views/ProductDetailView.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/components/layout/TheAuthLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/auth/UserLogin.vue'),
        meta: { requiresAuth: true },
        beforeEnter(to, from, next) {
          if (store.state.customer.isLoggedIn) {
            next({ name: 'home' });
          } else {
            next();
          }
        },
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/auth/UserRegistration.vue'),
        meta: { requiresAuth: true },
        beforeEnter(to, from, next) {
          if (store.state.customer.isLoggedIn) {
            next({ name: 'home' });
          } else {
            next();
          }
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (to.hash) {
        setTimeout(() => {
          const element = document.querySelector(to.hash);

          if (element) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            });
          } else {
            console.error(`Element with selector ${to.hash} not found.`);
            resolve(savedPosition || { left: 0, top: 0 });
          }
        }, 2000);
      } else {
        resolve(savedPosition || { left: 0, top: 0 });
      }
    });
  },
});

export default router;
