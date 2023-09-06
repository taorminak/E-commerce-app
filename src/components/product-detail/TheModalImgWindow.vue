<template>
  <div class="modal-window-carousel">
    <Carousel
      v-bind="{
        itemsToShow: 1,
        wrapAround: true,
        transition: 500,
        autoplay: 0,
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
          <img :src="slide.url" alt="logo" class="carousel__item__img" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
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
    itemsToShow: 1,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 1,
    snapAlign: 'start',
  },
});
</script>

<style lang="scss" scoped>
.modal-window-carousel {
  position: fixed;
  max-width: 900px;
  max-height: 500px;
  padding: 50px 40px;
  z-index: 5;
  background-color: #322d42;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.carousel__item {
  border-radius: 15px;

  &__img {
    width: 70%;
    height: auto;
    border-radius: 15px;
  }
}

@media (max-width: 1050px) {
  .modal-window-carousel {
    max-width: 600px;
  }
}

@media (max-width: 715px) {
  .modal-window-carousel {
    max-width: 500px;
  }
}
</style>
