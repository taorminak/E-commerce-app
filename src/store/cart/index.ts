import actions from '@/store/cart/actions';
import mutations from '@/store/cart/mutations';
import getters from '@/store/cart/getters';

const cartModule = {
  namespaced: true,
  state() {
    return {
      cart: [],
      cartId: '',
      version: 1,
      totalPrice: 0,
      totalLineItemQuantity: 0,
    };
  },
  getters,
  actions,
  mutations,
};

export default cartModule;
