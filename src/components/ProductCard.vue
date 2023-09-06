<template>
  <router-link
    class="promotion-card"
    :key="product.id"
    :to="`product:${product.slug['en-US']}`"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <img :src="getCoverImageUrl(product.masterVariant.images)" :alt="product.name['en-US']" :class="imageClass" />
    <div class="game-buttons" :class="{ 'show-buttons': showButtons }">
      <div class="game-add-to-cart" v-if="showButtons">
        <button @click="addToCart(product)" class="add-to-cart-button">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" class="cart-icon"></font-awesome-icon>
        </button>
      </div>
      <div class="game-add-to-fav" v-if="showButtons">
        <button @click="addToFavourites(product)" class="add-to-fav-button">
          <font-awesome-icon :icon="['fas', 'heart']" class="heart-icon" />
        </button>
      </div>
    </div>
    <div class="game-info" :class="gameInfo">
      <div class="game-price-container">
        <div class="game-price" :class="gamePrice">
          {{ getProductPrice(product) }}
        </div>
        <div v-if="hasDiscountedPrice(product)" class="game-price-original">
          {{ getOriginalPrice(product) }}
        </div>
        <div v-if="getProductDiscount(product) > 0" class="game-discount" :class="gameDiscount">
          {{ getProductDiscount(product) }}% off
        </div>
      </div>
      <div class="game-name">{{ product.name['en-US'] }}</div>
      <button @click="toggleDescription" class="read-description-button" v-if="$route.name === 'catalog'">
        Read Description
      </button>
    </div>
    <div :class="{ overlay: true, show: showDescription }">
      <div class="description-overlay">
        <button @click="toggleDescription" class="close-description-button">Close</button>
        <div class="game-description">{{ product.description['en-US'] }}</div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ProductItem } from '@/types/interfaces/productItem';

interface Image {
  dimensions: {
    width: number;
    height: number;
  };
  label: string;
  url: string;
}

export default defineComponent({
  props: {
    product: {
      type: Object as () => ProductItem,
      required: true,
    },
    imageClass: String,
    gameDiscount: String,
    gamePrice: String,
    gameInfo: String,
  },
  data() {
    return {
      showDescription: false,
      showButtons: false,
    };
  },
  methods: {
    getCoverImageUrl(images: Image[]): string {
      const coverLabel = 'Cover';
      const coverImage = images.find((image) => image.label === coverLabel);

      const imageUrl = coverImage ? coverImage.url : images.length > 0 ? images[0].url : '';

      return imageUrl;
    },
    getProductPrice(product: ProductItem) {
      const currentVariant = product.masterVariant;
      const hasDiscountedPrice = !!currentVariant.prices[0]?.discounted?.value?.centAmount;
      const regularPrice = currentVariant.prices[0].value.centAmount;

      if (hasDiscountedPrice) {
        const discountedPrice = currentVariant.prices[0]?.discounted?.value?.centAmount || 0;
        const formattedDiscountedPrice = (discountedPrice / 100).toFixed(2);

        return `${formattedDiscountedPrice}`;
      } else {
        const formattedRegularPrice = (regularPrice / 100).toFixed(2);

        return `${formattedRegularPrice}`;
      }
    },
    hasDiscountedPrice(product: ProductItem) {
      const currentVariant = product.masterVariant;

      return !!currentVariant.prices[0]?.discounted?.value?.centAmount;
    },
    getOriginalPrice(product: ProductItem) {
      const currentVariant = product.masterVariant;
      const regularPrice = currentVariant.prices[0]?.value?.centAmount;
      const formattedRegularPrice = (regularPrice / 100).toFixed(2);

      return formattedRegularPrice;
    },

    getProductDiscount(product: ProductItem) {
      const currentVariant = product.masterVariant;
      const hasDiscountedPrice = !!currentVariant.prices[0]?.discounted?.value?.centAmount;

      if (hasDiscountedPrice) {
        const oldPrice = currentVariant.prices[0].value.centAmount;
        const newPrice = currentVariant.prices[0]?.discounted?.value?.centAmount || 0;
        const discount = Math.floor(((oldPrice - newPrice) / oldPrice) * 100);

        return discount;
      }

      return 0;
    },
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    addToCart(product: ProductItem) {
      this.$emit('addToCartClicked', product);
    },
    addToFavourites(product: ProductItem) {
      this.$emit('addToFavouritesClicked', product);
    },
    onMouseOver() {
      this.showButtons = true;
    },
    onMouseLeave() {
      this.showButtons = false;
    },
  },
  watch: {
    'product.masterVariant.prices[0]?.discounted?.value?.centAmount'(newDiscount, oldDiscount) {
      if (newDiscount !== oldDiscount) {
        this.$emit('productDiscountChanged', Boolean(newDiscount));
      }
    },
  },
});
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';

.promotion-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: relative;
  height: 100%;
  position: relative;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(60%);
  }
}
.game-buttons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;

  align-items: center;
  text-align: center;
  z-index: 999;
  background-color: transparent;
}

.add-to-cart-button,
.add-to-fav-button {
  color: rgba(119, 190, 29, 1);
  background-color: transparent;
  margin: auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  .cart-icon,
  .heart-icon {
    height: 40px;
    margin: 30px;
  }
}

.game-info {
  width: 90%;
  margin: auto;
  height: 113px;
  border-radius: 8px;

  .game-price {
    font-family: $manrope-font-family;
    color: $white-color;
    font-size: 24px;
    font-weight: 500;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: left;
  }

  .read-description-button {
    padding: 12px 20px;
    border-radius: 15px;
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.5s, color 0.5s;
    margin: auto;

    &:hover {
      background-color: rgba(255, 255, 255, 1);
      color: rgba(0, 0, 0, 1);
    }
  }

  .game-discount {
    width: 62px;
    border-radius: 8px;
    padding: 5px;
    font-family: $manrope-font-family;
    font-size: 14px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    background: rgba(119, 190, 29, 1);
    color: $white-color;
    text-align: center;
  }
}

.game-price-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .game-price-original {
    font-size: 24px;
    font-weight: 700;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: left;
    text-decoration: line-through;
  }
}

.game-name {
  font-family: $roboto-font-family;
  color: $white-color;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
}

.image-mode {
  max-width: 265px;
  height: 400px;
  border-radius: 15px;
  margin-bottom: 10px;
  object-fit: cover;
  cursor: pointer;
}

.image-mode-promo {
  object-fit: cover;
  width: 500px;
  max-width: 620px;
  height: 319px;
  border-radius: 15px;
  margin-bottom: 20px;
  cursor: pointer;
}

.top-four-image {
  max-width: 270px;
  height: 450px;
  border-radius: 15px;
  margin-bottom: 10px;
  object-fit: cover;
  cursor: pointer;
}

.game-description {
  background-color: transparent;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0s 0.3s;
  overflow-y: auto;
}

.overlay.show {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s, visibility 0s;
}

.description-overlay {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: justify;
}

.close-description-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

@media (max-width: 768px) {
  .image-mode-promo {
    object-fit: cover;
    max-width: 122px;
    width: 122px;
    height: 183px;
    border-radius: 9px;
    margin-bottom: 0px;
    cursor: pointer;
  }

  .game-info {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-end;
    border-radius: 8px;

    .game-name {
      margin-bottom: 0px;
    }
  }

  .game-info-promo {
    width: 135px;
    .game-price-promo {
      font-size: 18px;
      font-weight: 800;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
    }

    .game-discount-promo {
      font-size: 18px;
      font-weight: 500;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
      color: rgba(119, 190, 29, 1);
      background: none;
      margin: 0;
    }
  }
}
</style>
