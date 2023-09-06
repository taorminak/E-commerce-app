<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.container {
  background: #010101;
  width: 100vw;
  min-height: 100vh;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
