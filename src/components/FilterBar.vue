<template>
  <div class="filter-bar">
    <h2>Filters</h2>
    <div class="price-filter">
      <label for="price-range">Price $:</label>
      <br />
      <div class="price-range_label">
        <span> from {{ priceFrom }}</span> <span> to {{ priceRange }}</span>
      </div>
      <br />
      <input
        type="range"
        id="price-range"
        min="0"
        class="custom-price-range"
        :max="200"
        @input="updatePriceRange($event)"
        :value="priceRange"
        step="10"
      />
    </div>
    <div class="category-filter">
      <h2>Products</h2>
      <div class="category-item">
        <label for="merch">
          <input
            type="checkbox"
            class="checkbox"
            id="merch"
            v-model="selectedCategories.Merch.selected"
            @change="handleProductChange"
          />
          Merch
        </label>
      </div>
      <div class="category-item">
        <label for="games">
          <input
            type="checkbox"
            class="checkbox"
            id="games"
            v-model="selectedCategories.Games.selected"
            @change="handleProductChange"
          />
          All Games
        </label>
      </div>

      <div>
        <h2>Video Games Genres</h2>
        <div class="category-item">
          <label for="moba">
            <input type="checkbox" id="moba" v-model="selectedCategories.MOBA.selected" @change="handleProductChange" />
            Multiplayer Online Battle Arena
          </label>
        </div>
        <div class="category-item">
          <label for="shooter">
            <input
              type="checkbox"
              id="shooter"
              v-model="selectedCategories.Shooter.selected"
              @change="handleProductChange"
            />
            Shooter
          </label>
        </div>
        <div class="category-item">
          <label for="battleRoyale">
            <input
              type="checkbox"
              id="battleRoyale"
              v-model="selectedCategories.BattleRoyale.selected"
              @change="handleProductChange"
            />
            Battle Royale
          </label>
        </div>
        <div class="category-item">
          <label for="lifeSimulation">
            <input
              type="checkbox"
              id="lifeSimulation"
              v-model="selectedCategories.LifeSimulation.selected"
              @change="handleProductChange"
            />
            Life Simulation
          </label>
        </div>
        <div class="category-item">
          <label for="actionAdventure">
            <input
              type="checkbox"
              id="actionAdventure"
              v-model="selectedCategories.ActionAdventure.selected"
              @change="handleProductChange"
            />
            Action-adventure
          </label>
        </div>
        <div class="category-item">
          <label for="rpg">
            <input type="checkbox" id="rpg" v-model="selectedCategories.RPG.selected" @change="handleProductChange" />
            Role-playing game
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapMutations, mapState, mapActions } from 'vuex';
import { defineComponent } from 'vue';

interface SelectedCategories {
  [key: string]: {
    value: string;
    selected: boolean;
  };
}

export default defineComponent({
  data() {
    return {
      priceFrom: 0,
      isChecked: true,
      selectedCategories: {
        Merch: { value: '0b7fcf32-3835-4e41-8f49-b2d70f0e997d', selected: true },
        Games: { value: '59fa4bdf-195e-4c48-930b-df4ae9429534', selected: true },
        MOBA: { value: '78c0393f-9fc6-4744-96ef-faf666f9102f', selected: false },
        Shooter: { value: 'b222a2a4-da7e-4088-ab08-57700b9327df', selected: false },
        BattleRoyale: { value: '4c6abd1a-f6fc-4aa5-a271-7cb5ff2e4228', selected: false },
        LifeSimulation: { value: '2be077db-42bc-4b9d-aa6d-a62bcfa11d85', selected: false },
        RPG: { value: '0be1c5d8-7680-4426-96d5-26a6989dd9b4', selected: false },
        ActionAdventure: { value: '5402faca-17a1-4830-b92c-292c16d1568d', selected: false },
        Other: { value: 'missing', selected: false },
      } as SelectedCategories,
    };
  },
  computed: {
    ...mapState(['priceRange']),

    priceRange(): number {
      return this.$store.state.products.priceRange;
    },
  },
  methods: {
    ...mapMutations(['updatePriceRange']),
    ...mapActions(['fetchProducts']),
    updatePriceRange(event: Event | null) {
      if (event && event.target instanceof HTMLInputElement) {
        const newPriceRange = parseFloat(event.target.value);

        this.$store.commit('updatePriceRange', newPriceRange);
      }
    },
    handleProductChange() {
      const selectedCategories = this.selectedCategories;

      this.$store.commit('updateSelectedGameCategories', selectedCategories);
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';

.filter-bar {
  width: 85%;
  padding: 15px;
  border: 2px solid rgba(30, 28, 39, 1);
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;

  h2 {
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    color: #808080;
  }

  .price-filter {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .price-range {
      display: flex;
      align-items: center;
    }

    .price-range_label {
      display: flex;
      width: 90%;
      justify-content: space-between;
      align-items: center;
      margin: auto;
    }

    .custom-price-range {
      width: 90%;
      height: 2px;
      background-color: #fff;
      outline: none;
      opacity: 0.7;
      transition: opacity 0.2s;
      border: none;
      margin: 0.4rem;

      &:focus {
        opacity: 1;
        outline: none;
      }

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }

      &::-webkit-slider-thumb {
        width: 20px;
        height: 20px;
        background-color: rgba(119, 190, 29, 1);
        cursor: pointer;
        border-radius: 50%;
        border: none;
        margin-top: -8px;
      }

      &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: rgba(119, 190, 29, 1);
        cursor: pointer;
        border-radius: 50%;
        border: none;
        margin-top: -8px;
      }

      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 1px;
        background: #fff;
      }

      &::-moz-range-track {
        width: 100%;
        height: 1px;
        background: #fff;
      }
    }
  }
}

.category-item {
  margin-bottom: 5px;
  padding: 5px;
}

.category-filter {
  label {
    display: block;
    margin-bottom: 5px;
    position: relative;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
}

.games-label {
  padding-left: 25px;
}

@media (max-width: 768px) {
  .filter-bar {
    width: 100%;
    font-size: 14px;
    padding: 5px;

    h2 {
      font-size: 18px;
    }
  }

  .price-filter {
    margin-bottom: 5px;
    font-size: 14px;
  }
  .category-item label {
    font-size: 14px;
  }
}
@media (max-width: 380px) {
  .filter-bar {
    width: 100%;
    font-size: 12px;
    padding: 2px;
  }

  .category-item {
    margin-bottom: 3px;
    font-size: 12px;
  }
}
</style>
