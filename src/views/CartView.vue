<template>
  <div class="cart-container">
    <h1 class="cart__header">
      Cart <span class="cart__header-total">{{ getCartQuantity }}</span>
    </h1>
    <div class="cart">
      <div class="cart-wrapper">
        <div class="cart__board board">
          <h3 class="board__header">Login or register</h3>
          <p class="board__text">You can receive a 15% discount using a promo code: HAPPY15.</p>
          <button class="board__in-button">Login</button>
        </div>
        <div class="order">
          <div class="order__block">
            <h3 class="order__header">
              <span>{{ getCartQuantity }} </span> items
            </h3>
            <div class="order__price">{{ getTotalPrice / 100 }} $</div>
            <input class="order__input" type="text" placeholder="Enter promo code" />
            <button class="order__button">Place Order</button>
          </div>
        </div>
      </div>
      <transition>
        <ul class="cart__list" v-if="cartProducts.length">
          <li class="cart__item item-cart" v-for="product in cartProducts" :key="product.id">
            <CartProduct :product="product" />
          </li>
        </ul>
        <ul class="cart__list" v-else>
          <div class="empty-cart">
            <p class="empty-cart__text">There are no products in the cart.</p>
          </div>
        </ul>
      </transition>

      <div class="cart__remove-btn">
        <button>Clear cart</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CartProduct from '@/components/cart/CartProduct.vue';
import { CartItem } from '@/types/interfaces/cartItem';

export default defineComponent({
  components: {
    CartProduct,
  },
  computed: {
    getCartQuantity() {
      return this.$store.getters['cart/getCartQuantity'];
    },
    cartProducts(): CartItem[] {
      return this.$store.getters['cart/cartProducts'];
    },
    getTotalPrice() {
      return this.$store.getters['cart/getTotalPrice'];
    },
  },
});
</script>

<style lang="scss" scoped>
.empty-cart {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.26);
  padding: 20px;
  &__text {
    color: #ffffff;
  }
}
.order {
  display: flex;
  &__button {
    padding: 10px 20px;
    background: rgba(119, 190, 29, 0.1);
    font-size: 16px;
    color: #77be1d;
    border-radius: 10px;
    transition: 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
  &__input {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 10px;
    background: rgba(119, 190, 29, 0.1);
    color: #77be1d;
    &::placeholder {
      color: #77be1d;
      text-align: center;
    }
  }
  &__header {
    color: #fff;
    font-weight: 700;
    font-size: 25px;
    @media (max-width: 1200px) {
      font-size: calc(18px + (25 - 18) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__price {
    color: #fff;
    font-weight: 600;
    font-size: 36px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1200px) {
      font-size: calc(25px + (36 - 25) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__block {
    border: 1px solid #ffffff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
  }
}
.cart-container {
  max-width: 80%;
  margin: 0 auto;
}
.cart-wrapper {
  display: flex;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.cart {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;
  padding-top: 30px;
  @media (max-width: 1200px) {
    padding-top: calc(15px + (30 - 15) * ((100vw - 320px) / (1200 - 320)));
    padding-bottom: calc(15px + (30 - 15) * ((100vw - 320px) / (1200 - 320)));
  }
  &__remove-btn {
    display: flex;
    & button {
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 10px;
      background: rgba(119, 190, 29, 0.1);
      color: #77be1d;
      transition: 0.2s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  &__header {
    color: #fff;
    font-size: 48px;
    font-weight: 700;
    line-height: 130%;
    text-align: left;
    @media (max-width: 1200px) {
      font-size: calc(32px + (48 - 32) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__header-total {
    color: #77be1d;
    font-size: 48px;
    font-weight: 700;
    line-height: 130%;
    @media (max-width: 1200px) {
      font-size: calc(32px + (48 - 32) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    max-width: 70%;
    @media (max-width: 1200px) {
      gap: calc(15px + (30 - 15) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__item {
    width: 100%;
    svg {
      font-size: 25px;
      color: #ffffff;
      margin-left: auto;
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      @media (max-width: 1200px) {
        font-size: calc(18px + (25 - 18) * ((100vw - 320px) / (1200 - 320)));
      }
    }
  }
}
.board {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  padding: 30px;
  border-radius: 15px;
  background: url('@/assets/images/board.png');
  background-repeat: no-repeat;
  background-size: cover;
  &__in-button {
    display: inline-flex;
    padding: 13px 25px 16px 25px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 10px;
    background: #fff;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
  &__header {
    color: #fff;
    font-size: 32px;
    font-weight: 800;
    line-height: 130%;
    text-align: left;
    @media (max-width: 1200px) {
      font-size: calc(16px + (32 - 16) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__text {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    line-height: 130%;
    text-align: left;
    max-width: 80%;
    @media (max-width: 1200px) {
      font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (1200 - 320)));
    }
  }
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s;
}
</style>
