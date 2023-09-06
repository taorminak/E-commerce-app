<template>
  <div class="catalog">
    <div class="catalog-container">
      <div class="catalog-filters"><FilterBar /></div>

      <div class="catalog-products">
        <div class="catalog-header">
          <h2>This is a catalog</h2>
          <div class="sort-dropdown">
            <button class="catalog-header__button" @click="toggleDropdown">
              <div>{{ selectedOption }}</div>
              <span v-if="isDropdownOpen">▲</span>
              <span v-else>▼</span>
            </button>
            <ul v-show="isDropdownOpen" class="dropdown-list">
              <li @click="sortByHigherPrice">Sort by higher Price</li>
              <li @click="sortAZ">Sort A-Z</li>
              <li @click="sortZA">Sort Z-A</li>
              <li @click="sortByLowerPrice">Sort by lower Price</li>
            </ul>
          </div>
        </div>
        <div class="product-cards">
          <div class="product-card-container" v-if="loading">
            <ProductCard
              v-for="product in displayedGames || []"
              :key="product.id"
              :product="product"
              imageClass="image-mode"
              class="product-card"
            />
          </div>
          <base-spinner title="loading" v-else class="spinner-style"></base-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { ProductItem } from '@/types/interfaces/productItem';
import ProductCard from '@/components/ProductCard.vue';
import { useStore } from 'vuex';
import FilterBar from '@/components/FilterBar.vue';

export default defineComponent({
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: 'Sort by higher price',
    };
  },
  components: {
    ProductCard,
    FilterBar,
  },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const displayedGames = ref<ProductItem[]>([]);

    const priceRange = store.state.products.priceRange;

    onMounted(async () => {
      await store.dispatch('fetchProducts', priceRange);
      loading.value = true;
      displayedGames.value = store.state.products.products || [];
    });

    watch(
      () => store.state.products.priceRange,
      (newPriceRange) => {
        store.dispatch('fetchProducts', newPriceRange);
      },
      { immediate: true },
    );
    watch(
      () => store.state.products.products,
      (newProducts) => {
        displayedGames.value = newProducts || [];
      },
      { immediate: true },
    );
    watch(
      () => store.state.products.selectedCategories,
      (newSelectedCategories) => {
        store.dispatch('fetchProducts', newSelectedCategories);
      },
      { deep: true, immediate: true },
    );

    return {
      loading,
      displayedGames,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    sortByHigherPrice() {
      this.selectedOption = 'Sort by higher price';

      const products = [...this.$store.state.products.products];

      products.sort((a, b) => {
        const priceA = a.masterVariant.prices[0]?.value?.centAmount || 0;
        const priceB = b.masterVariant.prices[0]?.value?.centAmount || 0;

        return priceB - priceA;
      });

      this.$store.commit('setProducts', products);
    },
    sortAZ() {
      this.selectedOption = 'Sort A-Z';

      const products = [...this.$store.state.products.products];

      products.sort((a, b) => {
        const nameA = a.name['en-US'].toLowerCase();
        const nameB = b.name['en-US'].toLowerCase();

        return nameA.localeCompare(nameB);
      });
      this.$store.commit('setProducts', products);
    },
    sortZA() {
      this.selectedOption = 'Sort Z-A';

      const products = [...this.$store.state.products.products];

      products.sort((a, b) => {
        const nameA = a.name['en-US'].toLowerCase();
        const nameB = b.name['en-US'].toLowerCase();

        return nameB.localeCompare(nameA);
      });

      this.$store.commit('setProducts', products);
    },
    sortByLowerPrice() {
      this.selectedOption = 'Sort by lower price';

      const products = [...this.$store.state.products.products];

      products.sort((a, b) => {
        const priceA = a.masterVariant.prices[0]?.value?.centAmount || 0;
        const priceB = b.masterVariant.prices[0]?.value?.centAmount || 0;

        return priceA - priceB;
      });

      this.$store.commit('setProducts', products);
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';

.dropdown-list li {
  padding: 8px 16px;
  cursor: pointer;
  background-color: rgba(27, 23, 41, 1);
}

.sort-dropdown {
  position: relative;
  display: inline-block;

  &:hover .dropdown-list {
    display: block;
  }
}

.catalog-header__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  width: 255px;
  height: 19px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.dropdown-list {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(27, 23, 41, 1);
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 1;
  width: 255px;
  height: 19px;
}

.catalog {
  width: 80vw;
  margin: auto;
  display: flex;

  .spinner-style {
    height: 50px;
    margin: 100px;
    transition: opacity 0.3s ease;
  }

  .catalog-container {
    display: flex;

    .catalog-filters {
      min-width: 20vw;
    }

    .catalog-products {
      display: flex;
      max-width: 60vw;
      flex-direction: column;

      .catalog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          color: white;
          margin-bottom: 45px;
          font-family: 'Roboto', sans-serif;
          font-size: 36px;
          font-weight: 700;
          line-height: 47px;
          letter-spacing: 0em;
          text-align: left;
          margin: 0;
        }

        .catalog-header__button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          height: 53px;
          border-radius: 10px;
          background-color: rgba(27, 23, 41, 1);
          color: rgba(255, 255, 255, 1);
          font-size: 15px;
          font-weight: 400;
          line-height: 19px;
          letter-spacing: 0em;
          padding: 25px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }

          span {
            color: rgba(119, 190, 29, 1);
          }
        }
      }

      .product-card-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        margin: auto;
        margin-top: 45px;

        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            transform: scale(1.07);
            box-shadow: 0px 8px 12px rgba(200, 200, 200, 0.4);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .catalog {
    width: 90vw;
    margin: auto;
    display: flex;

    .catalog-container {
      width: 90vw;
      margin: auto;

      .catalog-products {
        margin: auto;
        .catalog-header {
          display: flex;
          flex-direction: column;

          h2 {
            font-size: 28px;
          }
        }

        .product-card-container {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 70px;
          margin: auto;
          margin-top: 45px;

          .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            &:hover {
              transform: scale(1.02);
              box-shadow: 0px 8px 12px rgba(200, 200, 200, 0.4);
            }
          }
        }
      }
    }
    .catalog-header {
      .catalog-header__button {
        width: auto;
        margin-top: 50px;
      }
    }
  }
}

@media (max-width: 380px) {
  .catalog {
    .catalog-container {
      display: flex;
      flex-direction: column;
      margin: auto;
      margin-top: 50px;
      width: 100%;

      .catalog-products {
        margin: auto;
        max-width: 90vw;
        margin-top: 50px;

        .catalog-header {
          display: flex;
          flex-direction: column;

          h2 {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
          }

          .catalog-header__button {
            width: auto;
          }
        }
      }
    }
  }
}
</style>
