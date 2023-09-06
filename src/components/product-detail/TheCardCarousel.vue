<template>
  <div class="carousel-wrapper">
    <Carousel
      v-bind="{
        itemsToShow: 1,
        wrapAround: true,
        transition: 500,
        autoplay: 5000,
        mouseDrag: true,
        touchDrag: true,
        pauseAutoplayOnHover: true,
        snapAlign: 'center',
        dir: 'rtl',
      }"
      :breakpoints="breakpoints"
    >
      <Slide v-for="slide in props.imgArr" :key="slide.id">
        <div class="carousel__item">
          <img :src="slide.url" alt="logo" class="carousel__item__img" @click="openModalWindow(slide.id)" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import { reactive, inject } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

interface IImg {
  url: string;
  id: number;
  isSlide: boolean;
}

const props = defineProps<{
  imgArr: IImg[];
}>();

const breakpoints = reactive({
  // 700px and up
  700: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
});

const openModalWindow = inject('openModalWindow') as (imgId: number) => void;
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  max-width: 700px;
  margin: 70px auto 70px;
}

.carousel__item {
  max-width: 297px;
  height: 167px;
  border-radius: 15px;

  &__img {
    height: 167px;
    cursor: pointer;
    border-radius: 15px;
  }
}
</style>
