import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: {} },
  { path: '/about', name: 'about', component: {} },
  { path: '/cart', name: 'cart', component: {} },
  { path: '/catalog', name: 'catalog', component: {} },
  { path: '/:catchAll(.*)', component: {} },
];

const mockRouter = createRouter({
  history: createWebHistory(),
  routes,
});

describe('App', () => {
  it('navigates to home when the route is /', async () => {
    await mockRouter.push('/');
    await mockRouter.isReady();
    expect(mockRouter.currentRoute.value.name).toBe('home');
  });

  it('navigates to about when the route is /about', async () => {
    await mockRouter.push('/about');
    await mockRouter.isReady();
    expect(mockRouter.currentRoute.value.name).toBe('about');
  });

  it('navigates to cart when the route is /cart', async () => {
    await mockRouter.push('/cart');
    await mockRouter.isReady();
    expect(mockRouter.currentRoute.value.name).toBe('cart');
  });

  it('navigates to catalog when the route is /catalog', async () => {
    await mockRouter.push('/catalog');
    await mockRouter.isReady();
    expect(mockRouter.currentRoute.value.name).toBe('catalog');
  });

  it('navigates to not-found when the route is unknown', async () => {
    await mockRouter.push('/unknown');
    await mockRouter.isReady();
    expect(mockRouter.currentRoute.value.name).toBeUndefined();
  });
});
