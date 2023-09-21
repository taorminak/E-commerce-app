import { createStore } from 'vuex';
import customerModule from '@/store/customer/index';
import productsModule from '@/store/products/index';
import CartModule from '@/store/cart/index';

const store = createStore({
  modules: {
    customer: customerModule,
    products: productsModule,
    cart: CartModule,
  },
});

export default store;
