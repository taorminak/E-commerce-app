import { MutationTree } from 'vuex';
import { ProductsState } from '@/types/interfaces/states';
import { ProductItem } from '@/types/interfaces/productItem';
import { CartItem } from '@/types/interfaces/cartItem';

const mutations: MutationTree<ProductsState> = {
  setProducts(state, products: ProductItem[]) {
    state.products = products;
  },
  updatePriceRange(state: ProductsState, newPriceRange: number) {
    state.priceRange = newPriceRange;
  },
  updateSelectedGameCategories(state, selectedCategories) {
    for (const category in selectedCategories) {
      state.selectedCategories[category].selected = selectedCategories[category].selected;
    }
  },
  updateSelectedProducts(state, products) {
    state.selectedProducts = products;
  },
  updateSearchTerm(state, searchTerm) {
    state.searchTerm = searchTerm;
  },
  incrementItemQuantity(state, cartItem: CartItem) {
    cartItem.quantity++;
  },
  decrementProductInventory(state, product: ProductItem) {
    if (product.masterVariant.availability.availableQuantity > 0) {
      product.masterVariant.availability.availableQuantity--;
    }
  },
};

export default mutations;
