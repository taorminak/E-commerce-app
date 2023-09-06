<template>
  <div>
    <TheNavigation />
    <div class="container">
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheNavigation from '@/components/layout/TheNavigation.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
</script>

<style lang="scss">
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
