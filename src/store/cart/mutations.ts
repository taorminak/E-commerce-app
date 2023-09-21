import { MutationTree } from 'vuex';
import { CartState } from '@/types/interfaces/states';

const mutations: MutationTree<CartState> = {
  setCart(state, products: []) {
    state.cart = products;
  },
  setCartId(state, newCartId) {
    state.cartId = newCartId;
  },
  setVersion(state, newVersion) {
    state.version = newVersion;
  },
  setQuantity(state, newQuantity) {
    state.version = newQuantity;
  },
  setTotal(state, newTotal) {
    state.version = newTotal;
  },
};

export default mutations;
