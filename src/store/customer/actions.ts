/* eslint-disable */
import { LoginPayload, SingUpPayload } from '@/types/interfaces/api';
import { ActionTree } from 'vuex';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, authClient } from '@/utils/BuildClient';
import { CustomerState, GlobalState } from '@/types/interfaces/states';

const projectKey = process.env.VUE_APP_PRJ_KEY;

const actions: ActionTree<CustomerState, GlobalState> = {
  // eslint-disable-next-line max-lines-per-function
  async login(context, payload: LoginPayload) {
    const apiRoot = createApiBuilderFromCtpClient(authClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    const email = payload.email;
    const password = payload.password;

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    const anonCart = localStorage.getItem('cartId');

    context.commit('cart/setVersion', 1, { root: true });

    const doCustomer = () => {
      const requestBody = {
        email: email,
        password: password,
        ActiveCartSignInMode: 'MergeWithExistingCustomerCart',
        updateProductData: true,
      };

      const apiRoot = createApiBuilderFromCtpClient(authClient).withProjectKey({
        projectKey: `${projectKey}`,
      });

      return apiRoot
        .me()
        .login()
        .post({
          body: requestBody,
        })
        .execute();
    };

    // eslint-disable-next-line max-lines-per-function
    return doCustomer()
      .then(({ body }) => {
      
        context.commit('SET_USER', body);
        context.commit('cart/setCart', body.cart?.lineItems, { root: true });
        context.commit('cart/setQuantity', body.cart?.lineItems.length, { root: true });
        context.commit('cart/setTotal', body.cart?.totalPrice, { root: true });
        context.commit('cart/setCartId', body.cart?.id, { root: true });
        context.commit('cart/setVersion', body.cart?.version, { root: true });

        const id = body.customer.id;

        localStorage.setItem('id', id);

        const anonCart = localStorage.getItem('cartId');
        const requestBuilder = apiRoot
          .me()
          .carts()
          .withId({ ID: `${anonCart}` });

        const methodArgs = {
          queryArgs: {
            version: 1,
          },
        };

        try {
          const response = requestBuilder.delete(methodArgs);
        
          context.commit('cart/setCart', body.cart?.lineItems, { root: true });
          if (body.cart && body.cart.id) {
            localStorage.setItem('cartId', body.cart.id);
          }
        } catch (error) {
          console.error('Error deleting the cart:', error);
        }

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  logout(context) {
    const apiRootRegistered = createApiBuilderFromCtpClient(authClient).withProjectKey({
      projectKey: `${projectKey}`,
    });
    context.commit('logout');

    const idCart = localStorage.getItem('cartId');
    const requestBuilder = apiRootRegistered
      .me()
      .carts()
      .withId({ ID: `${idCart}` });

    const methodArgs = {
      queryArgs: {
        version: 1,
      },
    };

    try {
      const response = requestBuilder.delete(methodArgs);

      context.commit('cart/setCartId', '', { root: true });
      context.commit('cart/setVersion', 1, { root: true });
      context.commit('cart/setCart', [], { root: true });
      context.commit('cart/setQuantity', 0, { root: true });
      context.commit('cart/setTotal', 0, { root: true });
    } catch (error) {
      console.error('Error deleting the cart:', error);
    }
  },
  async singUp(context, payload: SingUpPayload) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    const doCustomer = () => {
      return apiRoot.customers().post(payload).execute();
    };

    return doCustomer()
      .then(({ body }) => {
        context.commit('SIGN_UP', body);

        const id = body.customer.id;

        localStorage.setItem('id', id);
        context.commit('setLoggedIn', { isLoggedInValue: true, hasId: id });

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async getCustomer(context) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    return apiRoot
      .customers()
      .withId({ ID: context.state.currentUserId })
      .get()
      .execute()
      .then((body) => {
        context.commit('getUser', body);

        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async updateCustomer(context, body) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    return apiRoot
      .customers()
      .withId({ ID: context.state.currentUserId })
      .post({
        body,
      })
      .execute()
      .then((body) => {
        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
  async changePassword(context, body) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: `${projectKey}`,
    });

    return apiRoot
      .customers()
      .password()
      .post({ body })
      .execute()
      .then((body) => {
        return body;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default actions;
