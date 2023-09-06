<template>
  <div class="products-container">
    <h2>Our Products</h2>
    <div>
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="product-row">
        <div v-for="game in row || []" :key="game.key">
          <ProductCard :product="game" imageClass="image-mode" />
        </div>
      </div>
      <button class="products-button">
        <router-link :to="{ name: 'catalog' }" class="nav-link">Visit Products</router-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductItem } from '@/types/interfaces/productItem';
import ProductCard from '@/components/ProductCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    ProductCard,
  },
  data() {
    return {
      itemsPerRow: this.getItemsPerRow(),
      numRows: 3,
    };
  },
  computed: {
    rows(): ProductItem[][] {
      const fetchedGames = this.$store.state.products.products || [];

      const typeGame = '80040722-52b8-4a44-a613-005b0b124877';

      const filteredGames = fetchedGames.filter((game: ProductItem) => game.productType.id === typeGame);

      const games = this.shuffleArray(filteredGames);

      const rows: ProductItem[][] = [];

      for (let i = 0; i < this.numRows; i++) {
        const startIndex = i * this.itemsPerRow;
        const endIndex = (i + 1) * this.itemsPerRow;

        rows.push(games.slice(startIndex, endIndex));
      }

      return rows;
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
    getItemsPerRow(): number {
      return window.innerWidth > 780 ? 4 : 1;
    },
    handleResize() {
      this.itemsPerRow = this.getItemsPerRow();
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
});
</script>

<style scoped lang="scss">
.products-container {
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
  color: white;
  margin-bottom: 45px;
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80vw;
  margin: auto;
  gap: 15px;
}

.promotion-card {
  height: 530px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.products-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 76px;
  border-radius: 15px;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 75px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
    border-color: #007bff;
    color: #0056b3;
  }

  .nav-link {
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    color: rgba(54, 110, 220, 1);
  }
}

@media (max-width: 380px) {
  h2 {
    text-align: center;
  }
}
</style>
