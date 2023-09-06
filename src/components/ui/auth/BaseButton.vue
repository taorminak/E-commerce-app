<template>
  <router-link :to="{ name: 'home' }" v-if="close" class="button button__close">
    <div class="button-icon">
      <font-awesome-icon icon="fa-solid fa-right-long" fade />
    </div>
    <slot></slot>
  </router-link>
  <button v-else-if="type" class="button button__next" type="submit">
    <slot></slot>
    <span :class="{ underline: mode }"></span>
  </button>
  <button v-else class="button button__next">
    <slot></slot>
    <span :class="{ underline: mode }"></span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  mode?: string;
  close?: boolean;
  type?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  color: #fefefe;
  border-radius: 10px;
  opacity: 0.8;
  transition: 0.2s;

  padding: 5px 10px;
  text-transform: uppercase;
  @media (max-width: 1200px) {
    padding-left: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
    padding-right: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
  }
  &__close {
    gap: 10px;
    background: #010101;
    border: 1px solid #383636;
    font-size: 13px;
    @media (max-width: 1200px) {
      font-size: calc(10px + (13 - 10) * ((100vw - 320px) / (1200 - 320)));
    }
    & .button-icon {
      display: flex;
    }

    & svg {
      height: 15px;
      transition: 2s;
      @media (max-width: 1200px) {
        height: calc(10px + 5 * ((100vw - 320px) / (1200 - 320)));
      }
    }
    & .bell path {
      fill: #010101;
    }

    &:hover {
      opacity: 1;
      transition: 0.2s;
    }

    &:active {
      transform: scale(0.97);
      transition: 0.2s;
    }
  }
  &__next {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 130px;
    margin: 0 auto;
    padding: 10px;
    background: transparent;
    overflow: hidden;
    @media (max-width: 1200px) {
      padding: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
    }
    &:hover {
      background: #fefefe;
      color: #fff;
      border-radius: 5px;
      color: #010101;
    }
    & .underline {
      position: absolute;
      display: block;
    }
    & .underline:nth-child(1) {
      bottom: 2px;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #fefefe);
      animation: btn-anim1 3s linear infinite;
    }
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }

    50%,
    100% {
      left: 100%;
    }
  }
}
</style>
