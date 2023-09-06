<template>
  <ul>
    <li v-for="product in cartProducts" :key="product.id">
      {{ product.name }} - {{ product.price }} - {{ product.quantity }}
    </li>
  </ul>
  <p>Total: {{ total }}</p>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartProducts', 'cartTotal']),
    total() {
      return this.cartTotal;
    },
  },
};
</script>
