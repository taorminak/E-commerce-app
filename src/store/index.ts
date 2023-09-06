import { createStore } from 'vuex';
import customerModule from '@/store/customer/index';
import productsModule from '@/store/products/index';

const store = createStore({
  modules: {
    customer: customerModule,
    products: productsModule,
  },
});

export default store;
