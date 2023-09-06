<template>
  <section class="detail-view" ref="section">
    <div :class="`backgroundImg ${isLoading}`" ref="backgroundImg"></div>
    <TheCardContent
      :coverImg="coverImg || ''"
      :name="name"
      :oldPrice="oldPrice"
      :newPrice="newPrice"
      :discount="discount"
      :genre="`${genre}`"
      :publisher="`${publisher}`"
      :ratings="+ratings"
    />
    <TheCardCarousel :imgArr="imgArrFilter" />
    <TheCardDescription :description="description" :requirements="`${requirements}`" />
    <div v-if="isModalImg">
      <TheModalImgWindow :imgArr="imgArrFilter" />
      <div class="bg" @click="isModalImg = false"></div>
      <font-awesome-icon icon="fa-solid fa-xmark" class="bg-icon" @click="isModalImg = false" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, provide } from 'vue';
import { useRouter, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useStore } from 'vuex';
import { ProductItem } from '@/types/interfaces/productItem';
import TheCardContent from '@/components/product-detail/TheCardContent.vue';
import TheCardCarousel from '@/components/product-detail/TheCardCarousel.vue';
import TheCardDescription from '@/components/product-detail/TheCardDescription.vue';
import TheModalImgWindow from '@//components/product-detail/TheModalImgWindow.vue';

const store = useStore();

if (!store.getters['allProducts'][0]) await store.dispatch('fetchProducts');

const isLoading = ref('');
const isModalImg = ref(false);
const backgroundImg = ref<HTMLElement | null>(null);
const location = window.location.pathname;
const prodId = location.split('/product:')[1];
const router = useRouter();
const beforeRouteLeave = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (backgroundImg.value) {
    backgroundImg.value.style.display = 'none';
  }
  next();
};
const products = store.getters['allProducts'];
const currentProd: ProductItem = products.find((prod: ProductItem) => prod.slug['en-US'] === prodId);
const images = currentProd.masterVariant.images;
const coverImg = images.find((img) => img.label === 'Cover')?.url;
const name = currentProd.name['en-US'];
const oldPrice = currentProd.masterVariant.prices[0].value.centAmount;
const newPrice = currentProd.masterVariant.prices[0]?.discounted?.value?.centAmount || 0;
const discount = Math.floor(((oldPrice - newPrice) / oldPrice) * 100);
const genre = currentProd.masterVariant.attributes.find((att) => att.name === 'Genre')?.value;
const publisher = currentProd.masterVariant.attributes.find((att) => att.name === 'Publisher')?.value;
const ratings = `${currentProd.masterVariant.attributes.find((att) => att.name === 'Ratings')?.value}`;
const imgArr = images.map((img, index) => {
  const isSlide = !img.label;

  return {
    url: img.url,
    id: index,
    isSlide: isSlide,
  };
});
const imgArrFilter = reactive(imgArr.filter((img) => img.isSlide));
const description = currentProd.description['en-US'];
const requirements = currentProd.masterVariant.attributes.find((att) => att.name === 'System_Requirements')?.value;

function openModalWindow(imgId: number) {
  imgArrFilter.sort((img) => (img.id === imgId ? -1 : +1));
  console.log(imgArrFilter);
  isModalImg.value = true;
}

provide('openModalWindow', openModalWindow);

onMounted(async () => {
  if (backgroundImg.value)
    backgroundImg.value.style.backgroundImage = `linear-gradient(to bottom, transparent, transparent 50%, #06030f 90%),
    url('${images[2].url}')`;
  setTimeout(() => {
    isLoading.value = 'active';
  }, 1000);
});

router.beforeEach(beforeRouteLeave);
</script>

<style lang="scss" scoped>
.backgroundImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 700px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0%;
  transition: all 0.3s linear;
}

.backgroundImg.active {
  opacity: 20%;
}

.bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.9;
  z-index: 4;
}

.bg-icon {
  position: fixed;
  width: 50px;
  height: 50px;
  top: 15px;
  right: 15px;
  fill: #fff;
  z-index: 4;
  cursor: pointer;
}
</style>
