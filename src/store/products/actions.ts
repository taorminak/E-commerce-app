import { ProductsState, GlobalState } from '@/types/interfaces/states';
import { ProductItem } from '@/types/interfaces/productItem';
import { ActionContext } from 'vuex';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/utils/BuildClient';

const projectKey = process.env.VUE_APP_PRJ_KEY || 'defaultProjectKey';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

export default {
  async fetchProducts({ commit, state }: ActionContext<ProductsState, GlobalState>) {
    const priceRange = state.priceRange;
    const selectedCategoryValues: string = Object.values(state.selectedCategories)
      .filter((category) => category.selected && category.value)
      .map((category) => `"${category.value}"`)
      .join(',');

    try {
      const products = await doFetch(priceRange, selectedCategoryValues);

      commit('setProducts', products);

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  addProductToCart(context: ActionContext<ProductsState, GlobalState>, product: ProductItem) {
    const cartItem = context.state.cart.find((item) => item.id === product.key);

    if (!cartItem) {
      context.commit('pushProductToCart', product.key);
    } else {
      context.commit('incrementItemQuantity', cartItem);
    }
    context.commit('decrementProductInventory', product);
  },
};

async function doFetch(priceRange: number, selectedCategoryValues: string | null = null) {
  const currentPath = window.location.pathname;

  if (currentPath === '/catalog') {
    let queryParams1 = {};

    if (selectedCategoryValues) {
      queryParams1 = {
        filter: `categories.id:${selectedCategoryValues}`,
      };
    }

    const queryParams2 = {
      filter: `variants.price.centAmount:range(* to ${priceRange * 100})`,
    };

    const response1 = await apiRoot.productProjections().search().get({ queryArgs: queryParams1 }).execute();
    const response2 = await apiRoot.productProjections().search().get({ queryArgs: queryParams2 }).execute();

    const results1 = response1.body.results;
    const results2 = response2.body.results;

    const commonResults = results1.filter((value1) => {
      return results2.some((value2) => value2.id === value1.id);
    });

    if (commonResults.length === 0) {
      alert('Unfortunately, there are no products that match your criteria.');
    }

    return commonResults;
  } else {
    const response = await apiRoot.productProjections().search().get().execute();

    return response.body.results;
  }
}
