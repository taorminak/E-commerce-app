<template>
  <div>
    <div class="home">
      <the-carousel>
        <template v-slot:default>
          <div>CONTENTS FOR CAROUSEL</div>
        </template>
      </the-carousel>
      <h2><the-top /></h2>
      <h2><the-cards /></h2>
      <h2><the-products /></h2>
      <h2 id="promotions"><the-promotions /></h2>
      <h2 id="reviews"><the-reviews /></h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import TheCarousel from '@/components/TheCarousel.vue';
import ThePromotions from '@/components/ThePromotionsContainer.vue';
import TheReviews from '@/components/TheReviewsContainer.vue';
import TheProducts from '@/components/TheProductsContainer.vue';
import TheTop from '@/components/TheTopContainer.vue';
import TheCards from '@/components/TheCards.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    TheCarousel: TheCarousel,
    ThePromotions: ThePromotions,
    TheReviews: TheReviews,
    TheProducts: TheProducts,
    TheTop: TheTop,
    TheCards: TheCards,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchProducts');
    });
  },
});
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
}
</style>
