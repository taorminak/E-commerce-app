<template>
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <Suspense timeout="0">
        <div>
          <component :is="Component"></component>
        </div>
      </Suspense>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

function isLoggedIn() {
  const isLoggedInString = localStorage.getItem('isLoggedIn');
  const hasId = localStorage.getItem('id');
  const cartId = localStorage.getItem('cartId');

  if (isLoggedInString !== null && hasId !== null) {
    const isLoggedInValue: boolean = JSON.parse(isLoggedInString);

    store.commit('customer/setLoggedIn', { isLoggedInValue, hasId });
  }
}

isLoggedIn();
</script>

<style lang="scss">
@import '@/assets/reset.scss';

#app {
  font-family: 'Manrope', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #06030f;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #13101b;
}

.slide-enter-active,
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
