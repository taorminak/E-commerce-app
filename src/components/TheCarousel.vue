<template>
  <div>
    <Carousel
      :items-to-show="carouselItemsToShow"
      :items-to-scroll="1"
      :wrap-around="true"
      v-model:modelValue="currentSlide"
    >
      <Slide v-for="(slide, index) in slides" :key="index">
        <div class="carousel__item">
          <img :src="slide.imageUrl" :alt="'Slide ' + (index + 1)" class="custom-image" />
          <div class="overlay" :class="{ 'active-slide': index === currentSlide }"></div>
        </div>
      </Slide>
      <template #addons>
        <Navigation v-if="showNavigation" />
        <Pagination />
      </template>
    </Carousel>
    <div class="game-info__container" v-if="showGameInfo">
      <img src="../assets/images/minecraft/minecraft-logo.png" alt="Game Title" class="game-info__image" />
      <div class="game-info__description">
        <p>
          Embark on an exhilarating journey through the blocky realms of Minecraft! Craft your own epic saga of survival
          and construction!
        </p>
      </div>
      <div class="game-info__price">
        <span class="game-info__new-price">$49.99</span>
        <span class="game-info__discount">-20%</span>
        <span class="game-info__old-price">$59.99</span>
      </div>
      <div class="game-info__buttons">
        <button class="game-info__button-cart">Add to Cart</button>
        <button class="game-info__button-favourites">Add to Favorites</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';

const slides = [
  { id: 1, imageUrl: require('../assets/images/minecraft/minecraft_6.jpeg') },
  { id: 2, imageUrl: require('../assets/images/minecraft/minecraft-4.jpeg') },
  { id: 3, imageUrl: require('../assets/images/minecraft/minecraft_7.jpeg') },
];

const currentSlide = ref(0);
const carouselItemsToShow = ref(1);

const handleResize = () => {
  if (window.innerWidth > 768) {
    carouselItemsToShow.value = 1.5;
  } else {
    carouselItemsToShow.value = 1;
  }
};

onMounted(() => {
  currentSlide.value = Math.floor(slides.length / 2);
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const showGameInfo = computed(() => {
  return window.innerWidth > 768;
});

const showNavigation = computed(() => {
  return window.innerWidth > 768;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.carousel {
  margin-top: 35px;

  &__item {
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-radius: 5%;
    object-fit: cover;
    transition: background-color 0.5s ease-in-out;

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(6, 5, 12, 0.5);
      transition: background-color 0.5s ease-in-out;
    }
  }

  &__slide {
    padding: 10px;
    margin: 0px;
  }

  .custom-image {
    width: 100%;
    object-fit: cover;
    border-radius: 5%;
    background-color: rgba(6, 5, 12, 0.5);
  }

  &__prev,
  &__next {
    color: $white-color;
    background: linear-gradient(0deg, rgba(196, 196, 196, 0.05), rgba(196, 196, 196, 0.05)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
    border: 1px solid #ffffff0d;
    border-radius: 50%;
    width: 50px;
    height: 50px;

    &:hover {
      color: #2c3e50;
    }
  }

  &__prev {
    left: 200px;
  }

  &__next {
    right: 200px;
  }

  &__pagination-item {
    width: 65px;
    color: $white-color;
    margin: 0;
  }

  &__pagination-button {
    margin: 0;
    background: linear-gradient(0deg, rgba(196, 196, 196, 0.05), rgba(196, 196, 196, 0.05)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
    padding: 1px;
    color: $white-color;
    text-decoration: none;
    width: 65px;

    &:hover::after,
    &--active::after {
      background-color: $white-color;
      width: 60px;
    }
  }
}

.game-info__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 592px;
  height: 394px;
  position: absolute;
  top: 420px;
  left: 350px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5%;
  padding: 20px;
}

.game-info__image {
  height: 85px;
}

.game-info__description {
  color: $white-color;
  width: 572px;
  position: relative;

  p {
    font-family: $manrope-font-family;
    font-size: 24px;
    font-weight: 400;
    line-height: 38px;
    letter-spacing: 0em;
    text-align: left;
  }
}

.game-info__price {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.game-info__new-price {
  width: 114px;
  height: 42px;
  font-family: $manrope-font-family;
  color: $white-color;
  font-size: 32px;
  font-weight: 800;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
}

.game-info__discount {
  width: 51px;
  height: 26px;
  font-family: $manrope-font-family;
  font-size: 20px;
  font-weight: 800;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(119, 190, 29, 1);
}

.game-info__old-price {
  width: 71px;
  height: 26px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: line-through;
}

.game-info__buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
}

.game-info__button-cart,
.game-info__button-favourites {
  height: 73px;
  padding: 23px 40px 27px 40px;
  border-radius: 15px;
  font-family: $manrope-font-family;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &.game-info__button-cart {
    border: none;
    background: rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 1);
  }

  &.game-info__button-favourites {
    background: rgba(255, 255, 255, 0.05);
    color: $white-color;
    border: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.active-slide {
  background-color: transparent !important;
}

@media (max-width: 768px) {
  .carousel__item {
    height: 400px;
  }

  .game-info__container {
    width: 100%;
    max-width: none;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0;
  }
}
</style>
