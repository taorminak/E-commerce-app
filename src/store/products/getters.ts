import { ProductsState, GlobalState } from '@/types/interfaces/states';
import { ProductItem } from '@/types/interfaces/productItem';
import { GetterTree } from 'vuex';

const getters: GetterTree<ProductsState, GlobalState> = {
  allProducts: (state) => state.products,
  filteredProducts: (state) => {
    return state.products.filter((product: ProductItem) => {
      const price = product.masterVariant.prices[0]?.value.centAmount || 0;

      return price <= state.priceRange;
    });
  },
  getPriceRange: (state) => state.priceRange,
  cartProducts(state) {
    return state.cart.map((cartItem) => {
      const product = state.products.find((product) => product.key === cartItem.id);

      return {
        name: product?.name['en-US'],
        price: product?.masterVariant.prices[0].value.centAmount,
        quantity: cartItem.quantity,
      };
    });
  },
  cartTotal(state, getters) {
    let total = 0;

    getters.cartProducts.forEach((product: { price: number; quantity: number }) => {
      total += product.price * product.quantity;
    });

    return total;
  },
};

export default getters;
