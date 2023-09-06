<template>
  <div class="promotions-container">
    <h2>Promotions<span>%</span></h2>
    <div class="promotions-list">
      <ProductCard
        v-for="(product, index) in discountedProducts"
        :key="index"
        :product="product"
        imageClass="image-mode-promo"
        gameDiscount="game-discount-promo"
        gamePrice="game-price-promo"
        gameInfo="game-info-promo"
      />
    </div>
  </div>
</template>

<script scoped lang="ts">
import { defineComponent } from 'vue';
import { ProductItem } from '@/types/interfaces/productItem';
import ProductCard from '@/components/ProductCard.vue';

export default defineComponent({
  components: {
    ProductCard,
  },
  computed: {
    discountedProducts(): ProductItem[] {
      const products = this.$store.state.products.products || [];
      const discountedGames = products.filter(
        (product: ProductItem) => product.masterVariant.prices[0]?.discounted?.value?.centAmount !== undefined,
      );

      const shuffledGames = discountedGames.slice();

      for (let i = shuffledGames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledGames[i], shuffledGames[j]] = [shuffledGames[j], shuffledGames[i]];
      }

      return shuffledGames.slice(0, 4);
    },
  },
});
</script>

<style scoped lang="scss">
h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 15px;
  color: white;
  margin-bottom: 45px;

  span {
    color: #77be1d;
    margin-left: 10px;
  }
}
.promotions-container {
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;

  .promotions-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 80vw;
    align-items: center;
    justify-content: space-between;

    .promotion-card {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: left;
      max-width: 620px;
      height: 464px;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 15px;

    .promotions-list {
      justify-content: center;
      gap: 0px;

      .promotion-card {
        max-width: 100%;
        height: auto;
        max-width: 158px;
        height: 364px;
      }
    }
  }
}

@media (max-width: 380px) {
  .promotions-container {
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    margin: auto;
    .promotion-card {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: left;
      max-width: 158px;
      height: 364px;

      .game-image {
        object-fit: cover;
        max-width: 100px;
        width: 100px;
        height: 150px;
        border-radius: 8px;
        margin-bottom: 0;
        cursor: pointer;
      }
    }
  }
}
</style>
