import { ActionTree } from 'vuex';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { authClient, ctpAnonymousClient } from '@/utils/BuildClient';
import { GlobalState, CartState } from '@/types/interfaces/states';

const projectKey = process.env.VUE_APP_PRJ_KEY;
const apiRoot = createApiBuilderFromCtpClient(ctpAnonymousClient).withProjectKey({
  projectKey: `${projectKey}`,
});

const apiRootRegistered = createApiBuilderFromCtpClient(authClient).withProjectKey({
  projectKey: `${projectKey}`,
});

const customerId = localStorage.getItem('id');
const apiRootToUse = customerId ? apiRootRegistered : apiRoot;

const actions: ActionTree<CartState, GlobalState> = {
  async createCart(context) {
    const customerId = localStorage.getItem('id');
    const apiRootToUse = customerId ? apiRootRegistered : apiRoot;

    const doCustomer = () => {
      return apiRootToUse
        .me()
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute();
    };

    return doCustomer()
      .then(({ body }) => {
        if (body.id) {
          localStorage.setItem('cartId', body.id);
        }
        context.state.cartId = body.id;
        context.state.version = body.version;

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },

  async addLineItem(context, body) {
    const customerId = localStorage.getItem('id');
    const apiRootToUse = customerId ? apiRootRegistered : apiRoot;

    return apiRootToUse
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
        queryArgs: {
          version: context.state.version,
        },
      })
      .execute()
      .then(({ body }) => {
        context.state.version = body.version;
        context.commit('setCart', body.lineItems);
        context.state.totalPrice = body.totalPrice.centAmount;

        if (body.totalLineItemQuantity) context.state.totalLineItemQuantity = body.totalLineItemQuantity;

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async removeLineItem(context, body) {
    const customerId = localStorage.getItem('id');
    const apiRootToUse = customerId ? apiRootRegistered : apiRoot;

    return apiRootToUse
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
      })
      .execute()
      .then(({ body }) => {
        context.state.version = body.version;
        context.commit('setCart', body.lineItems);

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async changeLineItemQuantity(context, body) {
    const customerId = localStorage.getItem('id');
    const apiRootToUse = customerId ? apiRootRegistered : apiRoot;

    return apiRootToUse
      .me()
      .carts()
      .withId({ ID: context.state.cartId })
      .post({
        body,
      })
      .execute()
      .then(({ body }) => {
        context.state.version = body.version;

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  updateCartId(context, newCartId) {
    context.commit('setCartId', newCartId);
  },
  updateVersion(context, newVersion) {
    context.commit('setVersion', newVersion);
  },
  updateQuantity(context, newQuantity) {
    context.commit('setVersion', newQuantity);
  },
  updateTotal(context, newTotal) {
    context.commit('setVersion', newTotal);
  },
};

export default actions;
