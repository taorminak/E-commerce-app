<template>
  <div class="top-games-container">
    <h2>Top 4</h2>
    <div class="top-games-row">
      <div v-for="game in topGames || []" :key="game.key">
        <ProductCard :product="game" imageClass="top-four-image" @addToCartClicked="addToCart" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductItem } from '@/types/interfaces/productItem';
import ProductCard from '@/components/ProductCard.vue';
import { defineComponent } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
  components: {
    ProductCard,
  },
  computed: {
    topGames(): ProductItem[] {
      const games = this.$store.state.products.products || [];
      const typeGame = '80040722-52b8-4a44-a613-005b0b124877';
      const filteredGames = games.filter((game: ProductItem) => game.productType.id === typeGame);
      const shuffledGames = this.shuffleArray(filteredGames);

      return shuffledGames.slice(0, 4);
    },
  },
  methods: {
    shuffleArray(array: ProductItem[]): ProductItem[] {
      const shuffledArray = array.slice();

      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }

      return shuffledArray;
    },
    async addToCart(product: ProductItem) {
      try {
        const updateCustomer = async () => {
          if (!this.$store.state.cart.cartId) {
            await this.$store.dispatch('cart/createAnonymousCart');
          }

          await this.$store.dispatch('cart/addLineItem', {
            version: this.$store.state.cart.version,
            actions: [
              {
                action: 'addLineItem',
                productId: product.id,
                variantId: product.masterVariant.id,
                quantity: 1,
              },
            ],
          });
        };

        toast.promise(
          updateCustomer,
          {
            pending: 'Item is adding to the cart',
            success: 'Item has added to the cart 👌',
            error: 'Something goes wrong 🤯',
          },
          {
            theme: 'dark',
            icon: '🎉',
            transition: toast.TRANSITIONS.SLIDE,
          },
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.top-games-container {
  max-width: 80vw;
  display: grid;
  margin: auto;
  margin-top: 45px;
}

h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;
  background-clip: text;
  -webkit-background-clip: text;
  color: white;
  margin-bottom: 45px;
}

.top-games-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80vw;
  margin: auto;
  gap: 15px;
}

@media (max-width: 768px) {
  .top-games-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }

  h2 {
    text-align: center;
  }
}
</style>
